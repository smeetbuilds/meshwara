import { CurvedBox } from '../geometry/CurvedBox'
function PatientMonitor(){return <group position={[0,.45,0]} rotation={[0,-.35,0]}>
  <CurvedBox args={[1.8,1.45,.55]} radius={.12} smoothness={6} position={[0,.55,0]}><meshPhysicalMaterial color="#d2d3d0" roughness={.48} clearcoat={.2}/></CurvedBox>
  <CurvedBox args={[1.4,.95,.04]} radius={.05} smoothness={5} position={[0,.55,.3]}><meshPhysicalMaterial color="#132a31" roughness={.12} clearcoat={.6}/></CurvedBox>
  {[[-.5,.72,'#63d8a4'],[-.15,.58,'#e7bd62'],[.26,.43,'#d97164']].map(([x,y,c],i)=><mesh key={i} position={[x as number,y as number,.325]}><boxGeometry args={[.28,.02,.018]}/><meshStandardMaterial color={c as string} emissive={c as string} emissiveIntensity={.75}/></mesh>)}
  {[-.56,-.26,.04,.34,.64].map((x,i)=><mesh key={x} position={[x,.02,.31]}><cylinderGeometry args={[.045,.045,.025,24]}/><meshStandardMaterial color={i===4?'#7bd4ab':'#848b89'} emissive={i===4?'#356f58':'#000000'} emissiveIntensity={1}/></mesh>)}
  <mesh position={[0,-.65,0]}><cylinderGeometry args={[.1,.1,1.5,40]}/><meshPhysicalMaterial color="#6e787a" metalness={.75} roughness={.25}/></mesh>
  <CurvedBox args={[1,.12,.65]} radius={.04} smoothness={5} position={[0,-1.35,0]}><meshPhysicalMaterial color="#626c6f" metalness={.7} roughness={.3}/></CurvedBox>
  {[-.36,.36].map(x=><mesh key={x} position={[x,-1.42,.25]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.11,.03,16,28]}/><meshStandardMaterial color="#202425" roughness={.46}/></mesh>)}
</group>} export default PatientMonitor
