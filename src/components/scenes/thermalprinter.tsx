import { CurvedBox } from '../geometry/CurvedBox'
function ThermalPrinter(){return <group position={[0,-.45,0]} rotation={[0,-.38,0]}>
  <CurvedBox args={[2.05,1.2,1.65]} radius={.18} smoothness={6}><meshPhysicalMaterial color="#d2d0ca" roughness={.4}/></CurvedBox>
  <CurvedBox args={[1.68,.12,.9]} radius={.08} smoothness={4} position={[0,.58,.02]}><meshStandardMaterial color="#c1beb6" roughness={.45}/></CurvedBox>
  <mesh position={[0,.34,.84]}><boxGeometry args={[1.45,.08,.08]}/><meshStandardMaterial color="#272a2b" roughness={.38}/></mesh>
  <mesh position={[.65,.1,.84]}><circleGeometry args={[.055,24]}/><meshBasicMaterial color="#75c88a" toneMapped={false}/></mesh>
  <mesh position={[0,.8,.08]} rotation={[-.18,0,0]}><planeGeometry args={[1.15,.55]}/><meshStandardMaterial color="#f5f1e7" roughness={.7}/></mesh>
</group>} export default ThermalPrinter
