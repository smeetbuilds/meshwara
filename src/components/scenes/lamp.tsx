import { MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function FoldLamp() {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.22
  })
  return (
    <group ref={ref} rotation={[0.02, -0.25, 0]} position={[0, -0.3, 0]}>
      <mesh position={[0, -1.08, 0]}><cylinderGeometry args={[0.7, 0.78, 0.16, 56]} /><meshPhysicalMaterial color="#2a2d2e" metalness={0.86} roughness={0.25} /></mesh>
      <mesh position={[0, -0.25, 0]}><cylinderGeometry args={[0.065, 0.085, 1.62, 28]} /><meshPhysicalMaterial color="#9b7653" metalness={0.9} roughness={0.22} /></mesh>
      <group position={[0, 0.82, 0.08]} rotation={[0.12, 0, 0]}>
        <mesh><coneGeometry args={[0.9, 0.72, 64, 1, true]} /><MeshTransmissionMaterial transmission={0.86} thickness={0.18} roughness={0.32} ior={1.38} color="#f4e5c5" /></mesh>
        <mesh position={[0, -0.16, 0]}><sphereGeometry args={[0.23, 32, 24]} /><meshBasicMaterial color="#ffbd6d" toneMapped={false} /></mesh>
        <pointLight color="#ffc784" intensity={1.8} distance={3.2} decay={2} position={[0, -0.15, 0]} />
      </group>
      <mesh position={[0, 0.38, 0]}><torusGeometry args={[0.14, 0.022, 12, 36]} /><meshPhysicalMaterial color="#1a1b1b" metalness={0.9} roughness={0.2} /></mesh>
    </group>
  )
}

export default FoldLamp
