import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const source = await readFile(resolve(root, 'src/data/assets.ts'), 'utf8')
const blocks = [...source.matchAll(/\{\s*\n?\s*slug:\s*'[^']+'[\s\S]*?\n\s*\},/g)].map((match) => match[0])

function field(block, name, required = true) {
  const match = block.match(new RegExp(`${name}:\\s*'([^']+)'`))
  if (!match && required) throw new Error(`Asset block missing ${name}`)
  return match?.[1]
}

function estimateRepeatedGeometry(scene) {
  let count = 0
  for (const match of scene.matchAll(/Array\.from\(\{\s*length:\s*(\d+)/g)) count += Math.min(Number(match[1]), 24)
  for (const match of scene.matchAll(/\[([^\]]{1,180})\]\.map\(/g)) {
    const items = match[1].split(',').map((item) => item.trim()).filter(Boolean)
    count += Math.min(Math.max(items.length, 2), 16)
  }
  if (scene.includes('<Instances')) count += 12
  if (/useMemo\([\s\S]{0,600}(?:atoms|points|positions|bonds|instances)/i.test(scene)) count += 8
  return count
}

const complexCategories = new Set(['Objects','People','Animals','Furniture','Vehicles','Architecture','Technology','Fashion','Food','Scenes','Industrial','Scientific','Medical','Jewelry','Sports','Tools'])
const failures = []
const records = []

for (const block of blocks) {
  const asset = {
    index: field(block, 'index'), slug: field(block, 'slug'), name: field(block, 'name'), category: field(block, 'category'),
    subcategory: field(block, 'subcategory', false) ?? null, scene: field(block, 'scene'), sourceType: field(block, 'sourceType'),
    complexity: field(block, 'complexity'), interaction: field(block, 'interaction'), presentation: field(block, 'presentation', false) ?? 'Floating',
  }
  if (asset.sourceType === 'Model') { records.push({ ...asset, audit: 'MODELED_GATE', criticalPassed: true }); continue }

  const scene = await readFile(resolve(root, 'src/components/scenes', `${asset.scene}.tsx`), 'utf8')
  const bytes = Buffer.byteLength(scene)
  const meshLike = (scene.match(/<(?:mesh|RoundedBox|CurvedBox|Instance|Line)\b/g) ?? []).length
  const geometries = (scene.match(/<[A-Za-z][A-Za-z0-9]*Geometry\b/g) ?? []).length
  const profiledSurfaces = (scene.match(/<(?:LoftSurface|RevolvedSurface|ExtrudedProfile)\b/g) ?? []).length
  const splineSurfaces = (scene.match(/<SplineTube\b/g) ?? []).length
  const repeated = estimateRepeatedGeometry(scene)
  const effectiveGeometry = meshLike + geometries + repeated + profiledSurfaces * 3 + splineSurfaces * 2
  const materials = (scene.match(/<(?:mesh(?:Physical|Standard|Basic|Lambert|Phong)|shader)Material\b|<MeshTransmissionMaterial\b/g) ?? []).length
  const premiumMaterials = (scene.match(/<meshPhysicalMaterial\b|<MeshTransmissionMaterial\b|<shaderMaterial\b/g) ?? []).length
  const distinctColors = new Set([...scene.matchAll(/color="(#[0-9a-fA-F]{6})"/g)].map((match) => match[1].toLowerCase())).size
  const animated = /useFrame\s*\(/.test(scene)
  const shaderDriven = /shaderMaterial|glsl|vertexShader|fragmentShader/.test(scene)
  const deterministic = !/Math\.random\s*\(/.test(scene)
  const placeholderFree = !/\b(?:TODO|FIXME|placeholder|lorem ipsum)\b/i.test(scene)

  const checks = {
    deterministic, placeholderFree, authoredSource: bytes >= 600, renderable: effectiveGeometry >= 1 || shaderDriven,
    materialDefined: materials >= 1, premiumForCinematic: asset.complexity !== 'Cinematic' || premiumMaterials >= 1,
    semanticDensity: !complexCategories.has(asset.category) || effectiveGeometry >= 6,
    scaledDensity: Number(asset.index) < 301 || (bytes >= 1800 && effectiveGeometry >= 9 && materials >= 3),
  }
  for (const [name, pass] of Object.entries(checks)) if (!pass) failures.push(`${asset.slug}: ${name} failed`)

  const score = Math.round(Math.min(100, 35 + Math.min(18, bytes / 120) + Math.min(22, effectiveGeometry * 1.45) + Math.min(10, materials * 2) + Math.min(5, distinctColors * 1.25) + (premiumMaterials ? 5 : 0) + (animated || shaderDriven ? 5 : 0)))
  records.push({ ...asset, criticalPassed: Object.values(checks).every(Boolean), score, metrics: { bytes, meshLike, geometries, profiledSurfaces, splineSurfaces, repeatedGeometryEstimate: repeated, effectiveGeometry, materials, premiumMaterials, distinctColors, animated, shaderDriven }, checks })
}

if (failures.length) {
  console.error(`Asset quality audit failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}
const scores = records.filter((record) => typeof record.score === 'number').map((record) => record.score)
const report = {
  brand: 'MESHVARA', generatedBy: 'scripts/audit-asset-quality.mjs', assetCount: records.length,
  criticalPassed: records.every((record) => record.criticalPassed), minimumAutomatedScore: Math.min(...scores),
  averageAutomatedScore: Number((scores.reduce((sum, value) => sum + value, 0) / scores.length).toFixed(2)),
  note: 'Automated checks verify source depth, deterministic construction, rendering/material contracts, semantic density and packaging readiness. They complement — not replace — visual art-direction review.', assets: records,
}
await mkdir(resolve(root, 'public/quality'), { recursive: true })
await writeFile(resolve(root, 'public/quality/asset-audit.json'), JSON.stringify(report, null, 2) + '\n')
console.log(`Asset quality audit passed: ${records.length} assets; minimum automated score ${report.minimumAutomatedScore}; report written to public/quality/asset-audit.json.`)
