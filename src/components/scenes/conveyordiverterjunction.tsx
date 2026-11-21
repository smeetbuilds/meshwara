import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** A functioning-layout 90° belt transfer with timed pneumatic diverter arm,
 * main and branch conveyors, roller bearings and safety side rails.
 * Static engineering visualization, not a safety-certified operating machine.
 */
const frame='#59696d', steel='#c0cbc7', belt='#2b353c', caution='#d4a94c', piston='#aab9bb', rubber='#22282b'
const base:Array<[number,number]>=[[-1.28,-.19],[1.28,-.19],[1.28,.19],[-1.28,.19]]
const longRail:Array<[number,number]>=[[-1.28,-.045],[1.28,-.045],[1.28,.045],[-1.28,.045]]
const shortRail:Array<[number,number]>=[[-.69,-.045],[.69,-.045],[.69,.045],[-.69,.045]]
const roller:Array<[number,number]>=[[0,-.47],[.055,-.47],[.065,-.44],[.065,.44],[.055,.47],[0,.47]]
const foot:Array<[number,number]>=[[-.1,-.72],[.1,-.72],[.1,.72],[-.1,.72]]
export default function ConveyorDiverterJunction(){
 return <group rotation={[0,-.31,0]} position={[0,-.03,0]}>
  <ExtrudedProfile points={base} depth={.92} bevelSize={.02} bevelThickness={.02} rotation={[Math.PI/2,0,0]} position={[0,-.51,-.34]}>
   <meshPhysicalMaterial color={frame} metalness={.7} roughness={.35} clearcoat={.11}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={[[-1.19,-.10],[1.19,-.10],[1.19,.10],[-1.19,.10]]} depth={.81} bevelSize={.014} bevelThickness={.01} rotation={[Math.PI/2,0,0]} position={[0,-.34,-.34]}>
   <meshStandardMaterial color={belt} roughness={.8} metalness={.12}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={longRail} depth={.10} bevelSize={.009} bevelThickness={.009} position={[0,-.28,.16]}>
   <meshStandardMaterial color={steel} metalness={.83} roughness={.27}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={longRail} depth={.10} bevelSize={.009} bevelThickness={.009} position={[0,-.28,-.80]}>
   <meshStandardMaterial color={steel} metalness={.83} roughness={.27}/>
  </ExtrudedProfile>
  {/* Right-angle branch, perpendicular to the long belt. */}
  <group position={[.41,0,.75]} rotation={[0,Math.PI/2,0]}>
   <ExtrudedProfile points={base.map(([x,y])=>[x*.6,y] as [number,number])} depth={.70} bevelSize={.02} bevelThickness={.019} rotation={[Math.PI/2,0,0]} position={[0,-.51,0]}>
    <meshStandardMaterial color={frame} metalness={.73} roughness={.35}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={[[-.68,-.1],[.68,-.1],[.68,.1],[-.68,.1]]} depth={.62} bevelSize={.01} bevelThickness={.01} rotation={[Math.PI/2,0,0]} position={[0,-.34,0]}>
    <meshStandardMaterial color={belt} roughness={.8}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={shortRail} depth={.09} bevelSize={.009} bevelThickness={.009} position={[0,-.28,-.39]}>
    <meshStandardMaterial color={steel} metalness={.83} roughness={.26}/>
   </ExtrudedProfile>
   {Array.from({length:9},(_,i)=><RevolvedSurface key={i} profile={roller} rotation={[Math.PI/2,0,0]} position={[-.6+i*.15,-.48,0]} radialSegments={16}>
    <meshStandardMaterial color={steel} metalness={.85} roughness={.35}/>
   </RevolvedSurface>)}
  </group>
  {Array.from({length:13},(_,i)=><RevolvedSurface key={i} profile={roller} rotation={[Math.PI/2,0,0]} position={[-1.16+i*.19,-.49,-.34]} radialSegments={16}>
   <meshStandardMaterial color={steel} metalness={.84} roughness={.3}/>
  </RevolvedSurface>)}
  {[-.97,.99].map(x=>[-.72,.13].map(z=><group key={x+':'+z}>
   <ExtrudedProfile points={foot} depth={.14} bevelSize={.014} bevelThickness={.011} position={[x,-1.10,z]}>
    <meshStandardMaterial color={frame} metalness={.71} roughness={.33}/>
   </ExtrudedProfile>
  </group>))}
  <RevolvedSurface profile={[[0,-.15],[.16,-.15],[.18,.15],[0,.15]]} rotation={[0,0,Math.PI/2]} position={[.05,.04,.05]}>
   <meshStandardMaterial color={caution} metalness={.43} roughness={.31}/>
  </RevolvedSurface>
  <ExtrudedProfile points={[[-.11,-.12],[.11,-.12],[.11,.12],[-.11,.12]]} depth={1.11} bevelSize={.016} bevelThickness={.014} rotation={[0,.42,0]} position={[.38,.01,.45]}>
   <meshStandardMaterial color={caution} metalness={.41} roughness={.32}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={[[0,-.28],[.068,-.28],[.068,.28],[0,.28]]} rotation={[0,0,Math.PI/2]} position={[.05,-.13,.23]}>
   <meshStandardMaterial color={piston} metalness={.84} roughness={.25}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.18],[.085,-.18],[.085,.18],[0,.18]]} rotation={[0,0,Math.PI/2]} position={[-.31,-.13,.23]}>
   <meshStandardMaterial color={rubber} metalness={.35} roughness={.3}/>
  </RevolvedSurface>
  <SplineTube points={[[-.37,-.06,.24],[-.51,-.21,.45],[-.42,-.52,.76]]} radius={.028} tubularSegments={31}>
   <meshStandardMaterial color={rubber} roughness={.77}/>
  </SplineTube>
 </group>
}
