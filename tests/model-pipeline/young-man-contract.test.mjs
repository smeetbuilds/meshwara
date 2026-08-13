import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const manifest = JSON.parse(await readFile(resolve(root, 'templates/model-asset/young-man-01.manifest.json'), 'utf8'))
const character = manifest.character

assert.equal(manifest.slug, 'young-man-01')
assert.equal(manifest.kind, 'Character')
assert.equal(manifest.publish, false, 'template must never publish before real model/QA evidence exists')
assert.equal(character.realism, 'Realistic')
assert.equal(character.fullBody, true)
assert.equal(character.closeupReady, true)
assert.equal(character.handCloseupReady, true)
assert.ok(manifest.rig.minBones >= 85)
assert.ok(manifest.rig.minMorphTargets >= 52)
assert.ok(character.facial.minMorphTargets >= 52)

const fingerSemantics = Object.keys(character.handJoints ?? {})
assert.equal(fingerSemantics.length, 30, 'five fingers × three phalange semantics × two hands are required')
for (const side of ['left', 'right']) {
  for (const finger of ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky']) {
    for (const segment of [1, 2, 3]) {
      const key = `${side}${finger}${segment}`
      assert.ok(Array.isArray(character.handJoints[key]) && character.handJoints[key].length >= 2, `missing aliases for ${key}`)
    }
  }
}

const facialSemantics = ['blinkLeft','blinkRight','jawOpen','smileLeft','smileRight','browRaiseLeft','browRaiseRight','browDownLeft','browDownRight','mouthFunnel','mouthPucker','cheekRaiseLeft','cheekRaiseRight']
for (const key of facialSemantics) assert.ok(character.facial.requiredMorphTargets[key]?.length, `missing facial semantic ${key}`)
assert.ok(character.facial.metricsFile)
assert.ok(character.facial.qaEvidence)
assert.ok(character.facial.thresholds.maxLipPenetrationMeters <= 0.002)
assert.ok(character.facial.thresholds.maxEyelidGapMeters <= 0.0015)
assert.ok(character.facial.thresholds.maxExpressionAsymmetryRatio <= 0.06)

assert.ok(character.handQa.metricsFile)
assert.ok(character.handQa.qaEvidence)
assert.ok(character.handQa.thresholds.maxFingerInterpenetrationMeters <= 0.0025)
assert.ok(character.handQa.thresholds.maxJointLimitOvershootDegrees <= 2)

assert.ok(character.lodConsistency.metricsFile)
assert.ok(character.lodConsistency.qaEvidence)
assert.ok(character.lodConsistency.thresholds.maxHeightDriftRatio <= 0.005)
assert.ok(character.lodConsistency.thresholds.maxGroundOffsetMeters <= 0.004)
assert.ok(character.lodConsistency.thresholds.maxSilhouetteDeviationRatio <= 0.03)
assert.ok(character.lodConsistency.thresholds.maxClipDurationDriftSeconds <= 0.02)

const requiredAnimations = ['Idle','Walk','Run','TurnLeft90','TurnRight90','WalkStart','WalkStop','RunStart','RunStop','LookAround','Wave']
const animations = new Map(manifest.animations.map((item) => [item.name, item]))
for (const name of requiredAnimations) assert.ok(animations.has(name), `missing ${name}`)
for (const name of ['Walk', 'Run']) {
  const clip = animations.get(name)
  assert.equal(clip.contactCritical, true)
  assert.ok(clip.metricsFile)
  assert.ok(clip.thresholds.maxFootSlideMeters <= 0.012)
  assert.ok(clip.thresholds.maxContactHeightMeters <= 0.01)
  assert.ok(clip.thresholds.maxRootVerticalJitterMeters <= 0.008)
  assert.ok(clip.thresholds.maxLoopPoseErrorDegrees <= 3)
}

assert.ok(character.deformationQa.length >= 8)
for (const pose of character.deformationQa) {
  assert.ok(pose.qaEvidence)
  assert.ok(pose.metricsFile)
  assert.ok(pose.thresholds.maxSurfacePenetrationMeters <= 0.0035)
  assert.ok(pose.thresholds.maxVolumeLossRatio <= 0.10)
  assert.ok(pose.thresholds.maxNormalDeviationDegrees <= 12)
}

const transitions = new Map(character.transitions.map((item) => [`${item.from}->${item.to}`, item]))
for (const key of ['Idle->Walk','Walk->Idle','Walk->Run','Run->Walk']) {
  const transition = transitions.get(key)
  assert.ok(transition, `missing ${key}`)
  assert.ok(transition.maxBlendSeconds <= 0.24)
  assert.ok(transition.metricsFile)
  assert.ok(transition.qaEvidence)
}

assert.ok(manifest.tiers.desktop.maxTriangles <= 140000)
assert.ok(manifest.tiers.tablet.maxTriangles <= 80000)
assert.ok(manifest.tiers.mobile.maxTriangles <= 45000)
assert.ok(manifest.tiers.desktop.maxBytes <= 12 * 1024 * 1024)
assert.ok(manifest.tiers.tablet.maxBytes <= 8 * 1024 * 1024)
assert.ok(manifest.tiers.mobile.maxBytes <= 5 * 1024 * 1024)

console.log('Young Man 01 production contract test passed.')
