import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { readZip } from '../../scripts/zip-utils.mjs'

/**
 * Named-mechanism regression contract, not a visual realism certificate.
 * Rejects six former generic templates, checks distinct constructed parts,
 * and (optionally) verifies the packaged source/geometry dependency.
 */
const scenes = {
 'precision-milling-vice': {file:'precisionmillingvice',part:['latheScrew','jawOutline','railOutline','serrated','handwheel'],fix:['latheScrew','jawOutline']},
 'hydraulic-tie-rod-cylinder': {file:'hydraulictierodcylinder',part:['tie','rod','head','gland','port'],fix:['tie','head']},
 'scara-assembly-robot': {file:'scaraassemblyrobot',part:['spindleSection','armOne','armTwo','SplineTube','gripper'],fix:['armOne','spindleSection']},
 'delta-pick-robot': {file:'deltapickrobot',part:['motorPoints','toolPoints','toolPlate','vacuum','conveyor'],fix:['motorPoints','toolPoints']},
 'plc-control-rack': {file:'plccontrolrack',part:['controller','terminal','DIN','rail','SPS'],fix:['card','rail']},
 'safety-light-curtain': {file:'safetylightcurtain',part:['infrared','emitter','receiver','sensor','window'],fix:['window','bar']},
}
const checkPacks=process.argv.includes('--packs')
const manifest=checkPacks ? JSON.parse(await readFile('public/downloads/manifest.json','utf8')) : null
for(const [slug,config] of Object.entries(scenes)){
 const source=await readFile('src/components/scenes/'+config.file+'.tsx','utf8')
 assert.ok(source.length>=3200,slug+' has an abbreviated primitive-form source')
 assert.ok(!/<(?:IndustrialForm|SpatialForm|PerformanceForm|ArchitectureForm)\b/.test(source),slug+' uses a generic form')
 assert.ok(source.includes('../geometry/GeometryV2'),slug+' misses custom authored geometry')
 const advanced=(source.match(/<(?:ExtrudedProfile|RevolvedSurface|SplineTube|LeafSurface|LoftSurface)\b/g)||[]).length
 assert.ok(advanced>=8,slug+' uses too little object-specific curved geometry: '+advanced)
 for(const marker of config.fix)assert.ok(source.includes(marker),slug+' misses '+marker)
 const categoryColors=(source.match(/#[0-9a-fA-F]{6}/g)||[]).length
 assert.ok(categoryColors>=3,slug+' lacks material differentiation')
 if(checkPacks){
  const row=manifest.assets.find(x=>x.slug===slug)
  assert.ok(row,'Missing packaged '+slug)
  const zip=await readFile('public'+row.file)
  assert.equal(createHash('sha256').update(zip).digest('hex'),row.sha256)
  assert.equal(zip.length,row.bytes)
  const files=readZip(zip)
  const packaged=files.get(slug+'/src/Scene.tsx')?.toString('utf8')
  assert.equal(packaged,source.replaceAll('../geometry/GeometryV2','./geometry/GeometryV2'),slug+' ZIP differs from preview source')
  assert.ok(files.has(slug+'/src/geometry/GeometryV2.tsx'),slug+' missing portable curved geometry')
 }
}
console.log('Six distinct named industrial mechanisms verified '+(checkPacks?'with ZIP source parity.':'in source.'))
