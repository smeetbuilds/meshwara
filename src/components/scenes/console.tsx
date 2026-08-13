import { RoundedBox } from '@react-three/drei'

function TravertineConsole() {
  return (
    <group rotation={[0.03, -0.38, 0]} position={[0, -0.42, 0]}>
      <RoundedBox args={[3.05, 0.28, 0.86]} radius={0.09} smoothness={6} position={[0, 0.72, 0]}>
        <meshPhysicalMaterial color="#cbbca6" roughness={0.72} clearcoat={0.08} />
      </RoundedBox>
      {[-1.1, 1.1].map((x) => (
        <RoundedBox key={x} args={[0.38, 1.68, 0.7]} radius={0.08} smoothness={6} position={[x, -0.23, 0]}>
          <meshPhysicalMaterial color="#c4b49d" roughness={0.76} />
        </RoundedBox>
      ))}
      <RoundedBox args={[1.34, 0.12, 0.54]} radius={0.04} smoothness={4} position={[0, 0.47, 0.02]}>
        <meshPhysicalMaterial color="#242729" metalness={0.82} roughness={0.24} />
      </RoundedBox>
      <mesh position={[0, 0.96, 0]}>
        <torusGeometry args={[0.34, 0.055, 18, 72]} />
        <meshPhysicalMaterial color="#96764e" metalness={0.88} roughness={0.22} />
      </mesh>
      <mesh position={[0, 1.05, 0]} scale={[0.52, 0.78, 0.2]}>
        <sphereGeometry args={[0.34, 36, 24]} />
        <meshPhysicalMaterial color="#ece6db" roughness={0.48} />
      </mesh>
    </group>
  )
}

export default TravertineConsole
