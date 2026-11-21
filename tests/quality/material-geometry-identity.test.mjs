import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { readZip } from '../../scripts/zip-utils.mjs'

/**
 * Guards real object-specific geometry and portable texture provenance
 * on four rebuilt catalog assets. Structural checks are NOT art approval.
 */
const studied = [
  {slug:'glazed-bay',scene:'glazedbay',min:4900,
   materials:['plaster','concrete','oak'],
   features:['function Mullion','glassWidths.map','<CC0Surface texture="plaster"','<CC0Surface texture="oak"','SplineTube']},
  {slug:'brutalist-stair',scene:'brutaliststair',min:4300,
   materials:['concrete'],
   features:['function Handrail','const levels','<CC0Surface texture="concrete"','rise = .182','<SplineTube']},
  {slug:'aero-wheel',scene:'aerowheel',min:5400,materials:[],
   features:['tyreMap','bumpMap={tyreMap}','function Spoke','ventCircle','const lugs','SplineTube']},
  {slug:'pendant-cluster',scene:'pendantcluster',min:3400,materials:[],
   features:['const fixtures','function Pendant','RevolvedSurface','transmission={.55}','pointLight']},
]
const manifest=JSON.parse(await readFile('public/downloads/manifest.json','utf8'))
const pbrLedger=JSON.parse(await readFile('src/data/cc0ArchitectureTextures.json','utf8'))
const geometry=await readFile('src/components/geometry/GeometryV2.tsx','utf8')
const curved=await readFile('src/components/geometry/CurvedBox.tsx','utf8')
const materialHelper=await readFile('src/components/geometry/CC0Surface.tsx','utf8')
for(const study of studied){
  const source=await readFile(resolve('src/components/scenes',study.scene+'.tsx'),'utf8')
  assert.ok(Buffer.byteLength(source)>=study.min,study.slug+': truncated authored source')
  assert.doesNotMatch(source,/Math\.random\s*\(/,study.slug+': source must be deterministic')
  assert.doesNotMatch(source,/<(?:SpatialForm|IndustrialForm|ArchitectureForm|PerformanceForm)\b/,
    study.slug+': generic form substituted')
  for(const feature of study.features)
    assert.ok(source.includes(feature),study.slug+': missing authored feature '+feature)
  for(const surface of study.materials)
    assert.ok(source.includes('<CC0Surface texture="'+surface+'"'),
      study.slug+': missing explicit PBR dependency declaration for '+surface)
  if(study.slug==='glazed-bay')
    assert.ok(!source.includes('boxGeometry args={[3.3,3.2,.38]}'),
      'Glazed bay must not place a solid wall behind its glazing')
  if(study.slug==='pendant-cluster')
    assert.equal([...source.matchAll(/\{x:[^}\n]+metal:/g)].length,3,
      'Pendant composition must match the advertised three-light catalog asset')
  const entry=manifest.assets.find(a=>a.slug===study.slug)
  assert.ok(entry,study.slug+': missing catalog download')
  if(!process.argv.includes('--packs'))continue
  const bytes=await readFile(resolve('public',entry.file.replace(/^\//,'')))
  assert.equal(createHash('sha256').update(bytes).digest('hex'),entry.sha256,
    study.slug+': archived ZIP no longer matches download hash')
  const zip=readZip(bytes),prefix=study.slug+'/'
  const portable=source
    .replaceAll('../geometry/CurvedBox','./geometry/CurvedBox')
    .replaceAll('../geometry/GeometryV2','./geometry/GeometryV2')
    .replaceAll('../geometry/CC0Surface','./geometry/CC0Surface')
  assert.equal(zip.get(prefix+'src/Scene.tsx')?.toString('utf8'),portable,
    study.slug+': shipped scene source differs from preview')
  if(source.includes('../geometry/GeometryV2'))
    assert.equal(zip.get(prefix+'src/geometry/GeometryV2.tsx')?.toString('utf8'),geometry,
      study.slug+': source archive has outdated shape generator')
  if(source.includes('../geometry/CurvedBox'))
    assert.equal(zip.get(prefix+'src/geometry/CurvedBox.tsx')?.toString('utf8'),curved,
      study.slug+': source archive is missing the curvature helper')
  if(study.materials.length){
    assert.equal(zip.get(prefix+'src/geometry/CC0Surface.tsx')?.toString('utf8'),materialHelper,
      study.slug+': missing local CC0 material helper')
    const notes=zip.get(prefix+'PBR_MATERIALS.md')?.toString('utf8')??''
    assert.match(notes,/Poly Haven/,study.slug+': no material origin/license notes')
    for(const material of study.materials){
      const record=pbrLedger.sources?.[material]
      assert.ok(record,study.slug+': missing provenance for '+material)
      assert.ok(notes.includes(record.sourceUrl),study.slug+': no source URL for '+material)
      for(const map of Object.values(record.maps)){
        const packed=zip.get(prefix+map.outputPath)
        assert.ok(packed,study.slug+': missing CC0 map '+map.outputPath)
        assert.equal(packed.length,map.bytes,study.slug+': texture length drift '+map.outputPath)
        assert.equal(createHash('sha256').update(packed).digest('hex'),map.sha256,
          study.slug+': texture hash drift '+map.outputPath)
      }
    }
  }
  console.log(study.slug+': portable source and verified material provenance passed')
}
console.log('Four authored geometry/material studies structurally checked; human visual review is still required.')
