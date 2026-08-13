import { IndustrialForm } from '../geometry/ProductionForms'
const housing=[{x:-.68,y:-.14,width:.24,height:.2,exponent:4.2},{x:-.34,y:-.02,width:.31,height:.26,exponent:4},{x:0,y:.08,width:.36,height:.31,exponent:3.8},{x:.34,y:-.02,width:.31,height:.26,exponent:4},{x:.68,y:-.14,width:.24,height:.2,exponent:4.2}]
const actuator=[{x:-.24,y:.26,width:.11,height:.09,exponent:3.8},{x:0,y:.34,width:.17,height:.14,exponent:3.7},{x:.24,y:.26,width:.11,height:.09,exponent:3.8}]
const cable:Array<[number,number,number]>=[[-.58,-.12,.28],[-.36,.08,.34],[-.1,.2,.36],[.16,.18,.35],[.42,.06,.31],[.6,-.14,.23]]
const driveProfile:Array<[number,number]>=[[0,-.28],[.26,-.25],[.36,-.1],[.36,.12],[.25,.27],[0,.3]]
const baseProfile:Array<[number,number]>=[[-.82,-.52],[.82,-.52],[.9,.4],[.52,.56],[-.52,.56],[-.9,.4]]
export default function CncRotaryTable(){return <IndustrialForm housing={housing} actuator={actuator} cable={cable} driveProfile={driveProfile} baseProfile={baseProfile} bodyMaterial={{color:'#8f999c',metalness:.36,roughness:.32,clearcoat:.18}} machineMaterial={{color:'#31383d',metalness:.58,roughness:.28,clearcoat:.2}} signalMaterial={{color:'#d3a85d',metalness:.56,roughness:.23,clearcoat:.3}} rotation={[0,-.4,0]} scale={.9}/>}
