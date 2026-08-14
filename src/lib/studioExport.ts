import type { StudioProject } from './studioProject'

export interface MeshvaraStudioConfig {
  version: 1
  project: string
  scene: {
    background: string
    exposure: number
  }
  objects: Array<{
    id: string
    name: string
    source: { type: 'meshvara'; slug: string } | { type: 'local-glb'; fileId: string }
    position: [number, number, number]
    rotation: [number, number, number]
    scale: [number, number, number]
    visible: boolean
    wireframe: boolean
  }>
}

export function createStudioConfig(project: StudioProject): MeshvaraStudioConfig {
  return {
    version: 1,
    project: project.name,
    scene: { background: project.scene.background, exposure: project.scene.exposure },
    objects: project.nodes.map((node) => ({
      id: node.id,
      name: node.name,
      source: node.kind === 'archive'
        ? { type: 'meshvara' as const, slug: node.assetSlug ?? '' }
        : { type: 'local-glb' as const, fileId: node.fileId ?? '' },
      position: [...node.transform.position],
      rotation: [...node.transform.rotation],
      scale: [...node.transform.scale],
      visible: node.visible,
      wireframe: node.wireframe,
    })),
  }
}

export function generateStudioConfigModule(project: StudioProject) {
  const config = JSON.stringify(createStudioConfig(project), null, 2)
  return `export type MeshvaraStudioConfig = {\n  version: 1\n  project: string\n  scene: { background: string; exposure: number }\n  objects: Array<{\n    id: string\n    name: string\n    source: { type: 'meshvara'; slug: string } | { type: 'local-glb'; fileId: string }\n    position: [number, number, number]\n    rotation: [number, number, number]\n    scale: [number, number, number]\n    visible: boolean\n    wireframe: boolean\n  }>\n}\n\nexport const meshvaraScene = ${config} satisfies MeshvaraStudioConfig\n`
}
