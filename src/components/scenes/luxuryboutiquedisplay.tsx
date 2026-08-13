import { SpatialForm } from '../geometry/ProductionForms'
const anchor=[{x:-.86,y:-.12,width:.24,height:.14,exponent:4.4},{x:-.42,y:.04,width:.38,height:.2,exponent:4.2},{x:0,y:.12,width:.44,height:.24,exponent:4},{x:.42,y:.04,width:.38,height:.2,exponent:4.2},{x:.86,y:-.12,width:.24,height:.14,exponent:4.4}]
const secondary=[{x:-.58,y:.44,z:-.12,width:.16,height:.26,exponent:3.8},{x:-.2,y:.62,z:-.1,width:.23,height:.36,exponent:3.8},{x:.2,y:.62,z:-.1,width:.23,height:.36,exponent:3.8},{x:.58,y:.44,z:-.12,width:.16,height:.26,exponent:3.8}]
const rail:Array<[number,number,number]>=[[-.86,.2,.34],[-.58,.48,.42],[-.24,.6,.44],[.24,.6,.44],[.58,.48,.42],[.86,.2,.34]]
const profile:Array<[number,number]>=[[0,-.24],[.22,-.22],[.3,-.08],[.3,.1],[.2,.22],[0,.25]]
const platform:Array<[number,number]>=[[-1.02,-.68],[1.02,-.68],[.92,.58],[-.92,.58]]
export default function LuxuryBoutiqueDisplay(){return <SpatialForm anchor={anchor} secondary={secondary} rail={rail} profile={profile} platform={platform} primaryMaterial={{color:'#d7c7b8',roughness:.42,clearcoat:.16}} secondaryMaterial={{color:'#2b292d',roughness:.35,clearcoat:.25}} accentMaterial={{color:'#d0ad62',metalness:.78,roughness:.22,clearcoat:.34}} rotation={[0,-.26,0]} scale={.9}/>}
