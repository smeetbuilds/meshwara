import assert from 'node:assert/strict'
import { buildRegistry, normalizeManifest, normalizeRegistry } from '../../scripts/distribution/core.mjs'

const source = {
  brand: 'MESHVARA', count: 2, assets: [
    { slug: 'alpha-form', name: 'Alpha Form', category: 'Objects', subcategory: null, file: '/downloads/alpha-form.zip', bytes: 100, sha256: '1'.repeat(64) },
    { slug: 'beta-glass', name: 'Beta Glass', category: 'Glass', subcategory: 'Optical', file: '/downloads/beta-glass.zip', bytes: 200, sha256: '2'.repeat(64) },
  ],
}
const normalized = normalizeManifest(source)
assert.equal(normalized.count, 2)
const registry = buildRegistry(source, { dependencies: {
  three: '0.185.1', react: '19.2.8', '@react-three/fiber': '9.7.0', '@react-three/drei': '10.7.7', ignored: '1.0.0',
} })
assert.equal(registry.schemaVersion, 1)
assert.equal(registry.assets[0].archive.href, '../downloads/alpha-form.zip')
assert.deepEqual(Object.keys(registry.dependencies), ['three', 'react', '@react-three/fiber', '@react-three/drei'])
assert.deepEqual(normalizeRegistry(registry).assets.map((asset) => asset.slug), ['alpha-form', 'beta-glass'])
assert.throws(() => normalizeManifest({ ...source, count: 3 }), /count mismatch/)
assert.throws(() => normalizeManifest({ brand: 'x', assets: [source.assets[0], source.assets[0]] }), /duplicate slug/)
console.log('Meshvara registry schema contract passed')
