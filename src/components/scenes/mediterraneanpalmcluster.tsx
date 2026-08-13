import { LeafSurface, LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'

const trunkPath:Array<[number,number,number]>=[[-.3,-1.3,0],[-.28,-.6,.02],[-.18,.12,.05],[-.05,.82,.02],[.04,1.25,-.02]]
const branches=[[[.04,1.2,0],[.55,1.45,.06],[1.15,1.32,.08]],[[.04,1.2,0],[-.55,1.48,-.08],[-1.16,1.34,-.1]],[[.02,1.18,0],[.35,1.62,-.02],[.82,1.78,-.04]],[[.02,1.18,0],[-.3,1.6,.04],[-.76,1.76,.1]]] as Array<Array<[number,number,number]>>
const leaves=[[1.0,1.34,.08,-.2],[.72,1.4,.06,.12],[-1.0,1.35,-.1,.24],[-.72,1.42,-.05,-.12],[.72,1.76,-.04,.38],[.42,1.63,-.02,-.2],[-.7,1.74,.1,-.34],[-.42,1.62,.06,.2]] as Array<[number,number,number,number]>
const trunkBody:LoftStation[]=[
  {x:-.34,width:.17,height:.15,y:-.78,exponent:2.4},{x:-.1,width:.145,height:.13,y:-.15,exponent:2.5},
  {x:.08,width:.11,height:.1,y:.48,exponent:2.35},{x:.28,width:.075,height:.07,y:1.04,exponent:2.2}
]
const leafColors=['#6d8750','#829a5c','#506d45']

export default function MediterraneanPalmCluster(){return <group position={[0,-.1,0]} rotation={[0,-.24,0]}>
  <LoftSurface stations={trunkBody} rotation={[0,0,.08]}><meshStandardMaterial color="#8b6945" roughness={.86}/></LoftSurface>
  <SplineTube points={trunkPath} radius={.075} tubularSegments={44} radialSegments={9}><meshStandardMaterial color="#8b6945" roughness={.9}/></SplineTube>
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
