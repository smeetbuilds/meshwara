import type { StudioNode, StudioTransform, StudioVec3 } from './studioProject'

type Mat4 = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]

const EPSILON = 1e-5

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function length3(x: number, y: number, z: number) {
  return Math.hypot(x, y, z)
}

function determinant(matrix: Mat4) {
  const [n11, n21, n31, n41, n12, n22, n32, n42, n13, n23, n33, n43, n14, n24, n34, n44] = matrix
  return (
    n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) +
    n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) +
    n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) +
    n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31)
  )
}

export function composeStudioMatrix(transform: StudioTransform): Mat4 {
  const [x, y, z] = transform.rotation
  const [sx, sy, sz] = transform.scale
  const c1 = Math.cos(x / 2), c2 = Math.cos(y / 2), c3 = Math.cos(z / 2)
  const s1 = Math.sin(x / 2), s2 = Math.sin(y / 2), s3 = Math.sin(z / 2)
  const qx = s1 * c2 * c3 + c1 * s2 * s3
  const qy = c1 * s2 * c3 - s1 * c2 * s3
  const qz = c1 * c2 * s3 + s1 * s2 * c3
  const qw = c1 * c2 * c3 - s1 * s2 * s3
  const x2 = qx + qx, y2 = qy + qy, z2 = qz + qz
  const xx = qx * x2, xy = qx * y2, xz = qx * z2
  const yy = qy * y2, yz = qy * z2, zz = qz * z2
  const wx = qw * x2, wy = qw * y2, wz = qw * z2
  const [px, py, pz] = transform.position
  return [
    (1 - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0,
    (xy - wz) * sy, (1 - (xx + zz)) * sy, (yz + wx) * sy, 0,
    (xz + wy) * sz, (yz - wx) * sz, (1 - (xx + yy)) * sz, 0,
    px, py, pz, 1,
  ]
}

export function multiplyStudioMatrices(a: Mat4, b: Mat4): Mat4 {
  const result = new Array<number>(16).fill(0) as Mat4
  for (let column = 0; column < 4; column += 1) {
    for (let row = 0; row < 4; row += 1) {
      let value = 0
      for (let index = 0; index < 4; index += 1) value += a[index * 4 + row] * b[column * 4 + index]
      result[column * 4 + row] = value
    }
  }
  return result
}

export function invertStudioMatrix(matrix: Mat4): Mat4 | null {
  const [n11, n21, n31, n41, n12, n22, n32, n42, n13, n23, n33, n43, n14, n24, n34, n44] = matrix
  const t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44
  const t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44
  const t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44
  const t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34
  const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14
  if (Math.abs(det) < 1e-12) return null
  const detInv = 1 / det
  return [
    t11 * detInv,
    (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv,
    (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv,
    (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv,
    t12 * detInv,
    (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv,
    (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv,
    (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv,
    t13 * detInv,
    (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv,
    (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv,
    (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv,
    t14 * detInv,
    (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv,
    (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv,
    (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv,
  ]
}

export function decomposeStudioMatrix(matrix: Mat4): StudioTransform | null {
  let sx = length3(matrix[0], matrix[1], matrix[2])
  const sy = length3(matrix[4], matrix[5], matrix[6])
  const sz = length3(matrix[8], matrix[9], matrix[10])
  if (Math.min(Math.abs(sx), Math.abs(sy), Math.abs(sz)) < 1e-8) return null
  if (determinant(matrix) < 0) sx = -sx
  const rm = [...matrix] as Mat4
  const invSx = 1 / sx, invSy = 1 / sy, invSz = 1 / sz
  rm[0] *= invSx; rm[1] *= invSx; rm[2] *= invSx
  rm[4] *= invSy; rm[5] *= invSy; rm[6] *= invSy
  rm[8] *= invSz; rm[9] *= invSz; rm[10] *= invSz
  const m11 = rm[0], m12 = rm[4], m13 = rm[8]
  const m22 = rm[5], m23 = rm[9], m32 = rm[6], m33 = rm[10]
  const y = Math.asin(clamp(m13, -1, 1))
  let x: number
  let z: number
  if (Math.abs(m13) < 0.9999999) {
    x = Math.atan2(-m23, m33)
    z = Math.atan2(-m12, m11)
  } else {
    x = Math.atan2(m32, m22)
    z = 0
  }
  const transform: StudioTransform = {
    position: [matrix[12], matrix[13], matrix[14]],
    rotation: [x, y, z],
    scale: [sx, sy, sz],
  }
  const rebuilt = composeStudioMatrix(transform)
  const tolerance = EPSILON * Math.max(1, ...matrix.map((value) => Math.abs(value)))
  if (rebuilt.some((value, index) => Math.abs(value - matrix[index]) > tolerance)) return null
  return transform
}

export function studioWorldMatrix(nodes: readonly StudioNode[], nodeId: string, override?: { nodeId: string; transform: StudioTransform }): Mat4 | null {
  const byId = new Map(nodes.map((node) => [node.id, node]))
  const visited = new Set<string>()
  const resolve = (id: string): Mat4 | null => {
    if (visited.has(id)) return null
    const node = byId.get(id)
    if (!node) return null
    visited.add(id)
    const local = composeStudioMatrix(override?.nodeId === id ? override.transform : node.transform)
    if (!node.parentId) {
      visited.delete(id)
      return local
    }
    const parent = resolve(node.parentId)
    visited.delete(id)
    return parent ? multiplyStudioMatrices(parent, local) : null
  }
  return resolve(nodeId)
}

export function localTransformForWorld(nodes: readonly StudioNode[], nodeId: string, parentId: string | undefined, world: Mat4): StudioTransform | null {
  if (!parentId) return decomposeStudioMatrix(world)
  const parentWorld = studioWorldMatrix(nodes, parentId)
  if (!parentWorld) return null
  const inverse = invertStudioMatrix(parentWorld)
  return inverse ? decomposeStudioMatrix(multiplyStudioMatrices(inverse, world)) : null
}

export function studioSelectedRootIds(nodes: readonly StudioNode[], selectedIds: Iterable<string>) {
  const selected = new Set(selectedIds)
  const byId = new Map(nodes.map((node) => [node.id, node]))
  return [...selected].filter((id) => {
    let cursor = byId.get(id)?.parentId
    const seen = new Set<string>()
    while (cursor && !seen.has(cursor)) {
      if (selected.has(cursor)) return false
      seen.add(cursor)
      cursor = byId.get(cursor)?.parentId
    }
    return true
  })
}

export function matricesApproximatelyEqual(a: readonly number[], b: readonly number[], epsilon = 1e-5) {
  if (a.length !== 16 || b.length !== 16) return false
  const scale = Math.max(1, ...a.map((value) => Math.abs(value)), ...b.map((value) => Math.abs(value)))
  return a.every((value, index) => Math.abs(value - b[index]) <= epsilon * scale)
}

export function cloneTransform(transform: StudioTransform): StudioTransform {
  return {
    position: [...transform.position] as StudioVec3,
    rotation: [...transform.rotation] as StudioVec3,
    scale: [...transform.scale] as StudioVec3,
  }
}
