import * as THREE from 'three'
import {
  createStudioPose,
  suggestStudioHumanoidMapping,
  type StudioBonePoseTransform,
  type StudioPose,
  type StudioRigBoneInfo,
  type StudioRigInspection,
} from './studioRigState'

function nearestParentBone(bone: THREE.Bone) {
  let current = bone.parent
  while (current) {
    if (current instanceof THREE.Bone) return current
    current = current.parent
  }
  return undefined
}

function segment(bone: THREE.Bone, parent?: THREE.Bone) {
  const name = bone.name.trim() || 'Bone'
  const siblings = parent
    ? parent.children.filter((child): child is THREE.Bone => child instanceof THREE.Bone && (child.name.trim() || 'Bone') === name)
    : []
  const index = parent ? Math.max(0, siblings.indexOf(bone)) : 0
  return `${encodeURIComponent(name)}[${index}]`
}

function buildBoneMap(root: THREE.Object3D) {
  const bones: THREE.Bone[] = []
  root.traverse((object) => { if (object instanceof THREE.Bone) bones.push(object) })
  const idByBone = new Map<THREE.Bone, string>()
  const objectById = new Map<string, THREE.Bone>()
  const infos: StudioRigBoneInfo[] = []
  const rootCounts = new Map<string, number>()

  for (const bone of bones) {
    const parent = nearestParentBone(bone)
    let id: string
    if (parent) {
      id = `${idByBone.get(parent) ?? 'root'}/${segment(bone, parent)}`
    } else {
      const name = bone.name.trim() || 'Bone'
      const index = rootCounts.get(name) ?? 0
      rootCounts.set(name, index + 1)
      id = `${encodeURIComponent(name)}[${index}]`
    }
    idByBone.set(bone, id)
    objectById.set(id, bone)
    let depth = 0
    let ancestor = parent
    while (ancestor) { depth += 1; ancestor = nearestParentBone(ancestor) }
    infos.push({ id, name: bone.name || 'Bone', parentId: parent ? idByBone.get(parent) : undefined, depth })
  }
  return { infos, objectById }
}

function captureTransforms(objectById: Map<string, THREE.Bone>) {
  const bones: Record<string, StudioBonePoseTransform> = {}
  for (const [id, bone] of objectById) {
    bones[id] = {
      position: bone.position.toArray() as [number, number, number],
      rotation: bone.quaternion.toArray() as [number, number, number, number],
      scale: bone.scale.toArray() as [number, number, number],
    }
  }
  return bones
}

export function inspectStudioRig(root: THREE.Object3D): StudioRigInspection {
  const { infos, objectById } = buildBoneMap(root)
  const rootBoneIds = infos.filter((bone) => !bone.parentId).map((bone) => bone.id)
  const warnings: string[] = []
  if (infos.length > 256) warnings.push(`Rig contains ${infos.length} bones; only the first 256 are supported by project pose validation.`)
  if (rootBoneIds.length > 1) warnings.push(`Rig has ${rootBoneIds.length} root bones; verify humanoid mapping before mirroring.`)
  const suggestedMapping = suggestStudioHumanoidMapping(infos)
  if (Object.keys(suggestedMapping).length < 10 && infos.length) warnings.push('Humanoid auto-mapping confidence is low; review role assignments manually.')
  return {
    bones: infos.slice(0, 256),
    rootBoneIds,
    suggestedMapping,
    restPose: { id: 'pose-rest', name: 'Rest Pose', bones: captureTransforms(objectById) },
    warnings,
  }
}

export function captureStudioRigPose(root: THREE.Object3D, name: string): StudioPose {
  const { objectById } = buildBoneMap(root)
  return createStudioPose(name, captureTransforms(objectById))
}

export function applyStudioRigPose(root: THREE.Object3D, pose: StudioPose) {
  const { objectById } = buildBoneMap(root)
  let applied = 0
  for (const [boneId, transform] of Object.entries(pose.bones)) {
    const bone = objectById.get(boneId)
    if (!bone) continue
    bone.position.fromArray(transform.position)
    bone.quaternion.fromArray(transform.rotation).normalize()
    bone.scale.fromArray(transform.scale)
    applied += 1
  }
  root.updateMatrixWorld(true)
  return applied
}
