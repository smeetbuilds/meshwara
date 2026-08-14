import assert from 'node:assert/strict'
import {
  appendStudioNode,
  createArchiveStudioNode,
  createStudioProject,
  setStudioParentPreserveWorld,
  updateStudioGroupTransform,
  updateStudioTransform,
} from '../../src/lib/studioProject.ts'
import { matricesApproximatelyEqual, studioWorldMatrix } from '../../src/lib/studioTransforms.ts'

const a = createArchiveStudioNode({ slug: 'a', name: 'A' })
const b = createArchiveStudioNode({ slug: 'b', name: 'B' })
let project = appendStudioNode(appendStudioNode(createStudioProject('Transform test'), a), b)
project = updateStudioTransform(project, a.id, { position: [5, 1, -2], rotation: [0.2, -0.15, 0.3], scale: [1.2, 1.2, 1.2] })
project = updateStudioTransform(project, b.id, { position: [-2, 3, 4], rotation: [-0.1, 0.25, 0.15], scale: [0.8, 0.8, 0.8] })

const beforeParent = studioWorldMatrix(project.nodes, b.id)
assert.ok(beforeParent)
const reparented = setStudioParentPreserveWorld(project, b.id, a.id)
assert.equal(reparented.preserved, true)
const afterParent = studioWorldMatrix(reparented.project.nodes, b.id)
assert.ok(afterParent)
assert.equal(matricesApproximatelyEqual(beforeParent, afterParent, 2e-5), true)

const unparented = setStudioParentPreserveWorld(reparented.project, b.id, undefined)
assert.equal(unparented.preserved, true)
const afterUnparent = studioWorldMatrix(unparented.project.nodes, b.id)
assert.ok(afterUnparent)
assert.equal(matricesApproximatelyEqual(beforeParent, afterUnparent, 2e-5), true)

const initialA = studioWorldMatrix(project.nodes, a.id)
const initialB = studioWorldMatrix(project.nodes, b.id)
assert.ok(initialA && initialB)
const nextA = { ...project.nodes.find((node) => node.id === a.id)!.transform, position: [7, 1, -2] as [number, number, number] }
const grouped = updateStudioGroupTransform(project, [a.id, b.id], a.id, nextA)
assert.equal(grouped.preserved, true)
const groupedA = studioWorldMatrix(grouped.project.nodes, a.id)
const groupedB = studioWorldMatrix(grouped.project.nodes, b.id)
assert.ok(groupedA && groupedB)
assert.ok(Math.abs(groupedA[12] - initialA[12] - 2) < 1e-5)
assert.ok(Math.abs(groupedB[12] - initialB[12] - 2) < 1e-5)
assert.ok(Math.abs(groupedB[13] - initialB[13]) < 1e-5)

const childGroupBase = reparented.project
const childBeforeLocal = childGroupBase.nodes.find((node) => node.id === b.id)!.transform.position
const childPrimaryNext = { ...childGroupBase.nodes.find((node) => node.id === b.id)!.transform, position: [childBeforeLocal[0] + 1, childBeforeLocal[1], childBeforeLocal[2]] as [number, number, number] }
const ancestorSelected = updateStudioGroupTransform(childGroupBase, [a.id, b.id], b.id, childPrimaryNext)
assert.equal(ancestorSelected.preserved, true)
assert.deepEqual(ancestorSelected.project.nodes.find((node) => node.id === b.id)!.transform.position, childBeforeLocal)

console.log('Meshvara Studio world-transform preservation contract passed')
