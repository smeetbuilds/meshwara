import { CurvedBox } from '../geometry/CurvedBox'
function ArcWallSconce(){return <group rotation={[0,-.3,0]}>
  <CurvedBox args={[.42,1.35,.18]} radius={.1} smoothness={6} position={[-.72,.1,0]}><meshPhysicalMaterial color="#2e3132" metalness={.78} roughness={.24}/></CurvedBox>
  <mesh position={[-.25,.55,0]} rotation={[0,0,-.65]}><cylinderGeometry args={[.055,.055,1.2,28]}/><meshPhysicalMaterial color="#9f835c" metalness={.78} roughness={.24}/></mesh>
  <mesh position={[.32,.16,0]} rotation={[0,0,-.65]}><cylinderGeometry args={[.055,.055,.8,28]}/><meshPhysicalMaterial color="#9f835c" metalness={.78} roughness={.24}/></mesh>
  <mesh position={[.64,-.12,0]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.52,.38,.42,56]}/><meshPhysicalMaterial color="#d7cbb8" roughness={.5}/></mesh>
  <mesh position={[.64,-.34,0]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.36,.36,.035,56]}/><meshStandardMaterial color="#f0d89f" emissive="#c79a4a" emissiveIntensity={1.1}/></mesh>
  {[-.15,.15].map(y=><mesh key={y} position={[-.72,y,.11]}><cylinderGeometry args={[.045,.045,.03,24]}/><meshPhysicalMaterial color="#b1b5b4" metalness={.9} roughness={.16}/></mesh>)}
</group>} export default ArcWallSconce
