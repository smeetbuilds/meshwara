import { inflateRawSync } from 'node:zlib'

/**
 * Constrain decompression before zlib allocates a large output buffer.
 * The caller's remaining budget covers all previously expanded ZIP members.
 */
export function inflateZipMember(compressed, declaredBytes, remainingBytes) {
  if (!Number.isSafeInteger(declaredBytes) || declaredBytes < 0 ||
      !Number.isSafeInteger(remainingBytes) || remainingBytes < 0) {
    throw new Error('ZIP size metadata is invalid.')
  }
  if (declaredBytes > remainingBytes) {
    throw new Error('Expanded archive exceeds the 512 MB CLI safety limit.')
  }
  // Node requires maxOutputLength >= 1, even for legitimate zero-byte members.
  const maxOutputLength = Math.max(1, declaredBytes)
  let decoded
  try {
    decoded = inflateRawSync(compressed, { maxOutputLength })
  } catch {
    throw new Error('ZIP compressed member exceeds its declared size or is corrupt.')
  }
  if (decoded.byteLength !== declaredBytes) {
    throw new Error('ZIP size validation failed.')
  }
  return decoded
}
