import { Instance, Instances, Line, MeshTransmissionMaterial } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function BrassFold() {
  const ref = useRef<GroupRef>(null)
  const ribbons = useMemo(() => Array.from({ length: 4 }, (_, i) => {
    const phase = i * Math.PI * .46
    return new THREE.CatmullRomCurve3(Array.from({ length: 18 }, (_, j) => {
      const t = j / 17
      const angle = t * Math.PI * 2.2 + phase
      const radius = .72 + Math.sin(t * Math.PI * 3 + phase) * .28
      return new THREE.Vector3(Math.cos(angle) * radius, (t - .5) * 2.25, Math.sin(angle) * radius)
    }))
  }), [])
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * .045
    ref.current.rotation.x = .18 + Math.sin(state.clock.elapsedTime * .2) * .06
  })
  return (
    <group ref={ref} rotation={[0.18, 0.2, -0.28]}>
      {ribbons.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 180, .085 - i * .008, 16, false]} />
          <meshPhysicalMaterial color={i % 2 ? '#8a5d2e' : '#c89a5a'} metalness={.88} roughness={.2 + i * .025} clearcoat={.52} />
        </mesh>
      ))}
    </group>
  )
}

export default BrassFold
