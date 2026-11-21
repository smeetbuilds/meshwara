import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** A machine-tool milling vise with discrete fixed/sliding jaws, leadscrew,
 * dovetail ways, serrated replaceable jaw plates, and clamping slots.
 * Every subassembly follows the expected working mechanics of a milling vise.
 */
const iron='#485b66', hardened='#9aa7ab', jaw='#b9c5c4', black='#272f32', brass='#d5a964', scale='#8ea0a4'
const baseOutline:Array<[number,number]>=[[-1.24,-.18],[1.24,-.18],[1.27,.12],[1.06,.19],[-1.06,.19],[-1.27,.12]]
const jawOutline:Array<[number,number]>=[[-.19,-.33],[.19,-.33],[.23,.27],[.15,.34],[-.15,.34],[-.23,.27]]
const railOutline:Array<[number,number]>=[[-1.13,-.08],[1.13,-.08],[1.11,.08],[-1.11,.08]]
const latheScrew:Array<[number,number]>=[[0,-.89],[.065,-.89],[.074,-.82],[.074,.82],[.065,.89],[0,.89]]
const knobProfile:Array<[number,number]>=[[0,-.14],[.14,-.14],[.15,-.08],[.15,.08],[.14,.14],[0,.14]]
export default function PrecisionMillingVice(){
 return <group rotation={[0,-.36,0]} position={[0,.06,0]}>
  <ExtrudedProfile points={baseOutline} depth={.88} bevelSize={.026} bevelThickness={.028} position={[0,-1.23,0]}>
   <meshStandardMaterial color={iron} metalness={.83} roughness={.31}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={railOutline} depth={.15} bevelSize={.008} bevelThickness={.008} position={[0,-.96,-.29]}>
   <meshStandardMaterial color={hardened} metalness={.88} roughness={.25}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={railOutline} depth={.15} bevelSize={.008} bevelThickness={.008} position={[0,-.96,.29]}>
   <meshStandardMaterial color={hardened} metalness={.88} roughness={.25}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={jawOutline} depth={.82} bevelSize={.018} bevelThickness={.018} position={[-.91,-.52,0]}>
   <meshStandardMaterial color={iron} metalness={.72} roughness={.3}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={jawOutline} depth={.82} bevelSize={.018} bevelThickness={.018} position={[.57,-.52,0]}>
   <meshStandardMaterial color={iron} metalness={.72} roughness={.3}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={[[-.05,-.29],[.05,-.29],[.05,.25],[-.05,.25]]} depth={.83} bevelSize={.006} bevelThickness={.007} position={[-.65,-.48,0]}>
   <meshStandardMaterial color={jaw} metalness={.84} roughness={.29}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={[[-.05,-.29],[.05,-.29],[.05,.25],[-.05,.25]]} depth={.83} bevelSize={.006} bevelThickness={.007} position={[.31,-.48,0]}>
   <meshStandardMaterial color={jaw} metalness={.84} roughness={.29}/>
  </ExtrudedProfile>
  {Array.from({length:14},(_,i)=>i).map(i=><group key={i}>
   <mesh position={[-.58,-.68+i*.039,0]}><boxGeometry args={[.006,.011,.76]}/><meshStandardMaterial color={black} metalness={.5} roughness={.52}/></mesh>
   <mesh position={[.24,-.68+i*.039,0]}><boxGeometry args={[.006,.011,.76]}/><meshStandardMaterial color={black} metalness={.5} roughness={.52}/></mesh>
  </group>)}
  <RevolvedSurface profile={latheScrew} rotation={[0,0,Math.PI/2]} position={[.32,-1.05,0]} radialSegments={36}>
   <meshStandardMaterial color={hardened} metalness={.86} roughness={.25}/>
  </RevolvedSurface>
  <RevolvedSurface profile={knobProfile} rotation={[0,0,Math.PI/2]} position={[1.2,-1.05,0]}>
   <meshPhysicalMaterial color={black} metalness={.55} roughness={.28} clearcoat={.3}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.47],[.045,-.47],[.045,.47],[0,.47]]} rotation={[Math.PI/2,0,0]} position={[1.39,-1.05,0]}>
   <meshStandardMaterial color={hardened} metalness={.89} roughness={.25}/>
  </RevolvedSurface>
  {[-1,1].map(v=><mesh key={v} position={[1.39,-1.05,v*.5]}><sphereGeometry args={[.07,18,12]}/><meshStandardMaterial color={brass} metalness={.75} roughness={.22}/></mesh>)}
  {[-1,1].map(z=><group key={z}>
   <ExtrudedProfile points={[[-.25,-.09],[.25,-.09],[.25,.09],[-.25,.09]]} depth={.22} bevelSize={.012} bevelThickness={.012} position={[-.85,-1.36,z*.42]}>
    <meshStandardMaterial color={iron} metalness={.75} roughness={.29}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={[[-.25,-.09],[.25,-.09],[.25,.09],[-.25,.09]]} depth={.22} bevelSize={.012} bevelThickness={.012} position={[.85,-1.36,z*.42]}>
    <meshStandardMaterial color={iron} metalness={.75} roughness={.29}/>
   </ExtrudedProfile>
  </group>)}
  <SplineTube points={[[-1.12,-1.19,-.46],[-.73,-1.21,-.48],[-.29,-1.22,-.47]]} radius={.011} tubularSegments={22}>
   <meshStandardMaterial color={scale} metalness={.62} roughness={.39}/>
  </SplineTube>
 </group>
}
