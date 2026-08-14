import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { promisify } from 'node:util'
import { createZip } from '../../scripts/zip-utils.mjs'
import { inspectPackContract } from '../../scripts/distribution/pack-contract.mjs'
import { readZipEntries, sha256Hex, stripSingleRoot } from '../../scripts/distribution/core.mjs'

const exec = promisify(execFile)
const ROOT = resolve(new URL('../..', import.meta.url).pathname)
const temp = await mkdtemp(join(tmpdir(), 'meshvara-pack-v1-'))
const downloads = join(temp, 'downloads')
await mkdir(downloads)

function fixtureZip(slug, component) {
  return createZip([
    { name: `${slug}/README.md`, data: `# ${slug}\n` },
    { name: `${slug}/package.json`, data: JSON.stringify({ dependencies: { three: '0.185.1', react: '19.2.8', '@react-three/fiber': '9.7.0' } }) },
    { name: `${slug}/src/${component}.tsx`, data: `export function ${component}(){ return null }\n` },
    { name: `${slug}/src/index.ts`, data: `export { ${component} } from './${component}'\n` },
  ])
}

const archive = fixtureZip('fixture-form', 'FixtureForm')
const archivePath = join(downloads, 'fixture-form.zip')
await writeFile(archivePath, archive)
const manifestPath = join(downloads, 'manifest.json')
await writeFile(manifestPath, JSON.stringify({
  brand: 'MESHVARA', count: 1, assets: [{
    slug: 'fixture-form', name: 'Fixture Form', category: 'Objects', subcategory: null,
    file: '/downloads/fixture-form.zip', bytes: archive.byteLength, sha256: sha256Hex(archive),
  }],
}))
const env = { ...process.env, MESHVARA_MANIFEST: manifestPath, MESHVARA_DOWNLOAD_DIR: downloads }
const first = await exec(process.execPath, [resolve(ROOT, 'scripts/standardize-download-packs.mjs')], { cwd: ROOT, env })
assert.match(first.stdout, /Pack-v1 standardized: 1 archives/)
const standardized = await readFile(archivePath)
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
assert.equal(manifest.packSchemaVersion, 1)
assert.equal(manifest.assets[0].bytes, standardized.byteLength)
assert.equal(manifest.assets[0].sha256, sha256Hex(standardized))
const entries = stripSingleRoot(readZipEntries(standardized), 'fixture-form')
assert.equal(inspectPackContract(manifest.assets[0], entries, { requireV1: true }).version, 1)
const firstHash = manifest.assets[0].sha256

await exec(process.execPath, [resolve(ROOT, 'scripts/standardize-download-packs.mjs')], { cwd: ROOT, env })
const secondManifest = JSON.parse(await readFile(manifestPath, 'utf8'))
assert.equal(secondManifest.assets[0].sha256, firstHash, 'Pack standardization must be deterministic/idempotent')

const parity = await exec(process.execPath, [resolve(ROOT, 'scripts/validate-pack-parity.mjs')], { cwd: ROOT, env })
assert.match(parity.stdout, /Pack-v1 parity passed: 1 archives/)
console.log('Meshvara deterministic Pack-v1 standardization contract passed')
