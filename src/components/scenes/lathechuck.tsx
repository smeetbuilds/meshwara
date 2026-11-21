import * as THREE from 'three'
import { CurvedBox } from '../geometry/CurvedBox'
import { SplineTube } from '../geometry/GeometryV2'

/**
 * Three-jaw scroll lathe chuck: segmented stepped jaws, machined faceplate,
 * key sockets, jaw guideways, bolted ring and rear spindle register.
 * Original hard-surface illustration, not dimensional CAD for machining.
 */
const steel = '#9ea9af', dark = '#333b40', black = '#20272c', bright = '#d2d6d4'
const frontZ = .37
const circle = (radius: number, z: number) =>
  Array.from({length: 97},(_,i): [number,number,number]=>{
    const t=i/96*Math.PI*2
    return [Math.cos(t)*radius,Math.sin(t)*radius,z]
  })
const plateRings = [.45,.69,.92,1.10]
const steps = [.39,.52,.65]
function FaceBolt({x,y,z}:{x:number;y:number;z:number}) {
  return <group position={[x,y,z]}>
    <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.059,.059,.033,6]}/>
      <meshPhysicalMaterial color={steel} metalness={.94} roughness={.29}/></mesh>
    <mesh position={[0,0,.028]}><boxGeometry args={[.041,.009,.011]}/>
      <meshStandardMaterial color={black} metalness={.35} roughness={.49}/></mesh>
  </group>
}
export default function LatheChuck() {
  return <group rotation={[.18,-.32,.06]} scale={.94}>
    <mesh rotation={[Math.PI/2,0,0]} castShadow receiveShadow>
      <cylinderGeometry args={[1.21,1.19,.56,96]}/>
      <meshPhysicalMaterial color="#697278" metalness={.92} roughness={.31}/>
    </mesh>
    <mesh position={[0,0,.287]} rotation={[Math.PI/2,0,0]}>
      <cylinderGeometry args={[1.12,1.12,.075,96]}/>
      <meshPhysicalMaterial color={steel} metalness={.95} roughness={.23}/>
    </mesh>
    <mesh position={[0,0,.342]} rotation={[Math.PI/2,0,0]}>
      <cylinderGeometry args={[.25,.25,.016,64]}/>
      <meshPhysicalMaterial color={black} metalness={.46} roughness={.39}/>
    </mesh>
    {plateRings.map((radius,i)=><SplineTube key={radius} points={circle(radius,frontZ+i*.001)}
      closed radius={i===3?.007:.004} radialSegments={5} tubularSegments={120}>
      <meshStandardMaterial color={i===3?dark:bright} metalness={.93} roughness={.24}/>
    </SplineTube>)}
    {[0,1,2].map(i=>{
      const angle=Math.PI*2*i/3
      const x=Math.sin(angle),y=Math.cos(angle)
      return <group key={i} rotation={[0,0,-angle]}>
        <CurvedBox args={[.37,.91,.19]} radius={.018} smoothness={5}
          position={[0,.67,.417]} castShadow>
          <meshPhysicalMaterial color={dark} metalness={.84} roughness={.34}/>
        </CurvedBox>
        <CurvedBox args={[.28,.73,.24]} radius={.016} smoothness={5}
          position={[0,.60,.55]} castShadow>
          <meshPhysicalMaterial color={steel} metalness={.95} roughness={.23}/>
        </CurvedBox>
        {steps.map((y,k)=><group key={k}>
          <CurvedBox args={[.30,.145,.13]} radius={.009} smoothness={3}
            position={[0,y+.07,.68]} castShadow>
            <meshPhysicalMaterial color={k===0?bright:'#a3acaf'} metalness={.97} roughness={.28}/>
          </CurvedBox>
          <mesh position={[0,y+.08,.758]}>
            <boxGeometry args={[.29,.009,.008]}/>
            <meshStandardMaterial color={dark} metalness={.7} roughness={.4}/>
          </mesh>
        </group>)}
        {[.24,.89].map(y=><FaceBolt key={y} x={0} y={y} z={.79}/>)}
        <FaceBolt x={x*.82} y={y*.82} z={.39}/>
      </group>
    })}
    {Array.from({length:12},(_,i)=>{
      const a=i/12*Math.PI*2
      return <FaceBolt key={i} x={Math.cos(a)*1.02} y={Math.sin(a)*1.02} z={.37}/>
    })}
    {[0,1,2].map(i=>{
      const a=i/3*Math.PI*2+Math.PI/6
      return <group key={i} position={[Math.sin(a)*.93,Math.cos(a)*.93,.42]}>
        <mesh><cylinderGeometry args={[.13,.13,.028,6]}/>
          <meshPhysicalMaterial color={black} metalness={.65} roughness={.38}/></mesh>
        <mesh position={[0,.02,0]}><cylinderGeometry args={[.077,.077,.005,6]}/>
          <meshStandardMaterial color={steel} metalness={.92} roughness={.32}/></mesh>
      </group>
    })}
    <mesh position={[0,0,-.35]} rotation={[Math.PI/2,0,0]}>
      <cylinderGeometry args={[.76,.74,.22,64]}/>
      <meshPhysicalMaterial color="#4d575e" metalness={.83} roughness={.36}/>
    </mesh>
    <mesh position={[0,0,-.49]}>
      <torusGeometry args={[.49,.055,12,64]}/>
      <meshPhysicalMaterial color={steel} metalness={.88} roughness={.28}/>
    </mesh>
  </group>
}
