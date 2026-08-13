import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function TouringWheel() {
  const wheel = useRef<THREE.Group>(null)
  useFrame((state) => { if (wheel.current) wheel.current.rotation.z = state.clock.elapsedTime * 0.09 })
  return (
    <group rotation={[0.17, -0.58, 0.07]}>
      <group ref={wheel}>
        <mesh><torusGeometry args={[1.15, 0.28, 28, 112]} /><meshPhysicalMaterial color="#121416" roughness={0.58} /></mesh>
        <mesh><torusGeometry args={[0.82, 0.085, 20, 96]} /><meshPhysicalMaterial color="#84898c" metalness={1} roughness={0.18} /></mesh>
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2
          return <mesh key={i} position={[Math.cos(a) * 0.48, Math.sin(a) * 0.48, 0]} rotation={[0, 0, a]}><boxGeometry args={[0.72, 0.085, 0.12]} /><meshPhysicalMaterial color="#777d80" metalness={1} roughness={0.2} /></mesh>
        })}
        <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.31, 0.31, 0.32, 48]} /><meshPhysicalMaterial color="#a0a4a6" metalness={1} roughness={0.16} /></mesh>
        {Array.from({ length: 5 }, (_, i) => {
          const a = (i / 5) * Math.PI * 2
          return <mesh key={i} position={[Math.cos(a) * 0.2, Math.sin(a) * 0.2, 0.18]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.045, 0.045, 0.07, 16]} /><meshPhysicalMaterial color="#25282a" metalness={0.9} roughness={0.22} /></mesh>
        })}
      </group>
      <group position={[0.9, 0.05, 0.4]}>
        <mesh><boxGeometry args={[0.36, 0.78, 0.28]} /><meshPhysicalMaterial color="#b8955d" metalness={0.74} roughness={0.25} clearcoat={0.45} /></mesh>
      </group>
    </group>
  )
}

export default TouringWheel
