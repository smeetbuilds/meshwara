import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, resolve } from 'node:path'
import { codecFiles, syncCodecs } from '../../scripts/sync-codecs.mjs'

const root = await mkdtemp(resolve(tmpdir(), 'meshvara-codec-sync-'))

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex')
}

try {
  await writeFile(resolve(root, 'package.json'), JSON.stringify({ dependencies: { three: '0.185.1' } }))
  await mkdir(resolve(root, 'node_modules/three'), { recursive: true })
  await writeFile(resolve(root, 'node_modules/three/package.json'), JSON.stringify({ version: '0.185.1' }))

  for (const [index, item] of codecFiles.entries()) {
    const source = resolve(root, 'node_modules/three', item.source)
    await mkdir(dirname(source), { recursive: true })
    await writeFile(source, Buffer.from(`fixture-${item.id}-${index}`))
  }

  // Prove stale payloads cannot survive a release sync.
  await mkdir(resolve(root, 'public/codecs/draco'), { recursive: true })
  await writeFile(resolve(root, 'public/codecs/draco/stale.js'), 'stale')

  const manifest = await syncCodecs({ root })
  assert.equal(manifest.schemaVersion, 1)
  assert.equal(manifest.sourcePackage, 'three')
  assert.equal(manifest.threeVersion, '0.185.1')
  assert.equal(manifest.sourcePackageLicense, 'MIT')
  assert.equal(manifest.runtimeLicense, 'Apache-2.0')
  assert.equal(manifest.runtimeOrigin, 'same-origin')
  assert.equal(manifest.files.length, codecFiles.length)

  for (const [index, item] of codecFiles.entries()) {
    const expected = Buffer.from(`fixture-${item.id}-${index}`)
    const copied = await readFile(resolve(root, 'public/codecs', item.output))
    assert.deepEqual(copied, expected)
    const record = manifest.files.find((file) => file.id === item.id)
    assert.ok(record)
    assert.equal(record.bytes, expected.byteLength)
    assert.equal(record.sha256, sha256(expected))
  }

  await assert.rejects(() => readFile(resolve(root, 'public/codecs/draco/stale.js')))
  const diskManifest = JSON.parse(await readFile(resolve(root, 'public/codecs/manifest.json'), 'utf8'))
  assert.deepEqual(diskManifest, manifest)

  await writeFile(resolve(root, 'node_modules/three/package.json'), JSON.stringify({ version: '0.185.0' }))
  await assert.rejects(() => syncCodecs({ root }), /Codec source version mismatch/)
} finally {
  await rm(root, { recursive: true, force: true })
}

console.log('Meshvara deterministic same-origin codec sync contract passed')
