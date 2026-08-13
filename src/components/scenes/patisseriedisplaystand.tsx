import { SpatialForm } from '../geometry/ProductionForms'

const anchor=[
  {x:-0.82,y:-0.12,width:0.42,height:0.18,exponent:4.4},{x:-0.46,y:0.02,width:0.48,height:0.24,exponent:4.2},
  {x:0,y:0.08,width:0.52,height:0.28,exponent:4},{x:0.46,y:0.02,width:0.48,height:0.24,exponent:4.2},{x:0.82,y:-0.12,width:0.42,height:0.18,exponent:4.4},
]
const secondary=[
  {x:-0.7,y:0.48,z:-0.04,width:0.18,height:0.1,exponent:3.2},{x:-0.34,y:0.58,z:-0.04,width:0.22,height:0.13,exponent:3},
  {x:0,y:0.62,z:-0.04,width:0.24,height:0.14,exponent:3},{x:0.34,y:0.58,z:-0.04,width:0.22,height:0.13,exponent:3},{x:0.7,y:0.48,z:-0.04,width:0.18,height:0.1,exponent:3.2},
]
const rail:Array<[number,number,number]>=[[-0.88,0.28,0.28],[-0.58,0.62,0.32],[0,0.74,0.34],[0.58,0.62,0.32],[0.88,0.28,0.28]]
const profile:Array<[number,number]>=[[0,-0.28],[0.34,-0.24],[0.39,-0.12],[0.4,0.04],[0.3,0.12],[0.18,0.17],[0,0.18]]
const platform:Array<[number,number]>=[[-1,-0.64],[1,-0.64],[0.94,0.56],[-0.94,0.56]]
export default function PatisserieDisplayStand(){return <SpatialForm anchor={anchor} secondary={secondary} rail={rail} profile={profile} platform={platform} primaryMaterial={{color:'#c9b08f',roughness:.34,clearcoat:.22}} secondaryMaterial={{color:'#f0e4cf',roughness:.5,clearcoat:.12}} accentMaterial={{color:'#8c6a4c',metalness:.66,roughness:.23,clearcoat:.3}} rotation={[0,-.32,0]} scale={.92}/>}
