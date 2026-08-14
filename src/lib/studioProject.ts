export const STUDIO_PROJECT_FORMAT = 'meshvara-project' as const
export const STUDIO_PROJECT_VERSION = 1 as const
export const STUDIO_HISTORY_LIMIT = 50
export const STUDIO_NODE_LIMIT = 250

export type StudioTransformMode = 'translate' | 'rotate' | 'scale'
export type StudioNodeKind = 'archive' | 'imported'
export type StudioVec3 = [number, number, number]

export interface StudioTransform {
  position: StudioVec3
  rotation: StudioVec3
  scale: StudioVec3
}

export interface StudioMaterialOverride {
  color?: string
  emissive?: string
  emissiveIntensity?: number
  roughness?: number
  metalness?: number
  opacity?: number
}

export interface StudioAnimationState {
  clip?: string
  playing: boolean
  speed: number
  loop: boolean
}

export interface StudioDebugState {
  bounds: boolean
  axes: boolean
  skeleton: boolean
}

export interface StudioNode {
  id: string
  name: string
  kind: StudioNodeKind
  assetSlug?: string
  fileId?: string
  parentId?: string
  transform: StudioTransform
  visible: boolean
  locked: boolean
  wireframe: boolean
  materialOverrides: Record<string, StudioMaterialOverride>
  animation: StudioAnimationState
  debug: StudioDebugState
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
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return `${prefix}-${crypto.randomUUID()}`
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function now() {
  return new Date().toISOString()
}

export function cloneStudioProject(project: StudioProject): StudioProject {
  return JSON.parse(JSON.stringify(project)) as StudioProject
}

export function defaultStudioTransform(): StudioTransform {
  return { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] }
}

export function defaultStudioAnimation(): StudioAnimationState {
  return { playing: false, speed: 1, loop: true }
}

export function defaultStudioDebug(): StudioDebugState {
  return { bounds: false, axes: false, skeleton: false }
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
      background: '#101112', exposure: 1, grid: true, snap: false,
      translateSnap: 0.25, rotateSnap: 15, scaleSnap: 0.1,
    },
  }
}

function baseNode(name: string): Omit<StudioNode, 'id' | 'kind'> {
  return {
    name,
    transform: defaultStudioTransform(),
    visible: true,
    locked: false,
    wireframe: false,
    materialOverrides: {},
    animation: defaultStudioAnimation(),
    debug: defaultStudioDebug(),
  }
}

export function createArchiveStudioNode(asset: { slug: string; name: string }): StudioNode {
  return { id: uid('node'), kind: 'archive', assetSlug: asset.slug, ...baseNode(asset.name) }
}

export function createImportedStudioNode(file: { id: string; name: string }): StudioNode {
  return {
    id: uid('node'), kind: 'imported', fileId: file.id,
    ...baseNode(file.name.replace(/\.glb$/i, '') || 'Imported model'),
  }
}

function touch(project: StudioProject): StudioProject {
  return { ...project, updatedAt: now() }
}

function cloneNode(node: StudioNode): StudioNode {
  return JSON.parse(JSON.stringify(node)) as StudioNode
}

export function appendStudioNode(project: StudioProject, node: StudioNode): StudioProject {
  if (project.nodes.length >= STUDIO_NODE_LIMIT) return project
  return touch({ ...project, nodes: [...project.nodes, node] })
}

export function updateStudioNode(
  project: StudioProject,
  nodeId: string,
  patch: Partial<Omit<StudioNode, 'id' | 'kind' | 'assetSlug' | 'fileId'>>,
): StudioProject {
  return touch({ ...project, nodes: project.nodes.map((node) => node.id === nodeId ? { ...node, ...patch } : node) })
}

export function updateStudioNodes(
  project: StudioProject,
  nodeIds: Iterable<string>,
  patch: Partial<Pick<StudioNode, 'visible' | 'locked'>>,
): StudioProject {
  const ids = new Set(nodeIds)
  if (!ids.size) return project
  return touch({ ...project, nodes: project.nodes.map((node) => ids.has(node.id) ? { ...node, ...patch } : node) })
}

export function updateStudioTransform(project: StudioProject, nodeId: string, transform: Partial<StudioTransform>): StudioProject {
  return touch({
    ...project,
    nodes: project.nodes.map((node) => node.id === nodeId ? { ...node, transform: { ...node.transform, ...transform } } : node),
  })
}

export function collectStudioDescendantIds(project: StudioProject, nodeId: string): string[] {
  const result: string[] = []
  const queue = [nodeId]
  while (queue.length) {
    const parent = queue.shift()!
    for (const child of project.nodes) {
      if (child.parentId !== parent || result.includes(child.id)) continue
      result.push(child.id)
      queue.push(child.id)
    }
  }
  return result
}

export function setStudioParent(project: StudioProject, nodeId: string, parentId?: string): StudioProject {
  const node = project.nodes.find((item) => item.id === nodeId)
  if (!node) return project
  if (!parentId) return updateStudioNode(project, nodeId, { parentId: undefined })
  if (parentId === nodeId || !project.nodes.some((item) => item.id === parentId)) return project
  if (collectStudioDescendantIds(project, nodeId).includes(parentId)) return project
  return updateStudioNode(project, nodeId, { parentId })
}

export function removeStudioNodes(project: StudioProject, nodeIds: Iterable<string>): StudioProject {
  const ids = new Set(nodeIds)
  if (!ids.size) return project
  return touch({
    ...project,
    nodes: project.nodes
      .filter((node) => !ids.has(node.id))
      .map((node) => node.parentId && ids.has(node.parentId) ? { ...node, parentId: undefined } : node),
  })
}

export function removeStudioNode(project: StudioProject, nodeId: string): StudioProject {
  return removeStudioNodes(project, [nodeId])
}

export function duplicateStudioNodes(project: StudioProject, nodeIds: Iterable<string>): { project: StudioProject; nodeIds: string[] } {
  const requested = [...new Set(nodeIds)].filter((id) => project.nodes.some((node) => node.id === id))
  if (!requested.length) return { project, nodeIds: [] }
  const available = Math.max(0, STUDIO_NODE_LIMIT - project.nodes.length)
  const selected = requested.slice(0, available)
  const idMap = new Map(selected.map((id) => [id, uid('node')]))
  const duplicates = selected.map((id) => {
    const source = project.nodes.find((node) => node.id === id)!
    const duplicate = cloneNode(source)
    duplicate.id = idMap.get(id)!
    duplicate.name = `${source.name} Copy`
    duplicate.parentId = source.parentId && idMap.has(source.parentId) ? idMap.get(source.parentId) : source.parentId
    if (!source.parentId || !idMap.has(source.parentId)) {
      duplicate.transform.position = [source.transform.position[0] + 0.35, source.transform.position[1], source.transform.position[2] + 0.35]
    }
    return duplicate
  })
  return { project: touch({ ...project, nodes: [...project.nodes, ...duplicates] }), nodeIds: duplicates.map((node) => node.id) }
}

export function duplicateStudioNode(project: StudioProject, nodeId: string): { project: StudioProject; nodeId?: string } {
  const result = duplicateStudioNodes(project, [nodeId])
  return { project: result.project, nodeId: result.nodeIds[0] }
}

export function updateStudioScene(project: StudioProject, patch: Partial<StudioSceneSettings>): StudioProject {
  return touch({ ...project, scene: { ...project.scene, ...patch } })
}

export function renameStudioProject(project: StudioProject, name: string): StudioProject {
  return touch({ ...project, name: name.trim().slice(0, 80) || 'Untitled Scene' })
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

function sanitizeMaterialOverrides(value: unknown): Record<string, StudioMaterialOverride> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const result: Record<string, StudioMaterialOverride> = {}
  for (const [key, raw] of Object.entries(value as Record<string, unknown>).slice(0, 64)) {
    if (!/^[a-zA-Z0-9:_-]{1,120}$/.test(key) || !raw || typeof raw !== 'object' || Array.isArray(raw)) continue
    const input = raw as Record<string, unknown>
    const override: StudioMaterialOverride = {}
    if (isHexColor(input.color)) override.color = input.color.toLowerCase()
    if (isHexColor(input.emissive)) override.emissive = input.emissive.toLowerCase()
    if (typeof input.emissiveIntensity === 'number' && Number.isFinite(input.emissiveIntensity)) override.emissiveIntensity = clamp(input.emissiveIntensity, 0, 20)
    if (typeof input.roughness === 'number' && Number.isFinite(input.roughness)) override.roughness = clamp(input.roughness, 0, 1)
    if (typeof input.metalness === 'number' && Number.isFinite(input.metalness)) override.metalness = clamp(input.metalness, 0, 1)
    if (typeof input.opacity === 'number' && Number.isFinite(input.opacity)) override.opacity = clamp(input.opacity, 0, 1)
    if (Object.keys(override).length) result[key] = override
  }
  return result
}

function sanitizeAnimation(value: unknown): StudioAnimationState {
  const input = value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}
  return {
    clip: typeof input.clip === 'string' && input.clip.trim() ? input.clip.trim().slice(0, 120) : undefined,
    playing: input.playing === true,
    speed: clamp(finiteNumber(input.speed, 1), 0.05, 4),
    loop: input.loop !== false,
  }
}

function sanitizeDebug(value: unknown): StudioDebugState {
  const input = value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}
  return { bounds: input.bounds === true, axes: input.axes === true, skeleton: input.skeleton === true }
}

function sanitizeParents(nodes: StudioNode[]) {
  const ids = new Set(nodes.map((node) => node.id))
  const byId = new Map(nodes.map((node) => [node.id, node]))
  for (const node of nodes) {
    if (!node.parentId || !ids.has(node.parentId) || node.parentId === node.id) {
      node.parentId = undefined
      continue
    }
    const seen = new Set([node.id])
    let cursor: StudioNode | undefined = byId.get(node.parentId)
    while (cursor?.parentId) {
      if (seen.has(cursor.id) || cursor.parentId === node.id) {
        node.parentId = undefined
        break
      }
      seen.add(cursor.id)
      cursor = byId.get(cursor.parentId)
    }
  }
}

export function parseStudioProject(value: unknown): StudioProject | null {
  if (!value || typeof value !== 'object') return null
  const input = value as Record<string, unknown>
  if (input.format !== STUDIO_PROJECT_FORMAT || input.version !== STUDIO_PROJECT_VERSION) return null
  if (typeof input.id !== 'string' || typeof input.name !== 'string') return null
  if (!Array.isArray(input.nodes) || !input.scene || typeof input.scene !== 'object') return null

  const nodes: StudioNode[] = []
  const ids = new Set<string>()
  for (const raw of input.nodes.slice(0, STUDIO_NODE_LIMIT)) {
    if (!raw || typeof raw !== 'object') return null
    const node = raw as Record<string, unknown>
    if (typeof node.id !== 'string' || !node.id || ids.has(node.id)) return null
    if (node.kind !== 'archive' && node.kind !== 'imported') return null
    if (node.kind === 'archive' && typeof node.assetSlug !== 'string') return null
    if (node.kind === 'imported' && typeof node.fileId !== 'string') return null
    ids.add(node.id)
    const transform = node.transform && typeof node.transform === 'object' ? node.transform as Record<string, unknown> : {}
    nodes.push({
      id: node.id,
      name: typeof node.name === 'string' ? node.name.slice(0, 100) : 'Object',
      kind: node.kind,
      assetSlug: node.kind === 'archive' ? String(node.assetSlug) : undefined,
      fileId: node.kind === 'imported' ? String(node.fileId) : undefined,
      parentId: typeof node.parentId === 'string' ? node.parentId : undefined,
      visible: node.visible !== false,
      locked: node.locked === true,
      wireframe: node.wireframe === true,
      materialOverrides: sanitizeMaterialOverrides(node.materialOverrides),
      animation: sanitizeAnimation(node.animation),
      debug: sanitizeDebug(node.debug),
      transform: {
        position: sanitizeVec3(transform.position, [0, 0, 0], -10000, 10000),
        rotation: sanitizeVec3(transform.rotation, [0, 0, 0], -Math.PI * 20, Math.PI * 20),
        scale: sanitizeVec3(transform.scale, [1, 1, 1], 0.001, 1000),
      },
    })
  }
  sanitizeParents(nodes)

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
      background: isHexColor(scene.background) ? scene.background.toLowerCase() : '#101112',
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
