export interface BrowserZipEntry {
  name: string
  data: string | Uint8Array | ArrayBuffer
}

const encoder = new TextEncoder()

function bytes(value: BrowserZipEntry['data']) {
  if (typeof value === 'string') return encoder.encode(value)
  if (value instanceof Uint8Array) return value
  return new Uint8Array(value)
}

function safeName(value: string) {
  const normalized = value.replace(/\\/g, '/')
  if (!normalized || normalized.startsWith('/') || normalized.split('/').some((part) => part === '..' || part === '')) throw new Error(`Unsafe ZIP path: ${value}`)
  return normalized
}

export function crc32(input: Uint8Array) {
  let crc = 0xffffffff
  for (const byte of input) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0)
  }
  return (crc ^ 0xffffffff) >>> 0
}

function u16(value: number) {
  return [value & 0xff, (value >>> 8) & 0xff]
}

function u32(value: number) {
  return [value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, (value >>> 24) & 0xff]
}

function concat(chunks: Uint8Array[]) {
  const size = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0)
  const out = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) {
    out.set(chunk, offset)
    offset += chunk.byteLength
  }
  return out
}

export function createBrowserZip(entries: BrowserZipEntry[]) {
  if (!entries.length) throw new Error('ZIP requires at least one entry.')
  if (entries.length > 200) throw new Error('ZIP entry limit exceeded.')
  const normalized = entries.map((entry) => ({ name: safeName(entry.name), data: bytes(entry.data) })).sort((a, b) => a.name.localeCompare(b.name))
  const seen = new Set<string>()
  const localChunks: Uint8Array[] = []
  const centralChunks: Uint8Array[] = []
  let localOffset = 0
  for (const entry of normalized) {
    if (seen.has(entry.name)) throw new Error(`Duplicate ZIP path: ${entry.name}`)
    seen.add(entry.name)
    const name = encoder.encode(entry.name)
    if (name.byteLength > 65535) throw new Error('ZIP path is too long.')
    const checksum = crc32(entry.data)
    const localHeader = new Uint8Array([
      ...u32(0x04034b50), ...u16(20), ...u16(0), ...u16(0), ...u16(0), ...u16(0),
      ...u32(checksum), ...u32(entry.data.byteLength), ...u32(entry.data.byteLength), ...u16(name.byteLength), ...u16(0),
    ])
    localChunks.push(localHeader, name, entry.data)
    const centralHeader = new Uint8Array([
      ...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0), ...u16(0), ...u16(0), ...u16(0),
      ...u32(checksum), ...u32(entry.data.byteLength), ...u32(entry.data.byteLength), ...u16(name.byteLength), ...u16(0), ...u16(0),
      ...u16(0), ...u16(0), ...u32(0), ...u32(localOffset),
    ])
    centralChunks.push(centralHeader, name)
    localOffset += localHeader.byteLength + name.byteLength + entry.data.byteLength
  }
  const local = concat(localChunks)
  const central = concat(centralChunks)
  const end = new Uint8Array([
    ...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(normalized.length), ...u16(normalized.length),
    ...u32(central.byteLength), ...u32(local.byteLength), ...u16(0),
  ])
  return concat([local, central, end])
}
