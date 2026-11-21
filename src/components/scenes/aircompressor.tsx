import * as THREE from 'three'
import { CurvedBox } from '../geometry/CurvedBox'
import { SplineTube } from '../geometry/GeometryV2'

/**
 * Wheeled workshop air compressor: pressure receiver, cast twin-piston pump,
 * finned electric motor, pressure gauge, regulator, copper discharge line,
 * protective cage, wheels and operating handle.
 */
const tank='#5b7582', iron='#434d51', steel='#b8c1c2', rubber='#242729'
type P=[number,number,number]
function Gauge({position}:{position:P}){
  return <group position={position}>
    <mesh rotation={[Math.PI/2,0,0]}>
      <cylinderGeometry args={[.175,.175,.096,40]}/>
      <meshPhysicalMaterial color="#aeb6b9" metalness={.86} roughness={.26}/>
    </mesh>
    <mesh position={[0,0,.054]}>
      <circleGeometry args={[.14,40]}/>
      <meshBasicMaterial color="#e6e5db"/>
    </mesh>
    {Array.from({length:11},(_,i)=>{
      const a=Math.PI*1.19+i*Math.PI*.163
      return <mesh key={i} position={[Math.sin(a)*.112,Math.cos(a)*.112,.064]} rotation={[0,0,-a]}>
        <boxGeometry args={[.008,.024,.004]}/>
        <meshBasicMaterial color="#343b3d"/>
      </mesh>
    })}
    <mesh position={[0,0,.078]} rotation={[0,0,-.74]}>
      <boxGeometry args={[.011,.09,.008]}/>
      <meshBasicMaterial color="#c45e43"/>
    </mesh>
    <mesh position={[0,0,.085]}>
      <sphereGeometry args={[.022,16,10]}/>
      <meshStandardMaterial color="#262d30" metalness={.6} roughness={.32}/>
    </mesh>
  </group>
}
export default function AirCompressor() {
  return <group position={[0,-.37,0]} rotation={[0,-.36,0]} scale={.88}>
    <mesh rotation={[0,0,Math.PI/2]} castShadow receiveShadow>
      <capsuleGeometry args={[.57,1.55,16,56]}/>
      <meshPhysicalMaterial color={tank} metalness={.58} roughness={.34} clearcoat={.24}/>
    </mesh>
    {[-.58,.58].map(x=><mesh key={x} position={[x,0,0]} rotation={[0,0,Math.PI/2]}>
      <torusGeometry args={[.565,.025,12,56]}/>
      <meshPhysicalMaterial color="#708e97" metalness={.60} roughness={.30}/>
    </mesh>)}
    <group position={[-.71,.61,0]}>
      <CurvedBox args={[.82,.20,.85]} radius={.035} smoothness={5}>
        <meshPhysicalMaterial color="#434f54" metalness={.52} roughness={.47}/>
      </CurvedBox>
    </group>
    <CurvedBox args={[.83,.47,.70]} radius={.076} smoothness={7}
      position={[-.77,1.0,0]} castShadow>
      <meshPhysicalMaterial color="#8a959a" metalness={.79} roughness={.36}/>
    </CurvedBox>
    {Array.from({length:9},(_,i)=><mesh key={i}
      position={[-1.11+i*.083,1.00,.37]}>
      <boxGeometry args={[.028,.31,.024]}/>
      <meshPhysicalMaterial color="#c2c9c8" metalness={.83} roughness={.30}/>
    </mesh>)}
    {[-.95,-.61].map(x=><group key={x}>
      <mesh position={[x,1.42,0]}>
        <cylinderGeometry args={[.185,.22,.41,28]}/>
        <meshPhysicalMaterial color="#929b9a" metalness={.75} roughness={.38}/>
      </mesh>
      {Array.from({length:6},(_,i)=><mesh key={i}
        position={[x,1.28+i*.047,0]}>
        <cylinderGeometry args={[.232,.232,.022,32]}/>
        <meshPhysicalMaterial color="#b9c0be" metalness={.78} roughness={.31}/>
      </mesh>)}
      <mesh position={[x,1.69,0]}>
        <cylinderGeometry args={[.24,.24,.11,8]}/>
        <meshPhysicalMaterial color={iron} metalness={.81} roughness={.32}/>
      </mesh>
    </group>)}
    <mesh position={[.48,1.03,0]} rotation={[0,0,Math.PI/2]}>
      <cylinderGeometry args={[.29,.29,.83,38]}/>
      <meshPhysicalMaterial color="#6e7c81" metalness={.72} roughness={.40}/>
    </mesh>
    {Array.from({length:13},(_,i)=><mesh key={i}
      position={[.12+i*.057,1.03,0]} rotation={[0,0,Math.PI/2]}>
      <cylinderGeometry args={[.345,.345,.022,36]}/>
      <meshPhysicalMaterial color="#abb5b8" metalness={.8} roughness={.34}/>
    </mesh>)}
    <mesh position={[.97,1.03,0]} rotation={[0,0,Math.PI/2]}>
      <cylinderGeometry args={[.12,.12,.25,28]}/>
      <meshPhysicalMaterial color={iron} metalness={.68} roughness={.4}/>
    </mesh>
    <SplineTube points={[[-.74,1.75,-.16],[-.35,1.88,-.27],[.06,1.51,-.35],[.13,.71,-.30]]}
      radius={.039} tubularSegments={64} radialSegments={10}>
      <meshPhysicalMaterial color="#a98b68" metalness={.9} roughness={.31}/>
    </SplineTube>
    <Gauge position={[1.08,.92,.50]}/>
    <mesh position={[.94,.64,.38]}>
      <cylinderGeometry args={[.13,.16,.23,28]}/>
      <meshPhysicalMaterial color="#b8bbb7" metalness={.87} roughness={.26}/>
    </mesh>
    <mesh position={[1.10,.68,.41]}>
      <sphereGeometry args={[.083,24,16]}/>
      <meshPhysicalMaterial color="#c75b43" metalness={.22} roughness={.4}/>
    </mesh>
    {[-1.09,1.12].map(x=><group key={x}>
      {[-.61,.61].map(z=><group key={z} position={[x,-.63,z]}>
        <mesh rotation={[Math.PI/2,0,0]}>
          <cylinderGeometry args={[.28,.28,.15,32]}/>
          <meshStandardMaterial color={rubber} roughness={.93}/>
        </mesh>
        <mesh position={[0,0,z>0?.082:-.082]} rotation={[Math.PI/2,0,0]}>
          <cylinderGeometry args={[.115,.115,.014,28]}/>
          <meshPhysicalMaterial color={steel} metalness={.84} roughness={.29}/>
        </mesh>
      </group>)}
    </group>)}
    <SplineTube points={[[1.26,-.38,-.30],[1.53,-.18,-.32],[1.55,.45,-.33],[1.38,.62,-.30]]}
      radius={.055} tubularSegments={38} radialSegments={12}>
      <meshPhysicalMaterial color="#3a4144" metalness={.66} roughness={.42}/>
    </SplineTube>
    <mesh position={[0,-.62,0]}>
      <boxGeometry args={[1.20,.12,.46]}/>
      <meshStandardMaterial color={iron} metalness={.65} roughness={.45}/>
    </mesh>
  </group>
}
