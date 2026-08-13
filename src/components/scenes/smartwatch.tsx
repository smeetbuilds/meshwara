import { CurvedBox } from '../geometry/CurvedBox'
function Smartwatch(){return <group rotation={[.18,-.32,.08]}>
  <CurvedBox args={[1.65,1.9,.38]} radius={.32} smoothness={6}><meshPhysicalMaterial color="#888d91" metalness={1} roughness={.17} clearcoat={.9}/></CurvedBox>
  <CurvedBox args={[1.48,1.72,.035]} radius={.27} smoothness={5} position={[0,0,.21]}><meshPhysicalMaterial color="#090b0d" roughness={.14} clearcoat={1}/></CurvedBox>
  <mesh position={[0,0,.235]}><circleGeometry args={[.54,64]} /><meshBasicMaterial color="#101a20" /></mesh>
  {Array.from({length:12},(_,i)=>{const a=i/12*Math.PI*2;return <mesh key={i} position={[Math.sin(a)*.43,Math.cos(a)*.43,.244]} rotation={[0,0,-a]}><boxGeometry args={[.025,.095,.01]} /><meshBasicMaterial color="#d9e0df" /></mesh>})}
  <mesh position={[0,.11,.252]} rotation={[0,0,-.7]}><boxGeometry args={[.035,.62,.012]} /><meshBasicMaterial color="#f2f1ec" /></mesh>
  <mesh position={[0,.16,.254]} rotation={[0,0,.55]}><boxGeometry args={[.022,.46,.014]} /><meshBasicMaterial color="#ee705c" /></mesh>
  {[-1,1].map(side=><CurvedBox key={side} args={[1.08,1.75,.18]} radius={.12} smoothness={4} position={[0,side*1.72,-.05]}><meshPhysicalMaterial color="#333637" roughness={.58}/></CurvedBox>)}
  <mesh position={[.93,.05,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.16,.16,.23,32]} /><meshPhysicalMaterial color="#747a7e" metalness={1} roughness={.2}/></mesh>
</group>}
export default Smartwatch
