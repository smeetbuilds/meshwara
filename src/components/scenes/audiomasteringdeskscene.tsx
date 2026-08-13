import { SpatialForm } from '../geometry/ProductionForms'
const anchor=[{x:-.92,y:-.1,width:.28,height:.15,exponent:4.2},{x:-.5,y:.04,width:.42,height:.2,exponent:4.2},{x:0,y:.12,width:.5,height:.24,exponent:4},{x:.5,y:.04,width:.42,height:.2,exponent:4.2},{x:.92,y:-.1,width:.28,height:.15,exponent:4.2}]
const secondary=[{x:-.65,y:.45,z:-.12,width:.18,height:.27,exponent:3.8},{x:-.32,y:.56,z:-.12,width:.22,height:.34,exponent:3.8},{x:0,y:.6,z:-.12,width:.24,height:.36,exponent:3.8},{x:.32,y:.56,z:-.12,width:.22,height:.34,exponent:3.8},{x:.65,y:.45,z:-.12,width:.18,height:.27,exponent:3.8}]
const rail:Array<[number,number,number]>=[[-.86,.12,.36],[-.52,.34,.42],[-.18,.42,.46],[.18,.42,.46],[.52,.34,.42],[.86,.12,.36]]
const profile:Array<[number,number]>=[[0,-.22],[.24,-.2],[.31,-.08],[.31,.12],[.22,.24],[0,.26]]
const platform:Array<[number,number]>=[[-1.08,-.68],[1.08,-.68],[.96,.62],[-.96,.62]]
export default function AudioMasteringDeskScene(){return <SpatialForm anchor={anchor} secondary={secondary} rail={rail} profile={profile} platform={platform} primaryMaterial={{color:'#5d4638',roughness:.45,clearcoat:.15}} secondaryMaterial={{color:'#252a2e',roughness:.34,clearcoat:.26}} accentMaterial={{color:'#d7b66b',metalness:.72,roughness:.24,clearcoat:.32}} rotation={[0,-.3,0]} scale={.9}/>}
