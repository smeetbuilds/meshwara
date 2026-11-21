import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Mastering control room: angled full-width console, real control strips,
 * nearfield monitor pairs, computer display, studio racks and acoustic panels.
 */
const wood='#7c5b43', graphite='#30393f', steel='#a7b9ba', led='#64c4b6', gold='#c8a56b', glass='#24353c', foam='#515459'
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const channels=Array.from({length:19},(_,i)=>i)
const rack=[-1.03,1.03]
export default function AudioMasteringDeskScene(){
 return <group rotation={[0,-.39,0]} scale={.95} position={[0,-.12,0]}>
  <ExtrudedProfile points={rect(3.0,1.90)} depth={.1} rotation={[Math.PI/2,0,0]} position={[0,-1.46,0]}>
   <meshStandardMaterial color={foam} roughness={.90}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.0,1.30)} depth={.10} position={[0,.05,-.75]}>
   <meshStandardMaterial color={foam} roughness={.86}/>
  </ExtrudedProfile>
  {Array.from({length:10},(_,i)=><ExtrudedProfile key={i} points={rect(.095,.94)} depth={.08} position={[-1.31+i*.29,.17,-.69]}>
   <meshStandardMaterial color={i%2?graphite:foam} roughness={.94}/>
  </ExtrudedProfile>)}
  <ExtrudedProfile points={rect(2.42,.20)} depth={.99} position={[0,-.68,.08]}>
   <meshPhysicalMaterial color={wood} roughness={.42} clearcoat={.22}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(2.26,.085)} depth={.62} rotation={[-.21,0,0]} position={[0,-.54,.37]}>
   <meshPhysicalMaterial color={graphite} metalness={.37} roughness={.33} clearcoat={.14}/>
  </ExtrudedProfile>
  {channels.map(i=><group key={i} position={[-1.05+i*.114,-.50,.43]}>
   <mesh position={[0,0,0]}><boxGeometry args={[.018,.015,.34]}/><meshStandardMaterial color={i%5===0?gold:steel} metalness={.5} roughness={.33}/></mesh>
   <mesh position={[0,.018,-.05+(i%4)*.026]}><boxGeometry args={[.055,.026,.035]}/><meshStandardMaterial color={graphite} metalness={.2} roughness={.52}/></mesh>
   <mesh position={[0,.027,-.16]}><boxGeometry args={[.035,.022,.025]}/><meshStandardMaterial color={i%3===0?led:gold} emissive={i%3===0?led:gold} emissiveIntensity={.35}/></mesh>
  </group>)}
  <ExtrudedProfile points={rect(.94,.65)} depth={.09} position={[0,.12,-.50]}>
   <meshStandardMaterial color={graphite} metalness={.4} roughness={.24}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(.85,.54)} depth={.014} position={[0,.13,-.442]}>
   <meshPhysicalMaterial color={glass} metalness={.07} roughness={.12} emissive="#214e50" emissiveIntensity={.28}/>
  </ExtrudedProfile>
  {Array.from({length:11},(_,i)=><mesh key={i} position={[-.36+i*.071,.11+Math.sin(i*1.8)*.09,-.428]}>
   <boxGeometry args={[.043,.017,.009]}/>
   <meshStandardMaterial color={i%3===0?gold:led} emissive={led} emissiveIntensity={.24}/>
  </mesh>)}
  {rack.map(x=><group key={x}>
   <ExtrudedProfile points={rect(.39,.77)} depth={.43} position={[x,.18,-.49]}>
    <meshStandardMaterial color={graphite} metalness={.5} roughness={.35}/>
   </ExtrudedProfile>
   {[.25,.18].map((r,i)=><RevolvedSurface key={i} profile={[[0,-.03],[r*.78,-.03],[r*.78,.03],[0,.03]]} rotation={[Math.PI/2,0,0]} position={[x,.29-i*.30,-.24]}>
    <meshStandardMaterial color={i===0?steel:gold} metalness={.68} roughness={.31}/>
   </RevolvedSurface>)}
   <mesh position={[x,.29,-.20]}><cylinderGeometry args={[.055,.055,.022,20]}/><meshStandardMaterial color={glass} roughness={.7}/></mesh>
  </group>)}
  {[-1.10,1.10].map(x=><ExtrudedProfile key={x} points={rect(.12,.79)} depth={.85} position={[x,-1.10,.11]}>
   <meshStandardMaterial color={wood} roughness={.49}/>
  </ExtrudedProfile>)}
  <RevolvedSurface profile={[[0,-.38],[.13,-.38],[.13,.38],[0,.38]]} position={[0,-1.2,.86]}>
   <meshStandardMaterial color={graphite} roughness={.75}/>
  </RevolvedSurface>
  <SplineTube points={[[-1.06,-.67,.58],[-.91,-.84,.77],[-.56,-.96,.79]]} radius={.027}>
   <meshStandardMaterial color={graphite} roughness={.83}/>
  </SplineTube>
 </group>
}
