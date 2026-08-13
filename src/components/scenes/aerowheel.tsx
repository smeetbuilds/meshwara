function AeroWheel() {
  return (
    <group rotation={[0, -0.35, 0]}>
      <mesh><torusGeometry args={[1.08, 0.23, 28, 96]} /><meshStandardMaterial color="#151718" roughness={0.48} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.82, 0.82, 0.22, 72]} /><meshPhysicalMaterial color="#454a4c" metalness={0.9} roughness={0.18} /></mesh>
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2
        return (
          <group key={i} rotation={[0, 0, a]}>
            <mesh position={[0, 0.47, 0]}><boxGeometry args={[0.1, 0.86, 0.08]} /><meshPhysicalMaterial color="#71777a" metalness={0.92} roughness={0.18} /></mesh>
          </group>
        )
      })}
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.2, 0.2, 0.3, 36]} /><meshPhysicalMaterial color="#a3a6a7" metalness={1} roughness={0.13} /></mesh>
    </group>
  )
}

export default AeroWheel
