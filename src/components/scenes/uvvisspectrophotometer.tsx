import { CurvedBox } from '../geometry/CurvedBox'

function UVVisSpectrophotometer(){
  return <group position={[0,-.2,0]} rotation={[0,-.35,0]}>
    <CurvedBox args={[2.7,1.35,1.85]} radius={.18} smoothness={6}><meshPhysicalMaterial color="#d9dad6" roughness={.38} clearcoat={.3}/></CurvedBox>
    <CurvedBox args={[1.45,.13,1.15]} radius={.07} smoothness={5} position={[-.42,.18,.9]}><meshPhysicalMaterial color="#2e3436" metalness={.22} roughness={.28}/></CurvedBox>
    <CurvedBox args={[.92,.035,.46]} radius={.04} smoothness={4} position={[.68,.43,.95]}><meshPhysicalMaterial color="#1e2b2f" roughness={.16} clearcoat={.65}/></CurvedBox>
    {[-.62,-.38,-.14].map((x,i)=><mesh key={x} position={[x+.98,.43,.98]}><cylinderGeometry args={[.055,.055,.022,24]}/><meshStandardMaterial color={i===2?'#7cd1aa':'#818787'} emissive={i===2?'#356e58':'#000000'} emissiveIntensity={1.2}/></mesh>)}
    <CurvedBox args={[.48,.08,.52]} radius={.045} smoothness={4} position={[-.68,.38,.98]}><meshStandardMaterial color="#0f1719" roughness={.26}/></CurvedBox>
    <mesh position={[-.68,.43,1.02]}><boxGeometry args={[.18,.018,.22]}/><meshStandardMaterial color="#8bc9d8" emissive="#417480" emissiveIntensity={1.3}/></mesh>
    {[-.94,.94].map(x=>[-.62,.62].map(z=><mesh key={`${x}-${z}`} position={[x,-.7,z]}><cylinderGeometry args={[.065,.065,.03,24]}/><meshPhysicalMaterial color="#44494a" metalness={.55} roughness={.3}/></mesh>))}
  </group>
}
export default UVVisSpectrophotometer
