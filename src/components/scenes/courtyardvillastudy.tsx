import { ArchitectureForm } from '../geometry/ProductionForms'
const roof=[{x:-.96,y:0,width:.26,height:.12,exponent:4.6},{x:-.52,y:.12,width:.38,height:.2,exponent:4.2},{x:0,y:.2,width:.46,height:.28,exponent:4},{x:.52,y:.12,width:.38,height:.2,exponent:4.2},{x:.96,y:0,width:.26,height:.12,exponent:4.6}]
const canopy=[{x:-.72,y:-.16,width:.16,height:.08,exponent:4.4},{x:-.3,y:-.08,width:.28,height:.12,exponent:4.2},{x:.18,y:-.04,width:.32,height:.14,exponent:4.1},{x:.68,y:-.14,width:.18,height:.09,exponent:4.4}]
const promenade:Array<[number,number,number]>=[[-.92,-.42,.44],[-.62,-.2,.54],[-.3,-.02,.58],[0,.08,.6],[.32,-.02,.58],[.64,-.22,.52],[.92,-.42,.42]]
const columnProfile:Array<[number,number]>=[[0,-.26],[.075,-.24],[.09,.18],[.065,.26],[0,.28]]
const footprint:Array<[number,number]>=[[-1.08,-.62],[1.08,-.62],[.92,.66],[.18,.52],[-.18,.52],[-.92,.66]]
export default function CourtyardVillaStudy(){return <ArchitectureForm roof={roof} canopy={canopy} promenade={promenade} columnProfile={columnProfile} footprint={footprint} wallMaterial={{color:'#d8c9b2',roughness:.62,clearcoat:.06}} roofMaterial={{color:'#8f7258',roughness:.5,clearcoat:.1}} frameMaterial={{color:'#403b36',metalness:.28,roughness:.34,clearcoat:.16}} rotation={[0,-.32,0]} scale={.88}/>}
