export const STUDIO_PROJECT_FORMAT = 'meshvara-project' as const
export const STUDIO_PROJECT_VERSION = 1 as const
export const STUDIO_HISTORY_LIMIT = 50

export type StudioTransformMode = 'translate' | 'rotate' | 'scale'
export type StudioNodeKind = 'archive' | 'imported'
export type StudioVec3 = [number, number, number]

export interface StudioTransform {
  position: StudioVec3
  rotation: StudioVec3
  scale: StudioVec3
}

export interface StudioNode {
  id: string
  name: string
  kind: StudioNodeKind
  assetSlug?: string
  fileId?: string
  transform: StudioTransform
  visible: boolean
  locked: boolean
  wireframe: boolean
}

export interface StudioSceneSettings {
  background: string
  exposure: number
  grid: boolean
  snap: boolean
  translateSnap: number
  rotateSnap: number
  scaleSnap: number
}

export interface StudioProject {
  format: typeof STUDIO_PROJECT_FORMAT
  version: typeof STUDIO_PROJECT_VERSION
  id: string
  name: string
  createdAt: string
  updatedAt: string
  nodes: StudioNode[]
  scene: StudioSceneSettings
}

export interface StudioHistory {
  past: StudioProject[]
  present: StudioProject
  future: StudioProject[]
}

function uid(prefix: string) {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function now() {
  return new Date().toISOString()
}

export function cloneStudioProject(project: StudioProject): StudioProject {
  return JSON.parse(JSON.stringify(project)) as StudioProject
}

export function defaultStudioTransform(): StudioTransform {
  return {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  }
}

export function createStudioProject(name = 'Untitled Scene'): StudioProject {
  const timestamp = now()
  return {
    format: STUDIO_PROJECT_FORMAT,
    version: STUDIO_PROJECT_VERSION,
    id: uid('project'),
    name,
    createdAt: timestamp,
    updatedAt: timestamp,
    nodes: [],
    scene: {
      background: '#101112',
      exposure: 1,
      grid: true,
      snap: false,
      translateSnap: 0.25,
      rotateSnap: 15,
      scaleSnap: 0.1,
    },
  }
}

export function createArchiveStudioNode(asset: { slug: string; name: string }): StudioNode {
  return {
    id: uid('node'),
    name: asset.name,
    kind: 'archive',
    assetSlug: asset.slug,
    transform: defaultStudioTransform(),
    visible: true,
    locked: false,
    wireframe: false,
  }
}

export function createImportedStudioNode(file: { id: string; name: string }): StudioNode {
  return {
    id: uid('node'),
    name: file.name.replace(/\.glb$/i, '') || 'Imported model',
    kind: 'imported',
    fileId: file.id,
    transform: defaultStudioTransform(),
    visible: true,
    locked: false,
    wireframe: false,
  }
}

function touch(project: StudioProject): StudioProject {
  return { ...project, updatedAt: now() }
}

export function appendStudioNode(project: StudioProject, node: StudioNode): StudioProject {
  return touch({ ...project, nodes: [...project.nodes, node] })
}

export function updateStudioNode(
  project: StudioProject,
  nodeId: string,
  patch: Partial<Omit<StudioNode, 'id' | 'kind' | 'assetSlug' | 'fileId'>>,
): StudioProject {
  return touch({
    ...project,
    nodes: project.nodes.map((node) => node.id === nodeId ? { ...node, ...patch } : node),
  })
}

export function updateStudioTransform(
  project: StudioProject,
  nodeId: string,
  transform: Partial<StudioTransform>,
): StudioProject {
  return touch({
    ...project,
    nodes: project.nodes.map((node) => node.id === nodeId
      ? { ...node, transform: { ...node.transform, ...transform } }
      : node),
  })
}

export function removeStudioNode(project: StudioProject, nodeId: string): StudioProject {
  return touch({ ...project, nodes: project.nodes.filter((node) => node.id !== nodeId) })
}

export function duplicateStudioNode(project: StudioProject, nodeId: string): { project: StudioProject; nodeId?: string } {
  const source = project.nodes.find((node) => node.id === nodeId)
  if (!source) return { project }
  const duplicate: StudioNode = {
    ...cloneNode(source),
    id: uid('node'),
    name: `${source.name} Copy`,
    transform: {
      ...source.transform,
      position: [source.transform.position[0] + 0.35, source.transform.position[1], source.transform.position[2] + 0.35],
    },
  }
  return { project: appendStudioNode(project, duplicate), nodeId: duplicate.id }
}

function cloneNode(node: StudioNode): StudioNode {
  return JSON.parse(JSON.stringify(node)) as StudioNode
}

export function updateStudioScene(project: StudioProject, patch: Partial<StudioSceneSettings>): StudioProject {
  return touch({ ...project, scene: { ...project.scene, ...patch } })
}

export function renameStudioProject(project: StudioProject, name: string): StudioProject {
  const clean = name.trim().slice(0, 80) || 'Untitled Scene'
  return touch({ ...project, name: clean })
}

export function createStudioHistory(project: StudioProject): StudioHistory {
  return { past: [], present: cloneStudioProject(project), future: [] }
}

export function commitStudioHistory(history: StudioHistory, project: StudioProject): StudioHistory {
  if (JSON.stringify(history.present) === JSON.stringify(project)) return history
  return {
    past: [...history.past, cloneStudioProject(history.present)].slice(-STUDIO_HISTORY_LIMIT),
    present: cloneStudioProject(project),
    future: [],
  }
}

export function undoStudioHistory(history: StudioHistory): StudioHistory {
  const previous = history.past.at(-1)
  if (!previous) return history
  return {
    past: history.past.slice(0, -1),
    present: cloneStudioProject(previous),
    future: [cloneStudioProject(history.present), ...history.future].slice(0, STUDIO_HISTORY_LIMIT),
  }
}

export function redoStudioHistory(history: StudioHistory): StudioHistory {
  const next = history.future[0]
  if (!next) return history
  return {
    past: [...history.past, cloneStudioProject(history.present)].slice(-STUDIO_HISTORY_LIMIT),
    present: cloneStudioProject(next),
    future: history.future.slice(1),
  }
}

function finiteNumber(value: unknown, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function sanitizeVec3(value: unknown, fallback: StudioVec3, min: number, max: number): StudioVec3 {
  if (!Array.isArray(value) || value.length !== 3) return [...fallback]
  return [
    clamp(finiteNumber(value[0], fallback[0]), min, max),
    clamp(finiteNumber(value[1], fallback[1]), min, max),
    clamp(finiteNumber(value[2], fallback[2]), min, max),
  ]
}

function isHexColor(value: unknown): value is string {
  return typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value)
}

export function parseStudioProject(value: unknown): StudioProject | null {
  if (!value || typeof value !== 'object') return null
  const input = value as Record<string, unknown>
  if (input.format !== STUDIO_PROJECT_FORMAT || input.version !== STUDIO_PROJECT_VERSION) return null
  if (typeof input.id !== 'string' || typeof input.name !== 'string') return null
  if (!Array.isArray(input.nodes) || !input.scene || typeof input.scene !== 'object') return null

  const nodes: StudioNode[] = []
  const ids = new Set<string>()
  for (const raw of input.nodes.slice(0, 250)) {
    if (!raw || typeof raw !== 'object') return null
    const node = raw as Record<string, unknown>
    if (typeof node.id !== 'string' || !node.id || ids.has(node.id)) return null
    if (node.kind !== 'archive' && node.kind !== 'imported') return null
    if (node.kind === 'archive' && typeof node.assetSlug !== 'string') return null
    if (node.kind === 'imported' && typeof node.fileId !== 'string') return null
    ids.add(node.id)
    const transform = node.transform && typeof node.transform === 'object'
      ? node.transform as Record<string, unknown>
      : {}
    nodes.push({
      id: node.id,
      name: typeof node.name === 'string' ? node.name.slice(0, 100) : 'Object',
      kind: node.kind,
      assetSlug: node.kind === 'archive' ? String(node.assetSlug) : undefined,
      fileId: node.kind === 'imported' ? String(node.fileId) : undefined,
      visible: node.visible !== false,
      locked: node.locked === true,
      wireframe: node.wireframe === true,
      transform: {
        position: sanitizeVec3(transform.position, [0, 0, 0], -10000, 10000),
        rotation: sanitizeVec3(transform.rotation, [0, 0, 0], -Math.PI * 20, Math.PI * 20),
        scale: sanitizeVec3(transform.scale, [1, 1, 1], 0.001, 1000),
      },
    })
  }

  const scene = input.scene as Record<string, unknown>
  return {
    format: STUDIO_PROJECT_FORMAT,
    version: STUDIO_PROJECT_VERSION,
    id: input.id,
    name: input.name.trim().slice(0, 80) || 'Untitled Scene',
    createdAt: typeof input.createdAt === 'string' ? input.createdAt : now(),
    updatedAt: typeof input.updatedAt === 'string' ? input.updatedAt : now(),
    nodes,
    scene: {
      background: isHexColor(scene.background) ? scene.background : '#101112',
      exposure: clamp(finiteNumber(scene.exposure, 1), 0.1, 3),
      grid: scene.grid !== false,
      snap: scene.snap === true,
      translateSnap: clamp(finiteNumber(scene.translateSnap, 0.25), 0.01, 10),
      rotateSnap: clamp(finiteNumber(scene.rotateSnap, 15), 1, 90),
      scaleSnap: clamp(finiteNumber(scene.scaleSnap, 0.1), 0.01, 2),
    },
  }
}

export function collectStudioFileIds(project: StudioProject) {
  return Array.from(new Set(project.nodes.flatMap((node) => node.kind === 'imported' && node.fileId ? [node.fileId] : [])))
}
