import { ExtrudedProfile, LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const body:LoftStation[]=[{x:-.55,width:.18,height:.38,y:-.03,exponent:3.8},{x:0,width:.27,height:.46,exponent:4.2},{x:.55,width:.18,height:.37,y:-.03,exponent:3.8}]
const flap:Array<[number,number]>=[[-.5,-.16],[.5,-.16],[.44,.28],[-.38,.34],[-.52,.12]]
const inset:Array<[number,number]>=[[-.3,-.12],[.3,-.12],[.34,.1],[-.28,.15]]
export default function CompactCrossbodyBag(){return <group position={[0,-.15,0]} rotation={[0,-.32,0]}>
 <LoftSurface stations={body}><meshPhysicalMaterial color="#47384d" roughness={.44} sheen={.26}/></LoftSurface>
 <ExtrudedProfile points={flap} depth={.055} position={[0,.13,.27]}><meshPhysicalMaterial color="#59445e" roughness={.4} sheen={.28}/></ExtrudedProfile>
 <ExtrudedProfile points={inset} depth={.025} position={[0,.06,.31]}><meshStandardMaterial color="#2f2832" roughness={.58}/></ExtrudedProfile>
 <SplineTube points={[[-.46,.36,.08],[-.82,.82,-.04],[-.48,1.28,-.12],[.1,1.54,-.16],[.72,1.12,-.12],[.55,.38,.08]]} radius={.03} tubularSegments={58}><meshPhysicalMaterial color="#2d2830" roughness={.5} sheen={.2}/></SplineTube>
 <SplineTube points={[[-.5,.38,.29],[0,.48,.32],[.5,.36,.29]]} radius={.012}><meshPhysicalMaterial color="#a8895e" metalness={.65} roughness={.24}/></SplineTube>
 <ExtrudedProfile points={[[-.07,-.06],[.07,-.06],[.08,.06],[-.08,.06]]} depth={.025} position={[0,.22,.34]}><meshPhysicalMaterial color="#b4935e" metalness={.74} roughness={.2}/></ExtrudedProfile>
 <LoftSurface stations={[{x:-.4,width:.08,height:.05},{x:0,width:.12,height:.07},{x:.4,width:.08,height:.05}]} position={[0,-.36,.24]}><meshStandardMaterial color="#6c516f" roughness={.5}/></LoftSurface>
 <SplineTube points={[[-.36,-.32,.28],[0,-.36,.32],[.36,-.32,.28]]} radius={.01}><meshStandardMaterial color="#80668a" roughness={.5}/></SplineTube>
</group>}
