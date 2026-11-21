import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Street-level bus stop: curved cantilever shade, independently framed glass
 * windscreen, accessible seating, timetable, stop pole and curb. Unlike rail,
 * there are no tracks, sleepers or platform columns.
 */
const graphite='#414c54', aluminium='#a9b9ba', teal='#438c96', glass='#89b5bd', seat='#967757', concrete='#b6b0a5', signal='#c7ac63'
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const ribs=[-1.22,-.62,0,.62,1.22]
const roofSection:Array<[number,number]>=[[-1.50,.42],[-1.43,.59],[-.65,.69],[.65,.69],[1.37,.57],[1.50,.40]]
export default function UrbanBusPavilion(){
 return <group rotation={[0,-.35,0]} scale={.92} position={[0,-.16,0]}>
  <ExtrudedProfile points={rect(3.36,2.16)} depth={.14} rotation={[Math.PI/2,0,0]} position={[0,-1.34,.05]}>
   <meshStandardMaterial color={concrete} roughness={.88}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.25,.15)} depth={.035} rotation={[Math.PI/2,0,0]} position={[0,-1.22,1.04]}>
   <meshStandardMaterial color={signal} roughness={.80}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.26,.10)} depth={.19} position={[0,-1.28,1.13]}>
   <meshStandardMaterial color={graphite} roughness={.73}/>
  </ExtrudedProfile>
  {/* Side windscreens stay transparent; the street side stays open. */}
  {[-1.25,1.25].map(side=><group key={side}>
   <ExtrudedProfile points={rect(.06,1.40)} depth={.09} position={[side,-.32,-.56]}>
    <meshStandardMaterial color={graphite} metalness={.71} roughness={.35}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.017,1.34)} depth={.95} position={[side*1.01,-.33,-.08]}>
    <meshPhysicalMaterial color={glass} transparent opacity={.27} depthWrite={false} roughness={.06} clearcoat={.9}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.042,1.34)} depth={.04} position={[side,-.32,.43]}>
    <meshStandardMaterial color={graphite} metalness={.73} roughness={.29}/>
   </ExtrudedProfile>
  </group>)}
  <ExtrudedProfile points={rect(2.52,1.21)} depth={.020} position={[0,-.32,-.57]}>
   <meshPhysicalMaterial color={glass} transparent opacity={.25} depthWrite={false} roughness={.08} clearcoat={.85}/>
  </ExtrudedProfile>
  {ribs.map(x=><ExtrudedProfile key={x} points={rect(.07,1.42)} depth={.07} position={[x,-.29,-.58]}>
   <meshStandardMaterial color={graphite} metalness={.79} roughness={.29}/>
  </ExtrudedProfile>)}
  <ExtrudedProfile points={roofSection} depth={1.38} position={[0,.79,-.08]}>
   <meshPhysicalMaterial color={teal} metalness={.46} roughness={.32} clearcoat={.25}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.08,.048)} depth={.11} position={[0,1.28,-.36]}>
   <meshStandardMaterial color={aluminium} metalness={.79} roughness={.28}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(1.58,.095)} depth={.46} position={[-.28,-.77,-.15]}>
   <meshStandardMaterial color={seat} roughness={.59}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(1.56,.40)} depth={.10} position={[-.28,-.53,-.39]}>
   <meshStandardMaterial color={seat} roughness={.58}/>
  </ExtrudedProfile>
  {[-.90,.34].map(x=><group key={x}>
   <ExtrudedProfile points={rect(.066,.56)} depth={.43} position={[x,-1.04,-.11]}>
    <meshStandardMaterial color={graphite} metalness={.63} roughness={.34}/>
   </ExtrudedProfile>
  </group>)}
  {/* Route plate, timetable and pole are separate bus-specific objects. */}
  <RevolvedSurface profile={[[0,-1.2],[.05,-1.2],[.05,1.2],[0,1.2]]} position={[1.53,-.11,.69]} radialSegments={16}>
   <meshStandardMaterial color={aluminium} metalness={.80} roughness={.27}/>
  </RevolvedSurface>
  <ExtrudedProfile points={rect(.38,.43)} depth={.045} position={[1.53,.78,.72]}>
   <meshStandardMaterial color={teal} roughness={.32} metalness={.38}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(.30,.08)} depth={.05} position={[1.53,.90,.76]}>
   <meshStandardMaterial color={aluminium} metalness={.48} roughness={.32}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(.29,.39)} depth={.018} position={[.77,-.38,-.50]}>
   <meshStandardMaterial color={aluminium} roughness={.42}/>
  </ExtrudedProfile>
  {Array.from({length:7},(_,i)=><ExtrudedProfile key={i} points={rect(.23,.015)} depth={.009} position={[.77,-.23-i*.038,-.481]}>
   <meshStandardMaterial color={graphite} roughness={.55}/>
  </ExtrudedProfile>)}
  <SplineTube points={[[-1.36,.79,-.55],[-.65,.81,-.58],[0,.80,-.57],[.70,.81,-.58],[1.36,.79,-.55]]} radius={.017}>
   <meshStandardMaterial color={graphite} metalness={.76} roughness={.29}/>
  </SplineTube>
 </group>
}
