import { useMemo } from 'react'
import * as THREE from 'three'
function MuseumCanopy(){const shape=useMemo(()=>{const s=new THREE.Shape();s.moveTo(-1.7,0);s.bezierCurveTo(-.8,.5,.8,.5,1.7,0);s.lineTo(1.55,-.15);s.bezierCurveTo(.7,.2,-.7,.2,-1.55,-.15);s.closePath();return s},[]);return <group rotation={[0,-.32,0]} position={[0,-.55,0]}>
  <mesh position={[0,1.25,0]} rotation={[Math.PI/2,0,0]}><extrudeGeometry args={[shape,{depth:2.4,bevelEnabled:true,bevelSize:.03,bevelThickness:.04,bevelSegments:3}]} /><meshPhysicalMaterial color="#d7d6d1" metalness={.35} roughness={.28}/></mesh>
  {[-1.25,1.25].flatMap(x=>[-.8,.8].map(z=><mesh key={`${x}-${z}`} position={[x,.15,z]}><cylinderGeometry args={[.06,.08,2.25,24]} /><meshPhysicalMaterial color="#595e5f" metalness={.8} roughness={.22}/></mesh>))}
  <mesh position={[0,-.97,0]}><boxGeometry args={[3.6,.12,2.7]} /><meshPhysicalMaterial color="#c7c2b8" roughness={.78}/></mesh>
</group>}
export default MuseumCanopy
