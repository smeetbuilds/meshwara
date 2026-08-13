import { IndustrialForm } from '../geometry/ProductionForms'
const housing=[{x:-.62,y:.42,width:.18,height:.15,exponent:4},{x:-.3,y:.52,width:.25,height:.2,exponent:3.8},{x:0,y:.58,width:.28,height:.23,exponent:3.6},{x:.3,y:.52,width:.25,height:.2,exponent:3.8},{x:.62,y:.42,width:.18,height:.15,exponent:4}]
const actuator=[{x:-.18,y:.18,width:.11,height:.09,exponent:3.5},{x:0,y:.04,width:.14,height:.12,exponent:3.3},{x:.18,y:-.14,width:.1,height:.08,exponent:3.5}]
const cable:Array<[number,number,number]>=[[-.5,.52,.18],[-.34,.2,.22],[-.16,-.12,.2],[0,-.42,.12],[.18,-.1,.18],[.38,.22,.2],[.52,.5,.16]]
const driveProfile:Array<[number,number]>=[[0,-.16],[.17,-.15],[.22,-.05],[.22,.06],[.16,.16],[0,.18]]
const baseProfile:Array<[number,number]>=[[-.72,-.4],[.72,-.4],[.82,.34],[.42,.5],[-.42,.5],[-.82,.34]]
export default function DeltaPickRobot(){return <IndustrialForm housing={housing} actuator={actuator} cable={cable} driveProfile={driveProfile} baseProfile={baseProfile} bodyMaterial={{color:'#e4e5e1',roughness:.4,clearcoat:.16}} machineMaterial={{color:'#31383d',metalness:.48,roughness:.29,clearcoat:.2}} signalMaterial={{color:'#efb44e',metalness:.28,roughness:.23,clearcoat:.32}} rotation={[0,-.3,0]} scale={.94}/>}
