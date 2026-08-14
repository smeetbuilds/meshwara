import { createHash } from 'node:crypto'
import { inflateRawSync } from 'node:zlib'
import { dirname, resolve, sep } from 'node:path'

const MAX_ARCHIVE_BYTES = 256 * 1024 * 1024
const MAX_EXPANDED_BYTES = 512 * 1024 * 1024
const EOCD_SIGNATURE = 0x06054b50
const CENTRAL_SIGNATURE = 0x02014b50
const LOCAL_SIGNATURE = 0x04034b50

export function sha256Hex(bytes) {
  return createHash('sha256').update(bytes).digest('hex')
}

export function normalizeManifest(input) {
  if (!input || typeof input !== 'object' || !Array.isArray(input.assets)) throw new Error('Registry manifest is invalid.')
  const assets = []
  const seen = new Set()
  for (const raw of input.assets) {
    if (!raw || typeof raw !== 'object') throw new Error('Registry asset entry is invalid.')
    const slug = typeof raw.slug === 'string' ? raw.slug.trim() : ''
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || seen.has(slug)) throw new Error(`Registry contains an invalid or duplicate slug: ${slug || '<empty>'}`)
    const sha256 = typeof raw.sha256 === 'string' ? raw.sha256.toLowerCase() : ''
    const bytes = Number(raw.bytes)
    const file = typeof raw.file === 'string' ? raw.file : ''
    if (!/^[a-f0-9]{64}$/.test(sha256) || !Number.isSafeInteger(bytes) || bytes <= 0 || !file.endsWith('.zip')) throw new Error(`${slug}: archive integrity metadata is invalid.`)
    seen.add(slug)
    assets.push({
      slug,
      name: typeof raw.name === 'string' && raw.name.trim() ? raw.name.trim() : slug,
      category: typeof raw.category === 'string' ? raw.category : 'Other',
      subcategory: typeof raw.subcategory === 'string' ? raw.subcategory : null,
      file,
      bytes,
      sha256,
    })
  }
  if (typeof input.count === 'number' && input.count !== assets.length) throw new Error(`Registry count mismatch: expected ${input.count}, found ${assets.length}.`)
  return { brand: typeof input.brand === 'string' ? input.brand : 'MESHVARA', packSchemaVersion: input.packSchemaVersion === 1 ? 1 : 0, count: assets.length, assets }
}

export function buildRegistry(manifest, packageJson = {}) {
  const normalized = normalizeManifest(manifest)
  const runtimeNames = ['three', 'react', '@react-three/fiber', '@react-three/drei']
  const dependencies = Object.fromEntries(runtimeNames.flatMap((name) => {
    const version = packageJson.dependencies?.[name]
    return typeof version === 'string' ? [[name, version]] : []
  }))
  return {
    schemaVersion: 1,
    name: 'MESHVARA Registry',
    brand: normalized.brand,
    license: 'MIT',
    packSchemaVersion: normalized.packSchemaVersion,
    generatedFrom: '/downloads/manifest.json',
    defaultInstallDirectory: 'src/components/meshvara',
    dependencies,
    count: normalized.count,
    assets: normalized.assets.map((asset) => ({
      slug: asset.slug,
      name: asset.name,
      category: asset.category,
      subcategory: asset.subcategory,
      archive: {
        href: `../downloads/${asset.slug}.zip`,
        bytes: asset.bytes,
        sha256: asset.sha256,
      },
    })),
  }
}

export function normalizeRegistry(input) {
  if (input?.schemaVersion === 1 && Array.isArray(input.assets)) {
    const assets = input.assets.map((raw) => {
      const archive = raw?.archive
      const slug = typeof raw?.slug === 'string' ? raw.slug.trim() : ''
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Registry contains invalid slug ${slug || '<empty>'}.`)
      if (!archive || typeof archive.href !== 'string' || !/^[a-f0-9]{64}$/i.test(archive.sha256) || !Number.isSafeInteger(archive.bytes) || archive.bytes <= 0) {
        throw new Error(`${slug}: registry archive metadata is invalid.`)
      }
      return {
        slug,
        name: typeof raw.name === 'string' ? raw.name : slug,
        category: typeof raw.category === 'string' ? raw.category : 'Other',
        subcategory: typeof raw.subcategory === 'string' ? raw.subcategory : null,
        file: archive.href,
        bytes: archive.bytes,
        sha256: archive.sha256.toLowerCase(),
      }
    })
    return { brand: typeof input.brand === 'string' ? input.brand : 'MESHVARA', packSchemaVersion: input.packSchemaVersion === 1 ? 1 : 0, count: assets.length, assets }
  }
  return normalizeManifest(input)
}

export function resolveArchiveLocation(registryLocation, assetFile) {
  if (/^https?:\/\//i.test(assetFile)) return assetFile
  if (/^https?:\/\//i.test(registryLocation)) {
    const registryUrl = new URL(registryLocation)
    if (assetFile.startsWith('/downloads/') && registryUrl.pathname.endsWith('/public/downloads/manifest.json')) {
      registryUrl.pathname = registryUrl.pathname.replace(/\/public\/downloads\/manifest\.json$/, `/public${assetFile}`)
      registryUrl.search = ''
      registryUrl.hash = ''
      return registryUrl.href
    }
    return new URL(assetFile, registryUrl).href
  }
  return resolve(dirname(registryLocation), assetFile.replace(/^\/+/, ''))
}

function crcTable() {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n += 1) {
    let c = n
    for (let k = 0; k < 8; k += 1) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c >>> 0
  }
  return table
}
const CRC_TABLE = crcTable()

export function crc32(bytes) {
  let crc = 0xffffffff
  for (const byte of bytes) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function findEndOfCentralDirectory(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  const floor = Math.max(0, bytes.byteLength - 65557)
  for (let offset = bytes.byteLength - 22; offset >= floor; offset -= 1) {
    if (view.getUint32(offset, true) === EOCD_SIGNATURE) return offset
  }
  throw new Error('ZIP end-of-central-directory record was not found.')
}

function safeEntryName(name) {
  if (!name || name.includes('\0') || name.includes('\\') || name.startsWith('/') || /^[a-zA-Z]:/.test(name)) throw new Error(`Unsafe ZIP path: ${name || '<empty>'}`)
  const parts = name.split('/')
  if (parts.some((part) => part === '..' || part === '.')) throw new Error(`Unsafe ZIP traversal path: ${name}`)
  return name
}

export function readZipEntries(buffer) {
  const bytes = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer)
  if (bytes.byteLength > MAX_ARCHIVE_BYTES) throw new Error('Archive exceeds the 256 MB CLI safety limit.')
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  const eocd = findEndOfCentralDirectory(bytes)
  const entryCount = view.getUint16(eocd + 10, true)
  const centralOffset = view.getUint32(eocd + 16, true)
  let offset = centralOffset
  let expanded = 0
  const entries = []
  const seenNames = new Set()
  for (let index = 0; index < entryCount; index += 1) {
    if (view.getUint32(offset, true) !== CENTRAL_SIGNATURE) throw new Error('ZIP central directory is corrupt.')
    const method = view.getUint16(offset + 10, true)
    const expectedCrc = view.getUint32(offset + 16, true)
    const compressedSize = view.getUint32(offset + 20, true)
    const uncompressedSize = view.getUint32(offset + 24, true)
    const nameLength = view.getUint16(offset + 28, true)
    const extraLength = view.getUint16(offset + 30, true)
    const commentLength = view.getUint16(offset + 32, true)
    const externalAttributes = view.getUint32(offset + 38, true)
    const localOffset = view.getUint32(offset + 42, true)
    const name = safeEntryName(bytes.subarray(offset + 46, offset + 46 + nameLength).toString('utf8'))
    if (seenNames.has(name)) throw new Error(`Duplicate ZIP path: ${name}`)
    seenNames.add(name)
    offset += 46 + nameLength + extraLength + commentLength

    const isDirectory = name.endsWith('/') || ((externalAttributes >>> 16) & 0o170000) === 0o040000
    if (isDirectory) {
      entries.push({ name, bytes: Buffer.alloc(0), directory: true })
      continue
    }
    if (view.getUint32(localOffset, true) !== LOCAL_SIGNATURE) throw new Error(`${name}: ZIP local header is corrupt.`)
    const localNameLength = view.getUint16(localOffset + 26, true)
    const localExtraLength = view.getUint16(localOffset + 28, true)
    const dataStart = localOffset + 30 + localNameLength + localExtraLength
    const compressed = bytes.subarray(dataStart, dataStart + compressedSize)
    let output
    if (method === 0) output = Buffer.from(compressed)
    else if (method === 8) output = inflateRawSync(compressed)
    else throw new Error(`${name}: unsupported ZIP compression method ${method}.`)
    if (output.byteLength !== uncompressedSize) throw new Error(`${name}: ZIP size validation failed.`)
    if (crc32(output) !== expectedCrc) throw new Error(`${name}: ZIP CRC validation failed.`)
    expanded += output.byteLength
    if (expanded > MAX_EXPANDED_BYTES) throw new Error('Expanded archive exceeds the 512 MB CLI safety limit.')
    entries.push({ name, bytes: output, directory: false })
  }
  return entries
}

export function stripSingleRoot(entries, expectedSlug) {
  const files = entries.filter((entry) => !entry.directory)
  if (!files.length) throw new Error('Archive contains no files.')
  const roots = new Set(files.map((entry) => entry.name.split('/')[0]))
  const root = roots.size === 1 ? [...roots][0] : null
  return files.map((entry) => {
    let relative = entry.name
    if (root && (root === expectedSlug || files.every((file) => file.name.startsWith(`${root}/`)))) relative = entry.name.slice(root.length + 1)
    safeEntryName(relative)
    if (!relative) throw new Error('Archive contains an empty output path.')
    return { ...entry, relative }
  })
}

export function outputPath(root, relative) {
  const base = resolve(root)
  const target = resolve(base, relative)
  if (target !== base && !target.startsWith(`${base}${sep}`)) throw new Error(`Archive path escapes destination: ${relative}`)
  return target
}
