import { Instance, Instances, Line, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function Filament() {
  const ref = useRef<GroupRef>(null)
  const curves = useMemo(() => Array.from({ length: 20 }, (_, i) => {
    const phase = (i / 20) * Math.PI * 2
    return Array.from({ length: 50 }, (_, j) => {
      const t = (j / 49) * Math.PI * 2 - Math.PI
      const r = 1.05 + 0.18 * Math.sin(t * 2 + phase)
      return new THREE.Vector3(Math.cos(t) * r, Math.sin(t * 0.72 + phase) * 0.58, Math.sin(t) * r + Math.sin(phase) * 0.28)
    })
  }), [])
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.055
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.25) * 0.08
  })
  return (
    <group ref={ref} rotation={[0.25, 0, 0]}>
      {curves.map((points, i) => (
        <Line key={i} points={points} color={i % 4 === 0 ? '#baf4ff' : '#5e737a'} lineWidth={i % 4 === 0 ? 1.3 : 0.55} transparent opacity={0.62} />
      ))}
      <mesh>
        <sphereGeometry args={[0.3, 48, 48]} />
        <meshPhysicalMaterial color="#111719" metalness={1} roughness={0.12} />
      </mesh>
    </group>
  )
}

export default Filament
