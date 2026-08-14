import type { StudioNode } from './studioProject'
import type { StudioModelInspection } from './studioModelTools'
import type { StudioGlbExportProfile, StudioGlbExportResult } from './studioModelExport'
import { createBrowserZip } from './browserZip'

const versions = {
  '@react-three/drei': '10.7.7',
  '@react-three/fiber': '9.7.0',
  react: '19.2.8',
  three: '0.185.1',
}

function safeSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'meshvara-model'
}

function componentName(value: string) {
  const result = value.replace(/[^a-zA-Z0-9]+/g, ' ').trim().split(/\s+/).filter(Boolean).map((part) => part[0].toUpperCase() + part.slice(1)).join('')
  return /^[A-Za-z]/.test(result) ? result : `Meshvara${result || 'Model'}`
}

function componentSource(component: string, modelFile: string, inspection: StudioModelInspection) {
  const names = inspection.animations.map((clip) => clip.name)
  return `import { useAnimations, useGLTF } from '@react-three/drei'\nimport type { ThreeElements } from '@react-three/fiber'\nimport { clone } from 'three/addons/utils/SkeletonUtils.js'\nimport { useEffect, useMemo, useRef } from 'react'\nimport * as THREE from 'three'\n\nconst modelUrl = new URL('./models/${modelFile}', import.meta.url).href\nexport const animations = ${JSON.stringify(names)} as const\nexport type ${component}Animation = typeof animations[number]\n\nexport interface ${component}Props extends Omit<ThreeElements['group'], 'children'> {\n  clip?: ${component}Animation\n  playing?: boolean\n  speed?: number\n  loop?: boolean\n}\n\nexport function ${component}({ clip, playing = true, speed = 1, loop = true, ...groupProps }: ${component}Props) {\n  const gltf = useGLTF(modelUrl)\n  const scene = useMemo(() => clone(gltf.scene), [gltf.scene])\n  const root = useRef<THREE.Group>(null)\n  const { actions, mixer } = useAnimations(gltf.animations, root)\n\n  useEffect(() => {\n    mixer.stopAllAction()\n    if (!clip) return\n    const action = actions[clip]\n    if (!action) return\n    action.enabled = true\n    action.reset()\n    action.clampWhenFinished = !loop\n    action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1)\n    action.setEffectiveTimeScale(speed)\n    action.play()\n    action.paused = !playing\n    return () => { action.stop() }\n  }, [actions, clip, loop, mixer, playing, speed])\n\n  return <group ref={root} {...groupProps}><primitive object={scene} /></group>\n}\n\nuseGLTF.preload(modelUrl)\nexport default ${component}\n`
}

const license = `MIT License\n\nCopyright (c) 2026 Aahav Labs / MESHVARA\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n`

export function createStudioComponentPack(
  node: StudioNode,
  inspection: StudioModelInspection,
  exported: StudioGlbExportResult,
  profile: StudioGlbExportProfile,
) {
  if (node.kind !== 'imported') throw new Error('Component packs are available for imported GLB models only.')
  const slug = safeSlug(node.name)
  const component = componentName(node.name)
  const modelFile = `${slug}.glb`
  const root = `${slug}/`
  const packageJson = JSON.stringify({ name: `@meshvara/${slug}`, private: true, type: 'module', dependencies: versions }, null, 2) + '\n'
  const preset = JSON.stringify({
    meshvaraStudio: 1,
    sourceName: node.name,
    profile,
    materialOverrides: node.materialOverrides,
    animation: node.animation,
    metrics: {
      meshes: inspection.meshes,
      vertices: inspection.vertices,
      triangles: inspection.triangles,
      materials: inspection.materials,
      textures: inspection.textures,
      sourceBytes: exported.sourceBytes,
      outputBytes: exported.outputBytes,
    },
  }, null, 2) + '\n'
  const readme = `# ${node.name}\n\nFree Meshvara Studio R3F component pack. No account, token, watermark or runtime Meshvara dependency.\n\n## Install\n\n\`\`\`bash\nbun add three@${versions.three} @react-three/fiber@${versions['@react-three/fiber']} @react-three/drei@${versions['@react-three/drei']} react@${versions.react}\n\`\`\`\n\n## Use\n\n\`\`\`tsx\nimport { ${component}, animations } from './src'\n\nexport function Scene() {\n  return <${component}${inspection.animations.length ? ` clip={animations[0]}` : ''} />\n}\n\`\`\`\n\nThe GLB in this pack already contains the Studio PBR/texture edits from export profile **${profile}**. The component exposes typed group props and discovered animation clips.\n\nThis pack does not claim Draco, Meshopt or KTX2 compression. Web profiles use Three.js GLTFExporter texture dimension caps only.\n`
  const quality = `# Quality contract\n\n- Imported-model source validated as glTF 2.x GLB\n- Skeleton-safe runtime cloning\n- Typed React Three Fiber component\n- Discovered animations: ${inspection.animations.length}\n- Meshes: ${inspection.meshes}\n- Triangles: ${inspection.triangles}\n- Materials: ${inspection.materials}\n- Textures: ${inspection.textures}\n- Export profile: ${profile}\n- Source bytes: ${exported.sourceBytes}\n- Packed GLB bytes: ${exported.outputBytes}\n- No remote processing\n`
  const files = [
    { name: `${root}README.md`, data: readme },
    { name: `${root}LICENSE`, data: license },
    { name: `${root}QUALITY.md`, data: quality },
    { name: `${root}package.json`, data: packageJson },
    { name: `${root}meshvara-preset.json`, data: preset },
    { name: `${root}src/${component}.tsx`, data: componentSource(component, modelFile, inspection) },
    { name: `${root}src/index.ts`, data: `export { default, ${component}, animations } from './${component}'\nexport type { ${component}Props, ${component}Animation } from './${component}'\n` },
    { name: `${root}src/models/${modelFile}`, data: exported.bytes },
  ]
  return { filename: `${slug}-meshvara-r3f.zip`, bytes: createBrowserZip(files), component, slug }
}
