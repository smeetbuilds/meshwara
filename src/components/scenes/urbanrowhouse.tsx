import { ArchitectureForm } from '../geometry/ProductionForms'
const roof=[{x:-1,y:-.02,width:.2,height:.1,exponent:4.8},{x:-.6,y:.04,width:.3,height:.14,exponent:4.7},{x:-.2,y:.08,width:.34,height:.18,exponent:4.6},{x:.2,y:.08,width:.34,height:.18,exponent:4.6},{x:.6,y:.04,width:.3,height:.14,exponent:4.7},{x:1,y:-.02,width:.2,height:.1,exponent:4.8}]
const canopy=[{x:-.8,y:-.18,width:.13,height:.07,exponent:4.8},{x:-.38,y:-.08,width:.22,height:.11,exponent:4.6},{x:.08,y:-.06,width:.24,height:.12,exponent:4.6},{x:.62,y:-.16,width:.15,height:.08,exponent:4.8}]
const promenade:Array<[number,number,number]>=[[-.94,-.42,.36],[-.64,-.18,.42],[-.3,.02,.44],[.06,.06,.44],[.42,-.04,.42],[.76,-.28,.38]]
const columnProfile:Array<[number,number]>=[[0,-.28],[.06,-.26],[.07,.22],[.055,.28],[0,.29]]
const footprint:Array<[number,number]>=[[-1.08,-.62],[1.08,-.62],[1.02,.6],[-1.02,.6]]
export default function UrbanRowHouse(){return <ArchitectureForm roof={roof} canopy={canopy} promenade={promenade} columnProfile={columnProfile} footprint={footprint} wallMaterial={{color:'#a76c59',roughness:.58,clearcoat:.07}} roofMaterial={{color:'#6e5a51',roughness:.5,clearcoat:.08}} frameMaterial={{color:'#2e3437',metalness:.42,roughness:.3,clearcoat:.2}} rotation={[0,-.3,0]} scale={.88}/>}
