import { useMemo } from 'react'
import * as THREE from 'three'

function makeLoftGeometry(sections: Array<{ y: number; width: number; depth: number; x?: number; z?: number }>, radialSegments = 28) {
  const vertices: number[] = []
  const indices: number[] = []
  for (const section of sections) {
    for (let i = 0; i < radialSegments; i += 1) {
      const a = (i / radialSegments) * Math.PI * 2
      const x = (section.x ?? 0) + Math.cos(a) * section.width
      const z = (section.z ?? 0) + Math.sin(a) * section.depth
      vertices.push(x, section.y, z)
    }
  }
  for (let s = 0; s < sections.length - 1; s += 1) {
    for (let i = 0; i < radialSegments; i += 1) {
      const j = (i + 1) % radialSegments
      const a = s * radialSegments + i
      const b = s * radialSegments + j
      const c = (s + 1) * radialSegments + i
      const d = (s + 1) * radialSegments + j
      indices.push(a, c, b, b, c, d)
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

function makeSweptFinger(points: THREE.Vector3[], startRadius: number, endRadius: number) {
  const curve = new THREE.CatmullRomCurve3(points)
  const segments = 34
  const radialSegments = 14
  const frames = curve.computeFrenetFrames(segments, false)
  const vertices: number[] = []
  const indices: number[] = []

  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments
    const p = curve.getPointAt(t)
    const radius = THREE.MathUtils.lerp(startRadius, endRadius, t) * (1 - 0.08 * Math.sin(t * Math.PI * 3))
    const depthRadius = radius * 0.72
    const normal = frames.normals[i]
    const binormal = frames.binormals[i]
    for (let j = 0; j < radialSegments; j += 1) {
      const a = (j / radialSegments) * Math.PI * 2
      const offset = normal.clone().multiplyScalar(Math.cos(a) * radius).add(binormal.clone().multiplyScalar(Math.sin(a) * depthRadius))
      vertices.push(p.x + offset.x, p.y + offset.y, p.z + offset.z)
    }
  }

  for (let i = 0; i < segments; i += 1) {
    for (let j = 0; j < radialSegments; j += 1) {
      const k = (j + 1) % radialSegments
      const a = i * radialSegments + j
      const b = i * radialSegments + k
      const c = (i + 1) * radialSegments + j
      const d = (i + 1) * radialSegments + k
      indices.push(a, c, b, b, c, d)
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

function ProstheticHand() {
  const palm = useMemo(() => makeLoftGeometry([
    { y: -0.58, width: 0.34, depth: 0.16 },
    { y: -0.28, width: 0.5, depth: 0.2 },
    { y: 0.08, width: 0.56, depth: 0.19 },
    { y: 0.38, width: 0.49, depth: 0.15 },
    { y: 0.5, width: 0.39, depth: 0.12 },
  ]), [])
  const wrist = useMemo(() => makeLoftGeometry([
    { y: -1.0, width: 0.28, depth: 0.2 },
    { y: -0.78, width: 0.31, depth: 0.21 },
    { y: -0.58, width: 0.34, depth: 0.17 },
  ], 24), [])

  const fingers = useMemo(() => {
    const specs = [
      { x: -0.34, length: 0.82, lean: -0.04, radius: 0.085 },
      { x: -0.12, length: 0.97, lean: -0.015, radius: 0.09 },
      { x: 0.11, length: 1.0, lean: 0.015, radius: 0.092 },
      { x: 0.33, length: 0.88, lean: 0.045, radius: 0.082 },
    ]
    return specs.map((spec) => makeSweptFinger([
      new THREE.Vector3(spec.x, 0.4, 0),
      new THREE.Vector3(spec.x + spec.lean, 0.7, -0.015),
      new THREE.Vector3(spec.x + spec.lean * 1.8, 0.97, 0.012),
      new THREE.Vector3(spec.x + spec.lean * 2.6, 0.4 + spec.length, 0.03),
    ], spec.radius, spec.radius * 0.7))
  }, [])
  const thumb = useMemo(() => makeSweptFinger([
    new THREE.Vector3(-0.46, -0.02, 0.02),
    new THREE.Vector3(-0.64, 0.05, 0.08),
    new THREE.Vector3(-0.78, 0.22, 0.11),
    new THREE.Vector3(-0.9, 0.4, 0.1),
  ], 0.1, 0.07), [])
  const knuckleRail = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.4, 0.4, 0.12),
    new THREE.Vector3(-0.14, 0.48, 0.14),
    new THREE.Vector3(0.14, 0.48, 0.14),
    new THREE.Vector3(0.4, 0.4, 0.12),
  ]), [])
  const collarProfile = useMemo(() => [
    new THREE.Vector2(0, -0.08),
    new THREE.Vector2(0.3, -0.08),
    new THREE.Vector2(0.35, -0.02),
    new THREE.Vector2(0.35, 0.08),
    new THREE.Vector2(0.29, 0.12),
    new THREE.Vector2(0, 0.12),
  ], [])

  return (
    <group position={[0, -0.42, 0]} rotation={[0.18, -0.42, -0.08]}>
      <mesh geometry={palm} castShadow>
        <meshPhysicalMaterial color="#566266" metalness={0.55} roughness={0.27} clearcoat={0.24} />
      </mesh>
      <mesh geometry={wrist}>
        <meshPhysicalMaterial color="#394346" metalness={0.62} roughness={0.3} />
      </mesh>

      {fingers.map((geometry, i) => (
        <mesh key={i} geometry={geometry}>
          <meshPhysicalMaterial color={i % 2 ? '#aeb5b6' : '#969fa1'} metalness={0.82} roughness={0.22} />
        </mesh>
      ))}
      <mesh geometry={thumb}>
        <meshPhysicalMaterial color="#a8b0b2" metalness={0.82} roughness={0.22} />
      </mesh>

      <mesh>
        <tubeGeometry args={[knuckleRail, 48, 0.035, 10, false]} />
        <meshPhysicalMaterial color="#7ad5ca" metalness={0.42} roughness={0.22} />
      </mesh>

      <mesh position={[0, -1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <latheGeometry args={[collarProfile, 48]} />
        <meshPhysicalMaterial color="#8fbcb6" metalness={0.55} roughness={0.2} />
      </mesh>

      {[[-0.33, 0.4], [-0.11, 0.48], [0.11, 0.48], [0.33, 0.4]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.13]}>
          <torusGeometry args={[0.075, 0.014, 10, 28]} />
          <meshPhysicalMaterial color="#d0d5d5" metalness={0.92} roughness={0.16} />
        </mesh>
      ))}
    </group>
  )
}

export default ProstheticHand
