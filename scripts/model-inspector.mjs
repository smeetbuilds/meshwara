import { readFile } from 'node:fs/promises'
import { extname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const GLB_MAGIC = 0x46546c67
const GLB_JSON_CHUNK = 0x4e4f534a
const TRIANGLES = 4
const TRIANGLE_STRIP = 5
const TRIANGLE_FAN = 6

function readGlbJson(buffer, source) {
  if (buffer.length < 20) throw new Error(`${source}: GLB is too small`)
  if (buffer.readUInt32LE(0) !== GLB_MAGIC) throw new Error(`${source}: invalid GLB magic`)
  const version = buffer.readUInt32LE(4)
  if (version !== 2) throw new Error(`${source}: unsupported GLB version ${version}`)
  const declaredLength = buffer.readUInt32LE(8)
  if (declaredLength !== buffer.length) throw new Error(`${source}: GLB length header mismatch`)

  let cursor = 12
  while (cursor + 8 <= buffer.length) {
    const chunkLength = buffer.readUInt32LE(cursor)
    const chunkType = buffer.readUInt32LE(cursor + 4)
    const start = cursor + 8
    const end = start + chunkLength
    if (end > buffer.length) throw new Error(`${source}: GLB chunk exceeds file size`)
    if (chunkType === GLB_JSON_CHUNK) {
      return JSON.parse(buffer.subarray(start, end).toString('utf8').replace(/\u0000+$/g, '').trim())
    }
    cursor = end
  }
  throw new Error(`${source}: GLB has no JSON chunk`)
}

async function readDocument(file) {
  const buffer = await readFile(file)
  const ext = extname(file).toLowerCase()
  if (ext === '.glb') return { json: readGlbJson(buffer, file), bytes: buffer.length, format: 'GLB' }
  if (ext === '.gltf') return { json: JSON.parse(buffer.toString('utf8')), bytes: buffer.length, format: 'glTF' }
  throw new Error(`${file}: expected .glb or .gltf`)
}

function primitiveTriangles(primitive, accessors) {
  const mode = primitive.mode ?? TRIANGLES
  const accessorIndex = primitive.indices ?? primitive.attributes?.POSITION
  const count = Number.isInteger(accessorIndex) ? (accessors[accessorIndex]?.count ?? 0) : 0
  if (mode === TRIANGLES) return Math.floor(count / 3)
  if (mode === TRIANGLE_STRIP || mode === TRIANGLE_FAN) return Math.max(0, count - 2)
  return 0
}

function animationDuration(animation, accessors) {
  let duration = 0
  for (const sampler of animation.samplers ?? []) {
    const input = accessors[sampler.input]
    if (input?.max?.length) duration = Math.max(duration, Number(input.max[0]) || 0)
  }
  return duration
}

function collectNodeNames(nodes) {
  return new Set(nodes.map((node) => node?.name).filter((name) => typeof name === 'string' && name.length))
}

function collectMorphTargetNames(meshes) {
  const names = new Set()
  for (const mesh of meshes) {
    for (const name of mesh?.extras?.targetNames ?? []) {
      if (typeof name === 'string' && name.trim()) names.add(name.trim())
    }
  }
  return names
}

function animationTargetNodeNames(animation, nodes) {
  const names = new Set()
  for (const channel of animation.channels ?? []) {
    const index = channel.target?.node
    if (!Number.isInteger(index)) continue
    const name = nodes[index]?.name
    if (typeof name === 'string' && name.trim()) names.add(name.trim())
  }
  return [...names].sort()
}

function isExternalUri(uri) {
  return typeof uri === 'string' && uri.length > 0 && !uri.startsWith('data:')
}

function collectExternalResources(json) {
  const resources = new Set()
  for (const buffer of json.buffers ?? []) if (isExternalUri(buffer?.uri)) resources.add(buffer.uri)
  for (const image of json.images ?? []) if (isExternalUri(image?.uri)) resources.add(image.uri)
  return [...resources].sort()
}

export async function inspectModel(file) {
  const absolute = resolve(file)
  const { json, bytes, format } = await readDocument(absolute)
  if (json.asset?.version !== '2.0') throw new Error(`${file}: glTF 2.0 is required`)

  const accessors = json.accessors ?? []
  const meshes = json.meshes ?? []
  const skins = json.skins ?? []
  const animations = json.animations ?? []
  const extensions = new Set([...(json.extensionsUsed ?? []), ...(json.extensionsRequired ?? [])])
  const nodes = json.nodes ?? []
  const nodeNames = collectNodeNames(nodes)
  const morphTargetNames = collectMorphTargetNames(meshes)
  const externalResources = collectExternalResources(json)

  let vertices = 0
  let triangles = 0
  let primitives = 0
  let morphTargets = 0
  let skinnedPrimitives = 0

  for (const mesh of meshes) {
    for (const primitive of mesh.primitives ?? []) {
      primitives += 1
      const positionAccessor = accessors[primitive.attributes?.POSITION]
      vertices += positionAccessor?.count ?? 0
      triangles += primitiveTriangles(primitive, accessors)
      morphTargets += primitive.targets?.length ?? 0
      if (primitive.attributes?.JOINTS_0 !== undefined && primitive.attributes?.WEIGHTS_0 !== undefined) skinnedPrimitives += 1
    }
  }

  const uniqueJoints = new Set()
  for (const skin of skins) for (const joint of skin.joints ?? []) uniqueJoints.add(joint)

  const clips = animations.map((animation, index) => ({
    name: animation.name || `animation_${index}`,
    duration: animationDuration(animation, accessors),
    channels: animation.channels?.length ?? 0,
    targetPaths: [...new Set((animation.channels ?? []).map((channel) => channel.target?.path).filter(Boolean))],
    targetNodeNames: animationTargetNodeNames(animation, nodes),
  }))

  const hasKtx2 = (json.images ?? []).some((image) => image.mimeType === 'image/ktx2' || String(image.uri ?? '').toLowerCase().endsWith('.ktx2')) || extensions.has('KHR_texture_basisu')

  return {
    file: absolute,
    format,
    bytes,
    version: json.asset.version,
    scenes: json.scenes?.length ?? 0,
    nodes: json.nodes?.length ?? 0,
    meshes: meshes.length,
    primitives,
    vertices,
    triangles,
    materials: json.materials?.length ?? 0,
    textures: json.textures?.length ?? 0,
    images: json.images?.length ?? 0,
    skins: skins.length,
    joints: uniqueJoints.size,
    skinnedPrimitives,
    morphTargets,
    morphTargetNames,
    animations: clips,
    nodeNames,
    extensions: [...extensions].sort(),
    externalResources,
    compression: {
      draco: extensions.has('KHR_draco_mesh_compression'),
      meshopt: extensions.has('EXT_meshopt_compression'),
      ktx2: hasKtx2,
    },
  }
}

function printable(stats) {
  return {
    ...stats,
    nodeNames: [...stats.nodeNames].sort(),
    morphTargetNames: [...stats.morphTargetNames].sort(),
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const file = process.argv[2]
  if (!file) {
    console.error('Usage: bun scripts/model-inspector.mjs <model.glb|model.gltf>')
    process.exit(2)
  }
  console.log(JSON.stringify(printable(await inspectModel(file)), null, 2))
}
