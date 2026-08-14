import assert from 'node:assert/strict'
import {
  STUDIO_HISTORY_LIMIT,
  appendStudioNode,
  commitStudioHistory,
  createArchiveStudioNode,
  createStudioHistory,
  createStudioProject,
  duplicateStudioNode,
  parseStudioProject,
  redoStudioHistory,
  undoStudioHistory,
  updateStudioScene,
  updateStudioTransform,
} from '../../src/lib/studioProject.ts'
import { createStudioConfig, generateStudioConfigModule } from '../../src/lib/studioExport.ts'

const empty = createStudioProject('Foundation test')
assert.equal(empty.nodes.length, 0)
assert.equal(empty.format, 'meshvara-project')
assert.equal(empty.version, 1)

const archive = createArchiveStudioNode({ slug: 'precision-chrono', name: 'Precision Chrono' })
assert.equal(archive.assetSlug, 'precision-chrono')
assert.equal(archive.kind, 'archive')

let project = appendStudioNode(empty, archive)
project = updateStudioTransform(project, archive.id, { position: [1, 2, 3], scale: [2, 2, 2] })
assert.deepEqual(project.nodes[0].transform.position, [1, 2, 3])
assert.deepEqual(project.nodes[0].transform.scale, [2, 2, 2])

const duplicated = duplicateStudioNode(project, archive.id)
assert.equal(duplicated.project.nodes.length, 2)
assert.notEqual(duplicated.nodeId, archive.id)
assert.equal(duplicated.project.nodes[1].assetSlug, 'precision-chrono')

let history = createStudioHistory(project)
history = commitStudioHistory(history, updateStudioScene(project, { exposure: 1.5 }))
assert.equal(history.present.scene.exposure, 1.5)
history = undoStudioHistory(history)
assert.equal(history.present.scene.exposure, 1)
history = redoStudioHistory(history)
assert.equal(history.present.scene.exposure, 1.5)

for (let index = 0; index < STUDIO_HISTORY_LIMIT + 10; index += 1) {
  history = commitStudioHistory(history, updateStudioScene(history.present, { exposure: 1 + index / 100 }))
}
assert.equal(history.past.length, STUDIO_HISTORY_LIMIT)

const hostile = JSON.parse(JSON.stringify(project))
hostile.scene.exposure = 999
hostile.scene.background = 'javascript:alert(1)'
hostile.nodes[0].transform.position = [Infinity, -Infinity, 999999999]
const sanitized = parseStudioProject(hostile)
assert.ok(sanitized)
assert.equal(sanitized.scene.exposure, 3)
assert.equal(sanitized.scene.background, '#101112')
assert.deepEqual(sanitized.nodes[0].transform.position, [0, 0, 10000])

const wrongVersion = { ...project, version: 2 }
assert.equal(parseStudioProject(wrongVersion), null)

const config = createStudioConfig(project)
assert.equal(config.objects[0].source.type, 'meshvara')
assert.equal(config.objects[0].source.slug, 'precision-chrono')
assert.match(generateStudioConfigModule(project), /satisfies MeshvaraStudioConfig/)

console.log('Meshvara Studio project-state contract passed')
