import { MeshTransmissionMaterial } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
function Strut({a,b,r=.035}:{a:[number,number,number];b:[number,number,number];r?:number}){const d=useMemo(()=>{const s=new THREE.Vector3(...a),e=new THREE.Vector3(...b),v=e.clone().sub(s);return{p:s.clone().add(e).multiplyScalar(.5),l:v.length(),q:new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize())}},[a,b]);return <mesh position={d.p} quaternion={d.q}><cylinderGeometry args={[r,r,d.l,18]} /><meshPhysicalMaterial color="#788184" metalness={.86} roughness={.22} /></mesh>}
function PrecisionTelescope(){return <group position={[0,-.72,0]} rotation={[0,-.38,0]}>
  <mesh position={[0,-.62,0]}><cylinderGeometry args={[.18,.24,.34,36]} /><meshPhysicalMaterial color="#3f4649" metalness={.8} roughness={.25} /></mesh>
  {[-1,1].map((s)=><Strut key={s} a={[0,-.45,0]} b={[s*.72,-1.05,.48]} r={.045}/>)}<Strut a={[0,-.45,0]} b={[0,-1.05,-.72]} r={.045}/>
  <group position={[0,.45,0]} rotation={[0,0,-.42]}>
    <mesh><cylinderGeometry args={[.3,.34,1.8,48]} /><meshPhysicalMaterial color="#d9dddc" roughness={.24} clearcoat={.38} /></mesh>
    <mesh position={[0,.95,0]}><cylinderGeometry args={[.38,.38,.16,48]} /><meshPhysicalMaterial color="#596164" metalness={.82} roughness={.22} /></mesh>
    <mesh position={[0,1.04,0]}><cylinderGeometry args={[.31,.31,.06,48]} /><MeshTransmissionMaterial transmission={.94} thickness={.2} roughness={.06} ior={1.48} chromaticAberration={.012} /></mesh>
    <mesh position={[0,-1,0]}><cylinderGeometry args={[.2,.23,.22,40]} /><meshPhysicalMaterial color="#252a2c" metalness={.7} roughness={.3} /></mesh>
  </group>
  <mesh position={[.2,.26,.3]} rotation={[0,0,-.4]}><cylinderGeometry args={[.08,.08,.5,24]} /><meshPhysicalMaterial color="#b89a61" metalness={.86} roughness={.2} /></mesh>
</group>}
export default PrecisionTelescope
