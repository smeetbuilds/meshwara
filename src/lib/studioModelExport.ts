import { clone } from 'three/addons/utils/SkeletonUtils.js'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
import * as THREE from 'three'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { StudioFileRecord } from './studioStorage'
import type { StudioNode } from './studioProject'
import { disposeStudioModel, inspectStudioModel, prepareStudioModel, type StudioModelInspection } from './studioModelTools'
import { loadStudioTextureResources } from './studioTextureResources'

export type StudioGlbExportProfile = 'source' | 'desktop' | 'mobile'

export const studioGlbExportProfiles: Record<StudioGlbExportProfile, { label: string; maxTextureSize: number; note: string }> = {
  source: { label: 'PRESERVE', maxTextureSize: Infinity, note: 'Preserve authored texture resolution while baking Studio edits.' },
  desktop: { label: 'WEB · 2K', maxTextureSize: 2048, note: 'Cap exported texture dimensions at 2048px for desktop/web delivery.' },
  mobile: { label: 'MOBILE · 1K', maxTextureSize: 1024, note: 'Cap exported texture dimensions at 1024px for tighter mobile delivery.' },
}

export interface StudioGlbExportResult {
  bytes: ArrayBuffer
  sourceBytes: number
  outputBytes: number
  savingsPercent: number
  profile: StudioGlbExportProfile
  maxTextureSize: number
  inspection: StudioModelInspection
}

function parseGlb(bytes: ArrayBuffer) {
  return new Promise<GLTF>((resolve, reject) => {
    const loader = new GLTFLoader()
    loader.parse(bytes.slice(0), '', resolve, reject)
  })
}

function exportBinary(input: THREE.Object3D, animations: THREE.AnimationClip[], maxTextureSize: number) {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const exporter = new GLTFExporter()
    exporter.parse(
      input,
      (result) => result instanceof ArrayBuffer ? resolve(result) : reject(new Error('GLTFExporter returned JSON instead of binary GLB.')),
      reject,
      { binary: true, onlyVisible: true, trs: true, animations, maxTextureSize },
    )
  })
}

export async function exportStudioGlb(
  record: StudioFileRecord,
  node: StudioNode,
  profile: StudioGlbExportProfile = 'source',
): Promise<StudioGlbExportResult> {
  if (node.kind !== 'imported' || record.kind !== 'glb') throw new Error('GLB export is available for imported models only.')
  const gltf = await parseGlb(record.bytes)
  const scene = clone(gltf.scene)
  const textureBundle = await loadStudioTextureResources(node.materialOverrides)
  try {
    prepareStudioModel(scene, node.materialOverrides, false, textureBundle.textures)
    const inspection = inspectStudioModel(scene, gltf.animations)
    if (textureBundle.missing.length) throw new Error(`${textureBundle.missing.length} local texture replacement${textureBundle.missing.length === 1 ? ' is' : 's are'} missing.`)
    const maxTextureSize = studioGlbExportProfiles[profile].maxTextureSize
    const bytes = await exportBinary(scene, gltf.animations, maxTextureSize)
    const savingsPercent = record.size > 0 ? ((record.size - bytes.byteLength) / record.size) * 100 : 0
    return { bytes, sourceBytes: record.size, outputBytes: bytes.byteLength, savingsPercent, profile, maxTextureSize, inspection }
  } finally {
    disposeStudioModel(scene)
    textureBundle.dispose()
  }
}

/** Compatibility alias retained for existing callers and generated docs. */
export function exportCleanStudioGlb(record: StudioFileRecord, node: StudioNode) {
  return exportStudioGlb(record, node, 'source')
}
