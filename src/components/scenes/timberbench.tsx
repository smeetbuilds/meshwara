import { RoundedBox } from '@react-three/drei'
function TimberBench(){return <group position={[0,.2,0]} rotation={[0,-.35,0]}>
  <RoundedBox args={[3,.34,.72]} radius={.1} smoothness={6} position={[0,.3,0]}><meshPhysicalMaterial color="#8d674d" roughness={.55}/></RoundedBox>
  <RoundedBox args={[2.82,.08,.56]} radius={.035} smoothness={4} position={[0,.1,0]}><meshStandardMaterial color="#6c4f3b" roughness={.7}/></RoundedBox>
  {[-1,1].map(x=><group key={x} position={[x,-.3,0]}><RoundedBox args={[.24,.9,.52]} radius={.055} smoothness={5}><meshPhysicalMaterial color="#5e493b" roughness={.52}/></RoundedBox><mesh position={[0,-.45,0]}><boxGeometry args={[.46,.06,.64]}/><meshStandardMaterial color="#3c3a37" roughness={.65}/></mesh><mesh position={[0,.43,0]}><boxGeometry args={[.42,.06,.62]}/><meshPhysicalMaterial color="#a58466" roughness={.5}/></mesh></group>)}
  <RoundedBox args={[2.06,.16,.16]} radius={.04} smoothness={4} position={[0,-.56,0]}><meshPhysicalMaterial color="#514235" roughness={.5}/></RoundedBox>
  {[-1.22,-.62,0,.62,1.22].map(x=><mesh key={x} position={[x,.49,.36]}><boxGeometry args={[.015,.03,.62]}/><meshStandardMaterial color="#71513c" roughness={.78}/></mesh>)}
</group>} export default TimberBench
