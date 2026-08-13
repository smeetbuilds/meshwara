import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function SignalDrone() {
  const rotors = useRef<Array<THREE.Group | null>>([])
  useFrame((state) => {
    rotors.current.forEach((rotor, i) => {
      if (rotor) rotor.rotation.y = state.clock.elapsedTime * (i % 2 ? -4.4 : 4.4)
    })
  })
  const points: [number, number, number][] = [[-1.18, 0, -0.82], [1.18, 0, -0.82], [-1.18, 0, 0.82], [1.18, 0, 0.82]]
  return (
    <group rotation={[0.12, -0.48, -0.05]}>
      <CurvedBox args={[1.25, 0.38, 0.8]} radius={0.19} smoothness={8}>
        <meshPhysicalMaterial color="#202428" metalness={0.78} roughness={0.24} clearcoat={0.55} />
      </CurvedBox>
      {points.map(([x, y, z], i) => (
        <group key={i}>
          <mesh position={[x * 0.52, y, z * 0.52]} rotation={[0, Math.atan2(x, z), Math.PI / 2]}>
            <cylinderGeometry args={[0.055, 0.065, 1.15, 20]} />
            <meshPhysicalMaterial color="#555c61" metalness={0.88} roughness={0.23} />
          </mesh>
          <group ref={(el) => { rotors.current[i] = el }} position={[x, 0.04, z]}>
            <mesh><cylinderGeometry args={[0.14, 0.14, 0.12, 24]} /><meshPhysicalMaterial color="#151719" metalness={0.8} roughness={0.24} /></mesh>
            <mesh position={[0, 0.08, 0]}><boxGeometry args={[1.15, 0.025, 0.1]} /><meshPhysicalMaterial color="#aeb4b7" metalness={0.65} roughness={0.27} /></mesh>
            <mesh position={[0, 0.08, 0]} rotation={[0, Math.PI / 2, 0]}><boxGeometry args={[1.15, 0.025, 0.1]} /><meshPhysicalMaterial color="#aeb4b7" metalness={0.65} roughness={0.27} /></mesh>
          </group>
        </group>
      ))}
      <group position={[0, -0.38, 0.36]}>
        <mesh><sphereGeometry args={[0.23, 32, 24]} /><meshPhysicalMaterial color="#30373b" metalness={0.72} roughness={0.25} /></mesh>
        <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.13, 0.13, 0.08, 32]} /><meshPhysicalMaterial color="#5c8190" metalness={0.5} roughness={0.12} clearcoat={0.8} /></mesh>
      </group>
      <mesh position={[0, 0.18, 0.43]}><boxGeometry args={[0.38, 0.035, 0.025]} /><meshBasicMaterial color="#87ffcc" toneMapped={false} /></mesh>
    </group>
  )
}

export default SignalDrone
