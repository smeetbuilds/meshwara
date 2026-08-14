import { basename, resolve } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { createZip } from './zip-utils.mjs'
import { normalizeManifest, readZipEntries, sha256Hex, stripSingleRoot } from './distribution/core.mjs'
import { buildPackMetadata, inspectPackContract, MESHVARA_PACK_METADATA_FILE, MESHVARA_PACK_SCHEMA_VERSION } from './distribution/pack-contract.mjs'

const root = process.cwd()
const manifestPath = resolve(root, process.env.MESHVARA_MANIFEST ?? 'public/downloads/manifest.json')
const downloadDir = resolve(root, process.env.MESHVARA_DOWNLOAD_DIR ?? 'public/downloads')
const source = JSON.parse(await readFile(manifestPath, 'utf8'))
const normalized = normalizeManifest(source)
const sourceBySlug = new Map(source.assets.map((asset) => [asset.slug, asset]))
const updatedAssets = []

for (const asset of normalized.assets) {
  const original = sourceBySlug.get(asset.slug) ?? asset
  const archivePath = resolve(downloadDir, basename(asset.file))
  const archive = await readFile(archivePath)
  const extracted = stripSingleRoot(readZipEntries(archive), asset.slug)
    .filter((entry) => entry.relative !== MESHVARA_PACK_METADATA_FILE)
  const metadata = buildPackMetadata(asset, extracted)
  const entries = [
    ...extracted.map((entry) => ({ name: `${asset.slug}/${entry.relative}`, data: entry.bytes })),
    { name: `${asset.slug}/${MESHVARA_PACK_METADATA_FILE}`, data: `${JSON.stringify(metadata, null, 2)}\n` },
  ].sort((a, b) => a.name.localeCompare(b.name))
  const standardized = createZip(entries)
  const verified = stripSingleRoot(readZipEntries(standardized), asset.slug)
  inspectPackContract(asset, verified, { requireV1: true })
  await writeFile(archivePath, standardized)
  updatedAssets.push({ ...original, bytes: standardized.byteLength, sha256: sha256Hex(standardized) })
}

const output = {
  ...source,
  brand: normalized.brand,
  packSchemaVersion: MESHVARA_PACK_SCHEMA_VERSION,
  count: updatedAssets.length,
  assets: updatedAssets,
}
await writeFile(manifestPath, `${JSON.stringify(output, null, 2)}\n`)
console.log(`MESHVARA Pack-v${MESHVARA_PACK_SCHEMA_VERSION} standardized: ${updatedAssets.length} archives -> ${manifestPath}`)
