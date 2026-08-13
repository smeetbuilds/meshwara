import { IndustrialForm } from '../geometry/ProductionForms'
const housing=[{x:-.62,y:-.1,width:.22,height:.2,exponent:4.7},{x:-.28,y:.0,width:.27,height:.24,exponent:4.5},{x:.08,y:.02,width:.28,height:.25,exponent:4.5},{x:.42,y:-.04,width:.22,height:.2,exponent:4.7},{x:.68,y:-.1,width:.15,height:.13,exponent:4.8}]
const actuator=[{x:-.18,y:.24,width:.1,height:.08,exponent:4.2},{x:.02,y:.3,width:.15,height:.12,exponent:4},{x:.22,y:.24,width:.1,height:.08,exponent:4.2}]
const cable:Array<[number,number,number]>=[[-.56,-.08,.27],[-.34,.06,.34],[-.08,.14,.36],[.18,.12,.34],[.44,.02,.29],[.62,-.1,.2]]
const driveProfile:Array<[number,number]>=[[0,-.22],[.21,-.2],[.3,-.08],[.3,.1],[.2,.22],[0,.24]]
const baseProfile:Array<[number,number]>=[[-.72,-.48],[.72,-.48],[.78,.4],[.54,.5],[-.54,.5],[-.78,.4]]
export default function MachineVisionCamera(){return <IndustrialForm housing={housing} actuator={actuator} cable={cable} driveProfile={driveProfile} baseProfile={baseProfile} bodyMaterial={{color:'#434b50',metalness:.46,roughness:.28,clearcoat:.24}} machineMaterial={{color:'#c4cbcd',metalness:.24,roughness:.34,clearcoat:.2}} signalMaterial={{color:'#8fc6e2',metalness:.12,roughness:.18,clearcoat:.5}} rotation={[0,-.36,0]} scale={.92}/>}
