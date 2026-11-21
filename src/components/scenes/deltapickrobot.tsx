import * as THREE from 'three'
import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Three-parallel-chain delta pick-and-place manipulator.
 * The moving end effector stays parallel to the fixed triangular upper plate.
 * Includes three motor axes, paired carbon links, wrist vacuum cup, and a
 * contrasting indexing conveyor below the high-speed work envelope.
 */
const white='#e5e6e2', steel='#798791', carbon='#39484e', drive='#dba83e', vacuum='#659d9a'
const upperPlate:Array<[number,number]>=[[-.88,-.45],[.88,-.45],[0,1.02]]
const toolPlate:Array<[number,number]>=[[-.23,-.12],[.23,-.12],[0,.29]]
const driveProfile:Array<[number,number]>=[[0,-.16],[.16,-.16],[.19,-.08],[.19,.08],[.16,.16],[0,.16]]
const linkProfile:Array<[number,number]>=[[0,-.69],[.027,-.69],[.03,.69],[0,.69]]
const motorPoints:Array<[number,number,number]>=[[-.83,.62,-.38],[.83,.62,-.38],[0,.62,.79]]
const toolPoints:Array<[number,number,number]>=[[-.20,-.38,-.14],[.20,-.38,-.14],[0,-.38,.25]]
const columnBase:Array<[number,number]>=[[-.20,-.10],[.20,-.10],[.20,.1],[-.20,.1]]
export default function DeltaPickRobot(){
 return <group rotation={[0,-.36,0]} position={[0,-.08,0]}>
  <ExtrudedProfile points={upperPlate} depth={.17} bevelSize={.032} bevelThickness={.02} rotation={[Math.PI/2,0,0]} position={[0,.75,0]}>
   <meshPhysicalMaterial color={white} metalness={.37} roughness={.29} clearcoat={.27}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={toolPlate} depth={.075} bevelSize={.015} bevelThickness={.015} rotation={[Math.PI/2,0,0]} position={[0,-.42,0]}>
   <meshStandardMaterial color={steel} metalness={.84} roughness={.22}/>
  </ExtrudedProfile>
  {motorPoints.map((p,i)=><group key={i}>
   <RevolvedSurface profile={driveProfile} position={p}>
    <meshPhysicalMaterial color={drive} metalness={.42} roughness={.31} clearcoat={.28}/>
   </RevolvedSurface>
   <RevolvedSurface profile={[[0,-.08],[.11,-.08],[.11,.08],[0,.08]]} position={[p[0],p[1]-.24,p[2]]}>
    <meshStandardMaterial color={carbon} metalness={.7} roughness={.3}/>
   </RevolvedSurface>
  </group>)}
  {motorPoints.map((p,i)=>{
   const end=toolPoints[i]
   return <group key={'link'+i}>
    {[-1,1].map(side=>{
     const start:[number,number,number]=[p[0]+side*.095,p[1]-.27,p[2]]
     const finish:[number,number,number]=[end[0]+side*.065,end[1],end[2]]
     const dx=finish[0]-start[0],dy=finish[1]-start[1],dz=finish[2]-start[2]
     const length=Math.hypot(dx,dy,dz)
     // Geometry V2 rod joins the real upper/lower ball joints via a quaternion.
     const v=new THREE.Vector3(dx,dy,dz)
     const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize())
     return <group key={side}>
      <RevolvedSurface profile={[[0,-length/2],[.028,-length/2],[.028,length/2],[0,length/2]]} quaternion={q} position={[(start[0]+finish[0])/2,(start[1]+finish[1])/2,(start[2]+finish[2])/2]} radialSegments={12}>
       <meshStandardMaterial color={carbon} metalness={.45} roughness={.28}/>
      </RevolvedSurface>
      <mesh position={start}><sphereGeometry args={[.052,16,12]}/><meshStandardMaterial color={steel} metalness={.83} roughness={.23}/></mesh>
      <mesh position={finish}><sphereGeometry args={[.052,16,12]}/><meshStandardMaterial color={steel} metalness={.83} roughness={.23}/></mesh>
     </group>
    })}
   </group>
  })}
  <RevolvedSurface profile={[[0,-.18],[.07,-.18],[.07,.18],[0,.18]]} position={[0,-.64,0]}>
   <meshStandardMaterial color={vacuum} metalness={.45} roughness={.27}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.06],[.11,-.06],[.13,.06],[0,.06]]} position={[0,-.85,0]}>
   <meshStandardMaterial color={carbon} metalness={.16} roughness={.72}/>
  </RevolvedSurface>
  <ExtrudedProfile points={[[-1.28,-.11],[1.28,-.11],[1.28,.11],[-1.28,.11]]} depth={.75} bevelSize={.015} bevelThickness={.018} rotation={[Math.PI/2,0,0]} position={[0,-1.25,0]}>
   <meshStandardMaterial color={carbon} metalness={.64} roughness={.33}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={[[-1.17,-.07],[1.17,-.07],[1.17,.07],[-1.17,.07]]} depth={.65} bevelSize={.008} bevelThickness={.008} rotation={[Math.PI/2,0,0]} position={[0,-1.08,0]}>
   <meshStandardMaterial color={steel} metalness={.56} roughness={.4}/>
  </ExtrudedProfile>
  {[-1.16,1.16].map(x=><group key={x}>
   <ExtrudedProfile points={columnBase} depth={.33} bevelSize={.017} bevelThickness={.019} position={[x,-1.36,0]}>
    <meshStandardMaterial color={white} metalness={.35} roughness={.31}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={[[-.07,-1.13],[.07,-1.13],[.07,1.13],[-.07,1.13]]} depth={.24} bevelSize={.014} bevelThickness={.015} position={[x,-.30,0]}>
    <meshStandardMaterial color={steel} metalness={.56} roughness={.36}/>
   </ExtrudedProfile>
  </group>)}
  <SplineTube points={[[-1.03,.66,-.58],[-.82,.96,-.49],[0,1.05,-.35],[.70,.99,-.41],[.86,.75,-.3]]} radius={.038}>
   <meshStandardMaterial color={carbon} roughness={.8}/>
  </SplineTube>
 </group>
}
