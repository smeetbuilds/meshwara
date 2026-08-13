import { PerformanceForm } from '../geometry/ProductionForms'
const primary=[{x:-.92,y:-.22,width:.18,height:.1,exponent:3.6},{x:-.62,y:-.14,width:.28,height:.16,exponent:3.8},{x:-.16,y:-.08,width:.37,height:.2,exponent:4},{x:.34,y:-.05,width:.34,height:.18,exponent:4},{x:.72,y:-.1,width:.25,height:.14,exponent:3.8},{x:.96,y:-.16,width:.12,height:.08,exponent:3.4}]
const secondary=[{x:-.78,y:-.02,z:.02,width:.17,height:.14,exponent:3.4},{x:-.46,y:.14,z:.02,width:.28,height:.28,exponent:3.4},{x:-.08,y:.24,z:.01,width:.34,height:.34,exponent:3.5},{x:.32,y:.2,z:0,width:.3,height:.28,exponent:3.5},{x:.64,y:.08,z:0,width:.2,height:.18,exponent:3.4}]
const trim:Array<[number,number,number]>=[[-.64,.16,.29],[-.42,.3,.34],[-.14,.36,.36],[.14,.3,.34],[.38,.18,.3]]
const accent:Array<[number,number,number]>=[[-.52,-.1,-.24],[-.12,-.04,-.3],[.32,-.02,-.26],[.68,-.09,-.18]]
const profile:Array<[number,number]>=[[0,-.1],[.11,-.09],[.17,-.02],[.16,.07],[.09,.12],[0,.13]]
export default function CarbonRunningShoe(){return <PerformanceForm primary={primary} secondary={secondary} trim={trim} accent={accent} profile={profile} primaryMaterial={{color:'#eff1eb',roughness:.48,clearcoat:.12}} secondaryMaterial={{color:'#20262b',roughness:.55,clearcoat:.08}} accentMaterial={{color:'#d0ff64',metalness:.04,roughness:.35,clearcoat:.18}} rotation={[0,-.5,-.08]} scale={.95}/>}
