import { LoftSurface, SplineTube, RevolvedSurface, ExtrudedProfile, type LoftStation } from '../geometry/GeometryV2'
const base:LoftStation[]=[{x:-1.0,width:.55,height:.08,exponent:4},{x:-.45,width:.7,height:.13,exponent:4.8},{x:.45,width:.7,height:.13,exponent:4.8},{x:1.0,width:.5,height:.08,exponent:4}]
const head:LoftStation[]=[{x:-.5,width:.28,height:.22,exponent:2.8},{x:0,width:.38,height:.31,exponent:3.2},{x:.5,width:.28,height:.22,exponent:2.8}]
const arm:Array<[number,number,number]>=[[-.55,.05,-.22],[-.7,.55,-.25],[-.55,1.18,-.18],[-.18,1.55,-.08],[.3,1.62,0]]
const objective:Array<[number,number]>=[[.05,-.2],[.12,-.19],[.15,-.08],[.16,.08],[.12,.19],[.05,.2]]
const stage:Array<[number,number]>=[[-.55,-.38],[.55,-.38],[.62,.3],[.48,.42],[-.48,.42],[-.62,.3]]
export default function PrecisionMicroscope(){return <group rotation={[0,-.38,0]} position={[0,-.65,0]}>
 <LoftSurface stations={base}><meshPhysicalMaterial color="#d9d9d2" metalness={.12} roughness={.25}/></LoftSurface>
 <SplineTube points={arm} radius={.09}><meshPhysicalMaterial color="#bfc2be" metalness={.42} roughness={.22}/></SplineTube>
 <LoftSurface stations={head} position={[.42,1.52,0]} rotation={[0,0,.12]}><meshPhysicalMaterial color="#e0e0d9" roughness={.22}/></LoftSurface>
 <ExtrudedProfile points={stage} depth={.08} position={[.05,.55,0]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#3f4647" metalness={.65} roughness={.2}/></ExtrudedProfile>
 {[-.18,0,.18].map((z,i)=><RevolvedSurface key={z} profile={objective} position={[.48,1.22,z]} rotation={[Math.PI/2,0,.12+i*.08]}><meshPhysicalMaterial color="#4c5557" metalness={.82} roughness={.18}/></RevolvedSurface>)}
</group>}
