import { CurvedBox } from '../geometry/CurvedBox'
function CordlessDrill(){return <group rotation={[.05,-.52,-.05]} position={[0,-.25,0]}>
  <CurvedBox args={[1.75,1.25,1.1]} radius={.28} smoothness={5} position={[0,.82,0]}><meshPhysicalMaterial color="#d9ad35" roughness={.34}/></CurvedBox>
  <mesh position={[1.15,.85,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.4,.47,1.1,48]} /><meshPhysicalMaterial color="#3c4041" metalness={.65} roughness={.25}/></mesh>
  <mesh position={[1.72,.85,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.26,.31,.4,36]} /><meshPhysicalMaterial color="#222627" metalness={.8} roughness={.24}/></mesh>
  <CurvedBox args={[.65,1.65,.7]} radius={.18} smoothness={4} position={[-.25,-.38,0]} rotation={[0,0,.17]}><meshPhysicalMaterial color="#2e3233" roughness={.45}/></CurvedBox>
  <CurvedBox args={[1.05,.55,.88]} radius={.15} smoothness={4} position={[-.15,-1.3,0]}><meshPhysicalMaterial color="#202425" roughness={.48}/></CurvedBox>
  <mesh position={[.3,.25,.39]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.11,.11,.12,24]} /><meshBasicMaterial color="#d65d3c" /></mesh>
</group>}
export default CordlessDrill
