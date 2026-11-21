import * as THREE from 'three'
import { SplineTube } from '../geometry/GeometryV2'

/**
 * Woven 16x19 tennis string bed inside an actual elliptical racket head,
 * forked graphite throat, cushioned overgrip and molded end cap.
 * Dimensions are stylized to viewport scale; visual sign-off is still needed.
 */
type P=[number,number,number]
const dark='#252e34', graphite='#343e44', edge='#aab3b7', string='#e0dfd5'
const ellipse = Array.from({length:129},(_,i):P=>{
  const t=(i/128)*Math.PI*2
  return [Math.sin(t)*.79,.74+Math.cos(t)*1.03,0]
})
const throatLeft:P[]=[[-.67,.02,0],[-.57,-.35,0],[-.26,-.79,0],[0,-1.00,0]]
const throatRight:P[]=[[.67,.02,0],[.57,-.35,0],[.26,-.79,0],[0,-1.00,0]]
const gripHelix = Array.from({length:91},(_,i):P=>{
  const y=-2.27+i/90*1.08
  const turn=(i/90)*Math.PI*2*12
  return [Math.cos(turn)*.126,y,Math.sin(turn)*.106]
})
const mains=Array.from({length:16},(_,i)=>{
  const x=-.69+i*(1.38/15)
  const y=1.03*Math.sqrt(Math.max(0,1-(x/.79)**2))-.068
  return {x,top:.74+y,bottom:.74-y}
})
const crosses=Array.from({length:19},(_,i)=>{
  const y=-.22+i*1.92/18
  const x=.79*Math.sqrt(Math.max(0,1-((y-.74)/1.03)**2))-.055
  return {y,left:-x,right:x}
})
const collars=[-.98,-1.12,-2.23]

export default function TennisRacket() {
  return <group rotation={[.11,-.32,-.38]} scale={.92}>
    <SplineTube points={ellipse} closed radius={.049} tubularSegments={160} radialSegments={12}>
      <meshPhysicalMaterial color={graphite} metalness={.28} roughness={.31} clearcoat={.6} clearcoatRoughness={.17}/>
    </SplineTube>
    <SplineTube points={ellipse} closed radius={.012} tubularSegments={160} radialSegments={7}>
      <meshPhysicalMaterial color={edge} metalness={.49} roughness={.23} clearcoat={.5}/>
    </SplineTube>
    {[throatLeft,throatRight].map((points,i)=><SplineTube key={i}
      points={points} radius={.051} tubularSegments={45} radialSegments={12}>
      <meshPhysicalMaterial color={graphite} metalness={.26} roughness={.31} clearcoat={.66}/>
    </SplineTube>)}
    {[-1,1].map(side=><mesh key={side} position={[side*.18,-.68,0]}>
      <sphereGeometry args={[.065,18,12]}/>
      <meshPhysicalMaterial color={edge} metalness={.55} roughness={.25}/>
    </mesh>)}
    <mesh position={[0,-.99,0]}>
      <cylinderGeometry args={[.085,.085,.31,20]}/>
      <meshPhysicalMaterial color="#b8b9b6" metalness={.68} roughness={.24}/>
    </mesh>
    <mesh position={[0,-1.66,0]} scale={[1,1,.89]}>
      <cylinderGeometry args={[.125,.12,1.11,20]}/>
      <meshPhysicalMaterial color={dark} roughness={.68} metalness={.08} clearcoat={.12}/>
    </mesh>
    <SplineTube points={gripHelix} radius={.008} tubularSegments={260} radialSegments={5}>
      <meshStandardMaterial color="#808482" metalness={.05} roughness={.95}/>
    </SplineTube>
    {collars.map(y=><mesh key={y} position={[0,y,0]}>
      <cylinderGeometry args={[.139,.139,.056,28]}/>
      <meshPhysicalMaterial color={y<-2?'#151819':'#9aada6'} metalness={y<-2?.12:.42} roughness={.4}/>
    </mesh>)}
    {mains.map(({x,top,bottom},i)=><mesh key={'m'+i} position={[x,(top+bottom)/2,0]}>
      <cylinderGeometry args={[.005,.005,top-bottom,6]}/>
      <meshStandardMaterial color={string} roughness={.67}/>
    </mesh>)}
    {crosses.map(({y,left,right},i)=><mesh key={'c'+i} position={[(right+left)/2,y,.009]} rotation={[0,0,Math.PI/2]}>
      <cylinderGeometry args={[.0045,.0045,right-left,6]}/>
      <meshStandardMaterial color="#d2d5ca" roughness={.72}/>
    </mesh>)}
    {Array.from({length:32},(_,i)=>{
      const t=i/32*Math.PI*2
      return <mesh key={i} position={[Math.sin(t)*.79,.74+Math.cos(t)*1.03,0]}
        rotation={[0,0,-t]}>
        <boxGeometry args={[.015,.069,.079]}/>
        <meshStandardMaterial color={i%2===0?'#59676e':'#33393d'} metalness={.2} roughness={.7}/>
      </mesh>
    })}
  </group>
}
