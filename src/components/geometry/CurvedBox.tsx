import { useMemo, type ReactNode } from 'react'
import * as THREE from 'three'
import type { ThreeElements } from '@react-three/fiber'

type CurvedBoxProps = Omit<ThreeElements['mesh'], 'args'> & {
  args?: [number, number, number]
  radius?: number
  smoothness?: number
  children?: ReactNode
}

function signedPow(value: number, power: number) {
  return Math.sign(value) * Math.pow(Math.abs(value), power)
}

function buildCurvedBox(width: number, height: number, depth: number, radius: number, smoothness: number) {
  const uSegments = Math.max(18, Math.min(40, smoothness * 4))
  const vSegments = Math.max(10, Math.min(24, smoothness * 2))
  const vertices: number[] = []
  const indices: number[] = []
  const minDimension = Math.max(0.001, Math.min(width, height, depth))
  const softness = THREE.MathUtils.clamp(radius / minDimension, 0.025, 0.48)
  const exponent = THREE.MathUtils.clamp(7.5 - softness * 12, 2.25, 6.2)
  const power = 2 / exponent

  for (let j = 0; j <= vSegments; j += 1) {
    const phi = -Math.PI / 2 + (j / vSegments) * Math.PI
    const cphi = Math.cos(phi)
    const sphi = Math.sin(phi)
    for (let i = 0; i <= uSegments; i += 1) {
      const theta = (i / uSegments) * Math.PI * 2
      const ctheta = Math.cos(theta)
      const stheta = Math.sin(theta)
      const x = (width * 0.5) * signedPow(cphi, power) * signedPow(ctheta, power)
      const y = (height * 0.5) * signedPow(sphi, power)
      const z = (depth * 0.5) * signedPow(cphi, power) * signedPow(stheta, power)
      vertices.push(x, y, z)
    }
  }

  const row = uSegments + 1
  for (let j = 0; j < vSegments; j += 1) {
    for (let i = 0; i < uSegments; i += 1) {
      const a = j * row + i
      const b = a + 1
      const c = a + row
      const d = c + 1
      indices.push(a, c, b, b, c, d)
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  geometry.computeBoundingSphere()
  return geometry
}

export function CurvedBox({ args = [1, 1, 1], radius = 0.1, smoothness = 6, children, ...meshProps }: CurvedBoxProps) {
  const [width, height, depth] = args
  const geometry = useMemo(
    () => buildCurvedBox(width, height, depth, radius, smoothness),
    [width, height, depth, radius, smoothness],
  )

  return <mesh {...meshProps} geometry={geometry}>{children}</mesh>
}

export default CurvedBox
