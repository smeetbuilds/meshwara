import * as THREE from 'three'
import { CurvedBox } from '../geometry/CurvedBox'
import { RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/**
 * Handheld diagnostic otoscope: removable conical speculum, angled optics,
 * viewing window, fiber-optic illumination ring, knurled handle, dimmer,
 * battery connector and tabletop charging dock.
 */
const satin='#65727b', handle='#343f47', metal='#adb8bd', lens='#102d36'
const profile: Array<[number,number]> = [
  [0,0],[.088,0],[.092,.05],[.11,.11],[.13,.18],[.18,.26],
  [.23,.38],[.26,.48],[.245,.52],[.202,.55],[0,.55]
]
const gripRings=Array.from({length:18},(_,i)=>-.41+i*.065)
function Selector() {
  return <group position={[-.20,.82,.29]}>
    <mesh rotation={[Math.PI/2,0,0]}>
      <cylinderGeometry args={[.12,.12,.08,40]}/>
      <meshPhysicalMaterial color={metal} metalness={.91} roughness={.24}/>
    </mesh>
    <mesh position={[0,0,.055]}>
      <cylinderGeometry args={[.057,.057,.02,26]}/>
      <meshPhysicalMaterial color="#222c30" metalness={.57} roughness={.38}/>
    </mesh>
  </group>
}
export default function ClinicalOtoscope(){
  return <group position={[0,-.25,0]} rotation={[0,-.42,-.03]} scale={.97}>
    <mesh position={[0,-.39,0]} castShadow receiveShadow>
      <cylinderGeometry args={[.205,.24,1.52,40,1]}/>
      <meshPhysicalMaterial color={handle} metalness={.52} roughness={.42} clearcoat={.14}/>
    </mesh>
    {gripRings.map(y=><mesh key={y} position={[0,y,0]} rotation={[Math.PI/2,0,0]}>
      <torusGeometry args={[.213,.008,7,44]}/>
      <meshStandardMaterial color="#4c565d" metalness={.49} roughness={.61}/>
    </mesh>)}
    {[-1.20,.37].map(y=><mesh key={y} position={[0,y,0]}>
      <cylinderGeometry args={[.246,.246,.075,40]}/>
      <meshPhysicalMaterial color={metal} metalness={.87} roughness={.29}/>
    </mesh>)}
    <mesh position={[0,.48,0]}>
      <cylinderGeometry args={[.185,.20,.23,40]}/>
      <meshPhysicalMaterial color="#77868e" metalness={.75} roughness={.38}/>
    </mesh>
    <CurvedBox args={[.70,.54,.65]} radius={.18} smoothness={8}
      position={[.21,.79,0]} rotation={[0,0,-.22]} castShadow>
      <meshPhysicalMaterial color={satin} metalness={.69} roughness={.34} clearcoat={.18}/>
    </CurvedBox>
    <mesh position={[-.05,.79,.34]}>
      <cylinderGeometry args={[.205,.205,.10,48]}/>
      <meshPhysicalMaterial color="#20292e" metalness={.7} roughness={.36}/>
    </mesh>
    <mesh position={[-.05,.79,.40]} rotation={[Math.PI/2,0,0]}>
      <circleGeometry args={[.185,56]}/>
      <meshPhysicalMaterial color={lens} metalness={.30} roughness={.08}
        clearcoat={1} clearcoatRoughness={.025}/>
    </mesh>
    <mesh position={[-.091,.82,.411]} rotation={[Math.PI/2,0,0]}>
      <circleGeometry args={[.067,32]}/>
      <meshBasicMaterial color="#84c7cf" transparent opacity={.3}/>
    </mesh>
    <Selector/>
    <group position={[.56,.91,0]} rotation={[0,0,Math.PI/2]}>
      <mesh>
        <cylinderGeometry args={[.235,.25,.35,48]}/>
        <meshPhysicalMaterial color={metal} metalness={.89} roughness={.26}/>
      </mesh>
      <mesh position={[0,.22,0]}>
        <cylinderGeometry args={[.26,.26,.085,48]}/>
        <meshPhysicalMaterial color="#242d31" metalness={.47} roughness={.45}/>
      </mesh>
      <RevolvedSurface profile={profile} position={[0,.43,0]} radialSegments={48}
        rotation={[0,0,0]} castShadow>
        <meshPhysicalMaterial color="#21292d" metalness={.12} roughness={.82}/>
      </RevolvedSurface>
      <mesh position={[0,.99,0]}>
        <cylinderGeometry args={[.060,.085,.03,32]}/>
        <meshStandardMaterial color="#222c31" roughness={.86}/>
      </mesh>
    </group>
    {[0,1,2,3,4,5].map(i=>{
      const a=i/6*Math.PI*2
      return <mesh key={i} position={[.77,.91+Math.sin(a)*.19,Math.cos(a)*.19]}>
        <sphereGeometry args={[.014,10,10]}/>
        <meshBasicMaterial color="#d1dedb"/>
      </mesh>
    })}
    <mesh position={[.03,-1.26,0]}>
      <cylinderGeometry args={[.24,.24,.15,40]}/>
      <meshPhysicalMaterial color="#3e4a4f" metalness={.64} roughness={.4}/>
    </mesh>
    <SplineTube points={[[.04,-1.23,-.19],[.07,-1.39,-.25],[.27,-1.51,-.30]]}
      radius={.025} radialSegments={9} tubularSegments={28}>
      <meshStandardMaterial color="#242b2e" roughness={.84}/>
    </SplineTube>
    <group position={[1.15,-1.18,-.19]}>
      <mesh position={[0,.04,0]}>
        <cylinderGeometry args={[.52,.60,.16,56]}/>
        <meshPhysicalMaterial color="#b3b8b7" metalness={.56} roughness={.38}/>
      </mesh>
      <mesh position={[0,.155,0]}>
        <cylinderGeometry args={[.30,.38,.11,40]}/>
        <meshStandardMaterial color="#363e43" metalness={.36} roughness={.61}/>
      </mesh>
      <mesh position={[0,.22,0]}>
        <cylinderGeometry args={[.19,.19,.02,40]}/>
        <meshPhysicalMaterial color="#b6bfbc" metalness={.83} roughness={.28}/>
      </mesh>
      <mesh position={[0,.236,0]}>
        <cylinderGeometry args={[.10,.10,.012,24]}/>
        <meshStandardMaterial color="#2c373a" roughness={.79}/>
      </mesh>
    </group>
  </group>
}
