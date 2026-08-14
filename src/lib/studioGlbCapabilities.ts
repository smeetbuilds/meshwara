export const studioOfflineRequiredGlbCodecs = {
  KHR_draco_mesh_compression: 'Draco geometry compression',
  EXT_meshopt_compression: 'Meshopt geometry compression',
  KHR_texture_basisu: 'KTX2/BasisU texture compression',
} as const

export type StudioOfflineRequiredGlbCodec = keyof typeof studioOfflineRequiredGlbCodecs

export interface StudioGlbCapabilityReport {
  extensionsUsed: string[]
  extensionsRequired: string[]
  offlineCodecsUsed: StudioOfflineRequiredGlbCodec[]
  offlineCodecsRequired: StudioOfflineRequiredGlbCodec[]
}

function stringList(value: unknown) {
  return Array.isArray(value) ? [...new Set(value.filter((item): item is string => typeof item === 'string' && item.length > 0))] : []
}

function codecList(values: string[]): StudioOfflineRequiredGlbCodec[] {
  return values.filter((extension): extension is StudioOfflineRequiredGlbCodec => Object.prototype.hasOwnProperty.call(studioOfflineRequiredGlbCodecs, extension))
}

export function inspectStudioGlbCapabilities(json: unknown): StudioGlbCapabilityReport {
  const root = json && typeof json === 'object' ? json as Record<string, unknown> : {}
  const extensionsUsed = stringList(root.extensionsUsed)
  const extensionsRequired = stringList(root.extensionsRequired)
  return {
    extensionsUsed,
    extensionsRequired,
    offlineCodecsUsed: codecList(extensionsUsed),
    offlineCodecsRequired: codecList(extensionsRequired),
  }
}

/**
 * Storage validation intentionally accepts the codecs Meshvara bundles offline.
 * Loader-level extension errors are still surfaced for unknown glTF extensions.
 */
export function assertStudioGlbCapabilities(json: unknown) {
  return inspectStudioGlbCapabilities(json)
}
