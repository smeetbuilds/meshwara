import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** A physically intelligible neck chain, jump-ring, V-bail and suspended
 * stone pendant in a hand-worked open gold setting. All pieces distinct.
 */
const gold='#cda76b', pale='#edd8ab', darkGold='#8f713f', stone='#477c7f', shadow='#243d45'
const chain:Array<[number,number,number]>=[
 [-1.09,.39,.02],[-1.02,.62,.03],[-.88,.83,.02],[-.62,1.01,.01],
 [-.31,1.10,0],[0,1.14,0],[.31,1.10,0],[.62,1.01,.01],
 [.88,.83,.02],[1.02,.62,.03],[1.09,.39,.02]]
const gem:Array<[number,number]>=[[-.27,.24],[-.38,-.06],[-.26,-.38],[0,-.56],[.26,-.38],[.38,-.06],[.27,.24],[0,.36]]
const smaller:Array<[number,number]>=gem.map(([x,y])=>[x*.76,y*.79])
export default function SculpturalPendantNecklace(){
 return <group rotation={[.04,-.12,.03]} position={[0,-.13,0]}>
  {/* Each fine chain link alternates its orientation on a smooth collar arc. */}
  <SplineTube points={chain} radius={.028} tubularSegments={110} radialSegments={12}>
   <meshPhysicalMaterial color={gold} metalness={1} roughness={.23} clearcoat={.18}/>
  </SplineTube>
  {chain.slice(1,-1).map(([x,y,z],i)=><mesh key={i} position={[x,y,z]} rotation={[0,0,i%2?Math.PI/5:-Math.PI/5]}>
   <torusGeometry args={[.046,.013,10,16]}/>
   <meshPhysicalMaterial color={pale} metalness={1} roughness={.28}/>
  </mesh>)}
  <RevolvedSurface profile={[[0,-.07],[.065,-.07],[.073,.07],[0,.07]]} rotation={[Math.PI/2,0,0]} position={[0,.23,.06]}>
   <meshPhysicalMaterial color={gold} metalness={1} roughness={.22}/>
  </RevolvedSurface>
  <mesh position={[0,.39,.05]}><torusGeometry args={[.13,.025,14,28]}/><meshPhysicalMaterial color={gold} metalness={1} roughness={.24}/></mesh>
  <SplineTube points={[[-.21,.18,.08],[-.18,-.03,.12],[0,-.22,.15],[.18,-.03,.12],[.21,.18,.08]]} radius={.048} tubularSegments={50}>
   <meshPhysicalMaterial color={gold} metalness={.96} roughness={.29}/>
  </SplineTube>
  <ExtrudedProfile points={gem} depth={.19} bevelSize={.045} bevelThickness={.04} position={[0,-.56,.12]}>
   <meshPhysicalMaterial color={darkGold} metalness={.96} roughness={.3}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={smaller} depth={.11} bevelSize={.03} bevelThickness={.025} position={[0,-.56,.26]}>
   <meshPhysicalMaterial color={stone} metalness={.16} roughness={.07} ior={1.52} transmission={.12} clearcoat={1}/>
  </ExtrudedProfile>
  {gem.filter((_,i)=>i%2===0).map(([x,y],i)=><RevolvedSurface key={i} profile={[[0,-.06],[.038,-.06],[.044,.07],[0,.07]]} position={[x*.85,-.56+y*.82,.32]} radialSegments={12}>
   <meshPhysicalMaterial color={pale} metalness={1} roughness={.2}/>
  </RevolvedSurface>)}
  {[-1,1].map(side=><SplineTube key={side} points={[[side*.25,-.44,.28],[side*.25,-.60,.31],[side*.18,-.82,.28]]} radius={.021}>
   <meshStandardMaterial color={shadow} metalness={.55} roughness={.35}/>
  </SplineTube>)}
  {/* Hinged clasp and discreet chain adjuster remain separate from the stone. */}
  <RevolvedSurface profile={[[0,-.065],[.065,-.065],[.065,.065],[0,.065]]} rotation={[Math.PI/2,0,0]} position={[1.08,.35,.08]} radialSegments={18}>
   <meshPhysicalMaterial color={gold} metalness={.96} roughness={.28}/>
  </RevolvedSurface>
  <SplineTube points={[[.97,.46,.10],[1.11,.48,.09],[1.20,.36,.06],[1.14,.25,.05]]} radius={.016} tubularSegments={32}>
   <meshStandardMaterial color={pale} metalness={.88} roughness={.23}/>
  </SplineTube>
 </group>
}
