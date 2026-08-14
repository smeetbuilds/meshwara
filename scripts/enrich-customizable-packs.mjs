import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { readZipEntries, stripSingleRoot } from './distribution/core.mjs'
import { createZip } from './zip-utils.mjs'

const ROOT = process.cwd()

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex')
}

export function componentName(name) {
  return name.replace(/[^a-zA-Z0-9]+/g, ' ').trim().split(/\s+/).filter(Boolean).map((part) => part[0].toUpperCase() + part.slice(1)).join('')
}

function packCustomizationSource(definition) {
  const defaults = JSON.stringify(definition.defaults, null, 2)
  const presets = JSON.stringify(definition.presets, null, 2)
  return `export type AssetPaletteMode = 'authored' | 'mono' | 'duotone'\n\nexport interface AssetCustomization {\n  palette: AssetPaletteMode\n  primaryColor: string\n  secondaryColor: string\n  roughnessScale: number\n  metalnessScale: number\n  emissiveScale: number\n  opacity: number\n  geometryScale: number\n  wireframe: boolean\n}\n\nexport interface AssetCustomizationPreset {\n  id: string\n  label: string\n  value: AssetCustomization\n}\n\nexport const defaultCustomization: AssetCustomization = ${defaults}\n\nexport const customizationPresets: AssetCustomizationPreset[] = ${presets}\n\nconst HEX = /^#[0-9a-f]{6}$/i\n\nfunction finite(value: unknown, fallback: number, min: number, max: number) {\n  return typeof value === 'number' && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback\n}\n\nfunction color(value: unknown, fallback: string) {\n  return typeof value === 'string' && HEX.test(value) ? value.toLowerCase() : fallback\n}\n\nexport function resolveCustomization(value: Partial<AssetCustomization> = {}): AssetCustomization {\n  const palette = value.palette === 'authored' || value.palette === 'mono' || value.palette === 'duotone' ? value.palette : defaultCustomization.palette\n  return {\n    palette,\n    primaryColor: color(value.primaryColor, defaultCustomization.primaryColor),\n    secondaryColor: color(value.secondaryColor, defaultCustomization.secondaryColor),\n    roughnessScale: finite(value.roughnessScale, defaultCustomization.roughnessScale, 0, 2),\n    metalnessScale: finite(value.metalnessScale, defaultCustomization.metalnessScale, 0, 2),\n    emissiveScale: finite(value.emissiveScale, defaultCustomization.emissiveScale, 0, 3),\n    opacity: finite(value.opacity, defaultCustomization.opacity, 0.25, 1),\n    geometryScale: finite(value.geometryScale, defaultCustomization.geometryScale, 0.5, 1.5),\n    wireframe: typeof value.wireframe === 'boolean' ? value.wireframe : defaultCustomization.wireframe,\n  }\n}\n`
}

function packCustomizationLayerSource() {
  return `import { useLayoutEffect, useRef, type ReactNode } from 'react'\nimport * as THREE from 'three'\nimport type { AssetCustomization } from './customization'\n\ntype CustomizableMaterial = THREE.Material & { color?: THREE.Color; roughness?: number; metalness?: number; emissive?: THREE.Color; emissiveIntensity?: number; opacity: number; transparent: boolean; depthWrite: boolean; wireframe?: boolean; needsUpdate: boolean }\ntype MaterialBaseline = { color?: THREE.Color; roughness?: number; metalness?: number; emissive?: THREE.Color; emissiveIntensity?: number; opacity: number; transparent: boolean; depthWrite: boolean; wireframe?: boolean }\ntype MaterialBinding = { mesh: THREE.Mesh; original: THREE.Material | THREE.Material[]; clones: CustomizableMaterial[]; families: number[] }\n\nfunction baseline(material: CustomizableMaterial): MaterialBaseline {\n  return { color: material.color?.clone(), roughness: material.roughness, metalness: material.metalness, emissive: material.emissive?.clone(), emissiveIntensity: material.emissiveIntensity, opacity: material.opacity, transparent: material.transparent, depthWrite: material.depthWrite, wireframe: material.wireframe }\n}\n\nfunction applyMaterial(material: CustomizableMaterial, authored: MaterialBaseline, family: number, customization: AssetCustomization) {\n  if (authored.color && material.color) material.color.copy(authored.color)\n  if (typeof authored.roughness === 'number' && typeof material.roughness === 'number') material.roughness = THREE.MathUtils.clamp(authored.roughness * customization.roughnessScale, 0, 1)\n  if (typeof authored.metalness === 'number' && typeof material.metalness === 'number') material.metalness = THREE.MathUtils.clamp(authored.metalness * customization.metalnessScale, 0, 1)\n  if (authored.emissive && material.emissive) material.emissive.copy(authored.emissive)\n  if (typeof authored.emissiveIntensity === 'number' && typeof material.emissiveIntensity === 'number') material.emissiveIntensity = Math.max(0, authored.emissiveIntensity * customization.emissiveScale)\n  material.opacity = THREE.MathUtils.clamp(authored.opacity * customization.opacity, 0, 1)\n  material.transparent = authored.transparent || material.opacity < 0.999\n  material.depthWrite = authored.depthWrite && material.opacity >= 0.999\n  if (typeof material.wireframe === 'boolean') material.wireframe = customization.wireframe || authored.wireframe === true\n  if (material.color && customization.palette !== 'authored') material.color.set(customization.palette === 'mono' || family % 2 === 0 ? customization.primaryColor : customization.secondaryColor)\n  material.needsUpdate = true\n}\n\nexport function CustomizationLayer({ customization, children }: { customization: AssetCustomization; children: ReactNode }) {\n  const group = useRef<THREE.Group>(null)\n  const bindings = useRef<MaterialBinding[]>([])\n  const baselines = useRef(new WeakMap<THREE.Material, MaterialBaseline>())\n\n  useLayoutEffect(() => {\n    if (!group.current) return\n    const familyByMaterial = new Map<string, number>()\n    const mounted: MaterialBinding[] = []\n    group.current.traverse((object) => {\n      if (!(object instanceof THREE.Mesh) || !object.material) return\n      const originals = Array.isArray(object.material) ? object.material : [object.material]\n      const clones = originals.map((source) => { const clone = source.clone() as CustomizableMaterial; baselines.current.set(clone, baseline(clone)); return clone })\n      const families = originals.map((source) => { const existing = familyByMaterial.get(source.uuid); if (typeof existing === 'number') return existing; const next = familyByMaterial.size; familyByMaterial.set(source.uuid, next); return next })\n      mounted.push({ mesh: object, original: object.material, clones, families })\n      object.material = Array.isArray(object.material) ? clones : clones[0]\n    })\n    bindings.current = mounted\n    return () => {\n      for (const binding of mounted) { binding.mesh.material = binding.original; for (const material of binding.clones) material.dispose() }\n      bindings.current = []\n      baselines.current = new WeakMap()\n    }\n  }, [])\n\n  useLayoutEffect(() => {\n    for (const binding of bindings.current) binding.clones.forEach((material, index) => { const authored = baselines.current.get(material); if (authored) applyMaterial(material, authored, binding.families[index] ?? 0, customization) })\n  }, [customization])\n\n  return <group ref={group} scale={customization.geometryScale}>{children}</group>\n}\n`
}

function packCustomizableSceneSource() {
  return `import Scene from './Scene'\nimport { CustomizationLayer } from './CustomizationLayer'\nimport { resolveCustomization, type AssetCustomization } from './customization'\n\nexport interface CustomizableSceneProps {\n  customization?: Partial<AssetCustomization>\n}\n\nexport function CustomizableScene({ customization = {} }: CustomizableSceneProps) {\n  const resolved = resolveCustomization(customization)\n  return <CustomizationLayer customization={resolved}><Scene /></CustomizationLayer>\n}\n\nexport default CustomizableScene\n`
}

function patchWrapper(source, component) {
  if (source.includes("from './CustomizableScene'")) return source
  const importNeedle = "import SceneObject from './Scene'"
  const functionNeedle = `export function ${component}() {`
  if (!source.includes(importNeedle)) throw new Error(`${component}: pack wrapper does not import ./Scene as expected.`)
  if (!source.includes(functionNeedle)) throw new Error(`${component}: pack wrapper signature is not recognized.`)
  let output = source.replace(importNeedle, "import SceneObject from './CustomizableScene'\nimport type { AssetCustomization } from './customization'")
  output = output.replace(functionNeedle, `export interface ${component}Props {\n  customization?: Partial<AssetCustomization>\n}\n\nexport function ${component}({ customization = {} }: ${component}Props) {`)
  const occurrences = (output.match(/<SceneObject \/>/g) ?? []).length
  if (!occurrences) throw new Error(`${component}: pack wrapper has no SceneObject mount to customize.`)
  output = output.replaceAll('<SceneObject />', '<SceneObject customization={customization} />')
  return output
}

function patchIndex(source, component) {
  if (!source.includes(`from './${component}'`)) throw new Error(`${component}: src/index.ts does not export the generated wrapper.`)
  if (source.includes(`${component}Customization`)) return source
  return `${source.trimEnd()}\nexport type { ${component}Props } from './${component}'\nexport { defaultCustomization, customizationPresets, resolveCustomization } from './customization'\nexport type { AssetCustomization as ${component}Customization, AssetCustomizationPreset as ${component}CustomizationPreset } from './customization'\n`
}

function patchReadme(source, component) {
  if (source.includes('## Typed customization')) return source
  return `${source.trimEnd()}\n\n## Typed customization\n\nThis curated asset exposes the same material/form contract used by the Meshvara website Playground and Studio. Authored source remains the default.\n\n\`\`\`tsx\nimport { ${component} } from './src'\n\n<${component}\n  customization={{\n    palette: 'duotone',\n    primaryColor: '#dce4ea',\n    secondaryColor: '#365f8d',\n    roughnessScale: 0.8,\n    geometryScale: 1,\n  }}\n/>\n\`\`\`\n\nUse \`customizationPresets\` for the curated presets or pass a typed partial customization object. Values are clamped to the same bounds as Meshvara's browser controls.\n`
}

export function enrichCustomizableArchive(archive, asset, definition) {
  if (!definition || definition.assetSlug !== asset.slug || definition.scene !== asset.scene) throw new Error(`${asset.slug}: customization registry identity mismatch.`)
  if (asset.sourceType === 'Model') throw new Error(`${asset.slug}: model packs use the model-editor contract, not procedural customization enrichment.`)
  const component = componentName(asset.name)
  const files = new Map(stripSingleRoot(readZipEntries(archive), asset.slug).map((entry) => [entry.relative, Buffer.from(entry.bytes)]))
  const wrapperPath = `src/${component}.tsx`
  const wrapper = files.get(wrapperPath)
  const index = files.get('src/index.ts')
  const readme = files.get('README.md')
  if (!wrapper || !index || !readme || !files.has('src/Scene.tsx')) throw new Error(`${asset.slug}: generated procedural pack is missing source files required for customization enrichment.`)

  files.delete('meshvara.json')
  files.set(wrapperPath, Buffer.from(patchWrapper(wrapper.toString('utf8'), component)))
  files.set('src/index.ts', Buffer.from(patchIndex(index.toString('utf8'), component)))
  files.set('README.md', Buffer.from(patchReadme(readme.toString('utf8'), component)))
  files.set('src/customization.ts', Buffer.from(packCustomizationSource(definition)))
  files.set('src/CustomizationLayer.tsx', Buffer.from(packCustomizationLayerSource()))
  files.set('src/CustomizableScene.tsx', Buffer.from(packCustomizableSceneSource()))
  files.set('CUSTOMIZATION.json', Buffer.from(`${JSON.stringify({ schemaVersion: 1, scene: asset.scene, assetSlug: asset.slug, defaults: definition.defaults, presets: definition.presets }, null, 2)}\n`))

  return createZip([...files.entries()].map(([relative, data]) => ({ name: `${asset.slug}/${relative}`, data })).sort((a, b) => a.name.localeCompare(b.name)))
}

function parseAssets(source) {
  const blocks = [...source.matchAll(/\{\s*\n?\s*slug:\s*'[^']+'[\s\S]*?\n\s*\},/g)].map((match) => match[0])
  const field = (block, key, required = true) => {
    const match = block.match(new RegExp(`${key}:\\s*'([^']+)'`))
    if (!match && required) throw new Error(`Asset block missing ${key}`)
    return match?.[1]
  }
  return blocks.map((block) => ({ slug: field(block, 'slug'), name: field(block, 'name'), scene: field(block, 'scene'), sourceType: field(block, 'sourceType') }))
}

export async function enrichCustomizablePacks({ root = ROOT } = {}) {
  const registry = JSON.parse(await readFile(resolve(root, 'src/data/customization-registry.json'), 'utf8'))
  if (registry.schemaVersion !== 1 || !registry.scenes || typeof registry.scenes !== 'object') throw new Error('Customization registry schema is invalid.')
  const assets = parseAssets(await readFile(resolve(root, 'src/data/assets.ts'), 'utf8'))
  const assetsBySlug = new Map(assets.map((asset) => [asset.slug, asset]))
  const definitions = Object.entries(registry.scenes).map(([scene, definition]) => ({ scene, ...definition }))
  const manifestPath = resolve(root, 'public/downloads/manifest.json')
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
  const manifestBySlug = new Map(manifest.assets.map((asset) => [asset.slug, asset]))
  const replacements = []

  for (const definition of definitions) {
    const asset = assetsBySlug.get(definition.assetSlug)
    if (!asset) throw new Error(`${definition.assetSlug}: customization registry asset is missing from src/data/assets.ts.`)
    if (asset.scene !== definition.scene) throw new Error(`${asset.slug}: customization registry scene mismatch (${definition.scene} != ${asset.scene}).`)
    if (asset.sourceType === 'Model') throw new Error(`${asset.slug}: curated customization registry may not target a model asset.`)
    const manifestAsset = manifestBySlug.get(asset.slug)
    if (!manifestAsset) throw new Error(`${asset.slug}: customization asset is missing from the download manifest.`)
    const archivePath = resolve(root, 'public/downloads', basename(manifestAsset.file))
    const archive = await readFile(archivePath)
    const enriched = enrichCustomizableArchive(archive, asset, definition)
    replacements.push({ asset, manifestAsset, archivePath, enriched })
  }

  for (const item of replacements) await writeFile(item.archivePath, item.enriched)
  const changedBySlug = new Map(replacements.map((item) => [item.asset.slug, { bytes: item.enriched.byteLength, sha256: sha256(item.enriched) }]))
  const output = {
    ...manifest,
    assets: manifest.assets.map((asset) => changedBySlug.has(asset.slug) ? { ...asset, ...changedBySlug.get(asset.slug) } : asset),
  }
  await writeFile(manifestPath, `${JSON.stringify(output, null, 2)}\n`)
  return replacements.map((item) => item.asset.slug)
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const slugs = await enrichCustomizablePacks()
  console.log(`Typed customization enriched: ${slugs.length} curated packs (${slugs.join(', ')}).`)
}
