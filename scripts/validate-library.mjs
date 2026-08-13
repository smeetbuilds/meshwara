import { readFile, stat } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { readZip } from './zip-utils.mjs'

const root = process.cwd()
const source = await readFile(resolve(root, 'src/data/assets.ts'), 'utf8')
const assetBlocks = [...source.matchAll(/\{\s*\n?\s*slug:\s*'[^']+'[\s\S]*?\n\s*\},/g)].map((match) => match[0])

function assetField(block, field, required = true) {
  const match = block.match(new RegExp(`${field}:\\s*'([^']+)'`))
  if (!match && required) throw new Error(`Asset block missing ${field}`)
  return match?.[1]
}

const records = assetBlocks.map((block) => ({
  slug: assetField(block, 'slug'),
  index: assetField(block, 'index'),
  name: assetField(block, 'name'),
  category: assetField(block, 'category'),
  subcategory: assetField(block, 'subcategory', false),
  scene: assetField(block, 'scene'),
  interaction: assetField(block, 'interaction'),
  presentation: assetField(block, 'presentation', false) ?? 'Floating',
  sourceType: assetField(block, 'sourceType'),
  download: assetField(block, 'download'),
}))
const registry = await readFile(resolve(root, 'src/components/sceneRegistry.tsx'), 'utf8')
const groupedCategories = new Set([...source.matchAll(/categories:\s*\[([^\]]+)\]/g)].flatMap((match) => [...match[1].matchAll(/'([^']+)'/g)].map((item) => item[1])))

const failures = []
const slugs = new Set()
const indexes = new Set()
const scenes = new Set()
if (!records.length) failures.push('no asset records parsed from src/data/assets.ts')

function componentName(name) {
  return name.replace(/[^a-zA-Z0-9]+/g, ' ').trim().split(/\s+/).map((part) => part[0].toUpperCase() + part.slice(1)).join('')
}

function requireEntries(zip, entries, failures) {
  for (const entry of entries) if (!zip.has(entry)) failures.push(`download pack missing ${entry}`)
}

for (const asset of records) {
  if (slugs.has(asset.slug)) failures.push(`duplicate slug: ${asset.slug}`)
  if (indexes.has(asset.index)) failures.push(`duplicate index: ${asset.index}`)
  if (scenes.has(asset.scene)) failures.push(`duplicate scene binding: ${asset.scene}`)
  slugs.add(asset.slug); indexes.add(asset.index); scenes.add(asset.scene)
  if (!groupedCategories.has(asset.category)) failures.push(`category is not assigned to a browsing world: ${asset.slug} -> ${asset.category}`)
  if (asset.subcategory !== undefined && !asset.subcategory.trim()) failures.push(`empty explicit subcategory: ${asset.slug}`)

  const expectedDownload = `/downloads/${asset.slug}.zip`
  if (asset.download !== expectedDownload) failures.push(`download URL does not match slug: ${asset.slug}`)

  const sceneModule = resolve(root, 'src/components/scenes', `${asset.scene}.tsx`)
  try {
    const sceneSource = await readFile(sceneModule, 'utf8')
    if (!/export\s+default\s+/.test(sceneSource)) failures.push(`scene has no default export: ${asset.scene}`)
    if (/Math\.random\s*\(/.test(sceneSource)) failures.push(`non-deterministic Math.random in published scene: ${asset.scene}`)
  } catch {
    failures.push(`missing lazy scene module: ${asset.slug} -> ${asset.scene}`)
  }
  if (!registry.includes(`${asset.scene}: lazy(() => import('./scenes/${asset.scene}'))`)) failures.push(`scene missing from lazy registry: ${asset.scene}`)

  const file = resolve(root, 'public', asset.download.replace(/^\//, ''))
  try {
    const info = await stat(file)
    if (info.size < 1000) failures.push(`download pack too small: ${asset.slug}`)
    const zip = readZip(await readFile(file))
    const prefix = `${asset.slug}/`
    const component = componentName(asset.name)
    const pkg = zip.get(`${prefix}package.json`)?.toString('utf8') ?? ''
    if (pkg.includes('"latest"')) failures.push(`floating latest dependency in ${asset.slug}`)

    if (asset.sourceType === 'Model') {
      requireEntries(zip, [
        `${prefix}README.md`, `${prefix}package.json`, `${prefix}tsconfig.json`,
        `${prefix}LICENSE-CODE.txt`, `${prefix}LICENSE-ASSET.md`, `${prefix}manifest.json`, `${prefix}QUALITY.md`,
        `${prefix}src/ModelAsset.tsx`, `${prefix}src/ModelStage.tsx`, `${prefix}src/useReducedMotion.ts`,
        `${prefix}src/${component}.tsx`, `${prefix}src/index.ts`,
      ], failures)
      const manifestRaw = zip.get(`${prefix}manifest.json`)?.toString('utf8')
      if (!manifestRaw) {
        failures.push(`model pack has no readable manifest: ${asset.slug}`)
      } else {
        const manifest = JSON.parse(manifestRaw)
        if (manifest.publish !== true) failures.push(`model pack is not publish-approved: ${asset.slug}`)
        if (manifest.license?.redistribution !== true || manifest.license?.commercialUse !== true) failures.push(`model pack license is not redistributable/commercial: ${asset.slug}`)
        for (const spec of Object.values(manifest.tiers ?? {})) {
          const entry = `${prefix}models/${String(spec.file).split('/').pop()}`
          requireEntries(zip, [entry], failures)
          const bytes = zip.get(entry)
          if (bytes && /^[a-f0-9]{64}$/.test(spec.sha256 ?? '')) {
            const digest = createHash('sha256').update(bytes).digest('hex')
            if (digest !== spec.sha256) failures.push(`model pack SHA-256 mismatch for ${asset.slug}: ${entry}`)
          } else if (bytes) {
            failures.push(`model pack manifest lacks valid SHA-256 for ${asset.slug}: ${entry}`)
          }
        }
        const evidence = new Set([
          ...Object.values(manifest.qaEvidence ?? {}),
          ...(manifest.animations ?? []).flatMap((item) => [item.qaEvidence, item.metricsFile]),
          ...(manifest.character?.transitions ?? []).flatMap((item) => [item.qaEvidence, item.metricsFile]),
          ...(manifest.character?.deformationQa ?? []).flatMap((item) => [item.qaEvidence, item.metricsFile]),
          manifest.character?.facial?.qaEvidence,
          manifest.character?.facial?.metricsFile,
          manifest.character?.handQa?.qaEvidence,
          manifest.character?.handQa?.metricsFile,
          manifest.character?.lodConsistency?.qaEvidence,
          manifest.character?.lodConsistency?.metricsFile,
        ].filter((value) => typeof value === 'string' && value.trim()))
        for (const relative of evidence) requireEntries(zip, [`${prefix}${relative.replaceAll('\\', '/')}`], failures)
      }
      const runtime = zip.get(`${prefix}src/ModelAsset.tsx`)?.toString('utf8') ?? ''
      if (!runtime.includes('prefers-reduced-motion') && !(zip.get(`${prefix}src/useReducedMotion.ts`)?.toString('utf8') ?? '').includes('prefers-reduced-motion')) failures.push(`model pack lacks reduced-motion support: ${asset.slug}`)
      const wrapper = zip.get(`${prefix}src/${component}.tsx`)?.toString('utf8') ?? ''
      if (!wrapper.includes('ModelStage')) failures.push(`model pack wrapper does not use grounded model stage: ${asset.slug}`)
    } else {
      requireEntries(zip, [
        `${prefix}README.md`, `${prefix}LICENSE`, `${prefix}QUALITY.md`, `${prefix}package.json`, `${prefix}tsconfig.json`,
        `${prefix}src/Scene.tsx`, `${prefix}src/${component}.tsx`, `${prefix}src/index.ts`,
      ], failures)
      const wrapper = zip.get(`${prefix}src/${component}.tsx`)?.toString('utf8') ?? ''
      if (!wrapper.includes('prefers-reduced-motion')) failures.push(`download wrapper lacks reduced-motion support: ${asset.slug}`)
      if (!wrapper.includes('<Bounds fit clip observe')) failures.push(`download wrapper lacks automatic bounds/framing: ${asset.slug}`)
      if (!wrapper.includes('ACESFilmicToneMapping')) failures.push(`download wrapper lacks ACES tone mapping: ${asset.slug}`)
      if (asset.interaction === 'Pointer' && !wrapper.includes('<Rig enabled={!reducedMotion && true}>')) failures.push(`download wrapper interaction contract mismatch: ${asset.slug} (${asset.interaction})`)
      if (asset.interaction === 'Idle' && wrapper.includes('<Rig enabled={!reducedMotion && true}>')) failures.push(`idle download wrapper still enables pointer rig: ${asset.slug}`)
      if (asset.presentation === 'Floating' && !wrapper.includes('<Float ')) failures.push(`floating download wrapper is missing Float presentation: ${asset.slug}`)
      if (asset.presentation !== 'Floating' && wrapper.includes('<Float ')) failures.push(`${asset.presentation.toLowerCase()} download wrapper incorrectly uses Float: ${asset.slug}`)
      if (wrapper.includes('React.ReactNode')) failures.push(`download wrapper uses implicit React namespace: ${asset.slug}`)
    }
  } catch (error) {
    failures.push(`invalid download pack ${asset.slug}: ${error instanceof Error ? error.message : String(error)}`)
  }
}


try {
  const downloadManifest = JSON.parse(await readFile(resolve(root, 'public/downloads/manifest.json'), 'utf8'))
  if (downloadManifest.brand !== 'MESHVARA') failures.push('download integrity manifest brand mismatch')
  if (downloadManifest.count !== records.length || downloadManifest.assets?.length !== records.length) failures.push(`download integrity manifest count mismatch: ${downloadManifest.count ?? 'missing'} / ${records.length}`)
  const bySlug = new Map((downloadManifest.assets ?? []).map((item) => [item.slug, item]))
  for (const asset of records) {
    const item = bySlug.get(asset.slug)
    if (!item) { failures.push(`download integrity manifest missing asset: ${asset.slug}`); continue }
    if (item.file !== asset.download) failures.push(`download integrity manifest path mismatch: ${asset.slug}`)
    const bytes = await readFile(resolve(root, 'public', asset.download.replace(/^\//, '')))
    if (item.bytes !== bytes.length) failures.push(`download integrity manifest size mismatch: ${asset.slug}`)
    if (item.sha256 !== createHash('sha256').update(bytes).digest('hex')) failures.push(`download integrity manifest SHA-256 mismatch: ${asset.slug}`)
  }
} catch (error) {
  failures.push(`download integrity manifest invalid: ${error instanceof Error ? error.message : String(error)}`)
}


try {
  const card = await readFile(resolve(root, 'src/components/AssetCard.tsx'), 'utf8')
  const sceneHost = await readFile(resolve(root, 'src/components/AssetScene.tsx'), 'utf8')
  const lazyPreview = await readFile(resolve(root, 'src/components/LazyAssetScene.tsx'), 'utf8')
  const libraryGrid = await readFile(resolve(root, 'src/components/LibraryGrid.tsx'), 'utf8')
  if (!card.includes('<LazyAssetScene')) failures.push('catalog cards do not render the actual lazy asset preview')
  if (!card.includes('Preview in 3D')) failures.push('catalog cards do not expose an explicit 3D preview control')
  if (!card.includes('previewActive') || !card.includes('onPreviewActivate')) failures.push('catalog cards are not wired for controlled single-preview rendering')
  if (!sceneHost.includes('<Bounds fit clip observe')) failures.push('site preview renderer lacks automatic bounds/framing')
  if (!sceneHost.includes('ACESFilmicToneMapping')) failures.push('site preview renderer lacks ACES tone mapping')
  if (!lazyPreview.includes('IntersectionObserver')) failures.push('catalog preview renderer is not viewport gated')
  if (!lazyPreview.includes('enabled && inView')) failures.push('catalog preview renderer does not require explicit activation plus viewport visibility')
  if (!lazyPreview.includes('PreviewErrorBoundary')) failures.push('catalog preview renderer lacks recovery UI')
  if (!libraryGrid.includes('activePreview') || !libraryGrid.includes('previewActive={activePreview === asset.slug}')) failures.push('catalog does not enforce a single active preview')
  if (!libraryGrid.includes('const PAGE_SIZE = 16')) failures.push('catalog initial render batch is larger than the performance budget')
  if (!lazyPreview.includes("rootMargin: '120px 0px'")) failures.push('catalog preview viewport margin is too aggressive for a large library')
} catch (error) {
  failures.push(`catalog preview contract invalid: ${error instanceof Error ? error.message : String(error)}`)
}

const expected = records.map((_, index) => String(index + 1).padStart(3, '0'))
const actual = records.map((asset) => asset.index)
if (expected.join('|') !== actual.join('|')) failures.push('asset indexes are not contiguous and ordered')

const registryBindings = [...registry.matchAll(/\w+: lazy\(\(\) => import\('\.\/scenes\/([^']+)'\)\)/g)].map((m) => m[1])
if (registryBindings.length !== scenes.size) failures.push(`lazy registry count ${registryBindings.length} does not match catalog scene count ${scenes.size}`)

if (failures.length) {
  console.error(`Library validation failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}
console.log(`Library validation passed: ${records.length} assets, ${slugs.size} verified ZIPs, ${scenes.size} lazy scene modules.`)
