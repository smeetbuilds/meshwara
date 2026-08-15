export const STUDIO_RIG_BONE_LIMIT = 256
export const STUDIO_POSE_LIMIT = 64

export const STUDIO_HUMANOID_ROLES = [
  'hips','spine','chest','upperChest','neck','head',
  'leftShoulder','leftUpperArm','leftLowerArm','leftHand',
  'rightShoulder','rightUpperArm','rightLowerArm','rightHand',
  'leftUpperLeg','leftLowerLeg','leftFoot','leftToes',
  'rightUpperLeg','rightLowerLeg','rightFoot','rightToes',
] as const

export type StudioHumanoidRole = typeof STUDIO_HUMANOID_ROLES[number]
export type StudioQuat = [number, number, number, number]
export type StudioRigVec3 = [number, number, number]

export interface StudioRigBoneInfo {
  id: string
  name: string
  parentId?: string
  depth: number
}

export interface StudioBonePoseTransform {
  position: StudioRigVec3
  rotation: StudioQuat
  scale: StudioRigVec3
}

export interface StudioPose {
  id: string
  name: string
  bones: Record<string, StudioBonePoseTransform>
}

export interface StudioRigState {
  mapping: Partial<Record<StudioHumanoidRole, string>>
  poses: StudioPose[]
  activePoseId?: string
}

export interface StudioRigInspection {
  bones: StudioRigBoneInfo[]
  rootBoneIds: string[]
  suggestedMapping: Partial<Record<StudioHumanoidRole, string>>
  restPose: StudioPose
  warnings: string[]
}

export interface StudioPoseLibraryFile {
  format: 'meshvara-pose-library'
  version: 1
  mapping: StudioRigState['mapping']
  poses: StudioPose[]
}

const BONE_ID = /^[^\0\r\n]{1,512}$/
const POSE_ID = /^pose-[A-Za-z0-9-]{4,160}$/
const roleSet = new Set<string>(STUDIO_HUMANOID_ROLES)

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function finite(value: unknown, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function vec3(value: unknown, fallback: StudioRigVec3, min: number, max: number): StudioRigVec3 {
  if (!Array.isArray(value) || value.length !== 3) return [...fallback]
  return [clamp(finite(value[0], fallback[0]), min, max), clamp(finite(value[1], fallback[1]), min, max), clamp(finite(value[2], fallback[2]), min, max)]
}

function quat(value: unknown): StudioQuat {
  if (!Array.isArray(value) || value.length !== 4) return [0, 0, 0, 1]
  const raw: StudioQuat = [finite(value[0], 0), finite(value[1], 0), finite(value[2], 0), finite(value[3], 1)]
  const length = Math.hypot(...raw)
  if (!Number.isFinite(length) || length < 1e-8) return [0, 0, 0, 1]
  return raw.map((component) => component / length) as StudioQuat
}

function uid(prefix: string) {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return `${prefix}-${crypto.randomUUID()}`
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function defaultStudioRig(): StudioRigState {
  return { mapping: {}, poses: [] }
}

export function sanitizeStudioPose(value: unknown, fallbackName = 'Pose'): StudioPose | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const input = value as Record<string, unknown>
  if (typeof input.id !== 'string' || !POSE_ID.test(input.id)) return null
  const bones: Record<string, StudioBonePoseTransform> = {}
  if (input.bones && typeof input.bones === 'object' && !Array.isArray(input.bones)) {
    for (const [boneId, raw] of Object.entries(input.bones).slice(0, STUDIO_RIG_BONE_LIMIT)) {
      if (!BONE_ID.test(boneId) || !raw || typeof raw !== 'object' || Array.isArray(raw)) continue
      const transform = raw as Record<string, unknown>
      bones[boneId] = {
        position: vec3(transform.position, [0, 0, 0], -10000, 10000),
        rotation: quat(transform.rotation),
        scale: vec3(transform.scale, [1, 1, 1], 0.001, 1000),
      }
    }
  }
  const name = typeof input.name === 'string' && input.name.trim() ? input.name.trim().slice(0, 80) : fallbackName
  return { id: input.id, name, bones }
}

export function sanitizeStudioRig(value: unknown): StudioRigState {
  const input = value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}
  const mapping: StudioRigState['mapping'] = {}
  if (input.mapping && typeof input.mapping === 'object' && !Array.isArray(input.mapping)) {
    for (const [role, boneId] of Object.entries(input.mapping)) {
      if (roleSet.has(role) && typeof boneId === 'string' && BONE_ID.test(boneId)) mapping[role as StudioHumanoidRole] = boneId
    }
  }
  const poses: StudioPose[] = []
  const seen = new Set<string>()
  if (Array.isArray(input.poses)) {
    for (const raw of input.poses.slice(0, STUDIO_POSE_LIMIT)) {
      const pose = sanitizeStudioPose(raw)
      if (!pose || seen.has(pose.id)) continue
      seen.add(pose.id)
      poses.push(pose)
    }
  }
  const activePoseId = typeof input.activePoseId === 'string' && poses.some((pose) => pose.id === input.activePoseId) ? input.activePoseId : undefined
  return { mapping, poses, activePoseId }
}

export function resolveStudioRig(value?: StudioRigState | null) {
  return sanitizeStudioRig(value ?? defaultStudioRig())
}

export function createStudioPose(name: string, bones: Record<string, StudioBonePoseTransform>): StudioPose {
  return sanitizeStudioPose({ id: uid('pose'), name, bones }) ?? { id: uid('pose'), name: name.slice(0, 80) || 'Pose', bones: {} }
}

export function duplicateStudioPose(pose: StudioPose, name = `${pose.name} Copy`): StudioPose {
  return createStudioPose(name, JSON.parse(JSON.stringify(pose.bones)) as StudioPose['bones'])
}

export function addStudioPose(rig: StudioRigState, pose: StudioPose): StudioRigState {
  const current = resolveStudioRig(rig)
  const poses = [...current.poses.filter((item) => item.id !== pose.id), pose].slice(-STUDIO_POSE_LIMIT)
  return { ...current, poses, activePoseId: pose.id }
}

export function removeStudioPose(rig: StudioRigState, poseId: string): StudioRigState {
  const current = resolveStudioRig(rig)
  return { ...current, poses: current.poses.filter((pose) => pose.id !== poseId), activePoseId: current.activePoseId === poseId ? undefined : current.activePoseId }
}

export function normalizeBoneName(name: string) {
  return name.toLowerCase().replace(/^mixamorig[:_]?/i, '').replace(/[^a-z0-9]/g, '')
}

const rolePatterns: Record<StudioHumanoidRole, RegExp[]> = {
  hips: [/hips?$/, /pelvis/],
  spine: [/^spine$/, /^spine0?1$/, /abdomen/],
  chest: [/chest$/, /^spine0?2$/, /thorax/],
  upperChest: [/upperchest/, /^spine0?3$/],
  neck: [/neck/],
  head: [/head/],
  leftShoulder: [/leftshoulder/, /lshoulder/, /claviclel/, /leftclavicle/],
  leftUpperArm: [/leftupperarm/, /leftarm$/, /lupperarm/, /^larm$/],
  leftLowerArm: [/leftlowerarm/, /leftforearm/, /lforearm/, /llowerarm/],
  leftHand: [/lefthand/, /lhand/],
  rightShoulder: [/rightshoulder/, /rshoulder/, /clavicler/, /rightclavicle/],
  rightUpperArm: [/rightupperarm/, /rightarm$/, /rupperarm/, /^rarm$/],
  rightLowerArm: [/rightlowerarm/, /rightforearm/, /rforearm/, /rlowerarm/],
  rightHand: [/righthand/, /rhand/],
  leftUpperLeg: [/leftupleg/, /leftupperleg/, /leftthigh/, /lthigh/, /lupperleg/],
  leftLowerLeg: [/leftleg$/, /leftlowerleg/, /leftshin/, /lshin/, /llowerleg/],
  leftFoot: [/leftfoot/, /lfoot/],
  leftToes: [/lefttoe/, /ltoe/],
  rightUpperLeg: [/rightupleg/, /rightupperleg/, /rightthigh/, /rthigh/, /rupperleg/],
  rightLowerLeg: [/rightleg$/, /rightlowerleg/, /rightshin/, /rshin/, /rlowerleg/],
  rightFoot: [/rightfoot/, /rfoot/],
  rightToes: [/righttoe/, /rtoe/],
}

export function suggestStudioHumanoidMapping(bones: StudioRigBoneInfo[]): StudioRigState['mapping'] {
  const mapping: StudioRigState['mapping'] = {}
  const used = new Set<string>()
  for (const role of STUDIO_HUMANOID_ROLES) {
    let match: StudioRigBoneInfo | undefined
    for (const pattern of rolePatterns[role]) {
      match = bones.find((bone) => !used.has(bone.id) && pattern.test(normalizeBoneName(bone.name)))
      if (match) break
    }
    if (match) {
      mapping[role] = match.id
      used.add(match.id)
    }
  }
  return mapping
}

const mirrorPairs: Array<[StudioHumanoidRole, StudioHumanoidRole]> = [
  ['leftShoulder','rightShoulder'], ['leftUpperArm','rightUpperArm'], ['leftLowerArm','rightLowerArm'], ['leftHand','rightHand'],
  ['leftUpperLeg','rightUpperLeg'], ['leftLowerLeg','rightLowerLeg'], ['leftFoot','rightFoot'], ['leftToes','rightToes'],
]

function mirrorTransform(transform: StudioBonePoseTransform): StudioBonePoseTransform {
  return {
    position: [-transform.position[0], transform.position[1], transform.position[2]],
    rotation: [transform.rotation[0], -transform.rotation[1], -transform.rotation[2], transform.rotation[3]],
    scale: [...transform.scale],
  }
}

export function mirrorStudioPoseDirection(pose: StudioPose, mapping: StudioRigState['mapping'], direction: 'left-to-right' | 'right-to-left'): StudioPose {
  const bones = JSON.parse(JSON.stringify(pose.bones)) as StudioPose['bones']
  for (const [leftRole, rightRole] of mirrorPairs) {
    const sourceRole = direction === 'left-to-right' ? leftRole : rightRole
    const targetRole = direction === 'left-to-right' ? rightRole : leftRole
    const sourceId = mapping[sourceRole]
    const targetId = mapping[targetRole]
    if (!sourceId || !targetId || !pose.bones[sourceId]) continue
    bones[targetId] = mirrorTransform(pose.bones[sourceId])
  }
  return createStudioPose(`${pose.name} · ${direction === 'left-to-right' ? 'L→R' : 'R→L'}`, bones)
}

export function createStudioPoseLibrary(rig: StudioRigState): StudioPoseLibraryFile {
  const current = resolveStudioRig(rig)
  return { format: 'meshvara-pose-library', version: 1, mapping: current.mapping, poses: current.poses }
}

export function parseStudioPoseLibrary(value: unknown): Pick<StudioRigState, 'mapping' | 'poses'> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const input = value as Record<string, unknown>
  if (input.format !== 'meshvara-pose-library' || input.version !== 1) return null
  const rig = sanitizeStudioRig({ mapping: input.mapping, poses: input.poses })
  return { mapping: rig.mapping, poses: rig.poses }
}

export function cloneStudioRigWithFreshPoseIds(value?: StudioRigState | null): StudioRigState {
  const rig = resolveStudioRig(value)
  const idMap = new Map<string, string>()
  const poses = rig.poses.map((pose) => {
    const next = duplicateStudioPose(pose, pose.name)
    idMap.set(pose.id, next.id)
    return next
  })
  return { mapping: { ...rig.mapping }, poses, activePoseId: rig.activePoseId ? idMap.get(rig.activePoseId) : undefined }
}
