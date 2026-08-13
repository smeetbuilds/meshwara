import { ExtrudedProfile, LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const shell:LoftStation[]=[{x:-.92,width:.3,height:.42,y:-.03,exponent:3},{x:-.58,width:.42,height:.56,exponent:3.6},{x:.58,width:.42,height:.56,exponent:3.6},{x:.92,width:.3,height:.42,y:-.03,exponent:3}]
const endCap:Array<[number,number]>=[[-.3,-.38],[.28,-.38],[.4,-.12],[.34,.32],[-.28,.36],[-.4,.08]]
const pocket:Array<[number,number]>=[[-.48,-.2],[.48,-.2],[.45,.22],[-.45,.22]]
export default function TechnicalWeekenderBag(){return <group position={[0,-.28,0]} rotation={[0,-.34,0]}>
 <LoftSurface stations={shell}><meshPhysicalMaterial color="#3e4746" roughness={.54} sheen={.18}/></LoftSurface>
 <ExtrudedProfile points={endCap} depth={.07} position={[-.91,0,0]} rotation={[0,Math.PI/2,0]}><meshStandardMaterial color="#27302f" roughness={.62}/></ExtrudedProfile>
 <ExtrudedProfile points={pocket} depth={.06} position={[0,-.06,.44]}><meshPhysicalMaterial color="#515d5a" roughness={.5}/></ExtrudedProfile>
 <SplineTube points={[[-.62,.38,.16],[-.36,.84,.12],[.36,.84,.12],[.62,.38,.16]]} radius={.04}><meshStandardMaterial color="#222827" roughness={.58}/></SplineTube>
 <SplineTube points={[[-.78,.3,.42],[-.2,.42,.47],[.28,.4,.47],[.78,.28,.4]]} radius={.012}><meshPhysicalMaterial color="#b5a069" metalness={.6} roughness={.24}/></SplineTube>
 {[-.62,.62].map(x=><ExtrudedProfile key={x} points={[[-.05,-.08],[.05,-.08],[.06,.08],[-.06,.08]]} depth={.04} position={[x,.18,.46]}><meshPhysicalMaterial color="#a78655" metalness={.7} roughness={.22}/></ExtrudedProfile>)}
 <SplineTube points={[[-.82,-.34,.38],[0,-.42,.46],[.82,-.34,.38]]} radius={.014}><meshStandardMaterial color="#66706d" roughness={.66}/></SplineTube>
 <LoftSurface stations={[{x:-.38,width:.06,height:.045},{x:0,width:.1,height:.06},{x:.38,width:.06,height:.045}]} position={[0,.48,.3]}><meshStandardMaterial color="#7a6950" roughness={.5}/></LoftSurface>
</group>}
