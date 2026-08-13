import { RoundedBox } from '@react-three/drei'

function ModularDesk() {
  return (
    <group rotation={[0.04, -0.38, 0]} position={[0, -0.5, 0]}>
      <RoundedBox args={[3.25, 0.18, 1.18]} radius={0.06} smoothness={5} position={[0, 0.62, 0]}><meshPhysicalMaterial color="#a37d5b" roughness={0.5} /></RoundedBox>
      {[-1.35, 1.35].map((x) => <mesh key={x} position={[x, -0.25, 0]}><boxGeometry args={[0.08, 1.65, 0.85]} /><meshPhysicalMaterial color="#292d2f" metalness={0.88} roughness={0.23} /></mesh>)}
      <RoundedBox args={[1.05, 0.5, 0.78]} radius={0.07} smoothness={5} position={[-0.72, 0.28, 0]}><meshPhysicalMaterial color="#353a3d" metalness={0.65} roughness={0.3} /></RoundedBox>
      <mesh position={[0.52, 1.35, -0.05]}><boxGeometry args={[1.45, 0.88, 0.08]} /><meshPhysicalMaterial color="#1f2427" metalness={0.7} roughness={0.25} /></mesh>
      <mesh position={[0.52, 1.35, 0.0]}><planeGeometry args={[1.24, 0.68]} /><meshBasicMaterial color="#688b97" /></mesh>
      <mesh position={[0.52, 0.84, -0.05]}><cylinderGeometry args={[0.055, 0.065, 0.42, 18]} /><meshPhysicalMaterial color="#8d9497" metalness={0.9} roughness={0.22} /></mesh>
      <RoundedBox args={[0.9, 0.06, 0.32]} radius={0.025} smoothness={4} position={[0.45, 0.76, 0.38]}><meshPhysicalMaterial color="#d7d4cd" roughness={0.44} /></RoundedBox>
      <mesh position={[1.25, 0.82, 0.34]}><cylinderGeometry args={[0.12, 0.14, 0.42, 24]} /><meshPhysicalMaterial color="#d2c9bb" roughness={0.5} /></mesh>
    </group>
  )
}

export default ModularDesk
