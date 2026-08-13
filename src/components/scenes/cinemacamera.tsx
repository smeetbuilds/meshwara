import { LoftSurface, RevolvedSurface, SplineTube, ExtrudedProfile, type LoftStation } from '../geometry/GeometryV2'
const body:LoftStation[]=[{x:-1.25,width:.54,height:.56,exponent:4.2},{x:-.85,width:.67,height:.68,exponent:4.8},{x:.15,width:.7,height:.7,exponent:5},{x:.92,width:.62,height:.62,exponent:4.2},{x:1.24,width:.45,height:.5,exponent:3.3}]
const sideGrip:LoftStation[]=[{x:-.42,width:.25,height:.38,y:-.05,exponent:2.8},{x:-.08,width:.3,height:.48,y:-.12,exponent:3.2},{x:.25,width:.25,height:.42,y:-.13,exponent:2.8}]
const lens:Array<[number,number]>=[[.25,-.8],[.42,-.76],[.54,-.58],[.58,-.22],[.56,.22],[.49,.56],[.36,.75],[.23,.8]]
const handle:Array<[number,number,number]>=[[-.7,.72,-.1],[-.42,1.05,-.08],[.2,1.12,-.05],[.75,.85,-.02]]
const cage:Array<[number,number,number]>=[[-1.12,.56,.58],[-1.24,.1,.72],[-1.08,-.52,.6],[.95,-.52,.6],[1.16,.08,.7],[1.04,.54,.58]]
const display:Array<[number,number]>=[[-.5,-.3],[.5,-.3],[.54,.28],[.42,.4],[-.42,.4],[-.54,.28]]
export default function CinemaCamera(){return <group rotation={[.04,-.42,0]} position={[0,-.14,0]}>
 <LoftSurface stations={body} castShadow><meshPhysicalMaterial color="#202427" metalness={.62} roughness={.24} clearcoat={.45}/></LoftSurface>
 <LoftSurface stations={sideGrip} position={[-.2,-.08,-.6]}><meshStandardMaterial color="#121617" roughness={.52}/></LoftSurface>
 <RevolvedSurface profile={lens} position={[.8,.02,.68]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#2d3437" metalness={.82} roughness={.16}/></RevolvedSurface>
 <SplineTube points={handle} radius={.065}><meshPhysicalMaterial color="#363c3f" metalness={.7} roughness={.22}/></SplineTube>
 <SplineTube points={cage} radius={.024}><meshPhysicalMaterial color="#9da2a3" metalness={1} roughness={.16}/></SplineTube>
 <ExtrudedProfile points={display} depth={.06} position={[-.2,.1,-.73]}><meshPhysicalMaterial color="#102631" roughness={.06} clearcoat={1}/></ExtrudedProfile>
</group>}
