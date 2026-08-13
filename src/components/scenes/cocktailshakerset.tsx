import { LoftSurface, RevolvedSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const shaker:Array<[number,number]>=[[.21,-.6],[.31,-.48],[.34,.22],[.29,.48],[.19,.62]]
const cap:Array<[number,number]>=[[.12,-.12],[.22,-.08],[.25,.08],[.16,.18]]
const jigger:Array<[number,number]>=[[.1,-.42],[.22,-.18],[.09,-.03],[.08,.03],[.2,.18],[.09,.42]]
const tray:LoftStation[]=[{x:-.92,width:.4,height:.06,exponent:4},{x:0,width:.48,height:.08,exponent:4.6},{x:.92,width:.38,height:.055,exponent:4}]
export default function CocktailShakerSet(){return <group position={[0,-.35,0]} rotation={[0,-.24,0]}>
 <LoftSurface stations={tray} position={[0,-.58,0]}><meshPhysicalMaterial color="#333638" metalness={.7} roughness={.22}/></LoftSurface>
 <RevolvedSurface profile={shaker} position={[-.28,.04,0]}><meshPhysicalMaterial color="#b6bab8" metalness={.98} roughness={.13} clearcoat={.35}/></RevolvedSurface>
 <RevolvedSurface profile={cap} position={[-.28,.72,0]}><meshPhysicalMaterial color="#d0c9b5" metalness={.82} roughness={.17}/></RevolvedSurface>
 <RevolvedSurface profile={jigger} position={[.48,-.04,.08]}><meshPhysicalMaterial color="#8e9290" metalness={.96} roughness={.14}/></RevolvedSurface>
 <SplineTube points={[[.55,.38,.05],[.74,.58,.04],[.88,.42,.06],[.75,.2,.08]]} radius={.024}><meshPhysicalMaterial color="#a5a8a6" metalness={.96} roughness={.14}/></SplineTube>
 <RevolvedSurface profile={[[.08,-.08],[.18,-.05],[.2,.05],[.08,.08]]} position={[.72,.48,.05]}><meshStandardMaterial color="#8a5d45" roughness={.52}/></RevolvedSurface>
 <SplineTube points={[[.05,-.46,.05],[.2,-.28,.08],[.28,-.12,.06]]} radius={.018}><meshStandardMaterial color="#c5a76a" metalness={.72} roughness={.24}/></SplineTube>

 <RevolvedSurface profile={[[.04,-.03],[.1,0],[.04,.03]]} position={[-.58,-.42,.12]}><meshPhysicalMaterial color="#85694c" metalness={.65} roughness={.25}/></RevolvedSurface>
 <SplineTube points={[[-.5,-.46,.04],[-.2,-.4,.08],[.04,-.42,.05]]} radius={.012}><meshStandardMaterial color="#d1b47a" metalness={.6} roughness={.24}/></SplineTube>
</group>}
