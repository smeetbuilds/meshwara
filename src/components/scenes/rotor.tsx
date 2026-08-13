import { Instance, Instances } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function PerformanceRotor() {
  const wheel = useRef<THREE.Group>(null)
  const holes = useMemo(() => Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2
    return { position: [Math.sin(a) * 0.83, Math.cos(a) * 0.83, 0.17] as [number, number, number], rotation: [Math.PI / 2, 0, 0] as [number, number, number] }
  }), [])
  useFrame((state) => {
    if (wheel.current) wheel.current.rotation.z = state.clock.elapsedTime * 0.12
  })
  return (
    <group rotation={[0.2, -0.62, 0.08]} scale={1.05}>
      <group ref={wheel}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.35, 1.35, 0.22, 96]} />
          <meshPhysicalMaterial color="#292d30" metalness={0.95} roughness={0.22} />
        </mesh>
        <mesh position={[0, 0, 0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.12, 1.12, 0.055, 96]} />
          <meshPhysicalMaterial color="#b6b8b8" metalness={1} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.19]}>
          <torusGeometry args={[0.6, 0.09, 24, 96]} />
          <meshPhysicalMaterial color="#555a5d" metalness={1} roughness={0.2} />
        </mesh>
        <Instances limit={28}>
          <cylinderGeometry args={[0.042, 0.042, 0.07, 16]} />
          <meshBasicMaterial color="#101214" />
          {holes.map((hole, i) => <Instance key={i} {...hole} />)}
        </Instances>
        {Array.from({ length: 5 }, (_, i) => {
          const a = (i / 5) * Math.PI * 2
          return <mesh key={i} position={[Math.sin(a) * 0.38, Math.cos(a) * 0.38, 0.2]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.085, 0.085, 0.08, 24]} /><meshPhysicalMaterial color="#151718" metalness={0.8} roughness={0.3} /></mesh>
        })}
      </group>
      <group position={[0.97, 0.16, 0.4]} rotation={[0, 0, -0.2]}>
        <mesh><boxGeometry args={[0.46, 0.92, 0.34]} /><meshPhysicalMaterial color="#d6533e" metalness={0.6} roughness={0.28} clearcoat={0.65} /></mesh>
        <mesh position={[0, 0, 0.2]}><boxGeometry args={[0.24, 0.52, 0.08]} /><meshPhysicalMaterial color="#1f2224" metalness={0.9} roughness={0.22} /></mesh>
      </group>
    </group>
  )
}

export default PerformanceRotor
