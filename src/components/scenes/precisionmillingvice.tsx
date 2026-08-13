import { IndustrialForm } from '../geometry/ProductionForms'
const housing=[{x:-.72,y:-.12,width:.22,height:.18,exponent:4.6},{x:-.38,y:-.02,width:.29,height:.24,exponent:4.4},{x:0,y:.04,width:.32,height:.27,exponent:4.3},{x:.38,y:-.02,width:.29,height:.24,exponent:4.4},{x:.72,y:-.12,width:.22,height:.18,exponent:4.6}]
const actuator=[{x:-.28,y:.25,width:.1,height:.08,exponent:4},{x:0,y:.32,width:.16,height:.13,exponent:3.8},{x:.28,y:.25,width:.1,height:.08,exponent:4}]
const cable:Array<[number,number,number]>=[[-.6,-.08,.25],[-.36,.08,.31],[-.1,.18,.34],[.16,.16,.33],[.42,.04,.29],[.62,-.1,.22]]
const driveProfile:Array<[number,number]>=[[0,-.18],[.18,-.16],[.24,-.06],[.24,.07],[.17,.17],[0,.19]]
const baseProfile:Array<[number,number]>=[[-.86,-.5],[.86,-.5],[.9,.4],[.58,.54],[-.58,.54],[-.9,.4]]
export default function PrecisionMillingVice(){return <IndustrialForm housing={housing} actuator={actuator} cable={cable} driveProfile={driveProfile} baseProfile={baseProfile} bodyMaterial={{color:'#5f6a6f',metalness:.42,roughness:.31,clearcoat:.17}} machineMaterial={{color:'#b6bdbe',metalness:.34,roughness:.33,clearcoat:.17}} signalMaterial={{color:'#d09c51',metalness:.48,roughness:.24,clearcoat:.28}} rotation={[0,-.38,0]} scale={.92}/>}
