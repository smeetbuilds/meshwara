import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
function CourtyardFountain(){const water=useRef<THREE.Mesh>(null);useFrame((s)=>{if(water.current)water.current.rotation.z=s.clock.elapsedTime*.03});return <group position={[0,-.72,0]} rotation={[.02,-.34,0]}>
  <mesh><cylinderGeometry args={[1.55,1.68,.28,72]} /><meshPhysicalMaterial color="#a09a8f" roughness={.76}/></mesh>
  <mesh ref={water} position={[0,.16,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[1.35,96]} /><meshPhysicalMaterial color="#6f9da0" transmission={.36} transparent opacity={.7} roughness={.18} clearcoat={.4}/></mesh>
  <mesh position={[0,.65,0]}><cylinderGeometry args={[.42,.62,1.1,56]} /><meshPhysicalMaterial color="#8f8a82" roughness={.74}/></mesh>
  <mesh position={[0,1.2,0]}><sphereGeometry args={[.32,42,30]} /><meshPhysicalMaterial color="#8a867f" roughness={.72}/></mesh>
  {Array.from({length:6},(_,i)=>{const a=i/6*Math.PI*2;const x=Math.cos(a)*.25,z=Math.sin(a)*.25;return <mesh key={i} position={[x,1.28,z]} rotation={[0,0,a]}><cylinderGeometry args={[.018,.012,1.0,10]} /><meshBasicMaterial color="#a9e0dd" transparent opacity={.72}/></mesh>})}
  <mesh position={[0,-.2,0]}><boxGeometry args={[3.9,.08,3.4]} /><meshPhysicalMaterial color="#b5b0a7" roughness={.84}/></mesh>
</group>}
export default CourtyardFountain
