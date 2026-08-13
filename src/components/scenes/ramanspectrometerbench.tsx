import { LoftSurface, RevolvedSurface, ExtrudedProfile, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const body:LoftStation[]=[{x:-1.1,width:.48,height:.38,exponent:3.4},{x:-.55,width:.62,height:.5,exponent:4.2},{x:.55,width:.62,height:.5,exponent:4.2},{x:1.1,width:.46,height:.36,exponent:3.3}]
const head:LoftStation[]=[{x:-.5,width:.22,height:.22,exponent:2.7},{x:0,width:.32,height:.3,exponent:3},{x:.5,width:.22,height:.22,exponent:2.7}]
const optic:Array<[number,number]>=[[.04,-.08],[.16,-.07],[.21,0],[.16,.07],[.04,.08]]
const stage:Array<[number,number]>=[[-.42,-.3],[.42,-.3],[.46,.26],[.34,.38],[-.34,.38],[-.46,.26]]
const fiber:Array<[number,number,number]>=[[.8,.25,-.5],[1.15,.45,-.65],[1.4,.25,-.85],[1.22,-.05,-.92]]
const opticalRail:Array<[number,number,number]>=[[-.82,-.26,.45],[-.25,-.3,.54],[.4,-.3,.54],[.9,-.22,.46]]
const aperture:Array<[number,number]>=[[.025,-.06],[.1,-.055],[.14,0],[.1,.055],[.025,.06]]
export default function RamanSpectrometerBench(){return <group rotation={[.02,-.38,0]} position={[0,-.18,0]}>
 <LoftSurface stations={body}><meshPhysicalMaterial color="#d8d8d2" metalness={.18} roughness={.23}/></LoftSurface>
 <LoftSurface stations={head} position={[-.35,.56,.12]}><meshPhysicalMaterial color="#52595b" metalness={.55} roughness={.2}/></LoftSurface>
 <RevolvedSurface profile={optic} position={[-.02,.58,.46]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#173241" roughness={.05} clearcoat={1}/></RevolvedSurface>
 <ExtrudedProfile points={stage} depth={.07} position={[.5,-.08,.52]}><meshPhysicalMaterial color="#3b4244" metalness={.7} roughness={.18}/></ExtrudedProfile>
 <SplineTube points={fiber} radius={.025}><meshStandardMaterial color="#24292a" roughness={.58}/></SplineTube>
 <SplineTube points={opticalRail} radius={.022}><meshPhysicalMaterial color="#687173" metalness={.82} roughness={.18}/></SplineTube>
 {[-.45,.15,.7].map((x)=><RevolvedSurface key={x} profile={aperture} position={[x,-.18,.55]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#20282b" metalness={.6} roughness={.18}/></RevolvedSurface>)}
</group>}
