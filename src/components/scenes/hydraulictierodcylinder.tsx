import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Double-acting industrial hydraulic cylinder. Four external tie rods clamp
 * front and rear heads; the polished rod runs through a bronze gland and
 * cross-pin clevis. Two distinct ports expose the actual hydraulic layout.
 */
const barrel='#68777c', steel='#bacbcf', brass='#ca9a5c', gasket='#26363c', dark='#3f494d', warning='#d29d48'
const tube:Array<[number,number]>=[[0,-.87],[.30,-.87],[.33,-.81],[.33,.81],[.30,.87],[0,.87]]
const tie:Array<[number,number]>=[[0,-1.01],[.032,-1.01],[.041,-.95],[.041,.95],[.032,1.01],[0,1.01]]
const rod:Array<[number,number]>=[[0,-.88],[.13,-.88],[.135,.94],[.12,1.03],[0,1.03]]
const head:Array<[number,number]>=[[0,-.19],[.4,-.19],[.43,-.16],[.43,.16],[.4,.19],[0,.19]]
const nut:Array<[number,number]>=[[0,-.095],[.076,-.095],[.08,-.075],[.08,.075],[.076,.095],[0,.095]]
export default function HydraulicTieRodCylinder(){
 return <group rotation={[0,-.39,.02]} position={[0,-.03,0]}>
  <RevolvedSurface profile={tube} rotation={[0,0,Math.PI/2]} position={[-.28,-.54,0]} radialSegments={52}>
   <meshPhysicalMaterial color={barrel} metalness={.72} roughness={.29} clearcoat={.15}/>
  </RevolvedSurface>
  <RevolvedSurface profile={head} rotation={[0,0,Math.PI/2]} position={[-1.19,-.54,0]} radialSegments={8}>
   <meshStandardMaterial color={dark} metalness={.65} roughness={.31} flatShading/>
  </RevolvedSurface>
  <RevolvedSurface profile={head} rotation={[0,0,Math.PI/2]} position={[.63,-.54,0]} radialSegments={8}>
   <meshStandardMaterial color={dark} metalness={.65} roughness={.31} flatShading/>
  </RevolvedSurface>
  <RevolvedSurface profile={rod} rotation={[0,0,Math.PI/2]} position={[1.5,-.54,0]} radialSegments={36}>
   <meshPhysicalMaterial color={steel} metalness={.96} roughness={.11} clearcoat={.42}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.075],[.22,-.075],[.23,.075],[0,.075]]} rotation={[0,0,Math.PI/2]} position={[.83,-.54,0]}>
   <meshStandardMaterial color={brass} metalness={.77} roughness={.28}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.095],[.22,-.095],[.25,.08],[.20,.095],[0,.095]]} rotation={[0,0,Math.PI/2]} position={[2.33,-.54,0]}>
   <meshStandardMaterial color={dark} metalness={.75} roughness={.26}/>
  </RevolvedSurface>
  {[-1,1].flatMap(y=>[-1,1].map(z=><group key={y+':'+z}>
   <RevolvedSurface profile={tie} rotation={[0,0,Math.PI/2]} position={[-.27,-.54+y*.27,z*.25]} radialSegments={14}>
    <meshStandardMaterial color={steel} metalness={.86} roughness={.22}/>
   </RevolvedSurface>
   <RevolvedSurface profile={nut} rotation={[0,0,Math.PI/2]} position={[-1.34,-.54+y*.27,z*.25]} radialSegments={6}>
    <meshStandardMaterial color={brass} metalness={.73} roughness={.25} flatShading/>
   </RevolvedSurface>
   <RevolvedSurface profile={nut} rotation={[0,0,Math.PI/2]} position={[.79,-.54+y*.27,z*.25]} radialSegments={6}>
    <meshStandardMaterial color={brass} metalness={.73} roughness={.25} flatShading/>
   </RevolvedSurface>
  </group>))}
  {[-.92,.34].map(x=><group key={x} position={[x,-.1,0]}>
   <RevolvedSurface profile={[[0,-.12],[.094,-.12],[.1,.09],[.084,.12],[0,.12]]} radialSegments={6}>
    <meshStandardMaterial color={brass} metalness={.78} roughness={.28} flatShading/>
   </RevolvedSurface>
   <RevolvedSurface profile={[[0,-.045],[.052,-.045],[.052,.045],[0,.045]]} position={[0,.15,0]}>
    <meshStandardMaterial color={gasket} metalness={.2} roughness={.44}/>
   </RevolvedSurface>
  </group>)}
  <ExtrudedProfile points={[[-.25,-.09],[.25,-.09],[.25,.09],[-.25,.09]]} depth={.5} bevelSize={.015} bevelThickness={.014} position={[-.9,-1.16,0]}>
   <meshStandardMaterial color={dark} metalness={.71} roughness={.32}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={[[-.25,-.09],[.25,-.09],[.25,.09],[-.25,.09]]} depth={.5} bevelSize={.015} bevelThickness={.014} position={[.52,-1.16,0]}>
   <meshStandardMaterial color={dark} metalness={.71} roughness={.32}/>
  </ExtrudedProfile>
  <SplineTube points={[[-1.25,-.42,-.4],[-.92,-.38,-.48],[-.65,-.48,-.4]]} radius={.024}>
   <meshStandardMaterial color={warning} metalness={.55} roughness={.3}/>
  </SplineTube>
 </group>
}
