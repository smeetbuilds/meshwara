import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** CNC lathe indexing head: twelve individually clocked tool blocks on a
 * machined polygonal carrier, central clamping spindle, rear drive housing,
 * front radial fasteners, tool shanks and coolant routing.
 */
const body='#576871', disk='#a9babc', black='#2f3b40', carbide='#d6b178', oil='#548c92', edge='#cdd6d6'
const mount:Array<[number,number]>=[[-.84,-.19],[.84,-.19],[.84,.19],[-.84,.19]]
const tool:Array<[number,number]>=[[-.10,-.17],[.10,-.17],[.10,.17],[-.10,.17]]
const turret:Array<[number,number]>=[[0,-.17],[.91,-.17],[.91,.17],[0,.17]]
const hub:Array<[number,number]>=[[0,-.22],[.41,-.22],[.41,.22],[0,.22]]
const pin:Array<[number,number]>=[[0,-.09],[.056,-.09],[.056,.09],[0,.09]]
const shaft:Array<[number,number]>=[[0,-.21],[.075,-.21],[.075,.21],[0,.21]]
const stations=Array.from({length:12},(_,i)=>i)
export default function TwelveStationToolTurret(){
 return <group rotation={[0,-.32,0]} position={[0,-.12,0]}>
  <ExtrudedProfile points={mount} depth={.98} bevelSize={.035} bevelThickness={.026} position={[0,-1.18,-.26]}>
   <meshPhysicalMaterial color={body} metalness={.78} roughness={.33} clearcoat={.1}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={[[-.62,-.51],[.62,-.51],[.62,.51],[-.62,.51]]} depth={.66} bevelSize={.045} bevelThickness={.03} position={[0,-.59,-.40]}>
   <meshStandardMaterial color={black} metalness={.66} roughness={.31}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={hub} rotation={[Math.PI/2,0,0]} position={[0,-.45,.03]} radialSegments={44}>
   <meshPhysicalMaterial color={body} metalness={.74} roughness={.24} clearcoat={.15}/>
  </RevolvedSurface>
  <RevolvedSurface profile={turret} rotation={[Math.PI/2,0,0]} position={[0,-.45,.30]} radialSegments={12}>
   <meshStandardMaterial color={disk} metalness={.87} roughness={.22} flatShading/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.12],[.76,-.12],[.76,.12],[0,.12]]} rotation={[Math.PI/2,0,0]} position={[0,-.45,.49]} radialSegments={12}>
   <meshStandardMaterial color={body} metalness={.84} roughness={.26} flatShading/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.07],[.30,-.07],[.30,.07],[0,.07]]} rotation={[Math.PI/2,0,0]} position={[0,-.45,.66]} radialSegments={32}>
   <meshStandardMaterial color={edge} metalness={.9} roughness={.2}/>
  </RevolvedSurface>
  <RevolvedSurface profile={shaft} rotation={[Math.PI/2,0,0]} position={[0,-.45,.77]} radialSegments={22}>
   <meshStandardMaterial color={black} metalness={.7} roughness={.26}/>
  </RevolvedSurface>
  {stations.map(i=>{
   const a=i*Math.PI/6
   const x=.73*Math.cos(a),y=-.45+.73*Math.sin(a)
   return <group key={i} position={[x,y,.64]} rotation={[0,0,a-Math.PI/2]}>
    <ExtrudedProfile points={tool} depth={.38} bevelSize={.013} bevelThickness={.011}>
     <meshPhysicalMaterial color={i%3===0?carbide:disk} metalness={.72} roughness={.28}/>
    </ExtrudedProfile>
    <ExtrudedProfile points={[[-.055,-.20],[.055,-.20],[.055,.20],[-.055,.20]]} depth={.28} bevelSize={.007} bevelThickness={.007} position={[0,.20,.08]}>
     <meshStandardMaterial color={black} metalness={.8} roughness={.23}/>
    </ExtrudedProfile>
    <RevolvedSurface profile={pin} rotation={[Math.PI/2,0,0]} position={[0,0,.25]} radialSegments={6}>
     <meshStandardMaterial color={carbide} metalness={.77} roughness={.22} flatShading/>
    </RevolvedSurface>
   </group>
  })}
  <ExtrudedProfile points={[[-.43,-.07],[.43,-.07],[.43,.07],[-.43,.07]]} depth={.35} bevelSize={.015} bevelThickness={.013} position={[0,-1.36,-.34]}>
   <meshStandardMaterial color={edge} metalness={.9} roughness={.24}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={[[0,-.31],[.18,-.31],[.18,.31],[0,.31]]} position={[.64,-1.00,-.48]} radialSegments={26}>
   <meshStandardMaterial color={body} metalness={.7} roughness={.3}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.11],[.11,-.11],[.11,.11],[0,.11]]} position={[.64,-.6,-.48]} radialSegments={24}>
   <meshStandardMaterial color={carbide} metalness={.76} roughness={.27}/>
  </RevolvedSurface>
  <SplineTube points={[[.66,-.68,-.38],[.83,-.44,-.3],[.73,-.20,.11],[.5,-.21,.38]]} radius={.029} tubularSegments={52}>
   <meshStandardMaterial color={oil} roughness={.73}/>
  </SplineTube>
 </group>
}
