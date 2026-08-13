import { LoftSurface, RevolvedSurface, ExtrudedProfile, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const base:LoftStation[]=[{x:-1.0,width:.55,height:.12,exponent:4},{x:-.45,width:.68,height:.18,exponent:4.8},{x:.45,width:.68,height:.18,exponent:4.8},{x:1.0,width:.52,height:.12,exponent:4}]
const hood:LoftStation[]=[{x:-.72,width:.46,height:.32,y:.42,exponent:3.2},{x:0,width:.55,height:.45,y:.62,exponent:3.6},{x:.72,width:.46,height:.32,y:.42,exponent:3.2}]
const pan:Array<[number,number]>=[[.05,-.05],[.28,-.045],[.34,0],[.28,.045],[.05,.05]]
const display:Array<[number,number]>=[[-.38,-.24],[.38,-.24],[.43,.2],[.32,.32],[-.32,.32],[-.43,.2]]
const handle:Array<[number,number,number]>=[[-.55,.38,.5],[-.7,.68,.52],[-.55,1.0,.48]]
export default function AnalyticalBalance(){return <group rotation={[0,-.36,0]} position={[0,-.4,0]}>
 <LoftSurface stations={base}><meshPhysicalMaterial color="#deded8" metalness={.12} roughness={.22}/></LoftSurface>
 <LoftSurface stations={hood}><meshPhysicalMaterial color="#a9c3cb" roughness={.04} transmission={.58} transparent opacity={.46} clearcoat={1}/></LoftSurface>
 <RevolvedSurface profile={pan} position={[0,.28,0]}><meshPhysicalMaterial color="#9aa1a2" metalness={.88} roughness={.18}/></RevolvedSurface>
 <ExtrudedProfile points={display} depth={.05} position={[.55,-.12,.58]}><meshPhysicalMaterial color="#183039" roughness={.05} clearcoat={1}/></ExtrudedProfile>
 <SplineTube points={handle} radius={.022}><meshPhysicalMaterial color="#8c9293" metalness={.75} roughness={.2}/></SplineTube>
</group>}
