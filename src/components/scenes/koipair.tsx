import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
function Fish({offset,flip,color}:{offset:[number,number,number];flip?:boolean;color:string}){const ref=useRef<THREE.Group>(null);useFrame((s)=>{if(ref.current){const t=s.clock.elapsedTime;ref.current.rotation.z=(flip?-1:1)*.08*Math.sin(t*.7)+(flip?Math.PI:0);ref.current.position.y=offset[1]+Math.sin(t*.55+(flip?1.7:0))*.08}});return <group ref={ref} position={offset} rotation={[0,0,flip?Math.PI:0]}>
  <mesh rotation={[0,0,-Math.PI/2]} scale={[1.05,.42,.34]}><capsuleGeometry args={[.42,1.2,12,32]} /><meshPhysicalMaterial color={color} roughness={.34} clearcoat={.32}/></mesh>
  <mesh position={[-1.0,0,0]} rotation={[0,0,-Math.PI/2]} scale={[.55,.75,.14]}><coneGeometry args={[.62,.95,28]} /><meshPhysicalMaterial color="#f4ece2" roughness={.42} transparent opacity={.86}/></mesh>
  {[-1,1].map((z,i)=><mesh key={i} position={[-.1,-.1,z*.32]} rotation={[Math.PI/2,0,z*.35]} scale={[.58,.32,.08]}><circleGeometry args={[.42,28]} /><meshPhysicalMaterial color="#f3e5da" roughness={.5} side={THREE.DoubleSide}/></mesh>)}
  <mesh position={[.83,.14,.25]}><sphereGeometry args={[.045,20,14]} /><meshBasicMaterial color="#0e1112" /></mesh>
  <mesh position={[.83,.14,-.25]}><sphereGeometry args={[.045,20,14]} /><meshBasicMaterial color="#0e1112" /></mesh>
</group>}
function KoiPair(){return <group rotation={[.28,-.34,.08]}><Fish offset={[-.15,.35,0]} color="#d47a4c"/><Fish offset={[.1,-.45,.15]} flip color="#d8d4ca"/><mesh position={[0,-1.0,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[1.7,96]} /><meshPhysicalMaterial color="#7ca1a1" transmission={.5} transparent opacity={.24} roughness={.18} side={THREE.DoubleSide}/></mesh></group>}
export default KoiPair
