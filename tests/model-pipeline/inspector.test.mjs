import assert from 'node:assert/strict'
import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { inspectModel } from '../../scripts/model-inspector.mjs'

const GLB_MAGIC = 0x46546c67
const GLB_JSON_CHUNK = 0x4e4f534a

function encodeGlb(document) {
  const raw = Buffer.from(JSON.stringify(document), 'utf8')
  const padding = (4 - (raw.length % 4)) % 4
  const json = Buffer.concat([raw, Buffer.alloc(padding, 0x20)])
  const buffer = Buffer.alloc(12 + 8 + json.length)
  buffer.writeUInt32LE(GLB_MAGIC, 0)
  buffer.writeUInt32LE(2, 4)
  buffer.writeUInt32LE(buffer.length, 8)
  buffer.writeUInt32LE(json.length, 12)
  buffer.writeUInt32LE(GLB_JSON_CHUNK, 16)
  json.copy(buffer, 20)
  return buffer
}

const dir = await mkdtemp(join(tmpdir(), 'meshvara-model-test-'))
const fixture = join(dir, 'rigged-fixture.gltf')
const glbFixture = join(dir, 'rigged-fixture.glb')

const document = {
  asset: { version: '2.0', generator: 'MESHVARA model-pipeline test' },
  extensionsUsed: ['EXT_meshopt_compression', 'KHR_texture_basisu'],
  scenes: [{ nodes: [0] }],
  scene: 0,
  nodes: [
    { name: 'Root', mesh: 0, skin: 0, children: [1] },
    { name: 'Hips', children: [2] },
    { name: 'Spine' },
  ],
  meshes: [{ extras: { targetNames: ['Blink_Left', 'Blink_Right'] }, primitives: [{ attributes: { POSITION: 0, JOINTS_0: 1, WEIGHTS_0: 2 }, indices: 3, targets: [{ POSITION: 4 }, { POSITION: 5 }] }] }],
  skins: [{ joints: [1, 2], skeleton: 1 }],
  animations: [{
    name: 'Idle',
    samplers: [{ input: 6, output: 7, interpolation: 'LINEAR' }],
    channels: [{ sampler: 0, target: { node: 1, path: 'rotation' } }],
  }],
  accessors: [
    { componentType: 5126, count: 6, type: 'VEC3' },
    { componentType: 5123, count: 6, type: 'VEC4' },
    { componentType: 5126, count: 6, type: 'VEC4' },
    { componentType: 5123, count: 6, type: 'SCALAR' },
    { componentType: 5126, count: 6, type: 'VEC3' },
    { componentType: 5126, count: 6, type: 'VEC3' },
    { componentType: 5126, count: 2, type: 'SCALAR', min: [0], max: [1.25] },
    { componentType: 5126, count: 2, type: 'VEC4' },
  ],
  textures: [{ extensions: { KHR_texture_basisu: { source: 0 } } }],
  images: [{ mimeType: 'image/ktx2', uri: 'data:image/ktx2;base64,' }],
}

await writeFile(fixture, JSON.stringify(document))
await writeFile(glbFixture, encodeGlb(document))

for (const file of [fixture, glbFixture]) {
  const stats = await inspectModel(file)
  assert.equal(stats.version, '2.0')
  assert.equal(stats.meshes, 1)
  assert.equal(stats.primitives, 1)
  assert.equal(stats.vertices, 6)
  assert.equal(stats.triangles, 2)
  assert.equal(stats.skins, 1)
  assert.equal(stats.joints, 2)
  assert.equal(stats.skinnedPrimitives, 1)
  assert.equal(stats.morphTargets, 2)
  assert.equal(stats.animations.length, 1)
  assert.equal(stats.animations[0].name, 'Idle')
  assert.equal(stats.animations[0].duration, 1.25)
  assert.deepEqual(stats.animations[0].targetPaths, ['rotation'])
  assert.deepEqual(stats.animations[0].targetNodeNames, ['Hips'])
  assert.deepEqual([...stats.morphTargetNames].sort(), ['Blink_Left', 'Blink_Right'])
  assert.equal(stats.compression.meshopt, true)
  assert.equal(stats.compression.ktx2, true)
  assert.equal(stats.nodeNames.has('Hips'), true)
  assert.deepEqual(stats.externalResources, [])
}

const externalFixture = join(dir, 'external.gltf')
await writeFile(externalFixture, JSON.stringify({
  asset: { version: '2.0' },
  buffers: [{ uri: 'mesh.bin', byteLength: 4 }],
  images: [{ uri: 'textures/albedo.webp' }, { uri: 'data:image/png;base64,' }],
}))
const external = await inspectModel(externalFixture)
assert.deepEqual(external.externalResources, ['mesh.bin', 'textures/albedo.webp'])
assert.equal((await inspectModel(glbFixture)).format, 'GLB')

console.log('Model inspector test passed.')
