import { useMemo } from 'react'
import * as THREE from 'three'
function Rod({a,b,r=.035}:{a:[number,number,number];b:[number,number,number];r?:number}){const d=useMemo(()=>{const s=new THREE.Vector3(...a),e=new THREE.Vector3(...b),v=e.clone().sub(s);return{p:s.clone().add(e).multiplyScalar(.5),l:v.length(),q:new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize())}},[a,b]);return <mesh position={d.p} quaternion={d.q}><cylinderGeometry args={[r,r,d.l,18]} /><meshPhysicalMaterial color="#7c8588" metalness={.9} roughness={.23} /></mesh>}
function PressureValve(){return <group rotation={[.12,-.38,.04]}>
  <mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.52,.52,1.5,56]} /><meshPhysicalMaterial color="#596164" metalness={.82} roughness={.28} /></mesh>
  {[-.9,.9].map(x=><mesh key={x} position={[x,0,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.72,.72,.22,56]} /><meshPhysicalMaterial color="#7e878a" metalness={.9} roughness={.22} /></mesh>)}
  <mesh position={[0,.62,0]}><cylinderGeometry args={[.34,.42,.72,48]} /><meshPhysicalMaterial color="#656d70" metalness={.86} roughness={.25} /></mesh>
  <Rod a={[0,.92,0]} b={[0,1.55,0]} r={.06}/>
  <group position={[0,1.58,0]} rotation={[Math.PI/2,0,0]}><mesh><torusGeometry args={[.58,.06,16,72]} /><meshPhysicalMaterial color="#b58b45" metalness={.92} roughness={.22} /></mesh>{Array.from({length:6},(_,i)=>{const a=i/6*Math.PI*2;return <Rod key={i} a={[0,0,0]} b={[Math.cos(a)*.54,Math.sin(a)*.54,0]} r={.025}/>})}<mesh><cylinderGeometry args={[.11,.11,.1,28]} /><meshPhysicalMaterial color="#8a6636" metalness={.95} roughness={.18} /></mesh></group>
</group>}
export default PressureValve
