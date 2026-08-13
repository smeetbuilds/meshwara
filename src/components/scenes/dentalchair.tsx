import { RoundedBox } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
function Arm({a,b,r=.045}:{a:[number,number,number];b:[number,number,number];r?:number}){const d=useMemo(()=>{const s=new THREE.Vector3(...a),e=new THREE.Vector3(...b),v=e.clone().sub(s);return{p:s.clone().add(e).multiplyScalar(.5),l:v.length(),q:new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize())}},[a,b]);return <mesh position={d.p} quaternion={d.q}><cylinderGeometry args={[r,r,d.l,20]} /><meshPhysicalMaterial color="#aeb6b8" metalness={.62} roughness={.3} /></mesh>}
function DentalChair(){return <group position={[0,-.76,0]} rotation={[0,-.3,0]}>
  <mesh position={[0,-.9,0]}><cylinderGeometry args={[.62,.72,.24,52]} /><meshPhysicalMaterial color="#6f797c" metalness={.55} roughness={.34} /></mesh>
  <Arm a={[0,-.78,0]} b={[-.25,-.22,0]} r={.12}/>
  <RoundedBox args={[1.5,.28,.72]} radius={.18} smoothness={8} position={[.05,-.18,0]} rotation={[0,0,-.12]}><meshPhysicalMaterial color="#95b9b2" roughness={.46} sheen={.3} /></RoundedBox>
  <RoundedBox args={[1.18,.28,.72]} radius={.18} smoothness={8} position={[-.83,.45,0]} rotation={[0,0,.66]}><meshPhysicalMaterial color="#9bc0b9" roughness={.46} sheen={.3} /></RoundedBox>
  <RoundedBox args={[.5,.2,.66]} radius={.14} smoothness={7} position={[-1.18,.92,0]} rotation={[0,0,.46]}><meshPhysicalMaterial color="#a5c8c2" roughness={.45} /></RoundedBox>
  <Arm a={[.52,-.02,.38]} b={[1.05,.58,.48]} /><Arm a={[1.05,.58,.48]} b={[1.3,.96,.25]} />
  <mesh position={[1.35,1.0,.22]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.38,.38,.1,48]} /><meshPhysicalMaterial color="#e5e9e8" roughness={.25} clearcoat={.4} /></mesh>
  {Array.from({length:5},(_,i)=>{const a=i/5*Math.PI*2;return <mesh key={i} position={[1.35+Math.cos(a)*.2,.95, .22+Math.sin(a)*.2]}><sphereGeometry args={[.045,18,18]} /><meshBasicMaterial color="#eaffff" toneMapped={false} /></mesh>})}
</group>}
export default DentalChair
