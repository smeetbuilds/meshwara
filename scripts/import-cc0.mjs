import { createHash } from 'node:crypto'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'

const curated={
 'fern-study':'fern_02',
 'croissant-study':'croissant',
 'dining-table':'dining_table',
 'lounge-chair':'mid_century_lounge_chair',
 'desert-boulder-study':'boulder_01',
 'rock-formation':'namaqualand_boulders_01',
 'precision-microscope':'industrial_microscope',
 'bench-plane':'hand_plane_no4',
 'cordless-drill':'Drill_01',
 'architect-desk-lamp':'desk_lamp_arm_01',
 'lounge-ottoman':'Ottoman_01',
 'tea-service':'tea_set_01',
 'nested-side-table-pair':'side_table_01',
 'rangefinder-camera':'Camera_01',
 'bar-stool':'bar_chair_round_01',
 'optical-frames':'round_spectacles',
 'mechanical-compass':'seadogs_compass',
 'brass-wall-sconce':'industrial_wall_sconce',
 'monocoque-chair':'plastic_monobloc_chair_01',
 'bedside-table':'painted_wooden_nightstand',
 'open-frame-shelving':'wooden_bookshelf_worn',
 'counter-height-stool':'metal_stool_01',
 'cafe-side-chair':'painted_wooden_chair_01',
 'sculpted-armchair':'modern_arm_chair_01',
 'timber-bench':'painted_wooden_bench',
 'moss-stone-study':'rock_moss_set_01',
 'writing-desk':'metal_office_desk',
 'stone-coffee-table':'modern_coffee_table_01',
 'three-drawer-chest':'GothicCommode_01',
 'stone-pedestal-table':'modern_coffee_table_02',
 'horse-bust':'horse_head',
 'studio-laptop':'classic_laptop',
 'floor-mirror':'ornate_mirror_01',
 'research-microscope-pro':'vintage_microscope',
 'professional-saute-pan':'brass_pan_01',
 'fluted-console-cabinet':'vintage_cabinet_01',
 'lion-form-study':'lion_head',
 'succulent-arrangement':'cheiridopsis_succulent',
 'torque-wrench':'ratchet_wrench',
 'artisan-bread-basket':'wicker_basket_01',
 'pendant-cluster':'modern_ceiling_lamp_01',
}
const pinnedPath='src/data/cc0Models.json'
const bootstrap=process.argv.includes('--bootstrap')
const targetSlugs=process.argv.filter(x=>x in curated)
const selections=targetSlugs.length?targetSlugs:Object.keys(curated)
const registry=await (async()=>{try{return JSON.parse(await readFile(pinnedPath,'utf8'))}catch(err){if(err.code!=='ENOENT')throw err;return {}}})()
const hash=(data,alg='sha256')=>createHash(alg).update(data).digest('hex')
const safeUrl=u=>{const x=new URL(u);if(x.protocol!=='https:'||!['api.polyhaven.com','dl.polyhaven.org'].includes(x.hostname)||x.hostname==='dl.polyhaven.org'&&!x.pathname.startsWith('/file/ph-assets/Models/'))throw Error('Unapproved source URL');return u}
async function load(url,max=11*1024*1024){
 const approved=safeUrl(url)
 // Retry only transient transport/HTTP failures. Validation and digest
 // failures remain fatal; never relax a pinned model or size requirement.
 for(let attempt=0;attempt<3;attempt++){
  let response,bytes
  try{
   response=await fetch(approved,{headers:{'User-Agent':'Meshvara-curated-CC0/1.0'},signal:AbortSignal.timeout(30000)})
   if(!response.ok){
    if(![408,429,500,502,503,504].includes(response.status)||attempt===2)
     throw Object.assign(Error('Upstream HTTP '+response.status+' '+url),{permanent:true})
    await response.body?.cancel()
    throw Error('Transient upstream HTTP '+response.status)
   }
   bytes=Buffer.from(await response.arrayBuffer())
  }catch(error){
   if(error.permanent||attempt===2)throw error
   console.warn('Retrying CC0 download ('+(attempt+2)+'/3): '+approved+' — '+error.message)
   await new Promise(resolve=>setTimeout(resolve,500*2**attempt))
   continue
  }
  if(bytes.length>max)throw Error('Exceeds input budget '+url)
  return bytes
 }
}
function packGltf(input,source){
 const gltf=structuredClone(input)
 if(gltf.asset?.version!=='2.0'||!Array.isArray(gltf.buffers)||!Array.isArray(gltf.bufferViews))throw Error('Invalid glTF 2.0')
 const blobs=[],offsets=[];let used=0
 function append(bytes){
  const pad=(4-used%4)%4;if(pad){blobs.push(Buffer.alloc(pad));used+=pad}
  const start=used;blobs.push(bytes);used+=bytes.length;return start
 }
 for(const buffer of gltf.buffers){const bytes=source.get(buffer.uri);if(!bytes||bytes.length<buffer.byteLength)throw Error('Missing binary buffer '+buffer.uri);offsets.push(append(bytes))}
 for(const view of gltf.bufferViews){if(!Number.isInteger(view.buffer)||offsets[view.buffer]==null)throw Error('Invalid buffer reference');view.byteOffset=(view.byteOffset||0)+offsets[view.buffer];view.buffer=0}
 for(const image of gltf.images||[]){
  const bytes=source.get(image.uri);if(!bytes||!/\.(jpg|jpeg|png)$/i.test(image.uri))throw Error('Invalid texture '+image.uri)
  const start=append(bytes);image.bufferView=gltf.bufferViews.length;image.mimeType=/\.png$/i.test(image.uri)?'image/png':'image/jpeg';delete image.uri
  gltf.bufferViews.push({buffer:0,byteOffset:start,byteLength:bytes.length})
 }
 gltf.buffers=[{byteLength:used}]
 const json=Buffer.from(JSON.stringify(gltf))
 const jpad=(4-json.length%4)%4
 const bin=Buffer.concat(blobs)
 const bpad=(4-bin.length%4)%4
 const out=Buffer.alloc(12+8+json.length+jpad+8+bin.length+bpad)
 let at=0
 out.writeUInt32LE(0x46546c67,at);at+=4
 out.writeUInt32LE(2,at);at+=4
 out.writeUInt32LE(out.length,at);at+=4
 out.writeUInt32LE(json.length+jpad,at);at+=4
 out.writeUInt32LE(0x4e4f534a,at);at+=4
 json.copy(out,at);at+=json.length
 out.fill(0x20,at,at+jpad);at+=jpad
 out.writeUInt32LE(bin.length+bpad,at);at+=4
 out.writeUInt32LE(0x004e4942,at);at+=4
 bin.copy(out,at)
 if(!gltf.meshes?.length||!gltf.materials?.length||(gltf.images||[]).length<3)throw Error('PBR mesh/texture proof missing')
 return {buffer:out,meshes:gltf.meshes.length,materials:gltf.materials.length,images:gltf.images.length}
}
for(const slug of selections){
 const id=curated[slug]
 const modelPath=resolve('public/models/cc0',slug+'.glb')
 try{
  const cached=await readFile(modelPath)
  if(registry[slug]&&cached.length===registry[slug].bytes&&hash(cached)===registry[slug].sha256){console.log('Verified cached CC0 '+slug);continue}
  throw Error('Corrupted cached model '+slug)
 }catch(err){if(err.code!=='ENOENT')throw err}
 if(!registry[slug]&&!bootstrap)throw Error('Unpinned model import blocked '+slug)
 const data=JSON.parse((await load('https://api.polyhaven.com/files/'+id,1024*1024)).toString('utf8'))
 const info=data.gltf?.['1k']?.gltf
 if(!info?.url||!info?.md5||!info?.include)throw Error('Missing official source references '+id)
 const text=await load(info.url,1024*1024)
 if(hash(text,'md5')!==info.md5)throw Error('Original source MD5 mismatch')
 const resources=new Map(),records=[{url:info.url,size:text.length,md5:info.md5}]
 for(const [name,file] of Object.entries(info.include)){
  if(name.includes('..')||name.startsWith('/')||!file.md5||!file.url||file.size>11*1024*1024)throw Error('Unsafe dependent resource')
  const bytes=await load(file.url)
  if(bytes.length!==file.size||hash(bytes,'md5')!==file.md5)throw Error('Original texture/binary mismatch '+name)
  resources.set(name,bytes);records.push({url:file.url,size:bytes.length,md5:file.md5})
 }
 const built=packGltf(JSON.parse(text.toString('utf8')),resources)
 if(built.buffer.length>18*1024*1024)throw Error('Model binary budget exceeded')
 // Read author and polygon metadata from the same official CC0 provider when pinning.
 const infoMeta=!registry[slug]
  ? JSON.parse((await load('https://api.polyhaven.com/info/'+id,1024*1024)).toString('utf8'))
  : null
 const authors=registry[slug]?.originalAuthors??Object.keys(infoMeta?.authors??{})
 const polycount=registry[slug]?.sourcePolycount??infoMeta?.polycount
 if(!authors.length||!Number.isInteger(polycount)||polycount<1||polycount>250000)
  throw Error('Model provenance or mobile polygon budget failed '+slug)
 const value={provider:'Poly Haven',providerAssetId:id,sourceUrl:'https://polyhaven.com/a/'+id,license:'CC0-1.0',
  path:'/models/cc0/'+slug+'.glb',sha256:hash(built.buffer),bytes:built.buffer.length,
  meshes:built.meshes,materials:built.materials,images:built.images,sourceFiles:records,originalAuthors:authors,sourcePolycount:polycount}
 if(registry[slug]&&registry[slug].sha256!==value.sha256)throw Error('Model SHA differs from repository pin for '+slug)
 await mkdir(dirname(modelPath),{recursive:true})
 await writeFile(modelPath,built.buffer)
 registry[slug]=value
 console.log('Verified '+slug+' / '+id+' / '+(built.buffer.length/1e6).toFixed(2)+' MB / '+built.images+' PBR maps')
}
if(bootstrap){
 await mkdir(dirname(pinnedPath),{recursive:true})
 await writeFile(pinnedPath,JSON.stringify(Object.fromEntries(Object.entries(registry).sort(([a],[b])=>a.localeCompare(b))),null,2)+'\n')
 console.log('Immutable provenance registry generated; commit before live deployment')
}
