import { CurvedBox } from '../geometry/CurvedBox'

function EReader(){
  return <group rotation={[0.08,-0.3,-0.02]}>
    <CurvedBox args={[1.86,.13,2.62]} radius={.16} smoothness={6}><meshPhysicalMaterial color="#2b3032" metalness={.55} roughness={.28} clearcoat={.45}/></CurvedBox>
    <CurvedBox args={[1.53,.026,2.2]} radius={.07} smoothness={5} position={[0,.078,-.01]}><meshPhysicalMaterial color="#d8d6cd" roughness={.82}/></CurvedBox>
    <mesh position={[0,.095,-1.09]}><boxGeometry args={[.42,.018,.045]}/><meshPhysicalMaterial color="#868a89" metalness={.72} roughness={.24}/></mesh>
    <mesh position={[0,.096,1.16]}><boxGeometry args={[.22,.016,.028]}/><meshPhysicalMaterial color="#101314" roughness={.3}/></mesh>
    {[-.78,.78].map(x=>[-1.18,1.18].map(z=><mesh key={`${x}-${z}`} position={[x,-.073,z]}><cylinderGeometry args={[.035,.035,.014,24]}/><meshPhysicalMaterial color="#111315" metalness={.85} roughness={.2}/></mesh>))}
    {[-.42,-.12,.18,.48].map((z,i)=><mesh key={z} position={[-.94,.01,z]} rotation={[0,0,Math.PI/2]}><boxGeometry args={[.045,.018,.18]}/><meshStandardMaterial color={i===2?'#7fa7a0':'#555b5b'} roughness={.45}/></mesh>)}
    <CurvedBox args={[.7,.018,.035]} radius={.012} smoothness={3} position={[0,.096,.42]}><meshStandardMaterial color="#b8b6ad" roughness={.9}/></CurvedBox>
  </group>
}
export default EReader
