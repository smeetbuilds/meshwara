import { Instance, Instances, Line, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function Coil() {
  const ref = useRef<GroupRef>(null)
  const curve = useMemo(() => new THREE.CatmullRomCurve3(Array.from({ length: 100 }, (_, i) => {
    const t = (i / 99) * Math.PI * 5.4
    return new THREE.Vector3(Math.cos(t) * 1.05, (i / 99 - 0.5) * 2.7, Math.sin(t) * 1.05)
  })), [])
  const signal = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.08
    if (signal.current) signal.current.position.copy(curve.getPoint((state.clock.elapsedTime * 0.07) % 1))
  })
  return (
    <group ref={ref} rotation={[0.15, 0.3, -0.2]}>
      <mesh>
        <tubeGeometry args={[curve, 180, 0.055, 14, false]} />
        <meshPhysicalMaterial color="#8f979d" metalness={1} roughness={0.16} />
      </mesh>
      <mesh ref={signal}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshBasicMaterial color="#ff8e72" toneMapped={false} />
      </mesh>
    </group>
  )
}

export default Coil
