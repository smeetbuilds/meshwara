import { SpatialForm } from '../geometry/ProductionForms'
const anchor=[{x:-.84,y:-.08,width:.3,height:.12,exponent:4.5},{x:-.42,y:.02,width:.42,height:.18,exponent:4.3},{x:0,y:.06,width:.48,height:.2,exponent:4.2},{x:.42,y:.02,width:.42,height:.18,exponent:4.3},{x:.84,y:-.08,width:.3,height:.12,exponent:4.5}]
const secondary=[{x:-.58,y:.38,z:-.18,width:.16,height:.24,exponent:3.8},{x:-.2,y:.58,z:-.12,width:.24,height:.36,exponent:3.6},{x:.2,y:.58,z:-.12,width:.24,height:.36,exponent:3.6},{x:.58,y:.38,z:-.18,width:.16,height:.24,exponent:3.8}]
const rail:Array<[number,number,number]>=[[-.82,-.12,.42],[-.68,.42,.5],[-.48,.86,.42],[-.18,1.1,.3],[.18,1.1,.3],[.48,.86,.42],[.68,.42,.5],[.82,-.12,.42]]
const profile:Array<[number,number]>=[[0,-.25],[.28,-.23],[.34,-.1],[.32,.12],[.2,.26],[0,.28]]
const platform:Array<[number,number]>=[[-1.02,-.72],[1.02,-.72],[1.02,.58],[-1.02,.58]]
export default function ProductPhotographyStudio(){return <SpatialForm anchor={anchor} secondary={secondary} rail={rail} profile={profile} platform={platform} primaryMaterial={{color:'#ece9e1',roughness:.6,clearcoat:.08}} secondaryMaterial={{color:'#d7d9da',roughness:.34,clearcoat:.2}} accentMaterial={{color:'#22272b',metalness:.45,roughness:.28,clearcoat:.24}} rotation={[0,-.18,0]} scale={.9}/>}
