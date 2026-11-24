import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { readZip } from '../../scripts/zip-utils.mjs'

const entries=[
 {slug:'manta-ray',scene:'mantaray',features:['function rayGeometry','function taperedTube','const stations','vertexColors','data.body.computeVertexNormals','data.lobes']},
 {slug:'koi-pair',scene:'koipair',features:['function bodyGeometry','function koiMaps','function finGeometry','DataTexture','function Fish','Fish variant={0}','Fish variant={1}']},
 {slug:'sea-turtle',scene:'seaturtle',features:['function shellMaps','function shellGeometry','function skinMap','function flipperGeometry','DataTexture','data.front','data.rear']},
 {slug:'stone-pine',scene:'stonepine',features:['function architecture','function branchGeometry','function foliageGeometry','function barkMap','computeFrenetFrames','vertexColors']},
 {slug:'water-lily',scene:'waterlily',features:['function petalGeometry','function padGeometry','function LilyPad','const notch','branching','vertexColors','length:48']},
 {slug:'desert-cactus',scene:'desertcactus',features:['computeFrenetFrames','vertexColors','areoles','instancedMesh','spines','setMatrixAt']},
 {slug:'monarch-butterfly',scene:'monarch',features:['function forewing','function hindwing','function pigment','distanceSq','DataTexture','function Antenna','WingPair side={1}','WingPair side={-1}']}
]
const manifest=process.argv.includes('--packs')?JSON.parse(await readFile('public/downloads/manifest.json','utf8')):null
for(const {slug,scene,features} of entries){
 const src=await readFile('src/components/scenes/'+scene+'.tsx','utf8')
 for(const feature of features)assert.ok(src.includes(feature),slug+' missing '+feature)
 assert.doesNotMatch(src,/Math\.random\s*\(/)
 assert.ok(src.includes('useEffect'),slug+' no explicit resource lifecycle')
 if(manifest){
  const record=manifest.assets.find(a=>a.slug===slug)
  assert.ok(record,slug+' missing portable package')
  const zip=await readFile('public'+record.file)
  assert.equal(createHash('sha256').update(zip).digest('hex'),record.sha256)
  assert.equal(readZip(zip).get(slug+'/src/Scene.tsx')?.toString('utf8'),src,slug+' preview/source parity')
 }
 console.log(slug+': deterministic authored features'+(manifest?' and exact ZIP source verified':' verified'))
}
console.log('Botanical and insect source contracts passed; no photographic fidelity claim.')
