import { LoftSurface, SplineTube, RevolvedSurface, type LoftStation } from '../geometry/GeometryV2'
import { CurvedBox } from '../geometry/CurvedBox'
const base:LoftStation[]=[{x:-1.85,width:.7,height:.11,y:-.08,exponent:5.2},{x:-1.35,width:.82,height:.15,y:-.05,exponent:5.6},{x:0,width:.86,height:.18,exponent:5.8},{x:1.35,width:.82,height:.15,y:-.05,exponent:5.6},{x:1.85,width:.7,height:.11,y:-.08,exponent:5.2}]
const wrist:LoftStation[]=[{x:-1.7,width:.46,height:.09,y:-.26,exponent:4.4},{x:0,width:.54,height:.12,y:-.24,exponent:4.8},{x:1.7,width:.46,height:.09,y:-.26,exponent:4.4}]
const cable:Array<[number,number,number]>=[[1.5,.02,-.76],[1.95,.08,-.92],[2.2,.22,-1.16],[2.05,.48,-1.42]]
const knob:Array<[number,number]>=[[.05,-.09],[.14,-.08],[.17,0],[.14,.08],[.05,.09]]
export default function MechanicalKeyboard(){return <group rotation={[-.12,-.38,0]} position={[0,-.25,0]}>
 <LoftSurface stations={base} castShadow><meshPhysicalMaterial color="#242829" metalness={.55} roughness={.24}/></LoftSurface>
 <LoftSurface stations={wrist}><meshPhysicalMaterial color="#171a1b" roughness={.46} clearcoat={.2}/></LoftSurface>
 {Array.from({length:5},(_,r)=>Array.from({length:r===4?10:12},(_,c)=><CurvedBox key={`${r}-${c}`} args={[.23,.12,.22]} radius={.05} smoothness={5} position={[-1.35+c*.25+(r===4?.25:0),.12+r*.02,-.5+r*.24]}><meshStandardMaterial color={r===0?'#d5d1c7':'#ebe7dc'} roughness={.38}/></CurvedBox>))}
 <SplineTube points={cable} radius={.035}><meshStandardMaterial color="#17191a" roughness={.55}/></SplineTube>
 <RevolvedSurface profile={knob} position={[1.55,.18,-.52]}><meshPhysicalMaterial color="#b8a078" metalness={.82} roughness={.2}/></RevolvedSurface>
</group>}
