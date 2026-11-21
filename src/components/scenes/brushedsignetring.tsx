import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Open-hoop signet with a solid engraved oval head, tapered shoulders,
 * stepped bezel and interior hallmark; real ring opening, no generic body.
 * Jewelry concept, not metalwork-certified dimensional CAD.
 */
const platinum='#bfc4c5', highlights='#f0f0e5', shadow='#59666e', inlay='#917b5f'
const top:Array<[number,number]>=[[-.51,-.22],[-.43,-.37],[.34,-.37],[.51,-.22],[.51,.22],[.34,.37],[-.34,.37],[-.51,.22]]
const face:Array<[number,number]>=[[-.44,-.18],[-.33,-.29],[.32,-.29],[.44,-.18],[.44,.18],[.32,.29],[-.32,.29],[-.44,.18]]
const engraving:Array<[number,number]>=[[-.19,-.02],[-.08,.14],[.04,-.11],[.19,.09]]
export default function BrushedSignetRing(){
 return <group rotation={[-.28,-.30,.14]} scale={1.08}>
  {/* Real toroidal band preserves the empty finger opening. */}
  <mesh rotation={[0,0,Math.PI/2]} position={[0,-.25,0]} castShadow receiveShadow>
   <torusGeometry args={[.66,.115,24,96]}/>
   <meshPhysicalMaterial color={platinum} metalness={.96} roughness={.31} clearcoat={.15}/>
  </mesh>
  <mesh rotation={[0,0,Math.PI/2]} position={[0,-.25,0]}>
   <torusGeometry args={[.65,.046,16,96]}/>
   <meshPhysicalMaterial color={highlights} metalness={.98} roughness={.21}/>
  </mesh>
  {/* Shoulders rise into the heavy bezel rather than appearing as separate spheres. */}
  {[-1,1].map(side=><group key={side}>
   <ExtrudedProfile points={[[side*.36,.16],[side*.60,-.09],[side*.68,.10],[side*.48,.44]]} depth={.24} bevelSize={.035} bevelThickness={.025} position={[0,.08,0]}>
    <meshPhysicalMaterial color={platinum} metalness={.95} roughness={.34} clearcoat={.13}/>
   </ExtrudedProfile>
   <RevolvedSurface profile={[[0,-.06],[.048,-.06],[.048,.06],[0,.06]]} rotation={[Math.PI/2,0,0]} position={[side*.56,.14,.14]}>
    <meshStandardMaterial color={inlay} metalness={.76} roughness={.36}/>
   </RevolvedSurface>
  </group>)}
  <ExtrudedProfile points={top} depth={.29} bevelSize={.055} bevelThickness={.045} position={[0,.55,0]}>
   <meshPhysicalMaterial color={platinum} metalness={.96} roughness={.30} clearcoat={.12}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={face} depth={.012} bevelSize={.017} bevelThickness={.01} position={[0,.55,.169]}>
   <meshPhysicalMaterial color={highlights} metalness={.98} roughness={.28}/>
  </ExtrudedProfile>
  <SplineTube points={engraving.map(([x,y])=>[x,.55+y,.189] as [number,number,number])} radius={.011} tubularSegments={32} radialSegments={9}>
   <meshStandardMaterial color={shadow} metalness={.78} roughness={.48}/>
  </SplineTube>
  {[-1,1].map(side=><SplineTube key={side} points={[[side*.34,.32,.18],[side*.43,.26,.17],[side*.52,.18,.15]]} radius={.012}>
   <meshStandardMaterial color={inlay} metalness={.81} roughness={.34}/>
  </SplineTube>)}
  {/* A real inside-band hallmark and small side setting detail. */}
  <ExtrudedProfile points={[[-.08,-.035],[.08,-.035],[.08,.035],[-.08,.035]]} depth={.015} bevelSize={.006} bevelThickness={.005} position={[0,-.89,.04]}>
   <meshStandardMaterial color={shadow} metalness={.76} roughness={.49}/>
  </ExtrudedProfile>
  <SplineTube points={[[.39,.40,.18],[.44,.34,.18],[.49,.25,.16]]} radius={.008} tubularSegments={23}>
   <meshPhysicalMaterial color={inlay} metalness={.84} roughness={.27}/>
  </SplineTube>
 </group>
}
