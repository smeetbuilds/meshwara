import { useMemo } from 'react'
import * as THREE from 'three'
function GrandPiano(){const shape=useMemo(()=>{const s=new THREE.Shape();s.moveTo(-1.35,-.72);s.lineTo(.35,-.72);s.bezierCurveTo(1.34,-.7,1.55,-.12,1.42,.48);s.bezierCurveTo(1.3,1.04,.72,1.28,.04,1.18);s.lineTo(-1.35,.78);s.closePath();return s},[]);return <group position={[0,-.62,0]} rotation={[0,-.4,0]}>
  <mesh rotation={[Math.PI/2,0,0]} position={[0,.52,0]}><extrudeGeometry args={[shape,{depth:.28,bevelEnabled:true,bevelSegments:4,bevelSize:.06,bevelThickness:.05,steps:1}]} /><meshPhysicalMaterial color="#17191a" metalness={.55} roughness={.2} clearcoat={.8}/></mesh>
  <mesh position={[.25,.92,-.22]} rotation={[-.08,0,.12]} scale={[1.35,.04,.72]}><boxGeometry args={[1.9,.12,1.4]} /><meshPhysicalMaterial color="#1b1d1e" metalness={.55} roughness={.17} clearcoat={.9}/></mesh>
  <mesh position={[-1.42,.36,.08]}><boxGeometry args={[.48,.22,1.52]} /><meshPhysicalMaterial color="#242526" roughness={.22}/></mesh>
  {Array.from({length:18},(_,i)=><mesh key={i} position={[-1.2+i*.055,.54,.38]}><boxGeometry args={[.05,.055,.68]} /><meshPhysicalMaterial color={i%7===2||i%7===5?'#151616':'#ece9df'} roughness={.36}/></mesh>)}
  {[[-.92,.1,-.45],[.88,.05,-.2],[-.95,.08,.48]].map((p,i)=><mesh key={i} position={p as [number,number,number]}><cylinderGeometry args={[.07,.09,1.4,24]} /><meshPhysicalMaterial color="#262829" metalness={.65} roughness={.24}/></mesh>)}
  <mesh position={[-.12,-.58,.05]}><boxGeometry args={[.7,.12,.44]} /><meshPhysicalMaterial color="#2d2f30" roughness={.34}/></mesh>
</group>}
export default GrandPiano
