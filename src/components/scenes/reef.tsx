import { Instance, Instances, Line, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function ChromaticReef() {
  const ref = useRef<GroupRef>(null)
  const nodes = useMemo(() => Array.from({ length: 17 }, (_, i) => {
    const a = i * 2.399963
    const y = (i / 16 - .5) * 1.9
    const r = .62 + .22 * Math.sin(i * 1.7)
    return {
      position: [Math.cos(a) * r, y, Math.sin(a) * r] as [number, number, number],
      rotation: [Math.sin(a) * .7, a, Math.cos(a) * .35] as [number, number, number],
      scale: [.18 + (i % 3) * .035, .62 + (i % 4) * .08, .16 + (i % 2) * .04] as [number, number, number],
    }
  }), [])
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * .045
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * .22) * .07
  })
  return (
    <group ref={ref} rotation={[.22, -.2, -.2]}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position} rotation={node.rotation} scale={node.scale}>
          <sphereGeometry args={[1, 40, 40]} />
          <meshPhysicalMaterial color={i % 4 === 0 ? '#92ffd6' : '#d6c1ff'} metalness={.34} roughness={.18} iridescence={1} iridescenceIOR={1.45} iridescenceThicknessRange={[120, 520]} clearcoat={.7} />
        </mesh>
      ))}
    </group>
  )
}

export default ChromaticReef
