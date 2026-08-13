import { CurvedBox } from '../geometry/CurvedBox'

function PulseOximeter(){
  return <group rotation={[.05,-.34,-.04]}>
    <CurvedBox args={[1.35,.5,2.2]} radius={.24} smoothness={7}><meshPhysicalMaterial color="#d8d9d5" roughness={.34} clearcoat={.55}/></CurvedBox>
    <CurvedBox args={[1.02,.03,1.05]} radius={.09} smoothness={5} position={[0,.267,-.28]}><meshPhysicalMaterial color="#182426" roughness={.16} clearcoat={.7}/></CurvedBox>
    <CurvedBox args={[.42,.035,.15]} radius={.04} smoothness={4} position={[0,.272,.52]}><meshStandardMaterial color="#85d7b9" emissive="#3d7f6b" emissiveIntensity={1.3}/></CurvedBox>
    {[-.28,0,.28].map((x,i)=><mesh key={x} position={[x,.278,.78]}><cylinderGeometry args={[.08,.08,.025,32]}/><meshPhysicalMaterial color={i===1?'#69b99d':'#7b8080'} roughness={.36}/></mesh>)}
    <mesh position={[.67,0,.45]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.11,.11,.08,32]}/><meshPhysicalMaterial color="#485052" metalness={.45} roughness={.28}/></mesh>
    <mesh position={[-.68,0,.42]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.08,.08,.06,28]}/><meshPhysicalMaterial color="#2e3435" metalness={.4} roughness={.3}/></mesh>
    <CurvedBox args={[.92,.05,.26]} radius={.05} smoothness={4} position={[0,-.276,-.85]}><meshStandardMaterial color="#adb0ac" roughness={.62}/></CurvedBox>
    {[-.42,.42].map(x=><mesh key={x} position={[x,-.28,.64]}><cylinderGeometry args={[.055,.055,.022,24]}/><meshPhysicalMaterial color="#585e5e" metalness={.55} roughness={.28}/></mesh>)}
  </group>
}
export default PulseOximeter
