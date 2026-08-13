import { Instance, Instances } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
import { useMemo } from 'react'

function MechanicalKeyboard() {
  const keys = useMemo(() => {
    const rows = [14, 14, 13, 12, 9]
    const data: Array<{ position: [number, number, number]; scale: [number, number, number] }> = []
    rows.forEach((count, row) => {
      const z = -0.48 + row * 0.24
      const offset = row === 2 ? 0.1 : row === 3 ? 0.2 : row === 4 ? 0.55 : 0
      for (let i = 0; i < count; i++) {
        const width = row === 4 && i === 4 ? 2.7 : row === 4 && (i === 0 || i === 8) ? 1.45 : 1
        data.push({ position: [-1.56 + offset + i * 0.24, 0.21, z], scale: [0.2 * width, 0.11, 0.18] })
      }
    })
    return data
  }, [])
  return (
    <group rotation={[0.08, -0.36, -0.02]} position={[0, -0.15, 0]} scale={0.95}>
      <CurvedBox args={[3.65, 0.34, 1.55]} radius={0.13} smoothness={7}>
        <meshPhysicalMaterial color="#202326" metalness={0.64} roughness={0.3} clearcoat={0.38} />
      </CurvedBox>
      <Instances limit={80}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color="#d8d4cc" roughness={0.42} />
        {keys.map((key, i) => <Instance key={i} position={key.position} scale={key.scale} />)}
      </Instances>
      <mesh position={[1.46, 0.22, 0.52]}><boxGeometry args={[0.46, 0.02, 0.03]} /><meshBasicMaterial color="#78f3c7" toneMapped={false} /></mesh>
      <mesh position={[-1.56, 0.25, -0.58]}><cylinderGeometry args={[0.09, 0.09, 0.12, 28]} /><meshPhysicalMaterial color="#a88861" metalness={0.92} roughness={0.18} /></mesh>
    </group>
  )
}

export default MechanicalKeyboard
