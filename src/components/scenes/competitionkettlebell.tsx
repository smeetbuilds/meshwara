import { LoftSurface, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'
const bodyProfile:Array<[number,number]>=[[0,-.48],[.28,-.44],[.42,-.28],[.48,-.04],[.44,.2],[.32,.36],[.18,.44],[0,.46]]
const collar=[{x:-.2,y:.38,width:.16,height:.1,exponent:3.2},{x:0,y:.46,width:.22,height:.13,exponent:3.4},{x:.2,y:.38,width:.16,height:.1,exponent:3.2}]
const handle:Array<[number,number,number]>=[[-.33,.36,0],[-.52,.58,0],[-.5,.9,0],[-.28,1.12,0],[0,1.18,0],[.28,1.12,0],[.5,.9,0],[.52,.58,0],[.33,.36,0]]
const seam:Array<[number,number,number]>=[[-.34,-.18,.32],[-.1,-.3,.4],[.16,-.28,.38],[.36,-.12,.3]]
const shoulderLine:Array<[number,number,number]>=[[-.3,.25,.3],[-.12,.34,.38],[.1,.35,.39],[.3,.26,.31]]
const footProfile:Array<[number,number]>=[[0,-.045],[.18,-.04],[.2,0],[.18,.04],[0,.045]]
export default function CompetitionKettlebell(){return <group rotation={[0,-.34,0]} scale={.94}>
<RevolvedSurface profile={bodyProfile} radialSegments={72} position={[0,-.06,0]}><meshPhysicalMaterial color="#305c74" metalness={.12} roughness={.4} clearcoat={.34}/></RevolvedSurface>
<LoftSurface stations={collar} radialSegments={36}><meshPhysicalMaterial color="#262a2e" metalness={.5} roughness={.3} clearcoat={.22}/></LoftSurface>
<SplineTube points={handle} radius={.095} tubularSegments={84} radialSegments={14}><meshPhysicalMaterial color="#1f2326" metalness={.42} roughness={.34} clearcoat={.25}/></SplineTube>
<SplineTube points={seam} radius={.012} tubularSegments={38} radialSegments={6}><meshPhysicalMaterial color="#d7c29a" metalness={.56} roughness={.24} clearcoat={.28}/></SplineTube>
<SplineTube points={shoulderLine} radius={.009} tubularSegments={34} radialSegments={6}><meshPhysicalMaterial color="#8eb6c4" metalness={.24} roughness={.3} clearcoat={.24}/></SplineTube>
<RevolvedSurface profile={footProfile} radialSegments={48} position={[0,-.53,0]}><meshStandardMaterial color="#15181a" roughness={.68}/></RevolvedSurface>
</group>}
