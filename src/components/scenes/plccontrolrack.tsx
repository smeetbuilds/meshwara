import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Industrial PLC backplane: safety-rated power supply, controller CPU,
 * modular analog/digital IO cards, DIN rails and labeled terminal barriers.
 * Each connector and LED belongs to a realistic part of the control rack.
 */
const chassis='#48545a', panel='#b9bfb9', dark='#242f34', connector='#4c927f', lead='#d4a957', signal='#4eb8bd'
const back:Array<[number,number]>=[[-1.33,-.72],[1.33,-.72],[1.33,.72],[-1.33,.72]]
const card:Array<[number,number]>=[[-.14,-.47],[.14,-.47],[.14,.47],[-.14,.47]]
const rail:Array<[number,number]>=[[-1.2,-.055],[1.2,-.055],[1.2,.055],[-1.2,.055]]
const housing:Array<[number,number]>=[[0,-.05],[.065,-.05],[.075,.05],[0,.05]]
export default function PlcControlRack(){
 return <group rotation={[0,-.33,0]} position={[0,-.17,0]}>
  <ExtrudedProfile points={back} depth={.10} bevelSize={.025} bevelThickness={.02} position={[0,-.25,-.28]}>
   <meshStandardMaterial color={chassis} metalness={.81} roughness={.31}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rail} depth={.07} bevelSize={.005} bevelThickness={.005} position={[0,.29,-.16]}>
   <meshStandardMaterial color={panel} metalness={.91} roughness={.25}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rail} depth={.07} bevelSize={.005} bevelThickness={.005} position={[0,-.73,-.16]}>
   <meshStandardMaterial color={panel} metalness={.91} roughness={.25}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={[[-.30,-.52],[.30,-.52],[.30,.52],[-.30,.52]]} depth={.21} bevelSize={.016} bevelThickness={.018} position={[-.95,-.20,-.06]}>
   <meshStandardMaterial color={dark} metalness={.53} roughness={.37}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={[[-.28,-.45],[.28,-.45],[.28,.45],[-.28,.45]]} depth={.215} bevelSize={.016} bevelThickness={.017} position={[-.31,-.24,-.05]}>
   <meshPhysicalMaterial color={panel} metalness={.25} roughness={.35} clearcoat={.2}/>
  </ExtrudedProfile>
  {[-.01,.34,.69,1.04].map((x,i)=><group key={i}>
   <ExtrudedProfile points={card} depth={.17} bevelSize={.012} bevelThickness={.011} position={[x,-.24,-.045]}>
    <meshStandardMaterial color={i%2===0?chassis:'#64767b'} metalness={.51} roughness={.35}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={[[-.115,-.035],[.115,-.035],[.115,.035],[-.115,.035]]} depth={.025} bevelSize={.004} bevelThickness={.004} position={[x,.165,.057]}>
    <meshStandardMaterial color={connector} metalness={.15} roughness={.38}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={[[-.115,-.035],[.115,-.035],[.115,.035],[-.115,.035]]} depth={.025} bevelSize={.004} bevelThickness={.004} position={[x,-.655,.057]}>
    <meshStandardMaterial color={dark} metalness={.28} roughness={.32}/>
   </ExtrudedProfile>
   {Array.from({length:6},(_,n)=><mesh key={n} position={[x-.08+n*.032,.16,.082]}>
    <boxGeometry args={[.013,.03,.014]}/><meshStandardMaterial color={lead} metalness={.53} roughness={.24}/>
   </mesh>)}
   {Array.from({length:6},(_,n)=><mesh key={n} position={[x-.07+n*.032,-.65,.082]}>
    <boxGeometry args={[.016,.02,.017]}/><meshStandardMaterial color={i%2?signal:connector} metalness={.1} roughness={.28} emissive={n===0?'#2f806d':'#000000'} emissiveIntensity={.38}/>
   </mesh>)}
  </group>)}
  <ExtrudedProfile points={[[-.18,-.20],[.18,-.20],[.18,.20],[-.18,.20]]} depth={.035} bevelSize={.008} bevelThickness={.008} position={[-.31,-.19,.076]}>
   <meshStandardMaterial color={dark} metalness={.28} roughness={.35}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={housing} rotation={[Math.PI/2,0,0]} position={[-1.07,-.6,.09]} radialSegments={8}>
   <meshStandardMaterial color={lead} metalness={.69} roughness={.24}/>
  </RevolvedSurface>
  <RevolvedSurface profile={housing} rotation={[Math.PI/2,0,0]} position={[-.79,-.6,.09]} radialSegments={8}>
   <meshStandardMaterial color={lead} metalness={.69} roughness={.24}/>
  </RevolvedSurface>
  <SplineTube points={[[-1.05,-.67,.10],[-1.03,-.97,.28],[-.66,-1.08,.29],[-.36,-.85,.15]]} radius={.026} tubularSegments={44}>
   <meshStandardMaterial color={signal} roughness={.7}/>
  </SplineTube>
  <SplineTube points={[[-.79,-.66,.10],[-.73,-1.01,.27],[-.34,-1.1,.29],[.03,-.85,.15]]} radius={.024} tubularSegments={44}>
   <meshStandardMaterial color={dark} roughness={.72}/>
  </SplineTube>
  <RevolvedSurface profile={[[0,-.06],[.035,-.06],[.035,.06],[0,.06]]} rotation={[Math.PI/2,0,0]} position={[-.29,.05,.10]}>
   <meshStandardMaterial color={connector} metalness={.21} roughness={.3}/>
  </RevolvedSurface>
 </group>
}
