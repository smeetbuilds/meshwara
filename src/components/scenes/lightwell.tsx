import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'

function AtriumLightwell() {
  return (
    <group rotation={[0.05, -0.32, 0]} position={[0, -0.6, 0]} scale={0.88}>
      <mesh position={[0, -1.25, 0]}><boxGeometry args={[4.2, 0.12, 3.2]} /><meshPhysicalMaterial color="#d5d0c7" roughness={0.72} /></mesh>
      <mesh position={[-2.0, 0.2, 0]}><boxGeometry args={[0.12, 3.0, 3.2]} /><meshPhysicalMaterial color="#e2ddd5" roughness={0.7} /></mesh>
      <mesh position={[0, 0.2, -1.54]}><boxGeometry args={[4.0, 3.0, 0.12]} /><meshPhysicalMaterial color="#ded8cf" roughness={0.7} /></mesh>
      <mesh position={[0, 1.67, 0]} rotation={[Math.PI / 2, 0, 0]}><planeGeometry args={[2.8, 1.8]} /><MeshTransmissionMaterial transmission={0.93} thickness={0.08} roughness={0.07} ior={1.48} color="#c8dce4" /></mesh>
      {[-1.4, -0.7, 0, 0.7, 1.4].map((x) => <mesh key={x} position={[x, 1.7, 0]}><boxGeometry args={[0.05, 0.08, 2.0]} /><meshPhysicalMaterial color="#777c7f" metalness={0.8} roughness={0.26} /></mesh>)}
      <RoundedBox args={[1.55, 0.42, 0.62]} radius={0.1} smoothness={6} position={[0.75, -0.98, 0.42]}><meshPhysicalMaterial color="#a78865" roughness={0.48} /></RoundedBox>
      <mesh position={[-0.75, -0.78, 0.28]}><cylinderGeometry args={[0.32, 0.46, 0.92, 48]} /><meshPhysicalMaterial color="#b8b1a6" roughness={0.62} /></mesh>
      <mesh position={[-0.75, -0.14, 0.28]} scale={[0.68, 1.0, 0.68]}><icosahedronGeometry args={[0.46, 3]} /><meshPhysicalMaterial color="#49634d" roughness={0.58} sheen={0.32} /></mesh>
      <pointLight position={[0, 2.0, 0.4]} intensity={1.2} color="#eef8ff" distance={5} />
    </group>
  )
}

export default AtriumLightwell
