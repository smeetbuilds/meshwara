import { RoundedBox } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

function AeroRunner() {
  const sole = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-1.5, -0.18)
    shape.bezierCurveTo(-1.38, -0.38, -0.55, -0.43, 0.18, -0.39)
    shape.bezierCurveTo(0.82, -0.36, 1.35, -0.24, 1.5, -0.02)
    shape.bezierCurveTo(1.18, 0.08, 0.38, 0.12, -0.42, 0.08)
    shape.bezierCurveTo(-0.98, 0.05, -1.38, -0.02, -1.5, -0.18)
    return shape
  }, [])
  const upper = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-1.16, -0.04)
    shape.bezierCurveTo(-0.95, 0.2, -0.58, 0.72, -0.18, 0.78)
    shape.bezierCurveTo(0.38, 0.82, 0.82, 0.48, 1.24, 0.12)
    shape.bezierCurveTo(0.84, 0.03, 0.25, -0.01, -0.28, 0.02)
    shape.bezierCurveTo(-0.72, 0.04, -1.02, 0.02, -1.16, -0.04)
    return shape
  }, [])

  return (
    <group rotation={[0.18, -0.52, -0.08]} position={[0, -0.1, 0]} scale={1.05}>
      <mesh geometry={new THREE.ExtrudeGeometry(sole, { depth: 0.72, bevelEnabled: true, bevelSegments: 5, steps: 1, bevelSize: 0.08, bevelThickness: 0.06 })} position={[0, -0.2, -0.36]}>
        <meshPhysicalMaterial color="#e7e4de" roughness={0.42} clearcoat={0.22} />
      </mesh>
      <mesh geometry={new THREE.ExtrudeGeometry(upper, { depth: 0.6, bevelEnabled: true, bevelSegments: 6, steps: 1, bevelSize: 0.06, bevelThickness: 0.05 })} position={[0, -0.06, -0.3]}>
        <meshPhysicalMaterial color="#25282b" roughness={0.52} sheen={0.35} sheenColor="#657079" />
      </mesh>
      <RoundedBox args={[0.46, 0.86, 0.62]} radius={0.14} smoothness={6} position={[-0.83, 0.35, 0]} rotation={[0, 0, -0.18]}>
        <meshPhysicalMaterial color="#171a1d" roughness={0.44} />
      </RoundedBox>
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[-0.34 + i * 0.2, 0.38 - Math.abs(i - 2.5) * 0.025, 0.34]} rotation={[0, 0, -0.08 + i * 0.025]}>
          <boxGeometry args={[0.29, 0.025, 0.018]} />
          <meshPhysicalMaterial color="#d7d3cb" roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[0.64, 0.08, 0.37]} rotation={[0, 0, -0.06]}>
        <boxGeometry args={[0.86, 0.055, 0.022]} />
        <meshBasicMaterial color="#b4ff67" toneMapped={false} />
      </mesh>
      <mesh position={[-0.92, -0.31, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.74, 36]} />
        <meshPhysicalMaterial color="#6e7377" roughness={0.46} />
      </mesh>
    </group>
  )
}

export default AeroRunner
