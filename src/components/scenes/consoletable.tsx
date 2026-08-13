import { CurvedBox } from '../geometry/CurvedBox'
function StoneConsoleTable(){return <group position={[0,-.55,0]} rotation={[0,-.35,0]}>
  <CurvedBox args={[3.2,.28,.9]} radius={.08} smoothness={5} position={[0,1.12,0]}><meshPhysicalMaterial color="#aaa296" roughness={.72}/></CurvedBox>
  {[-1.1,1.1].map(x=><group key={x} position={[x,.45,0]}><mesh><boxGeometry args={[.1,1.35,.68]}/><meshPhysicalMaterial color="#353637" metalness={.7} roughness={.27}/></mesh><mesh position={[0,-.62,0]}><boxGeometry args={[.5,.08,.78]}/><meshPhysicalMaterial color="#353637" metalness={.7} roughness={.27}/></mesh></group>)}
</group>} export default StoneConsoleTable
