import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Timber-and-steel pedestrian footbridge to a raised viewing platform.
 * The main bridge, vertical tower, steps, diagonal braces and guardrails
 * are separate structural components; not certified engineering geometry.
 */
const steel='#495963', timber='#ac906b', landing='#bfa987', railing='#37494e', foundations='#8a8a80', brass='#cbb476'
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const deckStations=Array.from({length:13},(_,i)=>i)
const rails=[-1,1]
const steps=Array.from({length:8},(_,i)=>i)
const poles=[-1.45,-1.04,-.62,-.20,.22,.64,1.07]
export default function FootbridgeLookoutTower(){
 return <group rotation={[0,-.47,0]} scale={.89} position={[0,-.01,0]}>
  <ExtrudedProfile points={rect(3.65,2.14)} depth={.17} rotation={[Math.PI/2,0,0]} position={[0,-1.40,-.10]}>
   <meshStandardMaterial color={foundations} roughness={.88}/>
  </ExtrudedProfile>
  {/* Bridge deck rises toward a separate lookout tower. */}
  <ExtrudedProfile points={rect(2.74,.13)} depth={.74} position={[-.35,-.47,-.20]}>
   <meshStandardMaterial color={timber} roughness={.62}/>
  </ExtrudedProfile>
  {deckStations.map(i=><ExtrudedProfile key={i} points={rect(.08,.07)} depth={.75} position={[-1.65+i*.215,-.36,-.20]}>
   <meshStandardMaterial color={landing} roughness={.71}/>
  </ExtrudedProfile>)}
  {rails.map(side=><group key={side}>
   <ExtrudedProfile points={rect(2.93,.046)} depth={.06} position={[-.34,.12,-.20+side*.41]}>
    <meshStandardMaterial color={railing} metalness={.68} roughness={.31}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(2.93,.046)} depth={.06} position={[-.34,-.13,-.20+side*.41]}>
    <meshStandardMaterial color={railing} metalness={.68} roughness={.31}/>
   </ExtrudedProfile>
   {poles.map(x=><ExtrudedProfile key={x} points={rect(.042,.59)} depth={.055} position={[x,-.10,-.20+side*.40]}>
    <meshStandardMaterial color={railing} metalness={.67} roughness={.32}/>
   </ExtrudedProfile>)}
  </group>)}
  {/* Tower: isolated foundation, four columns, elevated deck, roof. */}
  <ExtrudedProfile points={rect(1.12,.13)} depth={1.10} position={[1.19,-1.11,-.14]}>
   <meshStandardMaterial color={steel} metalness={.70} roughness={.34}/>
  </ExtrudedProfile>
  {[-1,1].flatMap(x=>[-1,1].map(z=><group key={x+':'+z}>
   <ExtrudedProfile points={rect(.10,2.20)} depth={.10} position={[1.18+x*.50,-.16,-.14+z*.47]}>
    <meshStandardMaterial color={steel} metalness={.72} roughness={.34}/>
   </ExtrudedProfile>
   <RevolvedSurface profile={[[0,-.06],[.095,-.06],[.095,.06],[0,.06]]} position={[1.18+x*.50,-1.23,-.14+z*.47]} radialSegments={10}>
    <meshStandardMaterial color={foundations} roughness={.83}/>
   </RevolvedSurface>
  </group>))}
  <ExtrudedProfile points={rect(1.32,.12)} depth={1.30} rotation={[Math.PI/2,0,0]} position={[1.18,.45,-.14]}>
   <meshStandardMaterial color={timber} roughness={.65}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(1.45,.11)} depth={1.44} position={[1.18,.98,-.14]}>
   <meshPhysicalMaterial color={steel} metalness={.64} roughness={.32} clearcoat={.18} clearcoatRoughness={.4}/>
  </ExtrudedProfile>
  {[-1,1].map(z=><group key={z}>
   <ExtrudedProfile points={rect(1.27,.048)} depth={.075} position={[1.18,.85,-.14+z*.59]}>
    <meshStandardMaterial color={railing} metalness={.71} roughness={.31}/>
   </ExtrudedProfile>
   {[-.5,0,.5].map(x=><ExtrudedProfile key={x} points={rect(.044,.43)} depth={.05} position={[1.18+x,.64,-.14+z*.59]}>
    <meshStandardMaterial color={railing} metalness={.70} roughness={.32}/>
   </ExtrudedProfile>)}
  </group>)}
  {/* Flight of steps from ground level to walkway deck. */}
  {steps.map(i=><ExtrudedProfile key={i} points={rect(.83,.095)} depth={.41+i*.042} rotation={[Math.PI/2,0,0]} position={[-1.31+i*.16,-1.29+i*.112,.48]}>
   <meshStandardMaterial color={landing} roughness={.73}/>
  </ExtrudedProfile>)}
  <ExtrudedProfile points={rect(.30,.06)} depth={.60} position={[1.18,.40,-.12]}>
   <meshStandardMaterial color={brass} roughness={.49} metalness={.49}/>
  </ExtrudedProfile>
  <SplineTube points={[[-1.69,-.39,.35],[-1.20,-.16,.38],[-.67,.12,.39],[-.10,.19,.39],[.50,.25,.39]]} radius={.024} tubularSegments={60}>
   <meshStandardMaterial color={railing} metalness={.71} roughness={.32}/>
  </SplineTube>
 </group>
}
