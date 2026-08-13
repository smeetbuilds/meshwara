import { CurvedBox } from '../geometry/CurvedBox'

function MicroplateReader(){
  return <group position={[0,-.1,0]} rotation={[0,-.38,0]}>
    <CurvedBox args={[2.45,1.25,1.9]} radius={.18} smoothness={6}><meshPhysicalMaterial color="#d8d8d3" roughness={.4} clearcoat={.28}/></CurvedBox>
    <CurvedBox args={[1.72,.14,1.08]} radius={.08} smoothness={5} position={[0,-.28,.97]}><meshPhysicalMaterial color="#303638" metalness={.28} roughness={.3}/></CurvedBox>
    <CurvedBox args={[1.38,.035,.82]} radius={.05} smoothness={4} position={[0,-.19,1.07]}><meshStandardMaterial color="#151b1d" roughness={.24}/></CurvedBox>
    <CurvedBox args={[.9,.035,.42]} radius={.04} smoothness={4} position={[.45,.4,.96]}><meshPhysicalMaterial color="#253437" roughness={.18} clearcoat={.6}/></CurvedBox>
    {[-.55,-.22,.11,.44].map((x,i)=><mesh key={x} position={[x,.42,.985]}><cylinderGeometry args={[.055,.055,.025,24]}/><meshStandardMaterial color={i===3?'#82d9ad':'#818787'} emissive={i===3?'#376d59':'#000000'} emissiveIntensity={1.2}/></mesh>)}
    {[-.92,.92].map(x=>[-.62,.62].map(z=><mesh key={`${x}-${z}`} position={[x,-.64,z]}><cylinderGeometry args={[.065,.065,.03,24]}/><meshPhysicalMaterial color="#474d4e" metalness={.5} roughness={.35}/></mesh>))}
    {[-.68,-.34,0,.34,.68].map(x=><mesh key={x} position={[x,.64,-.45]}><boxGeometry args={[.18,.035,.035]}/><meshStandardMaterial color="#a9aca8" roughness={.55}/></mesh>)}
  </group>
}
export default MicroplateReader
