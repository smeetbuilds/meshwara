import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Compact Cartesian palletizing cell: two extrusion towers, a horizontal
 * servo bridge, Z-axis slide, suction head, pallet and stacked packages.
 * Motion linkages and package sizes illustrative; no load rating implied.
 */
const frame='#899a9d', anodised='#c0cbcd', safety='#e3af43', dark='#303b42', pad='#3c5e62', carton='#bb9569'
const rail:Array<[number,number]>=[[-.065,-.90],[.065,-.90],[.065,.90],[-.065,.90]]
const beam:Array<[number,number]>=[[-1.23,-.095],[1.23,-.095],[1.23,.095],[-1.23,.095]]
const foot:Array<[number,number]>=[[-.34,-.10],[.34,-.10],[.34,.10],[-.34,.10]]
const lifter:Array<[number,number]>=[[0,-.38],[.075,-.38],[.075,.38],[0,.38]]
const cup:Array<[number,number]>=[[0,-.13],[.06,-.13],[.075,-.065],[.13,.005],[.13,.04],[0,.04]]
export default function CompactPalletizer(){
 return <group rotation={[0,-.37,0]} position={[0,0,0]}>
  {[-1.18,1.18].map(x=><group key={x}>
   <ExtrudedProfile points={rail} depth={.22} bevelSize={.016} bevelThickness={.015} position={[x,-.17,-.33]}>
    <meshPhysicalMaterial color={frame} metalness={.75} roughness={.32} clearcoat={.2}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={foot} depth={.75} bevelSize={.016} bevelThickness={.017} position={[x,-1.30,-.30]}>
    <meshStandardMaterial color={dark} metalness={.72} roughness={.33}/>
   </ExtrudedProfile>
   <RevolvedSurface profile={[[0,-.10],[.095,-.10],[.095,.10],[0,.10]]} rotation={[0,0,Math.PI/2]} position={[x,.72,-.30]}>
    <meshStandardMaterial color={safety} metalness={.4} roughness={.3}/>
   </RevolvedSurface>
  </group>)}
  <ExtrudedProfile points={beam} depth={.28} bevelSize={.025} bevelThickness={.019} position={[0,.77,-.34]}>
   <meshPhysicalMaterial color={anodised} metalness={.82} roughness={.28} clearcoat={.12}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={beam.map(([x,y])=>[x,y*.45] as [number,number])} depth={.15} bevelSize={.009} bevelThickness={.009} position={[0,.59,-.31]}>
   <meshStandardMaterial color={dark} metalness={.6} roughness={.36}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={[[-.28,-.22],[.28,-.22],[.28,.22],[-.28,.22]]} depth={.40} bevelSize={.02} bevelThickness={.018} position={[.42,.60,-.27]}>
   <meshPhysicalMaterial color={safety} metalness={.42} roughness={.32} clearcoat={.31}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={lifter} position={[.42,-.12,-.20]} radialSegments={26}>
   <meshStandardMaterial color={frame} metalness={.9} roughness={.24}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.33],[.041,-.33],[.041,.33],[0,.33]]} position={[.42,-.38,-.20]}>
   <meshStandardMaterial color={anodised} metalness={.93} roughness={.2}/>
  </RevolvedSurface>
  <ExtrudedProfile points={[[-.39,-.055],[.39,-.055],[.39,.055],[-.39,.055]]} depth={.65} bevelSize={.009} bevelThickness={.009} position={[.42,-.77,-.20]}>
   <meshStandardMaterial color={dark} metalness={.59} roughness={.3}/>
  </ExtrudedProfile>
  {[-.25,.25].flatMap(x=>[-.20,.20].map(z=><group key={x+':'+z} position={[.42+x,-.90,-.20+z]}>
   <RevolvedSurface profile={cup} radialSegments={26}>
    <meshStandardMaterial color={pad} metalness={.08} roughness={.83}/>
   </RevolvedSurface>
  </group>))}
  {/* Pallet is a separate platform under the work envelope, not a robot shell. */}
  <ExtrudedProfile points={[[-1.0,-.10],[1.0,-.10],[1.0,.10],[-1.0,.10]]} depth={1.15} bevelSize={.012} bevelThickness={.012} position={[0,-1.34,.42]}>
   <meshStandardMaterial color={carton} metalness={.01} roughness={.86}/>
  </ExtrudedProfile>
  {[-.65,0,.65].map(x=><mesh key={x} position={[x,-1.45,.42]}>
   <boxGeometry args={[.15,.15,1.05]}/>
   <meshStandardMaterial color={carton} roughness={.89}/>
  </mesh>)}
  {[-.6,.0,.60].map((x,i)=><mesh key={i} position={[x,-1.02,.43]}>
   <boxGeometry args={[.48,.45,.42]}/>
   <meshStandardMaterial color={carton} roughness={.91}/>
  </mesh>)}
  <SplineTube points={[[.42,.58,-.54],[.63,.89,-.80],[.91,.98,-.68],[1.11,.65,-.52]]} radius={.05} tubularSegments={45}>
   <meshStandardMaterial color={dark} roughness={.8}/>
  </SplineTube>
  <SplineTube points={[[1.12,.53,-.51],[.92,.28,-.56],[.59,-.07,-.38],[.42,-.75,-.28]]} radius={.026} tubularSegments={54}>
   <meshStandardMaterial color={pad} roughness={.75}/>
  </SplineTube>
 </group>
}
