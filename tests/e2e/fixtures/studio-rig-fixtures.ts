import { Buffer } from 'node:buffer'

function align4(value: number) { return Math.ceil(value / 4) * 4 }

export function createSkinnedStudioGlb() {
  const chunks: Buffer[] = []
  let offset = 0
  const views: Array<{ buffer: number; byteOffset: number; byteLength: number; target?: number }> = []
  const push = (data: Buffer, target?: number) => {
    const aligned = align4(offset)
    if (aligned > offset) chunks.push(Buffer.alloc(aligned - offset))
    offset = aligned
    const index = views.length
    views.push({ buffer: 0, byteOffset: offset, byteLength: data.length, ...(target ? { target } : {}) })
    chunks.push(data)
    offset += data.length
    return index
  }

  const positions = Buffer.alloc(36)
  ;[[-0.5, 0, 0], [0.5, 0, 0], [0, 1, 0]].flat().forEach((value, i) => positions.writeFloatLE(value, i * 4))
  const normals = Buffer.alloc(36)
  ;[[0, 0, 1], [0, 0, 1], [0, 0, 1]].flat().forEach((value, i) => normals.writeFloatLE(value, i * 4))
  const joints = Buffer.from([0,0,0,0, 0,0,0,0, 1,0,0,0])
  const weights = Buffer.alloc(48)
  ;[[1,0,0,0], [1,0,0,0], [1,0,0,0]].flat().forEach((value, i) => weights.writeFloatLE(value, i * 4))
  const indices = Buffer.alloc(6); [0,1,2].forEach((value, i) => indices.writeUInt16LE(value, i * 2))
  const inverseBind = Buffer.alloc(128)
  for (let matrix = 0; matrix < 2; matrix++) for (let i = 0; i < 16; i++) inverseBind.writeFloatLE(i % 5 === 0 ? 1 : 0, matrix * 64 + i * 4)

  const positionView = push(positions, 34962)
  const normalView = push(normals, 34962)
  const jointsView = push(joints, 34962)
  const weightsView = push(weights, 34962)
  const indexView = push(indices, 34963)
  const bindView = push(inverseBind)
  const binary = Buffer.concat(chunks)

  const gltf = {
    asset: { version: '2.0', generator: 'Meshvara rig E2E fixture' },
    scene: 0,
    scenes: [{ nodes: [0, 1] }],
    nodes: [
      { name: 'Rigged Triangle', mesh: 0, skin: 0 },
      { name: 'Hips', children: [2] },
      { name: 'Spine', translation: [0, 0.5, 0] },
    ],
    meshes: [{ primitives: [{ attributes: { POSITION: 0, NORMAL: 1, JOINTS_0: 2, WEIGHTS_0: 3 }, indices: 4, material: 0 }] }],
    materials: [{ pbrMetallicRoughness: { baseColorFactor: [0.7, 0.75, 0.8, 1], roughnessFactor: 0.7 } }],
    skins: [{ inverseBindMatrices: 5, joints: [1, 2], skeleton: 1 }],
    buffers: [{ byteLength: binary.length }],
    bufferViews: views,
    accessors: [
      { bufferView: positionView, componentType: 5126, count: 3, type: 'VEC3', min: [-0.5,0,0], max: [0.5,1,0] },
      { bufferView: normalView, componentType: 5126, count: 3, type: 'VEC3' },
      { bufferView: jointsView, componentType: 5121, count: 3, type: 'VEC4' },
      { bufferView: weightsView, componentType: 5126, count: 3, type: 'VEC4' },
      { bufferView: indexView, componentType: 5123, count: 3, type: 'SCALAR' },
      { bufferView: bindView, componentType: 5126, count: 2, type: 'MAT4' },
    ],
  }
  const jsonRaw = Buffer.from(JSON.stringify(gltf))
  const jsonLength = align4(jsonRaw.length)
  const binLength = align4(binary.length)
  const total = 12 + 8 + jsonLength + 8 + binLength
  const output = Buffer.alloc(total)
  output.writeUInt32LE(0x46546c67, 0); output.writeUInt32LE(2, 4); output.writeUInt32LE(total, 8)
  output.writeUInt32LE(jsonLength, 12); output.writeUInt32LE(0x4e4f534a, 16); output.fill(0x20, 20, 20 + jsonLength); jsonRaw.copy(output, 20)
  const binHeader = 20 + jsonLength
  output.writeUInt32LE(binLength, binHeader); output.writeUInt32LE(0x004e4942, binHeader + 4); binary.copy(output, binHeader + 8)
  return output
}
