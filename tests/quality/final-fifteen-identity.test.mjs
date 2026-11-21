import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { readZip } from '../../scripts/zip-utils.mjs'

/**
 * Object-identity gate for the final 15 former generic form scenes.
 * It ensures distinct topology and portable TSX parity, but cannot
 * certify photorealism, product safety, or human artistic approval.
 */
const scenes = {
 'patisserie-display-stand':['patisseriedisplaystand','pastryPositions','plate','tart'],
 'sculptural-pendant-necklace':['sculpturalpendantnecklace','chain','gem','clasp'],
 'brushed-signet-ring':['brushedsignetring','finger opening','face','engraving'],
 'aero-cycling-helmet':['aerocyclinghelmet','stations','channels','strap'],
 'alpine-ski-goggles':['alpineskigoggles','glass','strapPoints','seal'],
 'carbon-running-shoe':['carbonrunningshoe','upper','eyelets','outsole'],
 'pro-football-cleat':['profootballcleat','studsX','upperStation','heelCollar'],
 'audio-mastering-desk-scene':['audiomasteringdeskscene','channels','rack','console'],
 'product-photography-studio':['productphotographystudio','panel','stand','diffuser'],
 'contemporary-surgical-suite':['contemporarysurgicalsuite','tableSegments','monitor','lights'],
 'electric-vehicle-workshop':['electricvehicleworkshop','pillars','wheels','battery'],
 'minimal-living-room-scene':['minimallivingroomscene','seats','sofa','coffee'],
 'luxury-boutique-display':['luxuryboutiquedisplay','garments','colors','hanger'],
 'sculpture-gallery-courtyard':['sculpturegallerycourtyard','columns','plinths','sculpture'],
 'observatory-roof-deck':['observatoryroofdeck','poles','tube','telescope'],
}
const packed=process.argv.includes('--packs')
const catalog=await readFile('src/data/assets.ts','utf8')
const manifest=packed?JSON.parse(await readFile('public/downloads/manifest.json','utf8')):null
const fingerprints=new Map()
let allOperations=0
for(const [slug,[filename,...markers]] of Object.entries(scenes)){
 const scene=await readFile('src/components/scenes/'+filename+'.tsx','utf8')
 assert.ok(scene.length>=3100,slug+' lacks modeled detail')
 assert.ok(!/<(?:SpatialForm|PerformanceForm|IndustrialForm|ArchitectureForm)\b/.test(scene),slug+' uses a shared generic form')
 assert.ok(scene.includes('../geometry/GeometryV2'),slug+' missing authored geometry')
 const operations=(scene.match(/<(?:LoftSurface|ExtrudedProfile|RevolvedSurface|SplineTube|LeafSurface)\b/g)||[]).length
 assert.ok(operations>=8,slug+' has too few authored geometric operations')
 allOperations+=operations
 const materialUses=(scene.match(/<mesh(?:Physical|Standard)Material\b/g)||[]).length
 assert.ok(materialUses>=5,slug+' lacks distinct real object materials')
 for(const word of markers)assert.ok(scene.toLowerCase().includes(word.toLowerCase()),slug+' lacks structural marker '+word)
 const signature=createHash('sha256').update(scene.replace(/\/\*[\s\S]*?\*\//g,'').replace(/#[a-f0-9]{6}/gi,'#COLOR').replace(/export default function \w+/,'export default function Object').replace(/\s+/g,' ')).digest('hex')
 assert.ok(!fingerprints.has(signature),slug+' is same structure as '+fingerprints.get(signature))
 fingerprints.set(signature,slug)
 const block=catalog.match(new RegExp("slug:\\s*'"+slug+"'[\\s\\S]*?\\n\\s*\\},"))?.[0]
 assert.ok(block && block.includes('description:') && !block.includes('developed as a self-contained React Three Fiber'),slug+' retains generic catalog copy')
 if(manifest){
  const info=manifest.assets.find(a=>a.slug===slug)
  assert.ok(info,slug+' absent from downloadable manifest')
  const bytes=await readFile('public'+info.file)
  assert.equal(bytes.length,info.bytes,slug+' ZIP size mismatch')
  assert.equal(createHash('sha256').update(bytes).digest('hex'),info.sha256,slug+' ZIP checksum mismatch')
  const files=readZip(bytes)
  assert.equal(files.get(slug+'/src/Scene.tsx')?.toString('utf8'),
    scene.replaceAll('../geometry/GeometryV2','./geometry/GeometryV2'),slug+' ZIP TSX diverges from preview')
  assert.ok(files.has(slug+'/src/geometry/GeometryV2.tsx'),slug+' ZIP is not portable')
 }
}
console.log(Object.keys(scenes).length+' individually authored formerly generic assets verified; '+allOperations+' named source geometry operations'+(packed?'; ZIP parity passed.':'.'))
