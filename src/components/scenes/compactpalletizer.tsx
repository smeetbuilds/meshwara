import { IndustrialForm } from '../geometry/ProductionForms'
const housing=[{x:-.7,y:-.2,width:.2,height:.16,exponent:4},{x:-.38,y:.02,width:.27,height:.23,exponent:3.8},{x:-.06,y:.28,width:.3,height:.27,exponent:3.6},{x:.28,y:.46,width:.24,height:.2,exponent:3.7},{x:.58,y:.54,width:.15,height:.12,exponent:4}]
const actuator=[{x:-.24,y:.02,width:.12,height:.1,exponent:3.5},{x:0,y:.2,width:.17,height:.14,exponent:3.4},{x:.3,y:.34,width:.12,height:.1,exponent:3.5}]
const cable:Array<[number,number,number]>=[[-.62,-.12,.2],[-.4,.18,.28],[-.14,.46,.3],[.18,.66,.24],[.48,.74,.12]]
const driveProfile:Array<[number,number]>=[[0,-.19],[.19,-.17],[.26,-.06],[.26,.08],[.18,.18],[0,.2]]
const baseProfile:Array<[number,number]>=[[-.8,-.48],[.82,-.48],[.9,.34],[.5,.54],[-.5,.54],[-.9,.34]]
export default function CompactPalletizer(){return <IndustrialForm housing={housing} actuator={actuator} cable={cable} driveProfile={driveProfile} baseProfile={baseProfile} bodyMaterial={{color:'#e2e4e0',roughness:.38,clearcoat:.17}} machineMaterial={{color:'#30383d',metalness:.46,roughness:.3,clearcoat:.2}} signalMaterial={{color:'#e6a04b',metalness:.3,roughness:.24,clearcoat:.3}} rotation={[0,-.38,0]} scale={.92}/>}
