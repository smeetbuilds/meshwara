import { CurvedBox } from '../geometry/CurvedBox'
import { useMemo } from 'react'
import * as THREE from 'three'
function Wire({a,b}:{a:[number,number,number];b:[number,number,number]}){const d=useMemo(()=>{const s=new THREE.Vector3(...a),e=new THREE.Vector3(...b),v=e.clone().sub(s);return{p:s.clone().add(e).multiplyScalar(.5),l:v.length(),q:new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize())}},[a,b]);return <mesh position={d.p} quaternion={d.q}><cylinderGeometry args={[.018,.018,d.l,12]} /><meshPhysicalMaterial color="#a88a57" metalness={.9} roughness={.2} /></mesh>}
function KineticBalance(){return <group position={[0,-.7,0]} rotation={[0,-.3,0]}>
  <CurvedBox args={[1.7,.14,1.0]} radius={.06} smoothness={4} position={[0,-.95,0]}><meshPhysicalMaterial color="#2b3032" metalness={.65} roughness={.32} /></CurvedBox>
  <mesh position={[0,-.12,0]}><cylinderGeometry args={[.08,.1,1.55,24]} /><meshPhysicalMaterial color="#b59763" metalness={.88} roughness={.2} /></mesh>
  <mesh position={[0,.64,0]}><boxGeometry args={[2.45,.09,.09]} /><meshPhysicalMaterial color="#bba06e" metalness={.9} roughness={.18} /></mesh>
  {[-1.05,1.05].map(x=><group key={x}><Wire a={[x,.62,0]} b={[x,-.18,-.42]}/><Wire a={[x,.62,0]} b={[x,-.18,.42]}/><mesh position={[x,-.27,0]}><cylinderGeometry args={[.58,.44,.08,48]} /><meshPhysicalMaterial color="#a4aaac" metalness={.82} roughness={.25} /></mesh></group>)}
  <mesh position={[0,.65,0]}><sphereGeometry args={[.12,24,24]} /><meshPhysicalMaterial color="#d7b96f" metalness={.94} roughness={.16} /></mesh>
  {[[-.28,-.82,.2],[.26,-.82,.14]].map((p,i)=><mesh key={i} position={p as [number,number,number]}><cylinderGeometry args={[i?.14:.18,i?.14:.18,i?.22:.28,32]} /><meshPhysicalMaterial color="#6d7477" metalness={.88} roughness={.2} /></mesh>)}
</group>}
export default KineticBalance
