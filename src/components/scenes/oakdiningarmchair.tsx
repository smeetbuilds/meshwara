import { LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const seat:LoftStation[]=[{x:-.64,width:.5,height:.07,exponent:3.2},{x:0,width:.6,height:.1,y:.02,exponent:3.6},{x:.64,width:.5,height:.07,exponent:3.2}]
const back:LoftStation[]=[{x:-.6,width:.32,height:.07,exponent:2.8},{x:0,width:.44,height:.1,y:.04,exponent:3.1},{x:.6,width:.32,height:.07,exponent:2.8}]
const leg:Array<[number,number,number]>=[[-.46,-.02,-.4],[-.5,-.5,-.44],[-.58,-.95,-.4]]
const arm:Array<[number,number,number]>=[[-.54,.18,-.48],[-.58,.52,-.52],[-.35,.68,-.5],[.5,.65,-.48]]
const lumbar:LoftStation[]=[{x:-.48,width:.23,height:.045,exponent:2.6},{x:0,width:.31,height:.065,y:.02,exponent:2.9},{x:.48,width:.23,height:.045,exponent:2.6}]
const stretcher:Array<[number,number,number]>=[[-.45,-.58,-.38],[0,-.63,-.42],[.45,-.58,-.38]]
export default function OakDiningArmchair(){return <group rotation={[0,-.36,0]} position={[0,-.5,0]}>
 <LoftSurface stations={seat}><meshPhysicalMaterial color="#a7784b" roughness={.36} clearcoat={.16}/></LoftSurface>
 <LoftSurface stations={back} position={[-.05,.82,-.22]} rotation={[0,0,Math.PI/2.28]}><meshPhysicalMaterial color="#9c6e44" roughness={.35}/></LoftSurface>
 {[1,-1].flatMap(s=>[1,-1].map((z,i)=><SplineTube key={`${s}-${z}`} points={leg.map(([x,y,zz])=>[x*s,y,zz*z] as [number,number,number])} radius={.055}><meshPhysicalMaterial color="#815a38" roughness={.34}/></SplineTube>))}
 <SplineTube points={arm} radius={.052}><meshPhysicalMaterial color="#8b613d" roughness={.34}/></SplineTube><SplineTube points={arm.map(([x,y,z])=>[x,y,-z] as [number,number,number])} radius={.052}><meshPhysicalMaterial color="#8b613d" roughness={.34}/></SplineTube>
 <LoftSurface stations={lumbar} position={[-.12,.92,-.26]} rotation={[0,0,Math.PI/2.25]}><meshPhysicalMaterial color="#a97a4c" roughness={.37}/></LoftSurface>
 <SplineTube points={stretcher} radius={.035}><meshPhysicalMaterial color="#755033" roughness={.36}/></SplineTube><SplineTube points={stretcher.map(([x,y,z])=>[x,y,-z] as [number,number,number])} radius={.035}><meshPhysicalMaterial color="#755033" roughness={.36}/></SplineTube>
</group>}
