import { ExtrudedProfile, LoftSurface, RevolvedSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const caseProfile:Array<[number,number]>=[[.38,-.14],[.55,-.11],[.61,-.02],[.6,.11],[.48,.16],[.36,.17]]
const crystal:Array<[number,number]>=[[.32,-.04],[.49,-.02],[.52,.04],[.44,.09],[.3,.1]]
const strap:LoftStation[]=[{x:-1.05,width:.21,height:.055,exponent:3},{x:-.6,width:.24,height:.065,exponent:3.2},{x:-.28,width:.22,height:.06,exponent:3}]
const dial:Array<[number,number]>=[[-.33,-.33],[.33,-.33],[.38,.33],[-.38,.33]]
export default function MechanicalChronographWatch(){return <group rotation={[.18,-.36,.04]}>
 <LoftSurface stations={strap} position={[-.64,0,0]}><meshPhysicalMaterial color="#403a36" roughness={.5} sheen={.22}/></LoftSurface>
 <LoftSurface stations={strap} position={[.64,0,0]} rotation={[0,Math.PI,0]}><meshPhysicalMaterial color="#403a36" roughness={.5} sheen={.22}/></LoftSurface>
 <RevolvedSurface profile={caseProfile} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#9da09e" metalness={.96} roughness={.15}/></RevolvedSurface>
 <ExtrudedProfile points={dial} depth={.035} position={[0,0,.14]}><meshStandardMaterial color="#1f2526" roughness={.34}/></ExtrudedProfile>
 <RevolvedSurface profile={crystal} position={[0,0,.18]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#e1eded" transmission={.9} opacity={.28} transparent roughness={.03} clearcoat={1}/></RevolvedSurface>
 {[0,1,2].map(i=>{const a=i*Math.PI*2/3-Math.PI/2;return <RevolvedSurface key={i} profile={[[.04,-.02],[.13,0],[.04,.02]]} position={[Math.cos(a)*.22,Math.sin(a)*.22,.2]} rotation={[Math.PI/2,0,0]}><meshStandardMaterial color={i===0?"#87684d":"#d0c9b8"} roughness={.32}/></RevolvedSurface>})}
 <SplineTube points={[[-.02,0,.24],[.12,.02,.25],[.28,.12,.25]]} radius={.012}><meshPhysicalMaterial color="#d8c797" metalness={.8} roughness={.16}/></SplineTube>
 <SplineTube points={[[0,-.01,.245],[-.05,.12,.25],[-.1,.3,.25]]} radius={.008}><meshStandardMaterial color="#d45f52" metalness={.45} roughness={.2}/></SplineTube>
 <RevolvedSurface profile={[[.05,-.06],[.11,-.04],[.12,.04],[.06,.07]]} position={[.67,0,0]} rotation={[0,0,Math.PI/2]}><meshPhysicalMaterial color="#8b8e8c" metalness={.95} roughness={.16}/></RevolvedSurface>
</group>}
