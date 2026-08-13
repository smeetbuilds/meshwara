import { SpatialForm } from '../geometry/ProductionForms'
const anchor=[{x:-.92,y:-.18,width:.25,height:.12,exponent:4.5},{x:-.52,y:-.02,width:.38,height:.18,exponent:4.3},{x:0,y:.08,width:.46,height:.22,exponent:4.1},{x:.52,y:-.02,width:.38,height:.18,exponent:4.3},{x:.92,y:-.18,width:.25,height:.12,exponent:4.5}]
const secondary=[{x:-.52,y:.42,z:-.16,width:.18,height:.26,exponent:3.4},{x:-.16,y:.6,z:-.12,width:.26,height:.36,exponent:3.2},{x:.16,y:.6,z:-.12,width:.26,height:.36,exponent:3.2},{x:.52,y:.42,z:-.16,width:.18,height:.26,exponent:3.4}]
const rail:Array<[number,number,number]>=[[-.82,.0,.44],[-.62,.34,.52],[-.3,.64,.48],[0,.78,.4],[.3,.64,.48],[.62,.34,.52],[.82,0,.44]]
const profile:Array<[number,number]>=[[0,-.28],[.22,-.24],[.34,-.1],[.32,.14],[.18,.28],[0,.3]]
const platform:Array<[number,number]>=[[-1.1,-.72],[1.1,-.72],[1,.66],[-1,.66]]
export default function SculptureGalleryCourtyard(){return <SpatialForm anchor={anchor} secondary={secondary} rail={rail} profile={profile} platform={platform} primaryMaterial={{color:'#d9d2c5',roughness:.64,clearcoat:.06}} secondaryMaterial={{color:'#8d8b83',roughness:.55,clearcoat:.08}} accentMaterial={{color:'#4b6772',metalness:.42,roughness:.3,clearcoat:.18}} rotation={[0,-.32,0]} scale={.9}/>}
