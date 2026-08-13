import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()

const [workbench, assetScene, detailRoute, packageJson, manifestJson, contract] = await Promise.all([
  readFile(resolve(root, 'src/components/AssetDeveloperWorkbench.tsx'), 'utf8'),
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
  '<AssetDeveloperPanel',
  'motion={preview.motion}',
  'pointerEnabled={preview.pointer}',
  'quality={preview.quality}',
  'data-stage-theme={preview.stage}',
]) {
  assert(detailRoute.includes(token), `asset detail route is missing ${token}`)
}

for (const token of [
  "export type AssetPreviewMotion = 'live' | 'paused'",
  "export type AssetPreviewQuality = 'efficient' | 'balanced' | 'crisp'",
  "frameloop={paused ? 'demand' : 'always'}",
  'pointerEnabled = true',
  "quality = 'crisp'",
]) {
  assert(assetScene.includes(token), `AssetScene preview contract is missing ${token}`)
}

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
  'Clipboard handoff',
  'Archive integrity',
  'Responsive behavior',
  'QA invariant',
]) {
  assert(contract.includes(token), `DEVELOPER_HANDOFF.md is missing the ${token} contract`)
}

console.log(`Developer handoff check passed: ${manifest.assets.length} downloadable assets expose validated install, copy, preview and checksum contracts.`)
