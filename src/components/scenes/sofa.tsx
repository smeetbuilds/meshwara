import { LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const seat:LoftStation[]=[{x:-1.55,width:.62,height:.12,exponent:3.6},{x:-.8,width:.76,height:.17,exponent:4},{x:0,width:.8,height:.18,exponent:4.2},{x:.8,width:.76,height:.17,exponent:4},{x:1.55,width:.62,height:.12,exponent:3.6}]
const back:LoftStation[]=[{x:-1.5,width:.42,height:.12,exponent:3.2},{x:0,width:.55,height:.18,y:.06,exponent:3.8},{x:1.5,width:.42,height:.12,exponent:3.2}]
const rail:Array<[number,number,number]>=[[-1.55,-.38,-.7],[-1.72,-.55,-.62],[-1.5,-.62,.52],[1.5,-.62,.52],[1.72,-.55,-.62],[1.55,-.38,-.7]]
export default function CantileverSofa(){return <group rotation={[0,-.32,0]} position={[0,-.38,0]}>
 <LoftSurface stations={seat}><meshPhysicalMaterial color="#b9b3a9" roughness={.68} sheen={.65}/></LoftSurface>
 <LoftSurface stations={back} position={[0,.72,-.34]} rotation={[0,0,.02]}><meshPhysicalMaterial color="#aaa49a" roughness={.7} sheen={.6}/></LoftSurface>
 <SplineTube points={rail} radius={.045}><meshPhysicalMaterial color="#5f6668" metalness={.86} roughness={.2}/></SplineTube>
 {[-.75,.75].map(x=><LoftSurface key={x} stations={[{x:-.52,width:.52,height:.07,exponent:3},{x:0,width:.62,height:.11,exponent:3.4},{x:.52,width:.52,height:.07,exponent:3}]} position={[x,.22,.05]} scale={[.82,1,.78]}><meshPhysicalMaterial color="#c8c2b8" roughness={.72} sheen={.7}/></LoftSurface>)}
</group>}
