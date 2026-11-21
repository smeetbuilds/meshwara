import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Recognizable electric-vehicle service bay with four-post lift, battery
 * skateboard chassis and rolling diagnostics cart. Illustrative workshop,
 * not high-voltage servicing instructions or real safety documentation.
 */
const steel='#6c8086', yellow='#d8a950', tire='#2c353a', battery='#354b57', orange='#df8850', concrete='#a7aaa5', pad='#d4dcda'
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const pillars=[-1.22,1.22]
const wheels=[-.84,.86]
export default function ElectricVehicleWorkshop(){
 return <group rotation={[0,-.39,0]} scale={.93} position={[0,-.14,0]}>
  <ExtrudedProfile points={rect(3.35,2.3)} depth={.14} rotation={[Math.PI/2,0,0]} position={[0,-1.44,0]}>
   <meshStandardMaterial color={concrete} roughness={.88}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.35,1.55)} depth={.10} position={[0,.14,-.92]}>
   <meshStandardMaterial color={pad} roughness={.80}/>
  </ExtrudedProfile>
  {pillars.map(x=><group key={x}>
   <ExtrudedProfile points={rect(.15,2.18)} depth={.18} position={[x,-.20,-.52]}>
    <meshPhysicalMaterial color={steel} metalness={.66} roughness={.3}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.22,.22)} depth={.22} position={[x,-1.29,-.52]}>
    <meshStandardMaterial color={yellow} roughness={.49}/>
   </ExtrudedProfile>
   {Array.from({length:5},(_,n)=><mesh key={n} position={[x,-.73+n*.31,-.39]}>
    <boxGeometry args={[.06,.07,.025]}/><meshStandardMaterial color={yellow} roughness={.41}/>
   </mesh>)}
  </group>)}
  <ExtrudedProfile points={rect(2.67,.11)} depth={.12} position={[0,.79,-.52]}>
   <meshStandardMaterial color={yellow} metalness={.46} roughness={.32}/>
  </ExtrudedProfile>
  {/* A lifting rail carries an EV battery skateboard, not a generic vehicle blob. */}
  <ExtrudedProfile points={rect(2.31,.14)} depth={.99} position={[0,-.73,-.08]}>
   <meshPhysicalMaterial color={steel} metalness={.67} roughness={.32}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.08,.12)} depth={.79} position={[0,-.49,-.08]}>
   <meshPhysicalMaterial color={battery} metalness={.60} roughness={.29} clearcoat={.18}/>
  </ExtrudedProfile>
  {Array.from({length:13},(_,i)=><mesh key={i} position={[-.92+i*.15,-.37,-.08]}>
   <boxGeometry args={[.028,.028,.71]}/>
   <meshStandardMaterial color={orange} metalness={.52} roughness={.34}/>
  </mesh>)}
  {wheels.flatMap(x=>[-.58,.52].map(z=><group key={x+':'+z}>
   <RevolvedSurface profile={[[0,-.14],[.22,-.14],[.25,-.1],[.25,.1],[.22,.14],[0,.14]]} rotation={[Math.PI/2,0,0]} position={[x,-.63,z]} radialSegments={32}>
    <meshPhysicalMaterial color={tire} metalness={.05} roughness={.88}/>
   </RevolvedSurface>
   <RevolvedSurface profile={[[0,-.06],[.095,-.06],[.095,.06],[0,.06]]} rotation={[Math.PI/2,0,0]} position={[x,-.63,z+.11]}>
    <meshStandardMaterial color={steel} metalness={.88} roughness={.25}/>
   </RevolvedSurface>
  </group>))}
  <ExtrudedProfile points={rect(.43,.83)} depth={.33} position={[1.42,-.56,.53]}>
   <meshPhysicalMaterial color={pad} metalness={.42} roughness={.37}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(.36,.29)} depth={.032} position={[1.42,-.36,.72]}>
   <meshStandardMaterial color={battery} emissive="#244f5c" emissiveIntensity={.28}/>
  </ExtrudedProfile>
  <SplineTube points={[[1.42,-.69,.69],[1.16,-.89,.77],[.77,-.93,.66],[.55,-.64,.37]]} radius={.032}>
   <meshStandardMaterial color={orange} roughness={.73}/>
  </SplineTube>
  {[-1,1].map(side=><RevolvedSurface key={side} profile={[[0,-.08],[.07,-.08],[.07,.08],[0,.08]]} rotation={[Math.PI/2,0,0]} position={[1.42+side*.16,-1.13,.73]}>
   <meshStandardMaterial color={tire} roughness={.83}/>
  </RevolvedSurface>)}
 </group>
}
