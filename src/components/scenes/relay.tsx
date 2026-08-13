import { Instance, Instances, Line, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

function CeramicRelay() {
  const ref = useRef<GroupRef>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * .2) * .26
  })
  return (
    <group ref={ref} rotation={[.26, .28, -.12]}>
      <RoundedBox args={[1.75, 1.15, .58]} radius={.18} smoothness={7}>
        <meshPhysicalMaterial color="#e6e0d5" roughness={.32} clearcoat={.34} />
      </RoundedBox>
      <RoundedBox args={[.94, .44, .66]} radius={.12} smoothness={6} position={[.12, .04, .18]}>
        <meshPhysicalMaterial color="#191a1b" metalness={.82} roughness={.18} />
      </RoundedBox>
      {[-.52, -.17, .18, .53].map((x, i) => (
        <mesh key={x} position={[x, -.76, 0]} rotation={[0, 0, .08 * (i - 1.5)]}>
          <cylinderGeometry args={[.045, .045, .72, 24]} />
          <meshPhysicalMaterial color="#bc8c51" metalness={1} roughness={.16} />
        </mesh>
      ))}
      <mesh position={[-.52, .24, .48]}>
        <sphereGeometry args={[.085, 24, 24]} />
        <meshBasicMaterial color="#ff5f47" toneMapped={false} />
      </mesh>
    </group>
  )
}

export default CeramicRelay
