import { RoundedBox } from '@react-three/drei'

function DiningTable(){
  return <group position={[0,-.72,0]} rotation={[0,-.36,0]}>
    <RoundedBox args={[3.45,.22,1.75]} radius={.09} smoothness={6} position={[0,1.45,0]}><meshPhysicalMaterial color="#9a7a58" roughness={.58} clearcoat={.12}/></RoundedBox>
    <RoundedBox args={[3.12,.08,1.48]} radius={.035} smoothness={4} position={[0,1.31,0]}><meshStandardMaterial color="#6d523b" roughness={.68}/></RoundedBox>
    {[-1.28,1.28].map(x=>[-.56,.56].map(z=><group key={`${x}-${z}`} position={[x,.68,z]}>
      <RoundedBox args={[.16,1.38,.16]} radius={.04} smoothness={4}><meshPhysicalMaterial color="#25282a" metalness={.78} roughness={.24}/></RoundedBox>
      <mesh position={[0,-.67,0]}><cylinderGeometry args={[.16,.19,.06,28]}/><meshPhysicalMaterial color="#17191a" metalness={.72} roughness={.28}/></mesh>
      <mesh position={[0,.67,0]}><boxGeometry args={[.28,.07,.28]}/><meshPhysicalMaterial color="#b99b74" roughness={.45}/></mesh>
    </group>))}
    {[-1,1].map(x=><mesh key={x} position={[x,.98,0]}><boxGeometry args={[.08,.08,1.22]}/><meshStandardMaterial color="#313436" metalness={.62} roughness={.32}/></mesh>)}
    <mesh position={[0,.98,0]}><boxGeometry args={[2.5,.08,.08]}/><meshStandardMaterial color="#313436" metalness={.62} roughness={.32}/></mesh>
  </group>
}
export default DiningTable
