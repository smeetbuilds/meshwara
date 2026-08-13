import { RoundedBox } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

function EspressoSet() {
  const steamA = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.18, 0.55, 0), new THREE.Vector3(-0.28, 0.86, 0.04), new THREE.Vector3(-0.12, 1.15, -0.03), new THREE.Vector3(-0.2, 1.42, 0.02),
  ]), [])
  const steamB = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.16, 0.58, 0.02), new THREE.Vector3(0.28, 0.88, -0.02), new THREE.Vector3(0.1, 1.17, 0.04), new THREE.Vector3(0.2, 1.39, 0),
  ]), [])
  return (
    <group rotation={[0.08, -0.42, 0]} position={[0, -0.55, 0]}>
      <mesh position={[0, -0.62, 0]} scale={[1.34, 0.13, 1.05]}>
        <cylinderGeometry args={[0.9, 0.9, 0.22, 64]} />
        <meshPhysicalMaterial color="#ddd6c9" roughness={0.42} clearcoat={0.18} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.62, 0.52, 1.08, 64, 1, true]} />
        <meshPhysicalMaterial color="#ece7de" roughness={0.36} clearcoat={0.28} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.055, 64]} />
        <meshPhysicalMaterial color="#3c2417" roughness={0.5} />
      </mesh>
      <mesh position={[0.68, 0.05, 0]}>
        <torusGeometry args={[0.34, 0.085, 20, 64]} />
        <meshPhysicalMaterial color="#ece7de" roughness={0.36} clearcoat={0.28} />
      </mesh>
      {[steamA, steamB].map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 48, 0.018, 8, false]} />
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.32} roughness={0.1} />
        </mesh>
      ))}
      <group position={[1.05, -0.55, 0.18]} rotation={[0, 0, -0.32]}>
        <RoundedBox args={[1.2, 0.07, 0.08]} radius={0.025} smoothness={3}>
          <meshPhysicalMaterial color="#8f795d" metalness={0.9} roughness={0.23} />
        </RoundedBox>
        <mesh position={[0.62, 0, 0]} scale={[1.45, 0.52, 0.36]}>
          <sphereGeometry args={[0.16, 28, 18]} />
          <meshPhysicalMaterial color="#8f795d" metalness={0.9} roughness={0.23} />
        </mesh>
      </group>
    </group>
  )
}

export default EspressoSet
