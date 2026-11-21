import { LoftSurface, ExtrudedProfile, SplineTube, RevolvedSurface } from '../geometry/GeometryV2'

/** Vented aerodynamic cycling helmet with a continuous outer shell, recessed
 * front airflow channels, foam rim, occipital rear dial and chin straps.
 * Protective performance is not tested or certified.
 */
const gloss='#e8ece7', carbon='#2d363b', vent='#161f22', turquoise='#65c2c7', foam='#464d4e'
const stations=[
 {x:-1,y:-.22,width:.19,height:.10,exponent:2.5},
 {x:-.83,y:.01,width:.35,height:.32,exponent:2.7},
 {x:-.55,y:.18,width:.48,height:.44,exponent:2.8},
 {x:-.10,y:.25,width:.54,height:.49,exponent:2.8},
 {x:.39,y:.20,width:.48,height:.42,exponent:2.7},
 {x:.78,y:.08,width:.32,height:.27,exponent:2.7},
 {x:1,y:-.03,width:.12,height:.13,exponent:2.5},
]
const channels=[-.29,0,.29]
const rim:Array<[number,number,number]>=[[-.90,-.25,-.05],[-.64,-.38,.27],[-.20,-.43,.39],[.30,-.38,.36],[.78,-.23,.20],[1,-.07,0]]
const strap:Array<[number,number,number]>=[[-.63,-.31,.33],[-.40,-.84,.30],[.12,-1.08,.31],[.64,-.42,.29]]
export default function AeroCyclingHelmet(){
 return <group rotation={[0,-.47,-.03]} position={[0,.16,0]}>
  <LoftSurface stations={stations} radialSegments={56} castShadow receiveShadow>
   <meshPhysicalMaterial color={gloss} metalness={.13} roughness={.23} clearcoat={.85} clearcoatRoughness={.17}/>
  </LoftSurface>
  <LoftSurface stations={stations.map(s=>({...s,y:s.y-.12,width:s.width*.92,height:s.height*.83}))} radialSegments={44}>
   <meshStandardMaterial color={foam} metalness={.04} roughness={.81} side={2}/>
  </LoftSurface>
  {/* Three separated black airflow channels follow the shell profile. */}
  {channels.map((z,i)=><group key={i}>
   <SplineTube points={[[-.80,.09,z*.49],[-.44,.51,z*.75],[0,.68,z*.88],[.45,.55,z*.78],[.81,.25,z*.45]]} radius={.045} tubularSegments={55}>
    <meshPhysicalMaterial color={vent} metalness={.1} roughness={.51}/>
   </SplineTube>
   <SplineTube points={[[-.74,.14,z*.51],[-.40,.56,z*.75],[.08,.73,z*.82],[.47,.59,z*.73]]} radius={.013} tubularSegments={55}>
    <meshStandardMaterial color={turquoise} metalness={.2} roughness={.32}/>
   </SplineTube>
  </group>)}
  {[-1,1].map(side=><group key={side}>
   <SplineTube points={rim.map(([x,y,z])=>[x,y,z*side] as [number,number,number])} radius={.064} tubularSegments={54}>
    <meshStandardMaterial color={foam} roughness={.89}/>
   </SplineTube>
   <SplineTube points={strap.map(([x,y,z])=>[x,y,z*side] as [number,number,number])} radius={.028} tubularSegments={50}>
    <meshStandardMaterial color={carbon} roughness={.84}/>
   </SplineTube>
   <ExtrudedProfile points={[[-.11,-.055],[.11,-.055],[.11,.055],[-.11,.055]]} depth={.05} bevelSize={.008} bevelThickness={.007} rotation={[0,0,.27]} position={[.14,-1.07,side*.31]}>
    <meshStandardMaterial color={turquoise} metalness={.42} roughness={.38}/>
   </ExtrudedProfile>
  </group>)}
  <mesh position={[.89,-.13,0]} rotation={[0,0,Math.PI/2]}>
   <cylinderGeometry args={[.105,.105,.12,24]}/>
   <meshStandardMaterial color={carbon} metalness={.2} roughness={.52}/>
  </mesh>
  {/* Rear retention adjustment and foam seating points at the nape. */}
  <ExtrudedProfile points={[[-.17,-.09],[.17,-.09],[.17,.09],[-.17,.09]]} depth={.14} bevelSize={.018} bevelThickness={.013} position={[.87,-.28,0]}>
   <meshPhysicalMaterial color={carbon} metalness={.32} roughness={.37}/>
  </ExtrudedProfile>
  {[-1,1].map(side=><RevolvedSurface key={side} profile={[[0,-.07],[.07,-.07],[.07,.07],[0,.07]]} rotation={[Math.PI/2,0,0]} position={[.58,-.35,side*.20]} radialSegments={14}>
    <meshStandardMaterial color={foam} roughness={.88}/>
  </RevolvedSurface>)}
 </group>
}
