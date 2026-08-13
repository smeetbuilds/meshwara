import { ArchitectureForm } from '../geometry/ProductionForms'
const roof=[{x:-1,y:-.04,width:.18,height:.08,exponent:4.7},{x:-.58,y:.08,width:.3,height:.16,exponent:4.3},{x:-.04,y:.22,width:.42,height:.24,exponent:4},{x:.5,y:.12,width:.34,height:.18,exponent:4.2},{x:.98,y:-.02,width:.2,height:.09,exponent:4.6}]
const canopy=[{x:-.78,y:-.2,width:.13,height:.07,exponent:4.6},{x:-.34,y:-.06,width:.23,height:.12,exponent:4.3},{x:.12,y:-.02,width:.26,height:.13,exponent:4.2},{x:.7,y:-.16,width:.15,height:.08,exponent:4.6}]
const promenade:Array<[number,number,number]>=[[-.94,-.44,.4],[-.68,-.18,.48],[-.36,.04,.54],[-.02,.14,.56],[.34,.02,.52],[.7,-.26,.44]]
const columnProfile:Array<[number,number]>=[[0,-.32],[.06,-.3],[.075,.26],[.055,.32],[0,.34]]
const footprint:Array<[number,number]>=[[-1.1,-.62],[.98,-.62],[1.08,.46],[.34,.62],[-.84,.58]]
export default function CoastalObservationShelter(){return <ArchitectureForm roof={roof} canopy={canopy} promenade={promenade} columnProfile={columnProfile} footprint={footprint} wallMaterial={{color:'#c3bba9',roughness:.6,clearcoat:.06}} roofMaterial={{color:'#6d858a',metalness:.24,roughness:.34,clearcoat:.18}} frameMaterial={{color:'#3b474c',metalness:.56,roughness:.27,clearcoat:.22}} rotation={[0,-.36,0]} scale={.88}/>}
