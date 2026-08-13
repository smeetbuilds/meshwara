import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function StudioHeadphones() {
  const ref = useRef<THREE.Group>(null)
  const bandCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.05, -0.15, 0),
    new THREE.Vector3(-1.02, 0.9, 0),
    new THREE.Vector3(-0.52, 1.58, 0),
    new THREE.Vector3(0, 1.78, 0),
    new THREE.Vector3(0.52, 1.58, 0),
    new THREE.Vector3(1.02, 0.9, 0),
    new THREE.Vector3(1.05, -0.15, 0),
  ]), [])
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.13) * 0.18
  })
  return (
    <group ref={ref} rotation={[0.04, -0.25, 0]} position={[0, -0.25, 0]}>
      <mesh>
        <tubeGeometry args={[bandCurve, 96, 0.12, 18, false]} />
        <meshPhysicalMaterial color="#2a2d30" metalness={0.42} roughness={0.38} clearcoat={0.42} />
      </mesh>
      <mesh>
        <tubeGeometry args={[bandCurve, 96, 0.068, 14, false]} />
        <meshPhysicalMaterial color="#9a805f" metalness={0.8} roughness={0.22} />
      </mesh>
      {[-1.08, 1.08].map((x) => (
        <group key={x} position={[x, -0.25, 0]} rotation={[0, x > 0 ? -0.08 : 0.08, 0]}>
          <CurvedBox args={[0.42, 1.18, 0.74]} radius={0.2} smoothness={8}>
            <meshPhysicalMaterial color="#151719" metalness={0.68} roughness={0.27} clearcoat={0.38} />
          </CurvedBox>
          <mesh position={[0, 0, 0.39]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.42, 0.42, 0.1, 48]} />
            <meshPhysicalMaterial color="#23272a" roughness={0.68} sheen={0.6} sheenColor="#6c7379" />
          </mesh>
          <mesh position={[0, 0, 0.46]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.29, 0.29, 0.035, 48]} />
            <meshPhysicalMaterial color="#a88d68" metalness={0.9} roughness={0.18} />
          </mesh>
          <CurvedBox args={[0.16, 0.7, 0.18]} radius={0.055} smoothness={5} position={[0, 0.78, -0.08]}>
            <meshPhysicalMaterial color="#6c7073" metalness={0.85} roughness={0.24} />
          </CurvedBox>
        </group>
      ))}
    </group>
  )
}

export default StudioHeadphones
