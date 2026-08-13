import { CurvedBox } from '../geometry/CurvedBox'
function FootballBoot(){return <group rotation={[.2,-.48,-.08]} position={[0,-.3,0]}>
  <mesh scale={[1.55,.58,.62]} rotation={[0,0,-.08]}><capsuleGeometry args={[.48,1.35,16,32]} /><meshPhysicalMaterial color="#ebe8df" roughness={.34} clearcoat={.35}/></mesh>
  <CurvedBox args={[1.12,.72,1.05]} radius={.22} smoothness={4} position={[-.92,.33,0]} rotation={[0,0,.35]}><meshPhysicalMaterial color="#202426" roughness={.38}/></CurvedBox>
  {Array.from({length:6},(_,i)=><mesh key={i} position={[-.45+i*.18,.34,.53]} rotation={[0,0,.35]}><boxGeometry args={[.045,.46,.035]} /><meshPhysicalMaterial color="#676c6d" roughness={.42}/></mesh>)}
  <mesh position={[.35,-.38,0]}><boxGeometry args={[2.15,.16,1.0]} /><meshPhysicalMaterial color="#262a2b" roughness={.44}/></mesh>
  {[-.65,-.1,.48,.92].flatMap((x,j)=>[-.32,.32].map((z,i)=><mesh key={`${j}-${i}`} position={[x,-.58,z]}><cylinderGeometry args={[.07,.11,.24,16]} /><meshPhysicalMaterial color="#16191a" roughness={.5}/></mesh>))}
</group>}
export default FootballBoot
