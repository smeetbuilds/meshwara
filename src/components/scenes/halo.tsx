import { Instance, Instances, Line, MeshTransmissionMaterial } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function Halo() {
  const ref = useRef<GroupRef>(null)
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.11
    const rings = ref.current.children.filter((child) => child.userData.ring)
    rings.forEach((ring, i) => { ring.rotation.z = state.clock.elapsedTime * (0.08 + i * 0.035) })
  })
  return (
    <group ref={ref} rotation={[0.35, 0, 0.2]}>
      {[1.65, 1.25, 0.9].map((radius, i) => (
        <mesh key={radius} userData={{ ring: true }} rotation={[i * 0.65, i * 0.8, i * 0.35]}>
          <torusGeometry args={[radius, 0.055 + i * 0.012, 20, 160]} />
          <meshPhysicalMaterial color={i === 1 ? '#bfe3ff' : '#d7d7d7'} metalness={i === 1 ? 0.2 : 1} roughness={0.14} transmission={i === 1 ? 0.75 : 0} thickness={0.5} />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshPhysicalMaterial color="#111317" metalness={0.95} roughness={0.16} clearcoat={1} />
      </mesh>
      <mesh scale={0.14} position={[0, 0, 0.52]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#c8ff67" toneMapped={false} />
      </mesh>
    </group>
  )
}

export default Halo
