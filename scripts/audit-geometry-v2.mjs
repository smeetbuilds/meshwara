import { readFile } from 'node:fs/promises'
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
  slug: field(block, 'slug'),
  scene: field(block, 'scene'),
  category: field(block, 'category'),
  geometryV2: /geometryV2:\s*true/.test(block),
  featured: /featured:\s*true/.test(block),
  sourceType: field(block, 'sourceType'),
}))

const advancedSignals = [
  /new THREE\.BufferGeometry\s*\(/g,
  /new THREE\.Shape\s*\(/g,
  /new THREE\.(?:CatmullRomCurve3|CubicBezierCurve3|QuadraticBezierCurve3)\s*\(/g,
  /<(?:tubeGeometry|latheGeometry|extrudeGeometry|shapeGeometry)\b/g,
]
const primitiveSignals = /<(?:boxGeometry|cylinderGeometry|sphereGeometry|capsuleGeometry|coneGeometry|torusGeometry|CurvedBox)\b/g
const failures = []
let v2Count = 0
let primitiveOnly = 0
let curvedBoxScenes = 0

for (const asset of assets) {
  if (asset.sourceType === 'Model') continue
  const scene = await readFile(resolve(root, 'src/components/scenes', `${asset.scene}.tsx`), 'utf8')
  const advancedCount = advancedSignals.reduce((sum, pattern) => sum + (scene.match(pattern) ?? []).length, 0)
  const primitiveCount = (scene.match(primitiveSignals) ?? []).length
  if (scene.includes("../geometry/CurvedBox")) curvedBoxScenes += 1
  if (advancedCount === 0) primitiveOnly += 1

  if (!asset.geometryV2) continue
  v2Count += 1
  if (advancedCount < 2) failures.push(`${asset.slug}: Geometry V2 requires at least two curved/custom geometry signals (${advancedCount})`)
  if (!/new THREE\.BufferGeometry\s*\(|new THREE\.Shape\s*\(|<latheGeometry\b/.test(scene)) {
    failures.push(`${asset.slug}: Geometry V2 primary silhouette must use custom buffer, authored profile, or lathed geometry`)
  }
  if (primitiveCount > 0 && advancedCount / primitiveCount < 0.22) {
    failures.push(`${asset.slug}: Geometry V2 remains too primitive-dominated (${advancedCount} advanced / ${primitiveCount} primitive)`)
  }
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

console.log(`Geometry V2 audit passed: ${v2Count} bespoke V2 assets; ${curvedBoxScenes} scenes use continuous CurvedBox surfaces; ${primitiveOnly} scenes remain advanced-geometry pending.`)
