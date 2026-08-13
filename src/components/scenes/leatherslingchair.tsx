import { LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const seatSling:LoftStation[]=[{x:-.82,width:.48,height:.08,y:.08,twist:-.05,exponent:2.7},{x:-.35,width:.62,height:.11,y:-.02,twist:-.02,exponent:3},{x:.2,width:.68,height:.13,y:-.12,twist:.03,exponent:3.2},{x:.75,width:.55,height:.1,y:-.02,twist:.07,exponent:2.8}]
const backSling:LoftStation[]=[{x:-.66,width:.38,height:.065,y:-.02,twist:-.04,exponent:2.6},{x:-.18,width:.51,height:.09,y:.04,exponent:2.9},{x:.35,width:.48,height:.085,y:.08,twist:.04,exponent:2.8},{x:.7,width:.34,height:.06,y:.03,twist:.08,exponent:2.6}]
const frameL:Array<[number,number,number]>=[[-.82,-.45,-.58],[-.64,.18,-.62],[-.4,.78,-.56],[-.12,1.22,-.45]]
const baseL:Array<[number,number,number]>=[[-.82,-.45,-.58],[-.3,-.68,-.62],[.45,-.66,-.58],[.82,-.38,-.48]]
export default function LeatherSlingChair(){return <group rotation={[0,-.4,0]} position={[0,-.35,0]}>
 <LoftSurface stations={seatSling} position={[0,.28,0]} rotation={[0,0,.16]} castShadow><meshPhysicalMaterial color="#6d3e28" roughness={.46} clearcoat={.12} sheen={.22}/></LoftSurface>
 <LoftSurface stations={backSling} position={[-.23,1.03,-.08]} rotation={[0,0,1.02]} castShadow><meshPhysicalMaterial color="#72422c" roughness={.48} clearcoat={.1} sheen={.2}/></LoftSurface>
 <SplineTube points={frameL} radius={.045}><meshPhysicalMaterial color="#303536" metalness={.82} roughness={.2}/></SplineTube><SplineTube points={frameL.map(([x,y,z])=>[x,y,-z] as [number,number,number])} radius={.045}><meshPhysicalMaterial color="#303536" metalness={.82} roughness={.2}/></SplineTube>
 <SplineTube points={baseL} radius={.04}><meshPhysicalMaterial color="#303536" metalness={.82} roughness={.2}/></SplineTube><SplineTube points={baseL.map(([x,y,z])=>[x,y,-z] as [number,number,number])} radius={.04}><meshPhysicalMaterial color="#303536" metalness={.82} roughness={.2}/></SplineTube>
</group>}
