import { CC0Surface } from '../geometry/CC0Surface'
import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Narrow three-level brick row house with authentic punched windows, lintels,
 * recessed entrance, cast-iron stoop rails and rooftop cornice. This is a
 * conceptual facade study, not a surveyed building or construction drawing.
 */
const brick='#a9745b', mortar='#d0baa6', iron='#333b3e', glass='#77949a', wood='#625b4b', stone='#b9b0a0', trim='#e0d4bd'
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const levels=[-.84,-.06,.72]
const bays=[-.58,.56]
const courses=Array.from({length:15},(_,i)=>i)
export default function UrbanRowHouse(){
 return <group rotation={[0,-.38,0]} scale={.90} position={[0,-.15,0]}>
  <ExtrudedProfile points={rect(1.90,2.73)} depth={1.20} bevelSize={.018} bevelThickness={.014} position={[0,-.02,-.26]}>
   <CC0Surface texture="brick" />
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.13,.22)} depth={1.46} position={[0,1.37,-.27]}>
   <meshStandardMaterial color={trim} roughness={.70}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.0,.065)} depth={1.38} position={[0,1.21,-.25]}>
   <meshStandardMaterial color={iron} metalness={.45} roughness={.45}/>
  </ExtrudedProfile>
  {/* Façade windows are punched, glazed and double-framed by masonry lintels. */}
  {levels.flatMap((y,level)=>bays.map((x,bay)=><group key={level+':'+bay}>
   <ExtrudedProfile points={rect(.55,.59)} depth={.035} position={[x,y,.367]}>
    <meshStandardMaterial color={mortar} roughness={.79}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.44,.49)} depth={.018} position={[x,y,.393]}>
    <meshPhysicalMaterial color={glass} metalness={.08} roughness={.095} transparent opacity={.39} depthWrite={false} clearcoat={.8}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.045,.54)} depth={.035} position={[x,y,.412]}>
    <meshStandardMaterial color={iron} metalness={.58} roughness={.41}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.48,.035)} depth={.035} position={[x,y,.416]}>
    <meshStandardMaterial color={iron} metalness={.55} roughness={.40}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.69,.06)} depth={.085} position={[x,y+.34,.394]}>
    <meshStandardMaterial color={trim} roughness={.67}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.66,.07)} depth={.12} position={[x,y-.35,.42]}>
    <meshStandardMaterial color={stone} roughness={.75}/>
   </ExtrudedProfile>
  </group>))}
  <ExtrudedProfile points={rect(.58,.90)} depth={.048} position={[0,-.92,.389]}>
   <meshPhysicalMaterial color={wood} roughness={.58} clearcoat={.08}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(.62,.055)} depth={.10} position={[0,-.42,.41]}>
   <meshStandardMaterial color={trim} roughness={.67}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={[[0,-.025],[.031,-.025],[.031,.025],[0,.025]]} rotation={[Math.PI/2,0,0]} position={[.21,-.84,.454]} radialSegments={12}>
   <meshStandardMaterial color={stone} metalness={.7} roughness={.26}/>
  </RevolvedSurface>
  <ExtrudedProfile points={rect(1.84,.15)} depth={.75} rotation={[Math.PI/2,0,0]} position={[0,-1.46,.68]}>
   <CC0Surface texture="concrete" />
  </ExtrudedProfile>
  {[-1.31,-1.20,-1.09].map((y,i)=><ExtrudedProfile key={i} points={rect(.94,.11)} depth={.16+i*.15} rotation={[Math.PI/2,0,0]} position={[0,y,.90+i*.14]}>
   <meshStandardMaterial color={stone} roughness={.84}/>
  </ExtrudedProfile>)}
  {courses.map(i=><ExtrudedProfile key={i} points={rect(1.84,.013)} depth={.009} position={[0,-1.23+i*.17,.35]}>
   <meshStandardMaterial color={mortar} roughness={.92}/>
  </ExtrudedProfile>)}
  {/* Upper-level balcony has true separate metal balusters and deck. */}
  <ExtrudedProfile points={rect(1.72,.11)} depth={.50} rotation={[Math.PI/2,0,0]} position={[0,-.41,.53]}>
   <meshStandardMaterial color={iron} metalness={.59} roughness={.45}/>
  </ExtrudedProfile>
  {Array.from({length:12},(_,i)=><ExtrudedProfile key={i} points={rect(.027,.47)} depth={.04} position={[-.78+i*.14,-.14,.84]}>
   <meshStandardMaterial color={iron} metalness={.78} roughness={.32}/>
  </ExtrudedProfile>)}
  <ExtrudedProfile points={rect(1.78,.048)} depth={.07} position={[0,.13,.86]}>
   <meshStandardMaterial color={iron} metalness={.79} roughness={.32}/>
  </ExtrudedProfile>
  <SplineTube points={[[-.88,-.42,.86],[-.88,-.12,.86],[-.88,.13,.86]]} radius={.025}>
   <meshStandardMaterial color={iron} metalness={.76} roughness={.34}/>
  </SplineTube>
 </group>
}
