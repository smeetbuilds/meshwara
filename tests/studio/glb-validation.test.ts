import assert from 'node:assert/strict'
import { MAX_STUDIO_GLB_BYTES, MAX_STUDIO_TEXTURE_BYTES, storeStudioFile, storeStudioTexture, validateStudioGlbBytes } from '../../src/lib/studioStorage.ts'

function validMinimalGlb() {
  const encoder = new TextEncoder()
  const raw = encoder.encode(JSON.stringify({ asset: { version: '2.0' }, scene: 0, scenes: [{}] }))
  const paddedLength = Math.ceil(raw.length / 4) * 4
  const bytes = new ArrayBuffer(20 + paddedLength)
  const view = new DataView(bytes)
  view.setUint32(0, 0x46546c67, true)
  view.setUint32(4, 2, true)
  view.setUint32(8, bytes.byteLength, true)
  view.setUint32(12, paddedLength, true)
  view.setUint32(16, 0x4e4f534a, true)
  const json = new Uint8Array(bytes, 20, paddedLength)
  json.fill(0x20)
  json.set(raw)
  return bytes
}

assert.equal(validateStudioGlbBytes(validMinimalGlb()), true)

const badMagic = validMinimalGlb()
new DataView(badMagic).setUint32(0, 0x12345678, true)
assert.throws(() => validateStudioGlbBytes(badMagic), /not a valid binary glTF/i)

const badVersion = validMinimalGlb()
new DataView(badVersion).setUint32(4, 1, true)
assert.throws(() => validateStudioGlbBytes(badVersion), /glTF 2\.0/i)

const badLength = validMinimalGlb()
new DataView(badLength).setUint32(8, 500, true)
assert.throws(() => validateStudioGlbBytes(badLength), /declared length/i)

const badChunk = validMinimalGlb()
new DataView(badChunk).setUint32(16, 0x004e4942, true)
assert.throws(() => validateStudioGlbBytes(badChunk), /JSON scene chunk/i)

const badJson = validMinimalGlb()
new Uint8Array(badJson, 20, 4).set([0x6e, 0x6f, 0x70, 0x65])
assert.throws(() => validateStudioGlbBytes(badJson), /JSON chunk is invalid/i)

assert.throws(() => validateStudioGlbBytes(new ArrayBuffer(12)), /incomplete/i)


let glbWasRead = false
await assert.rejects(storeStudioFile({
  name: 'oversized.glb',
  type: 'model/gltf-binary',
  size: MAX_STUDIO_GLB_BYTES + 1,
  arrayBuffer: async () => { glbWasRead = true; throw new Error('GLB should not have been read') },
} as unknown as File), /GLB exceeds the 100 MB local safety limit/i)
assert.equal(glbWasRead, false, 'oversized GLB must be rejected before reading bytes')

let textureWasRead = false
await assert.rejects(storeStudioTexture({
  name: 'oversized.png',
  type: 'image/png',
  size: MAX_STUDIO_TEXTURE_BYTES + 1,
  arrayBuffer: async () => { textureWasRead = true; throw new Error('Texture should not have been read') },
} as unknown as File), /Texture exceeds the 16 MB local safety limit/i)
assert.equal(textureWasRead, false, 'oversized texture must be rejected before reading bytes')

console.log('Meshvara Studio GLB structural validation contract passed')
