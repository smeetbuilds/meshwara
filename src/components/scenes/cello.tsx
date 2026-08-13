import { useMemo } from 'react'
import * as THREE from 'three'
function Cello(){const body=useMemo(()=>{const s=new THREE.Shape();s.moveTo(0,-1.15);s.bezierCurveTo(-.58,-1.05,-.7,-.56,-.44,-.22);s.bezierCurveTo(-.72,.08,-.64,.72,0,.98);s.bezierCurveTo(.64,.72,.72,.08,.44,-.22);s.bezierCurveTo(.7,-.56,.58,-1.05,0,-1.15);return s},[]);return <group rotation={[.08,-.38,.02]} position={[0,-.3,0]}>
  <mesh geometry={new THREE.ExtrudeGeometry(body,{depth:.28,bevelEnabled:true,bevelSegments:5,bevelSize:.08,bevelThickness:.06})} position={[0,0,-.14]}><meshPhysicalMaterial color="#8d4f2d" roughness={.28} clearcoat={.5}/></mesh>
  <mesh position={[0,1.58,0]}><boxGeometry args={[.16,1.45,.12]} /><meshPhysicalMaterial color="#5d3724" roughness={.36}/></mesh>
  <mesh position={[0,2.34,0]} scale={[.22,.34,.16]} rotation={[0,0,.18]}><capsuleGeometry args={[.18,.42,8,20]} /><meshPhysicalMaterial color="#5d3724" roughness={.36}/></mesh>
  <mesh position={[0,-.05,.22]}><boxGeometry args={[.62,.08,.12]} /><meshPhysicalMaterial color="#c7a068" roughness={.38}/></mesh>
  {[-.045,-.015,.015,.045].map((x,i)=><mesh key={i} position={[x,.65,.25]}><cylinderGeometry args={[.007,.007,3.0,8]} /><meshPhysicalMaterial color={i<2?'#bfc3c4':'#d4b86b'} metalness={.85} roughness={.28}/></mesh>)}
  <mesh position={[0,-1.55,0]}><cylinderGeometry args={[.025,.025,.85,10]} /><meshPhysicalMaterial color="#777b7d" metalness={.9} roughness={.25}/></mesh>
  <mesh position={[0,-2.02,0]}><sphereGeometry args={[.06,18,12]} /><meshPhysicalMaterial color="#505457" metalness={.85} roughness={.28}/></mesh>
</group>}
export default Cello
