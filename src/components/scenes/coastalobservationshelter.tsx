import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Salt-weathered coastal viewing shelter: raised headland foundation, timber
 * boardwalk, wind screens, broad wing roof and continuous ocean-facing
 * safety rail. Exterior scenic visualization, not flood/structural CAD.
 */
const slate='#727f81', sand='#c2b89f', timber='#988268', steel='#47626b', glass='#7db3bd', white='#dad7cd', water='#45858d'
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const headland:Array<[number,number]>=[[-1.62,-.95],[-1.27,-1.35],[.63,-1.39],[1.52,-.65],[1.58,.65],[.57,1.31],[-1.49,1.20]]
const curvedRoof:Array<[number,number]>=[[-1.60,.02],[-1.43,.20],[-.96,.31],[.02,.39],[.91,.29],[1.47,.10],[1.58,-.08]]
const boardSlats=Array.from({length:22},(_,i)=>i)
const windColumns=[-1.3,-.68,0,.68,1.3]
const rails=[-1.25,-.84,-.42,0,.42,.84,1.25]
export default function CoastalObservationShelter(){
 return <group rotation={[0,-.4,0]} scale={.92} position={[0,-.12,0]}>
  <ExtrudedProfile points={headland} depth={.44} rotation={[Math.PI/2,0,0]} position={[0,-1.41,0]}>
   <meshStandardMaterial color={slate} roughness={.97} flatShading/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.1,1.79)} depth={.12} rotation={[Math.PI/2,0,0]} position={[0,-1.14,.05]}>
   <meshStandardMaterial color={sand} roughness={.87}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.90,1.08)} depth={.07} rotation={[Math.PI/2,0,0]} position={[0,-1.08,.45]}>
   <meshStandardMaterial color={timber} roughness={.72}/>
  </ExtrudedProfile>
  {boardSlats.map(i=><ExtrudedProfile key={i} points={rect(.072,.04)} depth={1.04} rotation={[Math.PI/2,0,0]} position={[-1.40+i*.133,-1.02,.44]}>
   <meshStandardMaterial color={i%3===0?'#ad9274':timber} roughness={.70}/>
  </ExtrudedProfile>)}
  {/* Wind-resistant roof wing with cast-in edge beam, not a generic pill. */}
  <ExtrudedProfile points={curvedRoof} depth={1.33} position={[0,.81,-.27]}>
   <meshPhysicalMaterial color={white} metalness={.32} roughness={.34} clearcoat={.16}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.28,.09)} depth={1.48} position={[0,.69,-.29]}>
   <meshStandardMaterial color={steel} metalness={.66} roughness={.34}/>
  </ExtrudedProfile>
  {windColumns.map(x=><group key={x}>
   <ExtrudedProfile points={rect(.074,1.42)} depth={.075} position={[x,-.30,-.82]}>
    <meshStandardMaterial color={steel} metalness={.71} roughness={.31}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.074,.065)} depth={1.28} position={[x,.50,-.29]}>
    <meshStandardMaterial color={steel} metalness={.73} roughness={.30}/>
   </ExtrudedProfile>
   <RevolvedSurface profile={[[0,-.06],[.09,-.06],[.09,.06],[0,.06]]} position={[x,-1.07,-.81]} radialSegments={10}>
    <meshStandardMaterial color={slate} roughness={.83}/>
   </RevolvedSurface>
  </group>)}
  {[-.97,.0,.97].map(x=><ExtrudedProfile key={x} points={rect(.94,1.06)} depth={.012} position={[x,-.38,-.84]}>
   <meshPhysicalMaterial color={glass} metalness={.06} roughness={.09} transparent opacity={.24} depthWrite={false} clearcoat={.96}/>
  </ExtrudedProfile>)}
  <ExtrudedProfile points={rect(2.80,.042)} depth={.06} position={[0,-.26,-.80]}>
   <meshStandardMaterial color={steel} metalness={.72} roughness={.30}/>
  </ExtrudedProfile>
  {/* Sea-facing guardrail and viewing bench. */}
  {rails.map(x=><ExtrudedProfile key={x} points={rect(.041,.55)} depth={.06} position={[x,-.74,1.09]}>
   <meshStandardMaterial color={steel} metalness={.71} roughness={.34}/>
  </ExtrudedProfile>)}
  <ExtrudedProfile points={rect(2.73,.048)} depth={.07} position={[0,-.47,1.09]}>
   <meshStandardMaterial color={steel} metalness={.72} roughness={.31}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(1.02,.08)} depth={.38} position={[.42,-.73,-.30]}>
   <meshStandardMaterial color={timber} roughness={.62}/>
  </ExtrudedProfile>
  {[-.01,.82].map(x=><ExtrudedProfile key={x} points={rect(.065,.37)} depth={.39} position={[x,-.98,-.30]}>
   <meshStandardMaterial color={steel} metalness={.69} roughness={.33}/>
  </ExtrudedProfile>)}
  <ExtrudedProfile points={rect(3.55,.06)} depth={.38} rotation={[Math.PI/2,0,0]} position={[0,-1.29,1.28]}>
   <meshPhysicalMaterial color={water} metalness={.07} roughness={.08} clearcoat={1} transparent opacity={.78}/>
  </ExtrudedProfile>
  <SplineTube points={[[-1.39,.78,-.84],[-.69,.92,-.82],[0,.99,-.81],[.70,.90,-.82],[1.38,.76,-.84]]} radius={.023} tubularSegments={65}>
   <meshStandardMaterial color={steel} metalness={.75} roughness={.30}/>
  </SplineTube>
 </group>
}
