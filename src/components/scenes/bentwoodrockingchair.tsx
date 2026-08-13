import { LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const seat:LoftStation[]=[{x:-.7,width:.52,height:.09,y:.02,exponent:3},{x:0,width:.64,height:.12,exponent:3.4},{x:.7,width:.52,height:.09,y:.02,exponent:3}]
const back:LoftStation[]=[{x:-.72,width:.39,height:.07,exponent:2.7},{x:0,width:.5,height:.1,exponent:3},{x:.72,width:.39,height:.07,exponent:2.7}]
const side:Array<[number,number,number]>=[[-.74,-.52,-.5],[-.92,-.16,-.56],[-.84,.45,-.52],[-.58,1.08,-.42],[-.2,1.55,-.3]]
const rocker:Array<[number,number,number]>=[[-1.0,-.68,-.48],[-.5,-.83,-.55],[.25,-.85,-.56],[.9,-.7,-.47]]
const arm:Array<[number,number,number]>=[[-.68,.32,-.5],[-.62,.65,-.55],[-.38,.83,-.5],[.48,.78,-.42]]
const slat:Array<[number,number,number]>=[[-.42,.62,-.28],[-.36,1.02,-.25],[-.2,1.38,-.2]]
export default function BentwoodRockingChair(){return <group rotation={[0,-.35,0]} position={[0,-.45,0]}>
 <LoftSurface stations={seat} position={[0,.05,0]}><meshPhysicalMaterial color="#c99b66" roughness={.34} clearcoat={.18}/></LoftSurface>
 <LoftSurface stations={back} position={[-.12,1.03,-.2]} rotation={[0,0,Math.PI/2.5]}><meshPhysicalMaterial color="#c99b66" roughness={.34} clearcoat={.18}/></LoftSurface>
 <SplineTube points={side} radius={.055}><meshPhysicalMaterial color="#9c6a3e" roughness={.32} clearcoat={.2}/></SplineTube><SplineTube points={side.map(([x,y,z])=>[x,y,-z] as [number,number,number])} radius={.055}><meshPhysicalMaterial color="#9c6a3e" roughness={.32} clearcoat={.2}/></SplineTube>
 <SplineTube points={rocker} radius={.06}><meshPhysicalMaterial color="#8c5e37" roughness={.33}/></SplineTube><SplineTube points={rocker.map(([x,y,z])=>[x,y,-z] as [number,number,number])} radius={.06}><meshPhysicalMaterial color="#8c5e37" roughness={.33}/></SplineTube>
 <SplineTube points={arm} radius={.045}><meshPhysicalMaterial color="#a87545" roughness={.32}/></SplineTube><SplineTube points={arm.map(([x,y,z])=>[x,y,-z] as [number,number,number])} radius={.045}><meshPhysicalMaterial color="#a87545" roughness={.32}/></SplineTube>
 {[-.22,0,.22].map((z)=><SplineTube key={z} points={slat.map(([x,y,zz])=>[x,y,zz+z] as [number,number,number])} radius={.025}><meshPhysicalMaterial color="#b98650" roughness={.34}/></SplineTube>)}
</group>}
