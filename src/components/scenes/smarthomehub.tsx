import { CurvedBox } from '../geometry/CurvedBox'
function SmartHomeHub(){return <group rotation={[.08,-.35,-.02]}>
  <CurvedBox args={[1.8,.82,1.8]} radius={.34} smoothness={8}><meshPhysicalMaterial color="#e2e3df" roughness={.32} clearcoat={.48}/></CurvedBox>
  <CurvedBox args={[1.42,.035,1.42]} radius={.24} smoothness={7} position={[0,.43,0]}><meshPhysicalMaterial color="#f0f1ee" roughness={.28}/></CurvedBox>
  <mesh position={[0,.46,0]}><torusGeometry args={[.52,.028,18,64]}/><meshStandardMaterial color="#c8cbc8" roughness={.42}/></mesh>
  <mesh position={[0,.47,0]}><cylinderGeometry args={[.14,.14,.022,48]}/><meshStandardMaterial color="#7bd2af" emissive="#3d8067" emissiveIntensity={1.2}/></mesh>
  {[[-.92,0,0],[.92,0,0],[0,0,-.92]].map((p,i)=><CurvedBox key={i} args={[i===2?.5:.12,.14,i===2?.12:.46]} radius={.04} smoothness={4} position={p as [number,number,number]}><meshPhysicalMaterial color="#3a4143" metalness={.35} roughness={.3}/></CurvedBox>)}
  {[-.55,.55].map(x=>[-.55,.55].map(z=><mesh key={`${x}-${z}`} position={[x,-.43,z]}><cylinderGeometry args={[.045,.045,.02,24]}/><meshStandardMaterial color="#6d7473" roughness={.5}/></mesh>))}
</group>} export default SmartHomeHub
