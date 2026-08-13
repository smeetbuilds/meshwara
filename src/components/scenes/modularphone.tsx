import { LoftSurface, RevolvedSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const chassis:LoftStation[]=[{x:-1.45,width:.38,height:.05,exponent:5.8},{x:-1.25,width:.46,height:.075,exponent:6},{x:0,width:.5,height:.08,exponent:6.2},{x:1.25,width:.46,height:.075,exponent:6},{x:1.45,width:.38,height:.05,exponent:5.8}]
const glass:LoftStation[]=[{x:-1.39,width:.355,height:.018,y:.092,exponent:6},{x:0,width:.46,height:.02,y:.1,exponent:6.4},{x:1.39,width:.355,height:.018,y:.092,exponent:6}]
const edge:Array<[number,number,number]>=[[-1.3,.105,.39],[-.55,.115,.49],[.55,.115,.49],[1.3,.105,.39]]
const lens:Array<[number,number]>=[[.04,-.05],[.13,-.045],[.16,0],[.13,.045],[.04,.05]]
export default function ModularSmartphone(){return <group rotation={[.34,-.5,-.06]}>
 <LoftSurface stations={chassis} rotation={[0,0,Math.PI/2]} castShadow><meshPhysicalMaterial color="#595c5d" metalness={.86} roughness={.16} clearcoat={.35}/></LoftSurface>
 <LoftSurface stations={glass} rotation={[0,0,Math.PI/2]}><meshPhysicalMaterial color="#132833" metalness={.1} roughness={.04} clearcoat={1}/></LoftSurface>
 <SplineTube points={edge} radius={.012} rotation={[0,0,Math.PI/2]}><meshPhysicalMaterial color="#b8bfc0" metalness={1} roughness={.12}/></SplineTube>
 {[[-.83,.25],[0,.25],[.83,.25]].map(([y,z],i)=><RevolvedSurface key={i} profile={lens} position={[.17,y,z]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#10222e" roughness={.05} clearcoat={1}/></RevolvedSurface>)}
</group>}
