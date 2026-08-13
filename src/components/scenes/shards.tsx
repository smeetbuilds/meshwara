import { Instance, Instances, Line, MeshTransmissionMaterial } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function Shards() {
  const ref = useRef<GroupRef>(null)
  const transforms = useMemo(() => Array.from({ length: 56 }, (_, i) => {
    const phi = i * 2.399963
    const y = 1 - (i / 55) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const radius = 1.1 + (i % 7) * 0.07
    return {
      position: [Math.cos(phi) * r * radius, y * radius, Math.sin(phi) * r * radius] as [number, number, number],
      rotation: [phi * 0.2, phi, y * 2] as [number, number, number],
      scale: 0.08 + (i % 5) * 0.016,
    }
  }), [])
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.08
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.16
  })
  return (
    <group ref={ref}>
      <Instances limit={56}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial color="#cdd6dc" metalness={0.7} roughness={0.18} clearcoat={1} />
        {transforms.map((t, i) => <Instance key={i} position={t.position} rotation={t.rotation} scale={t.scale} />)}
      </Instances>
      <mesh>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshPhysicalMaterial color="#171512" metalness={0.9} roughness={0.16} />
      </mesh>
    </group>
  )
}

export default Shards
