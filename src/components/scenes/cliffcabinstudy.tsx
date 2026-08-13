import { ArchitectureForm } from '../geometry/ProductionForms'
const roof=[{x:-.92,y:-.02,width:.22,height:.1,exponent:4.5},{x:-.48,y:.1,width:.34,height:.17,exponent:4.2},{x:0,y:.28,width:.43,height:.28,exponent:3.8},{x:.48,y:.1,width:.34,height:.17,exponent:4.2},{x:.92,y:-.02,width:.22,height:.1,exponent:4.5}]
const canopy=[{x:-.68,y:-.2,width:.14,height:.07,exponent:4.3},{x:-.28,y:-.08,width:.24,height:.12,exponent:4},{x:.12,y:-.02,width:.28,height:.14,exponent:4},{x:.58,y:-.16,width:.16,height:.08,exponent:4.3}]
const promenade:Array<[number,number,number]>=[[-.86,-.48,.5],[-.58,-.2,.58],[-.3,.02,.62],[.04,.1,.64],[.38,-.06,.58],[.72,-.32,.5]]
const columnProfile:Array<[number,number]>=[[0,-.24],[.07,-.22],[.08,.2],[.06,.25],[0,.26]]
const footprint:Array<[number,number]>=[[-1.05,-.58],[.92,-.58],[1.08,.46],[.18,.64],[-.72,.58]]
export default function CliffCabinStudy(){return <ArchitectureForm roof={roof} canopy={canopy} promenade={promenade} columnProfile={columnProfile} footprint={footprint} wallMaterial={{color:'#80634a',roughness:.58,clearcoat:.07}} roofMaterial={{color:'#3b4243',roughness:.46,clearcoat:.12}} frameMaterial={{color:'#b8a47b',metalness:.22,roughness:.36,clearcoat:.15}} rotation={[0,-.36,0]} scale={.9}/>}
