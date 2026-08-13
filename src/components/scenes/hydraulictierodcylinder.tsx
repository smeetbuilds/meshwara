import { IndustrialForm } from '../geometry/ProductionForms'
const housing=[{x:-.82,y:-.08,width:.19,height:.16,exponent:4.2},{x:-.46,y:.0,width:.25,height:.21,exponent:4},{x:0,y:.04,width:.28,height:.24,exponent:3.9},{x:.46,y:.0,width:.25,height:.21,exponent:4},{x:.82,y:-.08,width:.19,height:.16,exponent:4.2}]
const actuator=[{x:-.38,y:.18,width:.09,height:.07,exponent:3.8},{x:0,y:.24,width:.14,height:.11,exponent:3.7},{x:.44,y:.18,width:.09,height:.07,exponent:3.8}]
const cable:Array<[number,number,number]>=[[-.72,-.08,.23],[-.46,.08,.29],[-.16,.16,.31],[.16,.16,.31],[.46,.08,.29],[.72,-.08,.23]]
const driveProfile:Array<[number,number]>=[[0,-.2],[.2,-.18],[.27,-.07],[.27,.08],[.19,.19],[0,.21]]
const baseProfile:Array<[number,number]>=[[-.92,-.48],[.92,-.48],[.9,.4],[.62,.5],[-.62,.5],[-.9,.4]]
export default function HydraulicTieRodCylinder(){return <IndustrialForm housing={housing} actuator={actuator} cable={cable} driveProfile={driveProfile} baseProfile={baseProfile} bodyMaterial={{color:'#6c777b',metalness:.42,roughness:.31,clearcoat:.18}} machineMaterial={{color:'#c0c7c8',metalness:.48,roughness:.28,clearcoat:.2}} signalMaterial={{color:'#c99b55',metalness:.5,roughness:.24,clearcoat:.28}} rotation={[0,-.38,0]} scale={.92}/>}
