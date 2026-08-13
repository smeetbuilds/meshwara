import { LoftSurface, SplineTube, RevolvedSurface, type LoftStation } from '../geometry/GeometryV2'
const nose:LoftStation[]=[{x:-2.5,width:.18,height:.15,y:-.08,exponent:2.2},{x:-2.1,width:.42,height:.28,y:-.02,exponent:2.6},{x:-1.45,width:.72,height:.48,y:.05,exponent:3.2},{x:-.55,width:.88,height:.62,y:.12,exponent:3.8},{x:.55,width:.94,height:.66,y:.15,exponent:4.2},{x:1.55,width:.96,height:.68,y:.16,exponent:4.4},{x:2.3,width:.9,height:.62,y:.12,exponent:4}]
const glass:LoftStation[]=[{x:-1.5,width:.48,height:.08,y:.46,exponent:2.8},{x:-.95,width:.66,height:.18,y:.58,exponent:3.1},{x:-.2,width:.74,height:.19,y:.61,exponent:3.2},{x:.35,width:.68,height:.12,y:.55,exponent:3}]
const belt:Array<[number,number,number]>=[[-1.8,.26,.58],[-.7,.42,.84],[.65,.45,.9],[2.0,.35,.82]]
const bogie:Array<[number,number]>=[[.05,-.09],[.18,-.08],[.22,0],[.18,.08],[.05,.09]]
const skirt:LoftStation[]=[{x:-1.9,width:.55,height:.08,y:-.48,exponent:3},{x:-.8,width:.75,height:.11,y:-.52,exponent:3.7},{x:.6,width:.82,height:.12,y:-.53,exponent:4},{x:1.9,width:.76,height:.1,y:-.49,exponent:3.6}]
const lowerSeam:Array<[number,number,number]>=[[-1.9,-.34,.52],[-.7,-.42,.78],[.7,-.43,.82],[1.9,-.35,.72]]
export default function HighSpeedTrainNose(){return <group rotation={[0,-.38,0]} position={[0,-.28,0]}>
 <LoftSurface stations={nose}><meshPhysicalMaterial color="#e6e6e0" metalness={.18} roughness={.18} clearcoat={.68}/></LoftSurface>
 <LoftSurface stations={glass}><meshPhysicalMaterial color="#18333e" roughness={.05} clearcoat={1}/></LoftSurface>
 <SplineTube points={belt} radius={.018}><meshPhysicalMaterial color="#9da4a5" metalness={.6} roughness={.15}/></SplineTube><SplineTube points={belt.map(([x,y,z])=>[x,y,-z] as [number,number,number])} radius={.018}><meshPhysicalMaterial color="#9da4a5" metalness={.6} roughness={.15}/></SplineTube>
 {[.7,1.65].flatMap(x=>[-.72,.72].map(z=><RevolvedSurface key={`${x}-${z}`} profile={bogie} position={[x,-.62,z]} rotation={[Math.PI/2,0,0]}><meshStandardMaterial color="#343738" roughness={.5}/></RevolvedSurface>))}
 <LoftSurface stations={skirt}><meshPhysicalMaterial color="#cfd1cc" metalness={.2} roughness={.2}/></LoftSurface>
 <SplineTube points={lowerSeam} radius={.014}><meshPhysicalMaterial color="#7d8587" metalness={.65} roughness={.18}/></SplineTube><SplineTube points={lowerSeam.map(([x,y,z])=>[x,y,-z] as [number,number,number])} radius={.014}><meshPhysicalMaterial color="#7d8587" metalness={.65} roughness={.18}/></SplineTube>
</group>}
