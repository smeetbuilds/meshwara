import { CurvedBox } from '../geometry/CurvedBox'
function RailCoupler(){return <group rotation={[0,-.3,0]}>
  <CurvedBox args={[1.3,.85,.7]} radius={.16} smoothness={6} position={[0,.05,0]}><meshPhysicalMaterial color="#555d60" metalness={.85} roughness={.28}/></CurvedBox>
  <CurvedBox args={[.75,.52,1]} radius={.12} smoothness={5} position={[.72,.05,0]}><meshPhysicalMaterial color="#626a6d" metalness={.85} roughness={.26}/></CurvedBox>
  <mesh position={[-.95,.05,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.18,.18,1.3,40]}/><meshPhysicalMaterial color="#6c7375" metalness={.9} roughness={.25}/></mesh>
  <CurvedBox args={[.9,.28,1.05]} radius={.06} smoothness={5} position={[-1.45,.05,0]}><meshPhysicalMaterial color="#4d5659" metalness={.8} roughness={.28}/></CurvedBox>
  {[-.34,.34].map(y=><mesh key={y} position={[.72,y,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.22,.045,16,36]}/><meshPhysicalMaterial color="#2c3032" metalness={.9} roughness={.18}/></mesh>)}
  {[-.32,.32].map(z=><mesh key={z} position={[-1.45,.05,z]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.06,.06,.96,22]}/><meshPhysicalMaterial color="#92999a" metalness={.92} roughness={.17}/></mesh>)}
  <mesh position={[1.12,.48,0]} rotation={[0,0,.55]}><cylinderGeometry args={[.055,.055,.72,24]}/><meshStandardMaterial color="#9a7a50" metalness={.55} roughness={.3}/></mesh>
</group>} export default RailCoupler
