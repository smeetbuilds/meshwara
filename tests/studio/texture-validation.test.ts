import assert from 'node:assert/strict'
import { validateStudioTextureBytes } from '../../src/lib/studioStorage.ts'

function bytes(values: number[], size = 32) {
  const out = new Uint8Array(size)
  out.set(values)
  return out.buffer
}

assert.equal(validateStudioTextureBytes(bytes([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]), 'image/png'), 'image/png')
assert.equal(validateStudioTextureBytes(bytes([0xff,0xd8,0xff,0xe0]), 'image/jpeg'), 'image/jpeg')
assert.equal(validateStudioTextureBytes(bytes([0x52,0x49,0x46,0x46,0,0,0,0,0x57,0x45,0x42,0x50]), 'image/webp'), 'image/webp')
assert.throws(() => validateStudioTextureBytes(bytes([1,2,3,4])), /PNG, JPEG or WebP/i)
assert.throws(() => validateStudioTextureBytes(bytes([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]), 'image/svg+xml'), /declared texture type/i)
assert.throws(() => validateStudioTextureBytes(new ArrayBuffer(8)), /incomplete/i)

console.log('Meshvara Studio texture binary validation contract passed')
