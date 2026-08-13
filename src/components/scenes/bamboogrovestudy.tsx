import { LeafSurface, LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'

const trunkPath:Array<[number,number,number]>=[[-.55,-1.3,0],[-.52,-.55,.02],[-.48,.25,.01],[-.44,1.05,-.02],[-.42,1.5,-.03]]
const branches=[[[-.5,.25,0],[-.22,.52,.08],[.12,.68,.12]],[[-.46,.7,0],[-.18,.9,-.08],[.2,1.02,-.12]],[[.15,.1,.12],[.42,.42,.16],[.68,.66,.12]],[[.42,.64,-.08],[.66,.9,-.1],[.88,1.08,-.08]]] as Array<Array<[number,number,number]>>
const leaves=[[.12,.68,.12,-.2],[.22,.98,-.12,.22],[.66,.66,.12,-.42],[.88,1.08,-.08,.38],[-.18,.54,.08,.5],[-.12,.9,-.08,-.45],[.48,.45,.14,.28],[.72,.9,-.1,-.22]] as Array<[number,number,number,number]>
const trunkBody:LoftStation[]=[
  {x:-.34,width:.17,height:.15,y:-.78,exponent:2.4},{x:-.1,width:.145,height:.13,y:-.15,exponent:2.5},
  {x:.08,width:.11,height:.1,y:.48,exponent:2.35},{x:.28,width:.075,height:.07,y:1.04,exponent:2.2}
]
const leafColors=['#789653','#91aa62','#5e7e48']

export default function BambooGroveStudy(){return <group position={[0,-.1,0]} rotation={[0,-.24,0]}>
  <LoftSurface stations={trunkBody} rotation={[0,0,.08]}><meshStandardMaterial color="#708b4d" roughness={.86}/></LoftSurface>
  <SplineTube points={trunkPath} radius={.075} tubularSegments={44} radialSegments={9}><meshStandardMaterial color="#708b4d" roughness={.9}/></SplineTube>
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
