import { LoftSurface, SplineTube, RevolvedSurface, type LoftStation } from '../geometry/GeometryV2'
const body:LoftStation[]=[{x:-1.72,width:.54,height:.22,exponent:2.8},{x:-1.25,width:.74,height:.38,y:.03,exponent:3.4},{x:-.5,width:.82,height:.48,y:.08,exponent:3.8},{x:.4,width:.84,height:.5,y:.1,exponent:4},{x:1.18,width:.76,height:.4,y:.06,exponent:3.5},{x:1.7,width:.5,height:.22,exponent:2.8}]
const cabin:LoftStation[]=[{x:-.72,width:.5,height:.18,y:.48,exponent:2.8},{x:-.25,width:.62,height:.31,y:.63,exponent:3.1},{x:.48,width:.64,height:.33,y:.67,exponent:3.2},{x:1.02,width:.48,height:.2,y:.52,exponent:2.7}]
const belt:Array<[number,number,number]>=[[-1.35,.4,.72],[-.55,.58,.82],[.5,.61,.82],[1.3,.42,.7]]
const wheel:Array<[number,number]>=[[.07,-.14],[.25,-.13],[.31,0],[.25,.13],[.07,.14]]
const sill:Array<[number,number,number]>=[[-1.4,-.18,.74],[-.55,-.28,.82],[.55,-.28,.82],[1.38,-.17,.7]]
const lamp:Array<[number,number]>=[[.03,-.09],[.12,-.08],[.18,0],[.12,.08],[.03,.09]]
export default function CompactElectricHatchback(){return <group rotation={[.02,-.44,0]} position={[0,-.25,0]}>
 <LoftSurface stations={body}><meshPhysicalMaterial color="#83919a" metalness={.3} roughness={.18} clearcoat={.95}/></LoftSurface>
 <LoftSurface stations={cabin}><meshPhysicalMaterial color="#152d38" roughness={.05} clearcoat={1}/></LoftSurface>
 <SplineTube points={belt} radius={.014}><meshPhysicalMaterial color="#b5c0c5" metalness={.65} roughness={.15}/></SplineTube><SplineTube points={belt.map(([x,y,z])=>[x,y,-z] as [number,number,number])} radius={.014}><meshPhysicalMaterial color="#b5c0c5" metalness={.65} roughness={.15}/></SplineTube>
 {[-1.08,1.08].flatMap(x=>[-.74,.74].map(z=><RevolvedSurface key={`${x}-${z}`} profile={wheel} position={[x,-.4,z]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#161819" roughness={.5}/></RevolvedSurface>))}
 <SplineTube points={sill} radius={.016}><meshPhysicalMaterial color="#5d6a70" metalness={.5} roughness={.18}/></SplineTube><SplineTube points={sill.map(([x,y,z])=>[x,y,-z] as [number,number,number])} radius={.016}><meshPhysicalMaterial color="#5d6a70" metalness={.5} roughness={.18}/></SplineTube>
 {[-.48,.48].map(z=><RevolvedSurface key={z} profile={lamp} position={[-1.58,.18,z]} rotation={[Math.PI/2,0,0]}><meshBasicMaterial color="#f2e8ce" toneMapped={false}/></RevolvedSurface>)}
</group>}
