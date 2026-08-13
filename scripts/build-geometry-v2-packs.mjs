import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createZip, readZip } from './zip-utils.mjs'

const root = process.cwd()
const manifestPath = resolve(root, 'public/downloads/manifest.json')
const helperSource = await readFile(resolve(root, 'src/components/geometry/GeometryV2.tsx'))
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
let repaired = 0

for (const asset of manifest.assets) {
  const zipPath = resolve(root, asset.file.replace(/^\//, 'public/'))
  const zip = await readFile(zipPath)
  const entries = readZip(zip)
  const sceneKey = `${asset.slug}/src/Scene.tsx`
  const sceneBytes = entries.get(sceneKey)
  if (!sceneBytes) throw new Error(`${asset.slug}: generated pack is missing src/Scene.tsx`)
  const scene = sceneBytes.toString('utf8')
  if (!scene.includes("../geometry/GeometryV2")) continue

  const fixedScene = scene.replaceAll("../geometry/GeometryV2", "./geometry/GeometryV2")
  const output = []
  for (const [name, data] of entries) {
    output.push({ name, data: name === sceneKey ? fixedScene : data })
    if (name === sceneKey) output.push({ name: `${asset.slug}/src/geometry/GeometryV2.tsx`, data: helperSource })
  }
  const rebuilt = createZip(output)
  await writeFile(zipPath, rebuilt)
  asset.bytes = rebuilt.byteLength
  asset.sha256 = createHash('sha256').update(rebuilt).digest('hex')
  repaired += 1
}
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`Geometry V2 pack repair passed: ${repaired} standalone pack(s) include the shared authored-surface toolkit.`)
