import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function CarbonHelmet() {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.14) * 0.22
  })
  return (
    <group ref={ref} rotation={[0.05, -0.32, -0.04]} position={[0, -0.05, 0]}>
      <mesh scale={[1.0, 1.08, 1.02]} rotation={[0.04, 0, 0]}>
        <sphereGeometry args={[1.18, 72, 48, 0, Math.PI * 2, 0.18, Math.PI * 0.88]} />
        <meshPhysicalMaterial color="#111315" metalness={0.68} roughness={0.24} clearcoat={0.86} clearcoatRoughness={0.14} />
      </mesh>
      <mesh position={[0, 0.2, 0.94]} scale={[0.92, 0.55, 0.18]}>
        <sphereGeometry args={[1, 64, 32]} />
        <MeshTransmissionMaterial transmission={0.82} thickness={0.18} roughness={0.06} ior={1.5} chromaticAberration={0.012} color="#6f8491" />
      </mesh>
      <RoundedBox args={[1.48, 0.42, 0.5]} radius={0.16} smoothness={7} position={[0, -0.66, 0.55]} rotation={[0.08, 0, 0]}>
        <meshPhysicalMaterial color="#151719" metalness={0.65} roughness={0.28} clearcoat={0.72} />
      </RoundedBox>
      {[-0.62, 0.62].map((x) => (
        <mesh key={x} position={[x, -0.05, 0.92]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.07, 28]} />
          <meshPhysicalMaterial color="#b5915e" metalness={0.95} roughness={0.18} />
        </mesh>
      ))}
      <mesh position={[0, -0.1, -1.02]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.33, 0.035, 14, 64]} />
        <meshBasicMaterial color="#ff684f" toneMapped={false} />
      </mesh>
    </group>
  )
}

export default CarbonHelmet
