import { useMemo } from 'react'
import * as THREE from 'three'

function TubeBetween({ a, b, radius = 0.045, color = '#3b4245' }: { a: [number, number, number]; b: [number, number, number]; radius?: number; color?: string }) {
  const { midpoint, length, quaternion } = useMemo(() => {
    const start = new THREE.Vector3(...a)
    const end = new THREE.Vector3(...b)
    const direction = end.clone().sub(start)
    const length = direction.length()
    const midpoint = start.clone().add(end).multiplyScalar(0.5)
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize())
    return { midpoint, length, quaternion }
  }, [a, b])
  return <mesh position={midpoint} quaternion={quaternion}><cylinderGeometry args={[radius, radius, length, 18]} /><meshPhysicalMaterial color={color} metalness={0.85} roughness={0.22} /></mesh>
}

function CarbonBicycle() {
  const rear: [number, number, number] = [-1.25, -0.55, 0]
  const front: [number, number, number] = [1.25, -0.55, 0]
  const crank: [number, number, number] = [-0.2, -0.42, 0]
  const seat: [number, number, number] = [-0.55, 0.58, 0]
  const head: [number, number, number] = [0.72, 0.42, 0]
  return (
    <group rotation={[0.03, -0.42, 0]} position={[0, -0.25, 0]}>
      {[rear, front].map((p, i) => <group key={i} position={p}><mesh><torusGeometry args={[0.72, 0.055, 16, 96]} /><meshPhysicalMaterial color="#151719" roughness={0.58} /></mesh><mesh><torusGeometry args={[0.64, 0.012, 8, 64]} /><meshPhysicalMaterial color="#8f9699" metalness={0.95} roughness={0.2} /></mesh></group>)}
      <TubeBetween a={rear} b={crank} radius={0.055} />
      <TubeBetween a={crank} b={seat} radius={0.065} color="#252b2e" />
      <TubeBetween a={seat} b={head} radius={0.06} color="#252b2e" />
      <TubeBetween a={head} b={crank} radius={0.07} color="#252b2e" />
      <TubeBetween a={rear} b={seat} radius={0.045} />
      <TubeBetween a={front} b={head} radius={0.05} color="#8c744f" />
      <mesh position={[-0.58, 0.68, 0]}><boxGeometry args={[0.42, 0.08, 0.18]} /><meshPhysicalMaterial color="#1a1c1d" roughness={0.5} /></mesh>
      <TubeBetween a={[0.72, 0.42, 0]} b={[0.84, 0.78, 0]} radius={0.035} color="#9ba0a2" />
      <TubeBetween a={[0.5, 0.82, 0]} b={[1.12, 0.82, 0]} radius={0.028} color="#9ba0a2" />
      <mesh position={crank} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.19, 0.19, 0.08, 36]} /><meshPhysicalMaterial color="#9da2a4" metalness={0.96} roughness={0.18} /></mesh>
    </group>
  )
}

export default CarbonBicycle
