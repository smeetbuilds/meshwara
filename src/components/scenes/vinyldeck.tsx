import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function VinylDeck() {
  const record = useRef<THREE.Group>(null)
  const armCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.05, 0.28, -0.7),
    new THREE.Vector3(0.86, 0.36, -0.38),
    new THREE.Vector3(0.52, 0.34, -0.05),
    new THREE.Vector3(0.12, 0.25, 0.16),
  ]), [])
  useFrame((state) => {
    if (record.current) record.current.rotation.y = state.clock.elapsedTime * 0.32
  })
  return (
    <group rotation={[0.16, -0.5, 0]} position={[0, -0.42, 0]}>
      <CurvedBox args={[3.05, 0.34, 2.2]} radius={0.13} smoothness={7}>
        <meshPhysicalMaterial color="#262a2d" metalness={0.62} roughness={0.3} clearcoat={0.35} />
      </CurvedBox>
      <group ref={record} position={[-0.42, 0.24, 0]}>
        <mesh><cylinderGeometry args={[0.94, 0.94, 0.07, 96]} /><meshPhysicalMaterial color="#0e1011" roughness={0.48} /></mesh>
        <mesh position={[0, 0.045, 0]}><cylinderGeometry args={[0.21, 0.21, 0.018, 48]} /><meshBasicMaterial color="#b76658" /></mesh>
        {Array.from({ length: 5 }, (_, i) => <mesh key={i} position={[0, 0.055 + i * 0.002, 0]}><torusGeometry args={[0.36 + i * 0.11, 0.006, 6, 96]} /><meshPhysicalMaterial color="#45494b" roughness={0.5} /></mesh>)}
      </group>
      <mesh position={[1.04, 0.3, -0.72]}><cylinderGeometry args={[0.18, 0.22, 0.24, 32]} /><meshPhysicalMaterial color="#a58a68" metalness={0.88} roughness={0.2} /></mesh>
      <mesh><tubeGeometry args={[armCurve, 72, 0.035, 12, false]} /><meshPhysicalMaterial color="#bfc3c4" metalness={0.96} roughness={0.16} /></mesh>
      <CurvedBox args={[0.32, 0.12, 0.16]} radius={0.035} smoothness={4} position={[0.04, 0.25, 0.18]} rotation={[0, -0.28, 0]}>
        <meshPhysicalMaterial color="#8a6a4f" metalness={0.8} roughness={0.24} />
      </CurvedBox>
      <mesh position={[1.1, 0.27, 0.65]}><cylinderGeometry args={[0.12, 0.12, 0.12, 32]} /><meshPhysicalMaterial color="#c5c9ca" metalness={0.95} roughness={0.18} /></mesh>
    </group>
  )
}

export default VinylDeck
