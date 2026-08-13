import { MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function OpticalFrames() {
  const ref = useRef<THREE.Group>(null)
  const bridge = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.32, 0.08, 0), new THREE.Vector3(-0.18, 0.17, 0.02), new THREE.Vector3(0, 0.2, 0.03), new THREE.Vector3(0.18, 0.17, 0.02), new THREE.Vector3(0.32, 0.08, 0),
  ]), [])
  useFrame((state) => { if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.2 })
  return (
    <group ref={ref} rotation={[0.04, -0.2, -0.02]}>
      {[-0.7, 0.7].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh><torusGeometry args={[0.58, 0.045, 14, 72]} /><meshPhysicalMaterial color="#a68d70" metalness={0.9} roughness={0.2} /></mesh>
          <mesh position={[0, 0, -0.025]}><circleGeometry args={[0.53, 72]} /><MeshTransmissionMaterial transmission={0.93} thickness={0.08} roughness={0.04} ior={1.49} chromaticAberration={0.008} color="#c7dbe0" /></mesh>
          <mesh position={[x < 0 ? -0.63 : 0.63, 0.07, -0.78]} rotation={[0.06, x < 0 ? -0.1 : 0.1, 0]}><boxGeometry args={[0.055, 0.055, 1.55]} /><meshPhysicalMaterial color="#25282a" metalness={0.78} roughness={0.26} /></mesh>
        </group>
      ))}
      <mesh><tubeGeometry args={[bridge, 32, 0.035, 10, false]} /><meshPhysicalMaterial color="#a68d70" metalness={0.9} roughness={0.2} /></mesh>
      {[-0.34, 0.34].map((x) => <mesh key={x} position={[x, -0.18, 0.04]} rotation={[0.1, 0, x * 0.25]}><sphereGeometry args={[0.07, 20, 14]} /><meshPhysicalMaterial color="#d1c7b8" roughness={0.52} /></mesh>)}
    </group>
  )
}

export default OpticalFrames
