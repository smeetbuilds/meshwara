import { IndustrialForm } from '../geometry/ProductionForms'
const housing=[{x:-.74,y:-.12,width:.16,height:.14,exponent:4.8},{x:-.38,y:-.02,width:.21,height:.18,exponent:4.7},{x:0,y:.02,width:.23,height:.2,exponent:4.7},{x:.38,y:-.02,width:.21,height:.18,exponent:4.7},{x:.74,y:-.12,width:.16,height:.14,exponent:4.8}]
const actuator=[{x:-.3,y:.3,width:.08,height:.07,exponent:4.5},{x:0,y:.36,width:.13,height:.1,exponent:4.4},{x:.3,y:.3,width:.08,height:.07,exponent:4.5}]
const cable:Array<[number,number,number]>=[[-.66,-.12,.22],[-.42,.02,.28],[-.16,.1,.3],[.16,.1,.3],[.42,.02,.28],[.66,-.12,.22]]
const driveProfile:Array<[number,number]>=[[0,-.14],[.13,-.13],[.18,-.04],[.18,.05],[.13,.14],[0,.15]]
const baseProfile:Array<[number,number]>=[[-.8,-.5],[.8,-.5],[.78,.42],[.56,.5],[-.56,.5],[-.78,.42]]
export default function SafetyLightCurtain(){return <IndustrialForm housing={housing} actuator={actuator} cable={cable} driveProfile={driveProfile} baseProfile={baseProfile} bodyMaterial={{color:'#d5d8d7',roughness:.4,clearcoat:.14}} machineMaterial={{color:'#353d42',metalness:.42,roughness:.31,clearcoat:.18}} signalMaterial={{color:'#e75045',metalness:.08,roughness:.2,clearcoat:.38}} rotation={[0,-.3,0]} scale={.94}/>}
