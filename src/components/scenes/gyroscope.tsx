import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function PrecisionGyroscope() {
  const outer = useRef<THREE.Group>(null)
  const middle = useRef<THREE.Group>(null)
  const rotor = useRef<THREE.Group>(null)
  useFrame((state, delta) => {
    if (outer.current) outer.current.rotation.y += delta * 0.11
    if (middle.current) middle.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.32) * 0.42
    if (rotor.current) rotor.current.rotation.z += delta * 0.72
  })
  const metal = <meshPhysicalMaterial color="#aeb4b8" metalness={1} roughness={0.16} clearcoat={0.6} />
  return (
    <group rotation={[0.15, -0.35, 0.12]} scale={1.05}>
      <group ref={outer}>
        <mesh>{/* outer gimbal */}<torusGeometry args={[1.35, 0.065, 18, 128]} />{metal}</mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[1.35, 0.025, 12, 96]} /><meshPhysicalMaterial color="#4f565b" metalness={0.92} roughness={0.24} /></mesh>
      </group>
      <group ref={middle} rotation={[Math.PI / 2, 0, 0]}>
        <mesh><torusGeometry args={[0.98, 0.075, 18, 96]} /><meshPhysicalMaterial color="#d0c3a2" metalness={0.9} roughness={0.18} /></mesh>
        <group ref={rotor}>
          <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.64, 0.64, 0.2, 96]} /><meshPhysicalMaterial color="#202427" metalness={0.88} roughness={0.2} /></mesh>
          <mesh position={[0, 0, 0.13]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.47, 0.47, 0.07, 96]} /><meshPhysicalMaterial color="#8ed5d2" metalness={0.62} roughness={0.16} emissive="#173332" emissiveIntensity={0.22} /></mesh>
          {Array.from({ length: 12 }, (_, i) => {
            const a = i / 12 * Math.PI * 2
            return <mesh key={i} position={[Math.cos(a) * 0.48, Math.sin(a) * 0.48, 0.2]} rotation={[0, 0, a]}><boxGeometry args={[0.05, 0.15, 0.025]} /><meshBasicMaterial color="#dce4e5" /></mesh>
          })}
        </group>
      </group>
      <mesh><sphereGeometry args={[0.13, 32, 32]} /><meshPhysicalMaterial color="#d9dde0" metalness={1} roughness={0.12} /></mesh>
    </group>
  )
}
export default PrecisionGyroscope
