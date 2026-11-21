import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { readZip } from '../../scripts/zip-utils.mjs'

/** Object identity and portable source parity, never an artistic or building-code certificate. */
const scenes = {
 'courtyard-villa-study': {file:'courtyardvillastudy',required:['columns','windows','planting']},
 'glass-house-study': {file:'glasshousestudy',required:['mullions','rafters','oak']},
 'cliff-cabin-study': {file:'cliffcabinstudy',required:['roofFrame','braces','cliffFootprint']},
 'urban-row-house': {file:'urbanrowhouse',required:['levels','bays','courses']},
 'museum-wing-study': {file:'museumwingstudy',required:['columns','skylights','art']},
 'timber-library-hall': {file:'timberlibraryhall',required:['shelfLevels','beamBays','books']},
 'rail-platform-canopy': {file:'railplatformcanopy',required:['sleepers','frames','track']},
 'urban-bus-pavilion': {file:'urbanbuspavilion',required:['ribs','roofSection','seat']},
 'footbridge-lookout-tower': {file:'footbridgelookouttower',required:['steps','poles','deckStations']},
 'coastal-observation-shelter': {file:'coastalobservationshelter',required:['headland','boardSlats','windColumns']},
}
const catalog=await readFile('src/data/assets.ts','utf8')
const manifest=process.argv.includes('--packs')?JSON.parse(await readFile('public/downloads/manifest.json','utf8')):null
const signatures=new Set()
for(const [slug,config] of Object.entries(scenes)){
 const source=await readFile('src/components/scenes/'+config.file+'.tsx','utf8')
 assert.ok(source.length>3400,slug+' truncated to a placeholder')
 assert.ok(!/<(?:ArchitectureForm|IndustrialForm|PerformanceForm|SpatialForm)\b/.test(source),slug+' reverted to a generic template')
 assert.ok(source.includes('../geometry/GeometryV2'),slug+' missing real profile geometry')
 const uses=(source.match(/<(?:ExtrudedProfile|RevolvedSurface|SplineTube|LeafSurface|LoftSurface)\b/g)||[]).length
 assert.ok(uses>=8,slug+' lacks independently composed modeled details ('+uses+')')
 for(const marker of config.required) assert.ok(source.includes(marker),slug+' lost a distinguishing feature '+marker)
 assert.ok((source.match(/#[0-9a-f]{6}/gi)||[]).length>=4,slug+' lacks material differentiation')
 const block=catalog.match(new RegExp("slug:\\s*'"+slug+"'[\\s\\S]*?\\n\\s*\\},"))?.[0]
 assert.ok(block,slug+' missing catalog')
 const checksum=createHash('sha256').update(source.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s+/g,' ').replace(/#[a-f\d]{6}/gi,'#COLOR')).digest('hex')
 assert.ok(!signatures.has(checksum),slug+' duplicates a previous architecture scene')
 signatures.add(checksum)
 if(manifest){
  const row=manifest.assets.find(x=>x.slug===slug)
  assert.ok(row,slug+' download entry missing')
  const zip=await readFile('public'+row.file)
  assert.equal(zip.length,row.bytes)
  assert.equal(createHash('sha256').update(zip).digest('hex'),row.sha256)
  const files=readZip(zip)
  assert.equal(files.get(slug+'/src/Scene.tsx')?.toString('utf8'),source.replaceAll('../geometry/GeometryV2','./geometry/GeometryV2'),slug+' ZIP does not match live source')
  assert.ok(files.has(slug+'/src/geometry/GeometryV2.tsx'),slug+' ZIP missing geometry helper')
 }
}
console.log(Object.keys(scenes).length+' unique architectural studies verified'+(manifest?' with complete preview-to-ZIP source parity':'')+'. Human artistic approval remains required.')
