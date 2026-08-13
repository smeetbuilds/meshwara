import { PerformanceForm } from '../geometry/ProductionForms'
const primary=[{x:-.42,y:0,width:.24,height:.18,exponent:2.5},{x:-.18,y:.04,width:.33,height:.29,exponent:2.9},{x:0,y:.12,width:.41,height:.37,exponent:3.4},{x:.18,y:.04,width:.33,height:.29,exponent:2.9},{x:.42,y:0,width:.24,height:.18,exponent:2.5}]
const secondary=[{x:-.26,y:.34,z:.02,width:.16,height:.08,exponent:4.2},{x:-.08,y:.42,z:.03,width:.3,height:.12,exponent:4.5},{x:.08,y:.42,z:.03,width:.3,height:.12,exponent:4.5},{x:.26,y:.34,z:.02,width:.16,height:.08,exponent:4.2}]
const trim:Array<[number,number,number]>=[[-.54,.02,.05],[-.38,.36,.08],[0,.58,.1],[.38,.36,.08],[.54,.02,.05],[.38,-.34,.03],[0,-.52,.02],[-.38,-.34,.03],[-.54,.02,.05]]
const accent:Array<[number,number,number]>=[[-.28,.45,.12],[0,.54,.15],[.28,.45,.12]]
const profile:Array<[number,number]>=[[0,-.22],[.22,-.2],[.3,-.08],[.32,.08],[.24,.2],[0,.23]]
export default function BrushedSignetRing(){return <PerformanceForm primary={primary} secondary={secondary} trim={trim} accent={accent} profile={profile} primaryMaterial={{color:'#b8a992',metalness:.92,roughness:.3,clearcoat:.2}} secondaryMaterial={{color:'#dcc6a3',metalness:.86,roughness:.24,clearcoat:.32}} accentMaterial={{color:'#5b4b3f',metalness:.66,roughness:.32,clearcoat:.2}} rotation={[.1,-.35,.18]} scale={.82}/>}
