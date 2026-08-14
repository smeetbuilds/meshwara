import * as THREE from 'three'
import type { StudioMaterialOverride, StudioTextureChannel } from './studioProject'
import { loadStudioFile } from './studioStorage'
import { studioTextureColorSpace, studioTextureResourceKey, type StudioTextureResources } from './studioModelTools'

export interface StudioLoadedTextureResources {
  textures: StudioTextureResources
  missing: string[]
  dispose: () => void
}

export function collectStudioTextureRequests(overrides: Record<string, StudioMaterialOverride>) {
  const requests = new Map<string, { fileId: string; channel: StudioTextureChannel }>()
  for (const override of Object.values(overrides)) {
    for (const [channel, reference] of Object.entries(override.textures ?? {}) as Array<[StudioTextureChannel, string | null]>) {
      if (typeof reference !== 'string') continue
      const key = studioTextureResourceKey(reference, channel)
      if (!requests.has(key)) requests.set(key, { fileId: reference, channel })
    }
  }
  return requests
}

async function textureFromFile(fileId: string, channel: StudioTextureChannel) {
  const record = await loadStudioFile(fileId)
  if (!record || record.kind !== 'texture') return null
  const url = URL.createObjectURL(new Blob([record.bytes], { type: record.type }))
  try {
    const texture = await new THREE.TextureLoader().loadAsync(url)
    texture.name = record.name
    texture.colorSpace = studioTextureColorSpace(channel)
    texture.flipY = false
    texture.needsUpdate = true
    return texture
  } finally {
    URL.revokeObjectURL(url)
  }
}

export async function loadStudioTextureResources(overrides: Record<string, StudioMaterialOverride>): Promise<StudioLoadedTextureResources> {
  const requests = collectStudioTextureRequests(overrides)
  const textures = new Map<string, THREE.Texture>()
  const missing: string[] = []
  await Promise.all([...requests.entries()].map(async ([key, request]) => {
    try {
      const texture = await textureFromFile(request.fileId, request.channel)
      if (texture) textures.set(key, texture)
      else missing.push(request.fileId)
    } catch {
      missing.push(request.fileId)
    }
  }))
  return {
    textures,
    missing: [...new Set(missing)],
    dispose: () => {
      for (const texture of textures.values()) texture.dispose()
      textures.clear()
    },
  }
}
