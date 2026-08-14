import assert from 'node:assert/strict'
import {
  STUDIO_HISTORY_LIMIT,
  appendStudioNode,
  commitStudioHistory,
  collectStudioFileIds,
  createArchiveStudioNode,
  createImportedStudioNode,
  createStudioHistory,
  createStudioProject,
  duplicateStudioNodes,
  parseStudioProject,
  redoStudioHistory,
  removeStudioNodes,
  setStudioParent,
  undoStudioHistory,
  updateStudioNode,
  updateStudioScene,
  updateStudioTransform,
} from '../../src/lib/studioProject.ts'
import { createStudioConfig, generateStudioConfigModule, generateStudioR3FScaffold } from '../../src/lib/studioExport.ts'

const empty = createStudioProject('Model editor test')
assert.equal(empty.nodes.length, 0)
assert.equal(empty.format, 'meshvara-project')
assert.equal(empty.version, 1)

const parent = createArchiveStudioNode({ slug: 'precision-chrono', name: 'Precision Chrono' })
const child = createImportedStudioNode({ id: 'file-demo', name: 'Demo.glb' })
let project = appendStudioNode(appendStudioNode(empty, parent), child)
project = setStudioParent(project, child.id, parent.id)
assert.equal(project.nodes.find((node) => node.id === child.id)?.parentId, parent.id)

const cycleAttempt = setStudioParent(project, parent.id, child.id)
assert.equal(cycleAttempt.nodes.find((node) => node.id === parent.id)?.parentId, undefined)

project = updateStudioTransform(project, child.id, { position: [1, 2, 3], scale: [2, 2, 2] })
project = updateStudioNode(project, child.id, {
  materialOverrides: {
    'material-0': { color: '#abcdef', roughness: 0.25, metalness: 0.75, opacity: 0.8, emissive: '#102030', emissiveIntensity: 2, textures: { map: 'texture-demo', normalMap: null } },
  },
  animation: { clip: 'Walk', playing: true, speed: 1.5, loop: false },
  timeline: { duration: 5, fps: 30, loop: true, rangeStart: 0, rangeEnd: 5, keyframes: [{ id: 'key-fixture-1234', time: 0, channel: 'position', value: [1, 2, 3], easing: 'linear' }] },
  debug: { bounds: true, axes: true, skeleton: true },
})
assert.deepEqual(project.nodes.find((node) => node.id === child.id)?.transform.position, [1, 2, 3])

const duplicated = duplicateStudioNodes(project, [parent.id, child.id])
assert.equal(duplicated.nodeIds.length, 2)
const duplicateParent = duplicated.project.nodes.find((node) => node.id === duplicated.nodeIds[0])
const duplicateChild = duplicated.project.nodes.find((node) => node.id === duplicated.nodeIds[1])
assert.ok(duplicateParent && duplicateChild)
assert.equal(duplicateChild.parentId, duplicateParent.id)
assert.equal(duplicateChild.materialOverrides['material-0'].color, '#abcdef')
assert.equal(duplicateChild.materialOverrides['material-0'].textures?.map, 'texture-demo')
assert.deepEqual(new Set(collectStudioFileIds(project)), new Set(['file-demo', 'texture-demo']))

const removedParent = removeStudioNodes(project, [parent.id])
assert.equal(removedParent.nodes.length, 1)
assert.equal(removedParent.nodes[0].parentId, undefined)

let history = createStudioHistory(project)
history = commitStudioHistory(history, updateStudioScene(project, { exposure: 1.5 }))
assert.equal(history.present.scene.exposure, 1.5)
history = undoStudioHistory(history)
assert.equal(history.present.scene.exposure, 1)
history = redoStudioHistory(history)
assert.equal(history.present.scene.exposure, 1.5)
for (let index = 0; index < STUDIO_HISTORY_LIMIT + 10; index += 1) history = commitStudioHistory(history, updateStudioScene(history.present, { exposure: 1 + index / 100 }))
assert.equal(history.past.length, STUDIO_HISTORY_LIMIT)

const hostile = JSON.parse(JSON.stringify(project))
hostile.scene.exposure = 999
hostile.scene.background = 'javascript:alert(1)'
hostile.nodes[1].transform.position = [Infinity, -Infinity, 999999999]
hostile.nodes[1].materialOverrides = {
  'material-0': { color: 'red', roughness: 9, metalness: -2, opacity: 4, emissive: '#ABCDEF', emissiveIntensity: 999, textures: { map: 'texture-valid-1234', normalMap: 'file-wrong-kind', alphaMap: null, evil: 'texture-evil' } },
  '<script>': { color: '#ffffff' },
}
hostile.nodes[1].animation = { clip: 'x'.repeat(500), playing: true, speed: 99, loop: false }
hostile.nodes[1].timeline = {
  duration: 999, fps: 999, loop: false, rangeStart: 999, rangeEnd: -20,
  keyframes: [
    { id: 'key-valid-1234', time: 999, channel: 'position', value: [999999, -999999, 5], easing: 'ease-in-out' },
    { id: '<script>', time: 1, channel: 'position', value: [1, 2, 3], easing: 'evil' },
  ],
}
hostile.nodes[1].debug = { bounds: 1, axes: true, skeleton: true }
const sanitized = parseStudioProject(hostile)
assert.ok(sanitized)
assert.equal(sanitized.scene.exposure, 3)
assert.equal(sanitized.scene.background, '#101112')
assert.deepEqual(sanitized.nodes[1].transform.position, [0, 0, 10000])
assert.equal(sanitized.nodes[1].materialOverrides['material-0'].color, undefined)
assert.equal(sanitized.nodes[1].materialOverrides['material-0'].roughness, 1)
assert.equal(sanitized.nodes[1].materialOverrides['material-0'].metalness, 0)
assert.equal(sanitized.nodes[1].materialOverrides['material-0'].opacity, 1)
assert.equal(sanitized.nodes[1].materialOverrides['material-0'].emissive, '#abcdef')
assert.equal(sanitized.nodes[1].materialOverrides['material-0'].emissiveIntensity, 20)
assert.equal(sanitized.nodes[1].materialOverrides['material-0'].textures?.map, 'texture-valid-1234')
assert.equal(sanitized.nodes[1].materialOverrides['material-0'].textures?.normalMap, undefined)
assert.equal(sanitized.nodes[1].materialOverrides['material-0'].textures?.alphaMap, null)
assert.equal(sanitized.nodes[1].materialOverrides['<script>'], undefined)
assert.equal(sanitized.nodes[1].animation.speed, 4)
assert.equal(sanitized.nodes[1].animation.clip?.length, 120)
assert.equal(sanitized.nodes[1].timeline?.duration, 120)
assert.equal(sanitized.nodes[1].timeline?.fps, 60)
assert.equal(sanitized.nodes[1].timeline?.keyframes.length, 1)
assert.deepEqual(sanitized.nodes[1].timeline?.keyframes[0].value, [10000, -10000, 5])
assert.equal(sanitized.nodes[1].debug.bounds, false)
assert.equal(sanitized.nodes[1].debug.axes, true)

const cyclic = JSON.parse(JSON.stringify(project))
cyclic.nodes[0].parentId = cyclic.nodes[1].id
cyclic.nodes[1].parentId = cyclic.nodes[0].id
const cycleSanitized = parseStudioProject(cyclic)
assert.ok(cycleSanitized)
assert.ok(cycleSanitized.nodes.some((node) => !node.parentId))

const wrongVersion = { ...project, version: 2 }
assert.equal(parseStudioProject(wrongVersion), null)

const config = createStudioConfig(project)
const importedConfig = config.objects.find((object) => object.source.type === 'local-glb')
assert.ok(importedConfig)
assert.equal(importedConfig.parentId, parent.id)
assert.equal(importedConfig.materials['material-0'].color, '#abcdef')
assert.equal(importedConfig.materials['material-0'].textures?.map, 'texture-demo')
assert.equal(importedConfig.animation.clip, 'Walk')
assert.equal(importedConfig.timeline.duration, 5)
assert.equal(importedConfig.timeline.fps, 30)
assert.equal(importedConfig.timeline.keyframes.length, 1)
assert.match(generateStudioConfigModule(project), /satisfies MeshvaraStudioConfig/)
assert.match(generateStudioConfigModule(project), /normalMap/)
assert.match(generateStudioR3FScaffold(project), /renderSource/)
assert.match(generateStudioR3FScaffold(project), /children\.get\(object\.id\)/)
assert.match(generateStudioR3FScaffold(project), /keyframes/)

console.log('Meshvara Studio model-editor + timeline project contract passed')
