import { LoftSurface, SplineTube, RevolvedSurface, type LoftStation } from '../geometry/GeometryV2'
const body:LoftStation[]=[{x:-2.05,width:.56,height:.2,y:-.02,exponent:2.8},{x:-1.55,width:.76,height:.34,exponent:3.4},{x:-.75,width:.86,height:.43,y:.05,exponent:3.9},{x:.2,width:.88,height:.46,y:.07,exponent:4.1},{x:1.05,width:.82,height:.4,y:.05,exponent:3.7},{x:1.72,width:.68,height:.29,exponent:3.2},{x:2.05,width:.46,height:.18,y:-.03,exponent:2.7}]
const canopy:LoftStation[]=[{x:-.9,width:.4,height:.13,y:.44,exponent:2.7},{x:-.5,width:.58,height:.26,y:.58,exponent:3},{x:.1,width:.64,height:.3,y:.66,exponent:3.2},{x:.7,width:.55,height:.24,y:.58,exponent:2.9},{x:1.08,width:.35,height:.12,y:.43,exponent:2.6}]
const shoulder:Array<[number,number,number]>=[[-1.72,.3,.76],[-.8,.45,.87],[.3,.48,.88],[1.55,.3,.72]]
const wheel:Array<[number,number]>=[[.08,-.15],[.27,-.14],[.34,0],[.27,.14],[.08,.15]]
export default function GrandTouringCoupe(){return <group rotation={[.02,-.42,0]} position={[0,-.24,0]}>
 <LoftSurface stations={body} castShadow><meshPhysicalMaterial color="#5a1820" metalness={.38} roughness={.16} clearcoat={1} clearcoatRoughness={.1}/></LoftSurface>
 <LoftSurface stations={canopy}><meshPhysicalMaterial color="#122832" roughness={.05} clearcoat={1} transmission={.08}/></LoftSurface>
 <SplineTube points={shoulder} radius={.016}><meshPhysicalMaterial color="#a5464e" metalness={.45} roughness={.14}/></SplineTube><SplineTube points={shoulder.map(([x,y,z])=>[x,y,-z] as [number,number,number])} radius={.016}><meshPhysicalMaterial color="#a5464e" metalness={.45} roughness={.14}/></SplineTube>
 {[-1.25,1.25].flatMap(x=>[-.78,.78].map(z=><RevolvedSurface key={`${x}-${z}`} profile={wheel} position={[x,-.42,z]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#181a1b" roughness={.5}/></RevolvedSurface>))}
</group>}
