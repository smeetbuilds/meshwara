import { Instance, Instances, MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function ApertureModule() {
  const ref = useRef<THREE.Group>(null)
  const iris = useRef<THREE.Group>(null)
  const knurl = useMemo(() => Array.from({ length: 48 }, (_, i) => {
    const a = (i / 48) * Math.PI * 2
    return { position: [Math.sin(a) * 1.24, Math.cos(a) * 1.24, -0.08] as [number, number, number], rotation: [0, 0, -a] as [number, number, number] }
  }), [])
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.14) * 0.22
    if (iris.current) iris.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.24) * 0.2
  })
  return (
    <group ref={ref} rotation={[0.18, -0.36, -0.08]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1.44, 1.44, 0.7, 96]} /><meshPhysicalMaterial color="#1b1d1f" metalness={0.96} roughness={0.22} /></mesh>
      <mesh position={[0, 0, 0.38]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1.18, 1.18, 0.13, 96]} /><meshPhysicalMaterial color="#090b0d" metalness={0.85} roughness={0.18} /></mesh>
      <mesh position={[0, 0, 0.48]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.94, 0.94, 0.08, 96]} /><MeshTransmissionMaterial transmission={0.88} thickness={0.65} roughness={0.04} ior={1.55} chromaticAberration={0.025} color="#90a7b4" /></mesh>
      <mesh position={[0, 0, 0.535]}><torusGeometry args={[0.66, 0.035, 16, 96]} /><meshBasicMaterial color="#4c87a0" toneMapped={false} /></mesh>
      <Instances limit={48}>
        <boxGeometry args={[0.018, 0.15, 0.05]} />
        <meshPhysicalMaterial color="#6f7376" metalness={1} roughness={0.32} />
        {knurl.map((item, i) => <Instance key={i} {...item} />)}
      </Instances>
      <group ref={iris} position={[0, 0, 0.565]}>
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2
          return <mesh key={i} rotation={[0, 0, a + 0.44]} position={[Math.sin(a) * 0.28, Math.cos(a) * 0.28, 0]}><boxGeometry args={[0.34, 0.72, 0.012]} /><meshPhysicalMaterial color="#171a1c" metalness={0.7} roughness={0.26} /></mesh>
        })}
      </group>
    </group>
  )
}

export default ApertureModule
