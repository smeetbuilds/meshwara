import { CurvedBox } from '../geometry/CurvedBox'

function ErgonomicTrackball(){
  return <group rotation={[.12,-.36,-.04]}>
    <CurvedBox args={[2.2,.58,1.78]} radius={.32} smoothness={8}><meshPhysicalMaterial color="#303537" roughness={.32} clearcoat={.35}/></CurvedBox>
    <mesh position={[-.46,.42,-.06]}><sphereGeometry args={[.42,48,32]}/><meshPhysicalMaterial color="#a3564b" metalness={.18} roughness={.22} clearcoat={.7}/></mesh>
    <mesh position={[-.46,.37,-.06]}><torusGeometry args={[.47,.045,18,64]}/><meshPhysicalMaterial color="#171a1b" metalness={.42} roughness={.28}/></mesh>
    {[.24,.58,.86].map((x,i)=><CurvedBox key={x} args={[.42,.09,.55]} radius={.12} smoothness={5} position={[x,.34,-.18+i*.2]} rotation={[0,0,-.08+i*.04]}><meshPhysicalMaterial color="#4a5052" roughness={.33}/></CurvedBox>)}
    <mesh position={[.52,.42,.48]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.1,.1,.16,30]}/><meshPhysicalMaterial color="#929896" metalness={.42} roughness={.28}/></mesh>
    <CurvedBox args={[.48,.055,.2]} radius={.05} smoothness={4} position={[.48,.35,.7]}><meshStandardMaterial color="#1c2021" roughness={.4}/></CurvedBox>
    {[-.72,.72].map(x=>[-.52,.52].map(z=><mesh key={`${x}-${z}`} position={[x,-.31,z]}><cylinderGeometry args={[.05,.05,.02,24]}/><meshStandardMaterial color="#191b1c" roughness={.55}/></mesh>))}
  </group>
}
export default ErgonomicTrackball
