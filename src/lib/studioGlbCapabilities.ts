export const studioUnsupportedRequiredGlbExtensions = {
  KHR_draco_mesh_compression: 'Draco geometry compression',
  EXT_meshopt_compression: 'Meshopt geometry compression',
  KHR_texture_basisu: 'KTX2/BasisU texture compression',
} as const

export type StudioUnsupportedRequiredGlbExtension = keyof typeof studioUnsupportedRequiredGlbExtensions

export interface StudioGlbCapabilityReport {
  extensionsUsed: string[]
  extensionsRequired: string[]
  unsupportedRequired: StudioUnsupportedRequiredGlbExtension[]
}

function stringList(value: unknown) {
  return Array.isArray(value) ? [...new Set(value.filter((item): item is string => typeof item === 'string' && item.length > 0))] : []
}

export function inspectStudioGlbCapabilities(json: unknown): StudioGlbCapabilityReport {
  const root = json && typeof json === 'object' ? json as Record<string, unknown> : {}
  const extensionsUsed = stringList(root.extensionsUsed)
  const extensionsRequired = stringList(root.extensionsRequired)
  const unsupportedRequired = extensionsRequired.filter((extension): extension is StudioUnsupportedRequiredGlbExtension => Object.prototype.hasOwnProperty.call(studioUnsupportedRequiredGlbExtensions, extension))
  return { extensionsUsed, extensionsRequired, unsupportedRequired }
}

export function assertStudioGlbCapabilities(json: unknown) {
  const report = inspectStudioGlbCapabilities(json)
  if (!report.unsupportedRequired.length) return report
  const detail = report.unsupportedRequired
    .map((extension) => `${studioUnsupportedRequiredGlbExtensions[extension]} (${extension})`)
    .join(', ')
  throw new Error(`GLB requires ${detail}; Meshvara Studio does not bundle those offline codecs yet.`)
}
