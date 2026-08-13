import { CurvedBox } from '../geometry/CurvedBox'
import { useMemo } from 'react'
import * as THREE from 'three'
function ExecutiveBriefcase(){const handle=useMemo(()=>new THREE.CatmullRomCurve3([new THREE.Vector3(-.38,.62,0),new THREE.Vector3(-.32,.95,0),new THREE.Vector3(.32,.95,0),new THREE.Vector3(.38,.62,0)]),[]);return <group position={[0,-.5,0]} rotation={[0,-.32,0]}>
  <CurvedBox args={[2.15,1.35,.55]} radius={.18} smoothness={8}><meshPhysicalMaterial color="#3d2a23" roughness={.4} clearcoat={.18} sheen={.28} /></CurvedBox>
  <mesh><tubeGeometry args={[handle,48,.055,16,false]} /><meshPhysicalMaterial color="#483127" roughness={.34} /></mesh>
  <mesh position={[0,.08,.3]}><boxGeometry args={[1.92,.025,.025]} /><meshPhysicalMaterial color="#201714" roughness={.5} /></mesh>
  {[-.58,.58].map(x=><group key={x} position={[x,.12,.32]}><CurvedBox args={[.28,.22,.06]} radius={.04} smoothness={4}><meshPhysicalMaterial color="#b2935e" metalness={.92} roughness={.18} /></CurvedBox><mesh position={[0,.02,.05]}><boxGeometry args={[.09,.05,.03]} /><meshBasicMaterial color="#e2c47b" /></mesh></group>)}
  {[-.85,.85].map(x=><mesh key={x} position={[x,-.72,0]}><boxGeometry args={[.22,.08,.36]} /><meshPhysicalMaterial color="#222" roughness={.48} /></mesh>)}
</group>}
export default ExecutiveBriefcase
