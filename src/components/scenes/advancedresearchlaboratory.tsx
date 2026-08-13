import { SpatialForm } from '../geometry/ProductionForms'
const anchor=[{x:-.94,y:-.1,width:.27,height:.14,exponent:4.4},{x:-.5,y:.02,width:.38,height:.18,exponent:4.2},{x:0,y:.08,width:.46,height:.22,exponent:4},{x:.5,y:.02,width:.38,height:.18,exponent:4.2},{x:.94,y:-.1,width:.27,height:.14,exponent:4.4}]
const secondary=[{x:-.66,y:.38,z:-.16,width:.16,height:.22,exponent:3.6},{x:-.28,y:.56,z:-.12,width:.22,height:.32,exponent:3.6},{x:.12,y:.6,z:-.1,width:.25,height:.36,exponent:3.6},{x:.56,y:.42,z:-.14,width:.18,height:.25,exponent:3.6}]
const rail:Array<[number,number,number]>=[[-.9,.06,.38],[-.58,.34,.46],[-.22,.44,.48],[.12,.4,.44],[.46,.54,.38],[.78,.28,.3]]
const profile:Array<[number,number]>=[[0,-.3],[.24,-.28],[.32,-.12],[.32,.12],[.24,.28],[0,.31]]
const platform:Array<[number,number]>=[[-1.08,-.72],[1.08,-.72],[1,.6],[-1,.6]]
export default function AdvancedResearchLaboratory(){return <SpatialForm anchor={anchor} secondary={secondary} rail={rail} profile={profile} platform={platform} primaryMaterial={{color:'#d8d9d6',roughness:.48,clearcoat:.14}} secondaryMaterial={{color:'#44505a',metalness:.24,roughness:.34,clearcoat:.22}} accentMaterial={{color:'#66c4d7',metalness:.18,roughness:.2,clearcoat:.42}} rotation={[0,-.34,0]} scale={.9}/>}
