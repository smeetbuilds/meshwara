import { deflateRawSync, inflateRawSync } from 'node:zlib'

const crcTable = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n += 1) {
    let c = n
    for (let k = 0; k < 8; k += 1) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1)
    table[n] = c >>> 0
  }
  return table
})()

export function crc32(input) {
  const data = Buffer.isBuffer(input) ? input : Buffer.from(input)
  let crc = 0xffffffff
  for (const byte of data) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function dosDateTime(date = new Date()) {
  const year = Math.max(1980, date.getFullYear())
  return {
    time: ((date.getHours() & 0x1f) << 11) | ((date.getMinutes() & 0x3f) << 5) | ((Math.floor(date.getSeconds() / 2)) & 0x1f),
    date: (((year - 1980) & 0x7f) << 9) | (((date.getMonth() + 1) & 0x0f) << 5) | (date.getDate() & 0x1f),
  }
}

export function createZip(entries) {
  const localParts = []
  const centralParts = []
  let localOffset = 0
  const stamp = dosDateTime(new Date('2026-08-10T00:00:00Z'))

  for (const entry of entries) {
    const name = Buffer.from(entry.name.replaceAll('\\', '/'))
    const raw = Buffer.isBuffer(entry.data) ? entry.data : Buffer.from(entry.data)
    const compressed = deflateRawSync(raw, { level: 9 })
    const crc = crc32(raw)

    const local = Buffer.alloc(30)
    local.writeUInt32LE(0x04034b50, 0)
    local.writeUInt16LE(20, 4)
    local.writeUInt16LE(0x0800, 6)
    local.writeUInt16LE(8, 8)
    local.writeUInt16LE(stamp.time, 10)
    local.writeUInt16LE(stamp.date, 12)
    local.writeUInt32LE(crc, 14)
    local.writeUInt32LE(compressed.length, 18)
    local.writeUInt32LE(raw.length, 22)
    local.writeUInt16LE(name.length, 26)
    local.writeUInt16LE(0, 28)
    localParts.push(local, name, compressed)

    const central = Buffer.alloc(46)
    central.writeUInt32LE(0x02014b50, 0)
    central.writeUInt16LE(20, 4)
    central.writeUInt16LE(20, 6)
    central.writeUInt16LE(0x0800, 8)
    central.writeUInt16LE(8, 10)
    central.writeUInt16LE(stamp.time, 12)
    central.writeUInt16LE(stamp.date, 14)
    central.writeUInt32LE(crc, 16)
    central.writeUInt32LE(compressed.length, 20)
    central.writeUInt32LE(raw.length, 24)
    central.writeUInt16LE(name.length, 28)
    central.writeUInt16LE(0, 30)
    central.writeUInt16LE(0, 32)
    central.writeUInt16LE(0, 34)
    central.writeUInt16LE(0, 36)
    central.writeUInt32LE(0, 38)
    central.writeUInt32LE(localOffset, 42)
    centralParts.push(central, name)

    localOffset += local.length + name.length + compressed.length
  }

  const centralBuffer = Buffer.concat(centralParts)
  const end = Buffer.alloc(22)
  end.writeUInt32LE(0x06054b50, 0)
  end.writeUInt16LE(0, 4)
  end.writeUInt16LE(0, 6)
  end.writeUInt16LE(entries.length, 8)
  end.writeUInt16LE(entries.length, 10)
  end.writeUInt32LE(centralBuffer.length, 12)
  end.writeUInt32LE(localOffset, 16)
  end.writeUInt16LE(0, 20)

  return Buffer.concat([...localParts, centralBuffer, end])
}

export function readZip(input) {
  const data = Buffer.isBuffer(input) ? input : Buffer.from(input)
  let endOffset = -1
  for (let i = data.length - 22; i >= Math.max(0, data.length - 65557); i -= 1) {
    if (data.readUInt32LE(i) === 0x06054b50) { endOffset = i; break }
  }
  if (endOffset < 0) throw new Error('ZIP end-of-central-directory not found')

  const count = data.readUInt16LE(endOffset + 10)
  let cursor = data.readUInt32LE(endOffset + 16)
  const entries = new Map()

  for (let i = 0; i < count; i += 1) {
    if (data.readUInt32LE(cursor) !== 0x02014b50) throw new Error(`Invalid central directory entry ${i}`)
    const method = data.readUInt16LE(cursor + 10)
    const expectedCrc = data.readUInt32LE(cursor + 16)
    const compressedSize = data.readUInt32LE(cursor + 20)
    const uncompressedSize = data.readUInt32LE(cursor + 24)
    const nameLength = data.readUInt16LE(cursor + 28)
    const extraLength = data.readUInt16LE(cursor + 30)
    const commentLength = data.readUInt16LE(cursor + 32)
    const localOffset = data.readUInt32LE(cursor + 42)
    const name = data.subarray(cursor + 46, cursor + 46 + nameLength).toString('utf8')

    if (data.readUInt32LE(localOffset) !== 0x04034b50) throw new Error(`Invalid local header for ${name}`)
    const localNameLength = data.readUInt16LE(localOffset + 26)
    const localExtraLength = data.readUInt16LE(localOffset + 28)
    const payloadOffset = localOffset + 30 + localNameLength + localExtraLength
    const compressed = data.subarray(payloadOffset, payloadOffset + compressedSize)
    const raw = method === 8 ? inflateRawSync(compressed) : method === 0 ? Buffer.from(compressed) : null
    if (!raw) throw new Error(`Unsupported ZIP compression method ${method} for ${name}`)
    if (raw.length !== uncompressedSize) throw new Error(`Size mismatch for ${name}`)
    if (crc32(raw) !== expectedCrc) throw new Error(`CRC mismatch for ${name}`)
    entries.set(name, raw)

    cursor += 46 + nameLength + extraLength + commentLength
  }

  return entries
}
