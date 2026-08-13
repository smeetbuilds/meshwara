import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'

const GLB_MAGIC = 0x46546c67
const GLB_JSON_CHUNK = 0x4e4f534a

function encodeGlb(document) {
  const raw = Buffer.from(JSON.stringify(document), 'utf8')
  const padding = (4 - (raw.length % 4)) % 4
  const json = Buffer.concat([raw, Buffer.alloc(padding, 0x20)])
  const buffer = Buffer.alloc(12 + 8 + json.length)
  buffer.writeUInt32LE(GLB_MAGIC, 0)
  buffer.writeUInt32LE(2, 4)
  buffer.writeUInt32LE(buffer.length, 8)
  buffer.writeUInt32LE(json.length, 12)
  buffer.writeUInt32LE(GLB_JSON_CHUNK, 16)
  json.copy(buffer, 20)
  return buffer
}

const semanticNodes = {
  hips: 'Hips', spine: 'Spine', chest: 'Chest', neck: 'Neck', head: 'Head',
  leftShoulder: 'LeftShoulder', leftUpperArm: 'LeftArm', leftLowerArm: 'LeftForeArm', leftHand: 'LeftHand',
  rightShoulder: 'RightShoulder', rightUpperArm: 'RightArm', rightLowerArm: 'RightForeArm', rightHand: 'RightHand',
  leftUpperLeg: 'LeftUpLeg', leftLowerLeg: 'LeftLeg', leftFoot: 'LeftFoot',
  rightUpperLeg: 'RightUpLeg', rightLowerLeg: 'RightLeg', rightFoot: 'RightFoot',
}
const nodeNames = ['Root', ...Object.values(semanticNodes)]
const nodes = nodeNames.map((name, index) => index === 0
  ? { name, mesh: 0, skin: 0, children: [1] }
  : { name, children: index < nodeNames.length - 1 ? [index + 1] : undefined })
const nodeIndex = Object.fromEntries(nodeNames.map((name, index) => [name, index]))

const animationNames = ['Idle', 'Walk', 'Run', 'TurnLeft90', 'TurnRight90', 'WalkStart', 'WalkStop', 'RunStart', 'RunStop']
const animations = animationNames.map((name) => ({
  name,
  samplers: [{ input: 6, output: 7 }],
  channels: [
    { sampler: 0, target: { node: nodeIndex.Hips, path: 'rotation' } },
    { sampler: 0, target: { node: nodeIndex.LeftUpLeg, path: 'rotation' } },
    { sampler: 0, target: { node: nodeIndex.RightUpLeg, path: 'rotation' } },
  ],
}))

const root = process.cwd()
const temp = await mkdtemp(join(tmpdir(), 'meshvara-model-validator-'))
const modelsRoot = join(temp, 'models')
const modelDir = join(modelsRoot, 'validation-character')
await mkdir(modelDir, { recursive: true })

const fixtureSource = resolve(root, 'tests/model-pipeline/.generated-validation.glb')
const document = {
  asset: { version: '2.0', generator: 'MESHVARA validator test' },
  scenes: [{ nodes: [0] }], scene: 0,
  nodes,
  meshes: [{ extras: { targetNames: ['Blink_Left', 'Blink_Right'] }, primitives: [{ attributes: { POSITION: 0, JOINTS_0: 1, WEIGHTS_0: 2 }, indices: 3, targets: [{ POSITION: 4 }, { POSITION: 5 }] }] }],
  skins: [{ joints: Object.values(semanticNodes).map((name) => nodeIndex[name]), skeleton: nodeIndex.Hips }],
  animations,
  accessors: [
    { componentType: 5126, count: 6, type: 'VEC3' }, { componentType: 5123, count: 6, type: 'VEC4' },
    { componentType: 5126, count: 6, type: 'VEC4' }, { componentType: 5123, count: 6, type: 'SCALAR' },
    { componentType: 5126, count: 6, type: 'VEC3' }, { componentType: 5126, count: 6, type: 'VEC3' },
    { componentType: 5126, count: 2, type: 'SCALAR', min: [0], max: [1] }, { componentType: 5126, count: 2, type: 'VEC4' },
  ],
}
const modelBuffer = encodeGlb(document)
const modelSha256 = createHash('sha256').update(modelBuffer).digest('hex')
await writeFile(fixtureSource, modelBuffer)
for (const file of ['high.glb', 'medium.glb', 'mobile.glb']) await writeFile(join(modelDir, file), modelBuffer)

const approved = {
  artDirection: 'approved', topology: 'approved', materials: 'approved', rigging: 'approved',
  animation: 'approved', responsive: 'approved', performance: 'approved', license: 'approved',
}
const semanticJoints = Object.fromEntries(Object.entries(semanticNodes).map(([semantic, name]) => [semantic, [name]]))
const animationRequirements = animationNames.map((name) => ({
  name,
  loop: ['Idle', 'Walk', 'Run'].includes(name),
  contactCritical: name !== 'Idle',
  minDuration: 0.5,
  maxDuration: 2,
  requiredAnimatedSemantics: name === 'Idle' ? ['hips'] : ['hips', 'leftUpperLeg', 'rightUpperLeg'],
  qaEvidence: `qa/animations/${name}.md`,
  ...(name !== 'Idle' ? {
    metricsFile: `qa/metrics/${name}.json`,
    thresholds: {
      maxFootSlideMeters: 0.02,
      maxContactHeightMeters: 0.012,
      maxRootVerticalJitterMeters: 0.01,
      ...(['Walk', 'Run'].includes(name) ? { maxLoopPoseErrorDegrees: 3 } : {}),
    },
  } : {}),
}))
const manifest = {
  schemaVersion: 1,
  slug: 'validation-character',
  title: 'Validation Character',
  kind: 'Character',
  publish: true,
  presentation: 'Grounded',
  display: {
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    cameraPosition: [0, 1.25, 4.2],
    cameraTarget: [0, 1, 0],
    defaultClip: 'Idle',
    tiers: {
      tablet: { scale: 0.96, cameraPosition: [0, 1.2, 4.5], cameraTarget: [0, 0.95, 0] },
      mobile: { scale: 0.9, position: [0, 0.02, 0], cameraPosition: [0, 1.1, 5], cameraTarget: [0, 0.88, 0] },
    },
  },
  license: { id: 'CC0-1.0', author: 'Test Fixture', source: 'local-test', redistribution: true, commercialUse: true },
  tiers: {
    desktop: { file: 'high.glb', maxBytes: 100000, maxTriangles: 10, maxTextures: 1, sha256: modelSha256 },
    tablet: { file: 'medium.glb', maxBytes: 100000, maxTriangles: 10, maxTextures: 1, sha256: modelSha256 },
    mobile: { file: 'mobile.glb', maxBytes: 100000, maxTriangles: 10, maxTextures: 1, sha256: modelSha256 },
  },
  rig: { required: true, minBones: 19, minSkins: 1, minMorphTargets: 2, requiredNodeNames: ['Hips'] },
  character: {
    realism: 'Stylized', ageBand: 'YoungAdult', fullBody: true, closeupReady: false, handCloseupReady: false, rootMotion: 'InPlace',
    semanticJoints,
    facial: { required: false, minMorphTargets: 0 },
    transitions: [
      { from: 'Idle', to: 'Walk', maxBlendSeconds: 0.24, qaEvidence: 'qa/transitions/idle-walk.md', metricsFile: 'qa/metrics/idle-walk.json', thresholds: { maxFootSlideMeters: 0.02, maxRootSnapMeters: 0.015, maxAngularSnapDegrees: 4 } },
      { from: 'Walk', to: 'Idle', maxBlendSeconds: 0.24, qaEvidence: 'qa/transitions/walk-idle.md', metricsFile: 'qa/metrics/walk-idle.json', thresholds: { maxFootSlideMeters: 0.02, maxRootSnapMeters: 0.015, maxAngularSnapDegrees: 4 } },
      { from: 'Walk', to: 'Run', maxBlendSeconds: 0.2, qaEvidence: 'qa/transitions/walk-run.md', metricsFile: 'qa/metrics/walk-run.json', thresholds: { maxFootSlideMeters: 0.02, maxRootSnapMeters: 0.015, maxAngularSnapDegrees: 4 } },
      { from: 'Run', to: 'Walk', maxBlendSeconds: 0.2, qaEvidence: 'qa/transitions/run-walk.md', metricsFile: 'qa/metrics/run-walk.json', thresholds: { maxFootSlideMeters: 0.02, maxRootSnapMeters: 0.015, maxAngularSnapDegrees: 4 } },
    ],
    deformationQa: [
      { name: 'Shoulder', semantics: ['leftShoulder', 'leftUpperArm'], qaEvidence: 'qa/deformation/shoulder.md' },
      { name: 'Elbow', semantics: ['leftUpperArm', 'leftLowerArm'], qaEvidence: 'qa/deformation/elbow.md' },
      { name: 'Hip', semantics: ['hips', 'leftUpperLeg'], qaEvidence: 'qa/deformation/hip.md' },
      { name: 'Knee', semantics: ['leftUpperLeg', 'leftLowerLeg'], qaEvidence: 'qa/deformation/knee.md' },
    ],
  },
  animations: animationRequirements,
  qa: approved,
  qaEvidence: Object.fromEntries(Object.keys(approved).map((key) => [key, `qa/${key}.md`])),
}

const evidencePaths = [
  ...Object.values(manifest.qaEvidence),
  ...manifest.animations.map((item) => item.qaEvidence),
  ...manifest.character.transitions.map((item) => item.qaEvidence),
  ...manifest.character.deformationQa.map((item) => item.qaEvidence),
]
for (const relative of evidencePaths) {
  const file = join(modelDir, relative)
  await mkdir(resolve(file, '..'), { recursive: true }).catch(() => {})
  await mkdir(join(file, '..'), { recursive: true })
  await writeFile(file, `# QA evidence\n\nReviewed production evidence for ${relative}; contact, deformation, and continuity checks passed.`)
}
for (const requirement of manifest.animations.filter((item) => item.contactCritical)) {
  const metrics = {
    maxFootSlideMeters: 0.008,
    maxContactHeightMeters: 0.006,
    maxRootVerticalJitterMeters: 0.004,
    ...((requirement.loop) ? { maxLoopPoseErrorDegrees: 1.5 } : {}),
  }
  const file = join(modelDir, requirement.metricsFile)
  await mkdir(join(file, '..'), { recursive: true })
  await writeFile(file, JSON.stringify(metrics, null, 2))
}
for (const transition of manifest.character.transitions) {
  const file = join(modelDir, transition.metricsFile)
  await mkdir(join(file, '..'), { recursive: true })
  await writeFile(file, JSON.stringify({ maxFootSlideMeters: 0.009, maxRootSnapMeters: 0.008, maxAngularSnapDegrees: 2.2 }, null, 2))
}
await writeFile(join(modelDir, 'manifest.json'), JSON.stringify(manifest, null, 2))

const run = () => spawnSync(process.execPath, [resolve(root, 'scripts/validate-modeled-assets.mjs')], {
  cwd: root,
  env: { ...process.env, MESHVARA_MODELS_ROOT: modelsRoot },
  encoding: 'utf8',
})

let result = run()
assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`)
assert.match(result.stdout, /1 manifest\(s\), 1 publishable/)

manifest.license.redistribution = false
await writeFile(join(modelDir, 'manifest.json'), JSON.stringify(manifest, null, 2))
result = run()
assert.notEqual(result.status, 0)
assert.match(result.stderr, /does not explicitly allow redistribution/)

manifest.license.redistribution = true
manifest.character.semanticJoints.leftFoot = []
await writeFile(join(modelDir, 'manifest.json'), JSON.stringify(manifest, null, 2))
result = run()
assert.notEqual(result.status, 0)
assert.match(result.stderr, /character\.semanticJoints\.leftFoot requires at least one alias/)

manifest.character.semanticJoints.leftFoot = ['LeftFoot']
manifest.animations[1].qaEvidence = 'qa/animations/missing.md'
await writeFile(join(modelDir, 'manifest.json'), JSON.stringify(manifest, null, 2))
result = run()
assert.notEqual(result.status, 0)
assert.match(result.stderr, /animations\.Walk\.qaEvidence file not found/)

manifest.animations[1].qaEvidence = 'qa/animations/Walk.md'
manifest.display.tiers.mobile.scale = -1
await writeFile(join(modelDir, 'manifest.json'), JSON.stringify(manifest, null, 2))
result = run()
assert.notEqual(result.status, 0)
assert.match(result.stderr, /display\.tiers\.mobile\.scale must be a positive finite number/)

manifest.display.tiers.mobile.scale = 0.9
const walkMetricsPath = join(modelDir, 'qa/metrics/Walk.json')
await writeFile(walkMetricsPath, JSON.stringify({ maxFootSlideMeters: 0.08, maxContactHeightMeters: 0.006, maxRootVerticalJitterMeters: 0.004, maxLoopPoseErrorDegrees: 1.5 }, null, 2))
result = run()
assert.notEqual(result.status, 0)
assert.match(result.stderr, /animations\.Walk maxFootSlideMeters=0\.08 exceeds threshold 0\.02/)
await writeFile(walkMetricsPath, JSON.stringify({ maxFootSlideMeters: 0.008, maxContactHeightMeters: 0.006, maxRootVerticalJitterMeters: 0.004, maxLoopPoseErrorDegrees: 1.5 }, null, 2))

manifest.tiers.mobile.file = 'external.gltf'
await writeFile(join(modelDir, 'external.gltf'), JSON.stringify({ asset: { version: '2.0' }, buffers: [{ uri: 'external.bin', byteLength: 4 }] }))
await writeFile(join(modelDir, 'manifest.json'), JSON.stringify(manifest, null, 2))
result = run()
assert.notEqual(result.status, 0)
assert.match(result.stderr, /publishable tier must be a self-contained \.glb/)

assert.equal((await readFile(fixtureSource)).readUInt32LE(0), GLB_MAGIC)
console.log('Modeled asset validator test passed.')
