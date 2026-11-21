import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createZip, readZip } from './zip-utils.mjs'

const root = process.cwd()
const manifestPath = resolve(root, 'public/downloads/manifest.json')
const geometrySource = await readFile(resolve(root, 'src/components/geometry/GeometryV2.tsx'))
const productionSource = await readFile(resolve(root, 'src/components/geometry/ProductionForms.tsx'))
const pbrSource = await readFile(resolve(root, 'src/components/geometry/CC0Surface.tsx'))
const pbrLedger = JSON.parse(await readFile(resolve(root, 'src/data/cc0ArchitectureTextures.json'), 'utf8'))
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
let repaired = 0
let productionPacks = 0

for (const asset of manifest.assets) {
  const zipPath = resolve(root, asset.file.replace(/^\//, 'public/'))
  const zip = await readFile(zipPath)
  const entries = readZip(zip)
  const sceneKey = `${asset.slug}/src/Scene.tsx`
  const sceneBytes = entries.get(sceneKey)
  if (!sceneBytes) throw new Error(`${asset.slug}: generated pack is missing src/Scene.tsx`)
  const scene = sceneBytes.toString('utf8')
  const usesProduction = scene.includes("../geometry/ProductionForms")
  const usesPbr = scene.includes("../geometry/CC0Surface")
  const usesGeometry = scene.includes("../geometry/GeometryV2") || usesProduction || usesPbr
  if (!usesGeometry) continue
  const surfaces = usesPbr
    ? [...new Set([...scene.matchAll(/<CC0Surface\s+texture="([^"]+)"/g)].map((match) => match[1]))]
    : []
  if (usesPbr && surfaces.length === 0) throw new Error(asset.slug + ': missing named PBR material')

  const fixedScene = scene
    .replaceAll("../geometry/GeometryV2", "./geometry/GeometryV2")
    .replaceAll("../geometry/ProductionForms", "./geometry/ProductionForms")
    .replaceAll("../geometry/CC0Surface", "./geometry/CC0Surface")
  const output = []
  for (const [name, data] of entries) {
    output.push({ name, data: name === sceneKey ? fixedScene : data })
    if (name === sceneKey) {
      output.push({ name: `${asset.slug}/src/geometry/GeometryV2.tsx`, data: geometrySource })
      if (usesProduction) output.push({ name: asset.slug + '/src/geometry/ProductionForms.tsx', data: productionSource })
      if (usesPbr) output.push({ name: asset.slug + '/src/geometry/CC0Surface.tsx', data: pbrSource })
    }
  }
  if (usesPbr) {
    const licenseNotes = [
      'Scanned architectural materials for this Meshvara asset',
      'Provider: Poly Haven; license: CC0-1.0 (https://polyhaven.com/license)',
      'Copy the included public/textures/architecture directory to the consuming application public directory.',
      'The source preview and this download use matching local color/normal/roughness maps.',
      ''
    ]
    for (const surface of surfaces) {
      const record = pbrLedger.sources?.[surface]
      if (!record) throw new Error(asset.slug + ': missing PBR provenance for ' + surface)
      licenseNotes.push(surface + ': ' + record.sourceUrl + ' - original authors: ' + record.authors.join(', '))
      for (const [type, meta] of Object.entries(record.maps)) {
        const data = await readFile(resolve(root, meta.outputPath))
        const hash = createHash('sha256').update(data).digest('hex')
        if (hash !== meta.sha256 || data.length !== meta.bytes)
          throw new Error(asset.slug + ': tampered ' + surface + ' ' + type + ' PBR map')
        output.push({ name: asset.slug + '/' + meta.outputPath, data })
      }
    }
    output.push({ name: asset.slug + '/PBR_MATERIALS.md', data: licenseNotes.join('\n') + '\n' })
  }
  const rebuilt = createZip(output)
  await writeFile(zipPath, rebuilt)
  asset.bytes = rebuilt.byteLength
  asset.sha256 = createHash('sha256').update(rebuilt).digest('hex')
  repaired += 1
  if (usesProduction) productionPacks += 1
}
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`Geometry V2 pack repair passed: ${repaired} standalone pack(s); ${productionPacks} include ProductionForms + GeometryV2 dependencies.`)
