import { RoundedBox } from '@react-three/drei'
function DesktopDAC(){return <group position={[0,-.4,0]} rotation={[0,-.34,0]}>
  <RoundedBox args={[2.65,.72,1.55]} radius={.12} smoothness={5}><meshPhysicalMaterial color="#353a3d" metalness={.76} roughness={.24}/></RoundedBox>
  <RoundedBox args={[2.45,.5,.04]} radius={.05} smoothness={4} position={[0,0,.795]}><meshStandardMaterial color="#171a1c" roughness={.3}/></RoundedBox>
  <mesh position={[.68,0,.83]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.28,.28,.12,48]}/><meshPhysicalMaterial color="#8e9395" metalness={1} roughness={.16}/></mesh>
  <mesh position={[-.55,.08,.82]}><planeGeometry args={[.8,.22]}/><meshBasicMaterial color="#5cb9a4" toneMapped={false}/></mesh>
  {[-.95,-.75].map((x,i)=><mesh key={x} position={[x,-.14,.83]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[i? .07:.1,i?.07:.1,.06,32]}/><meshStandardMaterial color="#0d0f10"/></mesh>)}
</group>} export default DesktopDAC
