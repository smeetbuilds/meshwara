export type ModelAssetKind =
  | 'Character'
  | 'Creature'
  | 'Product'
  | 'Furniture'
  | 'Vehicle'
  | 'Architecture'
  | 'Nature'
  | 'Object'

export type ModelQualityState = 'approved' | 'blocked' | 'pending'
export type ModelTierName = 'desktop' | 'tablet' | 'mobile'

export interface ModelLicenseManifest {
  id: string
  author: string
  source: string
  redistribution: boolean
  commercialUse: boolean
  attribution?: string
  notes?: string
}

export interface ModelTierManifest {
  file: string
  maxBytes: number
  maxTriangles: number
  maxTextures: number
  sha256?: string
}

export interface ModelRigManifest {
  required: boolean
  minBones?: number
  minSkins?: number
  minMorphTargets?: number
  facialCloseup?: boolean
  requiredNodeNames?: string[]
}

export type HumanJointSemantic =
  | 'hips'
  | 'spine'
  | 'chest'
  | 'neck'
  | 'head'
  | 'leftShoulder'
  | 'leftUpperArm'
  | 'leftLowerArm'
  | 'leftHand'
  | 'rightShoulder'
  | 'rightUpperArm'
  | 'rightLowerArm'
  | 'rightHand'
  | 'leftUpperLeg'
  | 'leftLowerLeg'
  | 'leftFoot'
  | 'rightUpperLeg'
  | 'rightLowerLeg'
  | 'rightFoot'

export interface ModelFacialManifest {
  required: boolean
  minMorphTargets: number
  requiredMorphTargets?: Record<string, string[]>
}

export interface ModelTransitionMetricsThresholds {
  maxFootSlideMeters: number
  maxRootSnapMeters: number
  maxAngularSnapDegrees: number
}

export interface ModelTransitionQaManifest {
  from: string
  to: string
  maxBlendSeconds: number
  qaEvidence: string
  metricsFile?: string
  thresholds?: ModelTransitionMetricsThresholds
}

export interface ModelDeformationQaManifest {
  name: string
  semantics: HumanJointSemantic[]
  qaEvidence: string
}

export interface ModelCharacterManifest {
  realism: 'Realistic' | 'Stylized'
  ageBand: 'Child' | 'Teen' | 'YoungAdult' | 'Adult' | 'OlderAdult' | 'NotApplicable'
  fullBody: boolean
  closeupReady: boolean
  handCloseupReady: boolean
  rootMotion: 'InPlace' | 'RootMotion'
  semanticJoints: Record<HumanJointSemantic, string[]>
  facial: ModelFacialManifest
  transitions: ModelTransitionQaManifest[]
  deformationQa: ModelDeformationQaManifest[]
}

export interface ModelDisplayManifest {
  scale: number
  position: [number, number, number]
  rotation?: [number, number, number]
  cameraPosition?: [number, number, number]
  cameraTarget?: [number, number, number]
  defaultClip?: string
}

export interface ModelMotionMetricsThresholds {
  maxFootSlideMeters: number
  maxContactHeightMeters: number
  maxRootVerticalJitterMeters: number
  maxLoopPoseErrorDegrees?: number
}

export interface ModelAnimationRequirement {
  name: string
  aliases?: string[]
  loop: boolean
  contactCritical?: boolean
  minDuration?: number
  maxDuration?: number
  requiredAnimatedSemantics?: HumanJointSemantic[]
  qaEvidence?: string
  metricsFile?: string
  thresholds?: ModelMotionMetricsThresholds
}

export type ModelQaKey = 'artDirection' | 'topology' | 'materials' | 'rigging' | 'animation' | 'responsive' | 'performance' | 'license'

export type ModelQaEvidenceManifest = Partial<Record<ModelQaKey, string>>

export interface ModelQaManifest {
  artDirection: ModelQualityState
  topology: ModelQualityState
  materials: ModelQualityState
  rigging: ModelQualityState
  animation: ModelQualityState
  responsive: ModelQualityState
  performance: ModelQualityState
  license: ModelQualityState
}

export interface ModelAssetManifest {
  schemaVersion: 1
  slug: string
  title: string
  kind: ModelAssetKind
  publish: boolean
  presentation: 'Grounded' | 'Floating' | 'Static'
  display: ModelDisplayManifest
  license: ModelLicenseManifest
  tiers: Record<ModelTierName, ModelTierManifest>
  rig?: ModelRigManifest
  character?: ModelCharacterManifest
  animations?: ModelAnimationRequirement[]
  qa: ModelQaManifest
  qaEvidence?: ModelQaEvidenceManifest
}
