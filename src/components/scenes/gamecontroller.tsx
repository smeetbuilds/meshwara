import { RoundedBox } from '@react-three/drei'
function PrecisionController(){return <group rotation={[.15,-.3,-.05]}>
  <RoundedBox args={[2.7,1.38,.58]} radius={.42} smoothness={6}><meshPhysicalMaterial color="#d8d4cb" roughness={.28} clearcoat={.45}/></RoundedBox>
  {[-.9,.9].map((x,i)=><RoundedBox key={x} args={[.78,1.62,.52]} radius={.35} smoothness={5} position={[x,-.42,-.05]} rotation={[0,0,i?-.16:.16]}><meshPhysicalMaterial color="#d8d4cb" roughness={.3}/></RoundedBox>)}
  {[-.55,.3].map((x,i)=><group key={x} position={[x,.12,.36]}><mesh><cylinderGeometry args={[.22,.22,.13,40]} /><meshPhysicalMaterial color="#1d2224" metalness={.4} roughness={.25}/></mesh><mesh position={[0,0,.08]}><circleGeometry args={[.14,36]} /><meshPhysicalMaterial color="#3e4548" roughness={.5}/></mesh></group>)}
  <group position={[-.7,.55,.35]}>{[-.18,.18].map(x=><mesh key={`h${x}`} position={[x,0,0]}><boxGeometry args={[.42,.12,.08]} /><meshPhysicalMaterial color="#252a2c" roughness={.42}/></mesh>)}{[-.18,.18].map(y=><mesh key={`v${y}`} position={[0,y,0]}><boxGeometry args={[.12,.42,.08]} /><meshPhysicalMaterial color="#252a2c" roughness={.42}/></mesh>)}</group>
  {[[.72,.58,'#6fc6a2'],[.94,.39,'#e58b66'],[.72,.2,'#7fa8d8'],[.5,.39,'#d9c36b']].map(([x,y,c])=><mesh key={String(x)+String(y)} position={[Number(x),Number(y),.38]}><sphereGeometry args={[.105,24,24]} /><meshPhysicalMaterial color={String(c)} roughness={.3} clearcoat={.7}/></mesh>)}
</group>}
export default PrecisionController
