import * as THREE from 'three'
import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/** Astronomical rooftop observatory with equatorial tracking telescope, OTA,
 * optical focuser, pier, control box, roof-mounted shade and guardrails.
 * Not optically calibrated or mechanically load-rated.
 */
const floor='#a5a8a5', rail='#43535a', steel='#a6b8bd', white='#d8ddda', optic='#2b3d47', glass='#698aa0', gold='#b69b5c'
const rect=(w:number,h:number):Array<[number,number]>=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]
const poles=[-1.40,-.70,0,.70,1.40]
const tube:Array<[number,number]>=[[0,-.61],[.21,-.61],[.23,-.56],[.23,.56],[.21,.61],[0,.61]]
export default function ObservatoryRoofDeck(){
 return <group rotation={[0,-.42,0]} scale={.92} position={[0,-.15,0]}>
  <ExtrudedProfile points={rect(3.4,2.5)} depth={.19} rotation={[Math.PI/2,0,0]} position={[0,-1.4,0]}>
   <meshStandardMaterial color={floor} roughness={.84}/>
  </ExtrudedProfile>
  {[-1,1].map(side=><group key={side}>
   {poles.map(x=><ExtrudedProfile key={x} points={rect(.044,.75)} depth={.055} position={[x,-.88,side*1.16]}>
    <meshStandardMaterial color={rail} metalness={.73} roughness={.32}/>
   </ExtrudedProfile>)}
   <ExtrudedProfile points={rect(3.04,.046)} depth={.06} position={[0,-.49,side*1.16]}>
    <meshStandardMaterial color={rail} metalness={.73} roughness={.32}/>
   </ExtrudedProfile>
  </group>)}
  {[-1.42,1.42].map(x=><ExtrudedProfile key={x} points={rect(.045,.72)} depth={2.34} position={[x,-.88,0]}>
   <meshStandardMaterial color={rail} metalness={.73} roughness={.32}/>
  </ExtrudedProfile>)}
  <ExtrudedProfile points={rect(1.50,.19)} depth={1.32} position={[0,-1.29,-.12]}>
   <meshPhysicalMaterial color={floor} roughness={.74}/>
  </ExtrudedProfile>
  <RevolvedSurface profile={[[0,-.63],[.24,-.63],[.27,.60],[0,.60]]} position={[0,-.61,-.17]} radialSegments={32}>
   <meshPhysicalMaterial color={steel} metalness={.79} roughness={.3}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.17],[.37,-.17],[.40,.17],[0,.17]]} position={[0,.12,-.17]} radialSegments={36}>
   <meshStandardMaterial color={rail} metalness={.74} roughness={.3}/>
  </RevolvedSurface>
  <RevolvedSurface profile={[[0,-.15],[.15,-.15],[.15,.15],[0,.15]]} rotation={[0,0,Math.PI/2]} position={[0,.32,-.17]} radialSegments={24}>
   <meshPhysicalMaterial color={gold} metalness={.79} roughness={.3}/>
  </RevolvedSurface>
  <group rotation={[.27,0,-.46]} position={[0,.48,-.18]}>
   <RevolvedSurface profile={tube} rotation={[0,0,Math.PI/2]} radialSegments={48}>
    <meshPhysicalMaterial color={white} metalness={.42} roughness={.3} clearcoat={.27}/>
   </RevolvedSurface>
   <RevolvedSurface profile={[[0,-.08],[.30,-.08],[.30,.08],[0,.08]]} rotation={[0,0,Math.PI/2]} position={[-.56,0,0]} radialSegments={42}>
    <meshPhysicalMaterial color={rail} metalness={.78} roughness={.24}/>
   </RevolvedSurface>
   <RevolvedSurface profile={[[0,-.045],[.23,-.045],[.23,.045],[0,.045]]} rotation={[0,0,Math.PI/2]} position={[-.66,0,0]} radialSegments={40}>
    <meshPhysicalMaterial color={glass} metalness={.14} roughness={.06} clearcoat={.96}/>
   </RevolvedSurface>
   <RevolvedSurface profile={[[0,-.10],[.11,-.10],[.11,.10],[0,.10]]} rotation={[0,0,Math.PI/2]} position={[.66,0,0]}>
    <meshStandardMaterial color={optic} metalness={.59} roughness={.34}/>
   </RevolvedSurface>
   <SplineTube points={[[-.25,.19,.13],[.03,.32,.16],[.34,.25,.14]]} radius={.025}>
    <meshStandardMaterial color={rail} metalness={.61} roughness={.36}/>
   </SplineTube>
  </group>
  {/* External control podium and retractable roof shade frame. */}
  <ExtrudedProfile points={rect(.35,.65)} depth={.27} position={[1.03,-.95,.42]}>
   <meshPhysicalMaterial color={white} metalness={.30} roughness={.39}/>
  </ExtrudedProfile>
  <ExtrudedProfile points={rect(.28,.22)} depth={.014} position={[1.03,-.65,.57]}>
   <meshStandardMaterial color={optic} emissive="#2a6068" emissiveIntensity={.27}/>
  </ExtrudedProfile>
  {[0,.37,.74,1.11].map(y=><ExtrudedProfile key={y} points={rect(.08,.05)} depth={1.06} position={[-1.14,-1.13+y,-.24]}>
   <meshStandardMaterial color={rail} metalness={.73} roughness={.36}/>
  </ExtrudedProfile>)}
  <ExtrudedProfile points={rect(.76,.10)} depth={1.15} position={[-1.14,.02,-.24]}>
   <meshStandardMaterial color={white} roughness={.51}/>
  </ExtrudedProfile>
  <SplineTube points={[[-.14,-.50,-.17],[.18,-.74,-.27],[.76,-.88,.19],[1.02,-.78,.42]]} radius={.035}>
   <meshStandardMaterial color={optic} roughness={.83}/>
  </SplineTube>
 </group>
}
