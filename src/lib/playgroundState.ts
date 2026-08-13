export type PlaygroundMotion = 'live' | 'paused'
export type PlaygroundQuality = 'efficient' | 'balanced' | 'crisp'
export type PlaygroundStage = 'light' | 'dark'

export interface PlaygroundSerializableState {
  assetSlug: string
  motion: PlaygroundMotion
  pointer: boolean
  quality: PlaygroundQuality
  stage: PlaygroundStage
  cameraFov: number
  cameraZoom: number
  exposure: number
  pointerStrength: number
  floatSpeed: number
  floatIntensity: number
  rotationY: number
  background: string
}

export const playgroundDefaults: Omit<PlaygroundSerializableState, 'assetSlug'> = {
  motion: 'live',
  pointer: true,
  quality: 'crisp',
  stage: 'light',
  cameraFov: 34,
  cameraZoom: 1,
  exposure: 1.08,
  pointerStrength: 1,
  floatSpeed: 0.78,
  floatIntensity: 0.11,
  rotationY: 0,
  background: '',
}

export const playgroundRanges = {
  cameraFov: [26, 50],
  cameraZoom: [0.75, 1.35],
  exposure: [0.65, 1.5],
  pointerStrength: [0, 2],
  floatSpeed: [0, 1.6],
  floatIntensity: [0, 0.3],
  rotationY: [-180, 180],
} as const

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function finite(value: string | null, fallback: number, range: readonly [number, number]) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? clamp(parsed, range[0], range[1]) : fallback
}

function validColor(value: string | null) {
  return value && /^#[0-9a-f]{6}$/i.test(value) ? value.toLowerCase() : ''
}

export function encodePlaygroundState(state: PlaygroundSerializableState) {
  const params = new URLSearchParams()
  params.set('a', state.assetSlug)
  params.set('m', state.motion === 'paused' ? 'p' : 'l')
  params.set('p', state.pointer ? '1' : '0')
  params.set('q', state.quality)
  params.set('s', state.stage)
  params.set('fov', String(state.cameraFov))
  params.set('zoom', String(state.cameraZoom))
  params.set('exp', String(state.exposure))
  params.set('ptr', String(state.pointerStrength))
  params.set('fs', String(state.floatSpeed))
  params.set('fi', String(state.floatIntensity))
  params.set('ry', String(state.rotationY))
  if (state.background) params.set('bg', state.background)
  return params.toString()
}

export function decodePlaygroundState(encoded: string, assetSlug: string, supportsPointer: boolean): PlaygroundSerializableState | null {
  const params = new URLSearchParams(encoded)
  if (params.get('a') !== assetSlug) return null

  const quality = params.get('q')
  const stage = params.get('s')

  return {
    assetSlug,
    motion: params.get('m') === 'p' ? 'paused' : playgroundDefaults.motion,
    pointer: supportsPointer && params.get('p') !== '0',
    quality: quality === 'efficient' || quality === 'balanced' || quality === 'crisp' ? quality : playgroundDefaults.quality,
    stage: stage === 'dark' ? 'dark' : playgroundDefaults.stage,
    cameraFov: finite(params.get('fov'), playgroundDefaults.cameraFov, playgroundRanges.cameraFov),
    cameraZoom: finite(params.get('zoom'), playgroundDefaults.cameraZoom, playgroundRanges.cameraZoom),
    exposure: finite(params.get('exp'), playgroundDefaults.exposure, playgroundRanges.exposure),
    pointerStrength: finite(params.get('ptr'), playgroundDefaults.pointerStrength, playgroundRanges.pointerStrength),
    floatSpeed: finite(params.get('fs'), playgroundDefaults.floatSpeed, playgroundRanges.floatSpeed),
    floatIntensity: finite(params.get('fi'), playgroundDefaults.floatIntensity, playgroundRanges.floatIntensity),
    rotationY: finite(params.get('ry'), playgroundDefaults.rotationY, playgroundRanges.rotationY),
    background: validColor(params.get('bg')),
  }
}
