import { CurvedBox } from '../geometry/CurvedBox'

function FloorMirror(){
  return <group position={[0,-.5,0]} rotation={[0,-.28,0]}>
    <CurvedBox args={[1.72,3.35,.16]} radius={.18} smoothness={7} position={[0,.78,0]}><meshPhysicalMaterial color="#292b2c" metalness={.82} roughness={.22}/></CurvedBox>
    <CurvedBox args={[1.48,3.1,.025]} radius={.13} smoothness={6} position={[0,.78,.095]}><meshPhysicalMaterial color="#bec8ca" metalness={.96} roughness={.06} clearcoat={1}/></CurvedBox>
    <mesh position={[0,-.98,-.32]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.08,.08,1.02,32]}/><meshPhysicalMaterial color="#303334" metalness={.82} roughness={.24}/></mesh>
    {[-.56,.56].map(x=><group key={x} position={[x,-1.12,-.34]}>
      <mesh rotation={[0,0,.12*Math.sign(x)]}><boxGeometry args={[.12,1.05,.12]}/><meshPhysicalMaterial color="#323536" metalness={.78} roughness={.26}/></mesh>
      <mesh position={[0,-.51,.18]}><cylinderGeometry args={[.13,.13,.055,28]}/><meshStandardMaterial color="#191b1c" roughness={.5}/></mesh>
    </group>)}
    {[-.62,.62].map(x=><mesh key={`clip-${x}`} position={[x,2.36,-.02]}><boxGeometry args={[.08,.16,.16]}/><meshPhysicalMaterial color="#b6a17d" metalness={.72} roughness={.25}/></mesh>)}
  </group>
}
export default FloorMirror
