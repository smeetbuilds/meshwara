import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
function RoboticCell(){const arm=useRef<THREE.Group>(null);useFrame(s=>{if(arm.current)arm.current.rotation.y=Math.sin(s.clock.elapsedTime*.24)*.22});return <group position={[0,-1,0]} rotation={[0,-.32,0]}>
  <mesh position={[0,-.05,0]}><boxGeometry args={[3.6,.12,2.7]}/><meshStandardMaterial color="#4b4e4f" roughness={.58}/></mesh>
  {[-1.7,1.7].flatMap(x=>[-1.25,1.25].map(z=><mesh key={`${x}-${z}`} position={[x,.95,z]}><boxGeometry args={[.05,1.95,.05]}/><meshPhysicalMaterial color="#777d80" metalness={.7} roughness={.28}/></mesh>))}
  <group ref={arm} position={[0,.05,0]}><mesh><cylinderGeometry args={[.45,.55,.28,36]}/><meshPhysicalMaterial color="#d3a938" roughness={.34}/></mesh><mesh position={[0,.85,0]} rotation={[0,0,-.32]}><boxGeometry args={[.32,1.5,.38]}/><meshPhysicalMaterial color="#d3a938" roughness={.34}/></mesh><mesh position={[.45,1.65,0]} rotation={[0,0,.75]}><boxGeometry args={[.28,1.2,.32]}/><meshPhysicalMaterial color="#c89d32" roughness={.34}/></mesh></group>
  <mesh position={[1.25,.55,0]}><boxGeometry args={[.75,.95,.9]}/><meshStandardMaterial color="#666b6d" roughness={.4}/></mesh>
  <mesh position={[-1.45,.75,1.05]}><cylinderGeometry args={[.055,.055,1.4,14]}/><meshStandardMaterial color="#555b5d"/></mesh>
  {['#65b37b','#d7ba50','#d66f5f'].map((c,i)=><mesh key={c} position={[-1.45,1.55+i*.16,1.05]}><cylinderGeometry args={[.08,.08,.12,20]}/><meshBasicMaterial color={c} toneMapped={false}/></mesh>)}
</group>} export default RoboticCell
