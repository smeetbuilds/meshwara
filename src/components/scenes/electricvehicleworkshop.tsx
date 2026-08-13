import { SpatialForm } from '../geometry/ProductionForms'
const anchor=[{x:-.9,y:-.16,width:.24,height:.12,exponent:4},{x:-.54,y:-.02,width:.38,height:.2,exponent:3.8},{x:-.1,y:.08,width:.48,height:.27,exponent:3.6},{x:.36,y:.05,width:.45,height:.24,exponent:3.8},{x:.76,y:-.06,width:.3,height:.17,exponent:4},{x:.94,y:-.14,width:.16,height:.1,exponent:4.2}]
const secondary=[{x:-.62,y:.46,z:-.15,width:.15,height:.24,exponent:4},{x:-.22,y:.58,z:-.12,width:.24,height:.34,exponent:4},{x:.24,y:.58,z:-.12,width:.24,height:.34,exponent:4},{x:.62,y:.46,z:-.15,width:.15,height:.24,exponent:4}]
const rail:Array<[number,number,number]>=[[-.86,-.2,.4],[-.6,.16,.5],[-.36,.52,.46],[0,.72,.38],[.36,.52,.46],[.6,.16,.5],[.86,-.2,.4]]
const profile:Array<[number,number]>=[[0,-.2],[.2,-.18],[.28,-.08],[.28,.1],[.18,.2],[0,.22]]
const platform:Array<[number,number]>=[[-1.1,-.72],[1.1,-.72],[1.02,.64],[-1.02,.64]]
export default function ElectricVehicleWorkshop(){return <SpatialForm anchor={anchor} secondary={secondary} rail={rail} profile={profile} platform={platform} primaryMaterial={{color:'#39444d',metalness:.22,roughness:.34,clearcoat:.24}} secondaryMaterial={{color:'#cfd4d4',roughness:.42,clearcoat:.15}} accentMaterial={{color:'#e1a44d',metalness:.35,roughness:.25,clearcoat:.26}} rotation={[0,-.3,0]} scale={.92}/>}
