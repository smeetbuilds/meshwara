import assert from 'node:assert/strict'
import {
  assetCustomizationRegistryVersion,
  getAssetCustomizationDefinition,
  getAssetCustomizationDefinitionByAssetSlug,
  getAssetCustomizationPreset,
  identifyAssetCustomizationPreset,
  listCustomizableAssets,
  listCustomizableScenes,
  resolveAssetCustomization,
  resolveAssetCustomizationForAsset,
} from '../../src/lib/assetCustomization.ts'
import { decodePlaygroundState, encodePlaygroundState, playgroundDefaults } from '../../src/lib/playgroundState.ts'

assert.equal(assetCustomizationRegistryVersion(), 1)
assert.equal(listCustomizableScenes().length, 13)
assert.equal(listCustomizableAssets().length, 13)
assert.equal(new Set(listCustomizableAssets()).size, 13)

const definition = getAssetCustomizationDefinition('mercury')
assert.ok(definition)
assert.equal(definition.assetSlug, 'mercury-fold')
assert.equal(definition.presets.length, 4)
assert.equal(definition.presets[0].id, 'authored')
assert.equal(getAssetCustomizationDefinitionByAssetSlug('mercury-fold')?.scene, 'mercury')
assert.deepEqual(resolveAssetCustomizationForAsset('mercury-fold'), definition.defaults)

const titanium = getAssetCustomizationPreset('mercury', 'titanium-blue')
assert.ok(titanium)
assert.equal(identifyAssetCustomizationPreset('mercury', titanium), 'titanium-blue')

const hostile = resolveAssetCustomization('mercury', {
  palette: 'duotone',
  primaryColor: 'javascript:red',
  secondaryColor: '#ABCDEF',
  roughnessScale: 99,
  metalnessScale: -5,
  emissiveScale: 99,
  opacity: -1,
  geometryScale: 8,
  wireframe: true,
})
assert.equal(hostile.primaryColor, definition.defaults.primaryColor)
assert.equal(hostile.secondaryColor, '#abcdef')
assert.equal(hostile.roughnessScale, 2)
assert.equal(hostile.metalnessScale, 0)
assert.equal(hostile.emissiveScale, 3)
assert.equal(hostile.opacity, 0.25)
assert.equal(hostile.geometryScale, 1.5)
assert.equal(hostile.wireframe, true)

const encoded = encodePlaygroundState({
  assetSlug: 'mercury-fold',
  ...playgroundDefaults,
  customization: titanium,
})
assert.match(encoded, /(?:^|&)v=2(?:&|$)/)
const decoded = decodePlaygroundState(encoded, 'mercury-fold', true, 'mercury')
assert.ok(decoded)
assert.deepEqual(decoded.customization, titanium)

const legacy = decodePlaygroundState('a=mercury-fold&m=l&p=1&q=crisp&s=light', 'mercury-fold', true, 'mercury')
assert.ok(legacy)
assert.deepEqual(legacy.customization, definition.defaults, 'v1 links without customization migrate to authored defaults')
assert.equal(decodePlaygroundState(encoded, 'prismatic-vault', true, 'prism'), null, 'share state remains asset-bound')

console.log('Meshvara typed customization + share-state contract passed')
