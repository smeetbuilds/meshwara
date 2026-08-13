import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()

const [workbench, playground, stateCodec, stateTest, assetScene, detailRoute, packageJson, manifestJson, contract] = await Promise.all([
  readFile(resolve(root, 'src/components/AssetDeveloperWorkbench.tsx'), 'utf8'),
  readFile(resolve(root, 'src/components/AssetPlayground.tsx'), 'utf8'),
  readFile(resolve(root, 'src/lib/playgroundState.ts'), 'utf8'),
  readFile(resolve(root, 'tests/developer-handoff/playground-state.test.ts'), 'utf8'),
  readFile(resolve(root, 'src/components/AssetScene.tsx'), 'utf8'),
  readFile(resolve(root, 'src/routes/assets/$slug.tsx'), 'utf8'),
  readFile(resolve(root, 'package.json'), 'utf8'),
  readFile(resolve(root, 'public/downloads/manifest.json'), 'utf8'),
  readFile(resolve(root, 'DEVELOPER_HANDOFF.md'), 'utf8'),
])

const pkg = JSON.parse(packageJson)
const manifest = JSON.parse(manifestJson)

function assert(condition, message) {
  if (!condition) throw new Error(`Developer handoff validation failed: ${message}`)
}

for (const token of [
  '<AssetPreviewControls',
  '<AssetPlayground',
  '<AssetDeveloperPanel',
  'motion={preview.motion}',
  'pointerEnabled={preview.pointer}',
  'quality={preview.quality}',
  'tuning={playground.tuning}',
  'data-stage-theme={preview.stage}',
  "data-custom-stage={playground.background ? 'true' : 'false'}",
  'href="#playground"',
]) {
  assert(detailRoute.includes(token), `asset detail route is missing ${token}`)
}

for (const token of [
  "export type AssetPreviewMotion = 'live' | 'paused'",
  "export type AssetPreviewQuality = 'efficient' | 'balanced' | 'crisp'",
  'export interface AssetSceneTuning',
  'defaultAssetSceneTuning',
  'function CameraTuner',
  'function RendererTuner',
  'pointer.x * 0.18 * strength',
  'speed={paused ? 0 : compact ? 0.5 : tuning.floatSpeed}',
  'floatIntensity={paused ? 0 : compact ? 0.08 : tuning.floatIntensity}',
  'THREE.MathUtils.degToRad(tuning.rotationY)',
  "frameloop={paused ? 'demand' : 'always'}",
  "quality = 'crisp'",
]) {
  assert(assetScene.includes(token), `AssetScene preview/playground contract is missing ${token}`)
}

for (const token of [
  'decodePlaygroundState',
  'encodePlaygroundState',
  "searchParams.set('play'",
  "searchParams.get('play')",
  'new Blob([presetJson]',
  '.meshvara-preset.json',
  'Reset authored view',
  'Copy preset',
  'Copy share link',
  'Export JSON',
  'Preset JSON',
  'R3F recipe',
  '<AssetPreviewControls',
  "onPreviewChange({ ...defaultPreviewSettings, pointer: supportsPointer })",
  "onChange({ tuning: { ...defaultAssetSceneTuning }, background: '' })",
]) {
  assert(playground.includes(token), `asset playground is missing ${token}`)
}

assert(!playground.includes('<Canvas'), 'asset playground must reuse the detail preview instead of mounting a second Canvas')
assert(!playground.includes('fetch('), 'asset playground state must remain frontend-only and must not introduce backend persistence')

for (const token of [
  'export const playgroundRanges',
  'encodePlaygroundState',
  'decodePlaygroundState',
  "params.set('a', state.assetSlug)",
  "params.get('a') !== assetSlug",
  'Number.isFinite(parsed)',
  '/^#[0-9a-f]{6}$/i',
  "supportsPointer && params.get('p') !== '0'",
]) {
  assert(stateCodec.includes(token), `playground state codec is missing ${token}`)
}

for (const token of [
  'round-trip should decode',
  'a preset must not leak into another asset',
  'camera numbers should clamp',
  'unsupported assets must not enable pointer state',
  'invalid background should be rejected',
]) {
  assert(stateTest.includes(token), `playground state test is missing ${token}`)
}

assert(pkg.scripts?.['handoff:check']?.includes('playground-state.test.ts'), 'handoff:check must execute the playground state test')
assert(pkg.scripts?.['handoff:check']?.includes('validate-developer-handoff.mjs'), 'handoff:check must execute the structural handoff validator')

for (const token of [
  "fetch('/downloads/manifest.json'",
  'navigator.clipboard',
  "document.execCommand('copy')",
  'Copy checksum',
  'React / Vite',
  'Next.js',
  'Inspect source',
  'Download source ZIP',
]) {
  assert(workbench.includes(token), `developer workbench is missing ${token}`)
}

const runtimePins = ['three', '@react-three/fiber', '@react-three/drei', 'react']
for (const dependency of runtimePins) {
  const version = pkg.dependencies?.[dependency]
  assert(typeof version === 'string' && /^\d+\.\d+\.\d+$/.test(version), `${dependency} must remain exactly pinned`)
  assert(workbench.includes(`${dependency}@${version}`), `copy-ready install command is stale for ${dependency}@${version}`)
}

assert(Array.isArray(manifest.assets) && manifest.assets.length > 0, 'download manifest must contain assets')
const invalidIntegrity = manifest.assets.filter((entry) => (
  !entry
  || typeof entry.slug !== 'string'
  || !Number.isInteger(entry.bytes)
  || entry.bytes <= 0
  || typeof entry.sha256 !== 'string'
  || !/^[a-f0-9]{64}$/i.test(entry.sha256)
))
assert(invalidIntegrity.length === 0, `${invalidIntegrity.length} manifest entries have invalid size/checksum metadata`)

for (const token of [
  'Preview controls',
  'Playground contract',
  'Reproducible state',
  'Code synchronization',
  'Clipboard handoff',
  'Archive integrity',
  'Responsive behavior',
  'QA invariant',
]) {
  assert(contract.includes(token), `DEVELOPER_HANDOFF.md is missing the ${token} contract`)
}

console.log(`Developer handoff check passed: ${manifest.assets.length} downloadable assets expose validated preview, playground, share, export, install, copy and checksum contracts.`)
