import { LoftSurface, SplineTube, ExtrudedProfile, RevolvedSurface, type LoftStation } from '../geometry/GeometryV2'
const console:LoftStation[]=[{x:-.85,width:.42,height:.48,exponent:3.2},{x:-.4,width:.55,height:.58,y:.03,exponent:4},{x:.4,width:.56,height:.58,y:.03,exponent:4},{x:.85,width:.4,height:.46,exponent:3.1}]
const probe:LoftStation[]=[{x:-.62,width:.12,height:.11,exponent:2.4},{x:-.28,width:.19,height:.17,exponent:2.8},{x:.2,width:.18,height:.16,exponent:2.8},{x:.55,width:.26,height:.12,y:-.02,exponent:2.5}]
const cable:Array<[number,number,number]>=[[.55,.08,.22],[.9,.2,.45],[1.15,.55,.18],[.95,.82,-.2],[.62,.7,-.42]]
const screen:Array<[number,number]>=[[-.48,-.3],[.48,-.3],[.52,.26],[.4,.4],[-.4,.4],[-.52,.26]]
const head:Array<[number,number]>=[[.06,-.08],[.18,-.07],[.24,0],[.18,.07],[.06,.08]]
const dial:Array<[number,number]>=[[.035,-.06],[.12,-.055],[.15,0],[.12,.055],[.035,.06]]
const cradle:Array<[number,number,number]>=[[.62,-.34,-.44],[.82,-.4,-.5],[1.02,-.32,-.46]]
export default function PortableUltrasoundUnit(){return <group rotation={[.04,-.4,0]} position={[0,-.12,0]}>
 <LoftSurface stations={console}><meshPhysicalMaterial color="#e2e2dc" metalness={.12} roughness={.24} clearcoat={.45}/></LoftSurface>
 <ExtrudedProfile points={screen} depth={.05} position={[-.05,.18,.54]}><meshPhysicalMaterial color="#132a34" roughness={.05} clearcoat={1}/></ExtrudedProfile>
 <LoftSurface stations={probe} position={[.95,.05,-.2]} rotation={[0,.35,-.22]}><meshPhysicalMaterial color="#d4d5d0" roughness={.28}/></LoftSurface>
 <SplineTube points={cable} radius={.025}><meshStandardMaterial color="#313536" roughness={.6}/></SplineTube>
 <RevolvedSurface profile={head} position={[1.46,-.04,-.02]} rotation={[0,0,Math.PI/2]}><meshStandardMaterial color="#8f9393" roughness={.34}/></RevolvedSurface>
 {[-.35,0,.35].map((x)=><RevolvedSurface key={x} profile={dial} position={[x,-.3,.54]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#758083" metalness={.5} roughness={.23}/></RevolvedSurface>)}
 <SplineTube points={cradle} radius={.03}><meshPhysicalMaterial color="#8f9696" metalness={.55} roughness={.23}/></SplineTube>
</group>}
