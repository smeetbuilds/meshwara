import { Instance, Instances, MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Chronograph() {
  const ref = useRef<THREE.Group>(null)
  const seconds = useRef<THREE.Group>(null)
  const ticks = useMemo(() => Array.from({ length: 60 }, (_, i) => {
    const a = (i / 60) * Math.PI * 2
    const major = i % 5 === 0
    return {
      position: [Math.sin(a) * 1.02, Math.cos(a) * 1.02, 0.11] as [number, number, number],
      rotation: [0, 0, -a] as [number, number, number],
      scale: [major ? 0.032 : 0.014, major ? 0.16 : 0.08, 0.018] as [number, number, number],
    }
  }), [])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.24
    if (seconds.current) seconds.current.rotation.z = -state.clock.elapsedTime * 0.14
  })

  return (
    <group ref={ref} rotation={[0.18, -0.18, -0.08]} scale={1.02}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.34, 1.34, 0.28, 96]} />
        <meshPhysicalMaterial color="#a8a9ab" metalness={1} roughness={0.16} clearcoat={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.17, 1.17, 0.08, 96]} />
        <meshPhysicalMaterial color="#0e1012" metalness={0.62} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0, 0.235]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.14, 1.14, 0.05, 96]} />
        <MeshTransmissionMaterial transmission={0.95} thickness={0.26} roughness={0.06} ior={1.48} chromaticAberration={0.015} />
      </mesh>

      <Instances limit={60}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color="#e6e0d4" metalness={0.72} roughness={0.2} />
        {ticks.map((tick, i) => <Instance key={i} {...tick} />)}
      </Instances>

      {[[-0.43, 0.15], [0.43, 0.15], [0, -0.42]].map(([x, y], i) => (
        <group key={i} position={[x, y, 0.18]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.022, 48]} />
            <meshPhysicalMaterial color="#15181a" metalness={0.55} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0, 0.025]} rotation={[0, 0, i * 0.8]}>
            <boxGeometry args={[0.022, 0.2, 0.018]} />
            <meshBasicMaterial color="#b9c0c5" />
          </mesh>
        </group>
      ))}

      <group position={[0, 0, 0.22]} rotation={[0, 0, 0.62]}>
        <mesh position={[0, 0.33, 0]}><boxGeometry args={[0.055, 0.72, 0.032]} /><meshPhysicalMaterial color="#ece7df" metalness={0.7} roughness={0.2} /></mesh>
      </group>
      <group position={[0, 0, 0.24]} rotation={[0, 0, -0.92]}>
        <mesh position={[0, 0.43, 0]}><boxGeometry args={[0.036, 0.92, 0.028]} /><meshPhysicalMaterial color="#ece7df" metalness={0.7} roughness={0.2} /></mesh>
      </group>
      <group ref={seconds} position={[0, 0, 0.27]}>
        <mesh position={[0, 0.48, 0]}><boxGeometry args={[0.014, 1.04, 0.016]} /><meshBasicMaterial color="#ff5c45" toneMapped={false} /></mesh>
      </group>
      <mesh position={[0, 0, 0.3]}><sphereGeometry args={[0.055, 24, 24]} /><meshPhysicalMaterial color="#ded8cd" metalness={1} roughness={0.15} /></mesh>

      <group position={[1.5, 0.02, -0.01]}>
        <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.17, 0.17, 0.34, 32]} /><meshPhysicalMaterial color="#97999b" metalness={1} roughness={0.22} /></mesh>
        {Array.from({ length: 10 }, (_, i) => (
          <mesh key={i} position={[-0.17 + i * 0.038, 0, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[0.18, 0.007, 8, 24]} /><meshBasicMaterial color="#44484b" /></mesh>
        ))}
      </group>
    </group>
  )
}

export default Chronograph
