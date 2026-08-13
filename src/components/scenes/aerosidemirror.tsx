import { CurvedBox } from '../geometry/CurvedBox'
function AeroSideMirror(){return <group position={[0,.15,0]} rotation={[0,-.45,0]}>
  <CurvedBox args={[1.42,.66,.54]} radius={.3} smoothness={7} position={[0,.25,0]}><meshPhysicalMaterial color="#4f5659" metalness={.72} roughness={.2} clearcoat={.55}/></CurvedBox>
  <CurvedBox args={[1.12,.43,.025]} radius={.18} smoothness={6} position={[0,.25,.295]}><meshPhysicalMaterial color="#a9c2c4" metalness={.92} roughness={.05}/></CurvedBox>
  <CurvedBox args={[.22,.85,.22]} radius={.09} smoothness={5} position={[-.65,-.35,0]} rotation={[0,0,-.28]}><meshPhysicalMaterial color="#555d60" metalness={.78} roughness={.22}/></CurvedBox>
  <CurvedBox args={[.45,.15,.42]} radius={.05} smoothness={5} position={[-.82,-.78,0]}><meshPhysicalMaterial color="#62696c" metalness={.8} roughness={.22}/></CurvedBox>
  <mesh position={[.53,.17,.31]}><boxGeometry args={[.18,.025,.025]}/><meshStandardMaterial color="#e5b160" emissive="#b97822" emissiveIntensity={1.05}/></mesh>
  {[-.42,.42].map(x=><mesh key={x} position={[x,.47,-.26]}><boxGeometry args={[.18,.05,.04]}/><meshPhysicalMaterial color="#2d3133" metalness={.8} roughness={.22}/></mesh>)}
  {[-.95,-.72].map(x=><mesh key={x} position={[x,-.74,.2]}><cylinderGeometry args={[.045,.045,.035,24]}/><meshPhysicalMaterial color="#a4a8a8" metalness={.9} roughness={.16}/></mesh>)}
</group>} export default AeroSideMirror
