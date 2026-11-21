import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Courtyard villa: three inhabited wings frame a reflecting pool and shaded
 * outdoor court, with a distinct entrance, façade glazing and pergola.
 * This is a visual architectural study, not construction-ready BIM.
 */
const chalk='#d6c7af', terracotta='#a77a53', trim='#373e3d', glass='#91b6b8', wood='#8d6a4d', pool='#397b88', stone='#a7a192'
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const columns=[-1.18,-.78,-.38,.02,.42,.82,1.22]
const windows=[-.98,-.52,.52,.98]
const planting=[[-1.43,-.9],[-1.23,.78],[1.3,.71],[1.43,-.91]] as Array<[number,number]>
export default function CourtyardVillaStudy(){
 return <group rotation={[0,-.45,0]} scale={.91} position={[0,-.14,0]}>
  <ExtrudedProfile points={rect(3.30,2.56)} depth={.13} rotation={[Math.PI/2,0,0]} position={[0,-1.39,0]}>
   <meshStandardMaterial color={stone} roughness={.9}/>
  </ExtrudedProfile>
  {/* U-shaped habitable wings — the central courtyard is genuinely open. */}
  <ExtrudedProfile points={rect(3.20,1.28)} depth={.60} position={[0,-.37,-.91]}>
   <meshStandardMaterial color={chalk} roughness={.72}/>
  </ExtrudedProfile>
  {[-1,1].map(side=><ExtrudedProfile key={side} points={rect(.62,1.12)} depth={1.60} position={[side*1.30,-.47,.09]}>
   <meshStandardMaterial color={chalk} roughness={.74}/>
  </ExtrudedProfile>)}
  <ExtrudedProfile points={rect(3.32,.14)} depth={.79} position={[0,.40,-.89]}>
   <meshStandardMaterial color={terracotta} roughness={.63}/>
  </ExtrudedProfile>
  {[-1,1].map(side=><ExtrudedProfile key={'side-roof'+side} points={rect(.74,.13)} depth={1.83} position={[side*1.31,.17,.1]}>
   <meshStandardMaterial color={terracotta} roughness={.66}/>
  </ExtrudedProfile>)}
  {/* Front-facing window system with framed glass and distinct lintels. */}
  {windows.map(x=><group key={x}>
   <ExtrudedProfile points={rect(.36,.56)} depth={.022} position={[x,-.32,-.575]}>
    <meshPhysicalMaterial color={glass} metalness={.06} roughness={.13} transparent opacity={.45} depthWrite={false} clearcoat={.5}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.405,.04)} depth={.045} position={[x,-.04,-.552]}>
    <meshStandardMaterial color={trim} metalness={.55} roughness={.36}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.035,.60)} depth={.045} position={[x,-.30,-.548]}>
    <meshStandardMaterial color={trim} metalness={.58} roughness={.33}/>
   </ExtrudedProfile>
  </group>)}
  <ExtrudedProfile points={rect(.45,.87)} depth={.035} position={[0,-.69,-.555]}>
   <meshPhysicalMaterial color={wood} roughness={.49} metalness={.08} clearcoat={.18}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={[[0,-.03],[.032,-.03],[.032,.03],[0,.03]]} rotation={[Math.PI/2,0,0]} position={[.16,-.62,-.50]}>
   <meshStandardMaterial color={terracotta} metalness={.8} roughness={.24}/>
  </RevolvedSurface>
  {/* Reflecting pool with darker liner and translucent water surface. */}
  <ExtrudedProfile points={rect(1.12,.92)} depth={.035} rotation={[Math.PI/2,0,0]} position={[0,-1.27,.57]}>
   <meshStandardMaterial color={trim} roughness={.61}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(1.02,.82)} depth={.022} rotation={[Math.PI/2,0,0]} position={[0,-1.21,.57]}>
   <meshPhysicalMaterial color={pool} metalness={.19} roughness={.09} clearcoat={.98} transparent opacity={.86}/>
  </ExtrudedProfile>
  {columns.map(x=><group key={x}>
   <ExtrudedProfile points={rect(.062,.90)} depth={.06} position={[x,-.64,1.12]}>
    <meshStandardMaterial color={wood} roughness={.49}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.08,.065)} depth={.43} position={[x,-.14,.94]}>
    <meshStandardMaterial color={wood} roughness={.52}/>
   </ExtrudedProfile>
  </group>)}
  <ExtrudedProfile points={rect(2.62,.11)} depth={.44} position={[0,-.11,.97]}>
   <meshStandardMaterial color={terracotta} roughness={.62}/>
  </ExtrudedProfile>
  <SplineTube points={[[-1.29,-1.13,1.12],[-.65,-1.12,1.12],[0,-1.14,1.12],[.65,-1.12,1.12],[1.29,-1.13,1.12]]} radius={.014}>
   <meshStandardMaterial color={trim} metalness={.44} roughness={.34}/>
  </SplineTube>
  {planting.map(([x,z],i)=><group key={i} position={[x,-1.20,z]}>
   <RevolvedSurface profile={[[0,-.16],[.18,-.16],[.22,.14],[.17,.19],[0,.19]]} radialSegments={12}>
    <meshStandardMaterial color={terracotta} roughness={.72}/>
   </RevolvedSurface>
   <mesh position={[0,.37,0]}><dodecahedronGeometry args={[.28,1]}/><meshStandardMaterial color={i%2?'#6b8464':'#68795a'} roughness={.94}/></mesh>
  </group>)}
 </group>
}
