import { IndustrialForm } from '../geometry/ProductionForms'
const housing=[{x:-.78,y:.02,width:.18,height:.12,exponent:4.5},{x:-.4,y:.08,width:.25,height:.17,exponent:4.3},{x:0,y:.12,width:.29,height:.2,exponent:4.2},{x:.4,y:.08,width:.25,height:.17,exponent:4.3},{x:.78,y:.02,width:.18,height:.12,exponent:4.5}]
const actuator=[{x:-.26,y:-.14,width:.1,height:.08,exponent:3.8},{x:0,y:-.24,width:.15,height:.12,exponent:3.6},{x:.26,y:-.14,width:.1,height:.08,exponent:3.8}]
const cable:Array<[number,number,number]>=[[-.66,.18,.22],[-.42,.34,.28],[-.14,.42,.3],[.14,.42,.3],[.42,.34,.28],[.66,.18,.22]]
const driveProfile:Array<[number,number]>=[[0,-.16],[.16,-.15],[.22,-.05],[.22,.06],[.15,.16],[0,.17]]
const baseProfile:Array<[number,number]>=[[-.9,-.42],[.9,-.42],[.86,.34],[.56,.46],[-.56,.46],[-.86,.34]]
export default function VacuumGripperArray(){return <IndustrialForm housing={housing} actuator={actuator} cable={cable} driveProfile={driveProfile} baseProfile={baseProfile} bodyMaterial={{color:'#bcc3c5',metalness:.26,roughness:.35,clearcoat:.16}} machineMaterial={{color:'#2f363b',metalness:.5,roughness:.29,clearcoat:.2}} signalMaterial={{color:'#72b7cf',metalness:.18,roughness:.22,clearcoat:.38}} rotation={[0,-.34,0]} scale={.94}/>}
