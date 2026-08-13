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
  return { slug, scene: field(block, 'scene'), category: field(block, 'category'), geometryV2: /geometryV2:\s*true/.test(block) || promotedSlugs.has(slug), featured: /featured:\s*true/.test(block), sourceType: field(block, 'sourceType') }
})

const phase2 = new Set([
  'mirrorless-camera','medium-format-camera','cinema-camera','modular-smartphone','mechanical-keyboard','field-audio-recorder',
  'ergonomic-task-chair-pro','boucle-barrel-chair','leather-sling-chair','bentwood-rocking-chair','cantilever-sofa','oak-dining-armchair',
  'grand-touring-coupe','compact-electric-hatchback','electric-cargo-van','adventure-motorcycle-adv','carbon-bicycle-frameset','high-speed-train-nose',
  'portable-ultrasound-unit','digital-ophthalmoscope','electronic-stethoscope','precision-microscope','raman-spectrometer-bench','analytical-balance',
])
const phase3 = new Set([
  'japanese-maple-study','mediterranean-palm-cluster','bamboo-grove-study','agave-rosette','succulent-arrangement','wildflower-meadow-study','moss-stone-study','desert-boulder-study',
  'dual-group-espresso-machine','precision-coffee-grinder','pour-over-coffee-set','cocktail-shaker-set','crystal-wine-decanter','professional-saute-pan','enamel-dutch-oven','artisan-bread-basket',
  'structured-leather-tote','technical-weekender-bag','compact-crossbody-bag','titanium-aviator-frames','acetate-optical-frames','mechanical-chronograph-watch','minimal-dress-watch','curb-chain-bracelet',
])
const phase4 = new Set([
  'sea-fan-coral-study','patisserie-display-stand','sculptural-pendant-necklace','brushed-signet-ring','aero-cycling-helmet','alpine-ski-goggles','carbon-running-shoe','pro-football-cleat',
  'tour-tennis-racket','studio-dumbbell-pair','competition-kettlebell','climbing-carabiner-set','digital-torque-wrench','professional-vernier-caliper','audio-mastering-desk-scene','product-photography-studio',
  'contemporary-surgical-suite','advanced-research-laboratory','electric-vehicle-workshop','minimal-living-room-scene','luxury-boutique-display','sculpture-gallery-courtyard','observatory-roof-deck','robotics-assembly-cell',
])
const phase5 = new Set([
  'courtyard-villa-study','glass-house-study','cliff-cabin-study','urban-row-house','museum-wing-study','timber-library-hall','rail-platform-canopy','urban-bus-pavilion','footbridge-lookout-tower','coastal-observation-shelter',
  'six-axis-robot-cell','scara-assembly-robot','delta-pick-robot','servo-drive-module','plc-control-rack','conveyor-diverter-junction','compact-palletizer','vacuum-gripper-array','machine-vision-camera','safety-light-curtain',
  'cnc-rotary-table','precision-milling-vice','twelve-station-tool-turret','hydraulic-tie-rod-cylinder',
])
const phases = [['Phase 2',phase2],['Phase 3',phase3],['Phase 4',phase4],['Phase 5',phase5]]

const advancedSignals = [
  /new THREE\.BufferGeometry\s*\(/g, /new THREE\.Shape\s*\(/g,
  /new THREE\.(?:CatmullRomCurve3|CubicBezierCurve3|QuadraticBezierCurve3)\s*\(/g,
  /<(?:tubeGeometry|latheGeometry|extrudeGeometry|shapeGeometry)\b/g,
  /<(?:LoftSurface|RevolvedSurface|SplineTube|ExtrudedProfile|LeafSurface)\b/g,
]
const primarySignals = /new THREE\.BufferGeometry\s*\(|new THREE\.Shape\s*\(|<latheGeometry\b|<(?:LoftSurface|RevolvedSurface|ExtrudedProfile|LeafSurface)\b/g
const primitiveSignals = /<(?:boxGeometry|cylinderGeometry|sphereGeometry|capsuleGeometry|coneGeometry|torusGeometry|CurvedBox)\b/g
const productionSignal = /<(?:PerformanceForm|SpatialForm|ArchitectureForm|IndustrialForm)\b/g
const failures = []
let v2Count = 0
let primitiveOnly = 0
let curvedBoxScenes = 0
const phasePassed = new Map(phases.map(([label]) => [label, 0]))

for (const asset of assets) {
  if (asset.sourceType === 'Model') continue
  const scene = await readFile(resolve(root, 'src/components/scenes', `${asset.scene}.tsx`), 'utf8')
  const productionCount = (scene.match(productionSignal) ?? []).length
  const directAdvanced = advancedSignals.reduce((sum, pattern) => sum + (scene.match(pattern) ?? []).length, 0)
  const advancedCount = directAdvanced + productionCount * 5
  const primaryCount = (scene.match(primarySignals) ?? []).length + productionCount * 3
  const primitiveCount = (scene.match(primitiveSignals) ?? []).length
  if (scene.includes("../geometry/CurvedBox")) curvedBoxScenes += 1
  if (advancedCount === 0) primitiveOnly += 1
  if (!asset.geometryV2) continue
  v2Count += 1
  if (advancedCount < 2) failures.push(`${asset.slug}: Geometry V2 requires at least two curved/custom geometry signals (${advancedCount})`)
  if (primaryCount < 1) failures.push(`${asset.slug}: Geometry V2 primary silhouette must use authored curved/profile geometry`)
  if (primitiveCount > 0 && advancedCount / primitiveCount < 0.22) failures.push(`${asset.slug}: Geometry V2 remains too primitive-dominated (${advancedCount} advanced / ${primitiveCount} primitive)`)

  if (phase2.has(asset.slug)) {
    if (!scene.includes("../geometry/GeometryV2")) failures.push(`${asset.slug}: Phase 2 asset must use the GeometryV2 toolkit`)
    if (advancedCount < 3 || primaryCount < 2) failures.push(`${asset.slug}: Phase 2 curved/profile density regressed`)
    if (scene.length < 1200) failures.push(`${asset.slug}: Phase 2 scene is too thin (${scene.length} bytes)`)
    phasePassed.set('Phase 2', phasePassed.get('Phase 2') + 1)
  }
  if (phase3.has(asset.slug)) {
    if (!scene.includes("../geometry/GeometryV2")) failures.push(`${asset.slug}: Phase 3 asset must use the GeometryV2 toolkit`)
    if (advancedCount < 3 || primaryCount < 2) failures.push(`${asset.slug}: Phase 3 curved/profile density regressed`)
    if (scene.length < 1800) failures.push(`${asset.slug}: Phase 3 must meet the 1800-byte authored-source floor (${scene.length})`)
    phasePassed.set('Phase 3', phasePassed.get('Phase 3') + 1)
  }
  if (phase4.has(asset.slug) || phase5.has(asset.slug)) {
    if (!scene.includes("../geometry/GeometryV2") && !scene.includes("../geometry/ProductionForms")) failures.push(`${asset.slug}: Phase 4/5 must use authored Geometry V2 infrastructure`)
    if (advancedCount < 4 || primaryCount < 2) failures.push(`${asset.slug}: Phase 4/5 requires stronger curved/profile density (${advancedCount}/${primaryCount})`)
    if (scene.length < 900) failures.push(`${asset.slug}: Phase 4/5 wrapper/source below 900-byte floor (${scene.length})`)
    const label = phase4.has(asset.slug) ? 'Phase 4' : 'Phase 5'
    phasePassed.set(label, phasePassed.get(label) + 1)
  }
}

for (const [label, set] of phases) {
  for (const slug of set) {
    const asset = assets.find((item) => item.slug === slug)
    if (!asset?.geometryV2) failures.push(`${slug}: ${label} asset must be promoted to Geometry V2`)
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
console.log(`Geometry V2 audit passed: ${v2Count} promoted assets; ${phases.map(([label,set]) => `${label} ${phasePassed.get(label)}/${set.size}`).join('; ')}; ${curvedBoxScenes} CurvedBox scenes; ${primitiveOnly} advanced-geometry pending.`)
