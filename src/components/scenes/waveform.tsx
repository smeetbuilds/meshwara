import { Instance, Instances, Line, MeshTransmissionMaterial } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function WaveformColumn() {
  const ref = useRef<GroupRef>(null)
  const rings = useMemo(() => Array.from({ length: 18 }, (_, i) => {
    const y = (i - 8.5) * .16
    const scale = .62 + .22 * Math.sin(i * .72)
    return { y, scale, rot: i * .18 }
  }), [])
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * .075
    ref.current.children.forEach((child, i) => {
      child.rotation.z = rings[i]?.rot + Math.sin(state.clock.elapsedTime * .45 + i * .3) * .18
    })
  })
  return (
    <group ref={ref} rotation={[.25, -.25, .15]}>
      {rings.map((ring, i) => (
        <mesh key={i} position={[Math.sin(i * .65) * .08, ring.y, Math.cos(i * .52) * .05]} rotation={[Math.PI / 2, 0, ring.rot]} scale={[ring.scale, ring.scale, 1]}>
          <torusGeometry args={[.9, .026 + (i % 4) * .006, 12, 120]} />
          <meshPhysicalMaterial color={i % 5 === 0 ? '#f1c36c' : '#72787b'} metalness={.92} roughness={.18} />
        </mesh>
      ))}
    </group>
  )
}

export default WaveformColumn
