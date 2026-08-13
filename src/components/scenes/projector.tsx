import { CurvedBox } from '../geometry/CurvedBox'
function CompactProjector(){return <group rotation={[.15,-.4,0]} position={[0,-.1,0]}>
  <CurvedBox args={[2.7,1.55,1.9]} radius={.2} smoothness={5}><meshPhysicalMaterial color="#e4e1da" roughness={.3} metalness={.08}/></CurvedBox>
  <group position={[-.65,.08,.99]}><mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.48,.48,.16,64]} /><meshPhysicalMaterial color="#25292d" metalness={.6} roughness={.16}/></mesh><mesh position={[0,0,.095]}><circleGeometry args={[.32,64]} /><meshPhysicalMaterial color="#293e54" roughness={.08} clearcoat={1}/></mesh><mesh position={[0,0,.105]}><circleGeometry args={[.13,48]} /><meshBasicMaterial color="#91b2c5" toneMapped={false}/></mesh></group>
  <group position={[.68,.12,.99]}>{Array.from({length:5},(_,i)=><mesh key={i} position={[0,.35-i*.18,0]}><boxGeometry args={[.62,.045,.06]} /><meshPhysicalMaterial color="#777b7c" metalness={.45} roughness={.3}/></mesh>)}</group>
  <CurvedBox args={[1.5,.18,.92]} radius={.08} smoothness={3} position={[0,-.86,-.05]}><meshPhysicalMaterial color="#282a2a" roughness={.5}/></CurvedBox>
</group>}
export default CompactProjector
