import { ArchitectureForm } from '../geometry/ProductionForms'
const roof=[{x:-.96,y:-.06,width:.18,height:.08,exponent:4.8},{x:-.5,y:.06,width:.31,height:.14,exponent:4.5},{x:0,y:.14,width:.4,height:.19,exponent:4.3},{x:.5,y:.06,width:.31,height:.14,exponent:4.5},{x:.96,y:-.06,width:.18,height:.08,exponent:4.8}]
const canopy=[{x:-.78,y:-.16,width:.12,height:.065,exponent:4.8},{x:-.34,y:-.04,width:.22,height:.11,exponent:4.5},{x:.1,y:-.02,width:.24,height:.12,exponent:4.4},{x:.72,y:-.14,width:.13,height:.07,exponent:4.8}]
const promenade:Array<[number,number,number]>=[[-.9,-.42,.38],[-.62,-.16,.46],[-.28,.06,.5],[.08,.12,.5],[.42,.0,.46],[.76,-.28,.4]]
const columnProfile:Array<[number,number]>=[[0,-.3],[.05,-.28],[.06,.24],[.045,.3],[0,.31]]
const footprint:Array<[number,number]>=[[-1.05,-.6],[1.05,-.6],[.96,.56],[-.96,.56]]
export default function UrbanBusPavilion(){return <ArchitectureForm roof={roof} canopy={canopy} promenade={promenade} columnProfile={columnProfile} footprint={footprint} wallMaterial={{color:'#d4d7d5',roughness:.44,clearcoat:.12}} roofMaterial={{color:'#8cb7bd',roughness:.3,clearcoat:.28}} frameMaterial={{color:'#343b40',metalness:.66,roughness:.25,clearcoat:.28}} rotation={[0,-.3,0]} scale={.9}/>}
