import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** A production-style vacuum end-effector: central robot flange, beam-mounted
 * distribution block, individually sprung suction cups and vacuum feed hoses.
 * Illustrative geometry; not a verified load-rated lifting fixture.
 */
const aluminium='#adbfc4', steel='#65767e', blue='#58a4aa', black='#263239', rubber='#343b41', brass='#d6ac63'
const manifold:Array<[number,number]>=[[-1.16,-.11],[1.16,-.11],[1.16,.11],[-1.16,.11]]
const arm:Array<[number,number]>=[[-.11,-.64],[.11,-.64],[.11,.64],[-.11,.64]]
const plate:Array<[number,number]>=[[-.24,-.20],[.24,-.20],[.24,.20],[-.24,.20]]
const hub:Array<[number,number]>=[[0,-.13],[.26,-.13],[.28,.13],[0,.13]]
const bell:Array<[number,number]>=[[0,-.1],[.045,-.1],[.075,-.045],[.12,.035],[.18,.06],[.18,.10],[0,.10]]
const coupling:Array<[number,number]>=[[0,-.09],[.09,-.09],[.11,.09],[0,.09]]
const fittings:Array<[number,number,number]>=[[-.94,.45,-.38],[-.3,.45,-.38],[.3,.45,-.38],[.94,.45,-.38]]
export default function VacuumGripperArray(){
 return <group rotation={[0,-.32,0]} position={[0,.02,0]}>
  <RevolvedSurface profile={hub} position={[0,1.02,0]} radialSegments={40}>
   <meshStandardMaterial color={steel} metalness={.88} roughness={.27}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.2],[.17,-.2],[.17,.2],[0,.2]]} position={[0,.73,0]}>
   <meshPhysicalMaterial color={aluminium} metalness={.8} roughness={.28} clearcoat={.21}/>
  </RevolvedSurface>
  <ExtrudedProfile points={plate} depth={.52} bevelSize={.014} bevelThickness={.014} position={[0,.46,0]}>
   <meshStandardMaterial color={black} metalness={.68} roughness={.32}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={manifold} depth={.26} bevelSize={.012} bevelThickness={.01} position={[0,.23,0]}>
   <meshPhysicalMaterial color={aluminium} metalness={.84} roughness={.24} clearcoat={.13}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={arm} depth={.24} bevelSize={.013} bevelThickness={.01} position={[0,.23,0]} rotation={[0,0,Math.PI/2]}>
   <meshStandardMaterial color={steel} metalness={.76} roughness={.33}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={manifold} depth={.10} bevelSize={.005} bevelThickness={.006} position={[0,.05,-.4]}>
   <meshStandardMaterial color={blue} metalness={.53} roughness={.29}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={manifold} depth={.10} bevelSize={.005} bevelThickness={.006} position={[0,.05,.4]}>
   <meshStandardMaterial color={blue} metalness={.53} roughness={.29}/>
  </ExtrudedProfile>
  {[-.95,-.57,-.19,.19,.57,.95].flatMap(x=>[-.4,.4].map(z=><group key={x+':'+z} position={[x,0,z]}>
    <RevolvedSurface profile={coupling} position={[0,-.08,0]} radialSegments={12}>
     <meshStandardMaterial color={brass} metalness={.73} roughness={.3}/>
    </RevolvedSurface>
    <RevolvedSurface profile={[[0,-.30],[.054,-.30],[.054,.3],[0,.3]]} position={[0,-.46,0]} radialSegments={16}>
     <meshStandardMaterial color={aluminium} metalness={.88} roughness={.23}/>
    </RevolvedSurface>
    <RevolvedSurface profile={bell} position={[0,-.82,0]} radialSegments={30}>
     <meshPhysicalMaterial color={rubber} metalness={.04} roughness={.88}/>
    </RevolvedSurface>
    <RevolvedSurface profile={[[0,-.08],[.044,-.08],[.044,.08],[0,.08]]} position={[0,-.25,0]}>
     <meshStandardMaterial color={black} roughness={.7}/>
    </RevolvedSurface>
  </group>))}
  {fittings.map(([x,y,z],i)=><group key={i}>
   <RevolvedSurface profile={coupling} position={[x,y,z]} radialSegments={12}>
    <meshStandardMaterial color={brass} metalness={.76} roughness={.24}/>
   </RevolvedSurface>
   <SplineTube points={[[x,y+.1,z],[x*.6,y+.42,z-.07],[x*.28,.93,0]]} radius={.026} tubularSegments={40}>
    <meshStandardMaterial color={i%2?blue:black} roughness={.8}/>
   </SplineTube>
  </group>)}
  <SplineTube points={[[0,.93,0],[.22,1.27,.08],[.47,1.44,.20]]} radius={.042} tubularSegments={34}>
   <meshStandardMaterial color={black} roughness={.79}/>
  </SplineTube>
  <RevolvedSurface profile={[[0,-.09],[.06,-.09],[.06,.09],[0,.09]]} position={[.47,1.39,.2]}>
   <meshStandardMaterial color={brass} metalness={.77} roughness={.27}/>
  </RevolvedSurface>
 </group>
}
