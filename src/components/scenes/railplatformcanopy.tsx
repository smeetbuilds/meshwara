import { ArchitectureForm } from '../geometry/ProductionForms'
const roof=[{x:-1.08,y:-.08,width:.16,height:.07,exponent:4.8},{x:-.64,y:.02,width:.28,height:.12,exponent:4.6},{x:0,y:.12,width:.42,height:.18,exponent:4.3},{x:.64,y:.02,width:.28,height:.12,exponent:4.6},{x:1.08,y:-.08,width:.16,height:.07,exponent:4.8}]
const canopy=[{x:-.94,y:-.18,width:.11,height:.06,exponent:4.8},{x:-.42,y:-.08,width:.2,height:.1,exponent:4.6},{x:.12,y:-.06,width:.22,height:.11,exponent:4.6},{x:.84,y:-.17,width:.12,height:.06,exponent:4.8}]
const promenade:Array<[number,number,number]>=[[-1,-.46,.32],[-.68,-.2,.4],[-.34,.0,.44],[0,.08,.46],[.34,.0,.44],[.68,-.2,.4],[1,-.46,.32]]
const columnProfile:Array<[number,number]>=[[0,-.34],[.055,-.32],[.065,.28],[.05,.34],[0,.35]]
const footprint:Array<[number,number]>=[[-1.15,-.58],[1.15,-.58],[1.08,.5],[-1.08,.5]]
export default function RailPlatformCanopy(){return <ArchitectureForm roof={roof} canopy={canopy} promenade={promenade} columnProfile={columnProfile} footprint={footprint} wallMaterial={{color:'#aeb5b6',metalness:.18,roughness:.38,clearcoat:.16}} roofMaterial={{color:'#50636b',metalness:.48,roughness:.28,clearcoat:.24}} frameMaterial={{color:'#2e383d',metalness:.72,roughness:.24,clearcoat:.25}} rotation={[0,-.26,0]} scale={.88}/>}
