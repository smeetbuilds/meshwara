import { IndustrialForm } from '../geometry/ProductionForms'
const housing=[{x:-.82,y:-.16,width:.19,height:.14,exponent:4.5},{x:-.44,y:-.02,width:.28,height:.2,exponent:4.2},{x:0,y:.08,width:.34,height:.24,exponent:4},{x:.42,y:.02,width:.3,height:.21,exponent:4.2},{x:.82,y:-.12,width:.2,height:.15,exponent:4.5}]
const actuator=[{x:-.3,y:.24,width:.1,height:.08,exponent:3.8},{x:0,y:.34,width:.16,height:.13,exponent:3.6},{x:.32,y:.26,width:.1,height:.08,exponent:3.8}]
const cable:Array<[number,number,number]>=[[-.72,-.12,.25],[-.46,.04,.32],[-.18,.16,.35],[.08,.18,.34],[.34,.08,.31],[.68,-.08,.24]]
const driveProfile:Array<[number,number]>=[[0,-.18],[.17,-.16],[.24,-.06],[.24,.07],[.17,.17],[0,.19]]
const baseProfile:Array<[number,number]>=[[-.92,-.48],[.92,-.48],[.84,.44],[.32,.52],[-.36,.52],[-.84,.44]]
export default function ConveyorDiverterJunction(){return <IndustrialForm housing={housing} actuator={actuator} cable={cable} driveProfile={driveProfile} baseProfile={baseProfile} bodyMaterial={{color:'#aab1b3',metalness:.26,roughness:.36,clearcoat:.16}} machineMaterial={{color:'#394147',metalness:.5,roughness:.3,clearcoat:.2}} signalMaterial={{color:'#e3a548',metalness:.22,roughness:.24,clearcoat:.3}} rotation={[0,-.38,0]} scale={.92}/>}
