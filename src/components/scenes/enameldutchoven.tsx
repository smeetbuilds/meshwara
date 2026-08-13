import { LoftSurface, RevolvedSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const pot:Array<[number,number]>=[[.25,-.52],[.54,-.48],[.68,-.28],[.7,.28],[.62,.4],[.46,.46]]
const lid:Array<[number,number]>=[[.28,-.03],[.56,0],[.72,.12],[.58,.24],[.3,.28],[.12,.26]]
const base:LoftStation[]=[{x:-.9,width:.52,height:.06,exponent:4},{x:0,width:.6,height:.09,exponent:4.3},{x:.9,width:.5,height:.06,exponent:4}]
export default function EnamelDutchOven(){return <group position={[0,-.3,0]} rotation={[0,-.28,0]}>
 <LoftSurface stations={base} position={[0,-.58,0]}><meshStandardMaterial color="#745849" roughness={.82}/></LoftSurface>
 <RevolvedSurface profile={pot}><meshPhysicalMaterial color="#3e6357" roughness={.3} clearcoat={.82} clearcoatRoughness={.14}/></RevolvedSurface>
 <RevolvedSurface profile={lid} position={[0,.48,0]}><meshPhysicalMaterial color="#466d60" roughness={.28} clearcoat={.86} clearcoatRoughness={.12}/></RevolvedSurface>
 <RevolvedSurface profile={[[.06,-.05],[.16,-.03],[.18,.04],[.11,.12]]} position={[0,.84,0]}><meshPhysicalMaterial color="#c3ab75" metalness={.72} roughness={.22}/></RevolvedSurface>
 {[-1,1].map(s=><SplineTube key={s} points={[[s*.55,.14,.08],[s*.82,.18,.08],[s*.9,.05,.04],[s*.72,-.04,.02]]} radius={.055}><meshPhysicalMaterial color="#365348" roughness={.32} clearcoat={.72}/></SplineTube>)}
 <RevolvedSurface profile={[[.48,-.035],[.72,0],[.48,.035]]} position={[0,-.5,0]}><meshStandardMaterial color="#252828" roughness={.5}/></RevolvedSurface>

 <LoftSurface stations={[{x:-.55,width:.22,height:.045},{x:0,width:.34,height:.06},{x:.55,width:.22,height:.045}]} position={[0,-.62,.24]}><meshStandardMaterial color="#6b4e42" roughness={.7}/></LoftSurface>
 <SplineTube points={[[-.42,.42,.5],[0,.5,.58],[.42,.42,.5]]} radius={.011}><meshPhysicalMaterial color="#c0a674" metalness={.65} roughness={.22}/></SplineTube>
 <RevolvedSurface profile={[[.035,-.02],[.08,0],[.035,.02]]} position={[.28,.5,.58]}><meshStandardMaterial color="#2f423b" roughness={.4}/></RevolvedSurface>
</group>}
