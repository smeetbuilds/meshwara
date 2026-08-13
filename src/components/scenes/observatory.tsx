import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function SolarObservatory() {
  const telescope = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (telescope.current) telescope.current.rotation.y = -0.28 + Math.sin(state.clock.elapsedTime * 0.08) * 0.12
  })
  return (
    <group rotation={[0.05, -0.28, 0]} position={[0, -0.62, 0]} scale={0.9}>
      <mesh position={[0, -1.2, 0]}><cylinderGeometry args={[2.15, 2.15, 0.16, 80]} /><meshPhysicalMaterial color="#c6c1b8" roughness={0.7} /></mesh>
      <mesh position={[0, -0.1, -1.38]}><boxGeometry args={[4.0, 2.25, 0.12]} /><meshPhysicalMaterial color="#ded9d0" roughness={0.68} /></mesh>
      <RoundedBox args={[0.52, 1.08, 0.52]} radius={0.07} smoothness={5} position={[0, -0.62, 0]}>
        <meshPhysicalMaterial color="#aaa398" roughness={0.62} />
      </RoundedBox>
      <group ref={telescope} position={[0, 0.18, 0]} rotation={[-0.4, -0.28, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.28, 0.34, 2.25, 48]} /><meshPhysicalMaterial color="#272b2e" metalness={0.78} roughness={0.27} /></mesh>
        <mesh position={[-1.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.43, 0.43, 0.22, 48]} /><meshPhysicalMaterial color="#a8865b" metalness={0.9} roughness={0.2} /></mesh>
        <mesh position={[1.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.36, 0.36, 0.18, 48]} /><MeshTransmissionMaterial transmission={0.86} thickness={0.3} roughness={0.05} ior={1.52} color="#708ca0" /></mesh>
      </group>
      <mesh position={[1.2, 0.72, -1.14]}><sphereGeometry args={[0.32, 48, 32]} /><meshBasicMaterial color="#ffdca4" toneMapped={false} /></mesh>
      <pointLight position={[1.2, 0.72, -0.6]} intensity={1.3} color="#ffd7a0" distance={3.2} />
      <mesh position={[-1.38, -0.52, 0.68]} rotation={[0, -0.2, 0]}><boxGeometry args={[0.72, 0.96, 0.06]} /><meshPhysicalMaterial color="#1f2428" metalness={0.7} roughness={0.24} /></mesh>
      <mesh position={[-1.38, -0.52, 0.72]}><planeGeometry args={[0.54, 0.72]} /><meshBasicMaterial color="#6e91aa" /></mesh>
    </group>
  )
}

export default SolarObservatory
