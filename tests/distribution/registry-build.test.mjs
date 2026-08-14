import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { promisify } from 'node:util'

const exec = promisify(execFile)
const ROOT = resolve(new URL('../..', import.meta.url).pathname)
const temp = await mkdtemp(join(tmpdir(), 'meshvara-registry-'))
const manifestPath = join(temp, 'manifest.json')
const outputPath = join(temp, 'v1.json')
await writeFile(manifestPath, JSON.stringify({
  brand: 'MESHVARA', packSchemaVersion: 1, count: 1, assets: [{
    slug: 'test-object', name: 'Test Object', category: 'Objects', subcategory: null,
    file: '/downloads/test-object.zip', bytes: 321, sha256: 'a'.repeat(64),
  }],
}))
const run = await exec(process.execPath, [resolve(ROOT, 'scripts/build-registry.mjs')], {
  cwd: ROOT,
  env: { ...process.env, MESHVARA_MANIFEST: manifestPath, MESHVARA_REGISTRY_OUTPUT: outputPath },
})
assert.match(run.stdout, /1 assets/)
const registry = JSON.parse(await readFile(outputPath, 'utf8'))
assert.equal(registry.schemaVersion, 1)
assert.equal(registry.packSchemaVersion, 1)
assert.equal(registry.assets[0].archive.href, '../downloads/test-object.zip')
assert.equal(registry.dependencies.three, '0.185.1')
assert.equal(registry.dependencies['@react-three/fiber'], '9.7.0')
console.log('Meshvara registry build contract passed')
