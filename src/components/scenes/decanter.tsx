import { MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function GlassDecanter() {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.22
  })
  return (
    <group ref={ref} rotation={[0.03, -0.28, 0]} position={[0, -0.35, 0]}>
      <mesh scale={[1.05, 1.28, 1.05]}>
        <sphereGeometry args={[0.9, 72, 48]} />
        <MeshTransmissionMaterial transmission={0.96} thickness={0.5} roughness={0.05} ior={1.5} chromaticAberration={0.014} color="#edf1f2" />
      </mesh>
      <mesh position={[0, -0.26, 0]} scale={[0.88, 0.78, 0.88]}>
        <sphereGeometry args={[0.82, 64, 40]} />
        <meshPhysicalMaterial color="#a25e2f" transparent opacity={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.07, 0]}>
        <cylinderGeometry args={[0.29, 0.37, 0.92, 48]} />
        <MeshTransmissionMaterial transmission={0.94} thickness={0.35} roughness={0.04} ior={1.5} color="#eef2f4" />
      </mesh>
      <mesh position={[0, 1.72, 0]} scale={[1, 0.8, 1]}>
        <octahedronGeometry args={[0.42, 2]} />
        <MeshTransmissionMaterial transmission={0.9} thickness={0.5} roughness={0.06} ior={1.52} color="#dfe8eb" />
      </mesh>
      <mesh position={[0, -1.02, 0]}>
        <cylinderGeometry args={[0.72, 0.78, 0.1, 64]} />
        <meshPhysicalMaterial color="#a18769" metalness={0.82} roughness={0.22} />
      </mesh>
    </group>
  )
}

export default GlassDecanter
