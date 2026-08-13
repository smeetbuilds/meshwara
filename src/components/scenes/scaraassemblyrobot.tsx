import { IndustrialForm } from '../geometry/ProductionForms'
const housing=[{x:-.58,y:-.2,width:.2,height:.17,exponent:4.2},{x:-.28,y:.02,width:.26,height:.22,exponent:4},{x:.02,y:.2,width:.26,height:.21,exponent:3.8},{x:.34,y:.32,width:.2,height:.16,exponent:3.8},{x:.62,y:.34,width:.13,height:.11,exponent:4}]
const actuator=[{x:-.22,y:.02,width:.12,height:.1,exponent:3.6},{x:.02,y:.18,width:.16,height:.14,exponent:3.4},{x:.28,y:.28,width:.11,height:.09,exponent:3.6}]
const cable:Array<[number,number,number]>=[[-.54,-.08,.18],[-.34,.14,.24],[-.08,.34,.25],[.2,.48,.2],[.52,.5,.1]]
const driveProfile:Array<[number,number]>=[[0,-.18],[.18,-.16],[.24,-.06],[.24,.07],[.17,.17],[0,.19]]
const baseProfile:Array<[number,number]>=[[-.68,-.44],[.68,-.44],[.78,.32],[.4,.5],[-.42,.5],[-.78,.32]]
export default function ScaraAssemblyRobot(){return <IndustrialForm housing={housing} actuator={actuator} cable={cable} driveProfile={driveProfile} baseProfile={baseProfile} bodyMaterial={{color:'#d5d9d7',roughness:.4,clearcoat:.15}} machineMaterial={{color:'#4e5960',metalness:.4,roughness:.31,clearcoat:.18}} signalMaterial={{color:'#70c2d1',metalness:.18,roughness:.22,clearcoat:.38}} rotation={[0,-.36,0]} scale={.94}/>}
