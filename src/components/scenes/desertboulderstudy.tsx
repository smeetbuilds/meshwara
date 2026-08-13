import { LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'

const mainRock:LoftStation[]=[
  {x:-.82,width:.3,height:.34,y:-.12,exponent:2,twist:.2},{x:-.43,width:.55,height:.62,y:.01,z:-.03,exponent:2.1},
  {x:.02,width:.64,height:.7,y:.13,z:.02,exponent:2.25,twist:-.1},{x:.46,width:.47,height:.48,y:.02,z:.08,exponent:2},{x:.8,width:.25,height:.27,y:-.14,z:.04,exponent:2.2}
]
const sideRock:LoftStation[]=[
  {x:-.48,width:.2,height:.18,y:-.08,exponent:2},{x:-.12,width:.38,height:.42,y:.03,exponent:2.15},{x:.24,width:.42,height:.36,y:-.03,exponent:2},{x:.5,width:.18,height:.16,y:-.1,exponent:2.2}
]
const foreground:LoftStation[]=[
  {x:-.4,width:.16,height:.15,y:-.08},{x:0,width:.33,height:.31,y:.02,exponent:2.05},{x:.4,width:.15,height:.14,y:-.08}
]
export default function DesertBoulderStudy(){return <group position={[0,-.45,0]}>
  <LoftSurface stations={mainRock} radialSegments={42} rotation={[0,-.22,.04]}><meshPhysicalMaterial color="#a76f55" roughness={.88} clearcoat={.025}/></LoftSurface>
  <LoftSurface stations={sideRock} radialSegments={36} position={[.78,-.22,-.3]} rotation={[0,.5,-.08]}><meshStandardMaterial color="#c08a67" roughness={.94}/></LoftSurface>
  <LoftSurface stations={foreground} position={[-.84,-.3,.26]} rotation={[0,-.2,.1]}><meshStandardMaterial color="#8c5d49" roughness={.93}/></LoftSurface>
  {[-.34,-.08,.18,.42].map((y,i)=><SplineTube key={i} points={[[-.58,y,.48],[-.18,y+.04,.59],[.24,y-.02,.58],[.52,y,.42]]} radius={.011+(i%2)*.003} tubularSegments={28} radialSegments={6}>
    <meshStandardMaterial color={i%2?"#754a3c":"#d49c77"} roughness={1}/>
  </SplineTube>)}
  <SplineTube points={[[-.44,.58,.22],[-.12,.64,.34],[.2,.57,.38],[.42,.44,.3]]} radius={.014}><meshStandardMaterial color="#6e4638" roughness={1}/></SplineTube>
  <LoftSurface stations={[{x:-1.1,width:.7,height:.045},{x:0,width:1.2,height:.08},{x:1.12,width:.68,height:.04}]} position={[0,-.68,0]}><meshStandardMaterial color="#c6a173" roughness={1}/></LoftSurface>
</group>}
