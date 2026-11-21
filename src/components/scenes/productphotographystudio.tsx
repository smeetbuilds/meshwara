import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Real product studio layout: paper sweep backdrop, infinity table, centered
 * hero object, two softbox modifiers with stands, boom and camera tripod.
 * Lighting instruments are represented geometrically, not calibrated lumens.
 */
const wall='#d7d8d3', sweep='#ecebe5', lamp='#363f43', silver='#aebdbe', diffuser='#f8f5e9', wood='#9c846b', optic='#3e515d'
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const panel:Array<[number,number]>=[[-.33,-.42],[.33,-.42],[.43,.43],[-.43,.43]]
const stand:Array<[number,number]>=[[0,-.66],[.028,-.66],[.028,.66],[0,.66]]
export default function ProductPhotographyStudio(){
 return <group rotation={[0,-.38,0]} scale={.95} position={[0,-.17,0]}>
  <ExtrudedProfile points={rect(3.12,2.2)} depth={.10} rotation={[Math.PI/2,0,0]} position={[0,-1.39,0]}>
   <meshStandardMaterial color={wall} roughness={.78}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.18,2.40)} depth={.08} position={[0,-.06,-.77]}>
   <meshStandardMaterial color={sweep} roughness={.88} side={2}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.02,.08)} depth={1.35} position={[0,-1.20,-.05]}>
   <meshStandardMaterial color={sweep} roughness={.85}/>
  </ExtrudedProfile>
  <SplineTube points={[[-1.03,-1.18,-.05],[-1.03,-1.11,-.52],[-1.03,-.83,-.74],[-1.03,.62,-.76]]} radius={.014}>
   <meshStandardMaterial color={silver} metalness={.61} roughness={.35}/>
  </SplineTube>
  {/* Center hero product and a small stepped photography riser. */}
  <ExtrudedProfile points={rect(.71,.095)} depth={.65} position={[0,-.86,.19]}>
   <meshPhysicalMaterial color={wood} roughness={.41} clearcoat={.15}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={[[0,-.28],[.20,-.28],[.20,-.15],[.27,.05],[.19,.27],[0,.28]]} position={[0,-.48,.19]} radialSegments={40}>
   <meshPhysicalMaterial color="#b7afa2" metalness={.22} roughness={.23} clearcoat={.42}/>
  </RevolvedSurface>
  {[-1,1].map(side=><group key={side}>
   <RevolvedSurface profile={stand} position={[side*1.17,-.77,-.12]} radialSegments={12}>
    <meshStandardMaterial color={silver} metalness={.79} roughness={.34}/>
   </RevolvedSurface>
   {[-.3,0,.3].map((angle,i)=><mesh key={i} position={[side*1.17+Math.cos(angle+i*2.05)*.18,-1.38,-.12+Math.sin(angle+i*2.05)*.18]}>
    <boxGeometry args={[.32,.055,.06]}/><meshStandardMaterial color={lamp} metalness={.65} roughness={.42}/>
   </mesh>)}
   <ExtrudedProfile points={panel} depth={.13} position={[side*.97,.37,.20]} rotation={[0,side*.27,side*.14]}>
    <meshPhysicalMaterial color={lamp} metalness={.43} roughness={.35}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={panel.map(([x,y])=>[x*.89,y*.91] as [number,number])} depth={.018} position={[side*.96,.37,.30]} rotation={[0,side*.27,side*.14]}>
    <meshPhysicalMaterial color={diffuser} roughness={.69} emissive={diffuser} emissiveIntensity={.23}/>
   </ExtrudedProfile>
   <SplineTube points={[[side*1.17,-.16,-.15],[side*1.15,.08,-.06],[side*.97,.28,.14]]} radius={.035}>
    <meshStandardMaterial color={lamp} roughness={.82}/>
   </SplineTube>
  </group>)}
  <RevolvedSurface profile={stand} position={[.76,-.80,1]} radialSegments={12}>
   <meshStandardMaterial color={silver} metalness={.82} roughness={.27}/>
  </RevolvedSurface>
  <ExtrudedProfile points={rect(.34,.22)} depth={.21} position={[.76,.10,1]}>
   <meshPhysicalMaterial color={lamp} metalness={.43} roughness={.30}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={[[0,-.09],[.105,-.09],[.105,.09],[0,.09]]} rotation={[Math.PI/2,0,0]} position={[.76,.10,.83]}>
   <meshPhysicalMaterial color={optic} metalness={.51} roughness={.14} clearcoat={.6}/>
  </RevolvedSurface>
 </group>
}
