import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const catalog = await readFile(resolve(root, 'src/data/assets.ts'), 'utf8')
const registry = await readFile(resolve(root, 'src/data/geometryV2.ts'), 'utf8')
const promoted = new Set([...registry.matchAll(/'([^']+)'/g)].map((match) => match[1]))
const blocks = [...catalog.matchAll(/\{\s*\n?\s*slug:\s*'[^']+'[\s\S]*?\n\s*\},/g)].map((match) => match[0])

function field(block, name) {
  const match = block.match(new RegExp(`${name}:\\s*'([^']+)'`))
  if (!match) throw new Error(`Asset block missing ${name}`)
  return match[1]
}
const assets = new Map(blocks.map((block) => [field(block, 'slug'), { scene: field(block, 'scene'), category: field(block, 'category') }]))

const phase4 = new Set([
  'sea-fan-coral-study','patisserie-display-stand','sculptural-pendant-necklace','brushed-signet-ring','aero-cycling-helmet','alpine-ski-goggles',
  'carbon-running-shoe','pro-football-cleat','tour-tennis-racket','studio-dumbbell-pair','competition-kettlebell','climbing-carabiner-set',
  'digital-torque-wrench','professional-vernier-caliper','audio-mastering-desk-scene','product-photography-studio','contemporary-surgical-suite','advanced-research-laboratory',
  'electric-vehicle-workshop','minimal-living-room-scene','luxury-boutique-display','sculpture-gallery-courtyard','observatory-roof-deck','robotics-assembly-cell',
])
const phase5 = new Set([
  'courtyard-villa-study','glass-house-study','cliff-cabin-study','urban-row-house','museum-wing-study','timber-library-hall','rail-platform-canopy','urban-bus-pavilion',
  'footbridge-lookout-tower','coastal-observation-shelter','six-axis-robot-cell','scara-assembly-robot','delta-pick-robot','servo-drive-module',
  'plc-control-rack','conveyor-diverter-junction','compact-palletizer','vacuum-gripper-array','machine-vision-camera','safety-light-curtain',
  'cnc-rotary-table','precision-milling-vice','twelve-station-tool-turret','hydraulic-tie-rod-cylinder',
])
const spatial = new Set(['patisserie-display-stand','audio-mastering-desk-scene','product-photography-studio','contemporary-surgical-suite','advanced-research-laboratory','electric-vehicle-workshop','minimal-living-room-scene','luxury-boutique-display','sculpture-gallery-courtyard','observatory-roof-deck','robotics-assembly-cell'])
const performance = new Set(['sculptural-pendant-necklace','brushed-signet-ring','aero-cycling-helmet','alpine-ski-goggles','carbon-running-shoe','pro-football-cleat'])
const architecture = new Set(['courtyard-villa-study','glass-house-study','cliff-cabin-study','urban-row-house','museum-wing-study','timber-library-hall','rail-platform-canopy','urban-bus-pavilion','footbridge-lookout-tower','coastal-observation-shelter'])
const industrial = new Set([...phase5].filter((slug) => !architecture.has(slug)))
const direct = new Set([...phase4].filter((slug) => !spatial.has(slug) && !performance.has(slug)))
const failures = []
const fingerprints = new Map()
let passed = 0

for (const slug of [...phase4, ...phase5]) {
  const asset = assets.get(slug)
  if (!asset) { failures.push(`${slug}: missing catalog record`); continue }
  if (!promoted.has(slug)) failures.push(`${slug}: not promoted in Geometry V2 registry`)
  const scene = await readFile(resolve(root, 'src/components/scenes', `${asset.scene}.tsx`), 'utf8')
  const bytes = Buffer.byteLength(scene)
  const colors = new Set([...scene.matchAll(/#[0-9a-fA-F]{6}/g)].map((m) => m[0].toLowerCase())).size
  const configArrays = (scene.match(/const\s+\w+\s*(?::[^=\n]+)?=\s*\[/g) ?? []).length
  const directAdvanced = (scene.match(/<(?:LoftSurface|RevolvedSurface|SplineTube|ExtrudedProfile|LeafSurface)\b/g) ?? []).length
  if (bytes < 900) failures.push(`${slug}: production wrapper/source too thin (${bytes} bytes)`)
  if (colors < 3) failures.push(`${slug}: requires at least 3 controlled material colors (${colors})`)
  if (/Math\.random\s*\(|\b(?:TODO|FIXME|placeholder|lorem ipsum)\b/i.test(scene)) failures.push(`${slug}: non-production marker or randomness found`)
  if (direct.has(slug)) {
    if (directAdvanced < 4) failures.push(`${slug}: direct V2 scene requires >=4 authored curved/profile operations (${directAdvanced})`)
    if (configArrays < 2) failures.push(`${slug}: direct V2 scene requires >=2 authored configuration arrays (${configArrays})`)
  } else {
    if (configArrays < 4) failures.push(`${slug}: production-form asset requires >=4 authored configuration arrays (${configArrays})`)
  }
  if (spatial.has(slug) && !scene.includes('<SpatialForm')) failures.push(`${slug}: expected SpatialForm composition`)
  if (performance.has(slug) && !scene.includes('<PerformanceForm')) failures.push(`${slug}: expected PerformanceForm composition`)
  if (architecture.has(slug) && !scene.includes('<ArchitectureForm')) failures.push(`${slug}: expected ArchitectureForm composition`)
  if (industrial.has(slug) && !scene.includes('<IndustrialForm')) failures.push(`${slug}: expected IndustrialForm composition`)

  const fingerprint = scene
    .replace(/^import[^\n]+$/gm, '')
    .replace(/#[0-9a-fA-F]{6}/g, '#COLOR')
    .replace(/(?:primary|secondary|accent|wall|roof|frame|body|machine|signal)Material=\{\{[^}]+\}\}/g, 'material={{MATERIAL}}')
    .replace(/export default function\s+\w+/g, 'export default function Scene')
    .replace(/\s+/g, ' ')
    .trim()
  const hash = createHash('sha256').update(fingerprint).digest('hex')
  if (fingerprints.has(hash)) failures.push(`${slug}: duplicate production-form silhouette/configuration of ${fingerprints.get(hash)}`)
  else fingerprints.set(hash, slug)
  passed += 1
}

if (failures.length) {
  console.error(`Production form validation failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}
console.log(`Production form validation passed: ${passed}/${phase4.size + phase5.size} Phase 4/5 assets; unique authored configurations and helper contracts enforced.`)
