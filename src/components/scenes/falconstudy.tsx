import { useMemo } from 'react'
import * as THREE from 'three'
function Feather({p,r,s}:{p:[number,number,number];r:[number,number,number];s:[number,number,number]}){return <mesh position={p} rotation={r} scale={s}><capsuleGeometry args={[.12,.78,8,18]} /><meshPhysicalMaterial color="#55575a" metalness={.18} roughness={.5} clearcoat={.14}/></mesh>}
function FalconStudy(){const feathers=useMemo(()=>Array.from({length:7},(_,i)=>({y:.38-i*.13,x:.48+i*.11,a:-.34-i*.045})),[]);return <group position={[0,-.72,0]} rotation={[0,-.34,0]}>
  <mesh position={[0,.68,0]} scale={[.52,.86,.48]}><sphereGeometry args={[1,56,40]} /><meshPhysicalMaterial color="#4a4d50" roughness={.48} clearcoat={.12}/></mesh>
  <mesh position={[0,1.52,.04]} scale={[.38,.42,.36]}><sphereGeometry args={[1,48,32]} /><meshPhysicalMaterial color="#616469" roughness={.45}/></mesh>
  <mesh position={[0,1.5,.38]} rotation={[Math.PI/2,0,0]} scale={[.32,.24,.52]}><coneGeometry args={[.34,.75,28]} /><meshPhysicalMaterial color="#c5a15b" metalness={.3} roughness={.34}/></mesh>
  <mesh position={[-.15,1.62,.32]}><sphereGeometry args={[.055,24,18]} /><meshPhysicalMaterial color="#e7c866" emissive="#7a5b17" emissiveIntensity={.35} roughness={.18}/></mesh>
  <mesh position={[.15,1.62,.32]}><sphereGeometry args={[.055,24,18]} /><meshPhysicalMaterial color="#e7c866" emissive="#7a5b17" emissiveIntensity={.35} roughness={.18}/></mesh>
  {[-1,1].flatMap(side=>feathers.map((f,i)=><Feather key={`${side}-${i}`} p={[side*f.x,f.y,-.06]} r={[.18,0,side*f.a]} s={[1,1+i*.03,.72]} />))}
  {[[-.18,-.1,.04],[.18,-.1,.04]].map((p,i)=><group key={i} position={p as [number,number,number]}><mesh><cylinderGeometry args={[.055,.065,.58,18]} /><meshPhysicalMaterial color="#a87b3d" roughness={.48}/></mesh><mesh position={[0,-.31,.12]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.16,.035,10,28,Math.PI*1.25]} /><meshPhysicalMaterial color="#80602f" roughness={.45}/></mesh></group>)}
  <mesh position={[0,-.46,0]}><cylinderGeometry args={[.85,.9,.22,56]} /><meshPhysicalMaterial color="#3b3a39" roughness={.72}/></mesh>
</group>}
export default FalconStudy
