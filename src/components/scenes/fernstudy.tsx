import { useMemo } from 'react'
import * as THREE from 'three'
function FernStudy(){const fronds=useMemo(()=>Array.from({length:7},(_,i)=>{const a=-1.15+i*.38;return {a,curve:new THREE.CatmullRomCurve3([new THREE.Vector3(0,-.3,0),new THREE.Vector3(Math.sin(a)*.28,.3,Math.cos(a)*.28),new THREE.Vector3(Math.sin(a)*.74,.92,Math.cos(a)*.74),new THREE.Vector3(Math.sin(a)*1.08,1.35,Math.cos(a)*1.08)])}}),[]);return <group position={[0,-.72,0]} rotation={[.03,-.3,0]}>
  {fronds.map((f,i)=><group key={i}><mesh><tubeGeometry args={[f.curve,64,.022,10,false]} /><meshPhysicalMaterial color="#456c55" roughness={.72}/></mesh>{Array.from({length:8},(_,j)=>{const t=.18+j*.09;const p=f.curve.getPoint(t);const tangent=f.curve.getTangent(t);const yaw=Math.atan2(tangent.x,tangent.z);return [-1,1].map(side=><mesh key={`${j}-${side}`} position={[p.x,p.y,p.z]} rotation={[.2,yaw+side*.8,side*.4]} scale={[.12,.42,.06]}><sphereGeometry args={[.5,22,14]} /><meshPhysicalMaterial color={j%2?'#547b60':'#4b725a'} roughness={.74}/></mesh>)})}</group>)}
  <mesh position={[0,-.58,0]}><cylinderGeometry args={[.56,.48,.42,40]} /><meshPhysicalMaterial color="#665c50" roughness={.74}/></mesh>
</group>}
export default FernStudy
