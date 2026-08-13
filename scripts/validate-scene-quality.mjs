import { createHash } from 'node:crypto'
import { readFile, stat } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const source = await readFile(resolve(root, 'src/data/assets.ts'), 'utf8')
const blocks = [...source.matchAll(/\{\s*\n?\s*slug:\s*'[^']+'[\s\S]*?\n\s*\},/g)].map((match) => match[0])
function field(block, name, required = true) {
  const match = block.match(new RegExp(`${name}:\\s*'([^']+)'`))
  if (!match && required) throw new Error(`Asset block missing ${name}`)
  return match?.[1]
}
const assets = blocks.map((block) => ({
  slug: field(block,'slug'), index: Number(field(block,'index')), name: field(block,'name'), category: field(block,'category'), subcategory: field(block,'subcategory',false), scene: field(block,'scene'), blurb: field(block,'blurb'), description: field(block,'description'), complexity: field(block,'complexity'), tags: [...block.matchAll(/tags:\s*\[([^\]]+)\]/g)].flatMap((m) => [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1])), sourceType: field(block,'sourceType'),
}))
function metrics(scene) {
  const legacyNodes = (scene.match(/<(?:RoundedBox|CurvedBox|mesh)\b/g) ?? []).length
  const primary = (scene.match(/<(?:LoftSurface|RevolvedSurface|ExtrudedProfile|LeafSurface)\b/g) ?? []).length
  const splines = (scene.match(/<SplineTube\b/g) ?? []).length
  const production = (scene.match(/<(?:PerformanceForm|SpatialForm|ArchitectureForm|IndustrialForm)\b/g) ?? []).length
  const explicitMaterials = (scene.match(/<(?:mesh(?:Physical|Standard|Basic)|shader)Material\b|<MeshTransmissionMaterial\b/g) ?? []).length
  const premium = (scene.match(/<meshPhysicalMaterial\b|<MeshTransmissionMaterial\b|<shaderMaterial\b/g) ?? []).length
  return { production, geometryScore: legacyNodes + primary * 3 + splines * 2 + production * 12, materialCount: explicitMaterials + production * 4, premiumCount: premium + production * 3 }
}
const failures = []
const exactSceneHashes = new Map()
for (const asset of assets) {
  if (asset.blurb.length < 48) failures.push(`${asset.slug}: blurb is too thin (${asset.blurb.length} chars)`)
  if (asset.description.length < 76) failures.push(`${asset.slug}: description is too thin (${asset.description.length} chars)`)
  if (asset.index >= 201 && asset.description.length < 96) failures.push(`${asset.slug}: scaled production description is too thin (${asset.description.length} chars)`)
  if (asset.tags.length < 3) failures.push(`${asset.slug}: requires at least 3 authored tags`)
  if (asset.index >= 301 && asset.tags.length < 4) failures.push(`${asset.slug}: 301+ production assets require at least 4 authored tags`)
  if (asset.index >= 201 && !asset.subcategory) failures.push(`${asset.slug}: scaled catalog additions require explicit subcategory`)
  if (asset.sourceType === 'Model') continue
  const path = resolve(root, 'src/components/scenes', `${asset.scene}.tsx`)
  const scene = await readFile(path, 'utf8')
  const size = (await stat(path)).size
  const { production, geometryScore, materialCount, premiumCount } = metrics(scene)
  const effectiveSize = size + production * 1200
  const distinctColors = new Set([...scene.matchAll(/#[0-9a-fA-F]{6}/g)].map((m) => m[0].toLowerCase())).size
  if (size < 500) failures.push(`${asset.slug}: scene source is suspiciously small (${size} bytes)`)
  if (production > 0 && size < 900) failures.push(`${asset.slug}: shared-form scene needs >=900 bytes of per-asset authored configuration (${size})`)
  if (materialCount < 1) failures.push(`${asset.slug}: scene has no explicit/transitive web material`)
  if (/\b(?:TODO|FIXME|placeholder|lorem ipsum)\b/i.test(scene)) failures.push(`${asset.slug}: placeholder marker found in published scene`)
  if (/Math\.random\s*\(/.test(scene)) failures.push(`${asset.slug}: non-deterministic Math.random is forbidden`)
  if (asset.index >= 201) {
    if (effectiveSize < 680) failures.push(`${asset.slug}: scaled production scene below authored-source floor (${effectiveSize})`)
    if (asset.category === 'Animals' && size < 1200) failures.push(`${asset.slug}: animal study below 1200-byte silhouette/anatomy floor (${size})`)
    if ((asset.category === 'Architecture' || asset.category === 'Scenes') && effectiveSize < 850) failures.push(`${asset.slug}: spatial scene below composition floor (${effectiveSize})`)
  }
  if (asset.index >= 301) {
    if (effectiveSize < 1800) failures.push(`${asset.slug}: 301+ production scene below effective 1800-byte authored-source floor (${effectiveSize})`)
    if (geometryScore < 9) failures.push(`${asset.slug}: 301+ production scene requires authored geometry score >= 9 (${geometryScore})`)
    if (materialCount < 3) failures.push(`${asset.slug}: 301+ production scene requires layered material treatment (${materialCount})`)
    if (distinctColors < 3) failures.push(`${asset.slug}: 301+ production scene requires at least 3 controlled material colors (${distinctColors})`)
    if (asset.category === 'Animals' && geometryScore < 12) failures.push(`${asset.slug}: animal study requires authored anatomy/detail score >= 12 (${geometryScore})`)
    if ((asset.category === 'Architecture' || asset.category === 'Scenes') && geometryScore < 12) failures.push(`${asset.slug}: spatial asset requires authored composition score >= 12 (${geometryScore})`)
    if (asset.complexity === 'Cinematic' && premiumCount < 1) failures.push(`${asset.slug}: cinematic asset needs premium material treatment`)
  }
  const normalized = scene.replace(/function\s+[A-Za-z0-9_]+/g,'function Scene').replace(/export\s+default\s+[A-Za-z0-9_]+/g,'export default Scene').replace(/\s+/g,' ').trim()
  const hash = createHash('sha256').update(normalized).digest('hex')
  if (exactSceneHashes.has(hash)) failures.push(`${asset.slug}: exact scene duplicate of ${exactSceneHashes.get(hash)}`)
  else exactSceneHashes.set(hash, asset.slug)
}
if (failures.length) {
  console.error(`Scene quality validation failed with ${failures.length} issue(s):`)
  for (const item of failures) console.error(`- ${item}`)
  process.exit(1)
}
console.log(`Scene quality validation passed: ${assets.length} assets; shared production forms scored transitively; no placeholders/exact duplicates.`)
