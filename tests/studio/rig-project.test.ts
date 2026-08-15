import assert from 'node:assert/strict'
import {
  createImportedStudioNode,
  createStudioProject,
  duplicateStudioNode,
  parseStudioProject,
  resolveStudioRig,
  updateStudioNode,
} from '../../src/lib/studioProject.ts'
import { addStudioPose, createStudioPose } from '../../src/lib/studioRigState.ts'
import { createStudioConfig, generateStudioConfigModule, generateStudioR3FScaffold } from '../../src/lib/studioExport.ts'

const imported = createImportedStudioNode({ id: 'file-rig-1234', name: 'hero.glb' })
assert.deepEqual(resolveStudioRig(imported.rig), { mapping: {}, poses: [] })
let project = { ...createStudioProject('Rig project'), nodes: [imported] }
const pose = createStudioPose('Hero Pose', {
  'Hips[0]': { position: [0, 1, 0], rotation: [0, 0, 0, 1], scale: [1, 1, 1] },
})
project = updateStudioNode(project, imported.id, { rig: addStudioPose({ mapping: { hips: 'Hips[0]' }, poses: [] }, pose) })

const roundTrip = parseStudioProject(JSON.parse(JSON.stringify(project)))
assert.ok(roundTrip)
assert.equal(roundTrip.nodes[0].rig?.mapping.hips, 'Hips[0]')
assert.equal(roundTrip.nodes[0].rig?.poses[0].name, 'Hero Pose')
assert.equal(roundTrip.nodes[0].rig?.activePoseId, pose.id)

const legacy = JSON.parse(JSON.stringify(project))
delete legacy.nodes[0].rig
const migrated = parseStudioProject(legacy)
assert.ok(migrated)
assert.deepEqual(resolveStudioRig(migrated.nodes[0].rig), { mapping: {}, poses: [] })

const duplicated = duplicateStudioNode(project, imported.id)
assert.ok(duplicated.nodeId)
const copy = duplicated.project.nodes.find((node) => node.id === duplicated.nodeId)!
assert.equal(copy.rig?.poses.length, 1)
assert.notEqual(copy.rig?.poses[0].id, pose.id)
assert.equal(copy.rig?.activePoseId, copy.rig?.poses[0].id)

const config = createStudioConfig(project)
assert.equal(config.objects[0].rig?.mapping.hips, 'Hips[0]')
assert.equal(config.objects[0].rig?.poses[0].name, 'Hero Pose')
assert.match(generateStudioConfigModule(project), /rig\?:/)
assert.match(generateStudioR3FScaffold(project), /rig: object\.rig/)

console.log('Meshvara skeletal rig project + export contract passed')
