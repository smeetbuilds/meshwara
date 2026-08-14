import assert from 'node:assert/strict'
import { assertStudioGlbCapabilities, inspectStudioGlbCapabilities, studioOfflineRequiredGlbCodecs } from '../../src/lib/studioGlbCapabilities.ts'
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
  extensionsUsed: ['KHR_materials_unlit', 'KHR_draco_mesh_compression', 'EXT_meshopt_compression'],
  extensionsRequired: ['KHR_draco_mesh_compression'],
})
assert.deepEqual(report.extensionsUsed, ['KHR_materials_unlit', 'KHR_draco_mesh_compression', 'EXT_meshopt_compression'])
assert.deepEqual(report.offlineCodecsUsed, ['KHR_draco_mesh_compression', 'EXT_meshopt_compression'])
assert.deepEqual(report.offlineCodecsRequired, ['KHR_draco_mesh_compression'])
assert.doesNotThrow(() => assertStudioGlbCapabilities({ extensionsRequired: ['KHR_materials_unlit'] }))

for (const extension of Object.keys(studioOfflineRequiredGlbCodecs)) {
  assert.equal(validateStudioGlbBytes(glbWithExtensions([extension], [extension])), true, `${extension} should pass pre-storage validation because Studio bundles its offline decoder`)
}

assert.equal(validateStudioGlbBytes(glbWithExtensions(
  ['KHR_draco_mesh_compression', 'EXT_meshopt_compression', 'KHR_texture_basisu'],
  ['KHR_draco_mesh_compression', 'EXT_meshopt_compression', 'KHR_texture_basisu'],
)), true)

const prototypeReport = inspectStudioGlbCapabilities({ extensionsRequired: ['toString', '__proto__', 'constructor'] })
assert.deepEqual(prototypeReport.offlineCodecsRequired, [], 'prototype names must never be mistaken for supported codec keys')

console.log('Meshvara Studio offline codec capability contract passed')
