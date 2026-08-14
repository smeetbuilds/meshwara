import { Buffer } from 'node:buffer'

function align4(value: number) { return Math.ceil(value / 4) * 4 }

export function createStudioTriangleGlb({ requiredExtensions = [] as string[] } = {}) {
  const bin = Buffer.alloc(104)
  const positions = [[-0.6, -0.5, 0], [0.6, -0.5, 0], [0, 0.65, 0]]
  const normals = [[0, 0, 1], [0, 0, 1], [0, 0, 1]]
  const uvs = [[0, 0], [1, 0], [0.5, 1]]
  let offset = 0
  for (const vector of positions) for (const value of vector) { bin.writeFloatLE(value, offset); offset += 4 }
  for (const vector of normals) for (const value of vector) { bin.writeFloatLE(value, offset); offset += 4 }
  for (const vector of uvs) for (const value of vector) { bin.writeFloatLE(value, offset); offset += 4 }
  bin.writeUInt16LE(0, 96); bin.writeUInt16LE(1, 98); bin.writeUInt16LE(2, 100)

  const gltf = {
    asset: { version: '2.0', generator: 'Meshvara Playwright fixture' },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0, name: 'Fixture Triangle' }],
    meshes: [{ primitives: [{ attributes: { POSITION: 0, NORMAL: 1, TEXCOORD_0: 2 }, indices: 3, material: 0 }] }],
    materials: [{ name: 'Fixture Material', pbrMetallicRoughness: { baseColorFactor: [0.8, 0.22, 0.12, 1], metallicFactor: 0.2, roughnessFactor: 0.7 } }],
    buffers: [{ byteLength: bin.length }],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: 36, target: 34962 },
      { buffer: 0, byteOffset: 36, byteLength: 36, target: 34962 },
      { buffer: 0, byteOffset: 72, byteLength: 24, target: 34962 },
      { buffer: 0, byteOffset: 96, byteLength: 6, target: 34963 },
    ],
    accessors: [
      { bufferView: 0, componentType: 5126, count: 3, type: 'VEC3', min: [-0.6, -0.5, 0], max: [0.6, 0.65, 0] },
      { bufferView: 1, componentType: 5126, count: 3, type: 'VEC3' },
      { bufferView: 2, componentType: 5126, count: 3, type: 'VEC2' },
      { bufferView: 3, componentType: 5123, count: 3, type: 'SCALAR' },
    ],
    ...(requiredExtensions.length ? { extensionsUsed: requiredExtensions, extensionsRequired: requiredExtensions } : {}),
  }

  const jsonRaw = Buffer.from(JSON.stringify(gltf))
  const jsonLength = align4(jsonRaw.length)
  const binLength = align4(bin.length)
  const total = 12 + 8 + jsonLength + 8 + binLength
  const output = Buffer.alloc(total)
  output.writeUInt32LE(0x46546c67, 0)
  output.writeUInt32LE(2, 4)
  output.writeUInt32LE(total, 8)
  output.writeUInt32LE(jsonLength, 12)
  output.writeUInt32LE(0x4e4f534a, 16)
  output.fill(0x20, 20, 20 + jsonLength)
  jsonRaw.copy(output, 20)
  const binHeader = 20 + jsonLength
  output.writeUInt32LE(binLength, binHeader)
  output.writeUInt32LE(0x004e4942, binHeader + 4)
  bin.copy(output, binHeader + 8)
  return output
}

export const STUDIO_RED_PIXEL_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4z8DwHwAFAAH/iZk9HQAAAABJRU5ErkJggg==',
  'base64',
)
