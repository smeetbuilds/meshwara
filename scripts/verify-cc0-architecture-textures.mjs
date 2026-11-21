import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { readZip } from './zip-utils.mjs'

const root = process.cwd()
const ledger = JSON.parse(await readFile('src/data/cc0ArchitectureTextures.json','utf8'))
const types = ['color','normal','roughness']
assert.equal(ledger.schemaVersion,1)
assert.equal(ledger.license,'CC0-1.0')
assert.equal(ledger.provider,'Poly Haven')
assert.equal(ledger.resolution,1024)
assert.deepEqual(Object.keys(ledger.sources).sort(),['brick','concrete','oak','plaster'])
const hashes = new Map()
for(const [surface,record] of Object.entries(ledger.sources)){
  assert.ok(record.authors.length && record.providerAssetId && record.sourceUrl.startsWith('https://polyhaven.com/a/'))
  assert.deepEqual(Object.keys(record.maps).sort(),types)
  for(const type of types){
    const spec=record.maps[type]
    const expectedPath='public/textures/architecture/'+surface+'/'+type+'.webp'
    assert.equal(spec.outputPath,expectedPath)
    assert.match(spec.originalUrl,/^https:\/\/dl\.polyhaven\.org\//)
    assert.match(spec.originalMd5,/^[a-f0-9]{32}$/)
    assert.match(spec.sha256,/^[a-f0-9]{64}$/)
    assert.equal(spec.width,1024)
    assert.equal(spec.height,1024)
    assert.ok(spec.bytes>=500 && spec.bytes<=450000,'Unbounded surface map '+expectedPath)
    const data=await readFile(resolve(root,spec.outputPath))
    assert.equal(data.length,spec.bytes,expectedPath+' size mismatch')
    assert.equal(data.toString('ascii',0,4),'RIFF')
    assert.equal(data.toString('ascii',8,12),'WEBP')
    assert.equal(createHash('sha256').update(data).digest('hex'),spec.sha256,expectedPath+' checksum mismatch')
    hashes.set(expectedPath,spec.sha256)
  }
}
const scenes=[
 'courtyardvillastudy','glasshousestudy','cliffcabinstudy','urbanrowhouse','museumwingstudy',
 'timberlibraryhall','railplatformcanopy','urbanbuspavilion','footbridgelookouttower','coastalobservationshelter'
]
const catalog=await readFile('src/data/assets.ts','utf8')
const manifest=process.argv.includes('--packs')
  ? JSON.parse(await readFile('public/downloads/manifest.json','utf8')) : null
const helper=await readFile('src/components/geometry/CC0Surface.tsx','utf8')
let packMaterials=0
for(const scene of scenes){
 const source=await readFile('src/components/scenes/'+scene+'.tsx','utf8')
 assert.ok(source.includes("from '../geometry/CC0Surface'"),scene+' misses shared local texture helper')
 const refs=[...new Set([...source.matchAll(/<CC0Surface\s+texture="([^"]+)"/g)].map(x=>x[1]))]
 assert.ok(refs.length>0,scene+' lacks scanned texture maps')
 for(const id of refs)assert.ok(ledger.sources[id],scene+' references unlicensed texture '+id)
 const block=catalog.match(new RegExp("scene:\\s*'"+scene+"'[\\s\\S]*?\\n\\s*\\},"))?.[0]
 assert.ok(block && block.includes('hash-verified CC0 scanned'),scene+' catalog lacks true texture provenance')
 if(manifest){
  const slug=manifest.assets.find(row=>row.slug.replaceAll('-','')===scene)?.slug
  assert.ok(slug,'Missing distributed scene '+scene)
  const info=manifest.assets.find(row=>row.slug===slug)
  const bytes=await readFile('public'+info.file)
  assert.equal(createHash('sha256').update(bytes).digest('hex'),info.sha256,slug+' ZIP hash mismatch')
  const files=readZip(bytes)
  assert.equal(files.get(slug+'/src/Scene.tsx')?.toString('utf8'),
    source.replaceAll('../geometry/GeometryV2','./geometry/GeometryV2').replaceAll('../geometry/CC0Surface','./geometry/CC0Surface'),
    slug+' preview/source mismatch')
  assert.deepEqual(files.get(slug+'/src/geometry/CC0Surface.tsx'),Buffer.from(helper),slug+' helper mismatch')
  const guide=files.get(slug+'/PBR_MATERIALS.md')?.toString('utf8')??''
  assert.ok(guide.includes('CC0-1.0') && guide.includes('Poly Haven'),slug+' missing material license')
  for(const id of refs)for(const type of types){
   const path='public/textures/architecture/'+id+'/'+type+'.webp'
   const packed=files.get(slug+'/'+path)
   assert.ok(packed,slug+' missing portable scanned texture '+path)
   assert.equal(createHash('sha256').update(packed).digest('hex'),hashes.get(path),slug+' texture differs from preview')
   packMaterials++
  }
 }
}
console.log('Four SHA-verified CC0 PBR material sets (12 maps) on ten architecture assets'+
 (manifest?' with '+packMaterials+' verified portable ZIP map entries.':'.'))
