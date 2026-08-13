import { LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const seat:LoftStation[]=[{x:-.72,width:.62,height:.12,y:-.04,exponent:3.5},{x:0,width:.75,height:.17,exponent:4},{x:.72,width:.62,height:.12,y:-.04,exponent:3.5}]
const back:LoftStation[]=[{x:-.9,width:.48,height:.14,exponent:3},{x:-.45,width:.66,height:.2,y:.06,exponent:3.5},{x:0,width:.74,height:.22,y:.1,exponent:3.8},{x:.45,width:.66,height:.2,y:.06,exponent:3.5},{x:.9,width:.48,height:.14,exponent:3}]
const rim:Array<[number,number,number]>=[[-.86,.42,-.5],[-.72,.92,-.62],[0,1.18,-.7],[.72,.92,-.62],[.86,.42,-.5]]
const cushion:LoftStation[]=[{x:-.58,width:.48,height:.07,y:.02,exponent:3},{x:0,width:.6,height:.1,y:.04,exponent:3.4},{x:.58,width:.48,height:.07,y:.02,exponent:3}]
const baseRing:Array<[number,number,number]>=[[.62,-.42,0],[0,-.5,.62],[-.62,-.42,0],[0,-.5,-.62],[.62,-.42,0]]
export default function BoucleBarrelChair(){return <group rotation={[0,-.35,0]} position={[0,-.52,0]}>
 <LoftSurface stations={seat} castShadow><meshPhysicalMaterial color="#d9d2c7" roughness={.78} sheen={.85} sheenColor="#fff4e5"/></LoftSurface>
 <LoftSurface stations={back} position={[0,.72,-.34]} rotation={[0,0,0]}><meshPhysicalMaterial color="#d4ccc0" roughness={.8} sheen={.9} sheenColor="#fff6e8"/></LoftSurface>
 <SplineTube points={rim} radius={.07}><meshPhysicalMaterial color="#c8bfb2" roughness={.82} sheen={.7}/></SplineTube>
 <SplineTube points={rim.map(([x,y,z])=>[x,y,z+.18] as [number,number,number])} radius={.045}><meshStandardMaterial color="#bcb3a7" roughness={.84}/></SplineTube>
 <LoftSurface stations={cushion} position={[0,.16,.06]}><meshPhysicalMaterial color="#e2dbd0" roughness={.8} sheen={.9} sheenColor="#fff8ec"/></LoftSurface>
 <SplineTube points={baseRing} radius={.04} closed><meshPhysicalMaterial color="#6e6a63" metalness={.25} roughness={.42}/></SplineTube>
</group>}
