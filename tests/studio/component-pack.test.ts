import assert from 'node:assert/strict'
import { createStudioComponentPack } from '../../src/lib/studioComponentPack.ts'
import { createImportedStudioNode } from '../../src/lib/studioProject.ts'
import type { StudioModelInspection } from '../../src/lib/studioModelTools.ts'
import type { StudioGlbExportResult } from '../../src/lib/studioModelExport.ts'

const node = createImportedStudioNode({ id: 'file-demo', name: 'Demo Robot.glb' })
node.materialOverrides['material-0'] = { color: '#abcdef', textures: { map: 'texture-demo' } }
node.animation = { clip: 'Walk', playing: true, speed: 1, loop: true }
const inspection: StudioModelInspection = {
  meshes: 2, skinnedMeshes: 1, vertices: 1200, triangles: 800, materials: 2, textures: 1, missingNormals: 0,
  bounds: { size: [1, 2, 1], center: [0, 1, 0] },
  animations: [{ name: 'Idle', duration: 2 }, { name: 'Walk', duration: 1.2 }],
  materialSlots: [], warnings: [],
}
const exported: StudioGlbExportResult = {
  bytes: new Uint8Array([0x67,0x6c,0x54,0x46,2,0,0,0]).buffer,
  sourceBytes: 1000,
  outputBytes: 8,
  savingsPercent: 99.2,
  profile: 'desktop',
  maxTextureSize: 2048,
  inspection,
}
const first = createStudioComponentPack(node, inspection, exported, 'desktop')
const second = createStudioComponentPack(node, inspection, exported, 'desktop')
assert.equal(first.filename, 'demo-robot-meshvara-r3f.zip')
assert.deepEqual(first.bytes, second.bytes)
const view = new DataView(first.bytes.buffer, first.bytes.byteOffset, first.bytes.byteLength)
assert.equal(view.getUint32(0, true), 0x04034b50)
assert.equal(view.getUint32(first.bytes.byteLength - 22, true), 0x06054b50)
const text = new TextDecoder().decode(first.bytes)
assert.match(text, /DemoRobot\.tsx/)
assert.match(text, /src\/models\/demo-robot\.glb/)
assert.match(text, /@react-three\/fiber/)
assert.match(text, /10\.7\.7/)
assert.match(text, /meshvara-preset\.json/)
assert.match(text, /does not claim Draco, Meshopt or KTX2 compression/)

console.log('Meshvara Studio deterministic component-pack contract passed')
