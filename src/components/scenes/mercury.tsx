import { Instance, Instances, Line, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function Mercury() {
  const ref = useRef<GroupRef>(null)
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.z += delta * 0.055
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.28) * 0.18
  })
  return (
    <group ref={ref} rotation={[0.35, -0.35, 0.2]}>
      <mesh scale={[1.2, 1.2, 0.72]}>
        <torusKnotGeometry args={[1.05, 0.31, 260, 40, 2, 3]} />
        <meshPhysicalMaterial color="#c8ccd0" metalness={1} roughness={0.12} clearcoat={1} clearcoatRoughness={0.08} />
      </mesh>
      <mesh scale={[0.78, 0.78, 0.46]} rotation={[0.4, 0.2, 1.1]}>
        <torusKnotGeometry args={[1.05, 0.18, 220, 32, 2, 3]} />
        <meshPhysicalMaterial color="#17191b" metalness={0.92} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default Mercury
