import { CC0Surface } from '../geometry/CC0Surface'
import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Modern pavilion with structurally exposed steel, honest glass envelopes,
 * interior joinery and independent cantilevered canopy.
 * Concept visualization: envelope performance remains unverified.
 */
const steel='#303c42', glazing='#8ebcc0', pale='#d8d2c5', oak='#977954', terrazzo='#bcb4a6', interior='#45443f'
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const mullions=[-1.16,-.76,-.38,0,.38,.76,1.16]
const rafters=[-.75,-.42,-.08,.25,.59]
export default function GlassHouseStudy(){
 return <group rotation={[0,-.43,0]} scale={.92} position={[0,-.12,0]}>
  <ExtrudedProfile points={rect(3.15,2.45)} depth={.13} rotation={[Math.PI/2,0,0]} position={[0,-1.32,0]}>
   <CC0Surface texture="concrete" />
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.08,2.36)} depth={.065} rotation={[Math.PI/2,0,0]} position={[0,-1.17,0]}>
   <meshStandardMaterial color={pale} roughness={.66}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.23,.13)} depth={2.50} position={[0,.50,0]}>
   <meshStandardMaterial color={steel} metalness={.69} roughness={.31}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.50,.085)} depth={2.75} position={[.12,.63,.14]}>
   <CC0Surface texture="oak" />
  </ExtrudedProfile>
  {mullions.map(x=><group key={x}>
   <ExtrudedProfile points={rect(.048,1.65)} depth={.06} position={[x,-.34,1.10]}>
    <meshStandardMaterial color={steel} metalness={.86} roughness={.27}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.34,1.48)} depth={.012} position={[x+.19,-.33,1.105]}>
    <meshPhysicalMaterial color={glazing} roughness={.065} metalness={.03} transparent opacity={.28} depthWrite={false} clearcoat={1}/>
   </ExtrudedProfile>
  </group>)}
  {[-1,1].map(side=><group key={side}>
   <ExtrudedProfile points={rect(.06,1.7)} depth={2.37} position={[side*1.53,-.33,-.02]}>
    <meshStandardMaterial color={steel} metalness={.81} roughness={.27}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.012,1.58)} depth={2.15} position={[side*1.48,-.30,0]}>
    <meshPhysicalMaterial color={glazing} roughness={.10} metalness={.02} transparent opacity={.27} depthWrite={false} clearcoat={1}/>
   </ExtrudedProfile>
  </group>)}
  <ExtrudedProfile points={rect(3.04,.04)} depth={.04} position={[0,-.15,1.11]}>
   <meshStandardMaterial color={steel} metalness={.84} roughness={.28}/>
  </ExtrudedProfile>
  {rafters.map(z=><ExtrudedProfile key={z} points={rect(.065,.14)} depth={2.72} position={[0,.72,z]}>
   <meshStandardMaterial color={steel} metalness={.81} roughness={.29}/>
  </ExtrudedProfile>)}
  {/* Furnish the interior; avoid an empty glass box. */}
  <ExtrudedProfile points={rect(.80,.09)} depth={.50} position={[-.51,-.80,.24]}>
   <meshStandardMaterial color={oak} roughness={.51}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(.17,.43)} depth={.18} position={[-.53,-1.0,.21]}>
   <meshStandardMaterial color={steel} metalness={.65} roughness={.33}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(.68,.13)} depth={.50} position={[.66,-.76,-.36]}>
   <meshStandardMaterial color={interior} roughness={.67}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(.68,.53)} depth={.10} position={[.66,-.52,-.57]}>
   <meshStandardMaterial color={interior} roughness={.67}/>
  </ExtrudedProfile>
  {[0,.52,1.04].map(x=><RevolvedSurface key={x} profile={[[0,-.18],[.027,-.18],[.027,.18],[0,.18]]} position={[-1.12+x,-.74,-.48]} radialSegments={12}>
   <meshStandardMaterial color={steel} metalness={.71} roughness={.33}/>
  </RevolvedSurface>)}
  <ExtrudedProfile points={rect(3.55,.09)} depth={.34} position={[0,-1.18,1.17]}>
   <meshStandardMaterial color={oak} roughness={.52}/>
  </ExtrudedProfile>
  <SplineTube points={[[-1.46,.64,-1.20],[-.70,.66,-1.22],[0,.66,-1.22],[.75,.66,-1.22],[1.48,.64,-1.2]]} radius={.018}>
   <meshStandardMaterial color={steel} metalness={.78} roughness={.26}/>
  </SplineTube>
 </group>
}
