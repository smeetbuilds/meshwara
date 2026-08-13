import { ArchitectureForm } from '../geometry/ProductionForms'
const roof=[{x:-1,y:0,width:.2,height:.08,exponent:4.8},{x:-.6,y:.08,width:.34,height:.14,exponent:4.6},{x:0,y:.18,width:.46,height:.22,exponent:4.4},{x:.6,y:.08,width:.34,height:.14,exponent:4.6},{x:1,y:0,width:.2,height:.08,exponent:4.8}]
const canopy=[{x:-.82,y:-.12,width:.12,height:.07,exponent:4.8},{x:-.28,y:-.02,width:.24,height:.11,exponent:4.5},{x:.28,y:-.02,width:.24,height:.11,exponent:4.5},{x:.82,y:-.12,width:.12,height:.07,exponent:4.8}]
const promenade:Array<[number,number,number]>=[[-.96,-.36,.38],[-.68,-.08,.46],[-.34,.18,.5],[0,.3,.52],[.34,.18,.5],[.68,-.08,.46],[.96,-.36,.38]]
const columnProfile:Array<[number,number]>=[[0,-.3],[.055,-.28],[.065,.22],[.05,.3],[0,.31]]
const footprint:Array<[number,number]>=[[-1.1,-.6],[1.1,-.6],[1,.58],[-1,.58]]
export default function GlassHouseStudy(){return <ArchitectureForm roof={roof} canopy={canopy} promenade={promenade} columnProfile={columnProfile} footprint={footprint} wallMaterial={{color:'#d8e4e5',roughness:.18,clearcoat:.48,transmission:.45,opacity:.78}} roofMaterial={{color:'#b9d0d4',roughness:.16,clearcoat:.55,transmission:.38,opacity:.82}} frameMaterial={{color:'#343b40',metalness:.72,roughness:.23,clearcoat:.3}} rotation={[0,-.26,0]} scale={.88}/>}
