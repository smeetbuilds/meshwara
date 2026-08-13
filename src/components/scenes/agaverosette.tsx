import { LeafSurface, LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'

const trunkPath:Array<[number,number,number]>=[[0,-.45,0],[0,-.2,0],[0,.05,0],[0,.25,0],[0,.45,0]]
const branches=[[[0,.05,0],[.42,.18,.02],[.95,.08,.06]],[[0,.05,0],[-.42,.18,-.03],[-.95,.08,-.08]],[[0,.1,0],[.15,.38,.04],[.35,.75,.06]],[[0,.1,0],[-.14,.38,-.04],[-.34,.75,-.06]]] as Array<Array<[number,number,number]>>
const leaves=[[.88,.08,.06,.15],[-.88,.08,-.08,-.18],[.36,.7,.06,.42],[-.34,.7,-.06,-.4],[.65,.38,.02,.3],[-.64,.36,-.02,-.32],[.12,.82,.02,.08],[-.1,.78,-.02,-.06]] as Array<[number,number,number,number]>
const trunkBody:LoftStation[]=[
  {x:-.34,width:.17,height:.15,y:-.78,exponent:2.4},{x:-.1,width:.145,height:.13,y:-.15,exponent:2.5},
  {x:.08,width:.11,height:.1,y:.48,exponent:2.35},{x:.28,width:.075,height:.07,y:1.04,exponent:2.2}
]
const leafColors=['#78947a','#91a88d','#627e69']

export default function AgaveRosette(){return <group position={[0,-.1,0]} rotation={[0,-.24,0]}>
  <LoftSurface stations={trunkBody} rotation={[0,0,.08]}><meshStandardMaterial color="#6a7958" roughness={.86}/></LoftSurface>
  <SplineTube points={trunkPath} radius={.075} tubularSegments={44} radialSegments={9}><meshStandardMaterial color="#6a7958" roughness={.9}/></SplineTube>
  {branches.map((points,i)=><SplineTube key={i} points={points} radius={.032-i*.002} tubularSegments={32} radialSegments={7}>
    <meshStandardMaterial color={i%2?"#66533b":"#556a42"} roughness={.82}/>
  </SplineTube>)}
  {leaves.map(([x,y,z,r],i)=><group key={i} position={[x,y,z]} rotation={[0,r,i%2?.34:-.28]}>
    <LeafSurface length={.58+(i%3)*.055} width={.25+(i%2)*.045} camber={.07} curl={(i%4-1.5)*.035} twist={(i%3-1)*.16} serration={i%2?3:0}>
      <meshPhysicalMaterial color={leafColors[i%3]} roughness={.48} clearcoat={.13}/>
    </LeafSurface>
    <LeafSurface length={.48} width={.035} camber={.012} position={[0,.006,.01]}>
      <meshStandardMaterial color="#9ca77a" roughness={.68}/>
    </LeafSurface>
  </group>)}
  <LoftSurface stations={[{x:-.92,width:.52,height:.06},{x:0,width:.9,height:.09},{x:.92,width:.5,height:.055}]} position={[0,-1.2,0]} radialSegments={30}>
    <meshStandardMaterial color="#736952" roughness={1}/>
  </LoftSurface>
</group>}
