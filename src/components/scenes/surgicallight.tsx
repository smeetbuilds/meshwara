import { useMemo } from 'react'
import * as THREE from 'three'
function Link({a,b,r=.04}:{a:[number,number,number];b:[number,number,number];r?:number}){const d=useMemo(()=>{const s=new THREE.Vector3(...a),e=new THREE.Vector3(...b),v=e.clone().sub(s);return{p:s.clone().add(e).multiplyScalar(.5),l:v.length(),q:new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize())}},[a,b]);return <mesh position={d.p} quaternion={d.q}><cylinderGeometry args={[r,r,d.l,20]} /><meshPhysicalMaterial color="#c7cdcf" metalness={.64} roughness={.28} /></mesh>}
function SurgicalLight(){return <group position={[0,-.2,0]} rotation={[0,-.32,0]}>
  <Link a={[0,1.9,0]} b={[0,.9,0]} r={.055}/><Link a={[0,.95,0]} b={[.65,.55,0]} r={.07}/><Link a={[-.05,.92,.08]} b={[-.6,.4,.28]} r={.06}/>
  {[{p:[.83,.28,0] as [number,number,number],r:.08},{p:[-.8,.12,.35] as [number,number,number],r:-.18}].map((item,k)=><group key={k} position={item.p} rotation={[0,0,item.r]}>
    <mesh><cylinderGeometry args={[.72,.72,.12,72]} /><meshPhysicalMaterial color="#e3e8e8" roughness={.25} clearcoat={.45} /></mesh>
    <mesh position={[0,-.07,0]}><torusGeometry args={[.56,.055,16,64]} /><meshPhysicalMaterial color="#aab1b3" metalness={.7} roughness={.22} /></mesh>
    {Array.from({length:7},(_,i)=>{const a=i/7*Math.PI*2;return <mesh key={i} position={[Math.cos(a)*.38,-.08,Math.sin(a)*.38]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.095,.095,.035,24]} /><meshBasicMaterial color="#eaffff" toneMapped={false} /></mesh>})}
    <mesh position={[0,-.11,0]}><cylinderGeometry args={[.1,.1,.22,24]} /><meshPhysicalMaterial color="#555e60" metalness={.65} roughness={.3} /></mesh>
  </group>)}
</group>}
export default SurgicalLight
