import { CurvedBox } from '../geometry/CurvedBox'
function KitchenIsland(){return <group position={[0,-.82,0]} rotation={[.03,-.3,0]} scale={.92}>
  <mesh position={[0,-.72,0]}><boxGeometry args={[4.2,.1,3.0]} /><meshPhysicalMaterial color="#b9b3a8" roughness={.72} /></mesh>
  <CurvedBox args={[2.65,1.0,1.1]} radius={.08} smoothness={5} position={[0,-.15,0]}><meshPhysicalMaterial color="#665347" roughness={.48} /></CurvedBox>
  <CurvedBox args={[2.9,.12,1.32]} radius={.06} smoothness={5} position={[0,.38,0]}><meshPhysicalMaterial color="#d7d2ca" roughness={.28} /></CurvedBox>
  <mesh position={[.5,.46,.02]}><boxGeometry args={[.72,.025,.48]} /><meshPhysicalMaterial color="#6f7778" metalness={.58} roughness={.28} /></mesh>
  <mesh position={[.72,.72,.06]} rotation={[0,0,.7]}><cylinderGeometry args={[.035,.035,.6,18]} /><meshPhysicalMaterial color="#9b835e" metalness={.82} roughness={.22} /></mesh>
  {[-1.05,1.05].map(x=><group key={x} position={[x,-.45,1.05]}><mesh><cylinderGeometry args={[.28,.28,.08,36]} /><meshPhysicalMaterial color="#3b3f40" roughness={.45} /></mesh><mesh position={[0,-.42,0]}><cylinderGeometry args={[.055,.055,.78,20]} /><meshPhysicalMaterial color="#70777a" metalness={.82} roughness={.25} /></mesh><mesh position={[0,-.82,0]}><torusGeometry args={[.32,.035,12,40]} /><meshPhysicalMaterial color="#70777a" metalness={.82} roughness={.25} /></mesh></group>)}
  {[-.68,.68].map(x=><group key={x} position={[x,1.78,0]}><mesh><cylinderGeometry args={[.28,.42,.48,40]} /><meshPhysicalMaterial color="#d8cdbd" roughness={.34} /></mesh><mesh position={[0,.5,0]}><cylinderGeometry args={[.025,.025,.55,12]} /><meshPhysicalMaterial color="#777" metalness={.6} roughness={.3} /></mesh><pointLight position={[0,-.18,0]} intensity={.7} color="#ffe3bd" distance={1.5} /></group>)}
</group>}
export default KitchenIsland
