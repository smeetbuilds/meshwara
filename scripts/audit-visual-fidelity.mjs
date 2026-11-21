import { createHash } from 'node:crypto'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'

const root = process.cwd()
const outputArg = process.argv.indexOf('--output')
const output = resolve(root, outputArg >= 0 ? process.argv[outputArg + 1] : 'public/quality/visual-fidelity.json')
const strict = process.argv.includes('--strict')
const source = await readFile(resolve(root, 'src/data/assets.ts'), 'utf8')
const blocks = [...source.matchAll(/\{\s*\n?\s*slug:\s*'[^']+'[\s\S]*?\n\s*\},/g)].map(match => match[0])
const approvalDocument = JSON.parse(await readFile(resolve(root,'quality/visual-approvals.json'),'utf8'))
if (approvalDocument.schemaVersion !== 1 || !approvalDocument.approved ||
    typeof approvalDocument.approved !== 'object' || Array.isArray(approvalDocument.approved))
  throw new Error('Invalid visual approval registry')
const record = []
const problems = []
const get = (block, key) => block.match(new RegExp(key + ":\\s*'([^']+)'"))?.[1] ?? null
const requiredChecks = ['identity','silhouette','proportions','materials','threeAngles','performance','downloadMatches']
for (const block of blocks) {
  const slug=get(block,'slug'), scene=get(block,'scene'), name=get(block,'name')
  const category=get(block,'category'), sourceType=get(block,'sourceType')
  if (!slug || !scene || !name || !sourceType) throw new Error('Invalid catalog entry')
  const content=await readFile(resolve(root,'src/components/scenes',scene+'.tsx'))
  const sourceText=content.toString('utf8')
  const sourceSha256=createHash('sha256').update(content).digest('hex')
  const indicators={
    genericForm: /<(?:PerformanceForm|SpatialForm|ArchitectureForm|IndustrialForm)\b/.test(sourceText),
    noSourceTexture: !/(?:TextureLoader|useTexture|map=\{|(?:roughness|normal|metalness|ao)Map=|\.png|\.jpg|\.ktx2|\.webp)/i.test(sourceText),
    smallSource: content.byteLength<1500,
    primitivesPresent: /<(?:box|sphere|cylinder|cone|capsule|torus|plane|circle)Geometry\b/.test(sourceText),
  }
  const approval=approvalDocument.approved[slug]
  let approved=false
  if (approval) {
    const issueCount=problems.length
    if (approval.sourceSha256!==sourceSha256) problems.push(slug+': source changed since visual approval')
    if (typeof approval.reviewer!=='string' || approval.reviewer.trim().length<3) problems.push(slug+': no named reviewer')
    if (typeof approval.reviewDate!=='string' || !/^\d{4}-\d{2}-\d{2}$/.test(approval.reviewDate)) problems.push(slug+': invalid review date')
    if (!requiredChecks.every(key=>approval.checks?.[key]===true)) problems.push(slug+': missing visual criteria')
    const paths=approval.evidencePaths
    if (!Array.isArray(paths) || paths.length<3 ||
       !paths.every(path=>typeof path==='string' && path.startsWith('quality/evidence/') && !path.includes('..'))) {
      problems.push(slug+': needs front, side and three-quarter evidence')
    } else {
      for (const path of paths) {
        try { if ((await stat(resolve(root,path))).size<1024) problems.push(slug+': evidence too small: '+path) }
        catch { problems.push(slug+': missing evidence: '+path) }
      }
    }
    approved=problems.length===issueCount
  }
  record.push({slug,name,category,sourceType,scene,sourceSha256,visualStatus:approved?'artist-approved':'unreviewed',indicators})
}
for (const slug of Object.keys(approvalDocument.approved))
  if (!record.some(asset=>asset.slug===slug)) problems.push(slug+': unknown approval slug')
const summary={
  catalogCount:record.length,
  artistApproved:record.filter(x=>x.visualStatus==='artist-approved').length,
  needsVisualReview:record.filter(x=>x.visualStatus!=='artist-approved').length,
  genericForm:record.filter(x=>x.indicators.genericForm).length,
  smallSource:record.filter(x=>x.indicators.smallSource).length,
  noSourceTexture:record.filter(x=>x.indicators.noSourceTexture).length,
}
if (record.length!==500) throw new Error('Catalog count changed: '+record.length)
if (problems.length) throw new Error('Invalid artist approvals:\n'+problems.join('\n'))
const report={
  schemaVersion:1,
  generatedBy:'scripts/audit-visual-fidelity.mjs',
  warning:'Structural checks measure code, not likeness or realism. No scene is visually certified without a signed, evidenced review.',
  requiredChecks,
  summary,assets:record,
}
await mkdir(dirname(output),{recursive:true})
await writeFile(output,JSON.stringify(report,null,2)+'\n')
console.log('Visual fidelity: '+summary.artistApproved+'/'+summary.catalogCount+' artist-approved; '+summary.needsVisualReview+' pending; '+summary.genericForm+' generic-form scenes.')
if (strict && summary.needsVisualReview) {
  console.error('Visual release gate blocked: '+summary.needsVisualReview+' unreviewed assets.')
  process.exitCode=1
}
