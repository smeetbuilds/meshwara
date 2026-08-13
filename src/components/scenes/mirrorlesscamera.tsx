import { CurvedBox } from '../geometry/CurvedBox'
function MirrorlessCamera(){return <group rotation={[0,-.42,0]} position={[0,-.2,0]}>
  <CurvedBox args={[2.35,1.42,.72]} radius={.16} smoothness={6}><meshPhysicalMaterial color="#272a2c" metalness={.68} roughness={.24} clearcoat={.65}/></CurvedBox>
  <CurvedBox args={[.56,1.22,.86]} radius={.15} smoothness={5} position={[-.88,-.05,.05]}><meshPhysicalMaterial color="#202326" roughness={.32}/></CurvedBox>
  <group position={[.48,.08,.56]}>
    {[.62,.52,.39,.28].map((r,i)=><mesh key={r} position={[0,0,i*.15]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[r,r,.18,64]}/><meshPhysicalMaterial color={i===3?'#151a1d':'#33383b'} metalness={.72} roughness={.2}/></mesh>)}
    <mesh position={[0,0,.55]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.24,.24,.045,64]}/><meshPhysicalMaterial color="#172b38" metalness={.15} roughness={.06} clearcoat={1}/></mesh>
  </group>
  <mesh position={[-.25,.79,.08]}><cylinderGeometry args={[.18,.18,.08,32]}/><meshPhysicalMaterial color="#74787a" metalness={1} roughness={.18}/></mesh>
  <mesh position={[.62,.78,.05]}><cylinderGeometry args={[.12,.12,.07,28]}/><meshPhysicalMaterial color="#6b6f70" metalness={1} roughness={.18}/></mesh>
</group>} export default MirrorlessCamera
