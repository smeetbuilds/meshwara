import * as THREE from 'three'
import { CC0Surface } from '../geometry/CC0Surface'
import { SplineTube } from '../geometry/GeometryV2'

/** Architectural cutaway. All jambs, rails, mullions and panes share a
 * single opening datum. Double glazing and an inset casement are distinct
 * assemblies. Visualization geometry, not a structural installation detail. */
const metal='#465157',trim='#9ca8ac',gasket='#262e30'
const opening={width:2.90,height:2.44}
const mullions=[-.675,0,.675] as const
const glassWidths=[-1.0125,-.3375,.3375,1.0125] as const
const paneWidth=.675
function Wall({position,size,material='plaster'}:{
 position:[number,number,number];size:[number,number,number];material?:'plaster'|'concrete'|'oak'
}){
 return <mesh position={position} castShadow receiveShadow>
  <boxGeometry args={size}/>
  {material==='plaster'?<CC0Surface texture="plaster"/>:material==='concrete'?<CC0Surface texture="concrete"/>:<CC0Surface texture="oak"/>}
 </mesh>
}
function Profile({position,size,color=metal}:{position:[number,number,number];size:[number,number,number];color?:string}){
 return <mesh position={position} castShadow receiveShadow><boxGeometry args={size}/>
  <meshPhysicalMaterial color={color} metalness={.67} roughness={.39}/>
 </mesh>
}
function Seal({position,size}:{position:[number,number,number];size:[number,number,number]}){
 return <mesh position={position}><boxGeometry args={size}/><meshStandardMaterial color={gasket} roughness={.91}/></mesh>
}
function Mullion({x}:{x:number}){
 return <group position={[x,0,0]}>
  <Profile position={[0,0,.015]} size={[.075,2.24,.26]}/>
  <Profile position={[0,0,.151]} size={[.051,2.24,.018]} color={trim}/>
  {[-1,1].map(s=><Seal key={s} position={[s*.041,0,.105]} size={[.009,2.20,.026]}/>)}
 </group>
}
function GlassUnit({x,operable}:{x:number;operable:boolean}){
 const w=paneWidth-.079-(operable?.084:0),h=2.24-(operable?.084:0)
 return <group position={[x,0,0]}>
  {operable&&<>
   {[-1,1].map(s=><group key={s}>
    <Profile position={[s*(w/2+.021),0,.025]} size={[.042,2.24,.16]}/>
    <Profile position={[0,s*(h/2+.021),.025]} size={[w,.042,.16]}/>
   </group>)}
  </>}
  {/* Glazing pack has two parallel leaves separated by a spacer perimeter. */}
  {[-1,1].map(s=><group key={s}>
   <Seal position={[s*(w/2-.006),0,.012]} size={[.012,h,.083]}/>
   <Seal position={[0,s*(h/2-.006),.012]} size={[w-.024,.012,.083]}/>
   <Profile position={[s*(w/2-.016),0,.011]} size={[.009,h-.032,.043]} color="#87908c"/>
   <Profile position={[0,s*(h/2-.016),.011]} size={[w-.041,.009,.043]} color="#87908c"/>
  </group>)}
  <mesh position={[0,0,-.032]} renderOrder={1}>
   <boxGeometry args={[w-.018,h-.018,.008]}/>
   <meshPhysicalMaterial color="#b6d4d5" roughness={.13} metalness={0} transparent opacity={.12} depthWrite={false}/>
  </mesh>
  <mesh position={[0,0,.052]} renderOrder={2}>
   <boxGeometry args={[w-.018,h-.018,.012]}/>
   <meshPhysicalMaterial color="#e1f0ed" roughness={.10} metalness={0} transmission={.83} thickness={.015} ior={1.52} transparent opacity={.70} depthWrite={false} clearcoat={.35}/>
  </mesh>
  {operable&&<>
   <Profile position={[w/2+.019,-.12,.123]} size={[.039,.22,.021]} color={trim}/>
   <SplineTube points={[[w/2+.019,-.08,.138],[w/2+.019,-.08,.196],[w/2-.022,-.08,.208],[w/2-.022,-.27,.208]]} radius={.015} radialSegments={10} tubularSegments={24}>
    <meshPhysicalMaterial color="#c0c7c5" metalness={.76} roughness={.34}/>
   </SplineTube>
   {[-.75,.75].map(y=><Profile key={y} position={[-w/2-.021,y,.113]} size={[.028,.125,.028]} color={trim}/>)}
  </>}
 </group>
}
export default function GlazedWindowBay(){
 const jamb=opening.width/2,head=opening.height/2
 return <group rotation={[0,-.34,0]} scale={.83}>
  {/* All four masonry edges meet the opening; there is no backing wall. */}
  {[-1,1].map(s=><Wall key={s} position={[s*(jamb+.37),0,-.09]} size={[.74,3.36,.42]}/>)}
  <Wall position={[0,head+.23,-.09]} size={[opening.width,.46,.42]}/>
  <Wall position={[0,-head-.23,-.09]} size={[opening.width,.46,.42]} material="concrete"/>
  <Wall position={[0,-1.735,.13]} size={[4.38,.11,1.15]} material="concrete"/>
  {[-1,1].map(s=><group key={s}>
   <Profile position={[s*(jamb-.05),0,.015]} size={[.10,opening.height,.29]}/>
   <Profile position={[0,s*(head-.05),.015]} size={[opening.width-.20,.10,.29]}/>
   <Profile position={[s*(jamb-.120),0,.015]} size={[.04,2.24,.145]}/>
   <Seal position={[s*(jamb-.138),0,.105]} size={[.012,2.24,.025]}/>
   <Seal position={[0,s*(head-.105),.105]} size={[2.70,.01,.025]}/>
   <Profile position={[s*(jamb-.05),0,.171]} size={[.068,opening.height,.024]} color={trim}/>
   <Profile position={[0,s*(head-.05),.171]} size={[2.70,.068,.024]} color={trim}/>
   {[-.92,0,.92].map(y=><mesh key={y} position={[s*(jamb-.05),y,.187]} rotation={[Math.PI/2,0,0]}>
    <cylinderGeometry args={[.014,.014,.006,16]}/><meshPhysicalMaterial color="#c0c7c8" metalness={.8} roughness={.35}/>
   </mesh>)}
  </group>)}
  {glassWidths.map((x,i)=><GlassUnit key={x} x={x} operable={i===2}/>)}
  {mullions.map(x=><Mullion key={x} x={x}/>)}
  <Wall position={[0,-head-.043,.26]} size={[3.00,.086,.68]} material="oak"/>
  <Profile position={[0,-head-.083,.58]} size={[3.00,.012,.026]} color="#786956"/>
  <Wall position={[0,head+.46,.10]} size={[3.16,.07,.51]} material="concrete"/>
 </group>
}
