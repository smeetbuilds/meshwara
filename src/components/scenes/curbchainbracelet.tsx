import { ExtrudedProfile, LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const link:Array<[number,number,number]>=[[-.22,0,0],[-.16,.16,0],[0,.22,0],[.16,.16,0],[.22,0,0],[.16,-.16,0],[0,-.22,0],[-.16,-.16,0],[-.22,0,0]]
const clasp:LoftStation[]=[{x:-.18,width:.1,height:.11,exponent:3},{x:0,width:.14,height:.14,exponent:3.4},{x:.18,width:.1,height:.11,exponent:3}]
const badge:Array<[number,number]>=[[-.14,-.08],[.14,-.08],[.16,.08],[-.16,.08]]
export default function CurbChainBracelet(){return <group rotation={[.48,-.22,.12]}>
 {Array.from({length:14},(_,i)=>{const a=i/14*Math.PI*2,x=Math.cos(a)*.78,y=Math.sin(a)*.48,z=Math.sin(a*2)*.08;return <group key={i} position={[x,y,z]} rotation={[0,i%2?Math.PI/2:0,a+.2]}><SplineTube points={link} closed radius={.045} tubularSegments={28} radialSegments={8}><meshPhysicalMaterial color={i%3===0?"#d0b776":"#b89c61"} metalness={.96} roughness={.16}/></SplineTube>{i%4===0&&<SplineTube points={link.map(([lx,ly,lz])=>[lx*.72,ly*.72,lz+.01] as [number,number,number])} closed radius={.018}><meshPhysicalMaterial color="#e0ca8e" metalness={.98} roughness={.13}/></SplineTube>}</group>})}
 <LoftSurface stations={clasp} position={[.78,0,0]} rotation={[0,0,Math.PI/2]}><meshPhysicalMaterial color="#9a824f" metalness={.94} roughness={.18}/></LoftSurface>
 <ExtrudedProfile points={badge} depth={.035} position={[.82,.02,.12]}><meshPhysicalMaterial color="#d8c083" metalness={.95} roughness={.14}/></ExtrudedProfile>
 <SplineTube points={[[.58,.08,.02],[.72,.16,.04],[.86,.1,.02]]} radius={.018}><meshStandardMaterial color="#6d5a3d" metalness={.72} roughness={.26}/></SplineTube>
 <LoftSurface stations={[{x:-.28,width:.06,height:.05},{x:0,width:.09,height:.07},{x:.28,width:.06,height:.05}]} position={[-.78,0,0]}><meshStandardMaterial color="#806a43" metalness={.75} roughness={.22}/></LoftSurface>
</group>}
