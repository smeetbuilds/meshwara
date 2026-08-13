import { CurvedBox } from '../geometry/CurvedBox'
function MeditationChapel(){return <group position={[0,.1,0]} rotation={[0,-.35,0]}>
  <CurvedBox args={[3.2,2.5,2.6]} radius={.03} smoothness={5}><meshPhysicalMaterial color="#b4aa9a" roughness={.82}/></CurvedBox>
  <CurvedBox args={[2.82,2.12,2.18]} radius={.02} smoothness={4} position={[0,.02,.22]}><meshStandardMaterial color="#d2c8ba" roughness={.88}/></CurvedBox>
  <CurvedBox args={[.5,1.9,.08]} radius={.01} smoothness={4} position={[-.65,.15,1.34]}><meshPhysicalMaterial color="#292f31" metalness={.5} roughness={.35}/></CurvedBox>
  <CurvedBox args={[.12,1.9,.05]} radius={.01} smoothness={4} position={[.82,.2,1.35]}><meshPhysicalMaterial color="#d6c57e" roughness={.35}/></CurvedBox>
  <CurvedBox args={[.65,.28,.55]} radius={.03} smoothness={5} position={[0,-.78,.25]}><meshPhysicalMaterial color="#8e806e" roughness={.68}/></CurvedBox>
  {[-.76,-.38,0,.38,.76].map(x=><CurvedBox key={x} args={[.16,.12,.86]} radius={.025} smoothness={4} position={[x,-1.12,.18]}><meshStandardMaterial color="#7a6d5f" roughness={.8}/></CurvedBox>)}
  <mesh position={[0,.55,1.36]}><boxGeometry args={[.7,.025,.025]}/><meshStandardMaterial color="#c9b25f" emissive="#806b31" emissiveIntensity={.7}/></mesh>
</group>} export default MeditationChapel
