import { RoundedBox } from '@react-three/drei'
function LoungeChair(){return <group position={[0,-.72,0]} rotation={[0,-.4,0]}>
  <RoundedBox args={[2.0,.36,1.75]} radius={.28} smoothness={7} position={[0,.5,0]} rotation={[-.08,0,0]}><meshPhysicalMaterial color="#6d5b52" roughness={.58} sheen={.35}/></RoundedBox>
  <RoundedBox args={[1.9,1.35,.32]} radius={.26} smoothness={7} position={[0,1.3,-.55]} rotation={[-.34,0,0]}><meshPhysicalMaterial color="#746259" roughness={.58} sheen={.35}/></RoundedBox>
  <RoundedBox args={[1.65,.25,1.32]} radius={.2} smoothness={6} position={[0,.72,.1]}><meshPhysicalMaterial color="#a48b7c" roughness={.62}/></RoundedBox>
  {[-.72,.72].flatMap(x=>[-.55,.55].map(z=><mesh key={`${x}-${z}`} position={[x,-.02,z]} rotation={[0,0,x*.12]}><cylinderGeometry args={[.045,.06,.95,16]}/><meshPhysicalMaterial color="#444647" metalness={.75} roughness={.25}/></mesh>))}
</group>} export default LoungeChair
