import { IndustrialForm } from '../geometry/ProductionForms'
const housing=[{x:-.66,y:-.16,width:.23,height:.19,exponent:4.1},{x:-.34,y:-.02,width:.3,height:.25,exponent:3.9},{x:0,y:.1,width:.35,height:.3,exponent:3.8},{x:.34,y:-.02,width:.3,height:.25,exponent:3.9},{x:.66,y:-.16,width:.23,height:.19,exponent:4.1}]
const actuator=[{x:-.22,y:.3,width:.12,height:.1,exponent:3.8},{x:0,y:.38,width:.18,height:.15,exponent:3.7},{x:.22,y:.3,width:.12,height:.1,exponent:3.8}]
const cable:Array<[number,number,number]>=[[-.58,-.1,.27],[-.34,.1,.34],[-.08,.24,.36],[.18,.22,.35],[.44,.08,.31],[.62,-.12,.22]]
const driveProfile:Array<[number,number]>=[[0,-.32],[.3,-.28],[.4,-.12],[.4,.14],[.28,.3],[0,.33]]
const baseProfile:Array<[number,number]>=[[-.8,-.52],[.8,-.52],[.9,.42],[.5,.56],[-.5,.56],[-.9,.42]]
export default function TwelveStationToolTurret(){return <IndustrialForm housing={housing} actuator={actuator} cable={cable} driveProfile={driveProfile} baseProfile={baseProfile} bodyMaterial={{color:'#485258',metalness:.5,roughness:.29,clearcoat:.2}} machineMaterial={{color:'#aeb6b8',metalness:.4,roughness:.31,clearcoat:.18}} signalMaterial={{color:'#e0a14f',metalness:.38,roughness:.23,clearcoat:.3}} rotation={[0,-.42,0]} scale={.9}/>}
