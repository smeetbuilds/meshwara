import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

/**
 * Source-risk work queue for all published MESHVARA assets.
 * Risk flags are prompts for visual inspection, never substitutes for it.
 */
const input=resolve('public/quality/visual-fidelity.json')
const output=resolve('public/quality/rebuild-workqueue.json')
const report=JSON.parse(await readFile(input,'utf8'))
if(report.schemaVersion!==1||!Array.isArray(report.assets)||report.assets.length!==500)
  throw new Error('Expected a current 500-asset visual fidelity report')
const seen=new Set()
const difficult=new Set(['Animals','People','Vehicles','Architecture','Scenes'])
const measured=new Set(['Medical','Scientific','Industrial','Tools','Technology'])
function method(asset) {
  if(asset.category==='Animals'||asset.category==='People')
    return 'Species/anatomy reference board, Blender/sculpted topology, UV+PBR or licensed scan, anatomical pose and LOD review'
  if(asset.category==='Architecture'||asset.category==='Scenes')
    return 'Dimensioned scene blocking, bespoke modular modeling, physically scaled PBR surfaces, accurate light and multi-angle walkthrough'
  if(asset.category==='Vehicles'||asset.category==='Industrial'||asset.category==='Tools')
    return 'Hard-surface CAD/Blender reference reconstruction, mechanical assembly, bevels, wear maps, calibrated PBR and exploded-view QA'
  if(asset.category==='Medical'||asset.category==='Scientific'||asset.category==='Technology')
    return 'Object-specific orthographic references, hard-surface component assembly, realistic ports/controls, labeled materials and PBR'
  if(asset.category==='Food'||asset.category==='Nature')
    return 'High-fidelity sculpt or source-matched scan, organic displacement and UV PBR, color/reference calibration'
  return 'Reference-matched bespoke mesh, proper UV/PBR maps, model-specific materials and three-view QA'
}
function rank(asset) {
  const i=asset.indicators
  const reasons=[]
  let score=0
  if(i.genericForm){score+=24;reasons.push('generic shared form')}
  if(i.smallSource){score+=18;reasons.push('small source (risk only)')}
  if(i.noSourceTexture){score+=19;reasons.push('no direct/verified surface textures')}
  if(i.primitivesPresent){score+=8;reasons.push('primitive components require proportion review')}
  if(difficult.has(asset.category)){score+=20;reasons.push('high-anatomy or scene-complexity category')}
  else if(measured.has(asset.category)){score+=12;reasons.push('precision hardware/mechanical category')}
  if(asset.sourceType==='Model'){score-=8;reasons.push('model provenance and likeness still require review')}
  if(asset.visualStatus==='artist-approved') score=0
  else reasons.push('no independent visual approval')
  return {score:Math.max(0,score),reasons}
}
const work=report.assets.map(asset=>{
  if(seen.has(asset.slug))throw new Error('Duplicate visual asset '+asset.slug)
  seen.add(asset.slug)
  const risk=rank(asset)
  return {
    slug:asset.slug,name:asset.name,category:asset.category,
    scene:asset.scene,sourceSha256:asset.sourceSha256,
    visualStatus:asset.visualStatus,
    sourceRiskScore:risk.score,sourceRiskSignals:risk.reasons,
    nextAction:asset.visualStatus==='artist-approved'
      ? 'Retain approved source; rerun review after source changes'
      : method(asset),
    requiredHumanEvidence:[
      'front-view screenshot','side-view screenshot','three-quarter-view screenshot',
      'independent form/material/art-direction review',
      'source/ZIP/viewer parity','mobile performance measurements'
    ],
  }
}).sort((a,b)=>b.sourceRiskScore-a.sourceRiskScore||a.slug.localeCompare(b.slug))
if(work.length!==500||seen.size!==500)throw new Error('Incomplete 500-asset work queue')
const summary={
  total:work.length,
  artistApproved:work.filter(x=>x.visualStatus==='artist-approved').length,
  awaitingVisualApproval:work.filter(x=>x.visualStatus!=='artist-approved').length,
  elevatedSourceRisk:work.filter(x=>x.sourceRiskScore>=55).length,
  important:'Scores rank structural inspection risk only. They cannot certify photorealism or compare actual art quality.'
}
await mkdir(dirname(output),{recursive:true})
await writeFile(output,JSON.stringify({
  schemaVersion:1,
  source:'public/quality/visual-fidelity.json',
  summary,
  assets:work,
},null,2)+'\n')
console.log('Rebuild work queue: '+summary.total+' tracked, '+summary.awaitingVisualApproval+
  ' visual reviews pending, '+summary.elevatedSourceRisk+' high structural-risk sources.')
