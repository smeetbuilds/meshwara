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
  assert.equal(report.summary.genericForm,0,'No catalog scene may regress to a generic production form')
  for (const slug of ['precision-milling-vice','hydraulic-tie-rod-cylinder',
      'scara-assembly-robot','delta-pick-robot','plc-control-rack','safety-light-curtain',
      'servo-drive-module','conveyor-diverter-junction','compact-palletizer','vacuum-gripper-array',
      'machine-vision-camera','cnc-rotary-table','twelve-station-tool-turret','six-axis-robot-cell',
      'courtyard-villa-study','glass-house-study','cliff-cabin-study','urban-row-house',
      'museum-wing-study','timber-library-hall','rail-platform-canopy','urban-bus-pavilion',
      'footbridge-lookout-tower','coastal-observation-shelter',
      'patisserie-display-stand','sculptural-pendant-necklace','brushed-signet-ring',
      'aero-cycling-helmet','alpine-ski-goggles','carbon-running-shoe','pro-football-cleat',
      'audio-mastering-desk-scene','product-photography-studio','contemporary-surgical-suite',
      'electric-vehicle-workshop','minimal-living-room-scene','luxury-boutique-display',
      'sculpture-gallery-courtyard','observatory-roof-deck']) {
    assert.equal(report.assets.find(x=>x.slug===slug)?.indicators.genericForm,false,slug+' regressed to generic geometry')
  }
  assert.equal(report.summary.verifiedCc0PbrSources,39,'Curated source provenance count does not match expected releases')
  for (const slug of [
      'courtyard-villa-study','glass-house-study','cliff-cabin-study','urban-row-house',
      'museum-wing-study','timber-library-hall','rail-platform-canopy','urban-bus-pavilion',
      'footbridge-lookout-tower','coastal-observation-shelter']) {
    assert.equal(report.assets.find(x => x.slug === slug)?.indicators.noSourceTexture, false,
      slug+' uses audited locally bundled CC0 textures and must not be marked untextured')
  }
  for (const slug of ['studio-laptop','floor-mirror','research-microscope-pro',
      'professional-saute-pan','fluted-console-cabinet','lion-form-study',
      'succulent-arrangement','torque-wrench']) {
    assert.equal(report.assets.find(x => x.slug === slug)?.indicators.noSourceTexture, false,
      slug+' has embedded original scanned PBR textures')
  }

  assert.equal(report.assets.find(x=>x.slug==='vr-headset').visualStatus,'unreviewed')
  assert.equal(report.assets.find(x=>x.slug==='delta-pick-robot').visualStatus,'unreviewed')
  const strict=spawnSync(process.execPath,['scripts/audit-visual-fidelity.mjs','--strict','--output',output],{encoding:'utf8'})
  assert.equal(strict.status,1,'Unapproved assets must block the visual release gate')
  assert.match(strict.stderr,/Visual release gate blocked/)
  console.log('Visual fidelity contract passed: all 500 require independent art approval.')
} finally {await rm(folder,{recursive:true,force:true})}
