import { ArchitectureForm } from '../geometry/ProductionForms'
const roof=[{x:-1.04,y:-.06,width:.22,height:.09,exponent:4.8},{x:-.6,y:.04,width:.36,height:.15,exponent:4.5},{x:0,y:.16,width:.48,height:.23,exponent:4.2},{x:.6,y:.04,width:.36,height:.15,exponent:4.5},{x:1.04,y:-.06,width:.22,height:.09,exponent:4.8}]
const canopy=[{x:-.86,y:-.2,width:.14,height:.07,exponent:4.7},{x:-.36,y:-.06,width:.26,height:.12,exponent:4.4},{x:.18,y:-.02,width:.3,height:.14,exponent:4.3},{x:.78,y:-.18,width:.16,height:.08,exponent:4.7}]
const promenade:Array<[number,number,number]>=[[-.98,-.4,.46],[-.68,-.1,.54],[-.34,.14,.58],[0,.24,.6],[.34,.14,.58],[.68,-.1,.54],[.98,-.4,.46]]
const columnProfile:Array<[number,number]>=[[0,-.32],[.07,-.3],[.08,.26],[.06,.32],[0,.33]]
const footprint:Array<[number,number]>=[[-1.12,-.64],[1.12,-.64],[.98,.66],[-.98,.66]]
export default function MuseumWingStudy(){return <ArchitectureForm roof={roof} canopy={canopy} promenade={promenade} columnProfile={columnProfile} footprint={footprint} wallMaterial={{color:'#d8d6d0',roughness:.6,clearcoat:.05}} roofMaterial={{color:'#8e9799',metalness:.22,roughness:.36,clearcoat:.18}} frameMaterial={{color:'#404b50',metalness:.62,roughness:.26,clearcoat:.24}} rotation={[0,-.28,0]} scale={.88}/>}
