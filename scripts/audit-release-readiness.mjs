import { readFile } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import { normalizeManifest, readZipEntries, sha256Hex, stripSingleRoot } from './distribution/core.mjs'
import { inspectPackContract } from './distribution/pack-contract.mjs'

const root = process.cwd()
const manifest = normalizeManifest(JSON.parse(await readFile(resolve(root, 'public/downloads/manifest.json'), 'utf8')))
const customizationRegistry = JSON.parse(await readFile(resolve(root, 'src/data/customization-registry.json'), 'utf8'))
const expectedCurated = new Map(Object.entries(customizationRegistry.scenes ?? {}).map(([scene, definition]) => [definition.assetSlug, { scene, ...definition }]))

function assert(condition, message) {
  if (!condition) throw new Error(`Release readiness failed: ${message}`)
}

assert(manifest.count === 500, `expected exactly 500 manifest assets, found ${manifest.count}`)
assert(customizationRegistry.schemaVersion === 1, 'customization registry schemaVersion must be 1')
assert(expectedCurated.size === 13, `expected exactly 13 curated customization assets, found ${expectedCurated.size}`)

let totalBytes = 0
let packV1 = 0
let curated = 0

for (const asset of manifest.assets) {
  const archivePath = resolve(root, 'public/downloads', basename(asset.file))
  let archive
  try {
    archive = await readFile(archivePath)
  } catch {
    throw new Error(`Release readiness failed: ${asset.slug}: archive is missing at ${archivePath}`)
  }
  assert(archive.byteLength === asset.bytes, `${asset.slug}: manifest bytes ${asset.bytes} != physical ZIP ${archive.byteLength}`)
  assert(sha256Hex(archive) === asset.sha256, `${asset.slug}: physical ZIP SHA-256 does not match manifest`)
  totalBytes += archive.byteLength

  const entries = stripSingleRoot(readZipEntries(archive), asset.slug)
  const pack = inspectPackContract(asset, entries, { requireV1: true })
  if (pack.version === 1) packV1 += 1

  const definition = expectedCurated.get(asset.slug)
  if (!definition) continue
  curated += 1
  const files = new Map(entries.filter((entry) => !entry.directory).map((entry) => [entry.relative, entry.bytes]))
  for (const required of ['CUSTOMIZATION.json', 'src/customization.ts', 'src/CustomizationLayer.tsx', 'src/CustomizableScene.tsx']) {
    assert(files.has(required), `${asset.slug}: curated physical ZIP is missing ${required}; regenerate packs before release`)
  }
  let customization
  try {
    customization = JSON.parse(files.get('CUSTOMIZATION.json').toString('utf8'))
  } catch {
    throw new Error(`Release readiness failed: ${asset.slug}: CUSTOMIZATION.json is invalid`)
  }
  assert(customization.schemaVersion === 1, `${asset.slug}: customization pack schemaVersion mismatch`)
  assert(customization.scene === definition.scene, `${asset.slug}: customization scene mismatch`)
  assert(customization.assetSlug === asset.slug, `${asset.slug}: customization assetSlug mismatch`)
  assert(JSON.stringify(customization.defaults) === JSON.stringify(definition.defaults), `${asset.slug}: physical defaults drifted from registry`)
  assert(JSON.stringify(customization.presets) === JSON.stringify(definition.presets), `${asset.slug}: physical presets drifted from registry`)
}

assert(packV1 === manifest.count, `only ${packV1}/${manifest.count} archives passed Pack-v1 inspection`)
assert(curated === expectedCurated.size, `only ${curated}/${expectedCurated.size} curated archives were audited`)

console.log(`Meshvara physical release audit passed: ${manifest.count} ZIPs / ${packV1} Pack-v1 / ${curated} curated / ${(totalBytes / 1024 / 1024).toFixed(2)} MiB verified.`)
