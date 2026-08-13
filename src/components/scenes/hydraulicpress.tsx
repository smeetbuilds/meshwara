import { RoundedBox } from '@react-three/drei'
function HydraulicPress(){return <group position={[0,-.78,0]} rotation={[0,-.32,0]}>
  <RoundedBox args={[2.25,.18,1.35]} radius={.06} smoothness={4} position={[0,-1.02,0]}><meshPhysicalMaterial color="#343a3d" metalness={.7} roughness={.32} /></RoundedBox>
  {[-.86,.86].map(x=><RoundedBox key={x} args={[.18,2.45,.18]} radius={.045} smoothness={4} position={[x,.08,0]}><meshPhysicalMaterial color="#6f777a" metalness={.84} roughness={.25} /></RoundedBox>)}
  <RoundedBox args={[2.0,.2,.34]} radius={.05} smoothness={4} position={[0,1.25,0]}><meshPhysicalMaterial color="#555e61" metalness={.86} roughness={.24} /></RoundedBox>
  <mesh position={[0,.75,0]}><cylinderGeometry args={[.28,.28,.72,40]} /><meshPhysicalMaterial color="#a9afb1" metalness={.94} roughness={.18} /></mesh>
  <mesh position={[0,.34,0]}><cylinderGeometry args={[.42,.42,.16,44]} /><meshPhysicalMaterial color="#d0a647" metalness={.88} roughness={.2} /></mesh>
  <RoundedBox args={[1.48,.12,.88]} radius={.04} smoothness={4} position={[0,-.35,0]}><meshPhysicalMaterial color="#7d8588" metalness={.78} roughness={.28} /></RoundedBox>
  <mesh position={[.98,.15,.38]}><boxGeometry args={[.35,.62,.18]} /><meshPhysicalMaterial color="#252b2d" roughness={.36} /></mesh><mesh position={[.98,.25,.48]}><planeGeometry args={[.22,.15]} /><meshBasicMaterial color="#7be3d4" toneMapped={false} /></mesh>
</group>}
export default HydraulicPress
