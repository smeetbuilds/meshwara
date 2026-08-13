import { LoftSurface, RevolvedSurface, SplineTube, ExtrudedProfile, type LoftStation } from '../geometry/GeometryV2'
const body:LoftStation[]=[{x:-1.08,width:.45,height:.58,exponent:3.5},{x:-.6,width:.55,height:.68,exponent:4.3},{x:.3,width:.56,height:.7,exponent:4.5},{x:.9,width:.47,height:.62,exponent:3.6},{x:1.08,width:.34,height:.5,exponent:3}]
const mic:Array<[number,number]>=[[.08,-.34],[.22,-.31],[.31,-.22],[.34,0],[.31,.22],[.22,.31],[.08,.34]]
const wheel:Array<[number,number]>=[[.04,-.07],[.18,-.065],[.21,0],[.18,.065],[.04,.07]]
const strap:Array<[number,number,number]>=[[-.92,.52,-.38],[-1.2,.78,-.15],[-1.18,.32,.4],[-.92,.05,.52]]
const screen:Array<[number,number]>=[[-.42,-.28],[.42,-.28],[.47,.22],[.36,.34],[-.36,.34],[-.47,.22]]
const inputJack:Array<[number,number]>=[[.035,-.05],[.1,-.045],[.13,0],[.1,.045],[.035,.05]]
const sideRail:Array<[number,number,number]>=[[-.9,-.45,-.5],[-.3,-.56,-.58],[.45,-.54,-.57],[.92,-.38,-.48]]
export default function FieldAudioRecorder(){return <group rotation={[.06,-.4,0]} position={[0,-.1,0]}>
 <LoftSurface stations={body} castShadow><meshPhysicalMaterial color="#25292b" metalness={.5} roughness={.27}/></LoftSurface>
 <RevolvedSurface profile={mic} position={[-.55,.78,.15]} rotation={[0,0,.55]}><meshPhysicalMaterial color="#7c8588" metalness={.92} roughness={.2}/></RevolvedSurface>
 <RevolvedSurface profile={mic} position={[.3,.82,.18]} rotation={[0,0,-.48]}><meshPhysicalMaterial color="#7c8588" metalness={.92} roughness={.2}/></RevolvedSurface>
 <ExtrudedProfile points={screen} depth={.045} position={[-.05,.22,.58]}><meshPhysicalMaterial color="#16343c" roughness={.06} clearcoat={1}/></ExtrudedProfile>
 <RevolvedSurface profile={wheel} position={[.64,-.1,.57]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#acaeaa" metalness={.8} roughness={.22}/></RevolvedSurface>
 <SplineTube points={strap} radius={.03}><meshStandardMaterial color="#17191a" roughness={.58}/></SplineTube>
 <SplineTube points={sideRail} radius={.018}><meshPhysicalMaterial color="#596164" metalness={.7} roughness={.2}/></SplineTube>
 {[-.42,0,.42].map((x)=><RevolvedSurface key={x} profile={inputJack} position={[x,-.48,.55]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#3f484b" metalness={.75} roughness={.2}/></RevolvedSurface>)}
</group>}
