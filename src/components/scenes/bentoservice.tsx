import { useMemo } from 'react'
import * as THREE from 'three'

function roundedRectShape(width: number, height: number, radius: number) {
  const x = -width / 2
  const y = -height / 2
  const shape = new THREE.Shape()
  shape.moveTo(x + radius, y)
  shape.lineTo(x + width - radius, y)
  shape.quadraticCurveTo(x + width, y, x + width, y + radius)
  shape.lineTo(x + width, y + height - radius)
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  shape.lineTo(x + radius, y + height)
  shape.quadraticCurveTo(x, y + height, x, y + height - radius)
  shape.lineTo(x, y + radius)
  shape.quadraticCurveTo(x, y, x + radius, y)
  shape.closePath()
  return shape
}

function makeSuperellipsoid(rx: number, ry: number, rz: number, n = 2.8) {
  const uSegments = 28
  const vSegments = 18
  const vertices: number[] = []
  const indices: number[] = []
  const signedPow = (v: number, p: number) => Math.sign(v) * Math.pow(Math.abs(v), p)
  for (let j = 0; j <= vSegments; j += 1) {
    const phi = -Math.PI / 2 + (j / vSegments) * Math.PI
    for (let i = 0; i <= uSegments; i += 1) {
      const theta = (i / uSegments) * Math.PI * 2
      const cphi = Math.cos(phi)
      const x = rx * signedPow(cphi, 2 / n) * signedPow(Math.cos(theta), 2 / n)
      const y = ry * signedPow(Math.sin(phi), 2 / n)
      const z = rz * signedPow(cphi, 2 / n) * signedPow(Math.sin(theta), 2 / n)
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
  return geometry
}

function makeLeaf(length: number, width: number) {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.bezierCurveTo(width * 0.8, length * 0.22, width * 0.68, length * 0.76, 0, length)
  shape.bezierCurveTo(-width * 0.68, length * 0.76, -width * 0.8, length * 0.22, 0, 0)
  return new THREE.ShapeGeometry(shape, 20)
}

function BentoService() {
  const tray = useMemo(() => new THREE.ExtrudeGeometry(roundedRectShape(2.55, 1.9, 0.22), {
    depth: 0.18,
    bevelEnabled: true,
    bevelSize: 0.055,
    bevelThickness: 0.045,
    bevelSegments: 5,
    curveSegments: 12,
  }), [])
  const well = useMemo(() => new THREE.ExtrudeGeometry(roundedRectShape(0.93, 0.7, 0.14), {
    depth: 0.08,
    bevelEnabled: true,
    bevelSize: 0.035,
    bevelThickness: 0.03,
    bevelSegments: 4,
    curveSegments: 10,
  }), [])
  const rice = useMemo(() => makeSuperellipsoid(0.37, 0.16, 0.26, 2.35), [])
  const salmon = useMemo(() => makeSuperellipsoid(0.43, 0.095, 0.26, 3.4), [])
  const tamago = useMemo(() => makeSuperellipsoid(0.18, 0.11, 0.14, 4.2), [])
  const leaf = useMemo(() => makeLeaf(0.36, 0.095), [])

  return (
    <group position={[0, -0.38, 0]} rotation={[0.3, -0.4, 0]}>
      <mesh geometry={tray} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.96]} castShadow>
        <meshPhysicalMaterial color="#2f2d2c" roughness={0.38} clearcoat={0.18} />
      </mesh>

      {[[-0.58, 0.18, 0.43], [0.58, 0.18, 0.43], [-0.58, 0.18, -0.43], [0.58, 0.18, -0.43]].map((p, i) => (
        <mesh key={i} geometry={well} rotation={[-Math.PI / 2, 0, 0]} position={[p[0], p[1], p[2] + 0.35]}>
          <meshPhysicalMaterial color="#d8d1c5" roughness={0.54} />
        </mesh>
      ))}

      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} geometry={rice} position={[-0.75 + i * 0.11, 0.34 + (i % 2) * 0.025, 0.43]} scale={[0.48, 0.48, 0.48]} rotation={[0, i * 0.36, 0]}>
          <meshPhysicalMaterial color="#e8e2d5" roughness={0.62} />
        </mesh>
      ))}

      <mesh geometry={salmon} position={[0.58, 0.36, 0.43]} rotation={[0.02, -0.18, 0.05]}>
        <meshPhysicalMaterial color="#d96f54" roughness={0.46} clearcoat={0.06} />
      </mesh>
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={`line-${i}`} position={[0.42 + i * 0.1, 0.455, 0.43]} rotation={[0, 0, 0.18]} scale={[0.012, 0.025, 0.24]}>
          <sphereGeometry args={[1, 14, 10]} />
          <meshBasicMaterial color="#f2b39d" />
        </mesh>
      ))}

      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={`leaf-${i}`} geometry={leaf} position={[-0.7 + i * 0.14, 0.32, -0.56 + (i % 2) * 0.07]} rotation={[Math.PI / 2.45, 0, -0.75 + i * 0.28]} scale={[0.82, 0.82, 0.82]}>
          <meshPhysicalMaterial color={i % 2 ? '#5d7d5d' : '#496e50'} roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={`tamago-${i}`} geometry={tamago} position={[0.38 + i * 0.13, 0.34, -0.43]} rotation={[0, i * 0.12, 0]}>
          <meshPhysicalMaterial color="#d6a44d" roughness={0.47} />
        </mesh>
      ))}

      <mesh position={[0, -0.2, 0]} scale={[1.5, 0.04, 1.13]}>
        <sphereGeometry args={[1, 36, 16]} />
        <meshPhysicalMaterial color="#aaa59d" roughness={0.8} />
      </mesh>
    </group>
  )
}

export default BentoService
