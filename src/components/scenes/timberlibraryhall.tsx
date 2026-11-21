import { CC0Surface } from '../geometry/CC0Surface'
import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Timber library hall: repetitive laminated timber portal bents,
 * pitched gabled roof, clerestory, continuous bookshelves and library desks.
 * This includes the program of a library rather than a bare architecture box.
 */
const oak='#96714d', paleOak='#c3a27b', roof='#5a4b3e', plaster='#e2d5be', glazing='#a0c0bc', books=['#455f59','#aa7159','#d3ad72','#77706b']
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const gable:Array<[number,number]>=[[-1.43,-.15],[0,.75],[1.43,-.15]]
const aisles=[-.93,-.33,.33,.93]
const beamBays=[-.75,-.2,.35,.9]
const shelfLevels=[-.76,-.45,-.13,.18]
export default function TimberLibraryHall(){
 return <group rotation={[0,-.43,0]} scale={.90} position={[0,-.16,0]}>
  <ExtrudedProfile points={rect(3.2,2.50)} depth={.15} rotation={[Math.PI/2,0,0]} position={[0,-1.36,0]}>
   <CC0Surface texture="oak" />
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.93,1.15)} depth={2.20} position={[0,-.50,-.04]}>
   <CC0Surface texture="plaster" />
  </ExtrudedProfile>
  <ExtrudedProfile points={gable} depth={2.35} position={[0,.39,-.04]}>
   <meshStandardMaterial color={roof} roughness={.62}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={[[-1.18,-.15],[0,.53],[1.18,-.15]]} depth={.025} position={[0,.39,1.16]}>
   <meshPhysicalMaterial color={glazing} transparent opacity={.43} depthWrite={false} roughness={.12} metalness={.08} clearcoat={.66}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(1.44,.08)} depth={.15} position={[0,-.19,1.18]}>
   <meshStandardMaterial color={oak} roughness={.56}/>
  </ExtrudedProfile>
  {beamBays.map(z=><group key={z}>
   <ExtrudedProfile points={rect(.11,1.33)} depth={.11} position={[-1.25,-.39,z]}>
    <CC0Surface texture="oak" />
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.11,1.33)} depth={.11} position={[1.25,-.39,z]}>
    <CC0Surface texture="oak" />
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(2.51,.14)} depth={.12} position={[0,.26,z]}>
    <meshStandardMaterial color={oak} roughness={.52}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(2.44,.08)} depth={.11} position={[0,.70,z]}>
    <meshStandardMaterial color={oak} roughness={.52}/>
   </ExtrudedProfile>
  </group>)}
  {/* Books are independent spines on actual shelf planks, not decorative noise. */}
  {[-1,1].map(side=><group key={side} position={[side*1.03,-.33,-.14]}>
   <ExtrudedProfile points={rect(.37,1.40)} depth={1.62} position={[0,-.17,0]}>
    <meshStandardMaterial color={oak} roughness={.60}/>
   </ExtrudedProfile>
   {shelfLevels.map(y=><group key={y}>
    <ExtrudedProfile points={rect(.41,.055)} depth={1.56} position={[0,y,.02]}>
     <meshStandardMaterial color={paleOak} roughness={.60}/>
    </ExtrudedProfile>
    {Array.from({length:13},(_,i)=><mesh key={i} position={[.01,y+.105,-.64+i*.102]}>
     <boxGeometry args={[.25,.17+((i%3)*.03),.052]}/>
     <meshStandardMaterial color={books[(i+Math.round((y+1)*10))%books.length]} roughness={.85}/>
    </mesh>)}
   </group>)}
  </group>)}
  {aisles.map((x,i)=><group key={i}>
   <ExtrudedProfile points={rect(.34,.075)} depth={.75} position={[x,-.81,.65]}>
    <meshStandardMaterial color={paleOak} roughness={.52}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.07,.43)} depth={.07} position={[x,-1.03,.43]}>
    <meshStandardMaterial color={oak} roughness={.60}/>
   </ExtrudedProfile>
   <RevolvedSurface profile={[[0,-.05],[.09,-.05],[.09,.05],[0,.05]]} position={[x,-.72,.66]}>
    <meshStandardMaterial color={oak} roughness={.53}/>
   </RevolvedSurface>
  </group>)}
  <ExtrudedProfile points={rect(.77,.88)} depth={.025} position={[0,-.78,1.19]}>
   <meshPhysicalMaterial color={glazing} transparent opacity={.34} depthWrite={false} roughness={.09} clearcoat={.7}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(.048,.95)} depth={.042} position={[0,-.76,1.22]}>
   <meshStandardMaterial color={oak} roughness={.60}/>
  </ExtrudedProfile>
  <SplineTube points={[[-1.24,.23,1.17],[-.62,.24,1.17],[0,.24,1.17],[.64,.24,1.17],[1.24,.23,1.17]]} radius={.015}>
   <meshStandardMaterial color={oak} roughness={.58}/>
  </SplineTube>
 </group>
}
