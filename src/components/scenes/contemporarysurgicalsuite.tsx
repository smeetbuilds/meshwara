import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Surgical theatre visualization with a segmented operating table, surgical
 * overhead lights, anesthesia cart, monitoring station and instrument tray.
 * Illustrative only, not approved for clinical training or equipment layout.
 */
const white='#e4e9e7', stainless='#b1c3c5', surgical='#6aa2a1', dark='#39494f', screen='#1f333b', light='#e9dcb2'
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const tableSegments=[[-.75,.45],[-.28,.48],[.23,.52],[.75,.42]]
const monitor=[-1.02,1.14]
const lights=[-.5,.5]
export default function ContemporarySurgicalSuite(){
 return <group rotation={[0,-.41,0]} scale={.94} position={[0,-.13,0]}>
  <ExtrudedProfile points={rect(3.1,2.25)} depth={.14} rotation={[Math.PI/2,0,0]} position={[0,-1.43,0]}>
   <meshStandardMaterial color={white} roughness={.54}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(3.1,1.7)} depth={.08} position={[0,.09,-.84]}>
   <meshStandardMaterial color={white} roughness={.72}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(1.96,.15)} depth={.75} position={[0,-1.25,.06]}>
   <meshPhysicalMaterial color={stainless} metalness={.78} roughness={.29}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={[[0,-.42],[.22,-.42],[.22,.42],[0,.42]]} position={[0,-.78,.03]} radialSegments={24}>
   <meshStandardMaterial color={stainless} metalness={.84} roughness={.26}/>
  </RevolvedSurface>
  <ExtrudedProfile points={rect(2.12,.09)} depth={.66} position={[0,-.44,.04]}>
   <meshPhysicalMaterial color={white} metalness={.24} roughness={.26} clearcoat={.3}/>
  </ExtrudedProfile>
  {tableSegments.map(([x,w],i)=><group key={i}>
   <ExtrudedProfile points={rect(w,.13)} depth={.63} bevelSize={.044} bevelThickness={.029} position={[x,-.30,.04]}>
    <meshPhysicalMaterial color={surgical} roughness={.50}/>
   </ExtrudedProfile>
  </group>)}
  {[-1,1].map(side=><SplineTube key={side} points={[[-.96,-.43,side*.35],[-.56,-.46,side*.37],[.36,-.46,side*.38],[.95,-.43,side*.35]]} radius={.025}>
   <meshStandardMaterial color={stainless} metalness={.79} roughness={.29}/>
  </SplineTube>)}
  {/* Distinct sterile overhead light arms with multi-diode reflectors. */}
  {lights.map((x,i)=><group key={i}>
   <SplineTube points={[[0,1.25,-.55],[x,1.13,-.40],[x*.9,.82,-.24]]} radius={.055}>
    <meshStandardMaterial color={stainless} metalness={.82} roughness={.27}/>
   </SplineTube>
   <RevolvedSurface profile={[[0,-.055],[.29,-.055],[.35,.01],[.30,.085],[0,.085]]} position={[x,.74,-.18]} radialSegments={12}>
    <meshPhysicalMaterial color={white} metalness={.24} roughness={.26} clearcoat={.55}/>
   </RevolvedSurface>
   {Array.from({length:7},(_,n)=><mesh key={n} position={[x+Math.cos(n*Math.PI*2/7)*.19,.67,-.18+Math.sin(n*Math.PI*2/7)*.19]}>
    <sphereGeometry args={[.044,12,8]}/><meshStandardMaterial color={light} emissive={light} emissiveIntensity={.48}/>
   </mesh>)}
  </group>)}
  {monitor.map((x,i)=><group key={i}>
   <ExtrudedProfile points={rect(.47,.40)} depth={.11} position={[x,.12,-.51]}>
    <meshPhysicalMaterial color={dark} metalness={.49} roughness={.36}/>
   </ExtrudedProfile>
   <ExtrudedProfile points={rect(.39,.30)} depth={.012} position={[x,.15,-.446]}>
    <meshStandardMaterial color={screen} emissive="#256668" emissiveIntensity={.24}/>
   </ExtrudedProfile>
   {Array.from({length:8},(_,n)=><mesh key={n} position={[x-.15+n*.043,.12+Math.sin(n*2)*.055,-.427]}>
    <boxGeometry args={[.027,.013,.007]}/><meshStandardMaterial color={surgical} emissive={surgical} emissiveIntensity={.35}/>
   </mesh>)}
   <RevolvedSurface profile={[[0,-.70],[.05,-.70],[.05,.70],[0,.70]]} position={[x,-.55,-.58]} radialSegments={12}>
    <meshStandardMaterial color={stainless} metalness={.81} roughness={.27}/>
   </RevolvedSurface>
  </group>)}
  <ExtrudedProfile points={rect(.60,.075)} depth={.38} position={[1.13,-.81,.45]}>
   <meshPhysicalMaterial color={stainless} metalness={.88} roughness={.24}/>
  </ExtrudedProfile>
  {Array.from({length:5},(_,n)=><mesh key={n} position={[.92+n*.1,-.71,.45]}>
   <cylinderGeometry args={[.024,.024,.24,10]}/><meshStandardMaterial color={stainless} metalness={.8} roughness={.3}/>
  </mesh>)}
 </group>
}
