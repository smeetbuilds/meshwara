import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Inhabited contemporary living room: upholstered sofa and cushions, low
 * coffee table, rug, side lamp, wall art, and a shelf. Furnished interior,
 * not a generic decorative shell or a measured real estate model.
 */
const plaster='#e1d8c9', oak='#a48466', upholstery='#c4b7a2', fabric='#8e8170', metal='#454d50', rug='#ac9f8c', glass='#a0b9b5'
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const seats=[-.60,0,.60]
export default function MinimalLivingRoomScene(){
 return <group rotation={[0,-.42,0]} scale={.94} position={[0,-.18,0]}>
  <ExtrudedProfile points={rect(3.25,2.25)} depth={.13} rotation={[Math.PI/2,0,0]} position={[0,-1.40,0]}>
   <meshStandardMaterial color={oak} roughness={.72}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.2,1.8)} depth={.09} position={[0,.06,-.88]}>
   <meshStandardMaterial color={plaster} roughness={.83}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.54,.08)} depth={1.22} rotation={[Math.PI/2,0,0]} position={[0,-1.25,.38]}>
   <meshStandardMaterial color={rug} roughness={.92}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.10,.31)} depth={.76} bevelSize={.10} bevelThickness={.064} position={[0,-.81,-.40]}>
   <meshPhysicalMaterial color={upholstery} roughness={.76} clearcoat={.05}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.12,.76)} depth={.22} bevelSize={.10} bevelThickness={.06} position={[0,-.61,-.80]}>
   <meshStandardMaterial color={fabric} roughness={.84}/>
  </ExtrudedProfile>
  {[-1,1].map(side=><ExtrudedProfile key={side} points={rect(.28,.54)} depth={.85} bevelSize={.10} bevelThickness={.06} position={[side*.99,-.69,-.43]}>
   <meshStandardMaterial color={fabric} roughness={.82}/>
  </ExtrudedProfile>)}
  {seats.map((x,i)=><group key={i}>
   <ExtrudedProfile points={rect(.58,.14)} depth={.58} bevelSize={.052} bevelThickness={.045} position={[x,-.55,-.23]}>
    <meshPhysicalMaterial color={upholstery} roughness={.77}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.45,.48)} depth={.17} bevelSize={.055} bevelThickness={.043} position={[x,-.44,-.69]}>
    <meshStandardMaterial color={i===1?'#c0b39b':upholstery} roughness={.86}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.24,.20)} depth={.15} bevelSize={.032} bevelThickness={.030} position={[x+.16,-.55,-.48]}>
    <meshStandardMaterial color={i===1?fabric:plaster} roughness={.83}/>
   </ExtrudedProfile>
  </group>)}
  <ExtrudedProfile points={rect(.96,.10)} depth={.60} bevelSize={.08} bevelThickness={.05} position={[0,-.98,.70]}>
   <meshPhysicalMaterial color={oak} roughness={.48} clearcoat={.12}/>
  </ExtrudedProfile>
  {[-.33,.33].map(x=><ExtrudedProfile key={x} points={rect(.05,.39)} depth={.08} position={[x,-1.20,.70]}>
   <meshStandardMaterial color={metal} metalness={.61} roughness={.35}/>
  </ExtrudedProfile>)}
  <RevolvedSurface profile={[[0,-.15],[.11,-.15],[.16,.08],[.09,.20],[0,.20]]} position={[0,-.79,.70]} radialSegments={32}>
   <meshPhysicalMaterial color={glass} roughness={.21} transmission={.11} clearcoat={.54}/>
  </RevolvedSurface>
  <ExtrudedProfile points={rect(.60,.78)} depth={.05} position={[-.64,.45,-.79]}>
   <meshStandardMaterial color={metal} metalness={.44} roughness={.42}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(.50,.68)} depth={.008} position={[-.64,.45,-.75]}>
   <meshPhysicalMaterial color="#bcb6aa" roughness={.79}/>
  </ExtrudedProfile>
  <SplineTube points={[[-.84,.46,-.74],[-.67,.60,-.74],[-.57,.40,-.74],[-.43,.46,-.74]]} radius={.028}>
   <meshStandardMaterial color={fabric} roughness={.8}/>
  </SplineTube>
  <RevolvedSurface profile={[[0,-.70],[.036,-.70],[.036,.70],[0,.70]]} position={[1.28,-.53,-.47]} radialSegments={16}>
   <meshPhysicalMaterial color={metal} metalness={.70} roughness={.31}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.16],[.27,-.16],[.13,.16],[0,.16]]} position={[1.28,.31,-.47]} radialSegments={28}>
   <meshStandardMaterial color={plaster} roughness={.59}/>
  </RevolvedSurface>
 </group>
}
