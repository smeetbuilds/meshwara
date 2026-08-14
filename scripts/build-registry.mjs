import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { buildRegistry } from './distribution/core.mjs'

const root = process.cwd()
const manifestPath = resolve(root, process.env.MESHVARA_MANIFEST ?? 'public/downloads/manifest.json')
const packagePath = resolve(root, 'package.json')
const outputPath = resolve(root, process.env.MESHVARA_REGISTRY_OUTPUT ?? 'public/registry/v1.json')
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
const packageJson = JSON.parse(await readFile(packagePath, 'utf8'))
const registry = buildRegistry(manifest, packageJson)
await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(registry, null, 2)}\n`)
console.log(`MESHVARA registry v1 generated: ${registry.count} assets · ${registry.packSchemaVersion === 1 ? 'Pack-v1' : 'legacy/unspecified packs'} -> ${outputPath}`)
