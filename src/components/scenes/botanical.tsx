import { Instance, Instances } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Botanical() {
  const ref = useRef<THREE.Group>(null)
  const leafData = useMemo(() => Array.from({ length: 24 }, (_, i) => {
    const t = i / 23
    const side = i % 2 === 0 ? -1 : 1
    const y = -1.15 + t * 2.35
    const x = Math.sin(t * 4.4) * 0.38 + side * (0.35 + t * 0.28)
    const z = Math.cos(t * 3.2) * 0.22 + side * 0.12
    return {
      position: [x, y, z] as [number, number, number],
      rotation: [0.28 * side, -0.65 * side + t * 0.4, -0.48 * side] as [number, number, number],
      scale: [0.34 + t * 0.08, 0.62 + t * 0.1, 0.055] as [number, number, number],
    }
  }), [])
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.25, -1.4, 0.05), new THREE.Vector3(-0.08, -0.72, 0.02), new THREE.Vector3(0.14, -0.08, -0.08), new THREE.Vector3(-0.05, 0.62, 0.1), new THREE.Vector3(0.22, 1.35, 0),
  ]), [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.28) * 0.035
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.16
  })

  return (
    <group ref={ref} rotation={[0.03, -0.2, -0.12]}>
      <mesh>
        <tubeGeometry args={[curve, 96, 0.055, 10, false]} />
        <meshPhysicalMaterial color="#5d4936" roughness={0.78} />
      </mesh>
      <Instances limit={24}>
        <sphereGeometry args={[1, 20, 14]} />
        <meshPhysicalMaterial color="#324c39" roughness={0.54} sheen={0.35} sheenColor="#73946f" />
        {leafData.map((leaf, i) => <Instance key={i} {...leaf} />)}
      </Instances>
      <mesh position={[0.13, 1.42, 0]}>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshPhysicalMaterial color="#a18e64" roughness={0.5} />
      </mesh>
    </group>
  )
}

export default Botanical
