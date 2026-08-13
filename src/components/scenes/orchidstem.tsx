import { useMemo } from 'react'
import * as THREE from 'three'
function Flower({p,r=0}:{p:[number,number,number];r?:number}){return <group position={p} rotation={[.2,r,.08]}>{Array.from({length:5},(_,i)=>{const a=i/5*Math.PI*2;return <mesh key={i} position={[Math.cos(a)*.18,Math.sin(a)*.14,0]} rotation={[0,0,a]} scale={[.42,.72,.16]}><sphereGeometry args={[.35,28,18]} /><meshPhysicalMaterial color="#e9d7df" roughness={.48} clearcoat={.12}/></mesh>})}<mesh position={[0,0,.08]}><sphereGeometry args={[.09,20,14]} /><meshPhysicalMaterial color="#bd8c53" roughness={.32}/></mesh></group>}
function OrchidStem(){const stem=useMemo(()=>new THREE.CatmullRomCurve3([new THREE.Vector3(0,-.85,0),new THREE.Vector3(-.08,-.05,.04),new THREE.Vector3(.18,.72,.02),new THREE.Vector3(.05,1.55,0)]),[]);return <group rotation={[.04,-.3,0]}>
  <mesh><tubeGeometry args={[stem,96,.035,12,false]} /><meshPhysicalMaterial color="#52715a" roughness={.7}/></mesh>
  <Flower p={[.12,.72,.03]} r={.2}/><Flower p={[-.06,1.12,.02]} r={-.15}/><Flower p={[.1,1.52,.02]} r={.35}/>
  {[[-.28,-.25,.03],[.3,.12,-.02]].map((p,i)=><mesh key={i} position={p as [number,number,number]} rotation={[0,0,i?-.65:.7]} scale={[.28,.85,.12]}><sphereGeometry args={[.5,32,20]} /><meshPhysicalMaterial color="#4e755d" roughness={.72}/></mesh>)}
  <mesh position={[0,-1.05,0]}><cylinderGeometry args={[.48,.4,.42,40]} /><meshPhysicalMaterial color="#6d6253" roughness={.72}/></mesh>
</group>}
export default OrchidStem
