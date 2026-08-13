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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const geometry = useMemo(factory, deps)
  useEffect(() => () => geometry.dispose(), [geometry])
  return geometry
}

export function buildLoftGeometry(stations: LoftStation[], radialSegments = 36) {
  if (stations.length < 2) throw new Error('LoftSurface requires at least two stations')
  const vertices: number[] = []
  const uvs: number[] = []
  const indices: number[] = []

  stations.forEach((station, s) => {
    const exponent = station.exponent ?? 3.4
    const power = 2 / exponent
    const twist = station.twist ?? 0
    for (let i = 0; i < radialSegments; i += 1) {
      const theta = (i / radialSegments) * Math.PI * 2 + twist
      const c = signedPow(Math.cos(theta), power)
      const si = signedPow(Math.sin(theta), power)
      const y = (station.y ?? 0) + station.height * si
      const z = (station.z ?? 0) + station.width * c
      vertices.push(station.x, y, z)
      uvs.push(s / Math.max(1, stations.length - 1), i / radialSegments)
    }
  })

  for (let s = 0; s < stations.length - 1; s += 1) {
    const row = s * radialSegments
    const next = (s + 1) * radialSegments
    for (let i = 0; i < radialSegments; i += 1) {
      const j = (i + 1) % radialSegments
      indices.push(row + i, next + i, row + j, row + j, next + i, next + j)
    }
  }

  for (const [stationIndex, flip] of [[0, true], [stations.length - 1, false]] as const) {
    const station = stations[stationIndex]
    const centerIndex = vertices.length / 3
    vertices.push(station.x, station.y ?? 0, station.z ?? 0)
    uvs.push(stationIndex === 0 ? 0 : 1, 0.5)
    const row = stationIndex * radialSegments
    for (let i = 0; i < radialSegments; i += 1) {
      const j = (i + 1) % radialSegments
      if (flip) indices.push(centerIndex, row + j, row + i)
      else indices.push(centerIndex, row + i, row + j)
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
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
