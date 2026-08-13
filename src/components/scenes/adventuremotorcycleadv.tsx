import { LoftSurface, SplineTube, RevolvedSurface, type LoftStation } from '../geometry/GeometryV2'
const tank:LoftStation[]=[{x:-.72,width:.28,height:.22,y:.15,exponent:2.7},{x:-.35,width:.43,height:.36,y:.25,exponent:3.1},{x:.2,width:.48,height:.33,y:.23,exponent:3.2},{x:.62,width:.3,height:.2,y:.13,exponent:2.7}]
const seat:LoftStation[]=[{x:-.25,width:.27,height:.07,y:.44,exponent:2.7},{x:.45,width:.32,height:.09,y:.42,exponent:3},{x:1.05,width:.25,height:.06,y:.36,exponent:2.7}]
const frame:Array<[number,number,number]>=[[-.75,-.1,0],[-.3,.28,0],[.25,.05,0],[.75,-.25,0],[-.15,-.32,0],[-.75,-.1,0]]
const fork:Array<[number,number,number]>=[[-1.1,.2,-.14],[-1.32,-.18,-.14],[-1.48,-.55,-.14]]
const exhaust:Array<[number,number,number]>=[[.45,-.2,.32],[.9,-.3,.38],[1.25,-.18,.42]]
const hub:Array<[number,number]>=[[.04,-.08],[.16,-.07],[.2,0],[.16,.07],[.04,.08]]
export default function AdventureMotorcycleAdv(){return <group rotation={[0,-.42,0]} position={[0,-.25,0]}>
 <LoftSurface stations={tank}><meshPhysicalMaterial color="#7b3f1f" metalness={.28} roughness={.2} clearcoat={.85}/></LoftSurface>
 <LoftSurface stations={seat}><meshPhysicalMaterial color="#202223" roughness={.58}/></LoftSurface>
 <SplineTube points={frame} radius={.045}><meshPhysicalMaterial color="#555c5f" metalness={.8} roughness={.2}/></SplineTube>
 <SplineTube points={fork} radius={.038}><meshPhysicalMaterial color="#a6abad" metalness={.92} roughness={.16}/></SplineTube><SplineTube points={fork.map(([x,y,z])=>[x,y,-z] as [number,number,number])} radius={.038}><meshPhysicalMaterial color="#a6abad" metalness={.92} roughness={.16}/></SplineTube>
 <SplineTube points={exhaust} radius={.055}><meshPhysicalMaterial color="#7e8586" metalness={.92} roughness={.18}/></SplineTube>
 {[-1.5,1.18].map(x=><group key={x} position={[x,-.55,0]}><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.43,.08,18,64]}/><meshStandardMaterial color="#161819" roughness={.58}/></mesh><RevolvedSurface profile={hub} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#899092" metalness={.9} roughness={.18}/></RevolvedSurface></group>)}
</group>}
