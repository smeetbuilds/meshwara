import { RevolvedSurface, SplineTube } from '../geometry/GeometryV2'
const plateProfile:Array<[number,number]>=[[0,-.22],[.3,-.21],[.38,-.14],[.42,0],[.38,.14],[.3,.21],[0,.22]]
const hubProfile:Array<[number,number]>=[[0,-.14],[.16,-.13],[.2,-.06],[.2,.06],[.16,.13],[0,.14]]
const collarProfile:Array<[number,number]>=[[0,-.055],[.105,-.05],[.13,0],[.105,.05],[0,.055]]
const grip:Array<[number,number,number]>=[[-.52,0,0],[-.26,.015,0],[0,0,0],[.26,-.015,0],[.52,0,0]]
const knurl:Array<[number,number,number]>=[[-.3,.074,.03],[-.14,.092,.04],[0,.098,.045],[.14,.092,.04],[.3,.074,.03]]
function Dumbbell({position,rotation}:{position:[number,number,number],rotation:[number,number,number]}){return <group position={position} rotation={rotation}>
<SplineTube points={grip} radius={.072} tubularSegments={48} radialSegments={12}><meshPhysicalMaterial color="#686d70" metalness={.82} roughness={.26} clearcoat={.28}/></SplineTube>
<SplineTube points={knurl} radius={.007} tubularSegments={34} radialSegments={5}><meshStandardMaterial color="#e7e2d6" roughness={.55}/></SplineTube>
{[-.58,.58].map((x)=><group key={x} position={[x,0,0]} rotation={[0,0,Math.PI/2]}><RevolvedSurface profile={plateProfile} radialSegments={56}><meshPhysicalMaterial color="#24282b" metalness={.18} roughness={.62} clearcoat={.12}/></RevolvedSurface><RevolvedSurface profile={hubProfile} radialSegments={44} scale={.62}><meshPhysicalMaterial color="#b7aa8b" metalness={.76} roughness={.24} clearcoat={.3}/></RevolvedSurface><RevolvedSurface profile={collarProfile} radialSegments={38} position={[0,.18,0]}><meshPhysicalMaterial color="#aeb4b6" metalness={.86} roughness={.22} clearcoat={.26}/></RevolvedSurface></group>)}
<SplineTube points={[[-.28,-.075,.028],[-.12,-.09,.035],[.12,-.09,.035],[.28,-.075,.028]]} radius={.007} tubularSegments={32} radialSegments={5}><meshStandardMaterial color="#d3c9b4" roughness={.5}/></SplineTube>
</group>}
export default function StudioDumbbellPair(){return <group rotation={[0,-.46,.04]} scale={.9}><Dumbbell position={[-.12,.15,.12]} rotation={[0,.12,-.08]}/><Dumbbell position={[.14,-.22,-.16]} rotation={[0,-.18,.12]}/></group>}
