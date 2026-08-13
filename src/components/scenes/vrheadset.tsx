import { RoundedBox } from '@react-three/drei'
function SpatialHeadset(){return <group position={[0,-.1,0]} rotation={[.08,-.36,0]}>
  <RoundedBox args={[2.75,1.05,.58]} radius={.36} smoothness={8}><meshPhysicalMaterial color="#d7dadc" metalness={.28} roughness={.18} clearcoat={.75}/></RoundedBox>
  <RoundedBox args={[2.45,.82,.035]} radius={.31} smoothness={7} position={[0,.03,.31]}><meshPhysicalMaterial color="#18252e" metalness={.35} roughness={.05} clearcoat={1}/></RoundedBox>
  <mesh position={[0,-.11,-.36]} scale={[1.15,.52,.24]}><torusGeometry args={[1,.15,20,64,Math.PI]}/><meshStandardMaterial color="#6c7377" roughness={.52}/></mesh>
  <mesh position={[0,.1,-.55]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[1.25,.09,16,64]}/><meshStandardMaterial color="#b9bdc0" roughness={.45}/></mesh>
</group>} export default SpatialHeadset
