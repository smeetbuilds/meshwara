import { SpatialForm } from '../geometry/ProductionForms'
const anchor=[{x:-.9,y:-.12,width:.34,height:.2,exponent:3.8},{x:-.48,y:.02,width:.46,height:.28,exponent:3.6},{x:0,y:.08,width:.52,height:.32,exponent:3.5},{x:.48,y:.02,width:.46,height:.28,exponent:3.6},{x:.9,y:-.12,width:.34,height:.2,exponent:3.8}]
const secondary=[{x:-.54,y:.44,z:-.13,width:.16,height:.26,exponent:3.4},{x:-.18,y:.56,z:-.1,width:.23,height:.33,exponent:3.3},{x:.18,y:.56,z:-.1,width:.23,height:.33,exponent:3.3},{x:.54,y:.44,z:-.13,width:.16,height:.26,exponent:3.4}]
const rail:Array<[number,number,number]>=[[-.84,-.1,.42],[-.6,.22,.52],[-.3,.38,.5],[0,.42,.48],[.3,.38,.5],[.6,.22,.52],[.84,-.1,.42]]
const profile:Array<[number,number]>=[[0,-.16],[.3,-.14],[.34,-.04],[.32,.08],[.18,.14],[0,.15]]
const platform:Array<[number,number]>=[[-1.08,-.7],[1.08,-.7],[.98,.62],[-.98,.62]]
export default function MinimalLivingRoomScene(){return <SpatialForm anchor={anchor} secondary={secondary} rail={rail} profile={profile} platform={platform} primaryMaterial={{color:'#c9b59a',roughness:.58,clearcoat:.08}} secondaryMaterial={{color:'#ede7db',roughness:.52,clearcoat:.1}} accentMaterial={{color:'#6e5948',metalness:.14,roughness:.42,clearcoat:.14}} rotation={[0,-.3,0]} scale={.9}/>}
