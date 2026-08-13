import { Instance, Instances, Line, MeshTransmissionMaterial } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function Bloom() {
  const ref = useRef<GroupRef>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.08
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.22) * 0.08
  })
  return (
    <group ref={ref} rotation={[0.55, 0.15, 0]}>
      {Array.from({ length: 11 }).map((_, i) => {
        const a = (i / 11) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.95, Math.sin(a) * 0.95, Math.sin(a * 2) * 0.12]} rotation={[0.2, a, a + Math.PI / 2]} scale={[0.38, 1.25, 0.18]}>
            <sphereGeometry args={[0.72, 48, 48]} />
            <meshPhysicalMaterial color="#eee8df" roughness={0.34} metalness={0.02} clearcoat={0.45} clearcoatRoughness={0.2} />
          </mesh>
        )
      })}
      <mesh>
        <sphereGeometry args={[0.62, 64, 64]} />
        <meshPhysicalMaterial color="#b6a999" roughness={0.38} />
      </mesh>
    </group>
  )
}

export default Bloom
