import { Instance, Instances, Line, MeshTransmissionMaterial } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function VelvetOrbit() {
  const ref = useRef<GroupRef>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.32
    ref.current.rotation.z = state.clock.elapsedTime * 0.035
  })
  return (
    <group ref={ref} rotation={[0.42, -0.24, 0.18]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[i * 0.76, i * 0.48, i * 0.62]} scale={[1.24 - i * 0.08, 1, 1]}>
          <torusGeometry args={[1.12, 0.16 - i * 0.018, 32, 180]} />
          <meshPhysicalMaterial color={i === 1 ? '#382b46' : '#17121d'} roughness={0.52} metalness={0.05} sheen={1} sheenColor="#d6a9ff" sheenRoughness={0.48} clearcoat={0.18} />
        </mesh>
      ))}
      <mesh scale={0.32}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshPhysicalMaterial color="#ccb7e8" roughness={0.2} metalness={0.58} clearcoat={0.8} />
      </mesh>
    </group>
  )
}

export default VelvetOrbit
