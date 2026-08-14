import assert from 'node:assert/strict'
import { assertStudioGlbCapabilities, inspectStudioGlbCapabilities } from '../../src/lib/studioGlbCapabilities.ts'
import { validateStudioGlbBytes } from '../../src/lib/studioStorage.ts'

function glbWithExtensions(extensionsUsed: string[] = [], extensionsRequired: string[] = []) {
  const raw = new TextEncoder().encode(JSON.stringify({ asset: { version: '2.0' }, scene: 0, scenes: [{}], extensionsUsed, extensionsRequired }))
  const paddedLength = Math.ceil(raw.length / 4) * 4
  const bytes = new ArrayBuffer(20 + paddedLength)
  const view = new DataView(bytes)
  view.setUint32(0, 0x46546c67, true)
  view.setUint32(4, 2, true)
  view.setUint32(8, bytes.byteLength, true)
  view.setUint32(12, paddedLength, true)
  view.setUint32(16, 0x4e4f534a, true)
  const json = new Uint8Array(bytes, 20, paddedLength)
  json.fill(0x20)
  json.set(raw)
  return bytes
}

const report = inspectStudioGlbCapabilities({
  extensionsUsed: ['KHR_materials_unlit', 'KHR_draco_mesh_compression'],
  extensionsRequired: ['KHR_materials_unlit'],
})
assert.deepEqual(report.unsupportedRequired, [])
assert.deepEqual(report.extensionsUsed, ['KHR_materials_unlit', 'KHR_draco_mesh_compression'])
assert.doesNotThrow(() => assertStudioGlbCapabilities({ extensionsRequired: ['KHR_materials_unlit'] }))
assert.equal(validateStudioGlbBytes(glbWithExtensions(['KHR_draco_mesh_compression'], [])), true, 'optional extension with fallback remains importable')

for (const [extension, label] of [
  ['KHR_draco_mesh_compression', 'Draco geometry compression'],
  ['EXT_meshopt_compression', 'Meshopt geometry compression'],
  ['KHR_texture_basisu', 'KTX2/BasisU texture compression'],
] as const) {
  assert.throws(() => validateStudioGlbBytes(glbWithExtensions([extension], [extension])), new RegExp(label.replace('/', '\\/'), 'i'))
}

assert.throws(
  () => validateStudioGlbBytes(glbWithExtensions(
    ['KHR_draco_mesh_compression', 'KHR_texture_basisu'],
    ['KHR_draco_mesh_compression', 'KHR_texture_basisu'],
  )),
  /Draco geometry compression.*KTX2\/BasisU texture compression/i,
)

console.log('Meshvara Studio codec-capability gate passed')
