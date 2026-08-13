import { PerformanceForm } from '../geometry/ProductionForms'
const primary=[{x:-.82,y:-.08,width:.34,height:.22,exponent:3},{x:-.52,y:.06,width:.48,height:.38,exponent:3.2},{x:-.1,y:.16,width:.56,height:.5,exponent:3.4},{x:.34,y:.12,width:.52,height:.46,exponent:3.3},{x:.72,y:0,width:.36,height:.28,exponent:3.1},{x:.92,y:-.1,width:.18,height:.14,exponent:2.8}]
const secondary=[{x:-.58,y:.08,z:.09,width:.21,height:.08,exponent:4.2},{x:-.2,y:.28,z:.11,width:.24,height:.09,exponent:4.4},{x:.2,y:.3,z:.11,width:.22,height:.08,exponent:4.4},{x:.56,y:.12,z:.08,width:.18,height:.07,exponent:4.2}]
const trim:Array<[number,number,number]>=[[-.72,-.12,.28],[-.42,-.28,.36],[0,-.34,.4],[.42,-.26,.34],[.72,-.12,.24]]
const accent:Array<[number,number,number]>=[[-.5,.24,.34],[-.18,.4,.42],[.16,.42,.4],[.48,.26,.3]]
const profile:Array<[number,number]>=[[0,-.18],[.18,-.16],[.26,-.04],[.24,.1],[.14,.18],[0,.2]]
export default function AeroCyclingHelmet(){return <PerformanceForm primary={primary} secondary={secondary} trim={trim} accent={accent} profile={profile} primaryMaterial={{color:'#d9dcde',roughness:.22,clearcoat:.6}} secondaryMaterial={{color:'#202327',roughness:.44,clearcoat:.16}} accentMaterial={{color:'#8bd1d8',metalness:.2,roughness:.24,clearcoat:.55}} rotation={[0,-.42,-.05]} scale={.92}/>}
