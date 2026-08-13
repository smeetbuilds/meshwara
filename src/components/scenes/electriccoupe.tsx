import { RoundedBox } from '@react-three/drei'

function Wheel({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, -0.5, z]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.47, 0.47, 0.24, 48]} />
        <meshStandardMaterial color="#17191a" roughness={0.52} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.29, 0.29, 0.255, 36]} />
        <meshPhysicalMaterial color="#6c7274" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  )
}

function ElectricCoupe() {
  return (
    <group position={[0, -0.25, 0]} rotation={[0, -0.42, 0]}>
      <RoundedBox args={[3.65, 0.62, 1.55]} radius={0.28} smoothness={8} position={[0, 0.05, 0]}>
        <meshPhysicalMaterial color="#596b72" metalness={0.45} roughness={0.22} clearcoat={0.75} />
      </RoundedBox>
      <RoundedBox args={[2.05, 0.72, 1.3]} radius={0.34} smoothness={8} position={[-0.25, 0.58, 0]}>
        <meshPhysicalMaterial color="#21343d" metalness={0.2} roughness={0.08} clearcoat={1} />
      </RoundedBox>
      {[-1.2, 1.2].flatMap((x) => [-0.74, 0.74].map((z) => <Wheel key={`${x}-${z}`} x={x} z={z} />))}
      <mesh position={[1.82, 0.12, 0]}><boxGeometry args={[0.045, 0.12, 1.05]} /><meshBasicMaterial color="#e8e2cf" toneMapped={false} /></mesh>
      <mesh position={[-1.82, 0.08, 0]}><boxGeometry args={[0.045, 0.1, 1.05]} /><meshBasicMaterial color="#d4574e" toneMapped={false} /></mesh>
    </group>
  )
}

export default ElectricCoupe
