import { ExtrudedProfile, LoftSurface, RevolvedSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const body:LoftStation[]=[{x:-1.05,width:.5,height:.6,y:.02,exponent:4},{x:-.72,width:.62,height:.72,exponent:4.5},{x:.72,width:.62,height:.72,exponent:4.5},{x:1.05,width:.48,height:.58,y:-.02,exponent:3.8}]
const side:Array<[number,number]>=[[-.5,-.52],[.44,-.52],[.54,-.35],[.5,.5],[-.42,.56],[-.54,.34]]
const tray:Array<[number,number]>=[[-.86,-.22],[.86,-.22],[.92,.18],[-.92,.18]]
export default function DualGroupEspressoMachine(){return <group position={[0,-.2,0]} rotation={[0,-.25,0]}>
 <LoftSurface stations={body}><meshPhysicalMaterial color="#34393b" metalness={.82} roughness={.19} clearcoat={.46}/></LoftSurface>
 <ExtrudedProfile points={side} depth={.08} position={[-1.03,.02,0]} rotation={[0,Math.PI/2,0]}><meshPhysicalMaterial color="#c9c2b4" metalness={.56} roughness={.25}/></ExtrudedProfile>
 <ExtrudedProfile points={tray} depth={.16} position={[0,-.82,.4]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#8b8f8c" metalness={.92} roughness={.18}/></ExtrudedProfile>
 {[-.42,.42].map((x,i)=><group key={i}><RevolvedSurface profile={[[.11,-.12],[.2,-.08],[.22,.04],[.16,.12]]} position={[x,.04,.61]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#8f9392" metalness={.95} roughness={.14}/></RevolvedSurface><SplineTube points={[[x,.02,.76],[x+.18,-.05,.94],[x+.56,-.08,1.02]]} radius={.055}><meshStandardMaterial color="#282b2c" roughness={.38}/></SplineTube></group>)}
 <SplineTube points={[[.78,.28,.58],[.9,.12,.76],[.86,-.25,.88],[.72,-.48,.82]]} radius={.027}><meshPhysicalMaterial color="#c7c5bd" metalness={.96} roughness={.12}/></SplineTube>
 {[-.62,.62].map((x,i)=><RevolvedSurface key={i} profile={[[.05,-.04],[.12,0],[.05,.04]]} position={[x,.58,.62]}><meshPhysicalMaterial color={i?"#b35c4a":"#b9a465"} metalness={.7} roughness={.22}/></RevolvedSurface>)}
</group>}
