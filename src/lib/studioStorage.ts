import {
  STUDIO_PROJECT_FORMAT,
  STUDIO_PROJECT_VERSION,
  collectStudioFileIds,
  parseStudioProject,
  type StudioProject,
} from './studioProject'

const DB_NAME = 'meshvara-studio'
const DB_VERSION = 1
const PROJECT_STORE = 'projects'
const FILE_STORE = 'files'
export const MAX_STUDIO_GLB_BYTES = 100 * 1024 * 1024
export const MAX_STUDIO_TEXTURE_BYTES = 16 * 1024 * 1024
const GLB_MAGIC = 0x46546c67
const GLB_VERSION = 2
const GLB_JSON_CHUNK = 0x4e4f534a

export type StudioFileKind = 'glb' | 'texture'

export interface StudioFileRecord {
  id: string
  kind: StudioFileKind
  name: string
  type: string
  size: number
  bytes: ArrayBuffer
}

export interface StudioProjectSummary {
  id: string
  name: string
  updatedAt: string
  objectCount: number
}

export interface StudioStorageGcResult {
  referencedFiles: number
  deletedFiles: number
  reclaimedBytes: number
}

interface PortableStudioFile {
  id: string
  kind?: StudioFileKind
  name: string
  type: string
  size: number
  base64: string
}

export interface PortableStudioProject {
  format: typeof STUDIO_PROJECT_FORMAT
  version: typeof STUDIO_PROJECT_VERSION
  exportedAt: string
  project: StudioProject
  files: PortableStudioFile[]
}

const memoryProjects = new Map<string, StudioProject>()
const memoryFiles = new Map<string, StudioFileRecord>()
let dbPromise: Promise<IDBDatabase | null> | null = null

function cloneProject(project: StudioProject) {
  return JSON.parse(JSON.stringify(project)) as StudioProject
}

function cloneFile(record: StudioFileRecord): StudioFileRecord {
  return { ...record, bytes: record.bytes.slice(0) }
}

function inferFileKind(record: Partial<StudioFileRecord> & Pick<StudioFileRecord, 'id' | 'name' | 'type'>): StudioFileKind {
  if (record.kind === 'texture' || record.id.startsWith('texture-') || record.type.startsWith('image/')) return 'texture'
  return 'glb'
}

function normalizeStoredFile(record: StudioFileRecord | (Omit<StudioFileRecord, 'kind'> & { kind?: StudioFileKind })): StudioFileRecord {
  const kind = inferFileKind(record)
  return { ...record, kind, size: record.bytes.byteLength, name: record.name.slice(0, 240) }
}

function openDatabase(): Promise<IDBDatabase | null> {
  if (dbPromise) return dbPromise
  if (typeof indexedDB === 'undefined') return Promise.resolve(null)
  dbPromise = new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(PROJECT_STORE)) db.createObjectStore(PROJECT_STORE, { keyPath: 'id' })
      if (!db.objectStoreNames.contains(FILE_STORE)) db.createObjectStore(FILE_STORE, { keyPath: 'id' })
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => resolve(null)
    request.onblocked = () => resolve(null)
  })
  return dbPromise
}

function requestValue<T>(request: IDBRequest<T>) {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed'))
  })
}

async function withStore<T>(storeName: string, mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>) {
  const db = await openDatabase()
  if (!db) return null
  try {
    const transaction = db.transaction(storeName, mode)
    return await requestValue(action(transaction.objectStore(storeName)))
  } catch {
    return null
  }
}

export function validateStudioGlbBytes(bytes: ArrayBuffer) {
  if (bytes.byteLength < 20) throw new Error('GLB header or JSON chunk is incomplete.')
  if (bytes.byteLength > MAX_STUDIO_GLB_BYTES) throw new Error('GLB exceeds the 100 MB local safety limit.')
  const header = new DataView(bytes, 0, 12)
  if (header.getUint32(0, true) !== GLB_MAGIC) throw new Error('File is not a valid binary glTF (GLB).')
  if (header.getUint32(4, true) !== GLB_VERSION) throw new Error('Studio supports glTF 2.0 GLB files only.')
  if (header.getUint32(8, true) !== bytes.byteLength) throw new Error('GLB declared length does not match the file payload.')
  const chunkHeader = new DataView(bytes, 12, 8)
  const jsonChunkLength = chunkHeader.getUint32(0, true)
  const jsonChunkType = chunkHeader.getUint32(4, true)
  if (!jsonChunkLength || jsonChunkType !== GLB_JSON_CHUNK || 20 + jsonChunkLength > bytes.byteLength) throw new Error('GLB is missing a valid JSON scene chunk.')
  try {
    const jsonText = new TextDecoder().decode(new Uint8Array(bytes, 20, jsonChunkLength)).replace(/\u0000+$/g, '').trim()
    const json = JSON.parse(jsonText) as { asset?: { version?: unknown } }
    if (typeof json.asset?.version !== 'string' || !json.asset.version.startsWith('2')) throw new Error('asset version')
  } catch {
    throw new Error('GLB JSON chunk is invalid or does not declare glTF 2.x.')
  }
  return true
}

export function validateStudioTextureBytes(bytes: ArrayBuffer, declaredType = '') {
  if (bytes.byteLength < 12) throw new Error('Texture file is incomplete.')
  if (bytes.byteLength > MAX_STUDIO_TEXTURE_BYTES) throw new Error('Texture exceeds the 16 MB local safety limit.')
  const view = new Uint8Array(bytes)
  const png = view[0] === 0x89 && view[1] === 0x50 && view[2] === 0x4e && view[3] === 0x47 && view[4] === 0x0d && view[5] === 0x0a && view[6] === 0x1a && view[7] === 0x0a
  const jpeg = view[0] === 0xff && view[1] === 0xd8 && view[2] === 0xff
  const webp = view[0] === 0x52 && view[1] === 0x49 && view[2] === 0x46 && view[3] === 0x46 && view[8] === 0x57 && view[9] === 0x45 && view[10] === 0x42 && view[11] === 0x50
  const detected = png ? 'image/png' : jpeg ? 'image/jpeg' : webp ? 'image/webp' : null
  if (!detected) throw new Error('Studio textures must be PNG, JPEG or WebP images.')
  if (declaredType && declaredType.startsWith('image/') && !['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(declaredType.toLowerCase())) throw new Error('Declared texture type is not supported.')
  return detected
}

function validateStudioFileRecord(record: StudioFileRecord) {
  if (record.kind === 'texture') return validateStudioTextureBytes(record.bytes, record.type)
  validateStudioGlbBytes(record.bytes)
  return 'model/gltf-binary'
}

export async function saveStudioProject(project: StudioProject) {
  memoryProjects.set(project.id, cloneProject(project))
  await withStore(PROJECT_STORE, 'readwrite', (store) => store.put(project))
}

export async function loadStudioProject(id: string): Promise<StudioProject | null> {
  const stored = await withStore<StudioProject | undefined>(PROJECT_STORE, 'readonly', (store) => store.get(id))
  const parsed = parseStudioProject(stored ?? memoryProjects.get(id))
  return parsed ? cloneProject(parsed) : null
}

async function loadAllProjects() {
  const stored = await withStore<StudioProject[]>(PROJECT_STORE, 'readonly', (store) => store.getAll())
  const merged = new Map<string, StudioProject>()
  for (const project of stored ?? []) merged.set(project.id, project)
  for (const project of memoryProjects.values()) merged.set(project.id, project)
  return [...merged.values()].map(parseStudioProject).filter((project): project is StudioProject => Boolean(project))
}

export async function listStudioProjects(): Promise<StudioProjectSummary[]> {
  return (await loadAllProjects())
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map((project) => ({ id: project.id, name: project.name, updatedAt: project.updatedAt, objectCount: project.nodes.length }))
}

export async function deleteStudioProject(project: StudioProject, protectedFileIds: Iterable<string> = []) {
  memoryProjects.delete(project.id)
  await withStore(PROJECT_STORE, 'readwrite', (store) => store.delete(project.id))
  await garbageCollectStudioFiles(protectedFileIds)
}

function generatedFileId(kind: StudioFileKind) {
  const prefix = kind === 'texture' ? 'texture' : 'file'
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? `${prefix}-${crypto.randomUUID()}`
    : `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

async function storeBrowserFile(file: File, kind: StudioFileKind): Promise<StudioFileRecord> {
  const bytes = await file.arrayBuffer()
  const detectedType = kind === 'texture' ? validateStudioTextureBytes(bytes, file.type) : (validateStudioGlbBytes(bytes), 'model/gltf-binary')
  const record: StudioFileRecord = {
    id: generatedFileId(kind),
    kind,
    name: file.name.slice(0, 240),
    type: detectedType,
    size: bytes.byteLength,
    bytes,
  }
  memoryFiles.set(record.id, cloneFile(record))
  await withStore(FILE_STORE, 'readwrite', (store) => store.put(record))
  return record
}

export function storeStudioFile(file: File) {
  return storeBrowserFile(file, 'glb')
}

export function storeStudioTexture(file: File) {
  return storeBrowserFile(file, 'texture')
}

export async function putStudioFile(input: StudioFileRecord | (Omit<StudioFileRecord, 'kind'> & { kind?: StudioFileKind })) {
  const record = normalizeStoredFile(input)
  const detectedType = validateStudioFileRecord(record)
  const safe: StudioFileRecord = { ...record, type: record.kind === 'texture' ? detectedType : 'model/gltf-binary' }
  memoryFiles.set(safe.id, cloneFile(safe))
  await withStore(FILE_STORE, 'readwrite', (store) => store.put(safe))
}

export async function loadStudioFile(id: string): Promise<StudioFileRecord | null> {
  const stored = await withStore<StudioFileRecord | undefined>(FILE_STORE, 'readonly', (store) => store.get(id))
  const record = stored ?? memoryFiles.get(id)
  return record ? cloneFile(normalizeStoredFile(record)) : null
}

export async function listStudioFiles(): Promise<StudioFileRecord[]> {
  const stored = await withStore<StudioFileRecord[]>(FILE_STORE, 'readonly', (store) => store.getAll())
  const merged = new Map<string, StudioFileRecord>()
  for (const file of stored ?? []) merged.set(file.id, normalizeStoredFile(file))
  for (const file of memoryFiles.values()) merged.set(file.id, normalizeStoredFile(file))
  return [...merged.values()].map(cloneFile)
}

export async function deleteStudioFile(id: string) {
  memoryFiles.delete(id)
  await withStore(FILE_STORE, 'readwrite', (store) => store.delete(id))
}

export async function garbageCollectStudioFiles(protectedFileIds: Iterable<string> = []): Promise<StudioStorageGcResult> {
  const projects = await loadAllProjects()
  const referenced = new Set([...projects.flatMap(collectStudioFileIds), ...protectedFileIds])
  const files = await listStudioFiles()
  let deletedFiles = 0
  let reclaimedBytes = 0
  for (const file of files) {
    if (referenced.has(file.id)) continue
    await deleteStudioFile(file.id)
    deletedFiles += 1
    reclaimedBytes += file.size
  }
  return { referencedFiles: referenced.size, deletedFiles, reclaimedBytes }
}

function bytesToBase64(bytes: ArrayBuffer) {
  const view = new Uint8Array(bytes)
  let binary = ''
  const chunk = 0x8000
  for (let index = 0; index < view.length; index += chunk) binary += String.fromCharCode(...view.subarray(index, Math.min(index + chunk, view.length)))
  return btoa(binary)
}

function base64ToBytes(base64: string) {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index)
  return bytes.buffer
}

export async function createPortableStudioProject(project: StudioProject): Promise<PortableStudioProject> {
  const files: PortableStudioFile[] = []
  for (const fileId of collectStudioFileIds(project)) {
    const record = await loadStudioFile(fileId)
    if (!record) throw new Error(`Local file ${fileId} is missing from Studio storage.`)
    files.push({ id: record.id, kind: record.kind, name: record.name, type: record.type, size: record.size, base64: bytesToBase64(record.bytes) })
  }
  return { format: STUDIO_PROJECT_FORMAT, version: STUDIO_PROJECT_VERSION, exportedAt: new Date().toISOString(), project: cloneProject(project), files }
}

export async function restorePortableStudioProject(value: unknown): Promise<StudioProject> {
  if (!value || typeof value !== 'object') throw new Error('Project file is not a valid object.')
  const portable = value as Record<string, unknown>
  if (portable.format !== STUDIO_PROJECT_FORMAT || portable.version !== STUDIO_PROJECT_VERSION) throw new Error('Unsupported Meshvara Studio project version.')
  const project = parseStudioProject(portable.project)
  if (!project) throw new Error('Project scene data failed validation.')
  if (!Array.isArray(portable.files)) throw new Error('Project file payload is invalid.')

  const expected = new Set(collectStudioFileIds(project))
  const glbReferences = new Set(project.nodes.flatMap((node) => node.kind === 'imported' && node.fileId ? [node.fileId] : []))
  const textureReferences = new Set(project.nodes.flatMap((node) => Object.values(node.materialOverrides).flatMap((override) => Object.values(override.textures ?? {}).filter((value): value is string => typeof value === 'string'))))
  const restored = new Set<string>()
  for (const raw of portable.files) {
    if (!raw || typeof raw !== 'object') throw new Error('Imported file payload is invalid.')
    const file = raw as Record<string, unknown>
    if (typeof file.id !== 'string' || !expected.has(file.id) || restored.has(file.id)) throw new Error('Unexpected imported file reference.')
    if (typeof file.name !== 'string' || typeof file.base64 !== 'string') throw new Error('Imported file metadata is invalid.')
    const kind: StudioFileKind = file.kind === 'texture' || file.id.startsWith('texture-') || (typeof file.type === 'string' && file.type.startsWith('image/')) ? 'texture' : 'glb'
    if (glbReferences.has(file.id) && kind !== 'glb') throw new Error('Imported model source points to a texture payload.')
    if (textureReferences.has(file.id) && kind !== 'texture') throw new Error('Material texture override points to a non-image payload.')
    const maxBytes = kind === 'texture' ? MAX_STUDIO_TEXTURE_BYTES : MAX_STUDIO_GLB_BYTES
    if (file.base64.length > Math.ceil(maxBytes * 4 / 3) + 16) throw new Error(`Embedded ${kind === 'texture' ? 'texture' : 'GLB'} exceeds the local safety limit.`)
    const bytes = base64ToBytes(file.base64)
    const type = kind === 'texture'
      ? validateStudioTextureBytes(bytes, typeof file.type === 'string' ? file.type : '')
      : (validateStudioGlbBytes(bytes), 'model/gltf-binary')
    if (typeof file.size === 'number' && file.size !== bytes.byteLength) throw new Error(`Imported file ${file.name} failed size validation.`)
    await putStudioFile({ id: file.id, kind, name: file.name, type, size: bytes.byteLength, bytes })
    restored.add(file.id)
  }
  if (restored.size !== expected.size) throw new Error('Project is missing one or more local GLB/texture payloads.')
  await saveStudioProject(project)
  return project
}
