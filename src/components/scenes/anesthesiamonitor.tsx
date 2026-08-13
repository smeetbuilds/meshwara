import { CurvedBox } from '../geometry/CurvedBox'

function AnesthesiaMonitor() {
  return (
    <group position={[0, -0.45, 0]} rotation={[0, -0.34, 0]}>
      <CurvedBox args={[2.25, 1.45, 0.72]} radius={0.14} smoothness={5}>
        <meshStandardMaterial color="#d8dad7" roughness={0.4} />
      </CurvedBox>
      <mesh position={[-0.28, 0.12, 0.37]}>
        <planeGeometry args={[1.35, 0.72]} />
        <meshBasicMaterial color="#182b2b" />
      </mesh>
      {[0.02, 0.16, 0.3].map((y, index) => (
        <mesh key={y} position={[-0.28, y, 0.375]}>
          <planeGeometry args={[1.08, 0.016]} />
          <meshBasicMaterial color={['#63c98f', '#e2c45f', '#70a8d1'][index]} toneMapped={false} />
        </mesh>
      ))}
      {[0.62, 0.88].map((x) => (
        <mesh key={x} position={[x, 0.12, 0.39]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.105, 0.105, 0.08, 28]} />
          <meshPhysicalMaterial color="#8d9698" metalness={0.62} roughness={0.27} />
        </mesh>
      ))}
      <group position={[0, -1.0, -0.1]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.1, 1.15, 22]} />
          <meshPhysicalMaterial color="#747d80" metalness={0.78} roughness={0.24} />
        </mesh>
        <mesh position={[0, -0.62, 0]}>
          <cylinderGeometry args={[0.55, 0.7, 0.12, 36]} />
          <meshStandardMaterial color="#555d60" roughness={0.38} />
        </mesh>
      </group>
    </group>
  )
}

export default AnesthesiaMonitor
