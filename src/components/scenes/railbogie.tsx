function Wheelset({ x }: { x: number }) {
  return (
    <group position={[x, -0.48, 0]}>
      {[-0.62, 0.62].map((z) => (
        <mesh key={z} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.46, 0.46, 0.18, 48]} />
          <meshPhysicalMaterial color="#4f5659" metalness={0.85} roughness={0.25} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.34, 18]} />
        <meshPhysicalMaterial color="#656d70" metalness={0.85} roughness={0.25} />
      </mesh>
    </group>
  )
}

function RailBogie() {
  return (
    <group position={[0, -0.25, 0]} rotation={[0, -0.33, 0]}>
      <Wheelset x={-1} /><Wheelset x={1} />
      <mesh><boxGeometry args={[2.6, 0.38, 1.25]} /><meshPhysicalMaterial color="#555d60" metalness={0.7} roughness={0.3} /></mesh>
      {[-0.72, 0.72].map((x) => (
        <group key={x} position={[x, 0.48, 0]}>
          {[-0.36, 0, 0.36].map((y) => <mesh key={y} position={[0, y - 0.18, 0]}><torusGeometry args={[0.18, 0.035, 10, 28]} /><meshPhysicalMaterial color="#747c7f" metalness={0.8} roughness={0.26} /></mesh>)}
        </group>
      ))}
      <mesh position={[0, 0.46, 0]}><cylinderGeometry args={[0.42, 0.42, 0.2, 36]} /><meshPhysicalMaterial color="#697174" metalness={0.8} roughness={0.26} /></mesh>
    </group>
  )
}

export default RailBogie
