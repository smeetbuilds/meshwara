import { useMemo } from 'react'
import * as THREE from 'three'
function Tube({a,b,r=.035,color='#5b6264'}:{a:[number,number,number];b:[number,number,number];r?:number;color?:string}){const d=useMemo(()=>{const s=new THREE.Vector3(...a),e=new THREE.Vector3(...b),v=e.clone().sub(s);return {p:s.clone().add(e).multiplyScalar(.5),l:v.length(),q:new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize())}},[a,b]);return <mesh position={d.p} quaternion={d.q}><cylinderGeometry args={[r,r,d.l,18]} /><meshPhysicalMaterial color={color} metalness={.84} roughness={.27}/></mesh>}
function CargoBike(){const rear:[number,number,number]=[-1.1,-.45,0],front:[number,number,number]=[1.2,-.45,0],crank:[number,number,number]=[-.2,-.35,0];return <group position={[0,-.55,0]} rotation={[0,-.38,0]}>
 {[rear,front].map((p,i)=><group key={i} position={p}><mesh><torusGeometry args={[.58,.055,14,72]} /><meshPhysicalMaterial color="#17191a" roughness={.6}/></mesh><mesh><torusGeometry args={[.51,.012,8,64]} /><meshPhysicalMaterial color="#8e9597" metalness={.92} roughness={.2}/></mesh></group>)}
 <Tube a={rear} b={crank} r={.055}/><Tube a={crank} b={[-.45,.58,0]} r={.055}/><Tube a={[-.45,.58,0]} b={rear} r={.05}/><Tube a={[-.45,.58,0]} b={[.55,.52,0]} r={.045}/><Tube a={[.55,.52,0]} b={front} r={.045}/>
 <mesh position={[.62,.46,0]}><boxGeometry args={[1.28,.62,.82]} /><meshPhysicalMaterial color="#9e714e" roughness={.52}/></mesh>
 <mesh position={[-.64,.78,0]}><boxGeometry args={[.52,.12,.38]} /><meshPhysicalMaterial color="#313536" roughness={.42}/></mesh>
 <Tube a={[.52,.58,0]} b={[.62,1.1,0]} r={.035}/><Tube a={[.32,1.1,-.32]} b={[.92,1.1,-.32]} r={.025}/>
 <mesh position={crank} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.16,.16,.08,30]} /><meshPhysicalMaterial color="#9aa0a2" metalness={.92} roughness={.18}/></mesh>
</group>}
export default CargoBike
