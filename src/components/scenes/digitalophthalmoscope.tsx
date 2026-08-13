import { RevolvedSurface, LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const handle:Array<[number,number]>=[[.12,-.78],[.18,-.72],[.21,-.48],[.2,.18],[.23,.5],[.17,.7],[.1,.78]]
const head:LoftStation[]=[{x:-.42,width:.22,height:.25,exponent:2.5},{x:-.18,width:.34,height:.34,exponent:2.9},{x:.18,width:.36,height:.32,exponent:3},{x:.44,width:.22,height:.22,exponent:2.5}]
const lens:Array<[number,number]>=[[.04,-.05],[.13,-.045],[.17,0],[.13,.045],[.04,.05]]
const seam:Array<[number,number,number]>=[[-.3,.18,.29],[0,.28,.36],[.3,.18,.29]]
const collar:Array<[number,number]>=[[.08,-.1],[.19,-.09],[.24,0],[.19,.09],[.08,.1]]
const control:Array<[number,number]>=[[.035,-.055],[.11,-.05],[.145,0],[.11,.05],[.035,.055]]
const gripSeam:Array<[number,number,number]>=[[-.14,-.88,.12],[-.17,-.5,.18],[-.17,-.05,.19],[-.12,.28,.16]]
export default function DigitalOphthalmoscope(){return <group rotation={[0,-.35,-.08]} position={[0,-.15,0]}>
 <RevolvedSurface profile={handle} position={[0,-.45,0]}><meshPhysicalMaterial color="#393f41" metalness={.48} roughness={.25}/></RevolvedSurface>
 <LoftSurface stations={head} position={[0,.48,0]}><meshPhysicalMaterial color="#272d2f" metalness={.58} roughness={.2}/></LoftSurface>
 <RevolvedSurface profile={lens} position={[.38,.52,.18]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#132834" roughness={.04} clearcoat={1}/></RevolvedSurface>
 <SplineTube points={seam} radius={.012} position={[0,.48,0]}><meshPhysicalMaterial color="#9ca2a3" metalness={.9} roughness={.17}/></SplineTube>
 <RevolvedSurface profile={collar} position={[0,.18,0]}><meshPhysicalMaterial color="#60696b" metalness={.76} roughness={.2}/></RevolvedSurface>
 <RevolvedSurface profile={control} position={[-.28,.55,.2]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#a0a6a7" metalness={.9} roughness={.17}/></RevolvedSurface>
 <SplineTube points={gripSeam} radius={.012}><meshPhysicalMaterial color="#181d1f" roughness={.42}/></SplineTube><SplineTube points={gripSeam.map(([x,y,z])=>[-x,y,z] as [number,number,number])} radius={.012}><meshPhysicalMaterial color="#181d1f" roughness={.42}/></SplineTube>
</group>}
