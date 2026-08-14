import { useLayoutEffect, useMemo, useRef, type ReactNode } from 'react'
import * as THREE from 'three'
import {
  defaultAssetCustomization,
  isCustomizableScene,
  resolveAssetCustomization,
  type AssetCustomization,
} from '../lib/assetCustomization'
import type { AssetSceneKind } from '../lib/types'

type CustomizableMaterial = THREE.Material & {
  color?: THREE.Color
  roughness?: number
  metalness?: number
  emissive?: THREE.Color
  emissiveIntensity?: number
  opacity: number
  transparent: boolean
  depthWrite: boolean
  wireframe?: boolean
  needsUpdate: boolean
}

type MaterialBaseline = {
  color?: THREE.Color
  roughness?: number
  metalness?: number
  emissive?: THREE.Color
  emissiveIntensity?: number
  opacity: number
  transparent: boolean
  depthWrite: boolean
  wireframe?: boolean
}

type MaterialBinding = {
  mesh: THREE.Mesh
  original: THREE.Material | THREE.Material[]
  clones: CustomizableMaterial[]
  families: number[]
}

function baseline(material: CustomizableMaterial): MaterialBaseline {
  return {
    color: material.color?.clone(),
    roughness: material.roughness,
    metalness: material.metalness,
    emissive: material.emissive?.clone(),
    emissiveIntensity: material.emissiveIntensity,
    opacity: material.opacity,
    transparent: material.transparent,
    depthWrite: material.depthWrite,
    wireframe: material.wireframe,
  }
}

function applyMaterial(
  material: CustomizableMaterial,
  authored: MaterialBaseline,
  family: number,
  customization: AssetCustomization,
) {
  if (authored.color && material.color) material.color.copy(authored.color)
  if (typeof authored.roughness === 'number' && typeof material.roughness === 'number') {
    material.roughness = THREE.MathUtils.clamp(authored.roughness * customization.roughnessScale, 0, 1)
  }
  if (typeof authored.metalness === 'number' && typeof material.metalness === 'number') {
    material.metalness = THREE.MathUtils.clamp(authored.metalness * customization.metalnessScale, 0, 1)
  }
  if (authored.emissive && material.emissive) material.emissive.copy(authored.emissive)
  if (typeof authored.emissiveIntensity === 'number' && typeof material.emissiveIntensity === 'number') {
    material.emissiveIntensity = Math.max(0, authored.emissiveIntensity * customization.emissiveScale)
  }
  material.opacity = THREE.MathUtils.clamp(authored.opacity * customization.opacity, 0, 1)
  material.transparent = authored.transparent || material.opacity < 0.999
  material.depthWrite = authored.depthWrite && material.opacity >= 0.999
  if (typeof material.wireframe === 'boolean') material.wireframe = customization.wireframe || authored.wireframe === true

  if (material.color && customization.palette !== 'authored') {
    const color = customization.palette === 'mono' || family % 2 === 0
      ? customization.primaryColor
      : customization.secondaryColor
    material.color.set(color)
  }
  material.needsUpdate = true
}

/**
 * Applies non-destructive, runtime-only material tuning to curated procedural scenes.
 * Original scene materials are never mutated: every mounted mesh receives a clone and
 * those clones are restored/disposed when the layer unmounts.
 */
export function AssetCustomizationLayer({
  scene,
  customization = defaultAssetCustomization,
  children,
}: {
  scene: AssetSceneKind | string
  customization?: Partial<AssetCustomization>
  children: ReactNode
}) {
  const group = useRef<THREE.Group>(null)
  const bindings = useRef<MaterialBinding[]>([])
  const baselines = useRef(new WeakMap<THREE.Material, MaterialBaseline>())
  const enabled = isCustomizableScene(scene)
  const resolved = useMemo(() => resolveAssetCustomization(scene, customization), [customization, scene])

  useLayoutEffect(() => {
    if (!enabled || !group.current) return
    const familyByMaterial = new Map<string, number>()
    const mounted: MaterialBinding[] = []

    group.current.traverse((object) => {
      if (!(object instanceof THREE.Mesh) || !object.material) return
      const originals = Array.isArray(object.material) ? object.material : [object.material]
      const clones = originals.map((source) => {
        const clone = source.clone() as CustomizableMaterial
        baselines.current.set(clone, baseline(clone))
        return clone
      })
      const families = originals.map((source) => {
        const existing = familyByMaterial.get(source.uuid)
        if (typeof existing === 'number') return existing
        const next = familyByMaterial.size
        familyByMaterial.set(source.uuid, next)
        return next
      })
      mounted.push({ mesh: object, original: object.material, clones, families })
      object.material = Array.isArray(object.material) ? clones : clones[0]
    })

    bindings.current = mounted
    return () => {
      for (const binding of mounted) {
        binding.mesh.material = binding.original
        for (const material of binding.clones) material.dispose()
      }
      bindings.current = []
      baselines.current = new WeakMap()
    }
  }, [enabled, scene])

  useLayoutEffect(() => {
    if (!enabled) return
    for (const binding of bindings.current) {
      binding.clones.forEach((material, index) => {
        const authored = baselines.current.get(material)
        if (authored) applyMaterial(material, authored, binding.families[index] ?? 0, resolved)
      })
    }
  }, [enabled, resolved])

  return (
    <group ref={group} scale={enabled ? resolved.geometryScale : 1}>
      {children}
    </group>
  )
}
