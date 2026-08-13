import { ExtrudedProfile, LoftSurface, RevolvedSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const pan:Array<[number,number]>=[[.2,-.22],[.68,-.2],[.8,-.05],[.82,.16],[.78,.22]]
const lid:Array<[number,number]>=[[.18,-.05],[.56,-.03],[.74,.08],[.62,.16],[.28,.21],[.12,.2]]
const handle:LoftStation[]=[{x:-.12,width:.13,height:.11,exponent:3},{x:.38,width:.16,height:.14,exponent:3.4},{x:.92,width:.12,height:.1,exponent:3}]
const rest:Array<[number,number]>=[[-.92,-.32],[.92,-.32],[1,.26],[-1,.26]]
export default function ProfessionalSautePan(){return <group position={[0,-.32,0]} rotation={[0,-.36,0]}>
 <ExtrudedProfile points={rest} depth={.08} position={[0,-.34,0]} rotation={[Math.PI/2,0,0]}><meshStandardMaterial color="#5a4a3f" roughness={.82}/></ExtrudedProfile>
 <RevolvedSurface profile={pan} position={[-.2,.06,0]}><meshPhysicalMaterial color="#777c7d" metalness={.94} roughness={.19}/></RevolvedSurface>
 <RevolvedSurface profile={lid} position={[-.2,.34,0]}><meshPhysicalMaterial color="#a8adac" metalness={.88} roughness={.15} clearcoat={.24}/></RevolvedSurface>
 <LoftSurface stations={handle} position={[.55,.02,0]}><meshStandardMaterial color="#272a2a" roughness={.4}/></LoftSurface>
 <SplineTube points={[[.45,.1,0],[.7,.12,.01],[1.0,.09,.01],[1.32,.06,0]]} radius={.055}><meshStandardMaterial color="#262929" roughness={.42}/></SplineTube>
 {[-.02,.08].map((y,i)=><RevolvedSurface key={i} profile={[[.03,-.02],[.07,0],[.03,.02]]} position={[.42,y,.2]}><meshPhysicalMaterial color="#c7b184" metalness={.75} roughness={.2}/></RevolvedSurface>)}
 <RevolvedSurface profile={[[.05,-.05],[.12,-.02],[.14,.04],[.09,.09]]} position={[-.2,.58,0]}><meshStandardMaterial color="#6e5747" roughness={.38}/></RevolvedSurface>

 <RevolvedSurface profile={[[.04,-.025],[.09,0],[.04,.025]]} position={[-.62,.02,.7]}><meshPhysicalMaterial color="#a88d63" metalness={.7} roughness={.22}/></RevolvedSurface>
 <SplineTube points={[[-.7,.25,.46],[-.3,.32,.58],[.2,.29,.56]]} radius={.01}><meshStandardMaterial color="#5f5148" roughness={.55}/></SplineTube>
</group>}
