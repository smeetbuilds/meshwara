import { MeshTransmissionMaterial } from '@react-three/drei'
function ChromatographyColumn(){return <group position={[0,-.9,0]} rotation={[0,-.3,0]}>
  <mesh position={[0,1.15,0]}><cylinderGeometry args={[.34,.34,2.35,48]}/><MeshTransmissionMaterial transmission={.82} thickness={.12} roughness={.06} color="#c9dedb"/></mesh>
  <mesh position={[0,1.05,0]}><cylinderGeometry args={[.29,.29,1.85,44]}/><meshPhysicalMaterial color="#d9c184" roughness={.62} transparent opacity={.72}/></mesh>
  {[0,2.3].map(y=><group key={y} position={[0,y,0]}><mesh><cylinderGeometry args={[.42,.42,.18,40]}/><meshPhysicalMaterial color="#7d8789" metalness={.82} roughness={.24}/></mesh><mesh position={[.48,0,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.08,.08,.55,18]}/><meshPhysicalMaterial color="#7d8789" metalness={.82} roughness={.24}/></mesh></group>)}
  <mesh position={[-.82,1.15,0]}><boxGeometry args={[.08,2.8,.08]}/><meshPhysicalMaterial color="#555d60" metalness={.72} roughness={.28}/></mesh>
  <mesh position={[-.42,-.15,0]}><boxGeometry args={[1.25,.12,.85]}/><meshStandardMaterial color="#5f6668" roughness={.35}/></mesh>
</group>} export default ChromatographyColumn
