import { ExtrudedProfile, LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const lens:Array<[number,number]>=[[-.4,-.22],[.28,-.23],[.42,-.08],[.4,.22],[.18,.34],[-.28,.31],[-.44,.08]]
const brow:Array<[number,number]>=[[-.48,-.24],[.42,-.24],[.5,-.08],[.46,.32],[.18,.4],[-.34,.36],[-.52,.14]]
const temple:LoftStation[]=[{x:-.55,width:.04,height:.055},{x:.15,width:.06,height:.07},{x:.82,width:.035,height:.045}]
export default function AcetateOpticalFrames(){return <group rotation={[.03,-.18,0]}>
 <ExtrudedProfile points={brow} depth={.075} position={[-.49,.06,0]} bevelSize={.018} bevelThickness={.015}><meshPhysicalMaterial color="#6d4431" roughness={.27} clearcoat={.75}/></ExtrudedProfile>
 <ExtrudedProfile points={brow.map(([x,y])=>[-x,y])} depth={.075} position={[.49,.06,0]} bevelSize={.018} bevelThickness={.015}><meshPhysicalMaterial color="#80513a" roughness={.27} clearcoat={.75}/></ExtrudedProfile>
 <ExtrudedProfile points={lens} depth={.014} position={[-.49,.06,.045]} bevelSize={.006} bevelThickness={.005}><meshPhysicalMaterial color="#d5e0df" transmission={.88} opacity={.3} transparent roughness={.04}/></ExtrudedProfile>
 <ExtrudedProfile points={lens.map(([x,y])=>[-x,y])} depth={.014} position={[.49,.06,.045]} bevelSize={.006} bevelThickness={.005}><meshPhysicalMaterial color="#d5e0df" transmission={.88} opacity={.3} transparent roughness={.04}/></ExtrudedProfile>
 <SplineTube points={[[-.08,.22,.01],[0,.28,.025],[.08,.22,.01]]} radius={.032}><meshPhysicalMaterial color="#573425" roughness={.3} clearcoat={.7}/></SplineTube>
 <LoftSurface stations={temple} position={[-1.04,.16,-.08]} rotation={[0,-.16,0]}><meshStandardMaterial color="#5b382b" roughness={.38}/></LoftSurface>
 <LoftSurface stations={temple} position={[1.04,.16,-.08]} rotation={[0,Math.PI+.16,0]}><meshStandardMaterial color="#5b382b" roughness={.38}/></LoftSurface>
 <SplineTube points={[[-.9,.14,-.02],[-1.2,.14,-.16],[-1.45,.08,-.34]]} radius={.015}><meshStandardMaterial color="#b28c60" metalness={.65} roughness={.25}/></SplineTube>
</group>}
