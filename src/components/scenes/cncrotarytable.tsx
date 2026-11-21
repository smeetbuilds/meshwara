import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Indexing CNC rotary fixture with real concentric turntable, radial T-slots,
 * worm-gear drive housing, clamping brackets and 90-degree engraved index ring.
 * Geometry is an engineering illustration, not metrology-certified CAD.
 */
const casting='#576a74', machined='#b7c5c8', slot='#26353d', brass='#c4a36e', marker='#d8ba65', gasket='#404d53'
const base:Array<[number,number]>=[[-1.08,-.62],[1.08,-.62],[1.14,.58],[-1.14,.58]]
const index:Array<[number,number]>=[[0,-.14],[.84,-.14],[.86,.11],[0,.11]]
const top:Array<[number,number]>=[[0,-.12],[.74,-.12],[.76,.12],[0,.12]]
const bearing:Array<[number,number]>=[[0,-.13],[.43,-.13],[.43,.13],[0,.13]]
const gear:Array<[number,number]>=[[0,-.3],[.26,-.3],[.28,.27],[0,.27]]
const block:Array<[number,number]>=[[-.20,-.17],[.20,-.17],[.20,.17],[-.20,.17]]
export default function CncRotaryTable(){
 return <group rotation={[.26,-.38,0]}>
  <ExtrudedProfile points={base} depth={1.52} bevelSize={.045} bevelThickness={.026} rotation={[Math.PI/2,0,0]} position={[0,-1.29,0]}>
   <meshPhysicalMaterial color={casting} metalness={.74} roughness={.31} clearcoat={.1}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={[[-.96,-.09],[.96,-.09],[.96,.09],[-.96,.09]]} depth={1.40} bevelSize={.015} bevelThickness={.015} rotation={[Math.PI/2,0,0]} position={[0,-1.13,0]}>
   <meshStandardMaterial color={machined} metalness={.88} roughness={.25}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={index} position={[0,-.85,0]} radialSegments={72}>
   <meshPhysicalMaterial color={casting} metalness={.7} roughness={.28} clearcoat={.17}/>
  </RevolvedSurface>
  <RevolvedSurface profile={top} position={[0,-.64,0]} radialSegments={72}>
   <meshStandardMaterial color={machined} metalness={.89} roughness={.23}/>
  </RevolvedSurface>
  <RevolvedSurface profile={bearing} position={[0,-.51,0]} radialSegments={60}>
   <meshStandardMaterial color={casting} metalness={.78} roughness={.27}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.05],[.23,-.05],[.23,.05],[0,.05]]} position={[0,-.41,0]} radialSegments={54}>
   <meshStandardMaterial color={machined} metalness={.92} roughness={.18}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.10],[.07,-.10],[.07,.10],[0,.10]]} position={[0,-.32,0]} radialSegments={24}>
   <meshStandardMaterial color={slot} metalness={.5} roughness={.4}/>
  </RevolvedSurface>
  {/* True radial T-slots are dark recessed channels between the clamps. */}
  {Array.from({length:8},(_,i)=><group key={i} rotation={[0,i*Math.PI/4,0]}>
    <ExtrudedProfile points={[[-.055,-.024],[.055,-.024],[.055,.024],[-.055,.024]]} depth={.62} bevelSize={.002} bevelThickness={.002} position={[0,-.503,.44]}>
     <meshStandardMaterial color={slot} metalness={.65} roughness={.28}/>
    </ExtrudedProfile>
    <ExtrudedProfile points={block} depth={.12} bevelSize={.01} bevelThickness={.01} position={[0,-.44,.67]}>
     <meshStandardMaterial color={i%2?casting:machined} metalness={.83} roughness={.25}/>
    </ExtrudedProfile>
  </group>)}
  {Array.from({length:32},(_,i)=><mesh key={i} position={[.88*Math.cos(i*Math.PI/16),-.695,.88*Math.sin(i*Math.PI/16)]}>
    <boxGeometry args={[.027,.016,.027]}/>
    <meshStandardMaterial color={i%4===0?marker:machined} metalness={.68} roughness={.28}/>
  </mesh>)}
  <ExtrudedProfile points={[[-.32,-.36],[.32,-.36],[.32,.36],[-.32,.36]]} depth={.46} bevelSize={.035} bevelThickness={.028} position={[1.10,-1.00,-.05]}>
   <meshStandardMaterial color={casting} metalness={.72} roughness={.31}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={gear} rotation={[Math.PI/2,0,0]} position={[1.10,-1.03,.25]} radialSegments={32}>
   <meshStandardMaterial color={brass} metalness={.82} roughness={.26}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.15],[.044,-.15],[.044,.15],[0,.15]]} rotation={[Math.PI/2,0,0]} position={[1.1,-1.03,.46]}>
   <meshStandardMaterial color={machined} metalness={.91} roughness={.2}/>
  </RevolvedSurface>
  <SplineTube points={[[1.24,-1.25,-.16],[1.42,-1.13,-.18],[1.56,-.97,-.05]]} radius={.028} tubularSegments={28}>
   <meshStandardMaterial color={gasket} roughness={.75}/>
  </SplineTube>
  <RevolvedSurface profile={[[0,-.05],[.11,-.05],[.11,.05],[0,.05]]} rotation={[Math.PI/2,0,0]} position={[1.1,-1.03,.62]}>
   <meshStandardMaterial color={brass} metalness={.82} roughness={.24}/>
  </RevolvedSurface>
 </group>
}
