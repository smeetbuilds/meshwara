import * as THREE from 'three'
import { ExtrudedProfile, LoftSurface, SplineTube } from '../geometry/GeometryV2'

/**
 * Shortboard with continuous tapered EPS/epoxy rail profile, lifted nose,
 * pinched squash tail, inset deck design, traction pad, leash plug and
 * three individually foiled fins. Illustrative, not a tested hydrofoil.
 */
const deck='#f4eee1', rail='#cddbd7', ink='#28485a'
type P=[number,number,number]
const shape=[
  [-1.82,-.016,.04,.025],[-1.73,-.020,.18,.053],
  [-1.54,-.018,.32,.068],[-1.28,-.017,.43,.074],
  [-.86,-.018,.52,.076],[-.42,-.012,.55,.077],
  [0,.002,.54,.077],[.45,.026,.49,.069],
  [.89,.055,.43,.058],[1.22,.093,.34,.049],
  [1.47,.136,.25,.043],[1.65,.187,.14,.037],
  [1.75,.215,.022,.017],
] as const
const stations=shape.map(([x,y,width,height])=>({x,y,width,height,exponent:2.5}))
const topLine=(lateral:number,extra=0):P[] => shape.slice(1,-1).map(([x,y,width,height])=>[
  x,y+height+extra,lateral*width*.93
])
const padRibs=[-1.51,-1.37,-1.23,-1.09,-.95]
const fins=[{x:-1.24,z:-.27,tilt:-.12},{x:-1.24,z:.27,tilt:.12},{x:-1.40,z:0,tilt:0}]
const finProfile:[number,number][]=[[-.21,0],[.18,0],[.14,-.38],[-.10,-.46],[-.16,-.37]]
function Fin({x,z,tilt}:{x:number;z:number;tilt:number}) {
  return <group position={[x,-.12,z]} rotation={[0,tilt,0]}>
    <ExtrudedProfile points={finProfile} depth={.065} bevelSize={.011}
      bevelThickness={.011} bevelSegments={3} castShadow>
      <meshPhysicalMaterial color="#253b47" metalness={.13} roughness={.29}
        clearcoat={.73} clearcoatRoughness={.18}/>
    </ExtrudedProfile>
    <mesh position={[-.02,-.029,.043]}>
      <boxGeometry args={[.30,.034,.010]}/>
      <meshStandardMaterial color="#9cbab5" metalness={.19} roughness={.48}/>
    </mesh>
  </group>
}
export default function PerformanceSurfboard(){
  return <group rotation={[.07,-.45,-.16]} scale={.93}>
    <LoftSurface stations={stations} radialSegments={64} castShadow receiveShadow>
      <meshPhysicalMaterial color={deck} metalness={.03} roughness={.30}
        clearcoat={.92} clearcoatRoughness={.14}/>
    </LoftSurface>
    <SplineTube points={topLine(-1,.005)} radius={.009} radialSegments={7} tubularSegments={82}>
      <meshPhysicalMaterial color={rail} roughness={.31} metalness={.07} clearcoat={.62}/>
    </SplineTube>
    <SplineTube points={topLine(1,.005)} radius={.009} radialSegments={7} tubularSegments={82}>
      <meshPhysicalMaterial color={rail} roughness={.31} metalness={.07} clearcoat={.62}/>
    </SplineTube>
    <SplineTube points={topLine(0,.015)} radius={.025} radialSegments={9} tubularSegments={92}>
      <meshPhysicalMaterial color={ink} roughness={.33} metalness={.05} clearcoat={.85}/>
    </SplineTube>
    {[ -.20,.20 ].map(z=><SplineTube key={z}
      points={shape.slice(3,-2).map(([x,y,,height]):P=>[x,y+height+.014,z])}
      radius={.009} radialSegments={7} tubularSegments={64}>
      <meshPhysicalMaterial color="#86aeb0" roughness={.28} clearcoat={.85}/>
    </SplineTube>)}
    <mesh position={[-1.30,.065,0]}>
      <boxGeometry args={[.63,.016,.68]}/>
      <meshPhysicalMaterial color="#363e40" roughness={.92} metalness={.0}/>
    </mesh>
    {padRibs.map(x=><mesh key={x} position={[x,.080,0]}>
      <boxGeometry args={[.026,.011,.60]}/>
      <meshStandardMaterial color="#697171" roughness={.95}/>
    </mesh>)}
    <mesh position={[-1.64,.06,0]}>
      <cylinderGeometry args={[.072,.072,.018,28]}/>
      <meshPhysicalMaterial color="#394a52" roughness={.37} metalness={.5}/>
    </mesh>
    <mesh position={[-1.64,.073,0]} rotation={[Math.PI/2,0,0]}>
      <torusGeometry args={[.038,.011,10,28]}/>
      <meshPhysicalMaterial color="#bdc6c4" roughness={.24} metalness={.84}/>
    </mesh>
    {fins.map((fin,i)=><Fin key={i} {...fin}/>)}
    <mesh position={[.87,.155,.0]} rotation={[0,0,-.02]}>
      <boxGeometry args={[.30,.009,.034]}/>
      <meshPhysicalMaterial color="#9dbfba" metalness={.04} roughness={.29} clearcoat={.7}/>
    </mesh>
    <mesh position={[1.23,.181,0]}>
      <boxGeometry args={[.12,.009,.15]}/>
      <meshPhysicalMaterial color="#e5ba78" roughness={.40} metalness={.08} clearcoat={.45}/>
    </mesh>
  </group>
}
