import { useMemo } from 'react'
import * as THREE from 'three'
function SuspensionDamper(){const spring=useMemo(()=>{const pts=[];const turns=8;for(let i=0;i<=180;i++){const t=i/180;const a=t*Math.PI*2*turns;pts.push(new THREE.Vector3(Math.cos(a)*.37,(t-.5)*2.2,Math.sin(a)*.37))}return new THREE.CatmullRomCurve3(pts)},[]);return <group rotation={[.15,-.42,.12]}>
  <mesh><tubeGeometry args={[spring,180,.045,12,false]} /><meshPhysicalMaterial color="#d2b25f" metalness={.95} roughness={.18} /></mesh>
  <mesh><cylinderGeometry args={[.19,.19,2.55,36]} /><meshPhysicalMaterial color="#9da4a7" metalness={.96} roughness={.16} /></mesh>
  <mesh position={[0,-1.02,0]}><cylinderGeometry args={[.43,.43,.62,44]} /><meshPhysicalMaterial color="#252a2d" metalness={.78} roughness={.25} /></mesh>
  {[-1.26,1.26].map(y=><group key={y} position={[0,y,0]}><mesh><cylinderGeometry args={[.5,.5,.13,44]} /><meshPhysicalMaterial color="#6f777a" metalness={.92} roughness={.2} /></mesh><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.22,.065,14,48]} /><meshPhysicalMaterial color="#23282a" roughness={.38} /></mesh></group>)}
  <mesh position={[0,.6,.41]}><boxGeometry args={[.16,.7,.08]} /><meshBasicMaterial color="#ff6b4d" toneMapped={false} /></mesh>
</group>}
export default SuspensionDamper
