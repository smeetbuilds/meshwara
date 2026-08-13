import { useMemo } from 'react'
import * as THREE from 'three'

function makeLeaflet(length: number, width: number, curl: number) {
  const uSegments = 14
  const vSegments = 6
  const vertices: number[] = []
  const indices: number[] = []
  for (let i = 0; i <= uSegments; i += 1) {
    const u = i / uSegments
    const envelope = Math.pow(Math.sin(Math.PI * u), 0.66) * (1 - 0.18 * u)
    for (let j = 0; j <= vSegments; j += 1) {
      const v = (j / vSegments) * 2 - 1
      const serration = 1 - 0.09 * Math.sin(u * Math.PI * 8) * Math.abs(v)
      const x = v * width * envelope * serration
      const y = u * length
      const z = curl * Math.sin(Math.PI * u) + 0.018 * v * v
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

function FernStudy() {
  const leaflet = useMemo(() => makeLeaflet(0.42, 0.105, 0.035), [])
  const potProfile = useMemo(() => [
    new THREE.Vector2(0, -0.2),
    new THREE.Vector2(0.43, -0.2),
    new THREE.Vector2(0.5, 0.13),
    new THREE.Vector2(0.48, 0.18),
    new THREE.Vector2(0, 0.18),
  ], [])
  const fronds = useMemo(() => Array.from({ length: 9 }, (_, i) => {
    const a = -1.34 + i * 0.335
    const reach = 0.92 + (i % 3) * 0.1
    const lift = 1.2 + (i % 2) * 0.12
    return {
      a,
      curve: new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -0.3, 0),
        new THREE.Vector3(Math.sin(a) * 0.22, 0.22, Math.cos(a) * 0.22),
        new THREE.Vector3(Math.sin(a) * 0.55, 0.76, Math.cos(a) * 0.55),
        new THREE.Vector3(Math.sin(a) * reach, lift, Math.cos(a) * reach),
      ]),
    }
  }), [])

  return (
    <group position={[0, -0.72, 0]} rotation={[0.03, -0.3, 0]}>
      {fronds.map((frond, i) => (
        <group key={i}>
          <mesh>
            <tubeGeometry args={[frond.curve, 72, 0.018, 10, false]} />
            <meshPhysicalMaterial color="#426b53" roughness={0.72} />
          </mesh>
          {Array.from({ length: 11 }, (_, j) => {
            const t = 0.14 + j * 0.068
            const p = frond.curve.getPoint(t)
            const tangent = frond.curve.getTangent(t)
            const yaw = Math.atan2(tangent.x, tangent.z)
            const scale = 0.82 + j * 0.018
            return [-1, 1].map((side) => (
              <mesh
                key={`${j}-${side}`}
                geometry={leaflet}
                position={[p.x, p.y, p.z]}
                rotation={[0.1, yaw + side * 0.82, side * 0.24]}
                scale={[scale, scale, scale]}
              >
                <meshPhysicalMaterial color={j % 2 ? '#527a5f' : '#496f58'} roughness={0.74} side={THREE.DoubleSide} />
              </mesh>
            ))
          })}
        </group>
      ))}

      <mesh position={[0, -0.58, 0]}>
        <latheGeometry args={[potProfile, 64]} />
        <meshPhysicalMaterial color="#655b50" roughness={0.72} />
      </mesh>
    </group>
  )
}

export default FernStudy
