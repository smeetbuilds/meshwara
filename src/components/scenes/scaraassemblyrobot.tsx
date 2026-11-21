import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** SCARA assembly manipulator: heavy rotary base, two planar horizontal
 * revolute joints, a vertical Z spindle, and a parallel mechanical gripper.
 * Unlike a 6-axis arm, its arms rotate in the horizontal working plane.
 */
const shell='#e6e8e4', enamel='#edb42f', steel='#8a9da6', black='#323d42', signal='#5bb2b9'
const baseSection:Array<[number,number]>=[[0,-.15],[.38,-.15],[.43,-.1],[.43,.13],[0,.13]]
const shoulderSection:Array<[number,number]>=[[0,-.1],[.23,-.1],[.25,.1],[0,.1]]
const spindleSection:Array<[number,number]>=[[0,-.52],[.09,-.52],[.09,.52],[0,.52]]
const armOne:Array<[number,number]>=[[-.53,-.19],[.53,-.19],[.59,-.12],[.59,.12],[.53,.19],[-.53,.19],[-.59,.12],[-.59,-.12]]
const armTwo:Array<[number,number]>=[[-.34,-.16],[.34,-.16],[.39,-.09],[.39,.09],[.34,.16],[-.34,.16],[-.39,.09],[-.39,-.09]]
export default function ScaraAssemblyRobot(){
 return <group rotation={[0,-.46,0]}>
  <ExtrudedProfile points={[[-.55,-.12],[.55,-.12],[.63,.12],[-.63,.12]]} depth={.88} bevelSize={.018} bevelThickness={.018} position={[-.56,-1.30,-.28]}>
   <meshStandardMaterial color={steel} metalness={.75} roughness={.32}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={baseSection} position={[-.56,-1.04,-.28]} radialSegments={32}>
   <meshPhysicalMaterial color={black} metalness={.65} roughness={.3} clearcoat={.22}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.56],[.22,-.56],[.25,.54],[.20,.56],[0,.56]]} position={[-.56,-.39,-.28]} radialSegments={30}>
   <meshPhysicalMaterial color={shell} metalness={.21} roughness={.3} clearcoat={.43}/>
  </RevolvedSurface>
  <RevolvedSurface profile={shoulderSection} position={[-.56,.24,-.28]}>
   <meshStandardMaterial color={black} metalness={.66} roughness={.25}/>
  </RevolvedSurface>
  <ExtrudedProfile points={armOne} depth={.35} bevelSize={.045} bevelThickness={.035} rotation={[Math.PI/2,0,0]} position={[.06,.26,-.28]}>
   <meshPhysicalMaterial color={enamel} metalness={.15} roughness={.34} clearcoat={.38}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={shoulderSection} position={[.69,.25,-.28]}>
   <meshStandardMaterial color={black} metalness={.72} roughness={.26}/>
  </RevolvedSurface>
  <ExtrudedProfile points={armTwo} depth={.32} bevelSize={.032} bevelThickness={.031} rotation={[Math.PI/2,0,0]} position={[.92,.24,.10]}>
   <meshPhysicalMaterial color={shell} metalness={.27} roughness={.31} clearcoat={.34}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={shoulderSection} position={[1.16,.27,.49]}>
   <meshStandardMaterial color={black} metalness={.7} roughness={.25}/>
  </RevolvedSurface>
  <RevolvedSurface profile={spindleSection} position={[1.16,-.25,.49]} radialSegments={28}>
   <meshPhysicalMaterial color={steel} metalness={.92} roughness={.2} clearcoat={.4}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.15],[.15,-.15],[.17,.15],[0,.15]]} position={[1.16,-.86,.49]}>
   <meshStandardMaterial color={black} metalness={.72} roughness={.29}/>
  </RevolvedSurface>
  <ExtrudedProfile points={[[-.08,-.2],[.08,-.2],[.08,.2],[-.08,.2]]} depth={.1} bevelSize={.01} bevelThickness={.009} position={[1.04,-1.05,.49]}>
   <meshStandardMaterial color={steel} metalness={.81} roughness={.25}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={[[-.08,-.2],[.08,-.2],[.08,.2],[-.08,.2]]} depth={.1} bevelSize={.01} bevelThickness={.009} position={[1.28,-1.05,.49]}>
   <meshStandardMaterial color={steel} metalness={.81} roughness={.25}/>
  </ExtrudedProfile>
  <SplineTube points={[[-.57,-.82,-.44],[-.55,-.12,-.52],[.01,.47,-.50],[.69,.51,-.49],[1.13,.49,.20],[1.2,.04,.47]]} radius={.033} tubularSegments={80}>
   <meshStandardMaterial color={black} roughness={.84}/>
  </SplineTube>
  <SplineTube points={[[-.52,-.83,-.45],[-.46,-.12,-.55],[.1,.45,-.53],[.78,.48,-.42],[1.25,.31,.24]]} radius={.014} tubularSegments={65}>
   <meshStandardMaterial color={signal} metalness={.22} roughness={.35}/>
  </SplineTube>
  {[-1,1].map(z=><mesh key={z} position={[-.56,-1.4,-.28+z*.31]}><boxGeometry args={[.14,.06,.2]}/><meshStandardMaterial color={black} metalness={.56} roughness={.36}/></mesh>)}
 </group>
}
