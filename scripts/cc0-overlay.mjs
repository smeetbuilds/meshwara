import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createZip, readZip } from './zip-utils.mjs'

const records=JSON.parse(await readFile('src/data/cc0Models.json','utf8'))
const manifestPath='public/downloads/manifest.json'
const manifest=JSON.parse(await readFile(manifestPath,'utf8'))
const catalogue=await readFile('src/data/assets.ts','utf8')
const helper=await readFile('src/components/geometry/CC0Mesh.tsx')
const sha=data=>createHash('sha256').update(data).digest('hex')
for(const [slug,source] of Object.entries(records)){
 const asset=manifest.assets.find(x=>x.slug===slug)
 if(!asset||source.license!=='CC0-1.0'||source.provider!=='Poly Haven')throw Error('Invalid source/ZIP entry '+slug)
 const block=catalogue.match(new RegExp("slug:\\s*'"+slug+"'[\\s\\S]*?\\n\\s*\\},"))?.[0]
 if(!block||!block.includes("sourceType: 'Hybrid'"))throw Error('Missing Hybrid source type '+slug)
 const scene=block.match(/scene:\s*'([^']+)'/)?.[1]
 const raw=await readFile('src/components/scenes/'+scene+'.tsx','utf8')
 const from="const modelUrl = '/models/cc0/"+slug+".glb'"
 if(!raw.includes(from)||!raw.includes('../geometry/CC0Mesh'))throw Error('Incorrect source URL for '+slug)
 const portable=raw.replaceAll('../geometry/CC0Mesh','./geometry/CC0Mesh')
    .replace(from,"const modelUrl = new URL('./models/"+slug+".glb', import.meta.url).href")
 const glb=await readFile('public/models/cc0/'+slug+'.glb')
 if(sha(glb)!==source.sha256||glb.length!==source.bytes)throw Error('GLB hash mismatch '+slug)
 const zipPath=resolve('public',asset.file.slice(1))
 const originalZip=await readFile(zipPath)
 const files=readZip(originalZip)
 const base=slug+'/'
 const existing=files.get(base+'src/models/'+slug+'.glb')
 const sourcePart=files.get(base+'src/Scene.tsx')?.toString('utf8')
 if(existing && sha(existing)===source.sha256 && sourcePart===portable && files.has(base+'LICENSE-ASSET.md') && files.get(base+'src/geometry/CC0Mesh.tsx')?.equals(helper) && files.get(base+'MODEL-PROVENANCE.json')?.toString('utf8')===JSON.stringify(source,null,2)+'\n' && (source.originalAuthors||[]).every(name=>files.get(base+'LICENSE-ASSET.md')?.toString('utf8').includes(name))){
  // An earlier interrupted run can leave a correct ZIP with a stale manifest.
  // Keep the contract idempotent and repair the digests even in this fast path.
  asset.bytes=originalZip.length
  asset.sha256=sha(originalZip)
  console.log('Already synchronized: '+slug)
  continue
 }
 for(const path of [...files.keys()]){
  if(path.startsWith(base+'src/geometry/')||path.startsWith(base+'src/models/'))files.delete(path)
 }
 files.delete(base+'meshvara.json')
 files.set(base+'src/Scene.tsx',Buffer.from(portable))
 files.set(base+'src/geometry/CC0Mesh.tsx',helper)
 files.set(base+'src/models/'+slug+'.glb',glb)
 files.set(base+'MODEL-PROVENANCE.json',Buffer.from(JSON.stringify(source,null,2)+'\n'))
 const license=[
  '# CC0 source mesh and embedded PBR textures',
  'Original model: '+source.sourceUrl,
  'Published by Poly Haven; source ID: '+source.providerAssetId,
  'Original creator(s): '+(source.originalAuthors||[]).join(', '),
  'License for the model: CC0 1.0. Source wrapper/runtime: MIT.',
  'Downloaded model GLB SHA-256: '+source.sha256,
  'No independent photorealism or artistic acceptance is implied by this license.',
 ].join('\n')+'\n'
 files.set(base+'LICENSE-ASSET.md',Buffer.from(license))
 files.set(base+'QUALITY.md',Buffer.from('# Source quality status\n\n- Model and embedded PBR textures are same-origin and SHA-verified.\n- Package and live model source match byte-for-byte.\n- Independent artistic approval remains pending.\n'))
 const readme=files.get(base+'README.md')?.toString('utf8')||''
 files.set(base+'README.md',Buffer.from(readme.replace('Free procedural Three.js source study','CC0 textured GLB + MIT scene source')+
  '\nInclude src/geometry/CC0Mesh.tsx and src/models/'+slug+'.glb with src/Scene.tsx. See LICENSE-ASSET.md and MODEL-PROVENANCE.json.\n'))
 const zip=createZip([...files].map(([name,data])=>({name,data})).sort((a,b)=>a.name.localeCompare(b.name)))
 await writeFile(zipPath,zip)
 asset.sha256=sha(zip);asset.bytes=zip.length
 console.log('Packed '+slug+': '+zip.length+' bytes')
}
await writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n')
