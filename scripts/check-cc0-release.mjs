import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { readZip } from './zip-utils.mjs'

const source = JSON.parse(await readFile('src/data/cc0Models.json', 'utf8'))
const downloads = JSON.parse(await readFile('public/downloads/manifest.json', 'utf8'))
const catalog = await readFile('src/data/assets.ts','utf8')
const portableHelper=await readFile('src/components/geometry/CC0Mesh.tsx')
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex')
const curated = new Set(['fern-study','croissant-study','dining-table','lounge-chair','desert-boulder-study','rock-formation','precision-microscope','bench-plane','cordless-drill','architect-desk-lamp','lounge-ottoman','tea-service','nested-side-table-pair','rangefinder-camera','bar-stool','optical-frames','mechanical-compass','brass-wall-sconce','monocoque-chair','bedside-table','open-frame-shelving','counter-height-stool','cafe-side-chair','sculpted-armchair','timber-bench','moss-stone-study','writing-desk','stone-coffee-table','three-drawer-chest','stone-pedestal-table'])
assert.equal(Object.keys(source).length, 30, 'All curated PBR sources should be pinned')
for (const [slug, record] of Object.entries(source)) {
  assert.ok(curated.has(slug), 'Unexpected third-party asset source: '+slug)
  assert.equal(record.license, 'CC0-1.0')
  assert.equal(record.provider, 'Poly Haven')
  assert.equal(record.sourceUrl, 'https://polyhaven.com/a/'+record.providerAssetId)
  assert.match(record.sha256, /^[a-f0-9]{64}$/)
  assert.ok(record.images>=3 && record.meshes>=1 && record.materials>=1)
  assert.ok(Number.isInteger(record.sourcePolycount) && record.sourcePolycount>0 && record.sourcePolycount<=250000,
    'Sourced geometry exceeds the mobile budget: '+slug)
  assert.ok(record.sourceFiles?.length>=4, 'Missing upstream source provenance')
  assert.ok(record.originalAuthors?.length>=1 && record.originalAuthors.every(name=>typeof name==='string' && name.trim().length>=3), 'Original artist attribution missing: '+slug)
  for (const file of record.sourceFiles) {
    assert.ok(file.url.startsWith('https://dl.polyhaven.org/file/ph-assets/Models/'))
    assert.match(file.md5, /^[a-f0-9]{32}$/)
  }
  const bytes = await readFile('public/models/cc0/'+slug+'.glb')
  assert.equal(bytes.byteLength, record.bytes)
  assert.equal(sha256(bytes), record.sha256)
  assert.equal(bytes.readUInt32LE(0), 0x46546c67, 'Invalid GLB magic')
  assert.equal(bytes.readUInt32LE(4), 2)
  assert.equal(bytes.readUInt32LE(8), bytes.byteLength)
  const jsonLen = bytes.readUInt32LE(12)
  assert.equal(bytes.readUInt32LE(16), 0x4e4f534a)
  const gltf = JSON.parse(bytes.subarray(20,20+jsonLen).toString('utf8').trim())
  const binOffset = 20+jsonLen
  assert.equal(bytes.readUInt32LE(binOffset+4), 0x004e4942)
  const binLength = bytes.readUInt32LE(binOffset)
  assert.equal(binOffset+8+binLength, bytes.byteLength)
  assert.equal(gltf.asset.version, '2.0')
  assert.equal(gltf.meshes?.length, record.meshes)
  assert.equal(gltf.materials?.length, record.materials)
  assert.equal(gltf.images?.length, record.images)
  assert.equal(gltf.buffers?.length, 1)
  assert.ok(gltf.images.every(image => image.uri == null &&
    Number.isInteger(image.bufferView) && image.mimeType?.startsWith('image/')))
  assert.ok(gltf.bufferViews.every(view =>
    view.buffer===0 && (view.byteOffset||0)>=0 &&
    (view.byteOffset||0)+view.byteLength <= binLength
  ))
  const asset = downloads.assets.find(item => item.slug===slug)
  assert.ok(asset, 'Missing ZIP download manifest entry: '+slug)
  const zip = await readFile('public'+asset.file)
  assert.equal(zip.byteLength, asset.bytes)
  assert.equal(sha256(zip), asset.sha256)
  const entries = readZip(zip)
  const glb = entries.get(slug+'/src/models/'+slug+'.glb')
  assert.ok(glb, 'ZIP is missing the source GLB: '+slug)
  assert.equal(sha256(glb), record.sha256, 'Download model differs from on-site model: '+slug)
  const portable = entries.get(slug+'/src/Scene.tsx')?.toString('utf8')
  assert.ok(portable?.includes("new URL('./models/"+slug+".glb', import.meta.url).href"))
  const block = catalog.match(new RegExp("slug:\\s*'"+slug+"'[\\s\\S]*?\\n\\s*\\},"))?.[0]
  assert.ok(block?.includes("sourceType: 'Hybrid'"), 'Published catalog/source type mismatch: '+slug)
  const sceneName=block.match(/scene:\s*'([^']+)'/)?.[1]
  assert.ok(sceneName, 'Missing referenced catalog scene: '+slug)
  const expected=(await readFile('src/components/scenes/'+sceneName+'.tsx','utf8'))
   .replaceAll('../geometry/CC0Mesh','./geometry/CC0Mesh')
   .replace("const modelUrl = '/models/cc0/"+slug+".glb'","const modelUrl = new URL('./models/"+slug+".glb', import.meta.url).href")
  assert.equal(portable,expected,'Portable scene does not match rendered TSX source: '+slug)
  assert.deepEqual(entries.get(slug+'/src/geometry/CC0Mesh.tsx'),portableHelper,'ZIP includes stale model viewer helper: '+slug)

  assert.ok(entries.has(slug+'/src/geometry/CC0Mesh.tsx'))
  const license = entries.get(slug+'/LICENSE-ASSET.md')?.toString('utf8')
  assert.ok(license?.includes('CC0') && license.includes(record.providerAssetId))
  assert.ok(record.originalAuthors.every(name=>license.includes(name)), 'ZIP omits creator attribution: '+slug)
  assert.equal(JSON.parse(entries.get(slug+'/MODEL-PROVENANCE.json').toString('utf8')).sha256, record.sha256)
}
console.log('CC0 release check passed: '+Object.keys(source).length+' SHA-pinned PBR models, embedded textures, ZIP parity and CC0 provenance.')
