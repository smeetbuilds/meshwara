import { Instance, Instances } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

function StonePine() {
  const trunk = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -1.3, 0), new THREE.Vector3(-0.08, -0.5, 0.02), new THREE.Vector3(0.12, 0.25, -0.06), new THREE.Vector3(0.02, 1.2, 0),
  ]), [])
  const foliage = useMemo(() => Array.from({ length: 34 }, (_, i) => {
    const ring = Math.floor(i / 9)
    const a = i * 2.399963229728653
    const r = 0.28 + ring * 0.16
    const y = 0.25 + ring * 0.28 + Math.sin(i * 0.7) * 0.05
    return { position: [Math.cos(a) * r, y, Math.sin(a) * r] as [number, number, number], scale: [0.38 + ring * 0.03, 0.22, 0.38 + ring * 0.03] as [number, number, number] }
  }), [])
  return (
    <group rotation={[0.02, -0.4, -0.03]} position={[0, -0.22, 0]}>
      <mesh><tubeGeometry args={[trunk, 72, 0.09, 12, false]} /><meshPhysicalMaterial color="#5b4634" roughness={0.78} /></mesh>
      {[-0.72, 0.62, -0.42, 0.48].map((x, i) => {
        const y = 0.18 + i * 0.22
        const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, y, 0), new THREE.Vector3(x * 0.55, y + 0.12, 0.05 * (i % 2 ? -1 : 1)), new THREE.Vector3(x, y + 0.08, 0)])
        return <mesh key={i}><tubeGeometry args={[curve, 32, 0.045, 8, false]} /><meshPhysicalMaterial color="#5b4634" roughness={0.78} /></mesh>
      })}
      <Instances limit={40}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial color="#365141" roughness={0.58} sheen={0.28} sheenColor="#6e896f" />
        {foliage.map((item, i) => <Instance key={i} position={item.position} scale={item.scale} rotation={[0.1 * (i % 3), i * 0.37, -0.08 * (i % 2)]} />)}
      </Instances>
      <mesh position={[0, -1.38, 0]} scale={[1.35, 0.22, 1]}><sphereGeometry args={[0.75, 36, 20]} /><meshPhysicalMaterial color="#858079" roughness={0.8} /></mesh>
    </group>
  )
}

export default StonePine
