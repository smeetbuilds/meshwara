import { RoundedBox } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
function Tube({a,b,r=.035}:{a:[number,number,number];b:[number,number,number];r?:number}){const d=useMemo(()=>{const s=new THREE.Vector3(...a),e=new THREE.Vector3(...b),v=e.clone().sub(s);return{p:s.clone().add(e).multiplyScalar(.5),l:v.length(),q:new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize())}},[a,b]);return <mesh position={d.p} quaternion={d.q}><cylinderGeometry args={[r,r,d.l,18]} /><meshPhysicalMaterial color="#70777a" metalness={.88} roughness={.22} /></mesh>}
function CantileverDiningChair(){return <group position={[0,-.7,0]} rotation={[0,-.38,0]}>
  <RoundedBox args={[1.28,.22,1.1]} radius={.16} smoothness={7} position={[0,-.24,0]} rotation={[-.05,0,0]}><meshPhysicalMaterial color="#b08266" roughness={.48} sheen={.35} /></RoundedBox>
  <RoundedBox args={[1.22,1.05,.2]} radius={.14} smoothness={7} position={[0,.56,-.48]} rotation={[-.12,0,0]}><meshPhysicalMaterial color="#b98b6d" roughness={.48} sheen={.32} /></RoundedBox>
  {[-.48,.48].map(x=><group key={x}><Tube a={[x,-.36,.35]} b={[x,-1.02,.35]} r={.045}/><Tube a={[x,-1.02,.35]} b={[x,-1.02,-.48]} r={.045}/><Tube a={[x,-1.02,-.48]} b={[x,.14,-.48]} r={.045}/></group>)}
</group>}
export default CantileverDiningChair
