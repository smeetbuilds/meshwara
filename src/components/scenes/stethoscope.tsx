import { Line } from '@react-three/drei'
function Stethoscope(){return <group rotation={[.08,-.25,-.08]}>
  <Line points={[[-.65,1.3,0],[-1.0,.55,0],[-.72,-.15,0],[-.35,-.65,0]]} color="#23282a" lineWidth={7}/>
  <Line points={[[.65,1.3,0],[1.0,.55,0],[.72,-.15,0],[.35,-.65,0]]} color="#23282a" lineWidth={7}/>
  <Line points={[[-.35,-.65,0],[0,-1.0,0],[.35,-.65,0]]} color="#23282a" lineWidth={8}/>
  {[-.65,.65].map(x=><group key={x} position={[x,1.45,0]} rotation={[0,0,x>0?.18:-.18]}><mesh><cylinderGeometry args={[.055,.055,.46,16]} /><meshPhysicalMaterial color="#a8adaf" metalness={.92} roughness={.19}/></mesh><mesh position={[0,.28,0]}><sphereGeometry args={[.09,20,20]} /><meshPhysicalMaterial color="#d2d4d0" roughness={.38}/></mesh></group>)}
  <group position={[0,-1.25,0]}><mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.46,.46,.12,56]} /><meshPhysicalMaterial color="#a9adae" metalness={.9} roughness={.2}/></mesh><mesh position={[0,0,.075]}><circleGeometry args={[.35,56]} /><meshPhysicalMaterial color="#eef0ec" roughness={.5}/></mesh></group>
</group>}
export default Stethoscope
