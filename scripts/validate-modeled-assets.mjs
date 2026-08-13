import { access, readFile, readdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { dirname, extname, resolve, sep } from 'node:path'
import { inspectModel } from './model-inspector.mjs'

const root = process.cwd()
const modelsRoot = process.env.MESHVARA_MODELS_ROOT ? resolve(process.env.MESHVARA_MODELS_ROOT) : resolve(root, 'public/models')
const publishableQaKeys = ['artDirection', 'topology', 'materials', 'rigging', 'animation', 'responsive', 'performance', 'license']

const requiredHumanSemantics = [
  'hips', 'spine', 'chest', 'neck', 'head',
  'leftShoulder', 'leftUpperArm', 'leftLowerArm', 'leftHand',
  'rightShoulder', 'rightUpperArm', 'rightLowerArm', 'rightHand',
  'leftUpperLeg', 'leftLowerLeg', 'leftFoot',
  'rightUpperLeg', 'rightLowerLeg', 'rightFoot',
]
const minimumCharacterAnimations = ['Idle', 'Walk', 'Run', 'TurnLeft90', 'TurnRight90', 'WalkStart', 'WalkStop', 'RunStart', 'RunStop']
const realisticFacialSemantics = ['blinkLeft', 'blinkRight', 'jawOpen', 'smileLeft', 'smileRight', 'browRaiseLeft', 'browRaiseRight', 'browDownLeft', 'browDownRight', 'mouthFunnel', 'mouthPucker', 'cheekRaiseLeft', 'cheekRaiseRight']
const requiredFingerSemantics = [
  'leftThumb1', 'leftThumb2', 'leftThumb3', 'leftIndex1', 'leftIndex2', 'leftIndex3', 'leftMiddle1', 'leftMiddle2', 'leftMiddle3', 'leftRing1', 'leftRing2', 'leftRing3', 'leftPinky1', 'leftPinky2', 'leftPinky3',
  'rightThumb1', 'rightThumb2', 'rightThumb3', 'rightIndex1', 'rightIndex2', 'rightIndex3', 'rightMiddle1', 'rightMiddle2', 'rightMiddle3', 'rightRing1', 'rightRing2', 'rightRing3', 'rightPinky1', 'rightPinky2', 'rightPinky3',
]

function normalizedName(value) {
  return String(value ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '')
}

function matchesAlias(value, aliases = []) {
  const target = normalizedName(value)
  return aliases.some((alias) => {
    const candidate = normalizedName(alias)
    return candidate && (target === candidate || target.endsWith(candidate))
  })
}

function semanticNodeName(character, stats, semantic) {
  const aliases = character?.semanticJoints?.[semantic] ?? []
  return [...stats.nodeNames].find((name) => matchesAlias(name, aliases))
}

function morphTargetMatch(stats, aliases = []) {
  return [...stats.morphTargetNames].find((name) => matchesAlias(name, aliases))
}

async function exists(path) {
  try { await access(path); return true } catch { return false }
}


async function readJsonEvidence(base, relative, label, slug, failures) {
  if (typeof relative !== 'string' || !relative.trim()) {
    fail(failures, slug, `${label} is missing a metrics path`)
    return null
  }
  const metricsPath = resolve(base, relative)
  if (!(metricsPath === base || metricsPath.startsWith(`${base}${sep}`))) {
    fail(failures, slug, `${label} escapes the model directory`)
    return null
  }
  if (!(await exists(metricsPath))) {
    fail(failures, slug, `${label} file not found: ${relative}`)
    return null
  }
  try {
    const parsed = JSON.parse(await readFile(metricsPath, 'utf8'))
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('root must be an object')
    return parsed
  } catch (error) {
    fail(failures, slug, `${label} is not valid JSON: ${error instanceof Error ? error.message : String(error)}`)
    return null
  }
}

function validateMeasuredMaximum(metrics, key, threshold, label, slug, failures) {
  if (!finiteNumber(threshold) || threshold < 0) {
    fail(failures, slug, `${label}.${key} threshold must be a non-negative finite number`)
    return
  }
  const measured = metrics?.[key]
  if (!finiteNumber(measured) || measured < 0) {
    fail(failures, slug, `${label} metrics must contain non-negative finite ${key}`)
    return
  }
  if (measured > threshold) fail(failures, slug, `${label} ${key}=${measured} exceeds threshold ${threshold}`)
}

async function validateMotionMetrics(base, requirement, slug, failures) {
  if (!requirement.contactCritical) return
  if (!requirement.thresholds || typeof requirement.thresholds !== 'object') {
    fail(failures, slug, `animations.${requirement.name} requires thresholds for contact-critical motion`)
    return
  }
  const metrics = await readJsonEvidence(base, requirement.metricsFile, `animations.${requirement.name}.metricsFile`, slug, failures)
  if (!metrics) return
  for (const key of ['maxFootSlideMeters', 'maxContactHeightMeters', 'maxRootVerticalJitterMeters']) {
    validateMeasuredMaximum(metrics, key, requirement.thresholds[key], `animations.${requirement.name}`, slug, failures)
  }
  if (requirement.loop) {
    validateMeasuredMaximum(metrics, 'maxLoopPoseErrorDegrees', requirement.thresholds.maxLoopPoseErrorDegrees, `animations.${requirement.name}`, slug, failures)
  }
}

async function validateTransitionMetrics(base, transition, slug, failures) {
  if (!transition.thresholds || typeof transition.thresholds !== 'object') {
    fail(failures, slug, `transition ${transition.from} -> ${transition.to} requires thresholds`)
    return
  }
  const label = `transition ${transition.from} -> ${transition.to}`
  const metrics = await readJsonEvidence(base, transition.metricsFile, `${label}.metricsFile`, slug, failures)
  if (!metrics) return
  for (const key of ['maxFootSlideMeters', 'maxRootSnapMeters', 'maxAngularSnapDegrees']) {
    validateMeasuredMaximum(metrics, key, transition.thresholds[key], label, slug, failures)
  }
}

async function validateMetricContract(base, contract, label, slug, failures, keys) {
  if (!contract || typeof contract !== 'object' || Array.isArray(contract)) {
    fail(failures, slug, `${label} contract is required`)
    return
  }
  if (!contract.thresholds || typeof contract.thresholds !== 'object') {
    fail(failures, slug, `${label}.thresholds is required`)
    return
  }
  await validateEvidenceFile(base, contract.qaEvidence, `${label}.qaEvidence`, slug, failures)
  const metrics = await readJsonEvidence(base, contract.metricsFile, `${label}.metricsFile`, slug, failures)
  if (!metrics) return
  for (const key of keys) validateMeasuredMaximum(metrics, key, contract.thresholds[key], label, slug, failures)
}

async function validateDeformationMetrics(base, pose, slug, failures) {
  await validateMetricContract(
    base,
    pose,
    `deformationQa.${pose.name ?? 'unnamed'}`,
    slug,
    failures,
    ['maxSurfacePenetrationMeters', 'maxVolumeLossRatio', 'maxNormalDeviationDegrees'],
  )
}

async function validateEvidenceFile(base, relative, label, slug, failures) {
  if (typeof relative !== 'string' || !relative.trim()) {
    fail(failures, slug, `${label} is missing an evidence path`)
    return false
  }
  const evidencePath = resolve(base, relative)
  if (!(evidencePath === base || evidencePath.startsWith(`${base}${sep}`))) {
    fail(failures, slug, `${label} escapes the model directory`)
    return false
  }
  if (!(await exists(evidencePath))) {
    fail(failures, slug, `${label} file not found: ${relative}`)
    return false
  }
  const evidence = await readFile(evidencePath, 'utf8')
  if (evidence.trim().length < 24) {
    fail(failures, slug, `${label} is too short to document a meaningful review`)
    return false
  }
  return true
}

function fail(list, slug, message) {
  list.push(`${slug}: ${message}`)
}


function finiteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value)
}

function validateVec3(value, name, slug, failures) {
  if (!Array.isArray(value) || value.length !== 3 || value.some((item) => !finiteNumber(item))) {
    fail(failures, slug, `${name} must be a finite [x, y, z] tuple`)
    return false
  }
  return true
}

function validateDisplayPreset(preset, name, slug, failures, required = false) {
  if (!preset || typeof preset !== 'object' || Array.isArray(preset)) {
    if (required) fail(failures, slug, `${name} must be an object`)
    return
  }
  if (required || preset.scale !== undefined) {
    if (!finiteNumber(preset.scale) || preset.scale <= 0) fail(failures, slug, `${name}.scale must be a positive finite number`)
  }
  if (required || preset.position !== undefined) validateVec3(preset.position, `${name}.position`, slug, failures)
  if (preset.rotation !== undefined) validateVec3(preset.rotation, `${name}.rotation`, slug, failures)
  if (preset.cameraPosition !== undefined) validateVec3(preset.cameraPosition, `${name}.cameraPosition`, slug, failures)
  if (preset.cameraTarget !== undefined) validateVec3(preset.cameraTarget, `${name}.cameraTarget`, slug, failures)
}

function validateDisplay(manifest, failures) {
  const { display, slug } = manifest
  validateDisplayPreset(display, 'display', slug, failures, true)
  if (display?.defaultClip !== undefined && (typeof display.defaultClip !== 'string' || !display.defaultClip.trim())) {
    fail(failures, slug, 'display.defaultClip must be a non-empty string when provided')
  }
  if (display?.tiers !== undefined) {
    if (!display.tiers || typeof display.tiers !== 'object' || Array.isArray(display.tiers)) {
      fail(failures, slug, 'display.tiers must be an object when provided')
    } else {
      for (const key of Object.keys(display.tiers)) {
        if (!['desktop', 'tablet', 'mobile'].includes(key)) fail(failures, slug, `display.tiers contains unsupported tier ${key}`)
        else validateDisplayPreset(display.tiers[key], `display.tiers.${key}`, slug, failures)
      }
    }
  }
}

function findClip(stats, requirement) {
  const candidates = [requirement.name, ...(requirement.aliases ?? [])].map((value) => value.toLowerCase())
  return stats.animations.find((clip) => candidates.includes(clip.name.toLowerCase()))
}

function validateLicense(manifest, failures) {
  const { license, slug } = manifest
  if (!license?.id || !license?.author || !license?.source) fail(failures, slug, 'license id, author and source are required')
  if (license?.redistribution !== true) fail(failures, slug, 'license does not explicitly allow redistribution')
  if (license?.commercialUse !== true) fail(failures, slug, 'library assets must explicitly allow commercial use')
}

function validateQa(manifest, failures) {
  if (!manifest.publish) return
  for (const key of publishableQaKeys) {
    if (manifest.qa?.[key] !== 'approved') fail(failures, manifest.slug, `publishable model has QA state ${key}=${manifest.qa?.[key] ?? 'missing'}`)
  }
}


async function validateQaEvidence(manifest, base, failures) {
  if (!manifest.publish) return
  for (const key of publishableQaKeys) {
    await validateEvidenceFile(base, manifest.qaEvidence?.[key], `qaEvidence.${key}`, manifest.slug, failures)
  }
}

async function sha256(file) {
  return createHash('sha256').update(await readFile(file)).digest('hex')
}

function validateRig(manifest, stats, failures, tier) {
  const rig = manifest.rig
  if (!rig?.required) return
  if (stats.skins < (rig.minSkins ?? 1)) fail(failures, manifest.slug, `${tier} has ${stats.skins} skin(s), expected at least ${rig.minSkins ?? 1}`)
  if (stats.joints < (rig.minBones ?? 1)) fail(failures, manifest.slug, `${tier} has ${stats.joints} unique joint(s), expected at least ${rig.minBones ?? 1}`)
  if (stats.skinnedPrimitives < 1) fail(failures, manifest.slug, `${tier} has no primitive with JOINTS_0 + WEIGHTS_0`)
  if ((rig.minMorphTargets ?? 0) > stats.morphTargets) fail(failures, manifest.slug, `${tier} has ${stats.morphTargets} morph target(s), expected at least ${rig.minMorphTargets}`)
  if (rig.facialCloseup && stats.morphTargets < Math.max(1, rig.minMorphTargets ?? 1)) fail(failures, manifest.slug, `${tier} is facial-closeup but has no validated morph target set`)
  for (const required of rig.requiredNodeNames ?? []) {
    if (!stats.nodeNames.has(required)) fail(failures, manifest.slug, `${tier} is missing required rig node ${required}`)
  }
}

function validateAnimations(manifest, stats, failures, tier) {
  for (const requirement of manifest.animations ?? []) {
    const clip = findClip(stats, requirement)
    if (!clip) {
      fail(failures, manifest.slug, `${tier} is missing required animation ${requirement.name}`)
      continue
    }
    if (!(clip.duration > 0)) fail(failures, manifest.slug, `${tier} animation ${clip.name} has no positive duration`)
    if (finiteNumber(requirement.minDuration) && clip.duration < requirement.minDuration) {
      fail(failures, manifest.slug, `${tier} animation ${clip.name} duration ${clip.duration.toFixed(3)}s is below ${requirement.minDuration}s`)
    }
    if (finiteNumber(requirement.maxDuration) && clip.duration > requirement.maxDuration) {
      fail(failures, manifest.slug, `${tier} animation ${clip.name} duration ${clip.duration.toFixed(3)}s exceeds ${requirement.maxDuration}s`)
    }
    for (const semantic of requirement.requiredAnimatedSemantics ?? []) {
      const node = semanticNodeName(manifest.character, stats, semantic)
      if (!node) {
        fail(failures, manifest.slug, `${tier} animation ${clip.name} cannot resolve semantic joint ${semantic}`)
        continue
      }
      if (!clip.targetNodeNames.some((name) => normalizedName(name) === normalizedName(node))) {
        fail(failures, manifest.slug, `${tier} animation ${clip.name} does not animate required semantic ${semantic} (${node})`)
      }
    }
  }
}

async function validateCharacterManifest(manifest, base, failures) {
  if (manifest.kind !== 'Character') return
  const character = manifest.character
  if (!character || typeof character !== 'object') {
    fail(failures, manifest.slug, 'Character assets require a character production contract')
    return
  }
  if (!['Realistic', 'Stylized'].includes(character.realism)) fail(failures, manifest.slug, 'character.realism must be Realistic or Stylized')
  if (!['Child', 'Teen', 'YoungAdult', 'Adult', 'OlderAdult', 'NotApplicable'].includes(character.ageBand)) fail(failures, manifest.slug, 'character.ageBand is unsupported')
  if (character.fullBody !== true) fail(failures, manifest.slug, 'publishable character packs must be fullBody=true')
  if (!['InPlace', 'RootMotion'].includes(character.rootMotion)) fail(failures, manifest.slug, 'character.rootMotion must be InPlace or RootMotion')
  for (const semantic of requiredHumanSemantics) {
    const aliases = character.semanticJoints?.[semantic]
    if (!Array.isArray(aliases) || !aliases.some((alias) => typeof alias === 'string' && alias.trim())) {
      fail(failures, manifest.slug, `character.semanticJoints.${semantic} requires at least one alias`)
    }
  }

  const requiredByName = new Map((manifest.animations ?? []).map((item) => [item.name.toLowerCase(), item]))
  if (manifest.publish) {
    for (const clip of minimumCharacterAnimations) {
      if (!requiredByName.has(clip.toLowerCase())) fail(failures, manifest.slug, `production character contract is missing required clip ${clip}`)
    }
    for (const requirement of manifest.animations ?? []) {
      await validateEvidenceFile(base, requirement.qaEvidence, `animations.${requirement.name}.qaEvidence`, manifest.slug, failures)
      await validateMotionMetrics(base, requirement, manifest.slug, failures)
    }
    const transitionPairs = new Set((character.transitions ?? []).map((item) => `${String(item.from).toLowerCase()}->${String(item.to).toLowerCase()}`))
    for (const [from, to] of [['Idle', 'Walk'], ['Walk', 'Idle'], ['Walk', 'Run'], ['Run', 'Walk']]) {
      if (!transitionPairs.has(`${from.toLowerCase()}->${to.toLowerCase()}`)) fail(failures, manifest.slug, `character.transitions is missing ${from} -> ${to}`)
    }
    for (const transition of character.transitions ?? []) {
      if (!requiredByName.has(String(transition.from).toLowerCase()) || !requiredByName.has(String(transition.to).toLowerCase())) {
        fail(failures, manifest.slug, `transition ${transition.from} -> ${transition.to} must reference declared animation requirements`)
      }
      if (!finiteNumber(transition.maxBlendSeconds) || transition.maxBlendSeconds <= 0 || transition.maxBlendSeconds > 0.5) {
        fail(failures, manifest.slug, `transition ${transition.from} -> ${transition.to} maxBlendSeconds must be > 0 and <= 0.5`)
      }
      await validateEvidenceFile(base, transition.qaEvidence, `transition ${transition.from} -> ${transition.to}`, manifest.slug, failures)
      await validateTransitionMetrics(base, transition, manifest.slug, failures)
    }
    const minimumDeformationReviews = character.realism === 'Realistic' ? 8 : 4
    if ((character.deformationQa ?? []).length < minimumDeformationReviews) {
      fail(failures, manifest.slug, `character.deformationQa needs at least ${minimumDeformationReviews} reviewed poses for ${character.realism.toLowerCase()} characters`)
    }
    for (const pose of character.deformationQa ?? []) {
      if (!pose.name || !Array.isArray(pose.semantics) || !pose.semantics.length) fail(failures, manifest.slug, 'each deformationQa entry requires name and semantics')
      for (const semantic of pose.semantics ?? []) {
        if (!requiredHumanSemantics.includes(semantic)) fail(failures, manifest.slug, `deformationQa.${pose.name ?? 'unnamed'} contains unsupported semantic ${semantic}`)
      }
      await validateEvidenceFile(base, pose.qaEvidence, `deformationQa.${pose.name ?? 'unnamed'}`, manifest.slug, failures)
      if (character.realism === 'Realistic') await validateDeformationMetrics(base, pose, manifest.slug, failures)
    }
    if (character.realism === 'Realistic') {
      await validateMetricContract(base, character.lodConsistency, 'character.lodConsistency', manifest.slug, failures, ['maxHeightDriftRatio', 'maxGroundOffsetMeters', 'maxSilhouetteDeviationRatio', 'maxClipDurationDriftSeconds'])
      if (character.closeupReady) await validateMetricContract(base, character.facial, 'character.facial', manifest.slug, failures, ['maxLipPenetrationMeters', 'maxEyelidGapMeters', 'maxExpressionAsymmetryRatio'])
      if (character.handCloseupReady) await validateMetricContract(base, character.handQa, 'character.handQa', manifest.slug, failures, ['maxFingerInterpenetrationMeters', 'maxJointLimitOvershootDegrees'])
    }
  }

  const facial = character.facial
  if (!facial || typeof facial !== 'object') fail(failures, manifest.slug, 'character.facial is required')
  else {
    if (!Number.isInteger(facial.minMorphTargets) || facial.minMorphTargets < 0) fail(failures, manifest.slug, 'character.facial.minMorphTargets must be a non-negative integer')
    if (character.closeupReady && facial.required !== true) fail(failures, manifest.slug, 'closeupReady characters require character.facial.required=true')
    if (character.realism === 'Realistic' && character.closeupReady && facial.minMorphTargets < 52) fail(failures, manifest.slug, 'realistic closeup-ready characters require at least 52 facial morph targets')
    if (character.realism === 'Realistic' && character.closeupReady) {
      for (const semantic of realisticFacialSemantics) {
        const aliases = facial.requiredMorphTargets?.[semantic]
        if (!Array.isArray(aliases) || !aliases.some((alias) => typeof alias === 'string' && alias.trim())) {
          fail(failures, manifest.slug, `realistic closeup-ready characters require facial semantic ${semantic}`)
        }
      }
    }
    if (character.realism === 'Realistic' && character.handCloseupReady !== true) fail(failures, manifest.slug, 'realistic character packs require handCloseupReady=true')
  }
  if (character.realism === 'Realistic' && character.handCloseupReady) {
    for (const semantic of requiredFingerSemantics) {
      const aliases = character.handJoints?.[semantic]
      if (!Array.isArray(aliases) || !aliases.some((alias) => typeof alias === 'string' && alias.trim())) {
        fail(failures, manifest.slug, `realistic hand-closeup characters require finger semantic ${semantic}`)
      }
    }
  }
}

function validateCharacterTier(manifest, stats, failures, tier) {
  if (manifest.kind !== 'Character' || !manifest.character) return
  const character = manifest.character
  for (const semantic of requiredHumanSemantics) {
    if (!semanticNodeName(character, stats, semantic)) fail(failures, manifest.slug, `${tier} is missing semantic joint ${semantic}`)
  }
  if (character.realism === 'Realistic' && character.handCloseupReady) {
    for (const semantic of requiredFingerSemantics) {
      const aliases = character.handJoints?.[semantic] ?? []
      if (![...stats.nodeNames].some((name) => matchesAlias(name, aliases))) fail(failures, manifest.slug, `${tier} is missing finger semantic ${semantic}`)
    }
  }
  const facial = character.facial
  if (facial?.required) {
    if (stats.morphTargets < facial.minMorphTargets) fail(failures, manifest.slug, `${tier} has ${stats.morphTargets} morph target(s), character facial contract expects at least ${facial.minMorphTargets}`)
    for (const [semantic, aliases] of Object.entries(facial.requiredMorphTargets ?? {})) {
      if (!morphTargetMatch(stats, aliases)) fail(failures, manifest.slug, `${tier} is missing facial morph semantic ${semantic}`)
    }
  }
}

async function validateManifest(manifestPath) {
  const failures = []
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
  const base = dirname(manifestPath)
  const slug = manifest.slug ?? '(missing slug)'

  if (manifest.schemaVersion !== 1) fail(failures, slug, 'schemaVersion must be 1')
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail(failures, slug, 'slug must be lowercase kebab-case')
  if (!manifest.title || !manifest.kind) fail(failures, slug, 'title and kind are required')
  if (!['Grounded', 'Floating', 'Static'].includes(manifest.presentation)) fail(failures, slug, 'presentation must be Grounded, Floating or Static')
  validateLicense(manifest, failures)
  validateDisplay(manifest, failures)
  validateQa(manifest, failures)
  await validateQaEvidence(manifest, base, failures)
  await validateCharacterManifest(manifest, base, failures)

  const tierStats = {}
  for (const tier of ['desktop', 'tablet', 'mobile']) {
    const spec = manifest.tiers?.[tier]
    if (!spec?.file) {
      fail(failures, slug, `missing ${tier} tier file`)
      continue
    }
    const modelPath = resolve(base, spec.file)
    if (!(await exists(modelPath))) {
      fail(failures, slug, `${tier} tier file not found: ${spec.file}`)
      continue
    }
    try {
      const stats = await inspectModel(modelPath)
      tierStats[tier] = stats
      if (manifest.publish && extname(spec.file).toLowerCase() !== '.glb') fail(failures, slug, `${tier} publishable tier must be a self-contained .glb`)
      if (manifest.publish && stats.format !== 'GLB') fail(failures, slug, `${tier} publishable tier inspected as ${stats.format}, expected GLB`)
      if (manifest.publish && stats.externalResources.length) fail(failures, slug, `${tier} has external resource URI(s): ${stats.externalResources.join(', ')}`)
      if (manifest.publish) {
        if (!/^[a-f0-9]{64}$/.test(spec.sha256 ?? '')) fail(failures, slug, `${tier} publishable tier requires a lowercase SHA-256 digest`)
        else if ((await sha256(modelPath)) !== spec.sha256) fail(failures, slug, `${tier} SHA-256 does not match manifest`)
      }
      if (stats.bytes > spec.maxBytes) fail(failures, slug, `${tier} is ${stats.bytes} bytes, budget is ${spec.maxBytes}`)
      if (stats.triangles > spec.maxTriangles) fail(failures, slug, `${tier} has ${stats.triangles} triangles, budget is ${spec.maxTriangles}`)
      if (stats.textures > spec.maxTextures) fail(failures, slug, `${tier} has ${stats.textures} textures, budget is ${spec.maxTextures}`)
      validateRig(manifest, stats, failures, tier)
      validateCharacterTier(manifest, stats, failures, tier)
      validateAnimations(manifest, stats, failures, tier)
      if (manifest.display?.defaultClip) {
        const requirement = (manifest.animations ?? []).find((item) => item.name.toLowerCase() === manifest.display.defaultClip.toLowerCase())
        const existsByRequirement = requirement ? findClip(stats, requirement) : stats.animations.find((clip) => clip.name.toLowerCase() === manifest.display.defaultClip.toLowerCase())
        if (!existsByRequirement) fail(failures, slug, `${tier} is missing display.defaultClip ${manifest.display.defaultClip}`)
      }
    } catch (error) {
      fail(failures, slug, `${tier} inspection failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  if (tierStats.desktop && tierStats.tablet && tierStats.mobile) {
    if (tierStats.tablet.triangles > tierStats.desktop.triangles) fail(failures, slug, 'tablet LOD is heavier than desktop')
    if (tierStats.mobile.triangles > tierStats.tablet.triangles) fail(failures, slug, 'mobile LOD is heavier than tablet')
  }

  return { slug, publish: manifest.publish === true, failures }
}

if (!(await exists(modelsRoot))) {
  console.log('Modeled asset validation passed: 0 model manifests (pipeline ready; no model has been published yet).')
  process.exit(0)
}

const entries = await readdir(modelsRoot, { withFileTypes: true })
const results = []
for (const entry of entries) {
  if (!entry.isDirectory()) continue
  const manifestPath = resolve(modelsRoot, entry.name, 'manifest.json')
  if (!(await exists(manifestPath))) continue
  results.push(await validateManifest(manifestPath))
}

const failures = results.flatMap((result) => result.failures)
if (failures.length) {
  console.error(`Modeled asset validation failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Modeled asset validation passed: ${results.length} manifest(s), ${results.filter((result) => result.publish).length} publishable.`)
