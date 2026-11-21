import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Dedicated industrial servo drive: finned aluminium inverter chassis, plug-in
 * fieldbus and motor terminals, status display, encoder socket and DIN clips.
 * Visualization only: connector layout and ratings are not manufacturer CAD.
 */
const graphite='#333e45', aluminium='#a8b8bc', fascia='#d6dddb', accent='#e4af42', optic='#78b6bf', dark='#1d292e'
const body:Array<[number,number]>=[[-.86,-1.15],[.86,-1.15],[.86,1.15],[-.86,1.15]]
const display:Array<[number,number]>=[[-.41,-.32],[.41,-.32],[.41,.32],[-.41,.32]]
const rail:Array<[number,number]>=[[-.98,-.07],[.98,-.07],[.98,.07],[-.98,.07]]
const connectorProfile:Array<[number,number]>=[[0,-.09],[.087,-.09],[.099,.08],[.087,.10],[0,.10]]
const cablePoints:Array<[number,number,number]>=[[.64,-1.05,.33],[.76,-1.3,.44],[.83,-1.43,.3]]
export default function ServoDriveModule(){
 return <group rotation={[0,-.35,0]} scale={.9} position={[0,-.02,0]}>
  <ExtrudedProfile points={body} depth={.48} bevelSize={.035} bevelThickness={.03} position={[0,-.15,-.12]}>
   <meshPhysicalMaterial color={graphite} metalness={.64} roughness={.3} clearcoat={.12}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={body.map(([x,y])=>[x*.92,y*.95] as [number,number])} depth={.025} bevelSize={.015} bevelThickness={.008} position={[0,-.15,.16]}>
   <meshPhysicalMaterial color={fascia} metalness={.38} roughness={.38} clearcoat={.16}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={display} depth={.019} bevelSize={.013} bevelThickness={.009} position={[-.27,.30,.196]}>
   <meshPhysicalMaterial color={dark} metalness={.18} roughness={.17} clearcoat={.8}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rail} depth={.13} bevelSize={.007} bevelThickness={.007} position={[0,-1.34,-.41]}>
   <meshStandardMaterial color={aluminium} metalness={.82} roughness={.28}/>
  </ExtrudedProfile>
  {Array.from({length:16},(_,i)=><mesh key={i} position={[-.78+i*.104,-.15,-.52]}>
   <boxGeometry args={[.036,2.22,.15]}/>
   <meshStandardMaterial color={aluminium} metalness={.9} roughness={.29}/>
  </mesh>)}
  {[-.36,.36].map(x=><group key={x}>
   <ExtrudedProfile points={[[-.24,-.16],[.24,-.16],[.24,.16],[-.24,.16]]} depth={.045} bevelSize={.009} bevelThickness={.007} position={[x,-.99,.21]}>
    <meshStandardMaterial color={graphite} roughness={.38} metalness={.28}/>
   </ExtrudedProfile>
   {Array.from({length:5},(_,i)=><mesh key={i} position={[x-.16+i*.08,-.99,.256]}>
    <boxGeometry args={[.034,.12,.022]}/>
    <meshStandardMaterial color={i%2===0?accent:optic} metalness={.64} roughness={.31}/>
   </mesh>)}
  </group>)}
  <ExtrudedProfile points={[[-.17,-.10],[.17,-.10],[.17,.10],[-.17,.10]]} depth={.03} bevelSize={.008} bevelThickness={.007} position={[-.42,-.42,.20]}>
   <meshStandardMaterial color={graphite} metalness={.3} roughness={.33}/>
  </ExtrudedProfile>
  {Array.from({length:7},(_,i)=><mesh key={i} position={[-.61+i*.09,.32,.217]}>
   <boxGeometry args={[.048,.055,.009]}/>
   <meshStandardMaterial color={i<3?optic:accent} emissive={i<3?optic:accent} emissiveIntensity={i<3?.4:.12} roughness={.28}/>
  </mesh>)}
  <RevolvedSurface profile={connectorProfile} rotation={[Math.PI/2,0,0]} position={[.52,-.43,.203]} radialSegments={12}>
   <meshStandardMaterial color={aluminium} metalness={.83} roughness={.26}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.08],[.045,-.08],[.045,.08],[0,.08]]} rotation={[Math.PI/2,0,0]} position={[.52,-.43,.31]} radialSegments={12}>
   <meshStandardMaterial color={dark} metalness={.25} roughness={.42}/>
  </RevolvedSurface>
  <RevolvedSurface profile={connectorProfile} rotation={[Math.PI/2,0,0]} position={[.65,.72,.19]} radialSegments={10}>
   <meshStandardMaterial color={accent} metalness={.65} roughness={.31}/>
  </RevolvedSurface>
  <RevolvedSurface profile={connectorProfile} rotation={[Math.PI/2,0,0]} position={[.40,.72,.19]} radialSegments={10}>
   <meshStandardMaterial color={aluminium} metalness={.75} roughness={.29}/>
  </RevolvedSurface>
  <SplineTube points={cablePoints} radius={.04} tubularSegments={35} radialSegments={10}>
   <meshStandardMaterial color={dark} roughness={.81}/>
  </SplineTube>
  <SplineTube points={[[.41,.74,.32],[.52,.92,.42],[.63,1.16,.31]]} radius={.025} tubularSegments={31} radialSegments={9}>
   <meshStandardMaterial color={optic} roughness={.78}/>
  </SplineTube>
 </group>
}
