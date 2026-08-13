import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'
const leftRim:Array<[number,number,number]>=[[-.76,.08,0],[-.66,.34,.01],[-.38,.43,.01],[-.15,.25,0],[-.18,-.08,0],[-.46,-.25,0],[-.72,-.12,0],[-.76,.08,0]]
const rightRim=leftRim.map(([x,y,z])=>[-x,y,z] as [number,number,number])
const lens:Array<[number,number]>=[[-.3,-.2],[.22,-.22],[.33,-.05],[.29,.22],[.05,.33],[-.24,.26],[-.34,.05]]
export default function TitaniumAviatorFrames(){return <group rotation={[.05,-.18,0]}>
 <SplineTube points={leftRim} closed radius={.018}><meshPhysicalMaterial color="#a2a7a5" metalness={.96} roughness={.14}/></SplineTube>
 <SplineTube points={rightRim} closed radius={.018}><meshPhysicalMaterial color="#a2a7a5" metalness={.96} roughness={.14}/></SplineTube>
 <ExtrudedProfile points={lens} depth={.018} position={[-.46,.08,.02]} bevelSize={.008} bevelThickness={.006}><meshPhysicalMaterial color="#6e7e87" transmission={.38} opacity={.58} transparent roughness={.08} clearcoat={1}/></ExtrudedProfile>
 <ExtrudedProfile points={lens.map(([x,y])=>[-x,y])} depth={.018} position={[.46,.08,.02]} bevelSize={.008} bevelThickness={.006}><meshPhysicalMaterial color="#6e7e87" transmission={.38} opacity={.58} transparent roughness={.08} clearcoat={1}/></ExtrudedProfile>
 <SplineTube points={[[-.16,.22,0],[0,.31,.03],[.16,.22,0]]} radius={.016}><meshPhysicalMaterial color="#b2b7b3" metalness={.98} roughness={.12}/></SplineTube>
 <SplineTube points={[[-.73,.2,0],[-1.08,.22,-.08],[-1.4,.12,-.28]]} radius={.018}><meshStandardMaterial color="#555b5b" metalness={.7} roughness={.24}/></SplineTube>
 <SplineTube points={[[.73,.2,0],[1.08,.22,-.08],[1.4,.12,-.28]]} radius={.018}><meshStandardMaterial color="#555b5b" metalness={.7} roughness={.24}/></SplineTube>
 {[-.12,.12].map(x=><RevolvedSurface key={x} profile={[[.02,-.03],[.055,0],[.02,.03]]} position={[x,.1,.03]}><meshStandardMaterial color="#d2c6a8" roughness={.36}/></RevolvedSurface>)}
</group>}
