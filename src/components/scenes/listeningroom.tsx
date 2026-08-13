import { RoundedBox } from '@react-three/drei'

function ListeningRoom() {
  return (
    <group rotation={[0.04, -0.28, 0]} position={[0, -0.62, 0]} scale={0.9}>
      <mesh position={[0, -1.25, 0]}><boxGeometry args={[4.4, 0.1, 3.1]} /><meshPhysicalMaterial color="#b9b1a4" roughness={0.74} /></mesh>
      <mesh position={[0, 0.18, -1.46]}><boxGeometry args={[4.3, 2.9, 0.1]} /><meshPhysicalMaterial color="#d6d0c7" roughness={0.68} /></mesh>
      {[-1.42, 1.42].map((x) => (
        <group key={x} position={[x, -0.3, -0.72]}>
          <RoundedBox args={[0.68, 1.82, 0.58]} radius={0.16} smoothness={7}><meshPhysicalMaterial color="#222527" metalness={0.62} roughness={0.3} /></RoundedBox>
          {[0.34, -0.38].map((y, i) => <mesh key={y} position={[0, y, 0.32]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[i ? 0.18 : 0.27, i ? 0.16 : 0.24, 0.09, 40]} /><meshPhysicalMaterial color="#0d0f10" roughness={0.5} /></mesh>)}
        </group>
      ))}
      <RoundedBox args={[1.65, 0.34, 0.82]} radius={0.14} smoothness={7} position={[0, -0.68, 0.45]}><meshPhysicalMaterial color="#aa8465" roughness={0.52} /></RoundedBox>
      <RoundedBox args={[1.55, 1.0, 0.25]} radius={0.13} smoothness={7} position={[0, 0.02, 0.12]} rotation={[-0.12, 0, 0]}><meshPhysicalMaterial color="#b49a83" roughness={0.6} sheen={0.45} /></RoundedBox>
      <RoundedBox args={[1.32, 0.22, 0.54]} radius={0.06} smoothness={5} position={[0, -0.83, -0.72]}><meshPhysicalMaterial color="#6e543f" roughness={0.5} /></RoundedBox>
      <mesh position={[0, -0.64, -0.72]}><cylinderGeometry args={[0.42, 0.42, 0.07, 48]} /><meshPhysicalMaterial color="#17191a" roughness={0.46} /></mesh>
      <spotLight position={[0, 2.2, 0.4]} angle={0.5} penumbra={0.9} intensity={2.2} color="#ffe6c5" />
    </group>
  )
}

export default ListeningRoom
