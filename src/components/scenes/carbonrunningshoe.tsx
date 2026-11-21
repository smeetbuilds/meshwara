import { LoftSurface, ExtrudedProfile, SplineTube, RevolvedSurface } from '../geometry/GeometryV2'

/** Neutral racing sneaker: tapering mesh upper, heel collar, tongue, lacing
 * system, carbon plate, stacked foam midsole and recessed outsole tread.
 * This is an authored design study, not a scanned commercial shoe last.
 */
const mesh='#d9e0da', sole='#f0eee4', outsole='#3b4549', carbon='#202b36', lime='#bdce52', lining='#647576'
const profile=[
 {x:-1.05,y:-.16,width:.13,height:.09,exponent:3.8},
 {x:-.80,y:-.08,width:.28,height:.16,exponent:3.8},
 {x:-.45,y:-.02,width:.37,height:.20,exponent:4.2},
 {x:.02,y:-.01,width:.40,height:.19,exponent:4.2},
 {x:.46,y:-.04,width:.32,height:.15,exponent:4.1},
 {x:.84,y:-.13,width:.22,height:.1,exponent:3.8},
 {x:1.08,y:-.21,width:.07,height:.06,exponent:3},
]
const upper=[
 {x:-1.00,y:.01,width:.13,height:.10,exponent:3.2},
 {x:-.75,y:.11,width:.28,height:.26,exponent:3.2},
 {x:-.46,y:.29,width:.32,height:.32,exponent:3},
 {x:-.08,y:.30,width:.35,height:.35,exponent:3.3},
 {x:.35,y:.24,width:.27,height:.27,exponent:3.3},
 {x:.75,y:.09,width:.17,height:.16,exponent:3.2},
 {x:1.04,y:-.01,width:.05,height:.06,exponent:3},
]
const eyelets=[-.44,-.29,-.14,.01,.16]
export default function CarbonRunningShoe(){
 return <group rotation={[0,-.45,-.025]} scale={1.05} position={[0,-.17,0]}>
  <LoftSurface stations={profile} radialSegments={40}>
   <meshPhysicalMaterial color={sole} metalness={.02} roughness={.59} clearcoat={.12}/>
  </LoftSurface>
  <LoftSurface stations={profile.map(s=>({...s,y:s.y-.125,width:s.width*.96,height:s.height*.30}))} radialSegments={40}>
   <meshStandardMaterial color={outsole} roughness={.80}/>
  </LoftSurface>
  <LoftSurface stations={upper} radialSegments={44}>
   <meshPhysicalMaterial color={mesh} roughness={.58} metalness={0} clearcoat={.08}/>
  </LoftSurface>
  {/* The colored carbon insert runs inside a real stacked sole. */}
  <SplineTube points={[[-.86,-.15,.23],[-.45,-.10,.34],[0,-.07,.39],[.54,-.13,.28],[.92,-.24,.13]]} radius={.028}>
   <meshStandardMaterial color={carbon} metalness={.44} roughness={.35}/>
  </SplineTube>
  {[-1,1].map(side=><group key={side}>
   <SplineTube points={[[-.82,-.04,side*.22],[-.58,.25,side*.30],[-.10,.39,side*.33],[.39,.28,side*.27],[.80,.08,side*.13]]} radius={.023}>
    <meshStandardMaterial color={lime} roughness={.53}/>
   </SplineTube>
   <SplineTube points={[[-.70,.10,side*.31],[-.47,.30,side*.38],[-.19,.34,side*.39],[.11,.30,side*.37]]} radius={.013}>
    <meshStandardMaterial color={lining} roughness={.73}/>
   </SplineTube>
  </group>)}
  <ExtrudedProfile points={[[-.29,-.25],[.29,-.25],[.21,.26],[-.21,.26]]} depth={.12} bevelSize={.025} bevelThickness={.02} rotation={[0,0,.18]} position={[-.22,.42,.0]}>
   <meshStandardMaterial color={outsole} roughness={.68}/>
  </ExtrudedProfile>
  {eyelets.map((x,i)=><group key={i}>
   {[-1,1].map(side=><RevolvedSurface key={side} profile={[[0,-.04],[.03,-.04],[.03,.04],[0,.04]]} position={[x,.55-i*.013,side*.17]} radialSegments={10}>
    <meshStandardMaterial color={carbon} metalness={.6} roughness={.4}/>
   </RevolvedSurface>)}
   <SplineTube points={[[x,.55-i*.013,-.18],[x+.08,.60-i*.010,0],[x,.55-i*.013,.18]]} radius={.011} tubularSegments={17}>
    <meshStandardMaterial color={lime} roughness={.74}/>
   </SplineTube>
  </group>)}
  {Array.from({length:13},(_,i)=><mesh key={i} position={[-.93+i*.15,-.31,0]}>
   <boxGeometry args={[.045,.038,.33]}/>
   <meshStandardMaterial color={outsole} roughness={.91}/>
  </mesh>)}
 </group>
}
