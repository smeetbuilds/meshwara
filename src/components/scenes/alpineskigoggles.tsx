import { ExtrudedProfile, SplineTube, RevolvedSurface } from '../geometry/GeometryV2'

/** Wrap-around alpine goggle: continuous framed curved lens, neoprene face
 * foam, vent tabs, two strap ends and a textile head band. Impact ratings
 * and optics are illustrative rather than safety/ANSI certified.
 */
const carbon='#252e35', silver='#d0dce1', lens='#5b9ab8', mirror='#b5e3e4', strap='#59656b', seal='#343a3b'
const outline:Array<[number,number]>=[[-1.06,.13],[-.98,.33],[-.66,.45],[0,.49],[.66,.45],[.98,.33],[1.06,.13],[.88,-.28],[.36,-.38],[0,-.31],[-.36,-.38],[-.88,-.28]]
const glass:Array<[number,number]>=[[-.93,.10],[-.83,.27],[-.57,.35],[0,.39],[.57,.35],[.83,.27],[.93,.1],[.79,-.22],[.30,-.29],[0,-.24],[-.30,-.29],[-.79,-.22]]
const strapPoints:Array<[number,number,number]>=[[-1.05,.04,-.06],[-1.42,.15,-.17],[-1.63,.20,-.43],[-1.57,.02,-.73],[-1.31,-.07,-.89]]
export default function AlpineSkiGoggles(){
 return <group rotation={[.1,-.31,0]} scale={.94} position={[0,.10,0]}>
  <ExtrudedProfile points={outline} depth={.23} bevelSize={.045} bevelThickness={.04}>
   <meshPhysicalMaterial color={carbon} metalness={.24} roughness={.35} clearcoat={.52}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={glass} depth={.035} bevelSize={.022} bevelThickness={.018} position={[0,0,.14]}>
   <meshPhysicalMaterial color={lens} metalness={.27} roughness={.08} clearcoat={1} transmission={.08} transparent opacity={.92}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={glass.map(([x,y])=>[x*.97,y*.97] as [number,number])} depth={.010} bevelSize={.012} bevelThickness={.009} position={[0,0,.162]}>
   <meshPhysicalMaterial color={mirror} metalness={.21} roughness={.06} transparent opacity={.18} clearcoat={1} depthWrite={false}/>
  </ExtrudedProfile>
  <SplineTube points={outline.map(([x,y])=>[x,y,.124] as [number,number,number])} radius={.026} tubularSegments={96} closed>
   <meshPhysicalMaterial color={silver} metalness={.65} roughness={.21}/>
  </SplineTube>
  <SplineTube points={outline.map(([x,y])=>[x*.93,y*.93,-.133] as [number,number,number])} radius={.058} tubularSegments={96} closed>
   <meshStandardMaterial color={seal} roughness={.91}/>
  </SplineTube>
  {[-1,1].map(side=><group key={side}>
   <SplineTube points={strapPoints.map(([x,y,z])=>[x*side,y,z] as [number,number,number])} radius={.062} tubularSegments={54}>
    <meshStandardMaterial color={strap} roughness={.86}/>
   </SplineTube>
   <ExtrudedProfile points={[[-.10,-.11],[.10,-.11],[.10,.11],[-.10,.11]]} depth={.045} bevelSize={.009} bevelThickness={.01} position={[side*1.20,.08,-.12]}>
    <meshPhysicalMaterial color={carbon} metalness={.38} roughness={.31}/>
   </ExtrudedProfile>
  </group>)}
  {Array.from({length:11},(_,i)=><mesh key={i} position={[-.83+i*.165,.34,.09]}>
   <boxGeometry args={[.07,.024,.025]}/>
   <meshStandardMaterial color={carbon} metalness={.13} roughness={.47}/>
  </mesh>)}
  <RevolvedSurface profile={[[0,-.035],[.06,-.035],[.06,.035],[0,.035]]} rotation={[Math.PI/2,0,0]} position={[0,-.33,.20]}>
   <meshStandardMaterial color={silver} metalness={.8} roughness={.23}/>
  </RevolvedSurface>
  {/* Adjustable webbing slider and end-cap hardware. */}
  {[-1,1].map(side=><group key={side}>
   <ExtrudedProfile points={[[-.13,-.13],[.13,-.13],[.13,.13],[-.13,.13]]} depth={.055} bevelSize={.014} bevelThickness={.012} position={[side*1.43,.04,-.35]}>
    <meshPhysicalMaterial color={silver} metalness={.78} roughness={.25}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={[[-.085,-.07],[.085,-.07],[.085,.07],[-.085,.07]]} depth={.06} bevelSize={.01} bevelThickness={.008} position={[side*1.43,.04,-.32]}>
    <meshStandardMaterial color={strap} roughness={.85}/>
   </ExtrudedProfile>
  </group>)}
 </group>
}
