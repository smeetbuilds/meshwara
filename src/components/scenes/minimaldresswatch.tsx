import { LoftSurface, RevolvedSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const caseProfile:Array<[number,number]>=[[.34,-.12],[.51,-.09],[.55,0],[.52,.1],[.37,.14]]
const crystal:Array<[number,number]>=[[.31,-.035],[.46,-.02],[.49,.035],[.4,.075],[.29,.08]]
const strap:LoftStation[]=[{x:-1.12,width:.19,height:.045,exponent:3},{x:-.7,width:.22,height:.055,exponent:3.2},{x:-.3,width:.2,height:.05,exponent:3}]
export default function MinimalDressWatch(){return <group rotation={[.16,-.32,.03]}>
 <LoftSurface stations={strap} position={[-.66,0,0]}><meshPhysicalMaterial color="#6a4938" roughness={.44} sheen={.2}/></LoftSurface>
 <LoftSurface stations={strap} position={[.66,0,0]} rotation={[0,Math.PI,0]}><meshPhysicalMaterial color="#6a4938" roughness={.44} sheen={.2}/></LoftSurface>
 <RevolvedSurface profile={caseProfile} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#c5b88d" metalness={.86} roughness={.16}/></RevolvedSurface>
 <RevolvedSurface profile={[[.3,-.025],[.46,0],[.3,.025]]} position={[0,0,.12]} rotation={[Math.PI/2,0,0]}><meshStandardMaterial color="#e5e1d4" roughness={.42}/></RevolvedSurface>
 <RevolvedSurface profile={crystal} position={[0,0,.16]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#e8f0ef" transmission={.9} opacity={.25} transparent roughness={.03}/></RevolvedSurface>
 <SplineTube points={[[0,0,.2],[.02,.14,.21],[.02,.31,.21]]} radius={.011}><meshPhysicalMaterial color="#6e6653" metalness={.72} roughness={.2}/></SplineTube>
 <SplineTube points={[[0,0,.205],[.14,.02,.21],[.25,.06,.21]]} radius={.009}><meshPhysicalMaterial color="#a28d5f" metalness={.76} roughness={.18}/></SplineTube>
 <RevolvedSurface profile={[[.04,-.05],[.09,-.03],[.1,.03],[.05,.06]]} position={[.58,0,0]} rotation={[0,0,Math.PI/2]}><meshStandardMaterial color="#9c8d68" metalness={.7} roughness={.22}/></RevolvedSurface>
</group>}
