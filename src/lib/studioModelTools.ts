import * as THREE from 'three'
import type { StudioMaterialOverride, StudioTextureChannel } from './studioProject'

export interface StudioMaterialSlot {
  id: string
  name: string
  type: string
  color?: string
  emissive?: string
  emissiveIntensity?: number
  roughness?: number
  metalness?: number
  opacity: number
  transparent: boolean
  textureChannels: string[]
}

export interface StudioAnimationClipInfo {
  name: string
  duration: number
}

export interface StudioModelInspection {
  meshes: number
  skinnedMeshes: number
  vertices: number
  triangles: number
  materials: number
  textures: number
  missingNormals: number
  bounds: { size: [number, number, number]; center: [number, number, number] }
  animations: StudioAnimationClipInfo[]
  materialSlots: StudioMaterialSlot[]
  warnings: string[]
}

export const studioEditableTextureChannels = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'emissiveMap', 'alphaMap', 'aoMap'] as const satisfies readonly StudioTextureChannel[]
const textureFields = [...studioEditableTextureChannels, 'lightMap'] as const

export function studioTextureColorSpace(channel: StudioTextureChannel) {
  return channel === 'map' || channel === 'emissiveMap' ? THREE.SRGBColorSpace : THREE.NoColorSpace
}

export function studioTextureResourceKey(fileId: string, channel: StudioTextureChannel) {
  return `${fileId}:${studioTextureColorSpace(channel) === THREE.SRGBColorSpace ? 'srgb' : 'linear'}`
}

export type StudioTextureResources = ReadonlyMap<string, THREE.Texture>

function colorHex(value: THREE.Color | undefined) {
  return value ? `#${value.getHexString()}` : undefined
}

function materialSlotId(index: number) {
  return `material-${index}`
}

function materialTextureChannels(material: THREE.Material) {
  const channels: string[] = []
  const candidate = material as THREE.MeshStandardMaterial & Record<string, unknown>
  for (const key of textureFields) if (candidate[key] instanceof THREE.Texture) channels.push(key)
  return channels
}

function materialDefaults(material: THREE.Material, id: string): StudioMaterialSlot {
  const standard = material instanceof THREE.MeshStandardMaterial ? material : null
  return {
    id,
    name: material.name || id,
    type: material.type,
    color: standard ? colorHex(standard.color) : undefined,
    emissive: standard ? colorHex(standard.emissive) : undefined,
    emissiveIntensity: standard?.emissiveIntensity,
    roughness: standard?.roughness,
    metalness: standard?.metalness,
    opacity: material.opacity,
    transparent: material.transparent,
    textureChannels: materialTextureChannels(material),
  }
}

function applyOverride(
  material: THREE.Material,
  override: StudioMaterialOverride | undefined,
  wireframe: boolean,
  textures?: StudioTextureResources,
) {
  if ('wireframe' in material) (material as THREE.MeshStandardMaterial).wireframe = wireframe
  if (!override) return
  if (material instanceof THREE.MeshStandardMaterial) {
    if (override.color) material.color.set(override.color)
    if (override.emissive) material.emissive.set(override.emissive)
    if (override.emissiveIntensity !== undefined) material.emissiveIntensity = override.emissiveIntensity
    if (override.roughness !== undefined) material.roughness = override.roughness
    if (override.metalness !== undefined) material.metalness = override.metalness
  }
  if (override.opacity !== undefined) {
    material.opacity = override.opacity
    material.transparent = override.opacity < 1
    material.depthWrite = override.opacity >= 1
  }
  for (const channel of studioEditableTextureChannels) {
    if (!override.textures || !(channel in override.textures) || !(channel in material)) continue
    const reference = override.textures[channel]
    const next = typeof reference === 'string' ? textures?.get(studioTextureResourceKey(reference, channel)) ?? null : null
    ;(material as THREE.MeshStandardMaterial & Record<StudioTextureChannel, THREE.Texture | null>)[channel] = next
  }
  material.needsUpdate = true
}

interface StudioMaterialState {
  slots: Array<{ id: string; template: THREE.Material }>
  assignments: Array<{ mesh: THREE.Mesh; slots: string[] }>
  current: THREE.Material[]
}

const modelMaterialStates = new WeakMap<THREE.Object3D, StudioMaterialState>()

function createMaterialState(root: THREE.Object3D): StudioMaterialState {
  const byUuid = new Map<string, { id: string; template: THREE.Material }>()
  const slots: StudioMaterialState['slots'] = []
  const assignments: StudioMaterialState['assignments'] = []
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return
    object.castShadow = true
    object.receiveShadow = true
    object.frustumCulled = true
    const source = Array.isArray(object.material) ? object.material : [object.material]
    const ids = source.map((material) => {
      let slot = byUuid.get(material.uuid)
      if (!slot) {
        slot = { id: materialSlotId(slots.length), template: material.clone() }
        byUuid.set(material.uuid, slot)
        slots.push(slot)
      }
      return slot.id
    })
    assignments.push({ mesh: object, slots: ids })
  })
  return { slots, assignments, current: [] }
}

export function prepareStudioModel(
  root: THREE.Object3D,
  overrides: Record<string, StudioMaterialOverride>,
  wireframe: boolean,
  textures?: StudioTextureResources,
) {
  let state = modelMaterialStates.get(root)
  if (!state) {
    state = createMaterialState(root)
    modelMaterialStates.set(root, state)
  }
  for (const material of state.current) material.dispose()
  const currentById = new Map<string, THREE.Material>()
  state.current = state.slots.map(({ id, template }) => {
    const material = template.clone()
    applyOverride(material, overrides[id], wireframe, textures)
    currentById.set(id, material)
    return material
  })
  for (const assignment of state.assignments) {
    const next = assignment.slots.map((id) => currentById.get(id)!).filter(Boolean)
    assignment.mesh.material = next.length === 1 ? next[0] : next
  }
  return root
}

export function disposeStudioModel(root: THREE.Object3D) {
  const state = modelMaterialStates.get(root)
  if (!state) return
  for (const material of state.current) material.dispose()
  for (const slot of state.slots) slot.template.dispose()
  state.current = []
  modelMaterialStates.delete(root)
}

export function inspectStudioModel(root: THREE.Object3D, animations: readonly THREE.AnimationClip[] = []): StudioModelInspection {
  let meshes = 0
  let skinnedMeshes = 0
  let vertices = 0
  let triangles = 0
  let missingNormals = 0
  const materials = new Map<string, THREE.Material>()
  const textures = new Set<string>()

  root.updateMatrixWorld(true)
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return
    meshes += 1
    if (object instanceof THREE.SkinnedMesh) skinnedMeshes += 1
    const position = object.geometry.getAttribute('position')
    if (position) vertices += position.count
    const normal = object.geometry.getAttribute('normal')
    if (!normal) missingNormals += 1
    triangles += object.geometry.index ? object.geometry.index.count / 3 : (position?.count ?? 0) / 3
    const meshMaterials = Array.isArray(object.material) ? object.material : [object.material]
    for (const material of meshMaterials) {
      if (!materials.has(material.uuid)) materials.set(material.uuid, material)
      for (const field of textureFields) {
        const texture = (material as THREE.MeshStandardMaterial & Record<string, unknown>)[field]
        if (texture instanceof THREE.Texture) textures.add(texture.uuid)
      }
    }
  })

  const box = new THREE.Box3().setFromObject(root)
  const size = new THREE.Vector3()
  const center = new THREE.Vector3()
  if (box.isEmpty()) {
    size.set(0, 0, 0)
    center.set(0, 0, 0)
  } else {
    box.getSize(size)
    box.getCenter(center)
  }

  const materialSlots = [...materials.values()].map((material, index) => materialDefaults(material, materialSlotId(index)))
  const warnings: string[] = []
  if (triangles > 250_000) warnings.push('High triangle count for an interactive web scene.')
  if (materials.size > 24) warnings.push('High material count may increase draw calls.')
  if (textures.size > 32) warnings.push('High texture count may increase GPU memory pressure.')
  if (missingNormals) warnings.push(`${missingNormals} mesh${missingNormals === 1 ? '' : 'es'} missing normal attributes.`)
  if (!meshes) warnings.push('No renderable meshes were detected in this GLB.')
  if (Math.max(size.x, size.y, size.z) > 1000) warnings.push('Model bounds are unusually large; verify authored units.')

  return {
    meshes,
    skinnedMeshes,
    vertices: Math.round(vertices),
    triangles: Math.round(triangles),
    materials: materials.size,
    textures: textures.size,
    missingNormals,
    bounds: { size: size.toArray() as [number, number, number], center: center.toArray() as [number, number, number] },
    animations: animations.map((clip) => ({ name: clip.name || 'Untitled clip', duration: clip.duration })),
    materialSlots,
    warnings,
  }
}

export function createBoundsHelper(root: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(root)
  return box.isEmpty() ? null : new THREE.Box3Helper(box, 0xd9ff54)
}

export function createSkeletonHelper(root: THREE.Object3D) {
  let hasSkinnedMesh = false
  root.traverse((object) => { if (object instanceof THREE.SkinnedMesh) hasSkinnedMesh = true })
  return hasSkinnedMesh ? new THREE.SkeletonHelper(root) : null
}
