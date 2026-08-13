import { LoftSurface, RevolvedSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const kettle:Array<[number,number]>=[[.24,-.45],[.42,-.37],[.5,-.1],[.46,.26],[.34,.4],[.18,.42]]
const dripper:Array<[number,number]>=[[.14,-.25],[.33,-.12],[.45,.36],[.2,.42]]
const carafe:Array<[number,number]>=[[.18,-.5],[.4,-.42],[.48,-.1],[.36,.26],[.24,.37],[.16,.4]]
const board:LoftStation[]=[{x:-1,width:.42,height:.07,exponent:4},{x:0,width:.5,height:.09,exponent:4.4},{x:1,width:.4,height:.06,exponent:4}]
export default function PourOverCoffeeSet(){return <group position={[0,-.38,0]} rotation={[0,-.22,0]}>
 <LoftSurface stations={board} position={[0,-.56,0]}><meshStandardMaterial color="#6f5944" roughness={.82}/></LoftSurface>
 <RevolvedSurface profile={kettle} position={[-.55,.02,0]}><meshPhysicalMaterial color="#73787a" metalness={.9} roughness={.16}/></RevolvedSurface>
 <SplineTube points={[[-.25,.25,.02],[.1,.42,.08],[.42,.62,.04],[.62,.55,.02]]} radius={.035} tubularSegments={44} radialSegments={9}><meshPhysicalMaterial color="#8c8f8e" metalness={.94} roughness={.13}/></SplineTube>
 <SplineTube points={[[-.76,.22,-.12],[-1.03,.4,-.2],[-1.05,.05,-.26],[-.82,-.22,-.16]]} radius={.04}><meshStandardMaterial color="#282b2a" roughness={.36}/></SplineTube>
 <RevolvedSurface profile={carafe} position={[.55,-.04,0]}><meshPhysicalMaterial color="#a9c0c3" transmission={.78} opacity={.48} transparent roughness={.06} clearcoat={1}/></RevolvedSurface>
 <RevolvedSurface profile={dripper} position={[.55,.62,0]}><meshPhysicalMaterial color="#d6c7af" roughness={.3} clearcoat={.2}/></RevolvedSurface>
 <RevolvedSurface profile={[[.08,-.12],[.27,-.08],[.32,.03],[.22,.12],[.08,.14]]} position={[.55,.2,0]}><meshStandardMaterial color="#573b2f" roughness={.86}/></RevolvedSurface>
</group>}
