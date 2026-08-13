import { CurvedBox } from '../geometry/CurvedBox'
function WritingDesk(){return <group position={[0,-.7,0]} rotation={[0,-.34,0]}>
  <CurvedBox args={[3.3,.18,1.55]} radius={.08} smoothness={4} position={[0,.7,0]}><meshPhysicalMaterial color="#8c6748" roughness={.34}/></CurvedBox>
  <CurvedBox args={[1.55,.035,.85]} radius={.04} smoothness={4} position={[-.42,.805,.05]}><meshStandardMaterial color="#493d35" roughness={.62}/></CurvedBox>
  <CurvedBox args={[1.15,.28,1.28]} radius={.05} smoothness={4} position={[.86,.5,0]}><meshStandardMaterial color="#76563f" roughness={.38}/></CurvedBox>
  {[[-1.45,.0,-.62],[-1.45,.0,.62],[1.45,.0,-.62],[1.45,.0,.62]].map((p,i)=><mesh key={i} position={p as [number,number,number]}><cylinderGeometry args={[.055,.075,1.35,20]}/><meshPhysicalMaterial color="#363737" metalness={.7} roughness={.27}/></mesh>)}
  <mesh position={[0,.08,-.58]}><boxGeometry args={[2.7,.08,.1]}/><meshPhysicalMaterial color="#4b3b31" roughness={.48}/></mesh>
</group>} export default WritingDesk
