import { Instance, Instances, Line, MeshTransmissionMaterial } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function KineticArchive() {
  const ref = useRef<GroupRef>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.22
  })
  return (
    <group ref={ref} rotation={[0.2, 0.32, -0.08]}>
      {Array.from({ length: 7 }).map((_, i) => {
        const y = (i - 3) * 0.37
        const offset = Math.sin(i * 1.4) * 0.22
        return (
          <CurvedBox key={i} args={[1.72 - i * 0.055, 0.26, 0.92]} radius={0.09} smoothness={5} position={[offset, y, Math.cos(i * .8) * .12]} rotation={[0, i * .14 - .4, i * .025]}>
            <meshPhysicalMaterial color={i === 3 ? '#d8d4cb' : '#1a1b1c'} metalness={i === 3 ? .18 : .78} roughness={i === 3 ? .32 : .2} clearcoat={.65} />
          </CurvedBox>
        )
      })}
      <mesh position={[0.74, 0.02, 0.56]}>
        <sphereGeometry args={[0.09, 28, 28]} />
        <meshBasicMaterial color="#ff6d49" toneMapped={false} />
      </mesh>
    </group>
  )
}

export default KineticArchive
