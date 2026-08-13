import { useMemo } from 'react'
import * as THREE from 'three'
function Link({a,b,r=.045}:{a:[number,number,number];b:[number,number,number];r?:number}){const d=useMemo(()=>{const s=new THREE.Vector3(...a),e=new THREE.Vector3(...b),v=e.clone().sub(s);return {p:s.clone().add(e).multiplyScalar(.5),q:new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize()),l:v.length()}},[a,b]);return <mesh position={d.p} quaternion={d.q}><cylinderGeometry args={[r,r,d.l,18]} /><meshPhysicalMaterial color="#9ca3a5" metalness={.88} roughness={.24}/></mesh>}
function ProstheticHand(){const xs=[-.32,-.11,.1,.31];return <group position={[0,-.45,0]} rotation={[.18,-.42,-.08]}>
  <mesh scale={[.65,.85,.22]}><capsuleGeometry args={[.44,.72,10,28]} /><meshPhysicalMaterial color="#555e61" metalness={.62} roughness={.3}/></mesh>
  {xs.map((x,i)=>{const y=.72,z=0;const l=.64+(1-Math.abs(i-1.5)/2)*.16;return <group key={x}><Link a={[x,.42,z]} b={[x,y+.36,z]} r={.055}/><Link a={[x,y+.36,z]} b={[x+(i<2?-.03:.03),y+l,z]} r={.045}/><mesh position={[x,y+.34,z]}><sphereGeometry args={[.085,20,14]} /><meshPhysicalMaterial color="#c1c6c8" metalness={.9} roughness={.18}/></mesh></group>})}
  <Link a={[-.42,.1,0]} b={[-.78,.42,.02]} r={.06}/><Link a={[-.78,.42,.02]} b={[-.98,.66,.03]} r={.045}/>
  <mesh position={[0,-.76,0]}><cylinderGeometry args={[.31,.38,.6,36]} /><meshPhysicalMaterial color="#383f41" metalness={.55} roughness={.34}/></mesh>
  <mesh position={[0,-1.05,0]}><torusGeometry args={[.34,.045,14,48]} /><meshPhysicalMaterial color="#7ddbcf" metalness={.55} roughness={.22}/></mesh>
</group>}
export default ProstheticHand
