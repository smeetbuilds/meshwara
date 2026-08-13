import { MeshTransmissionMaterial } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function PerfumeVessel() {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.13) * 0.26
  })
  return (
    <group ref={ref} rotation={[0.03, -0.28, -0.04]} position={[0, -0.2, 0]}>
      <CurvedBox args={[1.62, 2.25, 0.72]} radius={0.23} smoothness={10}>
        <MeshTransmissionMaterial transmission={0.97} thickness={0.48} roughness={0.06} ior={1.5} chromaticAberration={0.018} color="#e9eef0" />
      </CurvedBox>
      <CurvedBox args={[1.38, 1.48, 0.52]} radius={0.17} smoothness={8} position={[0, -0.25, 0]}>
        <meshPhysicalMaterial color="#8c542e" transparent opacity={0.68} roughness={0.2} />
      </CurvedBox>
      <mesh position={[0, 1.26, 0]}><cylinderGeometry args={[0.25, 0.28, 0.42, 36]} /><meshPhysicalMaterial color="#a78a65" metalness={0.94} roughness={0.18} /></mesh>
      <CurvedBox args={[0.7, 0.68, 0.62]} radius={0.12} smoothness={6} position={[0, 1.72, 0]}>
        <meshPhysicalMaterial color="#17191a" metalness={0.75} roughness={0.24} clearcoat={0.4} />
      </CurvedBox>
      <CurvedBox args={[0.82, 0.5, 0.04]} radius={0.035} smoothness={4} position={[0, -0.08, 0.39]}>
        <meshPhysicalMaterial color="#e4ddcf" roughness={0.55} />
      </CurvedBox>
      <mesh position={[0, -0.08, 0.425]}><planeGeometry args={[0.5, 0.02]} /><meshBasicMaterial color="#2d2926" /></mesh>
    </group>
  )
}

export default PerfumeVessel
