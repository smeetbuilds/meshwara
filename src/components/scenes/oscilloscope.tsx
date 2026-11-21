import { CurvedBox } from '../geometry/CurvedBox'
import { SplineTube } from '../geometry/GeometryV2'

/**
 * Bench digital oscilloscope: recessed graticule, dual signal traces,
 * coaxial BNC inputs, encoder knobs, key field, vents and feet.
 * Visual simulation only: not an electronic measurement instrument.
 */
type P=[number,number,number]
const ink='#303b40', frame='#606b71', rubber='#1e272d'
const traces=Array.from({length:2},(_,channel)=>Array.from({length:150},(_,i):P=>{
  const x=-1.08+i/149*1.56
  const t=i/149*Math.PI*6
  const y=channel===0 ? .23*Math.sin(t+.2)+.035*Math.sin(4*t) :
    -.15+.14*Math.sin(t*1.5+.4)*Math.exp(-i/260)
  return [x,.17+y,.742+channel*.004]
}))
const knobs=[[.93,.45],[1.22,.45],[.93,.07],[1.22,.07]] as const
const ports=[.77,1.10,1.43] as const
function Encoder({x,y,index}:{x:number;y:number;index:number}) {
  return <group position={[x,y,.737]}>
    <mesh rotation={[Math.PI/2,0,0]}>
      <cylinderGeometry args={[.143,.143,.028,40]}/>
      <meshPhysicalMaterial color="#242b2e" metalness={.28} roughness={.42}/>
    </mesh>
    <mesh position={[0,0,.036]} rotation={[Math.PI/2,0,0]}>
      <cylinderGeometry args={[.105,.105,.094,40]}/>
      <meshPhysicalMaterial color={index===0?'#b4c78a':'#89959a'} metalness={.58} roughness={.35}/>
    </mesh>
    {Array.from({length:24},(_,i)=> {
      const t=(i/24)*Math.PI*2
      return <mesh key={i} position={[Math.cos(t)*.106,Math.sin(t)*.106,.073]}>
        <boxGeometry args={[.011,.011,.04]}/>
        <meshStandardMaterial color="#353f44" metalness={.35} roughness={.47}/>
      </mesh>
    })}
    <mesh position={[0,.089,.099]}><boxGeometry args={[.015,.028,.009]}/>
      <meshStandardMaterial color="#e0e3df" roughness={.34}/>
    </mesh>
  </group>
}
export default function DigitalOscilloscope() {
  return <group position={[0,-.10,0]} rotation={[0,-.31,0]}>
    <CurvedBox args={[3.12,1.85,1.38]} radius={.12} smoothness={8} castShadow receiveShadow>
      <meshPhysicalMaterial color={frame} metalness={.44} roughness={.39} clearcoat={.12}/>
    </CurvedBox>
    <CurvedBox args={[3.04,1.74,.075]} radius={.08} smoothness={5} position={[0,0,.708]}>
      <meshStandardMaterial color={ink} roughness={.5}/>
    </CurvedBox>
    <mesh position={[-.34,.18,.759]}>
      <planeGeometry args={[1.81,1.13]}/>
      <meshBasicMaterial color="#0b1c21" toneMapped={false}/>
    </mesh>
    {Array.from({length:10},(_,i)=><mesh key={'v'+i}
      position={[-1.18+i*.188,.18,.764]}>
      <planeGeometry args={[.002,1.11]}/>
      <meshBasicMaterial color="#1c5050" transparent opacity={.40}/>
    </mesh>)}
    {Array.from({length:7},(_,i)=><mesh key={'h'+i}
      position={[-.34,-.32+i*.165,.765]}>
      <planeGeometry args={[1.79,.002]}/>
      <meshBasicMaterial color="#1c5050" transparent opacity={.38}/>
    </mesh>)}
    {traces.map((points,i)=><SplineTube key={i}
      points={points} radius={.008} tubularSegments={160} radialSegments={6}>
      <meshBasicMaterial color={i===0?'#5cf5b4':'#e6c56b'} toneMapped={false}/>
    </SplineTube>)}
    {[-1.17,-.89,-.61,-.33,-.05,.23].map((x,i)=>
      <mesh key={i} position={[x,-.48,.772]}>
        <boxGeometry args={[.12,.029,.009]}/>
        <meshBasicMaterial color={i<3?'#72deb9':'#c3b57a'}/>
      </mesh>
    )}
    <CurvedBox args={[.13,1.19,.08]} radius={.02} smoothness={3} position={[.68,.17,.761]}>
      <meshStandardMaterial color="#67767b" roughness={.34}/>
    </CurvedBox>
    {knobs.map(([x,y],i)=><Encoder key={i} x={x} y={y} index={i}/>)}
    {ports.map((x,i)=><group key={x} position={[x,-.55,.764]}>
      <mesh rotation={[Math.PI/2,0,0]}>
        <cylinderGeometry args={[.088,.088,.045,32]}/>
        <meshPhysicalMaterial color="#b5bcb9" metalness={.9} roughness={.22}/>
      </mesh>
      <mesh position={[0,0,.029]} rotation={[Math.PI/2,0,0]}>
        <torusGeometry args={[.056,.012,10,32]}/>
        <meshPhysicalMaterial color="#e3e5db" metalness={.84} roughness={.22}/>
      </mesh>
      <mesh position={[0,0,.046]}><circleGeometry args={[.038,24]}/>
        <meshStandardMaterial color="#17191b" roughness={.7}/>
      </mesh>
      <mesh position={[0,0,.051]}><circleGeometry args={[.010,16]}/>
        <meshPhysicalMaterial color={i===0?'#e8c566':'#8faab4'} metalness={.8} roughness={.25}/>
      </mesh>
    </group>)}
    {[-1,1].map(side=><group key={side}>
      {Array.from({length:9},(_,i)=><mesh key={i}
        position={[-.4+i*.14,.85,side*.25]}>
        <boxGeometry args={[.085,.004,.21]}/>
        <meshStandardMaterial color="#1b262a" roughness={.55}/>
      </mesh>)}
      <mesh position={[side*1.17,-.93,.36]}><boxGeometry args={[.42,.13,.5]}/>
        <meshStandardMaterial color={rubber} roughness={.93}/>
      </mesh>
    </group>)}
    <CurvedBox args={[.90,.08,.27]} radius={.034} smoothness={4} position={[0,1.0,-.16]}>
      <meshPhysicalMaterial color="#394348" metalness={.65} roughness={.42}/>
    </CurvedBox>
  </group>
}
