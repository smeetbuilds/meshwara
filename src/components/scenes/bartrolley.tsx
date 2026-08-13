function BarTrolley() {
  return (
    <group position={[0, -0.55, 0]} rotation={[0, -0.36, 0]}>
      {[0.05, 1.2].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[2.25, 0.09, 1.25]} />
          <meshPhysicalMaterial color="#7e6548" roughness={0.34} />
        </mesh>
      ))}
      {[-1, 1].flatMap((x) => [-0.52, 0.52].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, 0.64, z]}>
          <cylinderGeometry args={[0.035, 0.035, 1.3, 16]} />
          <meshPhysicalMaterial color="#b08a54" metalness={0.85} roughness={0.2} />
        </mesh>
      )))}
      {[-0.92, 0.92].flatMap((x) => [-0.55, 0.55].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, -0.2, z]}>
          <torusGeometry args={[0.22, 0.045, 16, 42]} />
          <meshPhysicalMaterial color="#303334" metalness={0.65} roughness={0.3} />
        </mesh>
      )))}
      <mesh position={[0, 1.47, -0.5]}>
        <boxGeometry args={[2.15, 0.055, 0.055]} />
        <meshPhysicalMaterial color="#b08a54" metalness={0.85} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default BarTrolley
