import { ExtrudedProfile, LoftSurface, RevolvedSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const base:LoftStation[]=[{x:-.52,width:.4,height:.18,y:-.5,exponent:4},{x:0,width:.5,height:.24,y:-.48,exponent:4.4},{x:.52,width:.38,height:.17,y:-.5,exponent:4}]
const body:LoftStation[]=[{x:-.38,width:.34,height:.42,y:-.08,exponent:3.6},{x:0,width:.42,height:.52,exponent:4},{x:.4,width:.32,height:.4,y:.02,exponent:3.5}]
const hopper:Array<[number,number]>=[[.18,-.2],[.34,-.16],[.48,.12],[.46,.52],[.36,.62],[.19,.64]]
const chute:Array<[number,number]>=[[-.18,-.08],[.17,-.08],[.23,.16],[-.13,.2]]
export default function PrecisionCoffeeGrinder(){return <group position={[0,-.4,0]} rotation={[0,-.3,0]}>
 <LoftSurface stations={base}><meshPhysicalMaterial color="#303334" metalness={.74} roughness={.2}/></LoftSurface>
 <LoftSurface stations={body} position={[0,.28,0]}><meshPhysicalMaterial color="#4b4e4c" metalness={.6} roughness={.23} clearcoat={.28}/></LoftSurface>
 <RevolvedSurface profile={hopper} position={[0,.95,0]}><meshPhysicalMaterial color="#7a8587" transmission={.22} opacity={.82} transparent roughness={.12} clearcoat={.7}/></RevolvedSurface>
 <RevolvedSurface profile={[[.2,-.08],[.35,-.04],[.38,.03],[.34,.1],[.2,.12]]} position={[0,.62,0]}><meshPhysicalMaterial color="#c0b8a6" metalness={.78} roughness={.2}/></RevolvedSurface>
 <ExtrudedProfile points={chute} depth={.18} position={[0,.24,.45]} rotation={[Math.PI/2,0,0]}><meshStandardMaterial color="#27292a" roughness={.34}/></ExtrudedProfile>
 <SplineTube points={[[0,.12,.58],[0,-.1,.68],[.02,-.3,.63]]} radius={.025}><meshPhysicalMaterial color="#a4a6a3" metalness={.9} roughness={.16}/></SplineTube>
 <RevolvedSurface profile={[[.04,-.04],[.11,0],[.04,.04]]} position={[.26,.42,.39]}><meshPhysicalMaterial color="#b5784d" metalness={.45} roughness={.27}/></RevolvedSurface>
</group>}
