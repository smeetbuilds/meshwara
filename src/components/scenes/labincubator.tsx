import { CurvedBox } from '../geometry/CurvedBox'

function LabIncubator(){
  return <group position={[0,-.1,0]} rotation={[0,-.34,0]}>
    <CurvedBox args={[2.25,2.1,1.75]} radius={.15} smoothness={6}><meshPhysicalMaterial color="#d7d9d7" roughness={.4} clearcoat={.28}/></CurvedBox>
    <CurvedBox args={[1.72,1.38,.055]} radius={.08} smoothness={5} position={[0,-.08,.9]}><meshPhysicalMaterial color="#233033" transmission={.08} transparent opacity={.82} roughness={.18}/></CurvedBox>
    <CurvedBox args={[1.38,1.02,.03]} radius={.05} smoothness={4} position={[0,-.08,.94]}><meshStandardMaterial color="#111719" transparent opacity={.26}/></CurvedBox>
    <CurvedBox args={[.78,.035,.32]} radius={.035} smoothness={4} position={[.42,.72,.92]}><meshStandardMaterial color="#223235" roughness={.2}/></CurvedBox>
    {[-.68,-.42,-.16].map((x,i)=><mesh key={x} position={[x,.72,.955]}><cylinderGeometry args={[.055,.055,.022,24]}/><meshStandardMaterial color={i===2?'#79d1a7':'#858b8a'} emissive={i===2?'#356c56':'#000000'} emissiveIntensity={1.1}/></mesh>)}
    {[-.48,0,.48].map(y=><mesh key={y} position={[0,y-.18,.82]}><boxGeometry args={[1.36,.025,1.15]}/><meshPhysicalMaterial color="#aeb4b1" metalness={.35} roughness={.35}/></mesh>)}
    {[-.82,.82].map(x=><mesh key={x} position={[x,-1.08,.58]}><cylinderGeometry args={[.08,.08,.06,24]}/><meshPhysicalMaterial color="#3e4445" metalness={.55} roughness={.32}/></mesh>)}
  </group>
}
export default LabIncubator
