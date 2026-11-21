import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Open-air sculptural courtyard, three art pieces on real gallery plinths,
 * architectural colonnade and a separated gravel garden. The three pieces
 * have distinct constructive techniques rather than one shared blob.
 */
const limestone='#c8baa5', gravel='#9e9e90', dark='#38474b', bronze='#a78c66', travertine='#e0d4be', oxidized='#57847c'
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,h/2],[w/2,h/2],[-w/2,-h/2]]
const square=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const columns=[-1.27,-.76,-.25,.26,.77,1.28]
export default function SculptureGalleryCourtyard(){
 return <group rotation={[0,-.46,0]} scale={.94} position={[0,-.11,0]}>
  <ExtrudedProfile points={square(3.26,2.37)} depth={.15} rotation={[Math.PI/2,0,0]} position={[0,-1.42,0]}>
   <meshStandardMaterial color={limestone} roughness={.84}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={square(2.78,1.80)} depth={.05} rotation={[Math.PI/2,0,0]} position={[0,-1.31,.17]}>
   <meshStandardMaterial color={gravel} roughness={.94}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={square(3.2,1.70)} depth={.11} position={[0,.06,-.92]}>
   <meshStandardMaterial color={travertine} roughness={.76}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={square(3.32,.14)} depth={1.64} position={[0,.88,-.23]}>
   <meshStandardMaterial color={limestone} roughness={.64}/>
  </ExtrudedProfile>
  {columns.map(x=><group key={x}>
   <RevolvedSurface profile={[[0,-.89],[.095,-.89],[.085,.86],[0,.86]]} position={[x,-.05,.54]} radialSegments={20}>
    <meshPhysicalMaterial color={travertine} metalness={.01} roughness={.56}/>
   </RevolvedSurface>
   <RevolvedSurface profile={[[0,-.05],[.16,-.05],[.16,.05],[0,.05]]} position={[x,.84,.54]}>
    <meshStandardMaterial color={bronze} metalness={.49} roughness={.35}/>
   </RevolvedSurface>
  </group>)}
  {[-.84,0,.84].map((x,i)=><group key={i}>
   <ExtrudedProfile points={square(.67,.24)} depth={.57} position={[x,-1.05,.15]}>
    <meshStandardMaterial color={travertine} roughness={.64}/>
   </ExtrudedProfile>
   {i===0&&<group>
    <mesh position={[0,-.51,.12]} rotation={[.25,.32,0]}><torusKnotGeometry args={[.26,.069,96,14,2,3]}/><meshPhysicalMaterial color={bronze} metalness={.88} roughness={.26}/></mesh>
    <mesh position={[0,-.44,.12]}><torusGeometry args={[.19,.038,12,42]}/><meshStandardMaterial color={dark} metalness={.64} roughness={.35}/></mesh>
   </group>}
   {i===1&&<group>
    <ExtrudedProfile points={[[-.20,-.33],[0,.47],[.21,-.33]]} depth={.18} bevelSize={.036} bevelThickness={.030} position={[0,-.51,.05]}>
     <meshPhysicalMaterial color={oxidized} metalness={.79} roughness={.34}/>
    </ExtrudedProfile>
    <SplineTube points={[[-.20,-.74,.18],[.05,-.28,.22],[.25,-.69,.18]]} radius={.034}>
     <meshStandardMaterial color={bronze} metalness={.75} roughness={.31}/>
    </SplineTube>
   </group>}
   {i===2&&<group>
    <RevolvedSurface profile={[[0,-.32],[.19,-.32],[.27,-.11],[.11,.14],[.17,.33],[0,.39]]} position={[0,-.49,.07]} radialSegments={48}>
     <meshPhysicalMaterial color={dark} metalness={.77} roughness={.24} clearcoat={.18}/>
    </RevolvedSurface>
    <RevolvedSurface profile={[[0,-.055],[.055,-.055],[.055,.055],[0,.055]]} position={[0,-.10,.07]} radialSegments={16}>
     <meshStandardMaterial color={bronze} metalness={.91} roughness={.24}/>
    </RevolvedSurface>
   </group>}
  </group>)}
  {[-1.44,1.44].map(x=><group key={x}>
   <ExtrudedProfile points={square(.24,.18)} depth={.28} position={[x,-1.12,.88]}>
    <meshStandardMaterial color={limestone} roughness={.71}/>
   </ExtrudedProfile>
   <mesh position={[x,-.83,.88]}><dodecahedronGeometry args={[.26,1]}/><meshStandardMaterial color={oxidized} roughness={.95}/></mesh>
  </group>)}
  <SplineTube points={[[-1.50,.94,.65],[-.74,.95,.65],[0,.95,.65],[.76,.95,.65],[1.50,.94,.65]]} radius={.018}>
   <meshStandardMaterial color={dark} metalness={.66} roughness={.35}/>
  </SplineTube>
 </group>
}
