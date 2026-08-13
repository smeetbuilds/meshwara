import { Instance, Instances, Line, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function Lens() {
  const ref = useRef<GroupRef>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.18
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.08
  })
  return (
    <group ref={ref} rotation={[0.1, -0.3, 0]}>
      <mesh scale={[1.48, 1.48, 0.42]}>
        <sphereGeometry args={[1, 96, 96]} />
        <MeshTransmissionMaterial backside transmission={1} thickness={1.35} samples={6} resolution={256} chromaticAberration={0.025} anisotropy={0.35} roughness={0.015} ior={1.42} />
      </mesh>
      <mesh position={[0, 0, -0.68]} rotation={[0, 0, 0.3]}>
        <torusGeometry args={[1.42, 0.025, 12, 180]} />
        <meshBasicMaterial color="#c7bfff" toneMapped={false} />
      </mesh>
    </group>
  )
}

export default Lens
