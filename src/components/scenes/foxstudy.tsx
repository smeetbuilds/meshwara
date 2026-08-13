import { CurvedBox } from '../geometry/CurvedBox'
function FoxStudy(){return <group position={[0,.12,0]} rotation={[0,-.45,0]}>
  <mesh position={[-.1,.05,0]} scale={[1.5,.72,.68]}><sphereGeometry args={[.68,48,32]}/><meshPhysicalMaterial color="#a85d3f" roughness={.62}/></mesh>
  <mesh position={[.95,.32,0]} scale={[1.05,.86,.78]}><sphereGeometry args={[.42,44,30]}/><meshPhysicalMaterial color="#b66c4b" roughness={.6}/></mesh>
  <mesh position={[1.43,.23,0]} rotation={[0,0,Math.PI/2]} scale={[1,.72,.72]}><coneGeometry args={[.2,.62,32]}/><meshPhysicalMaterial color="#b66c4b" roughness={.62}/></mesh>
  <mesh position={[1.7,.23,0]}><sphereGeometry args={[.08,24,18]}/><meshPhysicalMaterial color="#1c2021" roughness={.36}/></mesh>
  {[-.18,.18].map((z)=><mesh key={z} position={[1.05,.43,z]}><sphereGeometry args={[.055,22,16]}/><meshPhysicalMaterial color="#111516" roughness={.22}/></mesh>)}
  {[-.23,.23].map((z)=><mesh key={z} position={[.82,.8,z]} scale={[.52,1.8,.42]}><sphereGeometry args={[.2,32,22]}/><meshPhysicalMaterial color="#8f5038" roughness={.68}/></mesh>)}
  {[[-.55,-.65,-.3],[-.55,-.65,.3],[.45,-.62,-.3],[.45,-.62,.3]].map((p,i)=><group key={i}><mesh position={p as [number,number,number]} scale={[.38,1.35,.32]}><sphereGeometry args={[.19,28,20]}/><meshPhysicalMaterial color="#8d5039" roughness={.7}/></mesh><mesh position={[p[0]+.08,p[1]-.34,p[2]]} scale={[.58,.28,.52]}><sphereGeometry args={[.17,24,18]}/><meshPhysicalMaterial color="#292d2e" roughness={.6}/></mesh></group>)}
  <mesh position={[-1.08,.28,.02]} rotation={[0,0,-.42]} scale={[1.95,.48,.52]}><sphereGeometry args={[.5,38,26]}/><meshPhysicalMaterial color="#a85d3f" roughness={.68}/></mesh>
  <mesh position={[-1.62,.63,.02]} rotation={[0,0,-.42]} scale={[.7,.34,.38]}><sphereGeometry args={[.34,30,22]}/><meshPhysicalMaterial color="#efe4d5" roughness={.75}/></mesh>
</group>} export default FoxStudy
