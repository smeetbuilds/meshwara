import { SpatialForm } from '../geometry/ProductionForms'
const anchor=[{x:-.88,y:-.14,width:.22,height:.12,exponent:4.2},{x:-.48,y:.0,width:.36,height:.18,exponent:4},{x:0,y:.1,width:.44,height:.23,exponent:3.8},{x:.48,y:.0,width:.36,height:.18,exponent:4},{x:.88,y:-.14,width:.22,height:.12,exponent:4.2}]
const secondary=[{x:-.54,y:.4,z:-.14,width:.15,height:.24,exponent:3.5},{x:-.18,y:.62,z:-.1,width:.23,height:.36,exponent:3.4},{x:.18,y:.62,z:-.1,width:.23,height:.36,exponent:3.4},{x:.54,y:.4,z:-.14,width:.15,height:.24,exponent:3.5}]
const rail:Array<[number,number,number]>=[[-.82,-.04,.44],[-.58,.3,.5],[-.24,.54,.47],[0,.64,.42],[.24,.54,.47],[.58,.3,.5],[.82,-.04,.44]]
const profile:Array<[number,number]>=[[0,-.24],[.24,-.22],[.31,-.08],[.31,.12],[.21,.24],[0,.26]]
const platform:Array<[number,number]>=[[-1.08,-.7],[1.08,-.7],[1,.62],[-1,.62]]
export default function RoboticsAssemblyCell(){return <SpatialForm anchor={anchor} secondary={secondary} rail={rail} profile={profile} platform={platform} primaryMaterial={{color:'#d4d7d5',roughness:.42,clearcoat:.15}} secondaryMaterial={{color:'#2e353a',metalness:.28,roughness:.33,clearcoat:.2}} accentMaterial={{color:'#e7a343',metalness:.32,roughness:.24,clearcoat:.28}} rotation={[0,-.32,0]} scale={.9}/>}
