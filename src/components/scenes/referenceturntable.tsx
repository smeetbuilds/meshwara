import { CurvedBox } from '../geometry/CurvedBox'
function ReferenceTurntable(){return <group position={[0,-.6,0]} rotation={[0,-.32,0]}>
  <CurvedBox args={[3,.26,2.15]} radius={.12} smoothness={5}><meshPhysicalMaterial color="#543e2f" roughness={.34} clearcoat={.28}/></CurvedBox>
  <mesh position={[-.38,.24,0]}><cylinderGeometry args={[.86,.86,.13,80]}/><meshPhysicalMaterial color="#35383a" metalness={.8} roughness={.19}/></mesh>
  <mesh position={[-.38,.32,0]}><cylinderGeometry args={[.77,.77,.035,80]}/><meshStandardMaterial color="#111315" roughness={.34}/></mesh>
  <mesh position={[-.38,.36,0]}><cylinderGeometry args={[.055,.055,.05,28]}/><meshPhysicalMaterial color="#b4b5b5" metalness={1} roughness={.14}/></mesh>
  <group position={[.92,.38,.48]} rotation={[0,.1,0]}>
    <mesh rotation={[0,0,-.14]} position={[-.18,.42,0]}><cylinderGeometry args={[.035,.035,1.05,24]}/><meshPhysicalMaterial color="#afb2b3" metalness={1} roughness={.18}/></mesh>
    <mesh position={[-.34,.91,0]} rotation={[0,0,-.14]}><boxGeometry args={[.12,.22,.12]}/><meshStandardMaterial color="#1d2022"/></mesh>
    <mesh position={[0,-.1,0]}><cylinderGeometry args={[.12,.12,.16,32]}/><meshPhysicalMaterial color="#4b4f51" metalness={.7} roughness={.25}/></mesh>
  </group>
</group>} export default ReferenceTurntable
