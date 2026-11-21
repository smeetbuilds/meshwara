import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { readZip } from '../../scripts/zip-utils.mjs'

/**
 * The asset source and distributed ZIP must agree. These checks cover source
 * construction and integrity only; they never confer visual artist approval.
 */
const fixtures = [
  {slug:'match-basketball',scene:'basketball',minimum:3200,
    markers:['leatherMaps','bumpMap={bump}','ringOne','channels.map','new THREE.DataTexture']},
  {slug:'tennis-racket',scene:'tennisracket',minimum:3200,
    markers:['const ellipse','mains.map','crosses.map','gripHelix','throatLeft']},
  {slug:'chef-knife',scene:'chefknife',minimum:3200,
    markers:['const blade','const bevel','const rivets','<ExtrudedProfile','<CurvedBox']},
  {slug:'oscilloscope',scene:'oscilloscope',minimum:4100,
    markers:['const traces','function Encoder','const ports','<SplineTube','<CurvedBox']},
  {slug:'action-camera',scene:'actioncamera',minimum:4100,
    markers:['function Lens','facePath','<CurvedBox','<SplineTube','two-prong']},
  {slug:'pneumatic-cylinder',scene:'pneumaticcylinder',minimum:3400,
    markers:['fastenerPositions','AxialCylinder','<CurvedBox','<SplineTube','clevis']},
  {slug:'conveyor-module',scene:'conveyormodule',minimum:3900,
    markers:['function Roller','const stations','<CurvedBox','<SplineTube','drive box']},
  {slug:'air-compressor',scene:'aircompressor',minimum:4400,
    markers:['function Gauge','<capsuleGeometry','<SplineTube','Array.from({length:13}','regulator']},
]
const manifest=JSON.parse(await readFile('public/downloads/manifest.json','utf8'))
const geometry=await readFile('src/components/geometry/GeometryV2.tsx','utf8')
const curvedBox=await readFile('src/components/geometry/CurvedBox.tsx','utf8')
for(const asset of fixtures) {
  const source=await readFile(resolve('src/components/scenes',asset.scene+'.tsx'),'utf8')
  assert.ok(Buffer.byteLength(source)>=asset.minimum,asset.slug+': truncated authored scene')
  assert.doesNotMatch(source,/Math\.random\s*\(/,asset.slug+': nondeterministic source')
  assert.doesNotMatch(source,/<(?:SpatialForm|PerformanceForm|ArchitectureForm|IndustrialForm)\b/,
    asset.slug+': generic shared form substituted for authored object')
  assert.match(source,/<mesh(?:Physical|Standard)Material\b/,asset.slug+': material missing')
  for(const marker of asset.markers)assert.ok(source.includes(marker),asset.slug+': missing '+marker)
  const entry=manifest.assets.find(x=>x.slug===asset.slug)
  assert.ok(entry,asset.slug+': missing download manifest record')
  if(!process.argv.includes('--packs'))continue
  const bytes=await readFile(resolve('public',entry.file.replace(/^\//,'')))
  assert.equal(createHash('sha256').update(bytes).digest('hex'),entry.sha256,
    asset.slug+': distributed ZIP hash differs from download manifest')
  const files=readZip(bytes)
  const root=asset.slug+'/src/'
  const portable=source
    .replaceAll('../geometry/CurvedBox','./geometry/CurvedBox')
    .replaceAll('../geometry/GeometryV2','./geometry/GeometryV2')
  assert.equal(files.get(root+'Scene.tsx')?.toString('utf8'),portable,
    asset.slug+': catalog source differs from shipped ZIP source')
  if(source.includes('../geometry/GeometryV2'))
    assert.equal(files.get(root+'geometry/GeometryV2.tsx')?.toString('utf8'),geometry,
      asset.slug+': packaged geometry helper is not identical')
  if(source.includes('../geometry/CurvedBox'))
    assert.equal(files.get(root+'geometry/CurvedBox.tsx')?.toString('utf8'),curvedBox,
      asset.slug+': packaged curved-box helper is not identical')
  console.log(asset.slug+': authored identity markers and portable ZIP parity pass')
}
console.log('Eight hard-surface and sports source checks pass. No artist sign-off was inferred.')
