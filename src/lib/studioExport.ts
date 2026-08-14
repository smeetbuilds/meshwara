import { resolveStudioTimeline, type StudioNode, type StudioProject } from './studioProject'

export interface MeshvaraStudioConfigObject {
  id: string
  name: string
  parentId?: string
  source: { type: 'meshvara'; slug: string } | { type: 'local-glb'; fileId: string }
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  visible: boolean
  locked: boolean
  wireframe: boolean
  customization: StudioNode['customization']
  materials: StudioNode['materialOverrides']
  animation: StudioNode['animation']
  timeline: ReturnType<typeof resolveStudioTimeline>
  debug: StudioNode['debug']
}

export interface MeshvaraStudioConfig {
  version: 1
  project: string
  scene: {
    background: string
    exposure: number
    grid: boolean
    snap: boolean
    translateSnap: number
    rotateSnap: number
    scaleSnap: number
  }
  objects: MeshvaraStudioConfigObject[]
}

export function createStudioConfig(project: StudioProject): MeshvaraStudioConfig {
  return {
    version: 1,
    project: project.name,
    scene: { ...project.scene },
    objects: project.nodes.map((node) => ({
      id: node.id,
      name: node.name,
      parentId: node.parentId,
      source: node.kind === 'archive'
        ? { type: 'meshvara' as const, slug: node.assetSlug ?? '' }
        : { type: 'local-glb' as const, fileId: node.fileId ?? '' },
      position: [...node.transform.position],
      rotation: [...node.transform.rotation],
      scale: [...node.transform.scale],
      visible: node.visible,
      locked: node.locked,
      wireframe: node.wireframe,
      customization: { ...node.customization },
      materials: JSON.parse(JSON.stringify(node.materialOverrides)) as StudioNode['materialOverrides'],
      animation: { ...node.animation },
      timeline: {
        ...resolveStudioTimeline(node.timeline),
        keyframes: resolveStudioTimeline(node.timeline).keyframes.map((keyframe) => ({ ...keyframe, value: [...keyframe.value] as [number, number, number] })),
      },
      debug: { ...node.debug },
    })),
  }
}

const configType = `export type MeshvaraStudioConfig = {\n  version: 1\n  project: string\n  scene: {\n    background: string\n    exposure: number\n    grid: boolean\n    snap: boolean\n    translateSnap: number\n    rotateSnap: number\n    scaleSnap: number\n  }\n  objects: Array<{\n    id: string\n    name: string\n    parentId?: string\n    source: { type: 'meshvara'; slug: string } | { type: 'local-glb'; fileId: string }\n    position: [number, number, number]\n    rotation: [number, number, number]\n    scale: [number, number, number]\n    visible: boolean\n    locked: boolean\n    wireframe: boolean\n    customization: { palette: 'authored' | 'mono' | 'duotone'; primaryColor: string; secondaryColor: string; roughnessScale: number; metalnessScale: number; emissiveScale: number; opacity: number; geometryScale: number; wireframe: boolean }\n    materials: Record<string, { color?: string; emissive?: string; emissiveIntensity?: number; roughness?: number; metalness?: number; opacity?: number; textures?: Partial<Record<'map' | 'normalMap' | 'roughnessMap' | 'metalnessMap' | 'emissiveMap' | 'alphaMap' | 'aoMap', string | null>> }>\n    animation: { clip?: string; playing: boolean; speed: number; loop: boolean }\n    timeline: { duration: number; fps: number; loop: boolean; rangeStart: number; rangeEnd: number; keyframes: Array<{ id: string; time: number; channel: 'position' | 'rotation' | 'scale'; value: [number, number, number]; easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'step' }> }\n    debug: { bounds: boolean; axes: boolean; skeleton: boolean }\n  }>\n}`

export function generateStudioConfigModule(project: StudioProject) {
  const config = JSON.stringify(createStudioConfig(project), null, 2)
  return `${configType}\n\nexport const meshvaraScene = ${config} satisfies MeshvaraStudioConfig\n`
}

export function generateStudioR3FScaffold(project: StudioProject) {
  const config = JSON.stringify(createStudioConfig(project), null, 2)
  return `import type { ReactNode } from 'react'\n\n${configType}\n\nexport const meshvaraScene = ${config} satisfies MeshvaraStudioConfig\n\ntype ObjectConfig = MeshvaraStudioConfig['objects'][number]\n\nexport interface MeshvaraStudioSceneProps {\n  /** Resolve archive slugs and local GLB file IDs with your own production asset pipeline. */\n  renderSource: (object: ObjectConfig) => ReactNode\n}\n\nexport function MeshvaraStudioScene({ renderSource }: MeshvaraStudioSceneProps) {\n  const children = new Map<string | undefined, ObjectConfig[]>()\n  for (const object of meshvaraScene.objects) {\n    const bucket = children.get(object.parentId) ?? []\n    bucket.push(object)\n    children.set(object.parentId, bucket)\n  }\n\n  const renderObject = (object: ObjectConfig): ReactNode => (\n    <group\n      key={object.id}\n      name={object.name}\n      position={object.position}\n      rotation={object.rotation}\n      scale={object.scale}\n      visible={object.visible}\n      userData={{ meshvara: { customization: object.customization, materials: object.materials, animation: object.animation, timeline: object.timeline } }}\n    >\n      {renderSource(object)}\n      {(children.get(object.id) ?? []).map(renderObject)}\n    </group>\n  )\n\n  return <group name={meshvaraScene.project}>{(children.get(undefined) ?? []).map(renderObject)}</group>\n}\n\nexport default MeshvaraStudioScene\n`
}
