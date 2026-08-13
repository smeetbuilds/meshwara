import { CurvedBox } from '../geometry/CurvedBox'
function AutomatedDefibrillator(){return <group rotation={[0,-.35,0]}>
  <CurvedBox args={[2,1.55,.8]} radius={.15} smoothness={6}><meshPhysicalMaterial color="#d2d2cc" roughness={.5} clearcoat={.22}/></CurvedBox>
  <CurvedBox args={[1.28,.5,.045]} radius={.05} smoothness={5} position={[0,.3,.43]}><meshPhysicalMaterial color="#20343a" roughness={.16} clearcoat={.55}/></CurvedBox>
  <CurvedBox args={[.32,.22,.05]} radius={.065} smoothness={5} position={[-.58,-.38,.43]}><meshPhysicalMaterial color="#bc5146" roughness={.34}/></CurvedBox>
  <CurvedBox args={[1.1,.22,.3]} radius={.08} smoothness={5} position={[0,.93,0]}><meshPhysicalMaterial color="#6e7779" metalness={.65} roughness={.3}/></CurvedBox>
  {[-.25,.05,.35].map((x,i)=><mesh key={x} position={[x,-.39,.44]}><cylinderGeometry args={[.07,.07,.025,26]}/><meshStandardMaterial color={i===2?'#79d2a8':'#808786'} emissive={i===2?'#346f56':'#000000'} emissiveIntensity={1.1}/></mesh>)}
  <mesh position={[.78,-.34,.42]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.14,.035,16,36]}/><meshPhysicalMaterial color="#576164" metalness={.55} roughness={.3}/></mesh>
  {[-.72,.72].map(x=>[-.3,.3].map(y=><mesh key={`${x}-${y}`} position={[x,y,.44]}><boxGeometry args={[.1,.018,.02]}/><meshStandardMaterial color="#a8aaa6" roughness={.55}/></mesh>))}
</group>} export default AutomatedDefibrillator
