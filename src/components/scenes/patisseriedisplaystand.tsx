import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Tiered patisserie stand with machined metal support, porcelain cake
 * platters and individual pastry objects, including macarons and tarts.
 */
const porcelain='#ede4d2', brass='#af8b54', cocoa='#684832', glaze='#d3a0a0', cream='#f5e0b5', pastry='#c68e58'
const plate:Array<[number,number]>=[[0,-.06],[.60,-.06],[.68,-.012],[.68,.025],[.62,.06],[0,.06]]
const pedestal:Array<[number,number]>=[[0,-.48],[.035,-.48],[.07,-.38],[.06,.38],[.035,.48],[0,.48]]
const tart:Array<[number,number]>=[[0,-.12],[.18,-.12],[.21,-.06],[.19,.08],[0,.09]]
const pastryPositions=[[-.35,-.2],[.15,-.42],[.38,.28],[-.38,.32],[.15,.15],[.04,-.04]] as Array<[number,number]>
export default function PatisserieDisplayStand(){
 return <group rotation={[0,-.43,0]} position={[0,-.20,0]}>
  <RevolvedSurface profile={[[0,-.10],[.58,-.10],[.64,.03],[.4,.10],[0,.10]]} position={[0,-1.22,0]} radialSegments={64}>
   <meshPhysicalMaterial color={brass} metalness={.93} roughness={.26}/>
  </RevolvedSurface>
  <RevolvedSurface profile={pedestal} position={[0,-.65,0]} radialSegments={26}>
   <meshPhysicalMaterial color={brass} metalness={.93} roughness={.23}/>
  </RevolvedSurface>
  <RevolvedSurface profile={plate} position={[0,-.32,0]} radialSegments={64}>
   <meshPhysicalMaterial color={porcelain} metalness={.03} roughness={.19} clearcoat={.7}/>
  </RevolvedSurface>
  <RevolvedSurface profile={pedestal.map(([x,y])=>[x*.8,y*.67] as [number,number])} position={[0,.13,0]} radialSegments={24}>
   <meshPhysicalMaterial color={brass} metalness={.93} roughness={.21}/>
  </RevolvedSurface>
  <RevolvedSurface profile={plate.map(([x,y])=>[x*.75,y] as [number,number])} position={[0,.50,0]} radialSegments={64}>
   <meshPhysicalMaterial color={porcelain} metalness={.04} roughness={.21} clearcoat={.7}/>
  </RevolvedSurface>
  {pastryPositions.map(([x,z],i)=><group key={i} position={[x,-.21,z]}>
   <RevolvedSurface profile={tart} radialSegments={24}>
    <meshPhysicalMaterial color={pastry} roughness={.65}/>
   </RevolvedSurface>
   <RevolvedSurface profile={[[0,-.028],[.17,-.028],[.18,.03],[0,.03]]} position={[0,.10,0]} radialSegments={28}>
    <meshPhysicalMaterial color={i%2?glaze:cocoa} roughness={.22} clearcoat={.52}/>
   </RevolvedSurface>
   <mesh position={[0,.17,0]}><sphereGeometry args={[.052,12,10]}/><meshStandardMaterial color={cream} roughness={.65}/></mesh>
  </group>)}
  {[[-.25,-.10],[.05,.25],[.26,-.05]].map(([x,z],i)=><group key={i} position={[x,.62,z]}>
   {[-.035,.035].map(y=><RevolvedSurface key={y} profile={[[0,-.024],[.125,-.024],[.125,.024],[0,.024]]} position={[0,y,0]} radialSegments={28}>
    <meshPhysicalMaterial color={i%2?glaze:pastry} roughness={.46}/>
   </RevolvedSurface>)}
   <RevolvedSurface profile={[[0,-.018],[.122,-.018],[.122,.018],[0,.018]]} radialSegments={26}>
    <meshPhysicalMaterial color={cream} roughness={.55}/>
   </RevolvedSurface>
  </group>)}
  <RevolvedSurface profile={[[0,-.065],[.075,-.065],[.085,.06],[0,.06]]} position={[0,.73,0]} radialSegments={20}>
   <meshPhysicalMaterial color={brass} metalness={.96} roughness={.22}/>
  </RevolvedSurface>
  <mesh position={[0,.83,0]}><sphereGeometry args={[.1,20,16]}/><meshPhysicalMaterial color={brass} metalness={.97} roughness={.21}/></mesh>
  <SplineTube points={[[-.60,-.31,.02],[-.47,-.29,.45],[0,-.28,.65],[.45,-.29,.47],[.60,-.31,.05]]} radius={.009} tubularSegments={52}>
   <meshStandardMaterial color={brass} metalness={.9} roughness={.28}/>
  </SplineTube>
 </group>
}
