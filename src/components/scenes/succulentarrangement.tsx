import { LeafSurface, LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'

const trunkPath:Array<[number,number,number]>=[[0,-.6,0],[0,-.3,0],[0,0,0],[0,.3,0],[0,.55,0]]
const branches=[[[0,.1,0],[.32,.25,.04],[.66,.3,.08]],[[0,.1,0],[-.32,.24,-.04],[-.66,.32,-.08]],[[0,.18,0],[.12,.44,.04],[.24,.72,.06]],[[0,.18,0],[-.12,.44,-.04],[-.24,.72,-.06]]] as Array<Array<[number,number,number]>>
const leaves=[[.62,.3,.08,.25],[-.62,.32,-.08,-.26],[.25,.7,.06,.46],[-.25,.7,-.06,-.44],[.42,.5,.04,.34],[-.44,.48,-.04,-.36],[.08,.76,.02,.12],[-.08,.74,-.02,-.1]] as Array<[number,number,number,number]>
const trunkBody:LoftStation[]=[
  {x:-.34,width:.17,height:.15,y:-.78,exponent:2.4},{x:-.1,width:.145,height:.13,y:-.15,exponent:2.5},
  {x:.08,width:.11,height:.1,y:.48,exponent:2.35},{x:.28,width:.075,height:.07,y:1.04,exponent:2.2}
]
const leafColors=['#789d80','#9ab29a','#668d71']

export default function SucculentArrangement(){return <group position={[0,-.1,0]} rotation={[0,-.24,0]}>
  <LoftSurface stations={trunkBody} rotation={[0,0,.08]}><meshStandardMaterial color="#665b48" roughness={.86}/></LoftSurface>
  <SplineTube points={trunkPath} radius={.075} tubularSegments={44} radialSegments={9}><meshStandardMaterial color="#665b48" roughness={.9}/></SplineTube>
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
