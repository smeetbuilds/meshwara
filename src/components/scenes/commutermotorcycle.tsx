function Wheel({ x }: { x: number }) {
  return (
    <group position={[x, -0.48, 0]}>
      <mesh><torusGeometry args={[0.56, 0.11, 18, 56]} /><meshStandardMaterial color="#17191a" roughness={0.54} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.23, 0.23, 0.12, 32]} /><meshPhysicalMaterial color="#6a7072" metalness={0.82} roughness={0.24} /></mesh>
    </group>
  )
}

function CommuterMotorcycle() {
  return (
    <group position={[0, -0.35, 0]} rotation={[0, -0.38, 0]}>
      <Wheel x={-1.05} /><Wheel x={1.1} />
      <mesh position={[0, 0.05, 0]} rotation={[0, 0, -0.35]}><boxGeometry args={[1.55, 0.16, 0.18]} /><meshPhysicalMaterial color="#555d60" metalness={0.72} roughness={0.28} /></mesh>
      <mesh position={[-0.25, 0.55, 0]} rotation={[0, 0, -0.12]}><capsuleGeometry args={[0.3, 0.65, 10, 24]} /><meshPhysicalMaterial color="#374249" roughness={0.28} clearcoat={0.5} /></mesh>
      <mesh position={[-0.42, 0.92, 0]} rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[0.18, 0.72, 8, 24]} /><meshStandardMaterial color="#242728" roughness={0.48} /></mesh>
      <mesh position={[0.83, 0.47, 0]} rotation={[0, 0, -0.23]}><cylinderGeometry args={[0.045, 0.045, 1.15, 16]} /><meshPhysicalMaterial color="#747b7e" metalness={0.85} roughness={0.22} /></mesh>
      <mesh position={[0.9, 1.02, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.035, 0.035, 0.78, 14]} /><meshStandardMaterial color="#34383a" /></mesh>
    </group>
  )
}

export default CommuterMotorcycle
