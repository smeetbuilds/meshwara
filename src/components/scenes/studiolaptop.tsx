import { CurvedBox } from '../geometry/CurvedBox'
function StudioLaptop(){return <group position={[0,-.55,0]} rotation={[0,-.35,0]}>
  <CurvedBox args={[2.8,.14,1.75]} radius={.11} smoothness={5}><meshPhysicalMaterial color="#a3a6a7" metalness={.83} roughness={.22}/></CurvedBox>
  <group position={[0,.86,-.78]} rotation={[-.16,0,0]}>
    <CurvedBox args={[2.72,1.72,.09]} radius={.1} smoothness={5}><meshPhysicalMaterial color="#8d9295" metalness={.78} roughness={.22}/></CurvedBox>
    <mesh position={[0,0,.055]}><planeGeometry args={[2.5,1.48]}/><meshBasicMaterial color="#18232c"/></mesh>
    <mesh position={[0,-.07,.058]}><planeGeometry args={[2.15,1.02]}/><meshBasicMaterial color="#314a5a"/></mesh>
  </group>
  <group position={[0,.09,.02]}>{Array.from({length:6},(_,r)=>Array.from({length:14},(_,c)=><CurvedBox key={`${r}-${c}`} args={[.14,.025,.12]} radius={.018} smoothness={3} position={[-.98+c*.15,.055,-.52+r*.16]}><meshStandardMaterial color="#393d3f" roughness={.35}/></CurvedBox>))}</group>
  <CurvedBox args={[.88,.018,.48]} radius={.04} smoothness={4} position={[0,.09,.56]}><meshStandardMaterial color="#969a9c" roughness={.3}/></CurvedBox>
</group>} export default StudioLaptop
