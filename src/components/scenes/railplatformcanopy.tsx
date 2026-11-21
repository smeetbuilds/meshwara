import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Railway platform: two rails on sleepers, distinct tactile platform edge,
 * slender steel canopy portal frames, seating and route sign.
 * This is a station architectural illustration, not rail-code CAD.
 */
const beam='#526167', metal='#aeb7b4', roof='#526b73', stone='#b3ada0', track='#57463d', yellow='#d9b65c', glass='#81afb8'
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const frames=[-1.23,-.62,0,.62,1.23]
const sleepers=Array.from({length:19},(_,i)=>-1.33+i*.147)
export default function RailPlatformCanopy(){
 return <group rotation={[0,-.35,0]} scale={.92} position={[0,-.16,0]}>
  <ExtrudedProfile points={rect(3.14,2.13)} depth={.17} rotation={[Math.PI/2,0,0]} position={[0,-1.35,0]}>
   <meshStandardMaterial color={stone} roughness={.86}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.0,.97)} depth={.18} rotation={[Math.PI/2,0,0]} position={[0,-1.16,-.44]}>
   <meshStandardMaterial color={stone} roughness={.72}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.0,.13)} depth={.04} rotation={[Math.PI/2,0,0]} position={[0,-1.04,.01]}>
   <meshStandardMaterial color={yellow} roughness={.78}/>
  </ExtrudedProfile>
  {/* A genuine pair of continuous rail heads and spaced timber sleepers. */}
  {[-.57,.01].map(z=><group key={z}>
   <ExtrudedProfile points={rect(3.07,.075)} depth={.09} position={[0,-1.13,.62+z]}>
    <meshStandardMaterial color={metal} metalness={.88} roughness={.26}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(3.07,.028)} depth={.12} position={[0,-1.06,.62+z]}>
    <meshStandardMaterial color={beam} metalness={.90} roughness={.22}/>
   </ExtrudedProfile>
  </group>)}
  {sleepers.map(x=><ExtrudedProfile key={x} points={rect(.08,.08)} depth={.85} position={[x,-1.26,.33]}>
   <meshStandardMaterial color={track} roughness={.88}/>
  </ExtrudedProfile>)}
  {frames.map(x=><group key={x}>
   <ExtrudedProfile points={rect(.078,1.52)} depth={.09} position={[x,-.30,-.75]}>
    <meshStandardMaterial color={beam} metalness={.79} roughness={.30}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.078,1.52)} depth={.09} position={[x,-.30,.18]}>
    <meshStandardMaterial color={beam} metalness={.79} roughness={.30}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.073,.08)} depth={1.38} position={[x,.51,-.25]}>
    <meshStandardMaterial color={beam} metalness={.76} roughness={.33}/>
   </ExtrudedProfile>
   <RevolvedSurface profile={[[0,-.06],[.08,-.06],[.08,.06],[0,.06]]} position={[x,.44,-.80]} radialSegments={12}>
    <meshStandardMaterial color={yellow} metalness={.48} roughness={.28}/>
   </RevolvedSurface>
  </group>)}
  <ExtrudedProfile points={rect(3.22,.10)} depth={1.65} position={[0,.74,-.24]}>
   <meshStandardMaterial color={roof} metalness={.56} roughness={.37}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.14,.035)} depth={1.56} position={[0,.82,-.24]}>
   <meshPhysicalMaterial color={glass} transparent opacity={.34} depthWrite={false} roughness={.09} clearcoat={.79}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(.98,.18)} depth={.075} position={[0,.31,-.74]}>
   <meshStandardMaterial color={beam} metalness={.74} roughness={.32}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(.60,.07)} depth={.30} position={[-.32,-.68,-.51]}>
   <meshStandardMaterial color={metal} metalness={.66} roughness={.39}/>
  </ExtrudedProfile>
  {[-.56,-.11].map(x=><ExtrudedProfile key={x} points={rect(.07,.37)} depth={.28} position={[x,-.87,-.50]}>
   <meshStandardMaterial color={beam} metalness={.79} roughness={.30}/>
  </ExtrudedProfile>)}
  <SplineTube points={[[-1.46,.83,.61],[-.76,.83,.61],[0,.83,.61],[.78,.83,.61],[1.47,.83,.61]]} radius={.016}>
   <meshStandardMaterial color={beam} metalness={.77} roughness={.31}/>
  </SplineTube>
 </group>
}
