import { Instance, Instances, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function MicroCore() {
  const ref = useRef<THREE.Group>(null)
  const pins = useMemo(() => {
    const list: Array<{ position: [number, number, number]; rotation: [number, number, number] }> = []
    for (let i = -7; i <= 7; i++) {
      const v = i * 0.18
      list.push({ position: [v, 1.14, 0], rotation: [0, 0, 0] }, { position: [v, -1.14, 0], rotation: [0, 0, 0] })
      list.push({ position: [1.14, v, 0], rotation: [0, 0, Math.PI / 2] }, { position: [-1.14, v, 0], rotation: [0, 0, Math.PI / 2] })
    }
    return list
  }, [])
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.24
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.11) * 0.1
    }
  })
  return (
    <group ref={ref} rotation={[0.34, -0.42, 0.12]}>
      <RoundedBox args={[2.2, 2.2, 0.22]} radius={0.16} smoothness={6}>
        <meshPhysicalMaterial color="#111517" metalness={0.7} roughness={0.32} />
      </RoundedBox>
      <RoundedBox args={[1.2, 1.2, 0.28]} radius={0.12} smoothness={6} position={[0, 0, 0.18]}>
        <meshPhysicalMaterial color="#263b36" metalness={0.5} roughness={0.26} clearcoat={0.5} />
      </RoundedBox>
      <RoundedBox args={[0.68, 0.68, 0.12]} radius={0.08} smoothness={5} position={[0, 0, 0.4]}>
        <meshBasicMaterial color="#72f3c0" toneMapped={false} />
      </RoundedBox>
      <Instances limit={60}>
        <boxGeometry args={[0.1, 0.28, 0.055]} />
        <meshPhysicalMaterial color="#b99966" metalness={1} roughness={0.22} />
        {pins.map((pin, i) => <Instance key={i} {...pin} />)}
      </Instances>
      {[-0.74, 0.74].flatMap((x) => [-0.74, 0.74].map((y) => (
        <mesh key={`${x}-${y}`} position={[x, y, 0.34]}><sphereGeometry args={[0.06, 20, 20]} /><meshBasicMaterial color="#de9a56" /></mesh>
      )))}
    </group>
  )
}

export default MicroCore
