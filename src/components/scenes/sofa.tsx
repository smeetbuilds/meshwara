import { RoundedBox } from '@react-three/drei'

function CantileverSofa() {
  return (
    <group rotation={[0.02, -0.38, 0]} position={[0, -0.42, 0]}>
      <RoundedBox args={[2.85, 0.35, 1.18]} radius={0.18} smoothness={8} position={[0, -0.32, 0]}>
        <meshPhysicalMaterial color="#c3b9aa" roughness={0.62} sheen={0.5} sheenColor="#d8cbbb" />
      </RoundedBox>
      <RoundedBox args={[2.72, 1.08, 0.32]} radius={0.18} smoothness={8} position={[0, 0.46, -0.48]} rotation={[-0.1, 0, 0]}>
        <meshPhysicalMaterial color="#bcb1a2" roughness={0.64} sheen={0.52} sheenColor="#dbccbb" />
      </RoundedBox>
      {[-0.72, 0.72].map((x) => (
        <RoundedBox key={x} args={[1.24, 0.18, 0.9]} radius={0.09} smoothness={6} position={[x, -0.02, 0.04]}>
          <meshPhysicalMaterial color="#d0c6b8" roughness={0.58} />
        </RoundedBox>
      ))}
      <mesh position={[0, -0.93, 0.1]}>
        <boxGeometry args={[2.52, 0.09, 0.68]} />
        <meshPhysicalMaterial color="#2b2e30" metalness={0.9} roughness={0.22} />
      </mesh>
      {[-1.0, 1.0].map((x) => (
        <mesh key={x} position={[x, -1.08, 0.1]}>
          <boxGeometry args={[0.08, 0.34, 0.72]} />
          <meshPhysicalMaterial color="#2b2e30" metalness={0.9} roughness={0.22} />
        </mesh>
      ))}
      <RoundedBox args={[0.38, 0.72, 0.18]} radius={0.09} smoothness={6} position={[0.92, 0.36, -0.22]} rotation={[0, 0, -0.12]}>
        <meshPhysicalMaterial color="#8c6853" roughness={0.64} sheen={0.45} />
      </RoundedBox>
    </group>
  )
}

export default CantileverSofa
