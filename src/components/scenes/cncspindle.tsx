import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
function CncSpindle(){const collet=useRef<THREE.Group>(null);useFrame((_,d)=>{if(collet.current)collet.current.rotation.y+=d*.42});return <group rotation={[.18,-.42,.12]}>
  <mesh><cylinderGeometry args={[.52,.52,1.8,64]} /><meshPhysicalMaterial color="#9ea5a8" metalness={.96} roughness={.16} /></mesh>
  <mesh position={[0,.76,0]}><cylinderGeometry args={[.63,.63,.28,64]} /><meshPhysicalMaterial color="#4e5659" metalness={.9} roughness={.22} /></mesh>
  <group ref={collet} position={[0,-1.02,0]}><mesh><cylinderGeometry args={[.34,.24,.45,48]} /><meshPhysicalMaterial color="#c1c6c8" metalness={1} roughness={.14} /></mesh>{Array.from({length:8},(_,i)=>{const a=i/8*Math.PI*2;return <mesh key={i} position={[Math.cos(a)*.22,-.2,Math.sin(a)*.22]} rotation={[0,-a,0]}><boxGeometry args={[.06,.34,.04]} /><meshPhysicalMaterial color="#596164" metalness={.92} roughness={.2} /></mesh>})}<mesh position={[0,-.58,0]}><cylinderGeometry args={[.08,.08,.62,24]} /><meshPhysicalMaterial color="#d5b55f" metalness={.93} roughness={.18} /></mesh></group>
  {Array.from({length:14},(_,i)=><mesh key={i} position={[0,-.55+i*.08,.53]}><boxGeometry args={[.48,.018,.02]} /><meshBasicMaterial color={i===7?'#79e7d8':'#4e5659'} toneMapped={i===7?false:true} /></mesh>)}
</group>}
export default CncSpindle
