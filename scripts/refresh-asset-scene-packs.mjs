import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createZip, readZip } from './zip-utils.mjs'

const slugs = process.argv.slice(2)
if (!slugs.length || slugs.some(x=>!/^[-a-z0-9]+$/.test(x)))
  throw new Error('Specify one or more asset slugs to refresh, e.g. vr-headset')
const root=process.cwd()
const source=await readFile(resolve(root,'src/data/assets.ts'),'utf8')
const manifestPath=resolve(root,'public/downloads/manifest.json')
const manifest=JSON.parse(await readFile(manifestPath,'utf8'))
const blocks=[...source.matchAll(/\{\s*\n?\s*slug:\s*'[^']+'[\s\S]*?\n\s*\},/g)].map(x=>x[0])
const get=(block,key)=>block.match(new RegExp(key+":\\s*'([^']+)'"))?.[1]
const bySlug=new Map(blocks.map(block=>[get(block,'slug'),block]))
for (const slug of new Set(slugs)) {
  const block=bySlug.get(slug)
  if (!block) throw new Error('Unknown asset slug: '+slug)
  if (get(block,'sourceType')==='Model') throw new Error('Use the licensed GLB release process for '+slug)
  const scene=get(block,'scene')
  const item=manifest.assets.find(asset=>asset.slug===slug)
  if (!scene||!item) throw new Error('Invalid asset registration: '+slug)
  const path=resolve(root,'public',item.file.replace(/^\//,''))
  const entries=readZip(await readFile(path))
  const rootPrefix=slug+'/src/'
  const key=rootPrefix+'Scene.tsx'
  if (!entries.has(key)) throw new Error('Missing scene entry for '+slug)
  const text=await readFile(resolve(root,'src/components/scenes',scene+'.tsx'),'utf8')
  const imports=[...text.matchAll(/from ['"]\.\.\/geometry\/([A-Za-z0-9]+)['"]/g)].map(x=>x[1])
  if (/from ['"]\.\.\//.test(text.replace(/from ['"]\.\.\/geometry\/[A-Za-z0-9]+['"]/g,'')))
    throw new Error('Unsupported cross-directory source import in '+slug)
  const files=new Map(entries)
  files.set(key,Buffer.from(text.replaceAll('../geometry/','./geometry/')))
  for (const [name] of entries)
    if (name.startsWith(rootPrefix+'geometry/')) files.delete(name)
  for (const geometry of imports)
    files.set(rootPrefix+'geometry/'+geometry+'.tsx',await readFile(resolve(root,'src/components/geometry',geometry+'.tsx')))
  const readme=slug+'/README.md'
  if (files.has(readme)) files.set(readme, Buffer.from(files.get(readme).toString('utf8').replaceAll('production-grade Three.js asset','procedural Three.js source study')))
  const quality=slug+'/QUALITY.md'
  files.set(quality,Buffer.from('# Meshvara / visual-fidelity disclosure\n\n- Download and preview source are synchronized.\n- Geometry and archive integrity are automated checks, not evidence of photorealism.\n- Object likeness, scale, topology and materials still require independent artist review.\n- Do not present this asset as an approved scan or certified production model.\n'))
  const zip=createZip([...files].map(([name,data])=>({name,data})).sort((a,b)=>a.name.localeCompare(b.name)))
  await writeFile(path,zip)
  item.bytes=zip.byteLength
  item.sha256=createHash('sha256').update(zip).digest('hex')
  console.log('Refreshed '+slug+': '+zip.length+' bytes; '+imports.join(',')+' geometry helpers; SHA '+item.sha256.slice(0,12))
}
await writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n')
