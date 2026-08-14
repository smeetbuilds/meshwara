import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const read = (path) => readFile(resolve(root, path), 'utf8')
const [registryText, assetsSource, customizationRuntime, layer, assetScene, playgroundState, playground, assetDetail, studioProject, studioViewport, studioInspector, studioShell, studioExport, packEnricher, packageText] = await Promise.all([
  read('src/data/customization-registry.json'),
  read('src/data/assets.ts'),
  read('src/lib/assetCustomization.ts'),
  read('src/components/AssetCustomizationLayer.tsx'),
  read('src/components/AssetScene.tsx'),
  read('src/lib/playgroundState.ts'),
  read('src/components/AssetPlayground.tsx'),
  read('src/routes/assets/$slug.tsx'),
  read('src/lib/studioProject.ts'),
  read('src/components/studio/StudioViewport.tsx'),
  read('src/components/studio/StudioInspector.tsx'),
  read('src/components/studio/StudioShell.tsx'),
  read('src/lib/studioExport.ts'),
  read('scripts/enrich-customizable-packs.mjs'),
  read('package.json'),
])
const registry = JSON.parse(registryText)
const pkg = JSON.parse(packageText)

function assert(condition, message) {
  if (!condition) throw new Error(`Customization contract failed: ${message}`)
}

const expected = [
  ['mercury', 'mercury-fold'], ['prism', 'prismatic-vault'], ['halo', 'halo-assembly'], ['bloom', 'porcelain-bloom'], ['lens', 'liquid-lens'],
  ['spine', 'carbon-spine'], ['filament', 'magnetic-filaments'], ['shards', 'gravity-shards'], ['coil', 'signal-coil'], ['needles', 'vector-needles'],
  ['monolith', 'obsidian-monolith'], ['shell', 'chromatic-shell'], ['velvet', 'velvet-orbit'],
]

assert(registry.schemaVersion === 1, 'registry schemaVersion must be 1')
assert(Object.keys(registry.scenes ?? {}).length === expected.length, 'registry must contain exactly 13 curated scene contracts')
assert(new Set(Object.values(registry.scenes).map((entry) => entry.assetSlug)).size === expected.length, 'curated asset slugs must be unique')

const numericFields = {
  roughnessScale: [0, 2, 0.05], metalnessScale: [0, 2, 0.05], emissiveScale: [0, 3, 0.05], opacity: [0.25, 1, 0.05], geometryScale: [0.5, 1.5, 0.05],
}
for (const [field, [min, max, step]] of Object.entries(numericFields)) {
  const spec = registry.fields?.[field]
  assert(spec?.type === 'number' && spec.min === min && spec.max === max && spec.step === step, `${field} bounds drifted from the typed contract`)
}
assert(JSON.stringify(registry.fields?.palette?.values) === JSON.stringify(['authored', 'mono', 'duotone']), 'palette enum drifted')
assert(registry.fields?.primaryColor?.type === 'color' && registry.fields?.secondaryColor?.type === 'color', 'color fields missing')
assert(registry.fields?.wireframe?.type === 'boolean', 'wireframe field missing')

for (const [scene, slug] of expected) {
  const definition = registry.scenes[scene]
  assert(definition?.assetSlug === slug, `${scene}: expected assetSlug ${slug}`)
  assert(Array.isArray(definition.presets) && definition.presets.length === 4, `${slug}: expected authored + three curated presets`)
  const ids = definition.presets.map((preset) => preset.id)
  assert(ids[0] === 'authored' && new Set(ids).size === ids.length, `${slug}: preset IDs must be unique and authored-first`)
  assert(JSON.stringify(definition.presets[0].value) === JSON.stringify(definition.defaults), `${slug}: authored preset must exactly equal defaults`)
  const assetPattern = new RegExp(`slug:\\s*'${slug}'[\\s\\S]{0,260}?scene:\\s*'${scene}'[\\s\\S]{0,1000}?sourceType:\\s*'(Procedural|Hybrid|Shader)'`)
  assert(assetPattern.test(assetsSource), `${slug}: source asset is missing, scene-mismatched, or no longer a code-authored pack`)
}

for (const token of ['sanitizeAssetCustomization', 'getAssetCustomizationDefinition', 'getAssetCustomizationDefinitionByAssetSlug', 'resolveAssetCustomization', 'resolveAssetCustomizationForAsset', 'identifyAssetCustomizationPreset', 'listCustomizableAssets']) assert(customizationRuntime.includes(token), `runtime missing ${token}`)
for (const token of ['source.clone()', 'material.dispose()', 'roughnessScale', 'metalnessScale', 'emissiveScale', 'geometryScale', 'customization.palette', 'depthWrite']) assert(layer.includes(token), `non-destructive material layer missing ${token}`)
assert(assetScene.includes('<AssetCustomizationLayer') && assetScene.includes('customization?: Partial<AssetCustomization>'), 'AssetScene does not expose the customization contract')
for (const token of ["params.set('v', '2')", "params.set('pm'", "params.set('pc'", "params.set('wf'", 'resolveAssetCustomization']) assert(playgroundState.includes(token), `share-state v2 missing ${token}`)
for (const token of ['03 / MATERIAL + FORM', 'customizationDefinition.presets', 'createDefaultAssetPlaygroundSettings', 'customization={customization}', 'Typed / pack-compatible']) assert(playground.includes(token), `Playground customization surface missing ${token}`)
assert(assetDetail.includes('customization={playground.customization}') && assetDetail.includes('createDefaultAssetPlaygroundSettings(asset.scene)'), 'asset detail preview is not driven by Playground customization')

for (const token of ['customization: AssetCustomization', 'resolveAssetCustomization', 'resolveAssetCustomizationForAsset']) assert(studioProject.includes(token), `Studio project model missing ${token}`)
assert(studioViewport.includes('<AssetCustomizationLayer') && studioViewport.includes('customization={node.customization}'), 'Studio archive viewport does not render the typed customization state')
for (const token of ['TYPED CUSTOMIZATION', 'onCustomizationPatch', 'getAssetCustomizationDefinition', 'Object scale', 'PACK PARITY']) assert(studioInspector.includes(token), `Studio Inspector missing ${token}`)
assert(studioInspector.includes('onCustomizationPatch={(customization) => onNodePatch({ customization })}'), 'Studio Inspector does not commit customization through the history-backed node patch channel')
assert(studioShell.includes('onNodePatch={(patch) => selectedId && patchNode(selectedId, patch)}') && studioShell.includes('commit(updateStudioNode(project, id, patch))'), 'Studio shell does not persist generic Inspector node patches through project history')
assert(studioExport.includes("customization: StudioNode['customization']") && studioExport.includes('customization: object.customization'), 'Studio typed export drops customization state')

for (const token of ['enrichCustomizableArchive', 'CUSTOMIZATION.json', 'CustomizationLayer.tsx', 'CustomizableScene.tsx', 'defaultCustomization', 'customizationPresets', 'Partial<AssetCustomization>', 'meshvara.json']) assert(packEnricher.includes(token), `pack enrichment missing ${token}`)
const packs = pkg.scripts?.packs ?? ''
assert(packs.includes('scripts/enrich-customizable-packs.mjs'), 'pack pipeline does not run customization enrichment')
assert(packs.indexOf('scripts/enrich-customizable-packs.mjs') < packs.indexOf('scripts/standardize-download-packs.mjs'), 'Pack-v1 standardization must run after customization enrichment so metadata hashes the final payload')
for (const script of ['customization:check', 'studio:check', 'distribution:check']) assert(typeof pkg.scripts?.[script] === 'string', `${script} package gate missing`)

console.log(`Meshvara typed customization contract passed (${expected.length} curated assets, Pack/Playground/Studio parity).`)
