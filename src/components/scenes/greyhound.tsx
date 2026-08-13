import { useMemo } from 'react'
import * as THREE from 'three'
function Bone({a,b,r=.07,color='#8a7a6d'}:{a:[number,number,number];b:[number,number,number];r?:number;color?:string}){const t=useMemo(()=>{const s=new THREE.Vector3(...a),e=new THREE.Vector3(...b),v=e.clone().sub(s);return {p:s.clone().add(e).multiplyScalar(.5),q:new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),v.clone().normalize()),l:v.length()}},[a,b]);return <mesh position={t.p} quaternion={t.q}><cylinderGeometry args={[r,r,t.l,20]} /><meshPhysicalMaterial color={color} roughness={.58} clearcoat={.12}/></mesh>}
function Greyhound(){return <group position={[0,-.95,0]} rotation={[0,-.48,0]} scale={.93}>
  <mesh position={[-.1,.82,0]} rotation={[0,0,-Math.PI/2-.08]} scale={[1.08,.7,.56]}><capsuleGeometry args={[.42,1.05,14,28]} /><meshPhysicalMaterial color="#8d7d70" roughness={.54}/></mesh>
  <mesh position={[.78,1.28,.02]} rotation={[0,0,-.58]} scale={[.44,.72,.42]}><capsuleGeometry args={[.34,.62,12,24]} /><meshPhysicalMaterial color="#8d7d70" roughness={.54}/></mesh>
  <mesh position={[1.24,1.55,.06]} rotation={[0,0,-Math.PI/2-.12]} scale={[.62,.42,.42]}><capsuleGeometry args={[.3,.56,12,24]} /><meshPhysicalMaterial color="#877568" roughness={.54}/></mesh>
  <mesh position={[1.58,1.55,.07]} rotation={[0,0,-Math.PI/2]} scale={[.38,.27,.28]}><coneGeometry args={[.28,.62,24]} /><meshPhysicalMaterial color="#6d5e54" roughness={.52}/></mesh>
  {[-1,1].map((z,i)=><mesh key={i} position={[1.15,1.92,z*.12]} rotation={[0,0,z*.2]} scale={[.22,.42,.12]}><coneGeometry args={[.34,.72,20]} /><meshPhysicalMaterial color="#6d5e54" roughness={.58}/></mesh>)}
  <Bone a={[-.55,.74,.27]} b={[-.76,.1,.3]} r={.08}/><Bone a={[-.76,.1,.3]} b={[-.72,-.72,.28]} r={.055}/><Bone a={[-.72,-.72,.28]} b={[-.5,-.85,.33]} r={.045}/>
  <Bone a={[-.48,.74,-.24]} b={[-.58,.06,-.28]} r={.08}/><Bone a={[-.58,.06,-.28]} b={[-.5,-.72,-.27]} r={.055}/><Bone a={[-.5,-.72,-.27]} b={[-.28,-.84,-.3]} r={.045}/>
  <Bone a={[-1.02,.65,.25]} b={[-1.22,.08,.28]} r={.085}/><Bone a={[-1.22,.08,.28]} b={[-1.34,-.72,.26]} r={.055}/><Bone a={[-1.34,-.72,.26]} b={[-1.16,-.83,.3]} r={.045}/>
  <Bone a={[-.96,.62,-.23]} b={[-1.08,.05,-.25]} r={.085}/><Bone a={[-1.08,.05,-.25]} b={[-1.18,-.7,-.23]} r={.055}/><Bone a={[-1.18,-.7,-.23]} b={[-1.0,-.82,-.25]} r={.045}/>
  <Bone a={[-1.26,.82,0]} b={[-1.85,.58,.04]} r={.055}/><Bone a={[-1.85,.58,.04]} b={[-2.08,.28,.08]} r={.035}/>
  <mesh position={[0,-.92,0]}><cylinderGeometry args={[1.65,1.65,.06,72]} /><meshPhysicalMaterial color="#c8c1b7" roughness={.82}/></mesh>
</group>}
export default Greyhound
