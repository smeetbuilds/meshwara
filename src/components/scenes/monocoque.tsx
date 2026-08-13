import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function MonocoqueChair() {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.14) * 0.28
  })
  return (
    <group ref={ref} rotation={[0.02, -0.34, 0]} position={[0, -0.2, 0]}>
      <RoundedBox args={[1.72, 0.3, 1.55]} radius={0.18} smoothness={8} position={[0, -0.42, 0]} rotation={[-0.1, 0, 0]}>
        <meshPhysicalMaterial color="#d8d0c2" roughness={0.36} clearcoat={0.24} />
      </RoundedBox>
      <RoundedBox args={[1.72, 1.5, 0.3]} radius={0.18} smoothness={8} position={[0, 0.45, -0.58]} rotation={[-0.18, 0, 0]}>
        <meshPhysicalMaterial color="#d8d0c2" roughness={0.36} clearcoat={0.24} />
      </RoundedBox>
      {[-0.68, 0.68].map((x) => (
        <group key={x}>
          <mesh position={[x, -1.02, 0.48]} rotation={[0.08, 0, x * -0.08]}>
            <cylinderGeometry args={[0.065, 0.085, 1.38, 24]} />
            <meshPhysicalMaterial color="#292b2d" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[x, -0.98, -0.48]} rotation={[-0.08, 0, x * 0.08]}>
            <cylinderGeometry args={[0.065, 0.085, 1.28, 24]} />
            <meshPhysicalMaterial color="#292b2d" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}
      <RoundedBox args={[1.3, 0.1, 0.15]} radius={0.04} smoothness={4} position={[0, -0.53, -0.6]}>
        <meshPhysicalMaterial color="#b5875e" metalness={0.55} roughness={0.3} />
      </RoundedBox>
    </group>
  )
}

export default MonocoqueChair
