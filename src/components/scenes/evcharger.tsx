import { useMemo } from 'react'
import * as THREE from 'three'
function EVCharger(){const cable=useMemo(()=>new THREE.CatmullRomCurve3([new THREE.Vector3(.46,.52,.12),new THREE.Vector3(.92,.15,.2),new THREE.Vector3(.88,-.72,.26),new THREE.Vector3(.42,-.82,.32)]),[]);return <group position={[0,-.7,0]} rotation={[.02,-.34,0]}>
  <mesh position={[0,.38,0]}><boxGeometry args={[1.05,2.25,.72]} /><meshPhysicalMaterial color="#d6d8d6" roughness={.34} clearcoat={.25}/></mesh>
  <mesh position={[0,.73,.38]}><planeGeometry args={[.66,.72]} /><meshBasicMaterial color="#173a3d" toneMapped={false}/></mesh>
  <mesh position={[0,.74,.39]}><planeGeometry args={[.44,.12]} /><meshBasicMaterial color="#79e6d7" toneMapped={false}/></mesh>
  <mesh position={[0,-.72,.38]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.17,.17,.12,32]} /><meshPhysicalMaterial color="#283033" metalness={.5} roughness={.3}/></mesh>
  <mesh><tubeGeometry args={[cable,64,.045,14,false]} /><meshPhysicalMaterial color="#25292a" roughness={.48}/></mesh>
  <group position={[.44,-.9,.32]} rotation={[0,0,-.55]}><mesh><boxGeometry args={[.22,.52,.18]} /><meshPhysicalMaterial color="#353b3d" roughness={.34}/></mesh><mesh position={[0,-.33,0]}><cylinderGeometry args={[.045,.06,.24,18]} /><meshPhysicalMaterial color="#9da3a5" metalness={.88} roughness={.2}/></mesh></group>
  <mesh position={[0,-.84,0]}><boxGeometry args={[1.55,.12,1.08]} /><meshPhysicalMaterial color="#a3a09a" roughness={.82}/></mesh>
</group>}
export default EVCharger
