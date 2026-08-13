import { ArchitectureForm } from '../geometry/ProductionForms'
const roof=[{x:-.9,y:-.08,width:.16,height:.08,exponent:4.6},{x:-.46,y:.08,width:.28,height:.15,exponent:4.2},{x:0,y:.26,width:.38,height:.28,exponent:3.8},{x:.46,y:.08,width:.28,height:.15,exponent:4.2},{x:.9,y:-.08,width:.16,height:.08,exponent:4.6}]
const canopy=[{x:-.7,y:-.18,width:.12,height:.07,exponent:4.5},{x:-.26,y:-.02,width:.22,height:.12,exponent:4.2},{x:.2,y:.02,width:.24,height:.13,exponent:4.1},{x:.66,y:-.15,width:.13,height:.07,exponent:4.5}]
const promenade:Array<[number,number,number]>=[[-.9,-.5,.32],[-.62,-.2,.46],[-.34,.12,.56],[-.08,.44,.62],[.18,.72,.58],[.46,.9,.46],[.72,.98,.3]]
const columnProfile:Array<[number,number]>=[[0,-.38],[.07,-.36],[.085,.3],[.06,.38],[0,.4]]
const footprint:Array<[number,number]>=[[-1.06,-.62],[1.02,-.62],[.88,.58],[.12,.7],[-.72,.58]]
export default function FootbridgeLookoutTower(){return <ArchitectureForm roof={roof} canopy={canopy} promenade={promenade} columnProfile={columnProfile} footprint={footprint} wallMaterial={{color:'#a89b86',roughness:.54,clearcoat:.08}} roofMaterial={{color:'#4a555a',metalness:.34,roughness:.32,clearcoat:.2}} frameMaterial={{color:'#2d3539',metalness:.72,roughness:.25,clearcoat:.24}} rotation={[0,-.34,0]} scale={.86}/>}
