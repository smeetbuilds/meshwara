import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { readZip } from '../../scripts/zip-utils.mjs'

const paths={
  'vr-headset':'vrheadset',
  'robotics-assembly-cell':'roboticsassemblycell',
  'advanced-research-laboratory':'advancedresearchlaboratory'
}
const manifest=JSON.parse(await readFile('public/downloads/manifest.json','utf8'))
for(const [slug,scene] of Object.entries(paths)){
  const entry=manifest.assets.find(x=>x.slug===slug)
  assert.ok(entry,'Missing asset manifest: '+slug)
  const zip=await readFile(resolve('public',entry.file.replace(/^\//,'')))
  assert.equal(createHash('sha256').update(zip).digest('hex'),entry.sha256)
  const files=readZip(zip)
  const file=files.get(slug+'/src/Scene.tsx')
  assert.ok(file,'Missing portable source: '+slug)
  const source=await readFile('src/components/scenes/'+scene+'.tsx','utf8')
  assert.equal(file.toString('utf8'),source.replaceAll('../geometry/','./geometry/'),slug+' preview and download disagree')
  assert.ok(!source.includes('<SpatialForm'),'Generic non-semantic shapes should not be used for '+slug)
  assert.ok(source.includes("CurvedBox"),'Real semantic components must be present: '+slug)
  assert.ok(files.has(slug+'/src/geometry/CurvedBox.tsx'),'Missing portable curve geometry in '+slug)
  assert.ok(!files.has(slug+'/src/geometry/ProductionForms.tsx'),'Unused generic form should not remain in ZIP')
  assert.ok(files.get(slug+'/QUALITY.md').toString('utf8').includes('independent artist review'),'No unsupported QA claim in '+slug)
}
console.log('Object-specific preview/source ZIP parity passed for '+Object.keys(paths).length+' rebuilt studies.')
