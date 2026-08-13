import { Instance, Instances } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function ElectricDrive() {
  const rotor = useRef<THREE.Group>(null)
  const coils = useMemo(() => Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2
    return {
      position: [Math.cos(a) * 1.02, Math.sin(a) * 1.02, 0] as [number, number, number],
      rotation: [0, 0, a] as [number, number, number],
    }
  }), [])
  useFrame((state) => {
    if (rotor.current) rotor.current.rotation.z = state.clock.elapsedTime * 0.18
  })
  return (
    <group rotation={[0.16, -0.48, 0.08]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.45, 1.45, 0.58, 96]} />
        <meshPhysicalMaterial color="#2b2f32" metalness={0.94} roughness={0.23} />
      </mesh>
      <mesh position={[0, 0, 0.34]}>
        <torusGeometry args={[1.0, 0.2, 24, 96]} />
        <meshPhysicalMaterial color="#171a1c" metalness={0.88} roughness={0.25} />
      </mesh>
      <Instances limit={18}>
        <torusGeometry args={[0.16, 0.045, 10, 28]} />
        <meshPhysicalMaterial color="#b46d37" metalness={0.86} roughness={0.27} />
        {coils.map((item, i) => <Instance key={i} {...item} position={[item.position[0], item.position[1], 0.39]} />)}
      </Instances>
      <group ref={rotor} position={[0, 0, 0.43]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.2, 64]} />
          <meshPhysicalMaterial color="#9da2a5" metalness={1} roughness={0.16} />
        </mesh>
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2
          return <mesh key={i} position={[Math.cos(a) * 0.34, Math.sin(a) * 0.34, 0.12]} rotation={[0, 0, a]}><boxGeometry args={[0.15, 0.44, 0.08]} /><meshPhysicalMaterial color="#3f4548" metalness={0.95} roughness={0.18} /></mesh>
        })}
      </group>
      <mesh position={[0, 0, 0.66]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.92, 28]} />
        <meshPhysicalMaterial color="#b9bdbe" metalness={1} roughness={0.15} />
      </mesh>
    </group>
  )
}

export default ElectricDrive
