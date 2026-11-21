import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'
import { readZip } from '../../scripts/zip-utils.mjs'

/**
 * Regression guard for 8 object-specific November 2026 scene replacements.
 * It checks authored features, portable dependencies and byte-for-byte ZIP
 * parity. Human recognition and artistic realism require image-based review.
 */
const targets=[
  {slug:'lathe-chuck',scene:'lathechuck',min:3800,markers:['plateRings','FaceBolt','const steps','rear spindle register']},
  {slug:'otoscope',scene:'otoscope',min:4600,markers:['function Selector','speculum','gripRings']},
  {slug:'thermal-printer',scene:'thermalprinter',min:4300,markers:['receiptTexture','function Receipt','getAttribute(\'position\')','Array.from({length:6']},
  {slug:'magnetic-stirrer',scene:'magneticstirrer',min:5500,markers:['beakerProfile','function ControlKnob','transmission','RevolvedSurface']},
  {slug:'sourdough-loaf',scene:'sourdough',min:4200,markers:['crustMaps','function LoafBody','SlashedCrust','computeVertexNormals']},
  {slug:'performance-surfboard',scene:'surfboard',min:3750,markers:['const stations','<LoftSurface','function Fin','padRibs']},
  {slug:'network-router',scene:'networkrouter',min:4600,markers:['function Antenna','function Port','antennaX','RF venting']},
  {slug:'mushroom-cluster',scene:'mushroomcluster',min:4400,markers:['capMap','capShape','gills.map','mycelium']},
]
const manifest=JSON.parse(await readFile('public/downloads/manifest.json','utf8'))
const geometryV2=await readFile('src/components/geometry/GeometryV2.tsx','utf8')
const curvedBox=await readFile('src/components/geometry/CurvedBox.tsx','utf8')
const checked=new Set()
for(const target of targets){
  const source=await readFile(resolve('src/components/scenes',target.scene+'.tsx'),'utf8')
  assert.ok(Buffer.byteLength(source)>=target.min,target.slug+': source unexpectedly truncated')
  assert.ok(!checked.has(target.slug),target.slug+': duplicate test record')
  checked.add(target.slug)
  for(const marker of target.markers)
    assert.ok(source.includes(marker),target.slug+': missing object-specific feature '+marker)
  assert.doesNotMatch(source,/Math\.random\s*\(/,target.slug+': nondeterministic construction')
  assert.doesNotMatch(source,/<(?:SpatialForm|PerformanceForm|ArchitectureForm|IndustrialForm)\b/,
    target.slug+': shared generic-form fallback')
  assert.match(source,/<mesh(?:Standard|Physical)Material\b/,target.slug+': lacks authored materials')
  const info=manifest.assets.find(a=>a.slug===target.slug)
  assert.ok(info,target.slug+': missing ZIP manifest')
  if(!process.argv.includes('--packs')) continue
  const bytes=await readFile(resolve('public',info.file.replace(/^\//,'')))
  assert.equal(createHash('sha256').update(bytes).digest('hex'),info.sha256,
    target.slug+': manifest hash differs from actual ZIP')
  const zip=readZip(bytes),prefix=target.slug+'/src/'
  const portable=source
    .replaceAll('../geometry/CurvedBox','./geometry/CurvedBox')
    .replaceAll('../geometry/GeometryV2','./geometry/GeometryV2')
  assert.equal(zip.get(prefix+'Scene.tsx')?.toString('utf8'),portable,
    target.slug+': source in ZIP differs from visible scene')
  if(source.includes('../geometry/GeometryV2'))
    assert.equal(zip.get(prefix+'geometry/GeometryV2.tsx')?.toString('utf8'),geometryV2,
      target.slug+': geometry helper unavailable or outdated in ZIP')
  if(source.includes('../geometry/CurvedBox'))
    assert.equal(zip.get(prefix+'geometry/CurvedBox.tsx')?.toString('utf8'),curvedBox,
      target.slug+': curvature helper unavailable or outdated in ZIP')
  console.log(target.slug+': authored source, ZIP digest and portable helper checks passed')
}
assert.equal(checked.size,8)
console.log('Eight object-specific source checks completed; visual approval remains independent.')
