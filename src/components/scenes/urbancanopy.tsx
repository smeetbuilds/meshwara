import { useMemo } from 'react'
import * as THREE from 'three'
function UrbanCanopy(){const roof=useMemo(()=>{const s=new THREE.Shape();s.moveTo(-1.7,-.45);s.bezierCurveTo(-.75,-.82,.2,-.68,1.75,-.22);s.bezierCurveTo(.85,.26,-.3,.46,-1.7,.45);s.closePath();return s},[]);return <group position={[0,-.68,0]} rotation={[.04,-.36,0]}>
  <mesh position={[0,1.22,0]} rotation={[Math.PI/2,0,0]}><extrudeGeometry args={[roof,{depth:.08,bevelEnabled:true,bevelSegments:3,bevelSize:.04,bevelThickness:.03}]} /><meshPhysicalMaterial color="#d1c4a7" roughness={.46} clearcoat={.12}/></mesh>
  {[-1.2,1.2].flatMap(x=>[-.5,.5].map(z=><mesh key={`${x}-${z}`} position={[x,.24,z]}><cylinderGeometry args={[.045,.06,1.9,18]} /><meshPhysicalMaterial color="#60686a" metalness={.84} roughness={.27}/></mesh>))}
  <mesh position={[0,-.46,0]}><boxGeometry args={[2.1,.28,.62]} /><meshPhysicalMaterial color="#7a6650" roughness={.6}/></mesh>
  <mesh position={[0,-.67,0]}><boxGeometry args={[4.1,.08,2.3]} /><meshPhysicalMaterial color="#a8a39b" roughness={.84}/></mesh>
</group>}
export default UrbanCanopy
