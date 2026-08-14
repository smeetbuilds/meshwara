import customizationRegistry from '../data/customization-registry.json'
import type { AssetSceneKind } from './types'

export type AssetPaletteMode = 'authored' | 'mono' | 'duotone'

export interface AssetCustomization {
  palette: AssetPaletteMode
  primaryColor: string
  secondaryColor: string
  roughnessScale: number
  metalnessScale: number
  emissiveScale: number
  opacity: number
  geometryScale: number
  wireframe: boolean
}

export interface AssetCustomizationPreset {
  id: string
  label: string
  value: AssetCustomization
}

export interface AssetCustomizationDefinition {
  scene: AssetSceneKind
  assetSlug: string
  label: string
  defaults: AssetCustomization
  presets: AssetCustomizationPreset[]
}

export const assetCustomizationRanges = {
  roughnessScale: [0, 2, 0.05],
  metalnessScale: [0, 2, 0.05],
  emissiveScale: [0, 3, 0.05],
  opacity: [0.25, 1, 0.05],
  geometryScale: [0.5, 1.5, 0.05],
} as const

export const defaultAssetCustomization: AssetCustomization = {
  palette: 'authored',
  primaryColor: '#ffffff',
  secondaryColor: '#ffffff',
  roughnessScale: 1,
  metalnessScale: 1,
  emissiveScale: 1,
  opacity: 1,
  geometryScale: 1,
  wireframe: false,
}

const HEX = /^#[0-9a-f]{6}$/i
const PALETTES = new Set<AssetPaletteMode>(['authored', 'mono', 'duotone'])

type RegistryScene = {
  assetSlug?: unknown
  label?: unknown
  defaults?: unknown
  presets?: unknown
}

function finite(value: unknown, fallback: number, min: number, max: number) {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback
}

function color(value: unknown, fallback: string) {
  return typeof value === 'string' && HEX.test(value) ? value.toLowerCase() : fallback
}

export function sanitizeAssetCustomization(value: unknown, fallback: AssetCustomization = defaultAssetCustomization): AssetCustomization {
  const input = value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}
  return {
    palette: PALETTES.has(input.palette as AssetPaletteMode) ? input.palette as AssetPaletteMode : fallback.palette,
    primaryColor: color(input.primaryColor, fallback.primaryColor),
    secondaryColor: color(input.secondaryColor, fallback.secondaryColor),
    roughnessScale: finite(input.roughnessScale, fallback.roughnessScale, assetCustomizationRanges.roughnessScale[0], assetCustomizationRanges.roughnessScale[1]),
    metalnessScale: finite(input.metalnessScale, fallback.metalnessScale, assetCustomizationRanges.metalnessScale[0], assetCustomizationRanges.metalnessScale[1]),
    emissiveScale: finite(input.emissiveScale, fallback.emissiveScale, assetCustomizationRanges.emissiveScale[0], assetCustomizationRanges.emissiveScale[1]),
    opacity: finite(input.opacity, fallback.opacity, assetCustomizationRanges.opacity[0], assetCustomizationRanges.opacity[1]),
    geometryScale: finite(input.geometryScale, fallback.geometryScale, assetCustomizationRanges.geometryScale[0], assetCustomizationRanges.geometryScale[1]),
    wireframe: typeof input.wireframe === 'boolean' ? input.wireframe : fallback.wireframe,
  }
}

function registryScene(scene: string): RegistryScene | null {
  const scenes = customizationRegistry.scenes as Record<string, RegistryScene>
  return Object.prototype.hasOwnProperty.call(scenes, scene) ? scenes[scene] : null
}

export function isCustomizableScene(scene: AssetSceneKind | string): boolean {
  return Boolean(registryScene(scene))
}

export function getAssetCustomizationDefinition(scene: AssetSceneKind | string): AssetCustomizationDefinition | null {
  const entry = registryScene(scene)
  if (!entry) return null
  const defaults = sanitizeAssetCustomization(entry.defaults)
  const presets = Array.isArray(entry.presets)
    ? entry.presets.flatMap((raw): AssetCustomizationPreset[] => {
        if (!raw || typeof raw !== 'object') return []
        const input = raw as Record<string, unknown>
        if (typeof input.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.id)) return []
        return [{
          id: input.id,
          label: typeof input.label === 'string' && input.label.trim() ? input.label.trim().slice(0, 60) : input.id,
          value: sanitizeAssetCustomization(input.value, defaults),
        }]
      })
    : []
  return {
    scene: scene as AssetSceneKind,
    assetSlug: typeof entry.assetSlug === 'string' ? entry.assetSlug : '',
    label: typeof entry.label === 'string' && entry.label.trim() ? entry.label.trim().slice(0, 80) : scene,
    defaults,
    presets: presets.length ? presets : [{ id: 'authored', label: 'Authored', value: defaults }],
  }
}

export function getAssetCustomizationDefinitionByAssetSlug(assetSlug: string): AssetCustomizationDefinition | null {
  for (const scene of Object.keys(customizationRegistry.scenes)) {
    const definition = getAssetCustomizationDefinition(scene)
    if (definition?.assetSlug === assetSlug) return definition
  }
  return null
}

export function resolveAssetCustomizationForAsset(assetSlug: string, value?: Partial<AssetCustomization> | null): AssetCustomization {
  const definition = getAssetCustomizationDefinitionByAssetSlug(assetSlug)
  const fallback = definition?.defaults ?? defaultAssetCustomization
  return sanitizeAssetCustomization(value ? { ...fallback, ...value } : fallback, fallback)
}

export function resolveAssetCustomization(scene: AssetSceneKind | string, value?: Partial<AssetCustomization> | null): AssetCustomization {
  const definition = getAssetCustomizationDefinition(scene)
  const fallback = definition?.defaults ?? defaultAssetCustomization
  return sanitizeAssetCustomization(value ? { ...fallback, ...value } : fallback, fallback)
}

export function getAssetCustomizationPreset(scene: AssetSceneKind | string, presetId: string): AssetCustomization | null {
  const definition = getAssetCustomizationDefinition(scene)
  const preset = definition?.presets.find((item) => item.id === presetId)
  return preset ? { ...preset.value } : null
}

export function identifyAssetCustomizationPreset(scene: AssetSceneKind | string, value: AssetCustomization): string | null {
  const definition = getAssetCustomizationDefinition(scene)
  if (!definition) return null
  const normalized = sanitizeAssetCustomization(value, definition.defaults)
  return definition.presets.find((preset) => JSON.stringify(preset.value) === JSON.stringify(normalized))?.id ?? null
}

export function assetCustomizationRegistryVersion() {
  return customizationRegistry.schemaVersion === 1 ? 1 : 0
}

export function listCustomizableScenes(): string[] {
  return Object.keys(customizationRegistry.scenes).sort()
}

export function listCustomizableAssets(): string[] {
  return Object.values(customizationRegistry.scenes).map((entry) => entry.assetSlug).filter((slug): slug is string => typeof slug === 'string').sort()
}
