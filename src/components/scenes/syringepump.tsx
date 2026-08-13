import { RoundedBox } from '@react-three/drei'
function SyringePump(){return <group position={[0,.05,0]} rotation={[0,-.32,0]}>
  <RoundedBox args={[2.2,.78,1]} radius={.11} smoothness={6} position={[0,-.1,0]}><meshPhysicalMaterial color="#d3d4d0" roughness={.48} clearcoat={.18}/></RoundedBox>
  <mesh position={[-.2,.05,.55]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.13,.13,1.5,40]}/><meshPhysicalMaterial color="#a9bdba" roughness={.12} transmission={.1}/></mesh>
  <mesh position={[-.2,.05,.55]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.05,.05,1.7,28]}/><meshStandardMaterial color="#6d7879" roughness={.35}/></mesh>
  <RoundedBox args={[.2,.45,.08]} radius={.04} smoothness={5} position={[-.9,.05,.55]}><meshPhysicalMaterial color="#657277" metalness={.6} roughness={.3}/></RoundedBox>
  <RoundedBox args={[.48,.32,.05]} radius={.03} smoothness={5} position={[.65,.12,.53]}><meshPhysicalMaterial color="#19323a" roughness={.16} clearcoat={.5}/></RoundedBox>
  {[-.15,.12,.39,.66].map((x,i)=><mesh key={x} position={[x,-.23,.54]}><cylinderGeometry args={[.045,.045,.024,22]}/><meshStandardMaterial color={i===3?'#73d0a4':'#858b89'} emissive={i===3?'#346e56':'#000000'} emissiveIntensity={1}/></mesh>)}
  <mesh position={[1.05,-.1,.22]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.14,.035,16,36]}/><meshPhysicalMaterial color="#555d60" metalness={.62} roughness={.28}/></mesh>
</group>} export default SyringePump
