import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createZip } from '../../scripts/zip-utils.mjs'
import { readZipEntries, stripSingleRoot } from '../../scripts/distribution/core.mjs'
import { componentName, enrichCustomizableArchive } from '../../scripts/enrich-customizable-packs.mjs'

const registry = JSON.parse(await readFile(resolve(process.cwd(), 'src/data/customization-registry.json'), 'utf8'))
const asset = { slug: 'mercury-fold', name: 'Mercury Fold', scene: 'mercury', sourceType: 'Procedural' }
const definition = { scene: 'mercury', ...registry.scenes.mercury }
const component = componentName(asset.name)
const prefix = `${asset.slug}/`
const archive = createZip([
  { name: `${prefix}README.md`, data: '# Mercury Fold\n' },
  { name: `${prefix}package.json`, data: '{"type":"module"}\n' },
  { name: `${prefix}src/Scene.tsx`, data: 'export default function Scene(){ return <mesh /> }\n' },
  { name: `${prefix}src/${component}.tsx`, data: `import SceneObject from './Scene'\nexport function ${component}() {\n  return <group><SceneObject /></group>\n}\nexport default ${component}\n` },
  { name: `${prefix}src/index.ts`, data: `export { default, ${component} } from './${component}'\n` },
  { name: `${prefix}meshvara.json`, data: '{"stale":true}\n' },
])

const enriched = enrichCustomizableArchive(archive, asset, definition)
const files = new Map(stripSingleRoot(readZipEntries(enriched), asset.slug).map((entry) => [entry.relative, entry.bytes.toString('utf8')]))
for (const path of ['src/customization.ts', 'src/CustomizationLayer.tsx', 'src/CustomizableScene.tsx', 'CUSTOMIZATION.json']) assert.ok(files.has(path), `enriched pack missing ${path}`)
assert.ok(!files.has('meshvara.json'), 'stale Pack-v1 metadata must be removed before standardization')
assert.match(files.get(`src/${component}.tsx`), /customization\?: Partial<AssetCustomization>/)
assert.match(files.get(`src/${component}.tsx`), /<SceneObject customization=\{customization\} \/>/)
assert.match(files.get('src/index.ts'), /MercuryFoldCustomization/)
assert.match(files.get('src/customization.ts'), /titanium-blue/)
assert.match(files.get('src/CustomizationLayer.tsx'), /material\.depthWrite = authored\.depthWrite && material\.opacity >= 0\.999/)
assert.match(files.get('README.md'), /## Typed customization/)
assert.deepEqual(JSON.parse(files.get('CUSTOMIZATION.json')).assetSlug, asset.slug)

const second = enrichCustomizableArchive(enriched, asset, definition)
assert.deepEqual(second, enriched, 'customization enrichment must be byte-deterministic and idempotent')
assert.throws(() => enrichCustomizableArchive(archive, { ...asset, slug: 'wrong-slug' }, definition), /identity mismatch/)

console.log('Meshvara curated pack customization parity passed')
