import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const folder=await mkdtemp(join(tmpdir(),'meshvara-fidelity-'))
try {
  const output=join(folder,'report.json')
  const result=spawnSync(process.execPath,['scripts/audit-visual-fidelity.mjs','--output',output],{encoding:'utf8'})
  assert.equal(result.status,0,result.stderr)
  const report=JSON.parse(await readFile(output,'utf8'))
  assert.equal(report.summary.catalogCount,500)
  assert.equal(report.summary.artistApproved,0,'Code metrics cannot certify visual fidelity')
  assert.equal(report.summary.needsVisualReview,500)
  assert.ok(report.summary.genericForm>=35,'Structural risk signals unexpectedly missing')
  assert.equal(report.assets.find(x=>x.slug==='vr-headset').visualStatus,'unreviewed')
  assert.equal(report.assets.find(x=>x.slug==='delta-pick-robot').indicators.genericForm,true)
  const strict=spawnSync(process.execPath,['scripts/audit-visual-fidelity.mjs','--strict','--output',output],{encoding:'utf8'})
  assert.equal(strict.status,1,'Unapproved assets must block the visual release gate')
  assert.match(strict.stderr,/Visual release gate blocked/)
  console.log('Visual fidelity contract passed: all 500 require independent art approval.')
} finally {await rm(folder,{recursive:true,force:true})}
