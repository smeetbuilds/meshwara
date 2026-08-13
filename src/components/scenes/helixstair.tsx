import { Instance, Instances } from '@react-three/drei'
import { useMemo } from 'react'

function HelixStair() {
  const steps = useMemo(() => Array.from({ length: 28 }, (_, i) => {
    const a = i * 0.34
    const y = -1.25 + i * 0.09
    return {
      position: [Math.cos(a) * 0.62, y, Math.sin(a) * 0.62] as [number, number, number],
      rotation: [0, -a, 0] as [number, number, number],
    }
  }), [])
  return (
    <group rotation={[0.04, -0.5, 0]} position={[0, -0.12, 0]}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 2.9, 24]} />
        <meshPhysicalMaterial color="#25282a" metalness={0.92} roughness={0.2} />
      </mesh>
      <Instances limit={28}>
        <boxGeometry args={[1.45, 0.07, 0.34]} />
        <meshPhysicalMaterial color="#c9b497" roughness={0.47} clearcoat={0.12} />
        {steps.map((step, i) => <Instance key={i} {...step} />)}
      </Instances>
      {steps.filter((_, i) => i % 2 === 0).map((step, i) => (
        <mesh key={i} position={[step.position[0] * 1.72, step.position[1] + 0.48, step.position[2] * 1.72]}>
          <cylinderGeometry args={[0.018, 0.018, 0.95, 10]} />
          <meshPhysicalMaterial color="#888d90" metalness={0.88} roughness={0.25} />
        </mesh>
      ))}
      <mesh position={[0, -1.47, 0]}>
        <cylinderGeometry args={[1.12, 1.12, 0.08, 64]} />
        <meshPhysicalMaterial color="#d9d4ca" roughness={0.62} />
      </mesh>
    </group>
  )
}

export default HelixStair
