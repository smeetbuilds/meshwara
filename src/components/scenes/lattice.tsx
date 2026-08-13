import { Instance, Instances, Line, MeshTransmissionMaterial } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function LatticeSignal() {
  const ref = useRef<GroupRef>(null)
  const points = useMemo(() => Array.from({ length: 125 }, (_, i) => {
    const x = i % 5
    const y = Math.floor(i / 5) % 5
    const z = Math.floor(i / 25)
    const px = (x - 2) * .48
    const py = (y - 2) * .48
    const pz = (z - 2) * .48
    const d = Math.hypot(px, py, pz)
    return { position: [px, py + Math.sin(d * 4) * .08, pz] as [number, number, number], scale: .045 + d * .012 }
  }), [])
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * .055
    ref.current.rotation.x = .52 + Math.sin(state.clock.elapsedTime * .17) * .08
  })
  return (
    <group ref={ref} rotation={[.52, .25, .12]}>
      <Instances limit={125}>
        <sphereGeometry args={[1, 18, 18]} />
        <meshPhysicalMaterial color="#b7c8ce" metalness={.82} roughness={.22} />
        {points.map((p, i) => <Instance key={i} position={p.position} scale={p.scale} />)}
      </Instances>
      <mesh rotation={[0, .2, .15]}>
        <torusGeometry args={[1.23, .022, 10, 160]} />
        <meshBasicMaterial color="#66e6ff" toneMapped={false} />
      </mesh>
    </group>
  )
}

export default LatticeSignal
