import { Instance, Instances, Line, MeshTransmissionMaterial } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function Prism() {
  const ref = useRef<GroupRef>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.12
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.33) * 0.13
  })
  return (
    <group ref={ref} rotation={[0.1, 0.3, 0]}>
      <mesh scale={1.38}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          resolution={256}
          transmission={1}
          thickness={0.9}
          chromaticAberration={0.045}
          anisotropy={0.2}
          distortion={0.08}
          distortionScale={0.3}
          temporalDistortion={0.05}
          roughness={0.04}
          ior={1.38}
        />
      </mesh>
      <mesh scale={0.58} rotation={[0.6, 0.4, 0.2]}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial color="#c4ff68" emissive="#8fbf3a" emissiveIntensity={0.25} metalness={0.4} roughness={0.16} />
      </mesh>
    </group>
  )
}

export default Prism
