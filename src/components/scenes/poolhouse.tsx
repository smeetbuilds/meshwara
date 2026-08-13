import { RoundedBox } from '@react-three/drei'
function PoolHouse(){return <group position={[0,.15,0]} rotation={[0,-.42,0]}>
  <RoundedBox args={[3.9,.12,2.8]} radius={.02} smoothness={4} position={[0,-.9,0]}><meshPhysicalMaterial color="#b0a799" roughness={.78}/></RoundedBox>
  <RoundedBox args={[3.5,.16,2.05]} radius={.02} smoothness={4} position={[0,1.1,-.25]}><meshPhysicalMaterial color="#6c6d69" metalness={.55} roughness={.35}/></RoundedBox>
  <RoundedBox args={[2.7,.05,1.4]} radius={.01} smoothness={4} position={[0,.1,-.85]}><meshPhysicalMaterial color="#9fbebe" roughness={.08} transmission={.72} transparent opacity={.35}/></RoundedBox>
  <RoundedBox args={[3,.06,.8]} radius={.01} smoothness={4} position={[0,-.78,.75]}><meshPhysicalMaterial color="#6ba4ad" roughness={.18}/></RoundedBox>
  {[-1.52,-.76,0,.76,1.52].map(x=><mesh key={x} position={[x,.05,-.82]}><boxGeometry args={[.055,2.0,.055]}/><meshPhysicalMaterial color="#3d4141" metalness={.68} roughness={.28}/></mesh>)}
  {[-1.45,1.45].map(x=><RoundedBox key={x} args={[.18,1.95,.18]} radius={.025} smoothness={4} position={[x,.08,.52]}><meshStandardMaterial color="#8f877a" roughness={.68}/></RoundedBox>)}
  <RoundedBox args={[1.25,.12,.42]} radius={.045} smoothness={4} position={[.72,-.72,-.28]}><meshStandardMaterial color="#d5cec0" roughness={.8}/></RoundedBox>
  <RoundedBox args={[.46,.36,.46]} radius={.1} smoothness={5} position={[-1.05,-.58,.78]}><meshPhysicalMaterial color="#56735f" roughness={.72}/></RoundedBox>
</group>} export default PoolHouse
