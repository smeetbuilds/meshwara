import { CurvedBox } from '../geometry/CurvedBox'
function SculptedArmchair(){return <group position={[0,.35,0]} rotation={[0,-.38,0]}>
  <CurvedBox args={[1.68,.36,1.52]} radius={.22} smoothness={7} position={[0,-.45,.1]} rotation={[-.08,0,0]}><meshPhysicalMaterial color="#a47f69" roughness={.55}/></CurvedBox>
  <CurvedBox args={[1.74,1.65,.36]} radius={.24} smoothness={7} position={[0,.35,-.55]} rotation={[-.12,0,0]}><meshPhysicalMaterial color="#9d765f" roughness={.6}/></CurvedBox>
  {[-.72,.72].map(x=><CurvedBox key={x} args={[.34,.42,1.08]} radius={.16} smoothness={6} position={[x,-.08,.02]} rotation={[0,0,-.03*Math.sign(x)]}><meshPhysicalMaterial color="#a17a63" roughness={.58}/></CurvedBox>)}
  {[-.62,.62].map(x=><CurvedBox key={`leg-${x}`} args={[.28,.85,.28]} radius={.08} smoothness={5} position={[x,-.95,.35]}><meshPhysicalMaterial color="#353b3d" metalness={.8} roughness={.2}/></CurvedBox>)}
  <CurvedBox args={[1.3,.11,.78]} radius={.055} smoothness={4} position={[0,-.73,.04]}><meshStandardMaterial color="#6f5547" roughness={.65}/></CurvedBox>
  {[-.48,0,.48].map(x=><mesh key={x} position={[x,.34,-.36]}><boxGeometry args={[.025,.78,.025]}/><meshStandardMaterial color="#8a6552" roughness={.74}/></mesh>)}
</group>} export default SculptedArmchair
