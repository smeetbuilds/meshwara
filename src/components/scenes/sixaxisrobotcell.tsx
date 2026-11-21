import * as THREE from 'three'
import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Six-axis articulated industrial manipulator within its own guarded cell.
 * Separate waist swivel, shoulder pitch, elbow pitch and three wrist axes
 * terminate in a mechanical parallel gripper. Illustrated neutral pose only.
 */
type V=[number,number,number]
const white='#dde2df', yellow='#deac37', graphite='#36464d', steel='#8a999d', dark='#242e33', optic='#6bbaab'
const base:Array<[number,number]>=[[0,-.11],[.34,-.11],[.38,.11],[0,.11]]
const post:Array<[number,number]>=[[0,-.13],[.15,-.13],[.15,.13],[0,.13]]
const foot:Array<[number,number]>=[[-.36,-.09],[.36,-.09],[.36,.09],[-.36,.09]]
const pad:Array<[number,number]>=[[-.31,-.20],[.31,-.20],[.31,.20],[-.31,.20]]
const clamping:Array<[number,number]>=[[-.08,-.21],[.08,-.21],[.08,.21],[-.08,.21]]
function Limb({from,to,radius,color}:{from:V,to:V,radius:number,color:string}){
 const start=new THREE.Vector3(...from),end=new THREE.Vector3(...to)
 const length=start.distanceTo(end)
 const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),end.clone().sub(start).normalize())
 return <group>
  <RevolvedSurface profile={[[0,-length/2],[radius,-length/2],[radius*.97,length/2],[0,length/2]]} position={start.add(end).multiplyScalar(.5)} quaternion={q} radialSegments={24}>
   <meshPhysicalMaterial color={color} metalness={.31} roughness={.31} clearcoat={.3}/>
  </RevolvedSurface>
 </group>
}
const path:Array<V>=[[-.55,-.64,-.26],[-.54,-.12,-.26],[-.21,.57,-.22],[.40,.72,.02],[.61,.25,.17],[.77,.05,.38]]
export default function SixAxisRobotCell(){
 return <group rotation={[0,-.32,0]}>
  <ExtrudedProfile points={pad} depth={.70} bevelSize={.018} bevelThickness={.016} position={[-.51,-1.37,-.24]}>
   <meshStandardMaterial color={graphite} metalness={.73} roughness={.34}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={base} position={[-.55,-1.12,-.25]} radialSegments={40}>
   <meshStandardMaterial color={steel} metalness={.86} roughness={.25}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.22],[.26,-.22],[.29,.20],[0,.20]]} position={[-.55,-.79,-.25]} radialSegments={32}>
   <meshPhysicalMaterial color={yellow} metalness={.34} roughness={.3} clearcoat={.25}/>
  </RevolvedSurface>
  <RevolvedSurface profile={post} rotation={[0,0,Math.PI/2]} position={[-.55,-.65,-.25]} radialSegments={22}>
   <meshStandardMaterial color={graphite} metalness={.72} roughness={.28}/>
  </RevolvedSurface>
  <Limb from={path[0]} to={path[1]} radius={.20} color={yellow}/>
  <Limb from={path[1]} to={path[2]} radius={.18} color={yellow}/>
  <Limb from={path[2]} to={path[3]} radius={.16} color={white}/>
  <Limb from={path[3]} to={path[4]} radius={.12} color={yellow}/>
  <Limb from={path[4]} to={path[5]} radius={.09} color={steel}/>
  {path.slice(1).map((p,i)=><RevolvedSurface key={i} profile={post} rotation={[0,0,Math.PI/2]} position={p} radialSegments={24}>
   <meshStandardMaterial color={graphite} metalness={.72} roughness={.27}/>
  </RevolvedSurface>)}
  <RevolvedSurface profile={[[0,-.14],[.10,-.14],[.10,.14],[0,.14]]} position={path[5]} radialSegments={22}>
   <meshStandardMaterial color={dark} metalness={.76} roughness={.25}/>
  </RevolvedSurface>
  {[-1,1].map(side=><ExtrudedProfile key={side} points={clamping} depth={.07} bevelSize={.012} bevelThickness={.009} position={[.78+side*.115,-.18,.47]}>
   <meshStandardMaterial color={steel} metalness={.88} roughness={.25}/>
  </ExtrudedProfile>)}
  <SplineTube points={[[-.70,-.72,-.5],[-.78,-.10,-.51],[-.28,.74,-.44],[.43,.96,-.28],[.74,.36,.03]]} radius={.04} tubularSegments={64}>
   <meshStandardMaterial color={dark} roughness={.79}/>
  </SplineTube>
  <SplineTube points={[[-.69,-.74,-.47],[-.68,.06,-.53],[-.15,.78,-.45],[.52,.76,-.23],[.80,.14,.06]]} radius={.015} tubularSegments={58}>
   <meshStandardMaterial color={optic} roughness={.8}/>
  </SplineTube>
  <ExtrudedProfile points={foot} depth={1.18} bevelSize={.016} bevelThickness={.012} position={[.56,-1.36,.53]}>
   <meshStandardMaterial color={graphite} metalness={.72} roughness={.35}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={pad} depth={.22} bevelSize={.015} bevelThickness={.013} position={[.55,-1.17,.48]}>
   <meshStandardMaterial color={steel} metalness={.79} roughness={.25}/>
  </ExtrudedProfile>
  {/* Guarding: four posts, welded perimeter, no fictitious opaque housing. */}
  {[-1.13,1.12].flatMap(x=>[-.89,.91].map(z=><group key={x+':'+z}>
   <ExtrudedProfile points={[[-.035,-.99],[.035,-.99],[.035,.99],[-.035,.99]]} depth={.07} bevelSize={.006} bevelThickness={.005} position={[x,-.52,z]}>
    <meshStandardMaterial color={graphite} metalness={.71} roughness={.31}/>
   </ExtrudedProfile>
  </group>))}
  <ExtrudedProfile points={[[-1.16,-.035],[1.16,-.035],[1.16,.035],[-1.16,.035]]} depth={.08} bevelSize={.005} bevelThickness={.005} position={[0,.45,.9]}>
   <meshStandardMaterial color={graphite} metalness={.74} roughness={.3}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={[[-1.16,-.035],[1.16,-.035],[1.16,.035],[-1.16,.035]]} depth={.08} bevelSize={.005} bevelThickness={.005} position={[0,.45,-.89]}>
   <meshStandardMaterial color={graphite} metalness={.74} roughness={.3}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={[[0,-.10],[.09,-.10],[.09,.10],[0,.10]]} position={[1.11,.49,.91]} radialSegments={22}>
   <meshStandardMaterial color={optic} emissive={optic} emissiveIntensity={.28}/>
  </RevolvedSurface>
 </group>
}
