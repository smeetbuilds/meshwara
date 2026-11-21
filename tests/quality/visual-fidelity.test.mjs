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
  // Six previously generic industrial assemblies must never regress to
  // ProductionForms. This assertion shrinks when more named objects are fixed.
  assert.equal(report.summary.genericForm,15,'An object-specific architectural or industrial scene regressed to generic geometry')
  for (const slug of ['precision-milling-vice','hydraulic-tie-rod-cylinder',
      'scara-assembly-robot','delta-pick-robot','plc-control-rack','safety-light-curtain',
      'servo-drive-module','conveyor-diverter-junction','compact-palletizer','vacuum-gripper-array',
      'machine-vision-camera','cnc-rotary-table','twelve-station-tool-turret','six-axis-robot-cell',
      'courtyard-villa-study','glass-house-study','cliff-cabin-study','urban-row-house',
      'museum-wing-study','timber-library-hall','rail-platform-canopy','urban-bus-pavilion',
      'footbridge-lookout-tower','coastal-observation-shelter']) {
    assert.equal(report.assets.find(x=>x.slug===slug)?.indicators.genericForm,false,slug+' regressed to generic geometry')
  }
  assert.equal(report.summary.verifiedCc0PbrSources,31,'Curated source provenance count does not match expected releases')
  assert.equal(report.assets.find(x=>x.slug==='vr-headset').visualStatus,'unreviewed')
  assert.equal(report.assets.find(x=>x.slug==='delta-pick-robot').visualStatus,'unreviewed')
  const strict=spawnSync(process.execPath,['scripts/audit-visual-fidelity.mjs','--strict','--output',output],{encoding:'utf8'})
  assert.equal(strict.status,1,'Unapproved assets must block the visual release gate')
  assert.match(strict.stderr,/Visual release gate blocked/)
  console.log('Visual fidelity contract passed: all 500 require independent art approval.')
} finally {await rm(folder,{recursive:true,force:true})}
