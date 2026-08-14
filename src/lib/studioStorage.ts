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

export interface StudioFileRecord {
  id: string
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

interface PortableStudioFile {
  id: string
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

export async function saveStudioProject(project: StudioProject) {
  memoryProjects.set(project.id, cloneProject(project))
  await withStore(PROJECT_STORE, 'readwrite', (store) => store.put(project))
}

export async function loadStudioProject(id: string): Promise<StudioProject | null> {
  const stored = await withStore<StudioProject | undefined>(PROJECT_STORE, 'readonly', (store) => store.get(id))
  const parsed = parseStudioProject(stored ?? memoryProjects.get(id))
  return parsed ? cloneProject(parsed) : null
}

export async function listStudioProjects(): Promise<StudioProjectSummary[]> {
  const stored = await withStore<StudioProject[]>(PROJECT_STORE, 'readonly', (store) => store.getAll())
  const source = stored ?? Array.from(memoryProjects.values())
  return source
    .map(parseStudioProject)
    .filter((project): project is StudioProject => Boolean(project))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map((project) => ({ id: project.id, name: project.name, updatedAt: project.updatedAt, objectCount: project.nodes.length }))
}

export async function deleteStudioProject(project: StudioProject) {
  memoryProjects.delete(project.id)
  await withStore(PROJECT_STORE, 'readwrite', (store) => store.delete(project.id))
  await Promise.all(collectStudioFileIds(project).map(deleteStudioFile))
}

export async function storeStudioFile(file: File): Promise<StudioFileRecord> {
  const id = typeof crypto !== 'undefined' && crypto.randomUUID
    ? `file-${crypto.randomUUID()}`
    : `file-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
  const record: StudioFileRecord = {
    id,
    name: file.name,
    type: file.type || 'model/gltf-binary',
    size: file.size,
    bytes: await file.arrayBuffer(),
  }
  memoryFiles.set(id, cloneFile(record))
  await withStore(FILE_STORE, 'readwrite', (store) => store.put(record))
  return record
}

export async function putStudioFile(record: StudioFileRecord) {
  memoryFiles.set(record.id, cloneFile(record))
  await withStore(FILE_STORE, 'readwrite', (store) => store.put(record))
}

export async function loadStudioFile(id: string): Promise<StudioFileRecord | null> {
  const stored = await withStore<StudioFileRecord | undefined>(FILE_STORE, 'readonly', (store) => store.get(id))
  const record = stored ?? memoryFiles.get(id)
  return record ? cloneFile(record) : null
}

export async function deleteStudioFile(id: string) {
  memoryFiles.delete(id)
  await withStore(FILE_STORE, 'readwrite', (store) => store.delete(id))
}

function bytesToBase64(bytes: ArrayBuffer) {
  const view = new Uint8Array(bytes)
  let binary = ''
  const chunk = 0x8000
  for (let index = 0; index < view.length; index += chunk) {
    binary += String.fromCharCode(...view.subarray(index, Math.min(index + chunk, view.length)))
  }
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
    if (!record) throw new Error(`Imported file ${fileId} is missing from local storage.`)
    files.push({
      id: record.id,
      name: record.name,
      type: record.type,
      size: record.size,
      base64: bytesToBase64(record.bytes),
    })
  }
  return {
    format: STUDIO_PROJECT_FORMAT,
    version: STUDIO_PROJECT_VERSION,
    exportedAt: new Date().toISOString(),
    project: cloneProject(project),
    files,
  }
}

export async function restorePortableStudioProject(value: unknown): Promise<StudioProject> {
  if (!value || typeof value !== 'object') throw new Error('Project file is not a valid object.')
  const portable = value as Record<string, unknown>
  if (portable.format !== STUDIO_PROJECT_FORMAT || portable.version !== STUDIO_PROJECT_VERSION) {
    throw new Error('Unsupported Meshvara Studio project version.')
  }
  const project = parseStudioProject(portable.project)
  if (!project) throw new Error('Project scene data failed validation.')
  if (!Array.isArray(portable.files)) throw new Error('Project file payload is invalid.')

  const expected = new Set(collectStudioFileIds(project))
  const restored = new Set<string>()
  for (const raw of portable.files) {
    if (!raw || typeof raw !== 'object') throw new Error('Imported file payload is invalid.')
    const file = raw as Record<string, unknown>
    if (typeof file.id !== 'string' || !expected.has(file.id) || restored.has(file.id)) throw new Error('Unexpected imported file reference.')
    if (typeof file.name !== 'string' || typeof file.base64 !== 'string') throw new Error('Imported file metadata is invalid.')
    const bytes = base64ToBytes(file.base64)
    if (typeof file.size === 'number' && file.size !== bytes.byteLength) throw new Error(`Imported file ${file.name} failed size validation.`)
    await putStudioFile({
      id: file.id,
      name: file.name.slice(0, 240),
      type: typeof file.type === 'string' ? file.type : 'model/gltf-binary',
      size: bytes.byteLength,
      bytes,
    })
    restored.add(file.id)
  }
  if (restored.size !== expected.size) throw new Error('Project is missing one or more imported GLB payloads.')
  await saveStudioProject(project)
  return project
}
