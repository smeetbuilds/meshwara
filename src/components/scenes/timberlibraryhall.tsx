import { ArchitectureForm } from '../geometry/ProductionForms'
const roof=[{x:-1,y:-.04,width:.22,height:.1,exponent:4.4},{x:-.58,y:.12,width:.34,height:.2,exponent:4},{x:0,y:.34,width:.45,height:.34,exponent:3.6},{x:.58,y:.12,width:.34,height:.2,exponent:4},{x:1,y:-.04,width:.22,height:.1,exponent:4.4}]
const canopy=[{x:-.76,y:-.18,width:.14,height:.08,exponent:4.2},{x:-.3,y:-.04,width:.25,height:.13,exponent:4},{x:.2,y:-.02,width:.28,height:.14,exponent:4},{x:.7,y:-.16,width:.15,height:.08,exponent:4.2}]
const promenade:Array<[number,number,number]>=[[-.9,-.44,.42],[-.62,-.18,.5],[-.28,.06,.56],[0,.16,.58],[.28,.06,.56],[.62,-.18,.5],[.9,-.44,.42]]
const columnProfile:Array<[number,number]>=[[0,-.32],[.08,-.3],[.095,.24],[.07,.32],[0,.34]]
const footprint:Array<[number,number]>=[[-1.08,-.64],[1.08,-.64],[.98,.62],[-.98,.62]]
export default function TimberLibraryHall(){return <ArchitectureForm roof={roof} canopy={canopy} promenade={promenade} columnProfile={columnProfile} footprint={footprint} wallMaterial={{color:'#a77a4f',roughness:.56,clearcoat:.08}} roofMaterial={{color:'#79583e',roughness:.5,clearcoat:.1}} frameMaterial={{color:'#d0b480',metalness:.08,roughness:.42,clearcoat:.1}} rotation={[0,-.3,0]} scale={.88}/>}
