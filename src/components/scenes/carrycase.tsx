import { RoundedBox } from '@react-three/drei'

function CarryCase() {
  return (
    <group rotation={[0.04, -0.42, -0.02]} position={[0, -0.12, 0]}>
      <RoundedBox args={[1.75, 2.4, 0.72]} radius={0.24} smoothness={9}>
        <meshPhysicalMaterial color="#25282a" metalness={0.55} roughness={0.34} clearcoat={0.5} />
      </RoundedBox>
      {[-0.72, 0.72].map((x) => <mesh key={x} position={[x, 0, 0.39]}><boxGeometry args={[0.045, 1.85, 0.035]} /><meshPhysicalMaterial color="#73787b" metalness={0.86} roughness={0.23} /></mesh>)}
      <RoundedBox args={[0.82, 0.12, 0.16]} radius={0.05} smoothness={5} position={[0, 1.38, 0]}><meshPhysicalMaterial color="#9a7d59" metalness={0.85} roughness={0.22} /></RoundedBox>
      {[-0.29, 0.29].map((x) => <mesh key={x} position={[x, 1.65, 0]}><cylinderGeometry args={[0.045, 0.045, 0.58, 16]} /><meshPhysicalMaterial color="#a6abad" metalness={0.9} roughness={0.2} /></mesh>)}
      <RoundedBox args={[0.7, 0.09, 0.13]} radius={0.04} smoothness={4} position={[0, 1.94, 0]}><meshPhysicalMaterial color="#25282a" roughness={0.35} /></RoundedBox>
      {[-0.62, 0.62].map((x) => <mesh key={x} position={[x, -1.27, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.13, 0.13, 0.16, 28]} /><meshPhysicalMaterial color="#151718" roughness={0.52} /></mesh>)}
      <mesh position={[0, -0.05, 0.43]}><boxGeometry args={[0.48, 0.03, 0.025]} /><meshBasicMaterial color="#ffb45b" toneMapped={false} /></mesh>
    </group>
  )
}

export default CarryCase
