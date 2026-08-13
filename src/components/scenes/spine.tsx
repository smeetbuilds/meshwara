import { Instance, Instances, Line, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function Spine() {
  const ref = useRef<GroupRef>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.26) * 0.35
  })
  return (
    <group ref={ref} rotation={[0.15, -0.2, -0.14]}>
      {Array.from({ length: 9 }).map((_, i) => (
        <RoundedBox key={i} args={[1.8 - i * 0.08, 0.32, 0.78]} radius={0.12} smoothness={5} position={[Math.sin(i * 0.65) * 0.3, (i - 4) * 0.38, Math.cos(i * 0.5) * 0.22]} rotation={[0, i * 0.18, i * 0.035]}>
          <meshPhysicalMaterial color={i === 4 ? '#2d3234' : '#0b0c0d'} metalness={0.72} roughness={0.24} clearcoat={0.65} />
        </RoundedBox>
      ))}
    </group>
  )
}

export default Spine
