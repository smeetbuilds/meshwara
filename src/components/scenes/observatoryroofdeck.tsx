import { SpatialForm } from '../geometry/ProductionForms'
const anchor=[{x:-.86,y:-.16,width:.23,height:.12,exponent:4.3},{x:-.46,y:-.02,width:.35,height:.18,exponent:4.1},{x:0,y:.06,width:.43,height:.22,exponent:4},{x:.46,y:-.02,width:.35,height:.18,exponent:4.1},{x:.86,y:-.16,width:.23,height:.12,exponent:4.3}]
const secondary=[{x:-.4,y:.4,z:-.08,width:.16,height:.24,exponent:3.4},{x:-.12,y:.66,z:-.04,width:.24,height:.38,exponent:3.2},{x:.18,y:.68,z:-.04,width:.25,height:.4,exponent:3.2},{x:.48,y:.42,z:-.08,width:.17,height:.25,exponent:3.4}]
const rail:Array<[number,number,number]>=[[-.9,-.1,.4],[-.66,.18,.5],[-.32,.36,.54],[0,.42,.56],[.32,.36,.54],[.66,.18,.5],[.9,-.1,.4]]
const profile:Array<[number,number]>=[[0,-.34],[.2,-.32],[.28,-.16],[.28,.12],[.2,.32],[0,.35]]
const platform:Array<[number,number]>=[[-1.08,-.74],[1.08,-.74],[1.02,.64],[-1.02,.64]]
export default function ObservatoryRoofDeck(){return <SpatialForm anchor={anchor} secondary={secondary} rail={rail} profile={profile} platform={platform} primaryMaterial={{color:'#59646d',metalness:.2,roughness:.38,clearcoat:.2}} secondaryMaterial={{color:'#cfd2d0',roughness:.46,clearcoat:.13}} accentMaterial={{color:'#86b6d8',metalness:.24,roughness:.22,clearcoat:.38}} rotation={[0,-.28,0]} scale={.9}/>}
