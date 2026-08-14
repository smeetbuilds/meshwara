import { clone } from 'three/addons/utils/SkeletonUtils.js'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
import * as THREE from 'three'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { StudioFileRecord } from './studioStorage'
import type { StudioNode } from './studioProject'
import { disposeStudioModel, inspectStudioModel, prepareStudioModel, type StudioModelInspection } from './studioModelTools'

export interface StudioGlbExportResult {
  bytes: ArrayBuffer
  sourceBytes: number
  outputBytes: number
  inspection: StudioModelInspection
}

function parseGlb(bytes: ArrayBuffer) {
  return new Promise<GLTF>((resolve, reject) => {
    const loader = new GLTFLoader()
    loader.parse(bytes.slice(0), '', resolve, reject)
  })
}

function exportBinary(input: THREE.Object3D, animations: THREE.AnimationClip[]) {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const exporter = new GLTFExporter()
    exporter.parse(
      input,
      (result) => result instanceof ArrayBuffer ? resolve(result) : reject(new Error('GLTFExporter returned JSON instead of binary GLB.')),
      reject,
      { binary: true, onlyVisible: true, trs: true, animations },
    )
  })
}

export async function exportCleanStudioGlb(record: StudioFileRecord, node: StudioNode): Promise<StudioGlbExportResult> {
  if (node.kind !== 'imported') throw new Error('Clean GLB export is available for imported models only.')
  const gltf = await parseGlb(record.bytes)
  const scene = clone(gltf.scene)
  try {
    prepareStudioModel(scene, node.materialOverrides, false)
    const inspection = inspectStudioModel(scene, gltf.animations)
    const bytes = await exportBinary(scene, gltf.animations)
    return { bytes, sourceBytes: record.size, outputBytes: bytes.byteLength, inspection }
  } finally {
    disposeStudioModel(scene)
  }
}
