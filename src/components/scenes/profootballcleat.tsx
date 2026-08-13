import { PerformanceForm } from '../geometry/ProductionForms'
const primary=[{x:-.9,y:-.22,width:.19,height:.11,exponent:3.6},{x:-.58,y:-.14,width:.29,height:.16,exponent:3.8},{x:-.12,y:-.08,width:.36,height:.19,exponent:4},{x:.34,y:-.05,width:.33,height:.17,exponent:4},{x:.72,y:-.12,width:.23,height:.13,exponent:3.7},{x:.94,y:-.18,width:.11,height:.07,exponent:3.3}]
const secondary=[{x:-.72,y:0,z:.01,width:.18,height:.16,exponent:3.4},{x:-.42,y:.16,z:.01,width:.28,height:.3,exponent:3.5},{x:-.06,y:.28,z:0,width:.33,height:.37,exponent:3.6},{x:.3,y:.22,z:0,width:.29,height:.3,exponent:3.5},{x:.62,y:.08,z:0,width:.19,height:.18,exponent:3.4}]
const trim:Array<[number,number,number]>=[[-.52,.2,.28],[-.3,.34,.33],[-.06,.39,.35],[.18,.34,.32],[.4,.2,.28]]
const accent:Array<[number,number,number]>=[[-.68,-.22,-.2],[-.42,-.3,-.25],[-.05,-.28,-.27],[.34,-.26,-.22],[.68,-.24,-.16]]
const profile:Array<[number,number]>=[[0,-.13],[.1,-.12],[.15,-.04],[.14,.05],[.08,.1],[0,.11]]
export default function ProFootballCleat(){return <PerformanceForm primary={primary} secondary={secondary} trim={trim} accent={accent} profile={profile} primaryMaterial={{color:'#191b1d',roughness:.44,clearcoat:.2}} secondaryMaterial={{color:'#f3f1e9',roughness:.36,clearcoat:.16}} accentMaterial={{color:'#df583f',metalness:.08,roughness:.3,clearcoat:.3}} rotation={[0,-.48,-.06]} scale={.95}/>}
