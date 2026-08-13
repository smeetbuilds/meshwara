import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const source = await readFile(resolve(root, 'src/data/assets.ts'), 'utf8')
const v2Source = await readFile(resolve(root, 'src/data/geometryV2.ts'), 'utf8')
const promotedSlugs = new Set([...v2Source.matchAll(/'([^']+)'/g)].map((match) => match[1]))
const blocks = [...source.matchAll(/\{\s*\n?\s*slug:\s*'[^']+'[\s\S]*?\n\s*\},/g)].map((match) => match[0])

function field(block, name, required = true) {
  const match = block.match(new RegExp(`${name}:\\s*'([^']+)'`))
  if (!match && required) throw new Error(`Asset block missing ${name}`)
  return match?.[1]
}

const assets = blocks.map((block) => {
  const slug = field(block, 'slug')
  return {
    slug, scene: field(block, 'scene'), category: field(block, 'category'),
    geometryV2: /geometryV2:\s*true/.test(block) || promotedSlugs.has(slug), featured: /featured:\s*true/.test(block), sourceType: field(block, 'sourceType'),
  }
})

const phase2 = new Set([
  'mirrorless-camera','medium-format-camera','cinema-camera','modular-smartphone','mechanical-keyboard','field-audio-recorder',
  'ergonomic-task-chair-pro','boucle-barrel-chair','leather-sling-chair','bentwood-rocking-chair','cantilever-sofa','oak-dining-armchair',
  'grand-touring-coupe','compact-electric-hatchback','electric-cargo-van','adventure-motorcycle-adv','carbon-bicycle-frameset','high-speed-train-nose',
  'portable-ultrasound-unit','digital-ophthalmoscope','electronic-stethoscope','precision-microscope','raman-spectrometer-bench','analytical-balance',
])

const advancedSignals = [
  /new THREE\.BufferGeometry\s*\(/g, /new THREE\.Shape\s*\(/g,
  /new THREE\.(?:CatmullRomCurve3|CubicBezierCurve3|QuadraticBezierCurve3)\s*\(/g,
  /<(?:tubeGeometry|latheGeometry|extrudeGeometry|shapeGeometry)\b/g,
  /<(?:LoftSurface|RevolvedSurface|SplineTube|ExtrudedProfile)\b/g,
]
const primarySignals = /new THREE\.BufferGeometry\s*\(|new THREE\.Shape\s*\(|<latheGeometry\b|<(?:LoftSurface|RevolvedSurface|ExtrudedProfile)\b/g
const primitiveSignals = /<(?:boxGeometry|cylinderGeometry|sphereGeometry|capsuleGeometry|coneGeometry|torusGeometry|CurvedBox)\b/g
const failures = []
let v2Count = 0
let primitiveOnly = 0
let curvedBoxScenes = 0
let phase2Passed = 0

for (const asset of assets) {
  if (asset.sourceType === 'Model') continue
  const scene = await readFile(resolve(root, 'src/components/scenes', `${asset.scene}.tsx`), 'utf8')
  const advancedCount = advancedSignals.reduce((sum, pattern) => sum + (scene.match(pattern) ?? []).length, 0)
  const primaryCount = (scene.match(primarySignals) ?? []).length
  const primitiveCount = (scene.match(primitiveSignals) ?? []).length
  if (scene.includes("../geometry/CurvedBox")) curvedBoxScenes += 1
  if (advancedCount === 0) primitiveOnly += 1
  if (!asset.geometryV2) continue
  v2Count += 1
  if (advancedCount < 2) failures.push(`${asset.slug}: Geometry V2 requires at least two curved/custom geometry signals (${advancedCount})`)
  if (primaryCount < 1) failures.push(`${asset.slug}: Geometry V2 primary silhouette must use a loft, revolved/extruded profile, custom buffer, authored shape, or lathed geometry`)
  if (primitiveCount > 0 && advancedCount / primitiveCount < 0.22) failures.push(`${asset.slug}: Geometry V2 remains too primitive-dominated (${advancedCount} advanced / ${primitiveCount} primitive)`)

  if (phase2.has(asset.slug)) {
    if (!scene.includes("../geometry/GeometryV2")) failures.push(`${asset.slug}: Phase 2 asset must use the authored GeometryV2 surface toolkit`)
    if (advancedCount < 3) failures.push(`${asset.slug}: Phase 2 requires at least three authored curved/profile geometry operations (${advancedCount})`)
    if (primaryCount < 2) failures.push(`${asset.slug}: Phase 2 requires at least two primary curved/profile surfaces (${primaryCount})`)
    if (scene.length < 1200) failures.push(`${asset.slug}: Phase 2 scene is too thin for a bespoke rebuild (${scene.length} bytes)`)
    if (!/(?:const\s+\w*(?:body|seat|back|cabin|chassis|console|head|tank|base|sling|nose|finder|lens|profile|arm|frame|belt|roof|probe|handle|stage|wheel|saddle|fork|stays|bar|hub|tube|chest|module|diaphragm|rail|seam|aperture)\w*\s*[:=])/i.test(scene)) {
      failures.push(`${asset.slug}: Phase 2 must contain authored silhouette/profile data`)
    }
    phase2Passed += 1
  }
}

for (const slug of phase2) {
  const asset = assets.find((item) => item.slug === slug)
  if (!asset?.geometryV2) failures.push(`${slug}: Phase 2 asset must be promoted to Geometry V2`)
}
const promoted = assets.filter((asset) => asset.featured && asset.geometryV2).slice(-6)
if (promoted.length < 6) failures.push(`Homepage requires six Geometry V2 featured assets; found ${promoted.length}`)
const hero = assets.find((asset) => asset.slug === 'precision-chrono')
if (!hero?.geometryV2) failures.push('Homepage hero precision-chrono must remain Geometry V2')

if (failures.length) {
  console.error(`Geometry V2 audit failed with ${failures.length} issue(s):`)
  for (const item of failures) console.error(`- ${item}`)
  process.exit(1)
}
console.log(`Geometry V2 audit passed: ${v2Count} promoted V2 assets; Phase 2 ${phase2Passed}/${phase2.size}; ${curvedBoxScenes} scenes use continuous CurvedBox surfaces; ${primitiveOnly} scenes remain advanced-geometry pending.`)
