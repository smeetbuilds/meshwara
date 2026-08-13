import { SpatialForm } from '../geometry/ProductionForms'
const anchor=[{x:-.88,y:-.18,width:.22,height:.11,exponent:4.4},{x:-.48,y:-.04,width:.36,height:.18,exponent:4.2},{x:0,y:.02,width:.44,height:.22,exponent:4},{x:.48,y:-.04,width:.36,height:.18,exponent:4.2},{x:.88,y:-.18,width:.22,height:.11,exponent:4.4}]
const secondary=[{x:-.5,y:.5,z:-.08,width:.15,height:.24,exponent:3.4},{x:-.16,y:.68,z:-.05,width:.24,height:.34,exponent:3.5},{x:.16,y:.68,z:-.05,width:.24,height:.34,exponent:3.5},{x:.5,y:.5,z:-.08,width:.15,height:.24,exponent:3.4}]
const rail:Array<[number,number,number]>=[[-.74,.2,.36],[-.56,.58,.44],[-.28,.9,.38],[0,1.02,.3],[.28,.9,.38],[.56,.58,.44],[.74,.2,.36]]
const profile:Array<[number,number]>=[[0,-.24],[.22,-.22],[.32,-.08],[.31,.12],[.2,.24],[0,.27]]
const platform:Array<[number,number]>=[[-1.04,-.68],[1.04,-.68],[.96,.62],[-.96,.62]]
export default function ContemporarySurgicalSuite(){return <SpatialForm anchor={anchor} secondary={secondary} rail={rail} profile={profile} platform={platform} primaryMaterial={{color:'#dfe5e3',roughness:.46,clearcoat:.18}} secondaryMaterial={{color:'#8fb9b7',roughness:.34,clearcoat:.25}} accentMaterial={{color:'#d8c56b',metalness:.46,roughness:.25,clearcoat:.3}} rotation={[0,-.28,0]} scale={.9}/>}
