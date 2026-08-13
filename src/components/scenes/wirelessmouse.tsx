import { CurvedBox } from '../geometry/CurvedBox'

function WirelessMouse(){
  return <group rotation={[.18,-.34,-.05]}>
    <CurvedBox args={[1.38,.55,2.18]} radius={.38} smoothness={8}><meshPhysicalMaterial color="#d7d8d5" roughness={.34} clearcoat={.6}/></CurvedBox>
    <CurvedBox args={[1.16,.08,.92]} radius={.28} smoothness={7} position={[0,.31,-.42]}><meshPhysicalMaterial color="#e2e3df" roughness={.28} clearcoat={.5}/></CurvedBox>
    <mesh position={[0,.36,-.62]}><boxGeometry args={[.028,.03,.74]}/><meshStandardMaterial color="#6b7070" roughness={.5}/></mesh>
    <mesh position={[0,.39,.05]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.11,.11,.17,32]}/><meshPhysicalMaterial color="#313536" metalness={.45} roughness={.26}/></mesh>
    <mesh position={[0,.41,.05]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.082,.018,16,36]}/><meshStandardMaterial color="#9aa09e" roughness={.38}/></mesh>
    <CurvedBox args={[.42,.045,.16]} radius={.05} smoothness={4} position={[0,.34,.56]}><meshStandardMaterial color="#bec0bd" roughness={.42}/></CurvedBox>
    {[-.42,.42].map(x=>[-.72,.72].map(z=><mesh key={`${x}-${z}`} position={[x,-.29,z]}><cylinderGeometry args={[.045,.045,.018,24]}/><meshStandardMaterial color="#868a88" roughness={.5}/></mesh>))}
  </group>
}
export default WirelessMouse
