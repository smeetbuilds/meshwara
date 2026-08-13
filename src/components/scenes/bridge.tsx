import { useMemo } from 'react'
import * as THREE from 'three'
function Cable({points}:{points:[number,number,number][]}){const curve=useMemo(()=>new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),[points]);return <mesh><tubeGeometry args={[curve,48,.018,10,false]} /><meshPhysicalMaterial color="#a0a7aa" metalness={.78} roughness={.24} /></mesh>}
function CantileverBridge(){return <group position={[0,-.75,0]} rotation={[.02,-.34,0]}>
  <mesh position={[0,-.15,0]}><boxGeometry args={[3.7,.16,.72]} /><meshPhysicalMaterial color="#555d60" metalness={.72} roughness={.3} /></mesh>
  {[-1.1,1.1].map(x=><group key={x}><mesh position={[x,.42,0]}><boxGeometry args={[.15,1.25,.16]} /><meshPhysicalMaterial color="#767f82" metalness={.82} roughness={.25} /></mesh><mesh position={[x,1.04,0]}><boxGeometry args={[.7,.12,.14]} /><meshPhysicalMaterial color="#a18b64" metalness={.75} roughness={.28} /></mesh></group>)}
  {[-.28,.28].map(z=><Cable key={z} points={[[-1.1,1.02,z],[-.6,.66,z],[0,.4,z],[.6,.66,z],[1.1,1.02,z]]}/>) }
  {[-1.6,-.8,0,.8,1.6].map(x=><mesh key={x} position={[x,-.43,0]}><boxGeometry args={[.12,.55,.48]} /><meshPhysicalMaterial color="#8a8277" roughness={.55} /></mesh>)}
  <mesh position={[0,-.03,.37]}><boxGeometry args={[3.5,.025,.02]} /><meshBasicMaterial color="#d9b86b" /></mesh>
</group>}
export default CantileverBridge
