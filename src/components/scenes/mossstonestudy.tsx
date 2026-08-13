import { LeafSurface, LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'

const rockBody:LoftStation[]=[
  {x:-.84,width:.4,height:.34,y:-.1,z:.02,exponent:2.1,twist:.12},{x:-.42,width:.62,height:.54,y:.03,exponent:2.0},
  {x:.02,width:.72,height:.62,y:.12,z:-.04,exponent:2.2,twist:-.1},{x:.48,width:.5,height:.44,y:.02,z:.06,exponent:2.0},{x:.84,width:.28,height:.28,y:-.1,z:.08,exponent:2.2}
]
const mossCap:LoftStation[]=[
  {x:-.58,width:.22,height:.11,y:.36,exponent:2},{x:-.18,width:.5,height:.18,y:.53,exponent:2},{x:.22,width:.56,height:.2,y:.56,exponent:2.1},{x:.6,width:.2,height:.1,y:.34,exponent:2}
]
const patches=[[-.52,.48,.12,-.4],[-.18,.66,.04,.2],[.18,.7,-.02,-.2],[.48,.48,.1,.45]] as Array<[number,number,number,number]>
export default function MossStoneStudy(){return <group position={[0,-.45,0]} rotation={[0,-.35,0]}>
  <LoftSurface stations={rockBody} radialSegments={42}><meshPhysicalMaterial color="#74746b" roughness={.83} clearcoat={.03}/></LoftSurface>
  <LoftSurface stations={mossCap} radialSegments={34}><meshStandardMaterial color="#4f6f45" roughness={.98}/></LoftSurface>
  {patches.map(([x,y,z,r],i)=><group key={i} position={[x,y,z]} rotation={[0,r,.2]}>
    <LeafSurface length={.34} width={.18} camber={.052} curl={i%2?.04:-.03}><meshStandardMaterial color={i%2?"#739158":"#617c4e"} roughness={1}/></LeafSurface>
    <LeafSurface length={.25} width={.11} camber={.035} rotation={[0,.7,0]}><meshStandardMaterial color="#879d66" roughness={1}/></LeafSurface>
  </group>)}
  <SplineTube points={[[-.72,.18,.44],[-.34,.3,.56],[.02,.34,.62],[.5,.16,.46]]} radius={.012} tubularSegments={36} radialSegments={6}><meshStandardMaterial color="#aaa088" roughness={1}/></SplineTube>
  <LoftSurface stations={[{x:-.98,width:.55,height:.05},{x:0,width:1.02,height:.08},{x:.98,width:.54,height:.05}]} position={[0,-.48,0]}><meshStandardMaterial color="#766b55" roughness={1}/></LoftSurface>
</group>}
