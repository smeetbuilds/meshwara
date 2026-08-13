import { Instance, Instances, Line, MeshTransmissionMaterial } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function NocturneRings() {
  const ref = useRef<GroupRef>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * .06
    ref.current.rotation.x = .3 + Math.sin(state.clock.elapsedTime * .2) * .1
  })
  return (
    <group ref={ref} rotation={[.3, -.2, .08]}>
      {[1.48, 1.12, .78].map((r, i) => (
        <mesh key={r} rotation={[i * .5, i * .8, i * .35]}>
          <torusGeometry args={[r, .105 - i * .018, 28, 180]} />
          <meshPhysicalMaterial color={i === 1 ? '#2d3140' : '#07080a'} metalness={.95} roughness={.13 + i * .04} clearcoat={1} />
        </mesh>
      ))}
      <mesh rotation={[.3, -.7, .2]}>
        <torusGeometry args={[.95, .022, 10, 180]} />
        <meshBasicMaterial color="#7e92ff" toneMapped={false} />
      </mesh>
    </group>
  )
}

export default NocturneRings
