import { RoundedBox } from '@react-three/drei'
function IcuVentilator(){return <group position={[0,.65,0]} rotation={[0,-.35,0]}>
  <RoundedBox args={[1.75,1.65,.82]} radius={.13} smoothness={6} position={[0,.35,0]}><meshPhysicalMaterial color="#d1d2ce" roughness={.48} clearcoat={.18}/></RoundedBox>
  <RoundedBox args={[1.28,.82,.05]} radius={.06} smoothness={5} position={[0,.55,.44]}><meshPhysicalMaterial color="#173039" roughness={.14} clearcoat={.6}/></RoundedBox>
  {[[-.42,.72,'#69d8aa'],[-.08,.5,'#e8bf64'],[.3,.32,'#d86e67']].map(([x,y,c],i)=><mesh key={i} position={[x as number,y as number,.47]}><boxGeometry args={[.24,.02,.018]}/><meshStandardMaterial color={c as string} emissive={c as string} emissiveIntensity={.7}/></mesh>)}
  {[-.48,-.15,.18,.51].map((x,i)=><mesh key={x} position={[x,-.08,.46]}><cylinderGeometry args={[.05,.05,.024,24]}/><meshStandardMaterial color={i===3?'#71d0a5':'#858b89'} emissive={i===3?'#326b54':'#000000'} emissiveIntensity={1}/></mesh>)}
  <mesh position={[0,-.95,0]}><cylinderGeometry args={[.12,.12,1.6,40]}/><meshPhysicalMaterial color="#727c7f" metalness={.75} roughness={.25}/></mesh>
  <RoundedBox args={[1.1,.12,.75]} radius={.04} smoothness={5} position={[0,-1.72,0]}><meshPhysicalMaterial color="#656f72" metalness={.72} roughness={.28}/></RoundedBox>
  {[-.38,.38].map(x=><mesh key={x} position={[x,-1.78,.29]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.12,.035,16,30]}/><meshStandardMaterial color="#202425" roughness={.45}/></mesh>)}
  <mesh position={[.92,.25,.2]} rotation={[0,0,.9]}><torusGeometry args={[.28,.035,16,42]}/><meshPhysicalMaterial color="#7f8b8d" metalness={.5} roughness={.3}/></mesh>
</group>} export default IcuVentilator
