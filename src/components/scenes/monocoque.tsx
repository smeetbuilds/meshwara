import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function buildShellGeometry() {
  const uSegments = 30
  const vSegments = 36
  const thickness = 0.085
  const vertices: number[] = []
  const indices: number[] = []

  const sample = (u: number, s: number) => {
    const across = u * 2 - 1
    let y: number
    let z: number
    let width: number
    let dy: number
    let dz: number

    if (s <= 0.46) {
      const t = s / 0.46
      y = -0.35 + Math.sin(t * Math.PI) * 0.065
      z = 0.78 - t * 1.13
      width = 0.9 - 0.08 * Math.pow(t, 1.7)
      dy = Math.cos(t * Math.PI) * 0.065 * Math.PI / 0.46
      dz = -1.13 / 0.46
    } else {
      const t = (s - 0.46) / 0.54
      y = -0.35 + 1.62 * t - 0.12 * t * t
      z = -0.35 - 0.34 * Math.sin(t * Math.PI * 0.5)
      width = 0.82 - 0.16 * t + 0.025 * Math.sin(t * Math.PI)
      dy = (1.62 - 0.24 * t) / 0.54
      dz = -0.34 * Math.cos(t * Math.PI * 0.5) * Math.PI * 0.5 / 0.54
    }

    const edgeCup = Math.pow(Math.abs(across), 2.4)
    const x = across * width
    y += edgeCup * (s < 0.46 ? 0.055 : 0.025)
    z += edgeCup * (s < 0.46 ? 0.11 : 0.075)

    const len = Math.hypot(dy, dz) || 1
    const ny = -dz / len
    const nz = dy / len
    return { x, y, z, ny, nz }
  }

  for (let side = 0; side < 2; side += 1) {
    const offsetSign = side === 0 ? 1 : -1
    for (let j = 0; j <= vSegments; j += 1) {
      const s = j / vSegments
      for (let i = 0; i <= uSegments; i += 1) {
        const u = i / uSegments
        const p = sample(u, s)
        vertices.push(
          p.x,
          p.y + p.ny * thickness * 0.5 * offsetSign,
          p.z + p.nz * thickness * 0.5 * offsetSign,
        )
      }
    }
  }

  const ring = uSegments + 1
  const surface = ring * (vSegments + 1)
  for (let side = 0; side < 2; side += 1) {
    const base = side * surface
    for (let j = 0; j < vSegments; j += 1) {
      for (let i = 0; i < uSegments; i += 1) {
        const a = base + j * ring + i
        const b = a + 1
        const c = a + ring
        const d = c + 1
        if (side === 0) indices.push(a, c, b, b, c, d)
        else indices.push(a, b, c, b, d, c)
      }
    }
  }

  const connectEdge = (frontOffset: number, backOffset: number, sequence: number[]) => {
    for (let i = 0; i < sequence.length - 1; i += 1) {
      const a = frontOffset + sequence[i]
      const b = frontOffset + sequence[i + 1]
      const c = backOffset + sequence[i]
      const d = backOffset + sequence[i + 1]
      indices.push(a, b, c, b, d, c)
    }
  }

  const bottom = Array.from({ length: ring }, (_, i) => i)
  const top = Array.from({ length: ring }, (_, i) => vSegments * ring + i)
  const left = Array.from({ length: vSegments + 1 }, (_, j) => j * ring)
  const right = Array.from({ length: vSegments + 1 }, (_, j) => j * ring + uSegments)
  connectEdge(0, surface, bottom)
  connectEdge(0, surface, top)
  connectEdge(0, surface, left)
  connectEdge(0, surface, right)

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

function MonocoqueChair() {
  const ref = useRef<THREE.Group>(null)
  const shell = useMemo(() => buildShellGeometry(), [])
  const rearRail = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.66, -0.62, -0.49),
    new THREE.Vector3(0, -0.68, -0.56),
    new THREE.Vector3(0.66, -0.62, -0.49),
  ]), [])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.14) * 0.24
  })

  return (
    <group ref={ref} rotation={[0.02, -0.34, 0]} position={[0, -0.12, 0]}>
      <mesh geometry={shell} castShadow receiveShadow>
        <meshPhysicalMaterial color="#d7cfc1" roughness={0.3} clearcoat={0.34} clearcoatRoughness={0.22} />
      </mesh>

      {[-0.67, 0.67].map((x) => (
        <group key={x}>
          <mesh position={[x, -0.96, 0.48]} rotation={[0.08, 0, x * -0.075]}>
            <cylinderGeometry args={[0.052, 0.072, 1.3, 28]} />
            <meshPhysicalMaterial color="#282a2b" metalness={0.92} roughness={0.18} />
          </mesh>
          <mesh position={[x, -0.94, -0.46]} rotation={[-0.08, 0, x * 0.075]}>
            <cylinderGeometry args={[0.05, 0.07, 1.22, 28]} />
            <meshPhysicalMaterial color="#282a2b" metalness={0.92} roughness={0.18} />
          </mesh>
        </group>
      ))}

      <mesh>
        <tubeGeometry args={[rearRail, 56, 0.04, 12, false]} />
        <meshPhysicalMaterial color="#a97d57" roughness={0.33} clearcoat={0.1} />
      </mesh>

      <mesh position={[0, -0.38, 0.1]} rotation={[-0.08, 0, 0]} scale={[0.78, 0.055, 0.54]}>
        <sphereGeometry args={[1, 40, 24]} />
        <meshPhysicalMaterial color="#ebe5da" roughness={0.58} sheen={0.25} sheenRoughness={0.7} />
      </mesh>
    </group>
  )
}

export default MonocoqueChair
