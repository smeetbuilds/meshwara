import { LoftSurface, RevolvedSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const vessel:Array<[number,number]>=[[.12,-.72],[.38,-.69],[.68,-.52],[.78,-.18],[.66,.12],[.42,.28],[.22,.35],[.13,.72]]
const liquid:Array<[number,number]>=[[.14,-.66],[.34,-.63],[.6,-.49],[.67,-.22],[.56,-.06],[.24,.04],[.13,.06]]
const stopper:Array<[number,number]>=[[.08,-.18],[.22,-.1],[.3,.04],[.22,.18],[.08,.24]]
const plinth:LoftStation[]=[{x:-.76,width:.5,height:.07,exponent:4},{x:0,width:.58,height:.1,exponent:4.5},{x:.76,width:.46,height:.06,exponent:4}]
export default function CrystalWineDecanter(){return <group position={[0,-.22,0]} rotation={[0,-.2,0]}>
 <LoftSurface stations={plinth} position={[0,-.78,0]}><meshPhysicalMaterial color="#2d3031" metalness={.62} roughness={.22}/></LoftSurface>
 <RevolvedSurface profile={vessel}><meshPhysicalMaterial color="#d9edef" transmission={.92} opacity={.36} transparent roughness={.045} clearcoat={1} ior={1.5}/></RevolvedSurface>
 <RevolvedSurface profile={liquid}><meshPhysicalMaterial color="#6e1720" transmission={.12} opacity={.72} transparent roughness={.18}/></RevolvedSurface>
 <RevolvedSurface profile={stopper} position={[0,.91,0]}><meshPhysicalMaterial color="#d7e5e5" transmission={.84} opacity={.48} transparent roughness={.06} clearcoat={1}/></RevolvedSurface>
 <SplineTube points={[[0,.28,.36],[.04,.48,.38],[.02,.7,.22],[0,.83,.08]]} radius={.014}><meshPhysicalMaterial color="#f4f0e8" metalness={.1} roughness={.2}/></SplineTube>
 <RevolvedSurface profile={[[.05,-.025],[.13,0],[.05,.025]]} position={[0,-.56,.62]}><meshStandardMaterial color="#aa7d55" roughness={.46}/></RevolvedSurface>

 <RevolvedSurface profile={[[.06,-.035],[.15,0],[.06,.035]]} position={[-.62,-.66,.12]}><meshPhysicalMaterial color="#b18a62" metalness={.42} roughness={.28}/></RevolvedSurface>
 <SplineTube points={[[.45,-.62,.04],[.62,-.52,.12],[.7,-.36,.18]]} radius={.012}><meshStandardMaterial color="#9b8068" roughness={.42}/></SplineTube>
</group>}
