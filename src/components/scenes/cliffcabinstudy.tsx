import { CC0Surface } from '../geometry/CC0Surface'
import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Elevated steep-roof timber cabin: cliff ledge, A-frame roof, glazed gable,
 * accessible deck, structural braces and anchored piers. Construction concept,
 * not geotechnical or structural engineering documentation.
 */
const shale='#687075', pine='#9c7d56', roof='#39484c', trim='#3d3831', glazing='#7ca6b3', stone='#8d8880', deck='#b69b72'
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const cliffFootprint:Array<[number,number]>=[[-1.62,-1.29],[1.52,-1.2],[1.42,.72],[.80,1.45],[-.80,1.40],[-1.49,.72]]
const roofFrame:Array<[number,number]>=[[-1.25,-.84],[0,.75],[1.25,-.84]]
const braces=[-.90,-.51,.05,.60,.96]
const balusters=[-1.15,-.76,-.37,.02,.41,.80,1.19]
export default function CliffCabinStudy(){
 return <group rotation={[0,-.5,0]} scale={.9} position={[0,-.02,0]}>
  <ExtrudedProfile points={cliffFootprint} depth={.43} rotation={[Math.PI/2,0,0]} position={[0,-1.50,-.02]}>
   <meshStandardMaterial color={shale} roughness={.99} flatShading/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.22,1.78)} depth={.15} rotation={[Math.PI/2,0,0]} position={[0,-.95,.08]}>
   <CC0Surface texture="oak" />
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.02,1.26)} depth={1.65} position={[0,-.39,-.33]}>
   <CC0Surface texture="oak" />
  </ExtrudedProfile>
  {/* Genuine triangular gable, rather than a bevelled generic shell. */}
  <ExtrudedProfile points={roofFrame} depth={1.82} position={[0,.34,-.35]}>
   <meshStandardMaterial color={roof} metalness={.30} roughness={.47}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={[[-.88,-.76],[0,.47],[.88,-.76]]} depth={.025} position={[0,.32,.58]}>
   <meshPhysicalMaterial color={glazing} roughness={.1} metalness={.05} transparent opacity={.4} depthWrite={false} clearcoat={.7}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(.035,1.35)} depth={.07} position={[0,.12,.59]}>
   <meshStandardMaterial color={trim} metalness={.36} roughness={.48}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(1.86,.07)} depth={.13} position={[0,-.13,.59]}>
   <meshStandardMaterial color={trim} metalness={.33} roughness={.51}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.56,1.1)} depth={.12} rotation={[Math.PI/2,0,0]} position={[0,-.98,1.01]}>
   <CC0Surface texture="oak" />
  </ExtrudedProfile>
  {braces.map(x=><group key={x}>
   <ExtrudedProfile points={rect(.09,1.25)} depth={.09} position={[x,-.22,.55]}>
    <meshStandardMaterial color={pine} roughness={.63}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.08,.05)} depth={1.40} position={[x,-.75,-.12]}>
    <meshStandardMaterial color={pine} roughness={.65}/>
   </ExtrudedProfile>
  </group>)}
  {balusters.map(x=><ExtrudedProfile key={x} points={rect(.048,.46)} depth={.05} position={[x,-.63,1.52]}>
   <meshStandardMaterial color={trim} metalness={.44} roughness={.48}/>
  </ExtrudedProfile>)}
  <ExtrudedProfile points={rect(2.43,.06)} depth={.06} position={[0,-.39,1.52]}>
   <meshStandardMaterial color={trim} metalness={.44} roughness={.47}/>
  </ExtrudedProfile>
  {[[-.91,-.67],[.91,-.67],[-.91,.56],[.91,.56]].map(([x,z],i)=><group key={i}>
   <RevolvedSurface profile={[[0,-.46],[.14,-.46],[.18,.46],[0,.46]]} position={[x,-1.20,z]} radialSegments={10}>
    <meshStandardMaterial color={stone} roughness={.95}/>
   </RevolvedSurface>
   <ExtrudedProfile points={rect(.22,.08)} depth={.22} position={[x,-.72,z]}>
    <meshStandardMaterial color={trim} metalness={.45} roughness={.43}/>
   </ExtrudedProfile>
  </group>)}
  <SplineTube points={[[-1.26,-.58,1.56],[-1.26,-.91,1.56],[-1.26,-1.25,1.56]]} radius={.035}>
   <meshStandardMaterial color={trim} metalness={.5} roughness={.43}/>
  </SplineTube>
 </group>
}
