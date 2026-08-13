import { IndustrialForm } from '../geometry/ProductionForms'
const housing=[{x:-.66,y:-.18,width:.22,height:.18,exponent:4},{x:-.34,y:.02,width:.28,height:.24,exponent:3.8},{x:0,y:.22,width:.31,height:.28,exponent:3.6},{x:.32,y:.38,width:.25,height:.22,exponent:3.6},{x:.58,y:.46,width:.16,height:.14,exponent:3.8}]
const actuator=[{x:-.24,y:0,width:.14,height:.12,exponent:3.4},{x:0,y:.14,width:.18,height:.16,exponent:3.2},{x:.28,y:.26,width:.13,height:.11,exponent:3.4}]
const cable:Array<[number,number,number]>=[[-.6,-.12,.2],[-.38,.18,.28],[-.1,.42,.3],[.2,.62,.24],[.5,.66,.12]]
const driveProfile:Array<[number,number]>=[[0,-.2],[.2,-.18],[.27,-.07],[.27,.08],[.19,.19],[0,.21]]
const baseProfile:Array<[number,number]>=[[-.76,-.46],[.76,-.46],[.88,.36],[.46,.56],[-.5,.56],[-.88,.34]]
export default function SixAxisRobotCell(){return <IndustrialForm housing={housing} actuator={actuator} cable={cable} driveProfile={driveProfile} baseProfile={baseProfile} bodyMaterial={{color:'#e1e3df',roughness:.38,clearcoat:.18}} machineMaterial={{color:'#343b40',metalness:.46,roughness:.3,clearcoat:.2}} signalMaterial={{color:'#e7a248',metalness:.34,roughness:.24,clearcoat:.3}} rotation={[0,-.4,0]} scale={.92}/>}
