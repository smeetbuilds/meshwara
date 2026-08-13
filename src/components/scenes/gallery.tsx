import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function GalleryScene() {
  const sculpture = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (sculpture.current) sculpture.current.rotation.y = state.clock.elapsedTime * 0.16
  })
  return (
    <group rotation={[0.04, -0.26, 0]} position={[0, -0.48, 0]} scale={0.92}>
      <mesh position={[0, -1.32, 0]}><boxGeometry args={[4.2, 0.1, 3]} /><meshPhysicalMaterial color="#cfc9be" roughness={0.72} /></mesh>
      <mesh position={[-1.95, 0.16, 0]}><boxGeometry args={[0.1, 2.9, 3]} /><meshPhysicalMaterial color="#e3ded6" roughness={0.68} /></mesh>
      <mesh position={[0, 0.16, -1.45]}><boxGeometry args={[4.0, 2.9, 0.1]} /><meshPhysicalMaterial color="#ddd7ce" roughness={0.7} /></mesh>
      <RoundedBox args={[1.12, 0.92, 0.82]} radius={0.08} smoothness={5} position={[0.1, -0.83, -0.08]}>
        <meshPhysicalMaterial color="#b7afa3" roughness={0.62} />
      </RoundedBox>
      <group ref={sculpture} position={[0.1, -0.02, -0.05]}>
        <mesh rotation={[0.9, 0.15, 0.2]}><torusKnotGeometry args={[0.42, 0.12, 180, 28, 2, 3]} /><meshPhysicalMaterial color="#b27b4e" metalness={0.96} roughness={0.18} /></mesh>
        <mesh scale={0.72}><sphereGeometry args={[0.54, 56, 56]} /><MeshTransmissionMaterial transmission={0.9} thickness={0.42} roughness={0.08} ior={1.48} chromaticAberration={0.018} /></mesh>
      </group>
      <mesh position={[1.45, -0.35, -1.18]} rotation={[-0.12, -0.3, 0]}><boxGeometry args={[0.52, 1.58, 0.04]} /><meshBasicMaterial color="#292929" /></mesh>
      <spotLight position={[0.15, 2.0, 0.4]} angle={0.42} penumbra={0.85} intensity={3.1} color="#fff0d6" />
      <pointLight position={[1.55, 0.2, 0.5]} intensity={0.65} color="#9ab7ff" distance={3} />
    </group>
  )
}

export default GalleryScene
