import { useEffect, useMemo, type ReactNode } from 'react'
import type { ThreeElements } from '@react-three/fiber'
import * as THREE from 'three'

export type LoftStation = {
  x: number
  y?: number
  z?: number
  width: number
  height: number
  exponent?: number
  twist?: number
}

type MeshProps = Omit<ThreeElements['mesh'], 'geometry'> & { children?: ReactNode }

function signedPow(value: number, power: number) {
  return Math.sign(value) * Math.pow(Math.abs(value), power)
}

function useDisposableGeometry(factory: () => THREE.BufferGeometry, deps: readonly unknown[]) {
  const geometry = useMemo(factory, deps)
  useEffect(() => () => geometry.dispose(), [geometry])
  return geometry
}

/**
 * Generate one continuous rounded/superelliptic loft with watertight caps.
 *
 * Side surface UV seams have separate vertices, so U/V=0 and U/V=1 never
 * share triangles. The seam's normals are averaged to remove a lighting
 * crease. End-cap vertices are independent so their normals stay flat and
 * point *outward* instead of being smoothed together with the side shell.
 *
 * The original implementation wrapped the final side triangle directly
 * from v~1 to v=0, which stretched image textures across the entire seam;
 * both cap winding directions were also reversed.
 */
export function buildLoftGeometry(stations: LoftStation[], radialSegments = 36) {
  if (stations.length < 2) throw new Error('LoftSurface requires at least two stations')
  if (!Number.isInteger(radialSegments) || radialSegments < 8 || radialSegments > 256) {
    throw new Error('LoftSurface radialSegments must be an integer in [8, 256]')
  }
  for (const [index, station] of stations.entries()) {
    if (![station.x, station.y ?? 0, station.z ?? 0, station.width, station.height, station.exponent ?? 3.4, station.twist ?? 0]
      .every(Number.isFinite)) throw new Error('LoftSurface station ' + index + ' has non-finite coordinates')
    if (station.width < 0 || station.height < 0 || (station.exponent ?? 3.4) <= 0)
      throw new Error('LoftSurface station ' + index + ' has invalid dimensions')
  }

  const positions: number[] = []
  const uvs: number[] = []
  const indices: number[] = []
  const stride = radialSegments + 1

  const ringPosition = (station: LoftStation, sample: number): [number, number, number] => {
    const power = 2 / (station.exponent ?? 3.4)
    const theta = (sample / radialSegments) * Math.PI * 2 + (station.twist ?? 0)
    const y = (station.y ?? 0) + station.height * signedPow(Math.sin(theta), power)
    const z = (station.z ?? 0) + station.width * signedPow(Math.cos(theta), power)
    return [station.x, y, z]
  }

  // Side rows use radialSegments+1, duplicating the longitudinal UV seam.
  stations.forEach((station, row) => {
    for (let i = 0; i <= radialSegments; i += 1) {
      const [x, y, z] = ringPosition(station, i)
      positions.push(x, y, z)
      uvs.push(row / (stations.length - 1), i / radialSegments)
    }
  })
  for (let row = 0; row < stations.length - 1; row += 1) {
    const a = row * stride
    const b = (row + 1) * stride
    for (let i = 0; i < radialSegments; i += 1) {
      indices.push(a + i, b + i, a + i + 1)
      indices.push(a + i + 1, b + i, b + i + 1)
    }
  }

  // Independent cap perimeter rings preserve sharp manufactured edges.
  // From +z toward +y, the perimeter winds toward -X; reverse the last cap.
  for (const [row, isFirst] of [[0, true], [stations.length - 1, false]] as const) {
    const station = stations[row]
    const centerIndex = positions.length / 3
    positions.push(station.x, station.y ?? 0, station.z ?? 0)
    uvs.push(0.5, 0.5)
    const capStart = positions.length / 3
    for (let i = 0; i <= radialSegments; i += 1) {
      const [x, y, z] = ringPosition(station, i)
      positions.push(x, y, z)
      uvs.push(
        0.5 + (station.width ? (z - (station.z ?? 0)) / (2 * station.width) : 0),
        0.5 + (station.height ? (y - (station.y ?? 0)) / (2 * station.height) : 0),
      )
    }
    for (let i = 0; i < radialSegments; i += 1) {
      if (isFirst) indices.push(centerIndex, capStart + i, capStart + i + 1)
      else indices.push(centerIndex, capStart + i + 1, capStart + i)
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()

  const normal = geometry.getAttribute('normal')
  for (let row = 0; row < stations.length; row += 1) {
    const first = row * stride
    const last = first + radialSegments
    const nx = normal.getX(first) + normal.getX(last)
    const ny = normal.getY(first) + normal.getY(last)
    const nz = normal.getZ(first) + normal.getZ(last)
    const length = Math.hypot(nx, ny, nz) || 1
    normal.setXYZ(first, nx / length, ny / length, nz / length)
    normal.setXYZ(last, nx / length, ny / length, nz / length)
  }
  normal.needsUpdate = true
  geometry.computeBoundingBox()
  geometry.computeBoundingSphere()
  return geometry
}

export function LoftSurface({ stations, radialSegments = 36, children, ...props }: MeshProps & { stations: LoftStation[]; radialSegments?: number }) {
  const geometry = useDisposableGeometry(() => buildLoftGeometry(stations, radialSegments), [stations, radialSegments])
  return <mesh {...props} geometry={geometry}>{children}</mesh>
}

export function RevolvedSurface({ profile, radialSegments = 56, children, ...props }: MeshProps & { profile: Array<[number, number]>; radialSegments?: number }) {
  const geometry = useDisposableGeometry(
    () => new THREE.LatheGeometry(profile.map(([radius, y]) => new THREE.Vector2(radius, y)), radialSegments),
    [profile, radialSegments],
  )
  return <mesh {...props} geometry={geometry}>{children}</mesh>
}

export function SplineTube({ points, radius = 0.03, tubularSegments = 64, radialSegments = 10, closed = false, children, ...props }: MeshProps & {
  points: Array<[number, number, number]>
  radius?: number
  tubularSegments?: number
  radialSegments?: number
  closed?: boolean
}) {
  const geometry = useDisposableGeometry(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), closed, 'centripetal')
    return new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, closed)
  }, [points, radius, tubularSegments, radialSegments, closed])
  return <mesh {...props} geometry={geometry}>{children}</mesh>
}

export function ExtrudedProfile({ points, depth = 0.12, bevelSize = 0.025, bevelThickness = 0.025, bevelSegments = 4, children, ...props }: MeshProps & {
  points: Array<[number, number]>
  depth?: number
  bevelSize?: number
  bevelThickness?: number
  bevelSegments?: number
}) {
  const geometry = useDisposableGeometry(() => {
    const shape = new THREE.Shape()
    points.forEach(([x, y], i) => i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y))
    shape.closePath()
    const g = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelSize,
      bevelThickness,
      bevelSegments,
      curveSegments: 16,
    })
    g.center()
    return g
  }, [points, depth, bevelSize, bevelThickness, bevelSegments])
  return <mesh {...props} geometry={geometry}>{children}</mesh>
}

export function LeafSurface({
  length = 0.8,
  width = 0.32,
  camber = 0.06,
  curl = 0,
  twist = 0,
  serration = 0,
  lengthSegments = 24,
  widthSegments = 8,
  children,
  ...props
}: MeshProps & {
  length?: number
  width?: number
  camber?: number
  curl?: number
  twist?: number
  serration?: number
  lengthSegments?: number
  widthSegments?: number
}) {
  const geometry = useDisposableGeometry(() => {
    const vertices: number[] = []
    const uvs: number[] = []
    const indices: number[] = []
    for (let ix = 0; ix <= lengthSegments; ix += 1) {
      const t = ix / lengthSegments
      const x = (t - 0.5) * length
      const envelope = Math.pow(Math.sin(Math.PI * t), 0.72)
      const serrated = serration > 0 ? 1 + Math.sin(t * Math.PI * serration * 2) * 0.045 : 1
      const localTwist = twist * (t - 0.5)
      const cs = Math.cos(localTwist)
      const sn = Math.sin(localTwist)
      for (let iy = 0; iy <= widthSegments; iy += 1) {
        const v = iy / widthSegments
        const lateral = (v - 0.5) * 2
        const baseY = lateral * width * 0.5 * envelope * serrated
        const baseZ = camber * (1 - lateral * lateral) * Math.sin(Math.PI * t) + curl * t * t
        const y = baseY * cs - baseZ * sn
        const z = baseY * sn + baseZ * cs
        vertices.push(x, y, z)
        uvs.push(t, v)
      }
    }
    const row = widthSegments + 1
    for (let ix = 0; ix < lengthSegments; ix += 1) {
      for (let iy = 0; iy < widthSegments; iy += 1) {
        const a = ix * row + iy
        const b = a + row
        indices.push(a, b, a + 1, a + 1, b, b + 1)
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
    g.setIndex(indices)
    g.computeVertexNormals()
    g.computeBoundingBox()
    g.computeBoundingSphere()
    return g
  }, [length, width, camber, curl, twist, serration, lengthSegments, widthSegments])
  return <mesh {...props} geometry={geometry}>{children}</mesh>
}
