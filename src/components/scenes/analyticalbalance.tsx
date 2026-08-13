import { MeshTransmissionMaterial } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
function AnalyticalBalance(){return <group position={[0,-.6,0]} rotation={[0,-.34,0]}>
  <CurvedBox args={[2.25,.42,1.75]} radius={.12} smoothness={5}><meshStandardMaterial color="#d2d3d0" roughness={.4}/></CurvedBox>
  <mesh position={[0,.28,0]}><cylinderGeometry args={[.45,.45,.06,48]}/><meshPhysicalMaterial color="#a9adae" metalness={.85} roughness={.2}/></mesh>
  <group position={[0,1.02,0]}>{[[-.8,0,0],[.8,0,0],[0,0,-.66]].map((p,i)=><mesh key={i} position={p as [number,number,number]}><boxGeometry args={i===2?[1.65,1.45,.025]:[.025,1.45,1.35]}/><MeshTransmissionMaterial transmission={.72} thickness={.05} roughness={.08} color="#b8c7c8"/></mesh>)}</group>
  <mesh position={[0,-.08,.9]}><planeGeometry args={[.95,.18]}/><meshBasicMaterial color="#477b70"/></mesh>
</group>} export default AnalyticalBalance
