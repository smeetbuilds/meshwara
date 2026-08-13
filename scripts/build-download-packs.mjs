import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import { createHash } from 'node:crypto'
import { createZip } from './zip-utils.mjs'

const ROOT = process.cwd()
const source = await readFile(resolve(ROOT, 'src/data/assets.ts'), 'utf8')
const assetBlocks = [...source.matchAll(/\{\s*\n?\s*slug:\s*'[^']+'[\s\S]*?\n\s*\},/g)].map((match) => match[0])

function assetField(block, field, required = true) {
  const match = block.match(new RegExp(`${field}:\\s*'([^']+)'`))
  if (!match && required) throw new Error(`Asset block missing ${field}`)
  return match?.[1]
}

const assets = assetBlocks.map((block) => ({
  slug: assetField(block, 'slug'),
  name: assetField(block, 'name'),
  category: assetField(block, 'category'),
  subcategory: assetField(block, 'subcategory', false),
  scene: assetField(block, 'scene'),
  blurb: assetField(block, 'blurb'),
  description: assetField(block, 'description'),
  interaction: assetField(block, 'interaction'),
  sourceType: assetField(block, 'sourceType'),
  presentation: assetField(block, 'presentation', false) ?? 'Floating',
  download: assetField(block, 'download'),
}))

if (!assets.length) throw new Error('No assets parsed from src/data/assets.ts')
await mkdir(resolve(ROOT, 'public/downloads'), { recursive: true })

const versions = {
  '@react-three/drei': '10.7.7',
  '@react-three/fiber': '9.7.0',
  react: '19.2.8',
  three: '0.185.1',
}

const codeLicense = `MIT License\n\nCopyright (c) 2026 Aahav Labs / MESHVARA\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n`

function componentName(name) {
  return name.replace(/[^a-zA-Z0-9]+/g, ' ').trim().split(/\s+/).map((part) => part[0].toUpperCase() + part.slice(1)).join('')
}

function packageJson(asset) {
  return JSON.stringify({
    name: `@meshvara/${asset.slug}`,
    private: true,
    type: 'module',
    dependencies: versions,
  }, null, 2) + '\n'
}

function tsconfig() {
  return JSON.stringify({ compilerOptions: { jsx: 'react-jsx', moduleResolution: 'Bundler', module: 'ESNext', target: 'ES2022', strict: true, skipLibCheck: true, noEmit: true } }, null, 2) + '\n'
}

function proceduralWrapper(asset, component) {
  const pointer = asset.interaction === 'Pointer'
  const sceneContent = asset.presentation === 'Floating'
    ? `<Rig enabled={!reducedMotion && ${pointer}}>
          <Float speed={reducedMotion ? 0 : 0.78} rotationIntensity={reducedMotion ? 0 : 0.065} floatIntensity={reducedMotion ? 0 : 0.11}>
            <SceneObject />
          </Float>
        </Rig>`
    : asset.presentation === 'Grounded'
      ? (pointer ? `<Rig enabled={!reducedMotion && true}>
          <SceneObject />
        </Rig>` : '<SceneObject />')
      : '<SceneObject />'

  return `import { Bounds, Environment, Float, Lightformer } from '@react-three/drei'\nimport { Canvas, useFrame, useThree } from '@react-three/fiber'\nimport { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'\nimport * as THREE from 'three'\nimport SceneObject from './Scene'\n\nfunction useReducedMotion() {\n  const [reduced, setReduced] = useState(false)\n  useEffect(() => {\n    const media = window.matchMedia('(prefers-reduced-motion: reduce)')\n    const sync = () => setReduced(media.matches)\n    sync()\n    media.addEventListener('change', sync)\n    return () => media.removeEventListener('change', sync)\n  }, [])\n  return reduced\n}\n\nfunction Rig({ children, enabled }: { children: ReactNode; enabled: boolean }) {\n  const ref = useRef<THREE.Group>(null)\n  const { pointer } = useThree()\n  useFrame((_, delta) => {\n    if (!ref.current || !enabled) return\n    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, pointer.x * 0.18, 4.2, delta)\n    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, pointer.y * -0.1, 4.2, delta)\n  })\n  return <group ref={ref}>{children}</group>\n}\n\nfunction Studio() {\n  return (\n    <>\n      <hemisphereLight color="#fffdf8" groundColor="#a8a49b" intensity={1.15} />\n      <directionalLight position={[5.5, 6.5, 4.5]} intensity={2.6} />\n      <directionalLight position={[-4.5, 2.2, -3.5]} intensity={1.3} />\n      <pointLight position={[0, -1.6, 3.6]} intensity={0.55} distance={8} />\n      <Environment resolution={160}>\n        <Lightformer intensity={4.6} position={[0, 5, -2]} scale={[8, 1.6, 1]} />\n        <Lightformer intensity={3.2} position={[-5, 0.5, 2]} rotation-y={Math.PI / 2} scale={[6, 1.5, 1]} />\n        <Lightformer intensity={2.6} position={[5, -0.6, 1]} rotation-y={-Math.PI / 2} scale={[5, 1.1, 1]} />\n      </Environment>\n    </>\n  )\n}\n\nexport function ${component}() {\n  const reducedMotion = useReducedMotion()\n  return (\n    <Canvas\n      dpr={[1, 2]}\n      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}\n      camera={{ position: [0, 0, 4.8], fov: 34, near: 0.05, far: 120 }}\n      frameloop={reducedMotion ? 'demand' : 'always'}\n      onCreated={({ gl }) => {\n        gl.toneMapping = THREE.ACESFilmicToneMapping\n        gl.toneMappingExposure = 1.08\n        gl.outputColorSpace = THREE.SRGBColorSpace\n      }}\n    >\n      <Suspense fallback={null}>\n        <Studio />\n        <Bounds fit clip observe margin={1.16}>\n          ${sceneContent}\n        </Bounds>\n      </Suspense>\n    </Canvas>\n  )\n}\n\nexport default ${component}\n`
}

async function buildProceduralPack(asset) {
  const component = componentName(asset.name)
  const rawScene = await readFile(resolve(ROOT, 'src/components/scenes', `${asset.scene}.tsx`), 'utf8')
  const usesCurvedBox = rawScene.includes("../geometry/CurvedBox")
  const scene = usesCurvedBox ? rawScene.replaceAll("../geometry/CurvedBox", "./geometry/CurvedBox") : rawScene
  const curvedBoxSource = usesCurvedBox ? await readFile(resolve(ROOT, 'src/components/geometry/CurvedBox.tsx'), 'utf8') : null
  const prefix = `${asset.slug}/`
  const interactionCopy = asset.interaction === 'Pointer' ? 'pointer inertia, ' : ''
  const readme = `# MESHVARA / ${asset.name}\n\n> Free production-grade Three.js asset by Aahav Labs.\n> https://aahavlabs.in · hi@aahavlabs.in\n\n**Category:** ${asset.category}${asset.subcategory ? ` / ${asset.subcategory}` : ''}\n\n${asset.blurb}\n\n${asset.description}\n\n## Install\n\n\`\`\`bash\nbun add three@${versions.three} @react-three/fiber@${versions['@react-three/fiber']} @react-three/drei@${versions['@react-three/drei']} react@${versions.react}\n\`\`\`\n\n## Use\n\nCopy \`src/Scene.tsx\` and \`src/${component}.tsx\` into your project, then render \`<${component} />\`. The wrapper includes automatic bounds/framing, ACES filmic tone mapping, responsive DPR, ${interactionCopy}a studio environment, and \`prefers-reduced-motion\` handling.\n\n## License\n\nMIT. Free for personal and commercial projects. Keep the included license notice with substantial redistributed source.\n`
  return createZip([
    { name: `${prefix}README.md`, data: readme },
    { name: `${prefix}package.json`, data: packageJson(asset) },
    { name: `${prefix}tsconfig.json`, data: tsconfig() },
    { name: `${prefix}LICENSE`, data: codeLicense },
    { name: `${prefix}QUALITY.md`, data: `# MESHVARA quality contract\n\n- Live catalog WebGL preview\n- Automatic bounds/framing\n- ACES filmic tone mapping\n- Responsive DPR\n- Reduced-motion support\n- Deterministic source construction\n- SHA-256-manifested download ZIP\n- Scene source bytes: ${Buffer.byteLength(scene)}\n\nThis automated contract complements visual art-direction review.\n` },
    { name: `${prefix}src/Scene.tsx`, data: scene },
    ...(curvedBoxSource ? [{ name: `${prefix}src/geometry/CurvedBox.tsx`, data: curvedBoxSource }] : []),
    { name: `${prefix}src/${component}.tsx`, data: proceduralWrapper(asset, component) },
    { name: `${prefix}src/index.ts`, data: `export { default, ${component} } from './${component}'\n` },
  ])
}

function modelAssetLicense(manifest) {
  const license = manifest.license
  return `# Asset license\n\n- License: ${license.id}\n- Author: ${license.author}\n- Source: ${license.source}\n- Redistribution allowed: ${license.redistribution ? 'Yes' : 'No'}\n- Commercial use allowed: ${license.commercialUse ? 'Yes' : 'No'}\n${license.attribution ? `- Attribution: ${license.attribution}\n` : ''}${license.notes ? `\n${license.notes}\n` : ''}`
}

function modelWrapper(asset, component, manifest) {
  const display = manifest.display ?? {}
  const defaultClip = display.defaultClip ?? manifest.animations?.[0]?.name
  const entries = Object.entries(manifest.tiers).map(([tier, spec]) => `  ${tier}: new URL('../models/${basename(spec.file)}', import.meta.url).href`).join(',\n')
  const clipAliases = Object.fromEntries((manifest.animations ?? []).map((item) => [item.name, item.aliases ?? []]))
  const loopByClip = Object.fromEntries((manifest.animations ?? []).map((item) => [item.name, item.loop !== false]))
  const animationNames = (manifest.animations ?? []).map((item) => item.name)
  const displayProps = [
    Number.isFinite(display.scale) ? `scale={${display.scale}}` : '',
    Array.isArray(display.position) ? `position={${JSON.stringify(display.position)}}` : '',
    Array.isArray(display.rotation) ? `rotation={${JSON.stringify(display.rotation)}}` : '',
    Array.isArray(display.cameraPosition) ? `cameraPosition={${JSON.stringify(display.cameraPosition)}}` : '',
    Array.isArray(display.cameraTarget) ? `cameraTarget={${JSON.stringify(display.cameraTarget)}}` : '',
    display.tiers && typeof display.tiers === 'object' ? `displayByTier={${JSON.stringify(display.tiers)}}` : '',
  ].filter(Boolean).join(' ')
  return `import { ModelStage } from './ModelStage'\n\nconst urls = {\n${entries}\n}\nconst clipAliases = ${JSON.stringify(clipAliases, null, 2)}\nconst loopByClip = ${JSON.stringify(loopByClip, null, 2)}\n\nexport const animations = ${JSON.stringify(animationNames)} as const\nexport type ${component}Animation = typeof animations[number]\n\nexport interface ${component}Props {\n  clip?: ${component}Animation\n  compact?: boolean\n  animationFadeSeconds?: number\n  oneShotFallbackClip?: ${component}Animation\n}\n\nexport function ${component}({ clip = ${JSON.stringify(defaultClip)}, compact = false, animationFadeSeconds = 0.24, oneShotFallbackClip = ${JSON.stringify(defaultClip)} }: ${component}Props) {\n  return (\n    <ModelStage\n      urls={urls}\n      clip={clip}\n      compact={compact}\n      animationFadeSeconds={animationFadeSeconds}\n      clipAliases={clipAliases}\n      loopByClip={loopByClip}\n      oneShotFallbackClip={oneShotFallbackClip}\n      ${displayProps}\n    />\n  )\n}\n\nexport default ${component}\n`
}

async function buildModelPack(asset) {
  const base = resolve(ROOT, 'public/models', asset.slug)
  const manifestPath = resolve(base, 'manifest.json')
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
  if (manifest.slug !== asset.slug) throw new Error(`${asset.slug}: model manifest slug mismatch`)
  if (manifest.publish !== true) throw new Error(`${asset.slug}: model manifest is not approved for publication`)
  if (manifest.license?.redistribution !== true || manifest.license?.commercialUse !== true) throw new Error(`${asset.slug}: model license is not library-compatible`)

  const component = componentName(asset.name)
  const prefix = `${asset.slug}/`
  const modelRuntime = (await readFile(resolve(ROOT, 'src/components/model/ModelAsset.tsx'), 'utf8')).replace("../../lib/useReducedMotion", "./useReducedMotion")
  const modelStage = (await readFile(resolve(ROOT, 'src/components/model/ModelStage.tsx'), 'utf8')).replace("../../lib/useReducedMotion", "./useReducedMotion")
  const reducedMotion = await readFile(resolve(ROOT, 'src/lib/useReducedMotion.ts'), 'utf8')
  const uniqueFiles = [...new Set(Object.values(manifest.tiers).map((spec) => spec.file))]
  const modelEntries = []
  for (const file of uniqueFiles) modelEntries.push({ name: `${prefix}models/${basename(file)}`, data: await readFile(resolve(base, file)) })

  const qaPaths = new Set([
    ...Object.values(manifest.qaEvidence ?? {}),
    ...(manifest.animations ?? []).flatMap((item) => [item.qaEvidence, item.metricsFile]),
    ...(manifest.character?.transitions ?? []).flatMap((item) => [item.qaEvidence, item.metricsFile]),
    ...(manifest.character?.deformationQa ?? []).flatMap((item) => [item.qaEvidence, item.metricsFile]),
    manifest.character?.facial?.qaEvidence,
    manifest.character?.facial?.metricsFile,
    manifest.character?.handQa?.qaEvidence,
    manifest.character?.handQa?.metricsFile,
    manifest.character?.lodConsistency?.qaEvidence,
    manifest.character?.lodConsistency?.metricsFile,
  ].filter((value) => typeof value === 'string' && value.trim()))
  const qaEntries = []
  for (const relative of [...qaPaths].sort()) {
    const absolute = resolve(base, relative)
    if (!(absolute === base || absolute.startsWith(`${base}/`) || absolute.startsWith(`${base}\\`))) throw new Error(`${asset.slug}: QA evidence escapes model directory: ${relative}`)
    qaEntries.push({ name: `${prefix}${relative.replaceAll('\\', '/')}`, data: await readFile(absolute) })
  }

  const attribution = manifest.license.attribution ? `\nAttribution required by the asset license:\n\n${manifest.license.attribution}\n` : ''
  const readme = `# MESHVARA / ${asset.name}\n\n> Free production-grade Three.js asset by Aahav Labs.\n> https://aahavlabs.in · hi@aahavlabs.in\n\n**Category:** ${asset.category}${asset.subcategory ? ` / ${asset.subcategory}` : ''}\n\n${asset.blurb}\n\n${asset.description}\n\n## Install\n\n\`\`\`bash\nbun add three@${versions.three} @react-three/fiber@${versions['@react-three/fiber']} @react-three/drei@${versions['@react-three/drei']} react@${versions.react}\n\`\`\`\n\n## Use\n\nRender \`<${component} />\`. The included runtime selects desktop/tablet/mobile model tiers, preserves grounded presentation, crossfades skeletal animation clips, and honors \`prefers-reduced-motion\`.\n\n## Licenses\n\nRuntime/source code is MIT licensed. The model itself is distributed under ${manifest.license.id}. Read \`LICENSE-ASSET.md\` before redistribution. The \`qa/\` folder contains the publication evidence and machine-readable motion metrics referenced by the manifest.${attribution}\n`

  return createZip([
    { name: `${prefix}README.md`, data: readme },
    { name: `${prefix}package.json`, data: packageJson(asset) },
    { name: `${prefix}tsconfig.json`, data: tsconfig() },
    { name: `${prefix}LICENSE-CODE.txt`, data: codeLicense },
    { name: `${prefix}LICENSE-ASSET.md`, data: modelAssetLicense(manifest) },
    { name: `${prefix}manifest.json`, data: JSON.stringify(manifest, null, 2) + '\n' },
    { name: `${prefix}QUALITY.md`, data: `# MESHVARA modeled-asset quality contract\n\n- Publication-approved manifest\n- Desktop/tablet/mobile tiers\n- SHA-256 model integrity\n- License provenance\n- QA evidence packaged with the asset\n- Responsive model runtime\n- Reduced-motion support\n\nSee manifest.json and qa/ for the complete evidence contract.\n` },
    { name: `${prefix}src/ModelAsset.tsx`, data: modelRuntime },
    { name: `${prefix}src/ModelStage.tsx`, data: modelStage },
    { name: `${prefix}src/useReducedMotion.ts`, data: reducedMotion },
    { name: `${prefix}src/${component}.tsx`, data: modelWrapper(asset, component, manifest) },
    { name: `${prefix}src/index.ts`, data: `export { default, ${component}, animations } from './${component}'\nexport type { ${component}Props, ${component}Animation } from './${component}'\n` },
    ...modelEntries,
    ...qaEntries,
  ])
}

const downloadManifest = []
for (const asset of assets) {
  const archive = asset.sourceType === 'Model' ? await buildModelPack(asset) : await buildProceduralPack(asset)
  const target = resolve(ROOT, 'public', asset.download.replace(/^\//, ''))
  await writeFile(target, archive)
  downloadManifest.push({
    slug: asset.slug,
    name: asset.name,
    category: asset.category,
    subcategory: asset.subcategory ?? null,
    file: asset.download,
    bytes: archive.length,
    sha256: createHash('sha256').update(archive).digest('hex'),
  })
}
await writeFile(
  resolve(ROOT, 'public/downloads/manifest.json'),
  JSON.stringify({ brand: 'MESHVARA', count: downloadManifest.length, assets: downloadManifest }, null, 2) + '\n',
)

console.log(`Built ${assets.length} deterministic download packs (${assets.filter((asset) => asset.sourceType === 'Model').length} modeled).`)
