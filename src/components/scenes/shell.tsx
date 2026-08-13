import { Instance, Instances, Line, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function Shell() {
  const ref = useRef<GroupRef>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.09
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.31) * 0.16
  })
  return (
    <group ref={ref} rotation={[0.3, -0.2, 0.2]}>
      <mesh scale={[1.4, 1.05, 0.62]}>
        <sphereGeometry args={[1, 96, 96]} />
        <meshPhysicalMaterial color="#d5c4ff" roughness={0.16} metalness={0.54} iridescence={1} iridescenceIOR={1.55} iridescenceThicknessRange={[140, 620]} clearcoat={0.8} />
      </mesh>
      <mesh scale={[0.74, 0.54, 0.72]} position={[0.1, 0, 0.56]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial color="#0d0f11" metalness={0.95} roughness={0.12} />
      </mesh>
    </group>
  )
}

export default Shell
