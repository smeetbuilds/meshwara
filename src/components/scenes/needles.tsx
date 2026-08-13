import { Instance, Instances, Line, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function Needles() {
  const ref = useRef<GroupRef>(null)
  const items = useMemo(() => Array.from({ length: 144 }, (_, i) => {
    const x = (i % 12) - 5.5
    const z = Math.floor(i / 12) - 5.5
    const px = x * 0.25
    const pz = z * 0.25
    const angle = Math.atan2(pz, px) + Math.sin((px + pz) * 1.7) * 0.7
    const y = Math.sin(Math.hypot(px, pz) * 2.4) * 0.2
    return { position: [px, y, pz] as [number, number, number], rotation: [0, -angle, Math.sin(angle) * 0.45] as [number, number, number] }
  }), [])
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15
  })
  return (
    <group ref={ref} rotation={[0.5, 0.2, 0]}>
      <Instances limit={144}>
        <boxGeometry args={[0.025, 0.025, 0.31]} />
        <meshPhysicalMaterial color="#c8ff82" metalness={0.38} roughness={0.28} />
        {items.map((item, i) => <Instance key={i} position={item.position} rotation={item.rotation} />)}
      </Instances>
    </group>
  )
}

export default Needles
