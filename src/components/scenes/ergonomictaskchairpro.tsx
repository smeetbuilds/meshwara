import { LoftSurface, SplineTube, RevolvedSurface, type LoftStation } from '../geometry/GeometryV2'
const seat:LoftStation[]=[{x:-.72,width:.62,height:.11,y:-.05,exponent:4},{x:-.35,width:.72,height:.16,exponent:4.6},{x:.28,width:.73,height:.17,y:.02,exponent:4.8},{x:.75,width:.59,height:.1,y:.05,exponent:3.8}]
const back:LoftStation[]=[{x:-.85,width:.42,height:.12,exponent:3.5},{x:-.4,width:.58,height:.16,exponent:4.2},{x:.2,width:.64,height:.18,exponent:4.5},{x:.78,width:.49,height:.13,exponent:3.6}]
const spine:Array<[number,number,number]>=[[-.45,.2,-.18],[-.58,.62,-.1],[-.5,1.18,.03],[-.28,1.7,.12]]
const armL:Array<[number,number,number]>=[[-.45,.42,-.66],[-.15,.7,-.78],[.35,.72,-.76],[.58,.48,-.68]]
const baseProfile:Array<[number,number]>=[[.08,-.18],[.25,-.15],[.34,0],[.25,.15],[.08,.18]]
export default function ErgonomicTaskChairPro(){return <group rotation={[0,-.34,0]} position={[0,-.72,0]}>
 <LoftSurface stations={seat} castShadow><meshPhysicalMaterial color="#24292a" roughness={.32} sheen={.45} sheenColor="#7f8788"/></LoftSurface>
 <LoftSurface stations={back} position={[-.2,1.05,.16]} rotation={[0,0,Math.PI/2.35]}><meshPhysicalMaterial color="#303637" roughness={.38} sheen={.55}/></LoftSurface>
 <SplineTube points={spine} radius={.065}><meshPhysicalMaterial color="#6c7476" metalness={.72} roughness={.2}/></SplineTube>
 <SplineTube points={armL} radius={.045}><meshPhysicalMaterial color="#5b6264" metalness={.55} roughness={.25}/></SplineTube><SplineTube points={armL.map(([x,y,z])=>[x,y,-z] as [number,number,number])} radius={.045}><meshPhysicalMaterial color="#5b6264" metalness={.55} roughness={.25}/></SplineTube>
 <RevolvedSurface profile={baseProfile} position={[0,-.55,0]}><meshPhysicalMaterial color="#8f9697" metalness={.9} roughness={.18}/></RevolvedSurface>
 {Array.from({length:5},(_,i)=>{const a=i*Math.PI*2/5;return <SplineTube key={i} points={[[0,-.57,0],[Math.cos(a)*.45,-.63,Math.sin(a)*.45],[Math.cos(a)*.78,-.72,Math.sin(a)*.78]]} radius={.035}><meshPhysicalMaterial color="#686f70" metalness={.75} roughness={.22}/></SplineTube>})}
</group>}
