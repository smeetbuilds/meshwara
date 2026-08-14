import { sha256Hex } from './core.mjs'

export const MESHVARA_PACK_SCHEMA_VERSION = 1
export const MESHVARA_PACK_METADATA_FILE = 'meshvara.json'

function safeRelative(path) {
  if (typeof path !== 'string' || !path || path.startsWith('/') || /^[A-Za-z]:/.test(path) || path.includes('\\') || path.includes('\0') || path.endsWith('/')) return false
  const segments = path.split('/')
  return segments.every((segment) => segment.length > 0 && segment !== '.' && segment !== '..')
}


function readJsonEntry(entries, relative) {
  const entry = entries.find((item) => item.relative === relative)
  if (!entry) return null
  try { return JSON.parse(entry.bytes.toString('utf8')) } catch { return null }
}

function stableRecord(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(Object.entries(value).filter(([key, item]) => typeof key === 'string' && typeof item === 'string').sort(([a], [b]) => a.localeCompare(b)))
}

function componentFromIndex(entries) {
  const entry = entries.find((item) => item.relative === 'src/index.ts')
  if (!entry) return null
  const source = entry.bytes.toString('utf8')
  const namedDefault = source.match(/export\s*\{[^}]*\bdefault\s*,\s*([A-Za-z_$][\w$]*)/)
  if (namedDefault) return namedDefault[1]
  const named = source.match(/export\s*\{\s*([A-Za-z_$][\w$]*)/)
  return named?.[1] ?? null
}

export function buildPackMetadata(asset, entries) {
  const payload = entries.filter((entry) => !entry.directory && entry.relative !== MESHVARA_PACK_METADATA_FILE)
  const pkg = readJsonEntry(payload, 'package.json') ?? {}
  const fileRecords = payload
    .map((entry) => ({ path: entry.relative, bytes: entry.bytes.byteLength, sha256: sha256Hex(entry.bytes) }))
    .sort((a, b) => a.path.localeCompare(b.path))
  const hasModels = payload.some((entry) => entry.relative.startsWith('models/'))
  const hasQa = payload.some((entry) => entry.relative.startsWith('qa/'))
  const sourceKind = hasModels ? 'model' : 'procedural'
  const component = componentFromIndex(payload)
  return {
    schemaVersion: MESHVARA_PACK_SCHEMA_VERSION,
    slug: asset.slug,
    name: asset.name,
    category: asset.category,
    subcategory: asset.subcategory ?? null,
    sourceKind,
    entrypoint: 'src/index.ts',
    component,
    license: payload.some((entry) => entry.relative === 'ASSET-LICENSE.md') ? 'mixed-reviewed' : 'MIT',
    capabilities: {
      reactThreeFiber: Boolean(pkg.dependencies?.['@react-three/fiber']),
      source: payload.some((entry) => entry.relative.startsWith('src/')),
      models: hasModels,
      qaEvidence: hasQa,
    },
    dependencies: stableRecord(pkg.dependencies),
    files: fileRecords,
  }
}

export function inspectPackContract(asset, entries, { requireV1 = false } = {}) {
  const metadataEntry = entries.find((entry) => entry.relative === MESHVARA_PACK_METADATA_FILE)
  if (!metadataEntry) {
    if (requireV1) throw new Error(`${asset.slug}: archive is missing ${MESHVARA_PACK_METADATA_FILE} Pack-v1 metadata.`)
    return { version: 0, metadata: null }
  }

  let metadata
  try { metadata = JSON.parse(metadataEntry.bytes.toString('utf8')) } catch { throw new Error(`${asset.slug}: ${MESHVARA_PACK_METADATA_FILE} is not valid JSON.`) }
  if (metadata?.schemaVersion !== MESHVARA_PACK_SCHEMA_VERSION) throw new Error(`${asset.slug}: unsupported Meshvara pack schema version.`)
  if (metadata.slug !== asset.slug || metadata.name !== asset.name) throw new Error(`${asset.slug}: pack metadata identity does not match the registry.`)
  if (metadata.category !== asset.category || (metadata.subcategory ?? null) !== (asset.subcategory ?? null)) throw new Error(`${asset.slug}: pack category metadata does not match the registry.`)
  if (!['procedural', 'model'].includes(metadata.sourceKind)) throw new Error(`${asset.slug}: pack sourceKind is invalid.`)
  if (!['MIT', 'mixed-reviewed'].includes(metadata.license)) throw new Error(`${asset.slug}: pack license mode is invalid.`)
  if (!safeRelative(metadata.entrypoint)) throw new Error(`${asset.slug}: pack entrypoint is unsafe.`)
  if (metadata.component !== null && (typeof metadata.component !== 'string' || !/^[A-Za-z_$][\w$]*$/.test(metadata.component))) throw new Error(`${asset.slug}: pack component export is invalid.`)
  if (!metadata.dependencies || typeof metadata.dependencies !== 'object' || Array.isArray(metadata.dependencies)) throw new Error(`${asset.slug}: pack dependency metadata is invalid.`)
  if (!metadata.capabilities || typeof metadata.capabilities !== 'object' || Array.isArray(metadata.capabilities)) throw new Error(`${asset.slug}: pack capability metadata is invalid.`)
  for (const key of ['reactThreeFiber', 'source', 'models', 'qaEvidence']) if (typeof metadata.capabilities[key] !== 'boolean') throw new Error(`${asset.slug}: pack capability ${key} is invalid.`)
  if (!Array.isArray(metadata.files) || !metadata.files.length) throw new Error(`${asset.slug}: pack file manifest is empty.`)

  const payload = entries.filter((entry) => !entry.directory && entry.relative !== MESHVARA_PACK_METADATA_FILE)
  const actual = new Map(payload.map((entry) => [entry.relative, entry]))
  const declared = new Set()
  for (const record of metadata.files) {
    if (!record || !safeRelative(record.path) || declared.has(record.path)) throw new Error(`${asset.slug}: pack file manifest contains an invalid/duplicate path.`)
    if (!Number.isSafeInteger(record.bytes) || record.bytes < 0 || !/^[a-f0-9]{64}$/.test(record.sha256)) throw new Error(`${asset.slug}: ${record.path} has invalid integrity metadata.`)
    const entry = actual.get(record.path)
    if (!entry) throw new Error(`${asset.slug}: declared pack file ${record.path} is missing.`)
    if (entry.bytes.byteLength !== record.bytes || sha256Hex(entry.bytes) !== record.sha256) throw new Error(`${asset.slug}: pack file integrity mismatch for ${record.path}.`)
    declared.add(record.path)
  }
  if (declared.size !== actual.size) {
    const extra = [...actual.keys()].filter((path) => !declared.has(path))[0]
    throw new Error(`${asset.slug}: pack contains undeclared payload file ${extra}.`)
  }
  for (const required of ['README.md', 'package.json', 'src/index.ts']) if (!actual.has(required)) throw new Error(`${asset.slug}: required pack file ${required} is missing.`)
  if (!actual.has(metadata.entrypoint)) throw new Error(`${asset.slug}: declared entrypoint ${metadata.entrypoint} is missing.`)

  const pkg = readJsonEntry(payload, 'package.json')
  if (!pkg || typeof pkg !== 'object') throw new Error(`${asset.slug}: package.json is invalid.`)
  const packageDependencies = stableRecord(pkg.dependencies)
  if (JSON.stringify(stableRecord(metadata.dependencies)) !== JSON.stringify(packageDependencies)) throw new Error(`${asset.slug}: pack dependency metadata does not match package.json.`)
  const actualModelFiles = [...actual.keys()].some((path) => path.startsWith('models/'))
  const actualSourceFiles = [...actual.keys()].some((path) => path.startsWith('src/'))
  const actualQaEvidence = [...actual.keys()].some((path) => path.startsWith('qa/'))
  const actualR3fDependency = Boolean(packageDependencies['@react-three/fiber'])
  if (metadata.sourceKind === 'model' && !actualModelFiles) throw new Error(`${asset.slug}: model pack metadata has no model payload.`)
  if (metadata.capabilities.models !== actualModelFiles) throw new Error(`${asset.slug}: pack model capability does not match the payload.`)
  if (metadata.capabilities.source !== actualSourceFiles) throw new Error(`${asset.slug}: pack source capability does not match the payload.`)
  if (metadata.capabilities.qaEvidence !== actualQaEvidence) throw new Error(`${asset.slug}: pack QA-evidence capability does not match the payload.`)
  if (metadata.capabilities.reactThreeFiber !== actualR3fDependency) throw new Error(`${asset.slug}: pack React Three Fiber capability does not match package.json.`)

  return { version: MESHVARA_PACK_SCHEMA_VERSION, metadata }
}
