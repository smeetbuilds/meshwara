import { decodePlaygroundState, encodePlaygroundState, playgroundDefaults } from '../../src/lib/playgroundState'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Playground state test failed: ${message}`)
}

const source = {
  assetSlug: 'mercury-fold',
  ...playgroundDefaults,
  motion: 'paused' as const,
  pointer: true,
  quality: 'balanced' as const,
  stage: 'dark' as const,
  cameraFov: 42,
  cameraZoom: 1.2,
  exposure: 1.24,
  pointerStrength: 1.45,
  floatSpeed: 1.12,
  floatIntensity: 0.2,
  rotationY: -37,
  background: '#Aa44CC',
}

const encoded = encodePlaygroundState(source)
const roundTrip = decodePlaygroundState(encoded, source.assetSlug, true)
assert(roundTrip, 'round-trip should decode')
assert(roundTrip.motion === 'paused', 'motion should round-trip')
assert(roundTrip.quality === 'balanced', 'quality should round-trip')
assert(roundTrip.stage === 'dark', 'stage should round-trip')
assert(roundTrip.cameraFov === 42 && roundTrip.cameraZoom === 1.2, 'camera tuning should round-trip')
assert(roundTrip.exposure === 1.24 && roundTrip.pointerStrength === 1.45, 'lighting/input tuning should round-trip')
assert(roundTrip.floatSpeed === 1.12 && roundTrip.floatIntensity === 0.2, 'float tuning should round-trip')
assert(roundTrip.rotationY === -37, 'orientation should round-trip')
assert(roundTrip.background === '#aa44cc', 'colors should normalize to lowercase')

assert(decodePlaygroundState(encoded, 'different-asset', true) === null, 'a preset must not leak into another asset')

const hostile = new URLSearchParams({
  a: 'mercury-fold',
  m: 'unexpected',
  p: '1',
  q: 'ultra',
  s: 'neon',
  fov: '999',
  zoom: '-2',
  exp: 'nan',
  ptr: '50',
  fs: '-4',
  fi: '8',
  ry: '720',
  bg: 'javascript:red',
}).toString()
const safe = decodePlaygroundState(hostile, 'mercury-fold', false)
assert(safe, 'hostile state should decode to safe fallbacks')
assert(safe.motion === 'live', 'invalid motion should fall back')
assert(safe.pointer === false, 'unsupported assets must not enable pointer state')
assert(safe.quality === 'crisp' && safe.stage === 'light', 'invalid enums should fall back')
assert(safe.cameraFov === 50 && safe.cameraZoom === 0.75, 'camera numbers should clamp')
assert(safe.exposure === playgroundDefaults.exposure, 'non-finite exposure should fall back')
assert(safe.pointerStrength === 2, 'pointer strength should clamp')
assert(safe.floatSpeed === 0 && safe.floatIntensity === 0.3, 'float controls should clamp')
assert(safe.rotationY === 180, 'orientation should clamp')
assert(safe.background === '', 'invalid background should be rejected')

console.log('Playground state tests passed: round-trip, asset isolation, enum fallback, pointer capability, clamping and color validation.')
