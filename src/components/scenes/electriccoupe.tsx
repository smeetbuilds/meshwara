import { useMemo } from 'react'
import * as THREE from 'three'

type Station = { x: number; width: number; centerY: number; height: number; exponent?: number }

function superellipse(value: number, exponent: number) {
  return Math.sign(value) * Math.pow(Math.abs(value), 2 / exponent)
}

function buildLoft(stations: Station[], radialSegments = 30) {
  const vertices: number[] = []
  const indices: number[] = []
  for (const station of stations) {
    const n = station.exponent ?? 3.6
    for (let i = 0; i < radialSegments; i += 1) {
      const theta = (i / radialSegments) * Math.PI * 2
      const z = station.width * superellipse(Math.cos(theta), n)
      const yShape = superellipse(Math.sin(theta), n)
      const lowerBias = yShape < 0 ? 0.72 : 1
      const y = station.centerY + station.height * yShape * lowerBias
      vertices.push(station.x, y, z)
    }
  }

  for (let s = 0; s < stations.length - 1; s += 1) {
    const row = s * radialSegments
    const next = (s + 1) * radialSegments
    for (let i = 0; i < radialSegments; i += 1) {
      const j = (i + 1) % radialSegments
      indices.push(row + i, next + i, row + j, row + j, next + i, next + j)
    }
  }

  for (const [row, flip] of [[0, true], [(stations.length - 1) * radialSegments, false]] as const) {
    const centerIndex = vertices.length / 3
    const station = stations[flip ? 0 : stations.length - 1]
    vertices.push(station.x, station.centerY, 0)
    for (let i = 0; i < radialSegments; i += 1) {
      const j = (i + 1) % radialSegments
      if (flip) indices.push(centerIndex, row + j, row + i)
      else indices.push(centerIndex, row + i, row + j)
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

function Wheel({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, -0.38, z]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.34, 0.11, 20, 64]} />
        <meshStandardMaterial color="#151718" roughness={0.58} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.09, 48]} />
        <meshPhysicalMaterial color="#747b7e" metalness={0.95} roughness={0.16} />
      </mesh>
      {Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.14, Math.sin(a) * 0.14, z > 0 ? 0.055 : -0.055]} rotation={[0, 0, a]}>
            <boxGeometry args={[0.035, 0.22, 0.025]} />
            <meshPhysicalMaterial color="#b8bec0" metalness={1} roughness={0.17} />
          </mesh>
        )
      })}
    </group>
  )
}

function ElectricCoupe() {
  const body = useMemo(() => buildLoft([
    { x: -1.92, width: 0.58, centerY: 0.02, height: 0.27, exponent: 3.1 },
    { x: -1.58, width: 0.74, centerY: 0.05, height: 0.37 },
    { x: -0.92, width: 0.8, centerY: 0.06, height: 0.42 },
    { x: -0.15, width: 0.82, centerY: 0.08, height: 0.44 },
    { x: 0.72, width: 0.8, centerY: 0.06, height: 0.4 },
    { x: 1.42, width: 0.73, centerY: 0.02, height: 0.31 },
    { x: 1.92, width: 0.5, centerY: -0.01, height: 0.2, exponent: 2.8 },
  ]), [])

  const canopy = useMemo(() => buildLoft([
    { x: -0.92, width: 0.45, centerY: 0.47, height: 0.18, exponent: 2.8 },
    { x: -0.55, width: 0.61, centerY: 0.61, height: 0.29, exponent: 3.1 },
    { x: 0.05, width: 0.64, centerY: 0.67, height: 0.31, exponent: 3.2 },
    { x: 0.62, width: 0.55, centerY: 0.58, height: 0.27, exponent: 3 },
    { x: 1.02, width: 0.36, centerY: 0.45, height: 0.14, exponent: 2.7 },
  ], 28), [])

  const shoulder = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.72, 0.34, 0.79),
    new THREE.Vector3(-0.72, 0.47, 0.85),
    new THREE.Vector3(0.46, 0.46, 0.84),
    new THREE.Vector3(1.58, 0.28, 0.73),
  ]), [])

  return (
    <group position={[0, -0.2, 0]} rotation={[0.02, -0.42, 0]}>
      <mesh geometry={body} castShadow receiveShadow>
        <meshPhysicalMaterial color="#536a72" metalness={0.42} roughness={0.2} clearcoat={0.9} clearcoatRoughness={0.12} />
      </mesh>
      <mesh geometry={canopy} position={[0, 0.02, 0]}>
        <meshPhysicalMaterial color="#162b34" metalness={0.12} roughness={0.08} transmission={0.12} clearcoat={1} />
      </mesh>

      <mesh>
        <tubeGeometry args={[shoulder, 92, 0.018, 8, false]} />
        <meshPhysicalMaterial color="#789098" metalness={0.55} roughness={0.2} />
      </mesh>
      <mesh scale={[1, 1, -1]}>
        <tubeGeometry args={[shoulder, 92, 0.018, 8, false]} />
        <meshPhysicalMaterial color="#789098" metalness={0.55} roughness={0.2} />
      </mesh>

      {[-1.18, 1.18].flatMap((x) => [-0.79, 0.79].map((z) => <Wheel key={`${x}-${z}`} x={x} z={z} />))}

      <mesh position={[1.82, 0.16, 0]} rotation={[0, Math.PI / 2, 0]} scale={[0.06, 0.22, 0.94]}>
        <sphereGeometry args={[1, 32, 18]} />
        <meshBasicMaterial color="#f4efe1" toneMapped={false} />
      </mesh>
      <mesh position={[-1.82, 0.15, 0]} rotation={[0, Math.PI / 2, 0]} scale={[0.055, 0.17, 0.9]}>
        <sphereGeometry args={[1, 32, 18]} />
        <meshBasicMaterial color="#da5e55" toneMapped={false} />
      </mesh>

      <mesh position={[0.18, -0.1, 0]} scale={[1.1, 0.08, 0.76]}>
        <sphereGeometry args={[1, 44, 20]} />
        <meshPhysicalMaterial color="#27373c" roughness={0.24} metalness={0.45} />
      </mesh>
    </group>
  )
}

export default ElectricCoupe
