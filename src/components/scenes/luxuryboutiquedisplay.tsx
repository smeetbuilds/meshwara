import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Retail boutique window: glass storefront, actual hangers and garments,
 * angled showcase podiums, accessory plinths, LED strip and pendant lights.
 * Apparel is a display-form illustration, not pattern-making CAD.
 */
const bronze='#aa9471', oak='#b49a77', wall='#e8dfd0', charcoal='#303a42', blush='#b96e6b', offwhite='#e4dfd7', glass='#b0d2d1'
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const garments=[-1.03,-.71,-.39,-.07,.25,.57,.89]
const colors=['#745e59','#b4a8a0','#98825e','#b96e6b','#737e7c','#d0b990','#514e50']
export default function LuxuryBoutiqueDisplay(){
 return <group rotation={[0,-.42,0]} scale={.95} position={[0,-.17,0]}>
  <ExtrudedProfile points={rect(3.18,2.26)} depth={.14} rotation={[Math.PI/2,0,0]} position={[0,-1.42,0]}>
   <meshStandardMaterial color={oak} roughness={.71}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.02,1.92)} depth={.08} position={[0,.05,-.83]}>
   <meshStandardMaterial color={wall} roughness={.81}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.42,.065)} depth={.13} position={[0,.43,-.52]}>
   <meshPhysicalMaterial color={bronze} metalness={.69} roughness={.27}/>
  </ExtrudedProfile>
  {garments.map((x,i)=><group key={i}>
   <SplineTube points={[[x-.10,.27,-.49],[x,.36,-.49],[x+.10,.27,-.49]]} radius={.016} tubularSegments={18}>
    <meshStandardMaterial color={charcoal} metalness={.71} roughness={.29}/>
   </SplineTube>
   <ExtrudedProfile points={[[-.12,.19],[.12,.19],[.18,-.07],[.12,-.38],[-.12,-.38],[-.18,-.07]]} depth={.12} bevelSize={.02} bevelThickness={.016} position={[x,-.23,-.45]}>
    <meshPhysicalMaterial color={colors[i]} roughness={.67} clearcoat={.06}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.026,.23)} depth={.015} position={[x,-.21,-.373]}>
    <meshStandardMaterial color={offwhite} roughness={.78}/>
   </ExtrudedProfile>
  </group>)}
  {[-1.0,1.0].map((x,i)=><group key={i}>
   <ExtrudedProfile points={rect(.64,.12)} depth={.65} position={[x,-1.03,.52]}>
    <meshPhysicalMaterial color={oak} roughness={.52} clearcoat={.12}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.53,.25)} depth={.53} position={[x,-.82,.52]}>
    <meshPhysicalMaterial color={i?charcoal:blush} roughness={.36} clearcoat={.15}/>
   </ExtrudedProfile>
   <RevolvedSurface profile={[[0,-.12],[.14,-.12],[.14,.08],[.09,.17],[0,.17]]} position={[x,-.56,.52]} radialSegments={26}>
    <meshPhysicalMaterial color={bronze} metalness={.81} roughness={.26}/>
   </RevolvedSurface>
  </group>)}
  <ExtrudedProfile points={rect(.78,.10)} depth={.63} position={[0,-.92,.80]}>
   <meshPhysicalMaterial color={wall} roughness={.43} clearcoat={.19}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(.72,.32)} depth={.48} position={[0,-.69,.80]}>
   <meshPhysicalMaterial color={offwhite} roughness={.60}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={[[0,-.08],[.12,-.08],[.17,.07],[0,.08]]} position={[0,-.39,.80]} radialSegments={20}>
   <meshPhysicalMaterial color={blush} roughness={.39} clearcoat={.35}/>
  </RevolvedSurface>
  {[-1,1].map(side=><group key={side}>
   <RevolvedSurface profile={[[0,-.68],[.021,-.68],[.021,.68],[0,.68]]} position={[side*.79,.76,.38]} radialSegments={10}>
    <meshStandardMaterial color={charcoal} roughness={.8}/>
   </RevolvedSurface>
   <RevolvedSurface profile={[[0,-.13],[.18,-.13],[.18,.13],[0,.13]]} position={[side*.79,.18,.38]} radialSegments={22}>
    <meshPhysicalMaterial color={bronze} metalness={.73} roughness={.27}/>
   </RevolvedSurface>
  </group>)}
  <SplineTube points={[[-1.52,-.91,.87],[-1.52,.71,.87],[1.52,.71,.87],[1.52,-.91,.87]]} radius={.016}>
   <meshPhysicalMaterial color={bronze} metalness={.8} roughness={.26}/>
  </SplineTube>
  <ExtrudedProfile points={rect(3.06,.012)} depth={.018} position={[0,.03,.88]}>
   <meshPhysicalMaterial color={glass} transparent opacity={.13} roughness={.08} depthWrite={false} clearcoat={1}/>
  </ExtrudedProfile>
 </group>
}
