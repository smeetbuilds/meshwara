import { useMemo } from 'react'
import * as THREE from 'three'
function Tube({a,b,r=.055,color='#393f42'}:{a:[number,number,number];b:[number,number,number];r?:number;color?:string}){const d=useMemo(()=>{const s=new THREE.Vector3(...a),e=new THREE.Vector3(...b),v=e.clone().sub(s);return{p:s.clone().add(e).multiplyScalar(.5),l:v.length(),q:new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize())}},[a,b]);return <mesh position={d.p} quaternion={d.q}><cylinderGeometry args={[r,r,d.l,20]} /><meshPhysicalMaterial color={color} metalness={.84} roughness={.24} /></mesh>}
function ConceptMotorcycle(){const rear:[number,number,number]=[-1.18,-.55,0],front:[number,number,number]=[1.25,-.55,0];return <group position={[0,-.3,0]} rotation={[0,-.4,0]}>
  {[rear,front].map((p,i)=><group key={i} position={p}><mesh><torusGeometry args={[.62,.12,20,72]} /><meshPhysicalMaterial color="#16191a" roughness={.52} /></mesh><mesh><torusGeometry args={[.47,.035,12,64]} /><meshPhysicalMaterial color="#8d9497" metalness={.92} roughness={.2} /></mesh></group>)}
  <Tube a={rear} b={[-.25,-.15,0]} r={.08}/><Tube a={[-.25,-.15,0]} b={[.45,.4,0]} r={.1} color="#8c6746"/><Tube a={[.45,.4,0]} b={front} r={.07} color="#a6abad"/>
  <mesh position={[-.1,.4,0]} rotation={[0,0,-.12]}><capsuleGeometry args={[.42,.62,10,28]} /><meshPhysicalMaterial color="#7b4c36" metalness={.48} roughness={.3} clearcoat={.35} /></mesh>
  <mesh position={[-.52,.42,0]} rotation={[0,0,-.04]}><boxGeometry args={[.7,.15,.34]} /><meshPhysicalMaterial color="#25292b" roughness={.45} /></mesh>
  <mesh position={[-.2,-.25,0]}><cylinderGeometry args={[.31,.31,.42,40]} /><meshPhysicalMaterial color="#50585b" metalness={.88} roughness={.22} /></mesh>
  <Tube a={[.62,.42,0]} b={[.78,.85,0]} r={.035} color="#b0b5b7"/><Tube a={[.45,.86,-.18]} b={[.95,.86,-.18]} r={.025} color="#b0b5b7"/>
</group>}
export default ConceptMotorcycle
