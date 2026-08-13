import { MeshTransmissionMaterial } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

function CeramicKettle() {
  const handle = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.78, 0.15, 0), new THREE.Vector3(-1.08, 0.5, 0), new THREE.Vector3(-1.08, 1.05, 0), new THREE.Vector3(-0.72, 1.28, 0),
  ]), [])
  return (
    <group rotation={[0.04, -0.42, 0]} position={[0, -0.28, 0]}>
      <mesh scale={[1.05, 0.9, 1.05]}><sphereGeometry args={[0.92, 64, 40]} /><meshPhysicalMaterial color="#e3ddd3" roughness={0.38} clearcoat={0.2} /></mesh>
      <mesh position={[0, 0.77, 0]}><cylinderGeometry args={[0.46, 0.58, 0.34, 48]} /><meshPhysicalMaterial color="#e3ddd3" roughness={0.38} /></mesh>
      <mesh position={[0, 1.02, 0]}><cylinderGeometry args={[0.33, 0.33, 0.12, 48]} /><meshPhysicalMaterial color="#9c7f5c" metalness={0.78} roughness={0.25} /></mesh>
      <group position={[0.92, 0.35, 0]} rotation={[0, 0, -0.72]}>
        <mesh><coneGeometry args={[0.28, 1.15, 40]} /><meshPhysicalMaterial color="#e3ddd3" roughness={0.4} /></mesh>
        <mesh position={[0, 0.58, 0]}><cylinderGeometry args={[0.25, 0.25, 0.12, 36]} /><MeshTransmissionMaterial transmission={0.75} thickness={0.12} roughness={0.08} ior={1.46} color="#b7d0d2" /></mesh>
      </group>
      <mesh><tubeGeometry args={[handle, 56, 0.065, 12, false]} /><meshPhysicalMaterial color="#2c2f31" metalness={0.6} roughness={0.3} /></mesh>
      <mesh position={[0, -0.8, 0]}><torusGeometry args={[0.62, 0.035, 12, 64]} /><meshPhysicalMaterial color="#9c7f5c" metalness={0.8} roughness={0.22} /></mesh>
    </group>
  )
}

export default CeramicKettle
