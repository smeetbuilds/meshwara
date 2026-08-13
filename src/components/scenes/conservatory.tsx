import { MeshTransmissionMaterial } from '@react-three/drei'
function Conservatory(){const xs=[-1.35,-.68,0,.68,1.35];return <group position={[0,-.9,0]} rotation={[.02,-.38,0]} scale={.92}>
  <mesh position={[0,-.05,0]}><boxGeometry args={[3.15,.12,2.15]} /><meshPhysicalMaterial color="#9b968c" roughness={.82}/></mesh>
  {xs.map(x=><mesh key={x} position={[x,.82,1.0]}><boxGeometry args={[.045,1.75,.045]} /><meshPhysicalMaterial color="#4c5555" metalness={.72} roughness={.3}/></mesh>)}
  {xs.map(x=><mesh key={`b${x}`} position={[x,.82,-1.0]}><boxGeometry args={[.045,1.75,.045]} /><meshPhysicalMaterial color="#4c5555" metalness={.72} roughness={.3}/></mesh>)}
  {[-1,1].map(z=><mesh key={z} position={[0,.82,z*1.01]}><boxGeometry args={[3.0,1.65,.025]} /><MeshTransmissionMaterial transmission={.82} thickness={.03} roughness={.12} ior={1.45} color="#b9d5cf" /></mesh>)}
  {[-1.0,-.5,0,.5,1.0].map(x=><mesh key={`roof${x}`} position={[x,1.78,0]} rotation={[0,0,x<0?-.7:.7]}><boxGeometry args={[.045,1.58,.045]} /><meshPhysicalMaterial color="#4c5555" metalness={.72} roughness={.3}/></mesh>)}
  <mesh position={[0,1.72,0]} rotation={[0,0,Math.PI/4]} scale={[1.52,1.52,1]}><boxGeometry args={[1.44,.035,2.04]} /><MeshTransmissionMaterial transmission={.84} thickness={.025} roughness={.1} ior={1.45} color="#c7dcd7" /></mesh>
  {[-.75,0,.72].map((x,i)=><group key={x} position={[x,.08,(i-1)*.42]}><mesh position={[0,.18,0]}><cylinderGeometry args={[.3,.24,.36,32]} /><meshPhysicalMaterial color="#756552" roughness={.62}/></mesh><mesh position={[0,.7,0]} scale={[.32,.68,.32]}><sphereGeometry args={[1,32,24]} /><meshPhysicalMaterial color={i===1?'#4f765d':'#58715a'} roughness={.72}/></mesh></group>)}
</group>}
export default Conservatory
