import { MeshTransmissionMaterial } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function FieldCamera() {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => { if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.2 })
  return (
    <group ref={ref} rotation={[0.08, -0.38, 0]}>
      <CurvedBox args={[2.5, 1.55, 0.82]} radius={0.18} smoothness={8}><meshPhysicalMaterial color="#24272a" metalness={0.68} roughness={0.28} clearcoat={0.46} /></CurvedBox>
      <group position={[0.4, 0, 0.56]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.68, 0.68, 0.42, 64]} /><meshPhysicalMaterial color="#151719" metalness={0.88} roughness={0.2} /></mesh>
        <mesh position={[0, 0, 0.24]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.49, 0.49, 0.08, 64]} /><MeshTransmissionMaterial transmission={0.9} thickness={0.28} roughness={0.04} ior={1.53} color="#66899b" /></mesh>
        <mesh position={[0, 0, 0.29]}><torusGeometry args={[0.34, 0.025, 12, 64]} /><meshBasicMaterial color="#76b8d5" toneMapped={false} /></mesh>
      </group>
      <CurvedBox args={[0.76, 0.42, 0.38]} radius={0.08} smoothness={5} position={[-0.55, 0.72, -0.02]}><meshPhysicalMaterial color="#33383b" metalness={0.72} roughness={0.28} /></CurvedBox>
      <mesh position={[-0.55, 0.72, 0.2]}><boxGeometry args={[0.46, 0.18, 0.03]} /><meshPhysicalMaterial color="#7b949f" metalness={0.4} roughness={0.18} /></mesh>
      {[-0.86, -0.45, -0.04].map((x, i) => <mesh key={i} position={[x, -0.7, 0.47]}><cylinderGeometry args={[0.09, 0.09, 0.07, 24]} /><meshPhysicalMaterial color={i === 0 ? '#aa8962' : '#858b8e'} metalness={0.9} roughness={0.2} /></mesh>)}
      <CurvedBox args={[0.42, 0.82, 0.16]} radius={0.08} smoothness={5} position={[-1.27, -0.1, 0]}><meshPhysicalMaterial color="#17191b" roughness={0.46} /></CurvedBox>
    </group>
  )
}

export default FieldCamera
