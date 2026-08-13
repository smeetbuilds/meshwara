import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function Pavilion() {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.18
  })
  return (
    <group ref={ref} rotation={[0.08, -0.35, 0]} position={[0, -0.35, 0]}>
      <RoundedBox args={[3.35, 0.16, 2.45]} radius={0.05} smoothness={4} position={[0, -1.1, 0]}>
        <meshPhysicalMaterial color="#d7d1c6" roughness={0.55} />
      </RoundedBox>
      <RoundedBox args={[3.15, 0.14, 2.25]} radius={0.04} smoothness={4} position={[0, 1.12, 0]}>
        <meshPhysicalMaterial color="#c8c1b6" roughness={0.48} />
      </RoundedBox>
      {[-1.34, 1.34].map((x) => (
        <RoundedBox key={x} args={[0.18, 2.2, 0.18]} radius={0.04} smoothness={4} position={[x, 0, -0.82]}>
          <meshPhysicalMaterial color="#d8d2c8" roughness={0.5} />
        </RoundedBox>
      ))}
      <RoundedBox args={[0.18, 2.2, 0.18]} radius={0.04} smoothness={4} position={[-1.34, 0, 0.82]}>
        <meshPhysicalMaterial color="#d8d2c8" roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[1.55, 1.72, 0.12]} radius={0.04} smoothness={4} position={[0.48, -0.16, -0.9]}>
        <meshPhysicalMaterial color="#6f5d4a" roughness={0.7} />
      </RoundedBox>
      <mesh position={[1.0, -0.16, 0.86]}>
        <boxGeometry args={[0.78, 1.72, 0.07]} />
        <MeshTransmissionMaterial transmission={0.96} thickness={0.18} roughness={0.08} ior={1.5} chromaticAberration={0.01} />
      </mesh>
      <RoundedBox args={[0.96, 0.16, 0.72]} radius={0.05} smoothness={4} position={[-0.34, -0.82, 0.25]}>
        <meshPhysicalMaterial color="#a87345" metalness={0.55} roughness={0.34} />
      </RoundedBox>
      <mesh position={[-0.34, -0.38, 0.25]}>
        <cylinderGeometry args={[0.22, 0.34, 0.72, 48]} />
        <meshPhysicalMaterial color="#b9906a" roughness={0.4} clearcoat={0.25} />
      </mesh>
      <mesh position={[-0.34, 0.05, 0.25]}>
        <icosahedronGeometry args={[0.29, 2]} />
        <meshPhysicalMaterial color="#1a1b1b" metalness={0.75} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default Pavilion
