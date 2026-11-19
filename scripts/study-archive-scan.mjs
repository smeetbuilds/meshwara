// Bounded ZIP text inspection for local study disclosure screening.
// Deliberately not a substitute for the release ZIP integrity validator.
import { inflateRawSync } from 'node:zlib'

const MAX_ARCHIVE_BYTES = 4 * 1024 * 1024
const MAX_EXPANDED_BYTES = 8 * 1024 * 1024
const MAX_MEMBER_BYTES = 2 * 1024 * 1024
const MAX_ENTRIES = 1024

function inspectArchive(input, emit) {
  const bytes = Buffer.isBuffer(input) ? input : Buffer.from(input)
  const result = { inspected: 0, skipped: 0, issues: [] }
  const issue = (reason) => { if (!result.issues.includes(reason)) result.issues.push(reason) }
  if (bytes.length > MAX_ARCHIVE_BYTES) { issue('archive-too-large'); return result }
  if (bytes.length < 22) { issue('invalid-zip'); return result }
  try {
    let end = -1
    for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
      if (bytes.readUInt32LE(i) === 0x06054b50 && i + 22 + bytes.readUInt16LE(i + 20) === bytes.length) {
        end = i
        break
      }
    }
    if (end === -1) { issue('missing-central-directory'); return result }
    const count = bytes.readUInt16LE(end + 10)
    let cursor = bytes.readUInt32LE(end + 16)
    const centralSize = bytes.readUInt32LE(end + 12)
    if (count > MAX_ENTRIES || cursor + centralSize > end) { issue('invalid-central-directory'); return result }
    let expanded = 0
    for (let index = 0; index < count; index++) {
      if (cursor + 46 > end || bytes.readUInt32LE(cursor) !== 0x02014b50) { issue('invalid-central-entry'); break }
      const flags = bytes.readUInt16LE(cursor + 8)
      const method = bytes.readUInt16LE(cursor + 10)
      const size = bytes.readUInt32LE(cursor + 20)
      const expandedSize = bytes.readUInt32LE(cursor + 24)
      const nameLen = bytes.readUInt16LE(cursor + 28)
      const extraLen = bytes.readUInt16LE(cursor + 30)
      const commentLen = bytes.readUInt16LE(cursor + 32)
      const localOffset = bytes.readUInt32LE(cursor + 42)
      const next = cursor + 46 + nameLen + extraLen + commentLen
      if (next > end) { issue('truncated-central-entry'); break }
      const name = bytes.subarray(cursor + 46, cursor + 46 + nameLen).toString('utf8')
      cursor = next
      if (!name || name.includes('\\') || name.startsWith('/') || name.split('/').includes('..') || /[\u0000-\u001f]/.test(name)) {
        issue('unsafe-member-name')
        continue
      }
      if (name.endsWith('/')) continue
      if (flags & 0x0001) { issue('encrypted-member'); continue }
      if (expandedSize > MAX_MEMBER_BYTES || expanded + expandedSize > MAX_EXPANDED_BYTES) { result.skipped++; issue('expanded-size-limit'); continue }
      if (method !== 0 && method !== 8) { issue('unsupported-compression'); continue }
      if (localOffset + 30 > bytes.length || bytes.readUInt32LE(localOffset) !== 0x04034b50) { issue('invalid-local-header'); continue }
      const dataOffset = localOffset + 30 + bytes.readUInt16LE(localOffset + 26) + bytes.readUInt16LE(localOffset + 28)
      if (dataOffset + size > bytes.length) { issue('truncated-member'); continue }
      const compressed = bytes.subarray(dataOffset, dataOffset + size)
      let output
      try {
        output = method === 0 ? compressed : inflateRawSync(compressed, { maxOutputLength: MAX_MEMBER_BYTES })
      } catch { issue('decompression-failed'); continue }
      if (output.length !== expandedSize) { issue('incorrect-uncompressed-size'); continue }
      expanded += output.length
      result.inspected++
      emit(name, output)
    }
  } catch { issue('malformed-zip'); }
  return result
}
export { inspectArchive }
