import { Instance, Instances, Line, MeshTransmissionMaterial } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function GlassCapsule() {
  const ref = useRef<GroupRef>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * .28) * .28
    ref.current.rotation.z = .18 + Math.sin(state.clock.elapsedTime * .2) * .05
  })
  return (
    <group ref={ref} rotation={[0.25, -0.3, 0.18]}>
      <mesh scale={[1.05, 1.05, 1.05]}>
        <capsuleGeometry args={[.72, 1.45, 24, 56]} />
        <MeshTransmissionMaterial backside transmission={1} thickness={1.1} roughness={.025} ior={1.46} chromaticAberration={.018} anisotropy={.22} samples={6} resolution={256} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} scale={[.32, .32, .82]}>
        <capsuleGeometry args={[.22, 1.1, 16, 32]} />
        <meshPhysicalMaterial color="#ffbf5f" emissive="#b06e18" emissiveIntensity={.45} metalness={.5} roughness={.12} />
      </mesh>
    </group>
  )
}

export default GlassCapsule
