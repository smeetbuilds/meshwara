import { LoftSurface, ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Studded football boot: close-fitting upper, molded heel cup, distinct
 * forefoot vamp, tongue and laces, rigid outsole and twelve grip studs.
 * Stud locations are illustrative, not approved for match surfaces.
 */
const upper='#24282e', vamp='#b3b9b3', red='#cf614d', black='#171e23', sole='#d5d0c3', studs='#9eaeac'
const soleStation=[
 {x:-1.06,y:-.26,width:.12,height:.055,exponent:3.6},
 {x:-.78,y:-.17,width:.27,height:.09,exponent:3.8},
 {x:-.45,y:-.13,width:.35,height:.12,exponent:4},
 {x:0,y:-.13,width:.37,height:.10,exponent:4},
 {x:.44,y:-.15,width:.30,height:.08,exponent:4},
 {x:.85,y:-.22,width:.16,height:.055,exponent:3.5},
 {x:1.08,y:-.26,width:.045,height:.045,exponent:3},
]
const upperStation=soleStation.map((s,i)=>({...s,y:s.y+[.17,.29,.44,.45,.37,.21,.10][i],height:s.height+[.09,.22,.29,.30,.27,.14,.05][i],width:s.width*.92}))
const heelCollar:Array<[number,number,number]>=[[-.93,.08,-.1],[-.79,.40,-.25],[-.52,.49,-.24],[-.33,.43,-.2]]
const studsX=[-.78,-.46,-.13,.18,.5,.78]
export default function ProFootballCleat(){
 return <group rotation={[0,-.45,-.04]} scale={1.04} position={[0,-.17,0]}>
  <LoftSurface stations={soleStation} radialSegments={40}>
   <meshPhysicalMaterial color={sole} roughness={.45} clearcoat={.2}/>
  </LoftSurface>
  <LoftSurface stations={upperStation} radialSegments={42}>
   <meshPhysicalMaterial color={upper} roughness={.40} clearcoat={.2}/>
  </LoftSurface>
  {[-1,1].map(side=><group key={side}>
   <SplineTube points={heelCollar.map(([x,y,z])=>[x,y,z*side] as [number,number,number])} radius={.043}>
    <meshStandardMaterial color={vamp} roughness={.70}/>
   </SplineTube>
   <SplineTube points={[[-.86,.08,side*.21],[-.50,.38,side*.32],[-.05,.48,side*.33],[.51,.30,side*.20],[.92,-.02,side*.11]]} radius={.023}>
    <meshStandardMaterial color={red} roughness={.55}/>
   </SplineTube>
   <SplineTube points={[[-.58,.25,side*.34],[-.19,.35,side*.38],[.32,.28,side*.31]]} radius={.02}>
    <meshStandardMaterial color={vamp} roughness={.62}/>
   </SplineTube>
  </group>)}
  {/* Matching lateral and medial stud rows actually project beneath the sole. */}
  {studsX.flatMap((x,i)=>[-1,1].map(side=><RevolvedSurface key={i+':'+side}
   profile={[[0,-.12],[.045,-.12],[.095,.11],[0,.11]]}
   position={[x,-.40+(i%3)*.018,side*(.17+(i>1&&i<5?.10:0))]} radialSegments={10}>
    <meshPhysicalMaterial color={studs} metalness={.44} roughness={.35}/>
   </RevolvedSurface>))}
  <ExtrudedProfile points={[[-.24,-.19],[.24,-.19],[.19,.21],[-.19,.21]]} depth={.10} bevelSize={.022} bevelThickness={.02} rotation={[0,0,.12]} position={[-.15,.45,0]}>
   <meshStandardMaterial color={upper} roughness={.55}/>
  </ExtrudedProfile>
  {Array.from({length:5},(_,i)=><SplineTube key={i} points={[[-.48+i*.14,.48,-.16],[-.42+i*.14,.52,0],[-.48+i*.14,.48,.16]]} radius={.012} tubularSegments={16}>
   <meshStandardMaterial color={vamp} roughness={.74}/>
  </SplineTube>)}
  <RevolvedSurface profile={[[0,-.05],[.07,-.05],[.07,.05],[0,.05]]} position={[-.68,.16,0]}>
   <meshStandardMaterial color={red} roughness={.48}/>
  </RevolvedSurface>
 </group>
}
