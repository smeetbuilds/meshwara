import assert from 'node:assert/strict'
import {
  STUDIO_HUMANOID_ROLES,
  addStudioPose,
  cloneStudioRigWithFreshPoseIds,
  createStudioPose,
  createStudioPoseLibrary,
  defaultStudioRig,
  duplicateStudioPose,
  mirrorStudioPoseDirection,
  parseStudioPoseLibrary,
  removeStudioPose,
  sanitizeStudioRig,
  suggestStudioHumanoidMapping,
  type StudioRigBoneInfo,
} from '../../src/lib/studioRigState.ts'

const bones: StudioRigBoneInfo[] = [
  { id: 'Hips[0]', name: 'mixamorig:Hips', depth: 0 },
  { id: 'Hips[0]/Spine[0]', name: 'Spine', parentId: 'Hips[0]', depth: 1 },
  { id: 'Hips[0]/Spine[0]/Spine2[0]', name: 'Spine2', parentId: 'Hips[0]/Spine[0]', depth: 2 },
  { id: 'Hips[0]/LeftArm[0]', name: 'LeftArm', parentId: 'Hips[0]', depth: 1 },
  { id: 'Hips[0]/RightArm[0]', name: 'RightArm', parentId: 'Hips[0]', depth: 1 },
  { id: 'Hips[0]/LeftHand[0]', name: 'LeftHand', parentId: 'Hips[0]/LeftArm[0]', depth: 2 },
  { id: 'Hips[0]/RightHand[0]', name: 'RightHand', parentId: 'Hips[0]/RightArm[0]', depth: 2 },
  { id: 'Hips[0]/LeftUpLeg[0]', name: 'LeftUpLeg', parentId: 'Hips[0]', depth: 1 },
  { id: 'Hips[0]/RightUpLeg[0]', name: 'RightUpLeg', parentId: 'Hips[0]', depth: 1 },
]

const mapping = suggestStudioHumanoidMapping(bones)
assert.equal(mapping.hips, 'Hips[0]')
assert.equal(mapping.spine, 'Hips[0]/Spine[0]')
assert.equal(mapping.chest, 'Hips[0]/Spine[0]/Spine2[0]')
assert.equal(mapping.leftUpperArm, 'Hips[0]/LeftArm[0]')
assert.equal(mapping.rightUpperArm, 'Hips[0]/RightArm[0]')
assert.equal(mapping.leftHand, 'Hips[0]/LeftHand[0]')
assert.equal(mapping.rightHand, 'Hips[0]/RightHand[0]')
assert.equal(mapping.leftUpperLeg, 'Hips[0]/LeftUpLeg[0]')
assert.equal(mapping.rightUpperLeg, 'Hips[0]/RightUpLeg[0]')

const left = mapping.leftUpperArm!
const right = mapping.rightUpperArm!
const pose = createStudioPose('Reach Left', {
  [left]: { position: [1, 2, 3], rotation: [0.1, 0.2, 0.3, 0.9], scale: [1, 1, 1] },
  [right]: { position: [-4, 5, 6], rotation: [-0.2, 0.1, -0.1, 0.95], scale: [1, 1, 1] },
})
const mirrored = mirrorStudioPoseDirection(pose, mapping, 'left-to-right')
assert.equal(mirrored.bones[right].position[0], -pose.bones[left].position[0])
assert.equal(mirrored.bones[right].position[1], pose.bones[left].position[1])
assert.ok(Math.abs(mirrored.bones[right].rotation[1] + pose.bones[left].rotation[1] / Math.hypot(...pose.bones[left].rotation)) < 1e-8)
assert.deepEqual(mirrored.bones[left], pose.bones[left], 'source side stays untouched during directional mirror')

let rig = addStudioPose({ ...defaultStudioRig(), mapping }, pose)
assert.equal(rig.activePoseId, pose.id)
const duplicate = duplicateStudioPose(pose)
rig = addStudioPose(rig, duplicate)
assert.notEqual(duplicate.id, pose.id)
assert.equal(rig.poses.length, 2)
rig = removeStudioPose(rig, duplicate.id)
assert.equal(rig.poses.length, 1)
assert.equal(rig.activePoseId, undefined)

const cloned = cloneStudioRigWithFreshPoseIds({ ...rig, activePoseId: pose.id })
assert.equal(cloned.poses.length, 1)
assert.notEqual(cloned.poses[0].id, pose.id)
assert.equal(cloned.activePoseId, cloned.poses[0].id)

const hostile = sanitizeStudioRig({
  mapping: { hips: 'Hips[0]', constructor: 'evil', head: '\ninvalid' },
  activePoseId: 'pose-missing',
  poses: [
    { id: 'pose-valid1234', name: '  Valid  ', bones: { 'Hips[0]': { position: [Infinity, 2, 3], rotation: [0, 0, 0, 0], scale: [-99, 1, 99999] } } },
    { id: 'bad', name: 'Rejected', bones: {} },
  ],
})
assert.equal(hostile.mapping.hips, 'Hips[0]')
assert.equal(Object.prototype.hasOwnProperty.call(hostile.mapping, 'constructor'), false)
assert.equal(hostile.mapping.head, undefined)
assert.equal(hostile.poses.length, 1)
assert.deepEqual(hostile.poses[0].bones['Hips[0]'].rotation, [0, 0, 0, 1])
assert.deepEqual(hostile.poses[0].bones['Hips[0]'].scale, [0.001, 1, 1000])
assert.equal(hostile.activePoseId, undefined)

const library = createStudioPoseLibrary({ ...rig, activePoseId: pose.id })
const restored = parseStudioPoseLibrary(JSON.parse(JSON.stringify(library)))
assert.ok(restored)
assert.deepEqual(restored.mapping, rig.mapping)
assert.equal(restored.poses.length, 1)
assert.equal(parseStudioPoseLibrary({ format: 'meshvara-pose-library', version: 2 }), null)
assert.equal(STUDIO_HUMANOID_ROLES.length, 22)

console.log('Meshvara skeletal rig + pose state contract passed')
