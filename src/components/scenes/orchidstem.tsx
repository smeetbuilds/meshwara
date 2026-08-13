import { useMemo } from 'react'
import * as THREE from 'three'

function makePetalGeometry(length: number, width: number, curl: number, twist: number) {
  const uSegments = 18
  const vSegments = 10
  const vertices: number[] = []
  const indices: number[] = []

  for (let i = 0; i <= uSegments; i += 1) {
    const u = i / uSegments
    const envelope = Math.pow(Math.sin(Math.PI * u), 0.72) * (1 - 0.08 * u)
    for (let j = 0; j <= vSegments; j += 1) {
      const v = (j / vSegments) * 2 - 1
      let x = v * width * envelope
      const y = u * length
      let z = curl * Math.sin(Math.PI * u) * (1 - v * v) + 0.055 * u * u
      const angle = twist * u + v * 0.06
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const tx = x * cos - z * sin
      z = x * sin + z * cos
      x = tx
      vertices.push(x, y, z)
    }
  }

  const row = vSegments + 1
  for (let i = 0; i < uSegments; i += 1) {
    for (let j = 0; j < vSegments; j += 1) {
      const a = i * row + j
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
  return geometry
}

function makeLeafGeometry(length: number, width: number, arch: number) {
  const uSegments = 22
  const vSegments = 8
  const vertices: number[] = []
  const indices: number[] = []
  for (let i = 0; i <= uSegments; i += 1) {
    const u = i / uSegments
    const envelope = Math.pow(Math.sin(Math.PI * u), 0.78) * (1 - 0.24 * u)
    for (let j = 0; j <= vSegments; j += 1) {
      const v = (j / vSegments) * 2 - 1
      const x = v * width * envelope
      const y = u * length
      const z = arch * Math.sin(Math.PI * u) + Math.abs(v) * 0.035
      vertices.push(x, y, z)
    }
  }
  const row = vSegments + 1
  for (let i = 0; i < uSegments; i += 1) {
    for (let j = 0; j < vSegments; j += 1) {
      const a = i * row + j
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
  return geometry
}

function Flower({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  const broad = useMemo(() => makePetalGeometry(0.54, 0.22, 0.13, 0.12), [])
  const narrow = useMemo(() => makePetalGeometry(0.5, 0.17, 0.17, -0.1), [])
  const lip = useMemo(() => makePetalGeometry(0.36, 0.19, 0.22, 0.22), [])
  const petals = [
    { a: -1.0, z: -0.02, geometry: broad },
    { a: -0.26, z: 0.01, geometry: broad },
    { a: 0.52, z: 0.03, geometry: narrow },
    { a: 1.22, z: 0.01, geometry: narrow },
    { a: 2.2, z: -0.02, geometry: broad },
  ]
  return (
    <group position={position} rotation={[0.2, rotation, 0.08]}>
      {petals.map((petal, i) => (
        <mesh key={i} geometry={petal.geometry} rotation={[0.44, 0, petal.a]} position={[0, 0, petal.z]}>
          <meshPhysicalMaterial color={i % 2 ? '#efdce5' : '#e7d0db'} roughness={0.48} clearcoat={0.12} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <mesh geometry={lip} rotation={[0.78, 0, Math.PI]} position={[0, 0.02, 0.04]}>
        <meshPhysicalMaterial color="#c88ca6" roughness={0.45} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.08, 0.07]} scale={[0.08, 0.13, 0.08]}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshPhysicalMaterial color="#bd925f" roughness={0.32} />
      </mesh>
    </group>
  )
}

function OrchidStem() {
  const stem = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.85, 0),
    new THREE.Vector3(-0.08, -0.05, 0.04),
    new THREE.Vector3(0.18, 0.72, 0.02),
    new THREE.Vector3(0.05, 1.55, 0),
  ]), [])
  const leftLeaf = useMemo(() => makeLeafGeometry(1.05, 0.26, 0.12), [])
  const rightLeaf = useMemo(() => makeLeafGeometry(0.95, 0.24, 0.1), [])
  const potProfile = useMemo(() => [
    new THREE.Vector2(0.0, -0.23),
    new THREE.Vector2(0.39, -0.23),
    new THREE.Vector2(0.44, -0.18),
    new THREE.Vector2(0.5, 0.15),
    new THREE.Vector2(0.48, 0.2),
    new THREE.Vector2(0.0, 0.2),
  ], [])

  return (
    <group rotation={[0.04, -0.3, 0]}>
      <mesh>
        <tubeGeometry args={[stem, 112, 0.032, 14, false]} />
        <meshPhysicalMaterial color="#4f7058" roughness={0.68} />
      </mesh>
      <Flower position={[0.12, 0.72, 0.03]} rotation={0.2} />
      <Flower position={[-0.06, 1.12, 0.02]} rotation={-0.15} />
      <Flower position={[0.1, 1.52, 0.02]} rotation={0.35} />

      <mesh geometry={leftLeaf} position={[-0.1, -0.53, 0.02]} rotation={[0.44, 0.62, 0.62]}>
        <meshPhysicalMaterial color="#476f58" roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={rightLeaf} position={[0.08, -0.42, -0.02]} rotation={[0.4, -0.74, -0.58]}>
        <meshPhysicalMaterial color="#557a61" roughness={0.7} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[0, -1.05, 0]} rotation={[0, 0, 0]}>
        <latheGeometry args={[potProfile, 64]} />
        <meshPhysicalMaterial color="#6d6253" roughness={0.66} clearcoat={0.06} />
      </mesh>
    </group>
  )
}

export default OrchidStem
