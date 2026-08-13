import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'
const frame:Array<[number,number,number]>=[[-.02,-.18,0],[-.5,.04,0],[-.72,.5,0],[-.62,.98,0],[-.28,1.3,0],[.28,1.3,0],[.62,.98,0],[.72,.5,0],[.5,.04,0],[.02,-.18,0],[-.02,-.18,0]]
const throat:Array<[number,number]>=[[-.28,-.34],[.28,-.34],[.16,.12],[.09,.36],[-.09,.36],[-.16,.12]]
const handle:Array<[number,number,number]>=[[0,-.2,0],[0,-.48,0],[0,-.82,0],[0,-1.2,0]]
const buttProfile:Array<[number,number]>=[[0,-.085],[.105,-.078],[.14,-.03],[.15,.04],[.11,.085],[0,.095]]
const capDetail:Array<[number,number,number]>=[[-.11,-1.18,.035],[0,-1.24,.055],[.11,-1.18,.035]]
const stringX=[-.48,-.36,-.24,-.12,0,.12,.24,.36,.48]
const stringY=[.1,.24,.38,.52,.66,.8,.94,1.08,1.2]
export default function TourTennisRacket(){return <group rotation={[0,-.28,.08]} scale={.86}>
<SplineTube points={frame} closed radius={.052} tubularSegments={120} radialSegments={12}><meshPhysicalMaterial color="#15181b" roughness={.24} clearcoat={.48}/></SplineTube>
<ExtrudedProfile points={throat} depth={.08} bevelSize={.018} bevelThickness={.018} bevelSegments={4} position={[0,-.02,0]}><meshPhysicalMaterial color="#262b30" roughness={.3} clearcoat={.38}/></ExtrudedProfile>
<SplineTube points={handle} radius={.065} tubularSegments={54} radialSegments={10}><meshPhysicalMaterial color="#b7804f" roughness={.54} clearcoat={.12}/></SplineTube>
<RevolvedSurface profile={buttProfile} radialSegments={42} position={[0,-1.24,0]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#3d4246" metalness={.46} roughness={.3} clearcoat={.22}/></RevolvedSurface>
<SplineTube points={capDetail} radius={.009} tubularSegments={28} radialSegments={6}><meshStandardMaterial color="#df704d" roughness={.36}/></SplineTube>
{stringX.map((x)=><SplineTube key={`x${x}`} points={[[x,.08,.012],[x,1.18,.012]]} radius={.0045} tubularSegments={18} radialSegments={5}><meshStandardMaterial color="#d9dde0" roughness={.5}/></SplineTube>)}
{stringY.map((y)=><SplineTube key={`y${y}`} points={[[-.5,y,.014],[.5,y,.014]]} radius={.0045} tubularSegments={18} radialSegments={5}><meshStandardMaterial color="#d9dde0" roughness={.5}/></SplineTube>)}
<SplineTube points={[[-.15,-.76,.07],[0,-.82,.11],[.15,-.76,.07]]} radius={.012} tubularSegments={24} radialSegments={6}><meshPhysicalMaterial color="#ec6549" roughness={.25} clearcoat={.35}/></SplineTube>
</group>}
