import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Machine safety-rated emitter/receiver pair with protective extruded
 * housings, optical aperture windows, adjustable mounts and signal cable.
 * Actual protective light curtains use invisible infrared beams; these
 * bars depict the sensor stack rather than inventing visible laser rays.
 */
const housing='#e7c54c', endcap='#353f44', lens='#8c9ca3', mount='#66757a', green='#4ba996', led='#e2ad48'
const bar:Array<[number,number]>=[[-.115,-.97],[.115,-.97],[.115,.97],[-.115,.97]]
const window:Array<[number,number]>=[[-.065,-.78],[.065,-.78],[.065,.78],[-.065,.78]]
const bracket:Array<[number,number]>=[[-.25,-.06],[.25,-.06],[.25,.06],[-.25,.06]]
const cap:Array<[number,number]>=[[0,-.075],[.14,-.075],[.14,.075],[0,.075]]
export default function SafetyLightCurtain(){
 return <group rotation={[0,-.25,0]}>
  {[-1,1].map(side=><group key={side} position={[side*1.09,-.38,0]}>
   <ExtrudedProfile points={bar} depth={.19} bevelSize={.025} bevelThickness={.02}>
    <meshPhysicalMaterial color={housing} metalness={.35} roughness={.31} clearcoat={.17}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={window} depth={.018} bevelSize={.009} bevelThickness={.006} position={[0,0,.116]}>
    <meshPhysicalMaterial color={lens} metalness={.37} roughness={.14} transmission={.12} clearcoat={.48}/>
   </ExtrudedProfile>
   {Array.from({length:23},(_,i)=><group key={i} position={[0,-.72+i*.066,.135]}>
    <mesh><boxGeometry args={[.078,.026,.01]}/><meshStandardMaterial color={i%2?endcap:'#43565f'} metalness={.45} roughness={.27}/></mesh>
   </group>)}
   <RevolvedSurface profile={cap} position={[0,-1.02,0]} radialSegments={6}>
    <meshStandardMaterial color={endcap} metalness={.54} roughness={.3}/>
   </RevolvedSurface>
   <RevolvedSurface profile={cap} position={[0,1.02,0]} radialSegments={6}>
    <meshStandardMaterial color={endcap} metalness={.54} roughness={.3}/>
   </RevolvedSurface>
   <ExtrudedProfile points={bracket} depth={.15} bevelSize={.012} bevelThickness={.01} position={[0,-.92,-.16]}>
    <meshStandardMaterial color={mount} metalness={.72} roughness={.32}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={bracket} depth={.15} bevelSize={.012} bevelThickness={.01} position={[0,.92,-.16]}>
    <meshStandardMaterial color={mount} metalness={.72} roughness={.32}/>
   </ExtrudedProfile>
   <mesh position={[0,.86,.145]}><sphereGeometry args={[.028,16,12]}/><meshStandardMaterial color={green} emissive={green} emissiveIntensity={.6}/></mesh>
   <SplineTube points={[[0,-1.04,-.08],[0,-1.27,-.19],[side*.17,-1.42,-.16],[side*.37,-1.49,-.04]]} radius={.035} tubularSegments={32}>
    <meshStandardMaterial color={endcap} roughness={.82}/>
   </SplineTube>
  </group>)}
  <ExtrudedProfile points={[[-1.32,-.06],[1.32,-.06],[1.32,.06],[-1.32,.06]]} depth={.18} bevelSize={.01} bevelThickness={.01} position={[0,-1.41,-.22]}>
   <meshStandardMaterial color={mount} metalness={.66} roughness={.36}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={[[0,-.1],[.09,-.1],[.09,.1],[0,.1]]} rotation={[Math.PI/2,0,0]} position={[-.98,-.4,.17]}>
   <meshStandardMaterial color={green} metalness={.2} roughness={.3}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.1],[.09,-.1],[.09,.1],[0,.1]]} rotation={[Math.PI/2,0,0]} position={[.98,-.4,.17]}>
   <meshStandardMaterial color={led} metalness={.21} roughness={.3}/>
  </RevolvedSurface>
 </group>
}
