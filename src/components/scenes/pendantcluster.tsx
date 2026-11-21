import * as THREE from 'three'
import { RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/**
 * Three-light pendant composition. Each individually hung shade has a
 * two-wall turned metal profile, rolled edge, reflector, socket, luminous
 * diffused bulb, cable gland and ceiling canopy.
 */
type P=[number,number,number]
const fixtures=[
  {x:-.86,y:.18,z:-.12,s:.72,metal:'#b8b4a4'},
  {x:0,y:-.42,z:.10,s:.62,metal:'#798c8f'},
  {x:.84,y:.10,z:.18,s:.68,metal:'#c7b49b'},
] as const
const dome: Array<[number,number]>=[
  [0,.32],[.13,.31],[.22,.28],[.34,.22],[.45,.08],
  [.55,-.11],[.59,-.28],[.56,-.29],[.53,-.25],[.50,-.10],
  [.40,.055],[.29,.16],[.12,.23],[0,.24],
]
const steel='#505a5e'
function Pendant({x,y,z,s,metal}:{
  x:number;y:number;z:number;s:number;metal:string
}) {
  const cord:P[]=[[x,1.89,z],[x,1.41,z],[x,y+.25*s,z]]
  return <group>
    <SplineTube points={cord} radius={.014} tubularSegments={35} radialSegments={8}>
      <meshStandardMaterial color="#353638" metalness={.19} roughness={.83}/>
    </SplineTube>
    <mesh position={[x,1.93,z]}>
      <cylinderGeometry args={[.13,.13,.09,32]}/>
      <meshPhysicalMaterial color={steel} metalness={.80} roughness={.34}/>
    </mesh>
    <mesh position={[x,1.86,z]}>
      <cylinderGeometry args={[.045,.045,.13,28]}/>
      <meshPhysicalMaterial color="#a3aaa8" metalness={.90} roughness={.27}/>
    </mesh>
    <group position={[x,y,z]}>
      <RevolvedSurface profile={dome} radialSegments={64} scale={s} castShadow receiveShadow>
        <meshPhysicalMaterial color={metal} roughness={.19} metalness={.04}
          transmission={.55} ior={1.48} thickness={.08}
          transparent opacity={.78} depthWrite={false}
          clearcoat={.68} clearcoatRoughness={.16}
          side={THREE.DoubleSide}/>
      </RevolvedSurface>
      <mesh position={[0,-.285*s,0]} rotation={[Math.PI/2,0,0]}>
        <torusGeometry args={[.564*s,.020*s,12,64]}/>
        <meshPhysicalMaterial color="#d4d4c8" metalness={.82} roughness={.23}/>
      </mesh>
      <mesh position={[0,.11*s,0]}>
        <cylinderGeometry args={[.10*s,.12*s,.21*s,28]}/>
        <meshPhysicalMaterial color="#b4b9b5" roughness={.33} metalness={.81}/>
      </mesh>
      <mesh position={[0,-.055*s,0]}>
        <sphereGeometry args={[.21*s,32,24]}/>
        <meshPhysicalMaterial color="#fff1d7" roughness={.28}
          metalness={0} transmission={.42} ior={1.45} thickness={.05*s}
          emissive="#ffd9a4" emissiveIntensity={.33}/>
      </mesh>
      <mesh position={[0,-.29*s,0]} rotation={[Math.PI/2,0,0]}>
        <torusGeometry args={[.513*s,.010*s,8,56]}/>
        <meshStandardMaterial color="#a39b89" metalness={.25} roughness={.61}/>
      </mesh>
      <mesh position={[0,.30*s,0]}>
        <cylinderGeometry args={[.078*s,.080*s,.075*s,22]}/>
        <meshPhysicalMaterial color="#707a7a" metalness={.87} roughness={.31}/>
      </mesh>
      {Array.from({length:12},(_,i)=>{
        const a=i/12*Math.PI*2
        return <mesh key={i} position={[Math.cos(a)*.565*s,-.27*s,Math.sin(a)*.565*s]}>
          <sphereGeometry args={[.006*s,8,6]}/>
          <meshStandardMaterial color="#9d9180" metalness={.54} roughness={.39}/>
        </mesh>
      })}
    </group>
  </group>
}
export default function PendantCluster(){
  return <group rotation={[0,-.28,0]} scale={.82} position={[0,-.09,0]}>
    <mesh position={[0,2.06,0]} castShadow>
      <boxGeometry args={[3.21,.13,1.28]}/>
      <meshPhysicalMaterial color="#ded8cc" roughness={.70} metalness={0}/>
    </mesh>
    <mesh position={[0,2.105,0]}>
      <boxGeometry args={[3.08,.014,1.19]}/>
      <meshStandardMaterial color="#8b877e" roughness={.70}/>
    </mesh>
    {fixtures.map((data,i)=><Pendant key={i} {...data}/>)}
    <pointLight position={[0,-.35,.02]} color="#ffe7bb" intensity={1.12} distance={3.4} decay={2}/>
  </group>
}
