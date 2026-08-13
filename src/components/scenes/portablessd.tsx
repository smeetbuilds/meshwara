import { CurvedBox } from '../geometry/CurvedBox'

function PortableSSD(){
  return <group rotation={[.18,-.38,-.06]}>
    <CurvedBox args={[2.15,.36,1.34]} radius={.2} smoothness={7}><meshPhysicalMaterial color="#25292b" metalness={.75} roughness={.22} clearcoat={.5}/></CurvedBox>
    <CurvedBox args={[1.78,.025,1.02]} radius={.09} smoothness={5} position={[0,.196,0]}><meshPhysicalMaterial color="#343a3d" metalness={.52} roughness={.33}/></CurvedBox>
    {[-.78,.78].map(x=>[-.43,.43].map(z=><mesh key={`${x}-${z}`} position={[x,.218,z]}><cylinderGeometry args={[.045,.045,.02,24]}/><meshPhysicalMaterial color="#101213" metalness={.92} roughness={.16}/></mesh>))}
    <CurvedBox args={[.48,.1,.18]} radius={.04} smoothness={4} position={[1.09,0,0]}><meshPhysicalMaterial color="#090b0c" metalness={.4} roughness={.32}/></CurvedBox>
    <mesh position={[1.15,0,0]} rotation={[0,0,Math.PI/2]}><boxGeometry args={[.08,.18,.28]}/><meshStandardMaterial color="#16191a" roughness={.42}/></mesh>
    <mesh position={[-.72,.225,.48]}><boxGeometry args={[.28,.018,.018]}/><meshStandardMaterial color="#79d6b3" emissive="#3f8e74" emissiveIntensity={1.4}/></mesh>
    {[-.5,-.25,0,.25,.5].map(x=><mesh key={x} position={[x,-.195,-.52]}><boxGeometry args={[.12,.015,.035]}/><meshStandardMaterial color="#0f1112" roughness={.7}/></mesh>)}
  </group>
}
export default PortableSSD
