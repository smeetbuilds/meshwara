import { IndustrialForm } from '../geometry/ProductionForms'
const housing=[{x:-.64,y:-.12,width:.24,height:.2,exponent:4.6},{x:-.34,y:.0,width:.28,height:.24,exponent:4.4},{x:0,y:.04,width:.3,height:.26,exponent:4.4},{x:.34,y:.0,width:.28,height:.24,exponent:4.4},{x:.64,y:-.12,width:.24,height:.2,exponent:4.6}]
const actuator=[{x:-.3,y:.3,width:.1,height:.08,exponent:4.2},{x:0,y:.36,width:.16,height:.12,exponent:4},{x:.3,y:.3,width:.1,height:.08,exponent:4.2}]
const cable:Array<[number,number,number]>=[[-.54,-.12,.28],[-.34,.0,.34],[-.1,.08,.36],[.14,.06,.34],[.42,-.04,.3],[.6,-.18,.22]]
const driveProfile:Array<[number,number]>=[[0,-.16],[.15,-.14],[.2,-.05],[.2,.06],[.14,.15],[0,.17]]
const baseProfile:Array<[number,number]>=[[-.72,-.46],[.72,-.46],[.76,.4],[.56,.5],[-.56,.5],[-.76,.4]]
export default function ServoDriveModule(){return <IndustrialForm housing={housing} actuator={actuator} cable={cable} driveProfile={driveProfile} baseProfile={baseProfile} bodyMaterial={{color:'#cfd3d4',roughness:.36,clearcoat:.18}} machineMaterial={{color:'#2a3034',metalness:.5,roughness:.3,clearcoat:.2}} signalMaterial={{color:'#78c1db',metalness:.2,roughness:.21,clearcoat:.4}} rotation={[0,-.34,0]} scale={.92}/>}
