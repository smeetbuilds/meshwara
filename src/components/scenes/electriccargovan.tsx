import { LoftSurface, SplineTube, RevolvedSurface, ExtrudedProfile, type LoftStation } from '../geometry/GeometryV2'
const body:LoftStation[]=[{x:-2.0,width:.65,height:.34,y:-.05,exponent:3},{x:-1.5,width:.86,height:.64,y:.18,exponent:4},{x:-.55,width:.9,height:.82,y:.3,exponent:5},{x:.6,width:.9,height:.82,y:.3,exponent:5},{x:1.55,width:.84,height:.7,y:.22,exponent:4.3},{x:1.98,width:.62,height:.42,y:.05,exponent:3.2}]
const windshield:LoftStation[]=[{x:-1.55,width:.65,height:.12,y:.64,exponent:3},{x:-1.2,width:.78,height:.23,y:.72,exponent:3.3},{x:-.76,width:.8,height:.2,y:.68,exponent:3.1}]
const roof:Array<[number,number,number]>=[[-1.25,1.08,.78],[-.45,1.15,.87],[.65,1.14,.87],[1.45,1.02,.76]]
const wheel:Array<[number,number]>=[[.08,-.16],[.27,-.15],[.34,0],[.27,.15],[.08,.16]]
const door:Array<[number,number]>=[[-.5,-.55],[.5,-.55],[.55,.5],[.4,.65],[-.4,.65],[-.55,.5]]
const sill:Array<[number,number,number]>=[[-1.65,-.34,.84],[-.6,-.43,.9],[.65,-.43,.9],[1.65,-.3,.8]]
const tailLamp:Array<[number,number]>=[[.03,-.1],[.09,-.09],[.13,0],[.09,.09],[.03,.1]]
export default function ElectricCargoVan(){return <group rotation={[.02,-.42,0]} position={[0,-.35,0]}>
 <LoftSurface stations={body}><meshPhysicalMaterial color="#e0ddd4" metalness={.22} roughness={.2} clearcoat={.7}/></LoftSurface>
 <LoftSurface stations={windshield}><meshPhysicalMaterial color="#142b35" roughness={.06} clearcoat={1}/></LoftSurface>
 <SplineTube points={roof} radius={.018}><meshPhysicalMaterial color="#a7aaa8" metalness={.65} roughness={.18}/></SplineTube>
 <ExtrudedProfile points={door} depth={.025} position={[.55,.15,.91]}><meshPhysicalMaterial color="#d4d1c9" roughness={.22} metalness={.18}/></ExtrudedProfile>
 {[-1.2,1.22].flatMap(x=>[-.82,.82].map(z=><RevolvedSurface key={`${x}-${z}`} profile={wheel} position={[x,-.56,z]} rotation={[Math.PI/2,0,0]}><meshStandardMaterial color="#17191a" roughness={.55}/></RevolvedSurface>))}
 <SplineTube points={sill} radius={.018}><meshPhysicalMaterial color="#777d7d" metalness={.45} roughness={.2}/></SplineTube><SplineTube points={sill.map(([x,y,z])=>[x,y,-z] as [number,number,number])} radius={.018}><meshPhysicalMaterial color="#777d7d" metalness={.45} roughness={.2}/></SplineTube>
 {[-.56,.56].map(z=><RevolvedSurface key={z} profile={tailLamp} position={[1.88,.22,z]} rotation={[Math.PI/2,0,0]}><meshBasicMaterial color="#d94f45" toneMapped={false}/></RevolvedSurface>)}
</group>}
