import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** C-mount industrial vision camera: machined camera chassis, concentric
 * focusing lens barrels, glass front element, mounting bracket, trigger and
 * network connectors, status LEDs and constrained cable strain relief.
 */
const housing='#45616e', steel='#b3c4c9', black='#242f36', glass='#567b94', trim='#d5a85d', light='#65c9a6'
const enclosure:Array<[number,number]>=[[-.59,-.50],[.59,-.50],[.59,.50],[-.59,.50]]
const bracket:Array<[number,number]>=[[-.49,-.10],[.49,-.10],[.49,.10],[-.49,.10]]
const bezel:Array<[number,number]>=[[0,-.10],[.38,-.10],[.38,.10],[0,.10]]
const optic:Array<[number,number]>=[[0,-.21],[.37,-.21],[.37,-.15],[.31,-.15],[.31,.18],[.27,.21],[0,.21]]
const focus:Array<[number,number]>=[[0,-.2],[.30,-.2],[.34,-.17],[.34,.18],[.30,.2],[0,.2]]
const aperture:Array<[number,number]>=[[0,-.015],[.24,-.015],[.24,.015],[0,.015]]
export default function MachineVisionCamera(){
 return <group rotation={[0,-.31,0]} position={[0,-.20,0]}>
  <ExtrudedProfile points={enclosure} depth={.94} bevelSize={.045} bevelThickness={.04} position={[0,.22,0]}>
   <meshPhysicalMaterial color={housing} metalness={.64} roughness={.27} clearcoat={.21}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={enclosure.map(([x,y])=>[x*.92,y*.94] as [number,number])} depth={.025} bevelSize={.025} bevelThickness={.015} position={[0,.22,.5]}>
   <meshStandardMaterial color={black} metalness={.61} roughness={.3}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={bracket} depth={.82} bevelSize={.016} bevelThickness={.013} position={[0,-.45,-.13]}>
   <meshStandardMaterial color={steel} metalness={.85} roughness={.26}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={[[-.08,-.65],[.08,-.65],[.08,.65],[-.08,.65]]} depth={.28} bevelSize={.015} bevelThickness={.012} position={[0,-1.10,-.45]}>
   <meshStandardMaterial color={steel} metalness={.85} roughness={.27}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={bezel} rotation={[Math.PI/2,0,0]} position={[0,.22,.55]} radialSegments={40}>
   <meshStandardMaterial color={steel} metalness={.91} roughness={.22}/>
  </RevolvedSurface>
  <RevolvedSurface profile={optic} rotation={[Math.PI/2,0,0]} position={[0,.22,.72]} radialSegments={48}>
   <meshPhysicalMaterial color={black} metalness={.61} roughness={.23} clearcoat={.3}/>
  </RevolvedSurface>
  <RevolvedSurface profile={focus} rotation={[Math.PI/2,0,0]} position={[0,.22,1.03]} radialSegments={48}>
   <meshStandardMaterial color={steel} metalness={.92} roughness={.25}/>
  </RevolvedSurface>
  <RevolvedSurface profile={aperture} rotation={[Math.PI/2,0,0]} position={[0,.22,1.26]} radialSegments={48}>
   <meshPhysicalMaterial color={glass} metalness={.13} roughness={.06} transparent opacity={.83} clearcoat={1}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.015],[.16,-.015],[.16,.015],[0,.015]]} rotation={[Math.PI/2,0,0]} position={[0,.22,1.28]} radialSegments={40}>
   <meshPhysicalMaterial color={black} metalness={.17} roughness={.15} clearcoat={.85}/>
  </RevolvedSurface>
  {Array.from({length:16},(_,i)=><group key={i} rotation={[0,0,i*Math.PI/8]} position={[0,.22,.99]}>
   <mesh position={[.33,0,0]}><boxGeometry args={[.025,.03,.18]}/><meshStandardMaterial color={black} metalness={.46} roughness={.46}/></mesh>
  </group>)}
  {[-.33,.33].map(x=><group key={x}>
   <ExtrudedProfile points={bracket.map(([a,b])=>[a*.55,b] as [number,number])} depth={.13} bevelSize={.01} bevelThickness={.009} position={[x,-.60,-.43]}>
    <meshStandardMaterial color={black} metalness={.6} roughness={.32}/>
   </ExtrudedProfile>
   <RevolvedSurface profile={[[0,-.07],[.06,-.07],[.06,.07],[0,.07]]} rotation={[Math.PI/2,0,0]} position={[x,-.55,-.33]}>
    <meshStandardMaterial color={trim} metalness={.69} roughness={.22}/>
   </RevolvedSurface>
  </group>)}
  <RevolvedSurface profile={[[0,-.12],[.085,-.12],[.095,.1],[0,.1]]} position={[.32,.33,-.54]}>
   <meshStandardMaterial color={trim} metalness={.77} roughness={.23}/>
  </RevolvedSurface>
  <SplineTube points={[[.32,.34,-.62],[.41,.25,-.86],[.54,-.19,-.94],[.60,-.38,-.82]]} radius={.035} tubularSegments={45}>
   <meshStandardMaterial color={black} roughness={.78}/>
  </SplineTube>
  <SplineTube points={[[-.33,.33,-.62],[-.45,.18,-.77],[-.45,-.10,-.79]]} radius={.019} tubularSegments={31}>
   <meshStandardMaterial color={steel} metalness={.5} roughness={.49}/>
  </SplineTube>
  {[0,1,2].map(i=><mesh key={i} position={[-.40+i*.16,.64,.506]}><sphereGeometry args={[.025,12,10]}/><meshStandardMaterial color={i===0?light:trim} emissive={i===0?light:trim} emissiveIntensity={.7}/></mesh>)}
 </group>
}
