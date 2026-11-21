import { CC0Surface } from '../geometry/CC0Surface'
import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Low museum wing with a colonnaded covered walk, clearstory ribbon,
 * roof skylight strips, open exhibition vestibule and independent plinths.
 * A curated architectural visualization, not buildable BIM.
 */
const travertine='#c5bca8', shadow='#434f54', bronze='#9b8768', glass='#87b4b9', flooring='#b2a994', gallery='#ede5d6'
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const columns=[-1.3,-.91,-.52,-.13,.26,.65,1.04,1.43]
const skylights=[-1.07,-.53,.01,.55,1.09]
const art=[[-.89,-.44],[-.20,-.44],[.61,-.44]] as Array<[number,number]>
export default function MuseumWingStudy(){
 return <group rotation={[0,-.47,0]} scale={.91} position={[0,-.24,0]}>
  <ExtrudedProfile points={rect(3.46,2.12)} depth={.17} rotation={[Math.PI/2,0,0]} position={[0,-1.28,0]}>
   <CC0Surface texture="concrete" />
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.22,1.35)} depth={1.18} position={[0,-.42,-.47]}>
   <CC0Surface texture="plaster" />
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.34,.15)} depth={1.64} position={[0,.41,-.20]}>
   <meshStandardMaterial color={travertine} roughness={.58}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.65,.075)} depth={1.88} position={[.05,.54,-.18]}>
   <meshStandardMaterial color={bronze} metalness={.35} roughness={.39}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.92,.31)} depth={.035} position={[0,.23,.145]}>
   <meshPhysicalMaterial color={glass} transparent opacity={.36} depthWrite={false} metalness={.09} roughness={.10} clearcoat={.84}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.97,.04)} depth={.06} position={[0,.07,.155]}>
   <meshStandardMaterial color={shadow} metalness={.68} roughness={.31}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.97,.04)} depth={.06} position={[0,.41,.155]}>
   <meshStandardMaterial color={shadow} metalness={.68} roughness={.31}/>
  </ExtrudedProfile>
  {skylights.map(x=><group key={x}>
   <ExtrudedProfile points={rect(.39,.62)} depth={.025} rotation={[Math.PI/2,0,0]} position={[x,.57,-.37]}>
    <meshPhysicalMaterial color={glass} transparent opacity={.46} depthWrite={false} roughness={.12} clearcoat={1}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.045,.75)} depth={.06} rotation={[Math.PI/2,0,0]} position={[x+.23,.60,-.37]}>
    <meshStandardMaterial color={shadow} metalness={.74} roughness={.28}/>
   </ExtrudedProfile>
  </group>)}
  {/* Exterior colonnade and overhead canopy lead to a real entry void. */}
  {columns.map(x=><group key={x}>
   <RevolvedSurface profile={[[0,-.57],[.077,-.57],[.069,.54],[0,.54]]} position={[x,-.47,1.05]} radialSegments={16}>
    <meshStandardMaterial color={travertine} roughness={.56}/>
   </RevolvedSurface>
   <RevolvedSurface profile={[[0,-.04],[.11,-.04],[.11,.04],[0,.04]]} position={[x,.12,1.05]} radialSegments={16}>
    <meshStandardMaterial color={bronze} metalness={.34} roughness={.42}/>
   </RevolvedSurface>
  </group>)}
  <ExtrudedProfile points={rect(3.23,.12)} depth={.56} position={[0,.16,.86]}>
   <meshStandardMaterial color={travertine} roughness={.63}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(.68,1.06)} depth={.018} position={[0,-.52,.138]}>
   <meshPhysicalMaterial color={glass} transparent opacity={.32} depthWrite={false} roughness={.14} clearcoat={1}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(.05,1.07)} depth={.042} position={[0,-.53,.159]}>
   <meshStandardMaterial color={shadow} metalness={.68} roughness={.33}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.40,.10)} depth={.53} rotation={[Math.PI/2,0,0]} position={[0,-1.12,1.03]}>
   <meshStandardMaterial color={flooring} roughness={.76}/>
  </ExtrudedProfile>
  {art.map(([x,z],i)=><group key={i} position={[x,-1.0,z]}>
   <ExtrudedProfile points={rect(.25,.09)} depth={.25} position={[0,.07,0]}>
    <meshStandardMaterial color={travertine} roughness={.54}/>
   </ExtrudedProfile>
   <RevolvedSurface profile={[[0,-.15],[.09,-.15],[.16,.03],[.08,.16],[0,.20]]} position={[0,.34,0]} radialSegments={18}>
    <meshPhysicalMaterial color={i%2===0?bronze:shadow} metalness={i%2===0?.66:.43} roughness={.34}/>
   </RevolvedSurface>
  </group>)}
  <SplineTube points={[[-1.58,-1.17,1.31],[-.88,-1.15,1.31],[0,-1.16,1.31],[.90,-1.15,1.31],[1.62,-1.16,1.31]]} radius={.015}>
   <meshStandardMaterial color={bronze} metalness={.58} roughness={.32}/>
  </SplineTube>
 </group>
}
