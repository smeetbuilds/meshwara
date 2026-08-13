import { LoftSurface, RevolvedSurface, ExtrudedProfile, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const body: LoftStation[]=[{x:-1.05,width:.68,height:.72,exponent:4.4},{x:-.58,width:.76,height:.78,exponent:5},{x:.25,width:.78,height:.8,exponent:5},{x:.85,width:.65,height:.73,exponent:4.1},{x:1.08,width:.45,height:.6,exponent:3.2}]
const finder: LoftStation[]=[{x:-.42,width:.42,height:.18,y:.64,exponent:2.8},{x:-.08,width:.55,height:.31,y:.75,exponent:3.2},{x:.35,width:.46,height:.23,y:.68,exponent:2.9}]
const lens:Array<[number,number]>=[[.26,-.72],[.48,-.68],[.58,-.52],[.62,-.18],[.6,.18],[.54,.48],[.38,.68],[.24,.72]]
const grip:Array<[number,number,number]>=[[-.95,.5,-.64],[-1.14,.18,-.7],[-1.08,-.28,-.69],[-.86,-.58,-.6]]
const screen:Array<[number,number]>=[[-.46,-.32],[.46,-.32],[.5,.28],[.38,.4],[-.38,.4],[-.5,.28]]
export default function MediumFormatCamera(){return <group rotation={[.03,-.38,0]} position={[0,-.14,0]}>
 <LoftSurface stations={body} castShadow><meshPhysicalMaterial color="#3b3c3c" metalness={.5} roughness={.22} clearcoat={.72}/></LoftSurface>
 <LoftSurface stations={finder}><meshPhysicalMaterial color="#2a2d2e" metalness={.55} roughness={.2}/></LoftSurface>
 <RevolvedSurface profile={lens} position={[.45,.03,.78]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#24292b" metalness={.8} roughness={.16}/></RevolvedSurface>
 <RevolvedSurface profile={[[.1,-.05],[.28,-.04],[.31,0],[.28,.04],[.1,.05]]} position={[.45,.03,1.48]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#142835" roughness={.05} clearcoat={1}/></RevolvedSurface>
 <SplineTube points={grip} radius={.055}><meshStandardMaterial color="#171919" roughness={.5}/></SplineTube>
 <ExtrudedProfile points={screen} depth={.05} position={[-.05,.02,-.78]}><meshPhysicalMaterial color="#142126" roughness={.08} clearcoat={1}/></ExtrudedProfile>
</group>}
