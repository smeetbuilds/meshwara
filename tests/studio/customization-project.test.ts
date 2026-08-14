import assert from 'node:assert/strict'
import { createArchiveStudioNode, createStudioProject, parseStudioProject } from '../../src/lib/studioProject.ts'
import { getAssetCustomizationPreset } from '../../src/lib/assetCustomization.ts'
import { createStudioConfig, generateStudioConfigModule, generateStudioR3FScaffold } from '../../src/lib/studioExport.ts'

const node = createArchiveStudioNode({ slug: 'mercury-fold', name: 'Mercury Fold', scene: 'mercury' })
const authored = { ...node.customization }
const preset = getAssetCustomizationPreset('mercury', 'black-chrome')
assert.ok(preset)
node.customization = preset
const project = { ...createStudioProject('Customization parity'), nodes: [node] }

const parsed = parseStudioProject(JSON.parse(JSON.stringify(project)))
assert.ok(parsed)
assert.deepEqual(parsed.nodes[0].customization, preset)

const legacy = JSON.parse(JSON.stringify(project))
delete legacy.nodes[0].customization
const migrated = parseStudioProject(legacy)
assert.ok(migrated)
assert.deepEqual(migrated.nodes[0].customization, authored, 'older project files without customization remain valid')

const hostile = JSON.parse(JSON.stringify(project))
hostile.nodes[0].customization = { palette: 'evil', primaryColor: 'red', secondaryColor: '#ABCDEF', roughnessScale: 99, metalnessScale: -2, emissiveScale: 8, opacity: 0, geometryScale: 9, wireframe: true }
const sanitized = parseStudioProject(hostile)
assert.ok(sanitized)
assert.equal(sanitized.nodes[0].customization.palette, 'authored')
assert.equal(sanitized.nodes[0].customization.primaryColor, '#ffffff')
assert.equal(sanitized.nodes[0].customization.secondaryColor, '#abcdef')
assert.equal(sanitized.nodes[0].customization.roughnessScale, 2)
assert.equal(sanitized.nodes[0].customization.metalnessScale, 0)
assert.equal(sanitized.nodes[0].customization.emissiveScale, 3)
assert.equal(sanitized.nodes[0].customization.opacity, 0.25)
assert.equal(sanitized.nodes[0].customization.geometryScale, 1.5)
assert.equal(sanitized.nodes[0].customization.wireframe, true)

const config = createStudioConfig(project)
assert.deepEqual(config.objects[0].customization, preset)
assert.match(generateStudioConfigModule(project), /customization/)
assert.match(generateStudioR3FScaffold(project), /customization: object\.customization/)

console.log('Meshvara Studio customization project migration contract passed')
