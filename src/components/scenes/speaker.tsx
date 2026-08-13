import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function SignalSpeaker() {
  const ref = useRef<THREE.Group>(null)
  const woofer = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.24
    if (woofer.current) woofer.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2.1) * 0.012)
  })
  return (
    <group ref={ref} rotation={[0.06, -0.32, 0]}>
      <RoundedBox args={[1.75, 2.7, 1.08]} radius={0.24} smoothness={8}>
        <meshPhysicalMaterial color="#202326" metalness={0.72} roughness={0.28} clearcoat={0.45} />
      </RoundedBox>
      <mesh position={[0, 0.42, 0.58]} rotation={[Math.PI / 2, 0, 0]} ref={woofer}>
        <cylinderGeometry args={[0.65, 0.56, 0.18, 64]} />
        <meshPhysicalMaterial color="#0a0c0d" roughness={0.54} sheen={0.35} />
      </mesh>
      <mesh position={[0, 0.42, 0.7]}><sphereGeometry args={[0.19, 32, 20]} /><meshPhysicalMaterial color="#33383b" metalness={0.55} roughness={0.34} /></mesh>
      <mesh position={[0, -0.66, 0.61]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.35, 0.3, 0.13, 48]} /><meshPhysicalMaterial color="#0e1011" roughness={0.42} /></mesh>
      <mesh position={[0, -0.66, 0.7]}><sphereGeometry args={[0.095, 24, 20]} /><meshPhysicalMaterial color="#a18d68" metalness={0.7} roughness={0.22} /></mesh>
      <mesh position={[0, -1.45, 0]}><cylinderGeometry args={[0.52, 0.68, 0.18, 48]} /><meshPhysicalMaterial color="#17191b" metalness={0.8} roughness={0.28} /></mesh>
      <mesh position={[0, -1.26, 0]}><cylinderGeometry args={[0.07, 0.08, 0.42, 24]} /><meshPhysicalMaterial color="#8c7557" metalness={0.8} roughness={0.25} /></mesh>
    </group>
  )
}

export default SignalSpeaker
