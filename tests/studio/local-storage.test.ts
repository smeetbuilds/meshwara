import assert from 'node:assert/strict'
import { appendStudioNode, createImportedStudioNode, createStudioProject, updateStudioNode } from '../../src/lib/studioProject.ts'
import {
  createPortableStudioProject,
  deleteStudioProject,
  garbageCollectStudioFiles,
  listStudioFiles,
  loadStudioFile,
  restorePortableStudioProject,
  saveStudioProject,
  storeStudioFile,
  storeStudioTexture,
} from '../../src/lib/studioStorage.ts'

function validMinimalGlb() {
  const encoder = new TextEncoder()
  const raw = encoder.encode(JSON.stringify({ asset: { version: '2.0' }, scene: 0, scenes: [{}] }))
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

function pngBytes() {
  const bytes = new Uint8Array(32)
  bytes.set([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a])
  return bytes
}

const model = await storeStudioFile(new File([validMinimalGlb()], 'local.glb', { type: 'model/gltf-binary' }))
const texture = await storeStudioTexture(new File([pngBytes()], 'albedo.png', { type: 'image/png' }))
assert.equal(model.kind, 'glb')
assert.equal(texture.kind, 'texture')

const node = createImportedStudioNode(model)
let project = appendStudioNode(createStudioProject('Storage contract'), node)
project = updateStudioNode(project, node.id, { materialOverrides: { 'material-0': { textures: { map: texture.id } } } })
await saveStudioProject(project)
const portable = await createPortableStudioProject(project)
assert.equal(portable.files.length, 2)
assert.deepEqual(new Set(portable.files.map((file) => file.kind)), new Set(['glb', 'texture']))

const orphan = await storeStudioTexture(new File([pngBytes()], 'orphan.png', { type: 'image/png' }))
const protectedGc = await garbageCollectStudioFiles([orphan.id])
assert.equal(protectedGc.deletedFiles, 0)
assert.ok(await loadStudioFile(orphan.id))
const gc = await garbageCollectStudioFiles()
assert.equal(gc.deletedFiles, 1)
assert.equal(await loadStudioFile(orphan.id), null)
assert.ok(await loadStudioFile(model.id))
assert.ok(await loadStudioFile(texture.id))

const historyOnly = await storeStudioTexture(new File([pngBytes()], 'history-only.png', { type: 'image/png' }))
await deleteStudioProject(project, [historyOnly.id])
assert.equal(await loadStudioFile(model.id), null)
assert.equal(await loadStudioFile(texture.id), null)
assert.ok(await loadStudioFile(historyOnly.id), 'project deletion must preserve media protected by active history')
await garbageCollectStudioFiles()
assert.equal(await loadStudioFile(historyOnly.id), null)

const restored = await restorePortableStudioProject(portable)
assert.equal(restored.nodes.length, 1)
assert.equal((await loadStudioFile(model.id))?.kind, 'glb')
assert.equal((await loadStudioFile(texture.id))?.kind, 'texture')
assert.equal((await listStudioFiles()).length, 2)

console.log('Meshvara Studio local storage + portable media contract passed')
