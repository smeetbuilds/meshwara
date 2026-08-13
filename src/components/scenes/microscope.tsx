import { CurvedBox } from '../geometry/CurvedBox'
import { useMemo } from 'react'
import * as THREE from 'three'

function TubeBetween({ a, b, radius, color }: { a: [number, number, number]; b: [number, number, number]; radius: number; color: string }) {
  const data = useMemo(() => {
    const s = new THREE.Vector3(...a), e = new THREE.Vector3(...b), d = e.clone().sub(s)
    return { p: s.clone().add(e).multiplyScalar(0.5), l: d.length(), q: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), d.normalize()) }
  }, [a,b])
  return <mesh position={data.p} quaternion={data.q}><cylinderGeometry args={[radius,radius,data.l,24]} /><meshPhysicalMaterial color={color} metalness={0.72} roughness={0.24} /></mesh>
}

function PrecisionMicroscope() {
  return (
    <group position={[0,-0.72,0]} rotation={[0.02,-0.35,0]}>
      <CurvedBox args={[1.8,0.16,1.35]} radius={0.08} smoothness={5} position={[0,-1,0]}><meshPhysicalMaterial color="#202426" metalness={0.7} roughness={0.28} /></CurvedBox>
      <TubeBetween a={[-0.62,-0.9,0]} b={[-0.62,0.76,-0.08]} radius={0.095} color="#c7c9c7" />
      <TubeBetween a={[-0.58,0.63,-0.05]} b={[0.22,1.03,0]} radius={0.11} color="#c9cbc9" />
      <group position={[0.35,0.95,0]} rotation={[0,0,-0.34]}>
        <mesh><cylinderGeometry args={[0.22,0.22,0.72,40]} /><meshPhysicalMaterial color="#ece9e1" roughness={0.28} clearcoat={0.35} /></mesh>
        <mesh position={[0,0.42,0]}><cylinderGeometry args={[0.15,0.18,0.22,36]} /><meshPhysicalMaterial color="#171b1d" metalness={0.55} roughness={0.35} /></mesh>
        <mesh position={[0,-0.43,0]}><cylinderGeometry args={[0.28,0.24,0.12,40]} /><meshPhysicalMaterial color="#8a8f90" metalness={0.92} roughness={0.18} /></mesh>
        {[-0.16,0,0.16].map((x,i)=><mesh key={x} position={[x,-0.58,0]} rotation={[0,0,(i-1)*0.12]}><cylinderGeometry args={[0.055,0.045,0.3,24]} /><meshPhysicalMaterial color="#23282a" metalness={0.7} roughness={0.24} /></mesh>)}
      </group>
      <CurvedBox args={[1.05,0.09,0.78]} radius={0.04} smoothness={4} position={[0,-0.15,0]}><meshPhysicalMaterial color="#303638" metalness={0.76} roughness={0.24} /></CurvedBox>
      <mesh position={[0,-0.095,0]}><boxGeometry args={[0.5,0.03,0.34]} /><meshPhysicalMaterial color="#dce6e7" transmission={0.12} roughness={0.12} /></mesh>
      <mesh position={[-0.62,0.05,0.18]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.19,0.19,0.075,36]} /><meshPhysicalMaterial color="#222628" metalness={0.78} roughness={0.22} /></mesh>
      <mesh position={[-0.62,0.05,-0.18]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.12,0.12,0.08,32]} /><meshPhysicalMaterial color="#4b5255" metalness={0.82} roughness={0.2} /></mesh>
      <pointLight position={[0,-0.05,0.18]} intensity={0.7} color="#eefaff" distance={1.2} />
    </group>
  )
}
export default PrecisionMicroscope
