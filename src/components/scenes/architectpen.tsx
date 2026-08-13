import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function ArchitectPen() {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.24
  })
  return (
    <group ref={ref} rotation={[0.15, -0.42, -0.56]} scale={1.1}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 2.55, 48]} />
        <meshPhysicalMaterial color="#25282b" metalness={0.9} roughness={0.2} clearcoat={0.42} />
      </mesh>
      <mesh position={[1.38, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.08, 0.38, 48]} />
        <meshPhysicalMaterial color="#a98a62" metalness={0.94} roughness={0.18} />
      </mesh>
      <mesh position={[1.61, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.08, 0.22, 32]} />
        <meshPhysicalMaterial color="#d3d6d7" metalness={1} roughness={0.14} />
      </mesh>
      <mesh position={[-1.37, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.26, 48]} />
        <meshPhysicalMaterial color="#a98a62" metalness={0.94} roughness={0.18} />
      </mesh>
      <mesh position={[-0.64, 0.23, 0]} rotation={[0, 0, -0.07]}>
        <boxGeometry args={[1.35, 0.035, 0.07]} />
        <meshPhysicalMaterial color="#b5b9bb" metalness={0.95} roughness={0.16} />
      </mesh>
      <mesh position={[-0.02, 0, 0.205]}>
        <boxGeometry args={[0.85, 0.018, 0.024]} />
        <meshBasicMaterial color="#6effc6" toneMapped={false} />
      </mesh>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[-1.05 + i * 0.13, 0, -0.205]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.205, 0.0045, 6, 24]} />
          <meshPhysicalMaterial color="#585d60" metalness={0.9} roughness={0.24} />
        </mesh>
      ))}
    </group>
  )
}

export default ArchitectPen
