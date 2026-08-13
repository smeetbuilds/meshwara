import { IndustrialForm } from '../geometry/ProductionForms'
const housing=[{x:-.74,y:-.14,width:.2,height:.18,exponent:4.8},{x:-.4,y:-.02,width:.25,height:.22,exponent:4.7},{x:0,y:.02,width:.27,height:.24,exponent:4.6},{x:.4,y:-.02,width:.25,height:.22,exponent:4.7},{x:.74,y:-.14,width:.2,height:.18,exponent:4.8}]
const actuator=[{x:-.36,y:.28,width:.08,height:.07,exponent:4.5},{x:0,y:.34,width:.14,height:.11,exponent:4.3},{x:.36,y:.28,width:.08,height:.07,exponent:4.5}]
const cable:Array<[number,number,number]>=[[-.66,-.18,.26],[-.42,-.02,.32],[-.16,.08,.34],[.12,.08,.34],[.4,-.02,.32],[.66,-.18,.26]]
const driveProfile:Array<[number,number]>=[[0,-.13],[.12,-.12],[.17,-.04],[.17,.05],[.12,.13],[0,.14]]
const baseProfile:Array<[number,number]>=[[-.8,-.5],[.8,-.5],[.8,.42],[.6,.52],[-.6,.52],[-.8,.42]]
export default function PlcControlRack(){return <IndustrialForm housing={housing} actuator={actuator} cable={cable} driveProfile={driveProfile} baseProfile={baseProfile} bodyMaterial={{color:'#c8cccd',roughness:.38,clearcoat:.14}} machineMaterial={{color:'#3b454b',metalness:.36,roughness:.34,clearcoat:.17}} signalMaterial={{color:'#df6b55',metalness:.14,roughness:.25,clearcoat:.3}} rotation={[0,-.32,0]} scale={.94}/>}
