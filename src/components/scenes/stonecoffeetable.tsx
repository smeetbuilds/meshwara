import { RoundedBox } from '@react-three/drei'

function StoneCoffeeTable(){
  return <group position={[0,-.72,0]} rotation={[0,-.36,0]}>
    <RoundedBox args={[3,.22,1.55]} radius={.12} smoothness={7} position={[0,1.12,0]}><meshPhysicalMaterial color="#b1aa9d" roughness={.64}/></RoundedBox>
    <RoundedBox args={[2.72,.06,1.3]} radius={.06} smoothness={4} position={[0,.98,0]}><meshStandardMaterial color="#8f887d" roughness={.72}/></RoundedBox>
    {[-.88,.88].map(x=><RoundedBox key={x} args={[.48,1.02,.72]} radius={.12} smoothness={6} position={[x,.5,0]}><meshPhysicalMaterial color="#8e887f" roughness={.72}/></RoundedBox>)}
    {[-.88,.88].map(x=><mesh key={`cap-${x}`} position={[x,.02,0]}><boxGeometry args={[.6,.06,.86]}/><meshStandardMaterial color="#68645d" roughness={.8}/></mesh>)}
    {[-1.1,-.72,-.34,.04,.42,.8].map((x,i)=><mesh key={x} position={[x,1.24,.79]} rotation={[0,0,(i%2?.35:-.3)]}><boxGeometry args={[.26,.012,.014]}/><meshStandardMaterial color="#81796d" roughness={.9}/></mesh>)}
  </group>
}
export default StoneCoffeeTable
