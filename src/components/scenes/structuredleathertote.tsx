import { ExtrudedProfile, LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const body:LoftStation[]=[{x:-.72,width:.22,height:.58,y:-.05,exponent:3.5},{x:-.42,width:.3,height:.68,exponent:4},{x:.42,width:.3,height:.68,exponent:4},{x:.72,width:.22,height:.58,y:-.05,exponent:3.5}]
const gusset:LoftStation[]=[{x:-.62,width:.12,height:.5,exponent:3},{x:0,width:.18,height:.64,exponent:3.4},{x:.62,width:.12,height:.5,exponent:3}]
const pocket:Array<[number,number]>=[[-.42,-.26],[.42,-.26],[.38,.22],[-.38,.22]]
export default function StructuredLeatherTote(){return <group position={[0,-.28,0]} rotation={[0,-.3,0]}>
 <LoftSurface stations={body}><meshPhysicalMaterial color="#704735" roughness={.42} sheen={.22} clearcoat={.08}/></LoftSurface>
 <LoftSurface stations={gusset} position={[0,0,-.22]}><meshStandardMaterial color="#4e3026" roughness={.6}/></LoftSurface>
 <ExtrudedProfile points={pocket} depth={.055} position={[0,-.02,.32]}><meshPhysicalMaterial color="#79503b" roughness={.45} sheen={.18}/></ExtrudedProfile>
 {[-.34,.34].map(x=><SplineTube key={x} points={[[x,.45,.18],[x*.8,.98,.12],[-x*.8,.98,.12],[-x,.45,.18]]} radius={.035}><meshPhysicalMaterial color="#5d392d" roughness={.46} sheen={.18}/></SplineTube>)}
 <SplineTube points={[[-.65,.48,.31],[-.2,.55,.34],[.2,.55,.34],[.65,.48,.31]]} radius={.012}><meshStandardMaterial color="#b58d5f" roughness={.4}/></SplineTube>
 <ExtrudedProfile points={[[-.08,-.04],[.08,-.04],[.1,.04],[-.1,.04]]} depth={.025} position={[0,.28,.36]}><meshPhysicalMaterial color="#b89862" metalness={.72} roughness={.2}/></ExtrudedProfile>
 <SplineTube points={[[-.58,-.48,.29],[0,-.52,.34],[.58,-.48,.29]]} radius={.012}><meshStandardMaterial color="#422b24" roughness={.7}/></SplineTube>
 <ExtrudedProfile points={[[-.12,-.03],[.12,-.03],[.14,.03],[-.14,.03]]} depth={.018} position={[.22,.48,.34]}><meshStandardMaterial color="#97724f" roughness={.42}/></ExtrudedProfile>
</group>}
