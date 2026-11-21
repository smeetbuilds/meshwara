import * as THREE from 'three'
import { CurvedBox } from '../geometry/CurvedBox'
import { SplineTube, RevolvedSurface } from '../geometry/GeometryV2'

/**
 * Ceramic laboratory stir plate with a graduated borosilicate beaker,
 * shallow liquid meniscus, PTFE stir bar, heat/status indicators and
 * mechanically distinct temperature/speed dials.
 * Static educational visualization; not an operational lab instrument.
 */
const offwhite='#dee0dc', ceramic='#f1eee7', metal='#a6adb0', ink='#303a40'
const beakerProfile: [number,number][]=[
  [.25,0],[.39,0],[.405,.03],[.408,.15],[.413,.37],[.415,.63],[.420,.78],
  [.425,.84],[.46,.86],[.475,.89],[.463,.915],[.42,.915],
]
const samples=[0.10,.22,.34,.46,.58,.70]
function ControlKnob({x,label}:{x:number;label:'heat'|'speed'}) {
  return <group position={[x,-.47,.647]}>
    <mesh rotation={[Math.PI/2,0,0]}>
      <cylinderGeometry args={[.135,.135,.085,36]}/>
      <meshPhysicalMaterial color="#b4bbbd" roughness={.3} metalness={.81}/>
    </mesh>
    <mesh position={[0,0,.058]} rotation={[Math.PI/2,0,0]}>
      <cylinderGeometry args={[.097,.097,.040,36]}/>
      <meshPhysicalMaterial color={ink} roughness={.51} metalness={.22}/>
    </mesh>
    {Array.from({length:18},(_,i)=>{
      const t=i/18*Math.PI*2
      return <mesh key={i} position={[Math.cos(t)*.106,Math.sin(t)*.106,.079]}>
        <boxGeometry args={[.009,.012,.015]}/>
        <meshStandardMaterial color="#829095" roughness={.54} metalness={.48}/>
      </mesh>
    })}
    <mesh position={[0,.076,.09]}>
      <boxGeometry args={[.012,.034,.009]}/>
      <meshBasicMaterial color={label==='heat'?'#cf8157':'#70b5b6'}/>
    </mesh>
  </group>
}
export default function MagneticStirrer() {
  return <group position={[0,-.22,0]} rotation={[0,-.37,0]} scale={1.05}>
    <CurvedBox args={[1.90,.52,1.47]} radius={.095} smoothness={7} position={[0,-.44,0]}
      castShadow receiveShadow>
      <meshPhysicalMaterial color={offwhite} roughness={.49} metalness={.19}/>
    </CurvedBox>
    <CurvedBox args={[1.63,.075,1.21]} radius={.04} smoothness={5}
      position={[0,-.14,-.05]}>
      <meshPhysicalMaterial color={ceramic} roughness={.29} metalness={.08}
        clearcoat={.42} clearcoatRoughness={.25}/>
    </CurvedBox>
    <mesh position={[0,-.088,-.05]}>
      <boxGeometry args={[1.53,.01,1.12]}/>
      <meshPhysicalMaterial color="#d2d2c9" metalness={.02} roughness={.39}/>
    </mesh>
    <group position={[-.10,-.07,-.08]}>
      <mesh position={[0,.45,0]} castShadow receiveShadow>
        <cylinderGeometry args={[.419,.395,.91,64,1,true]}/>
        <meshPhysicalMaterial color="#b7d4d7" roughness={.07} metalness={.0}
          transmission={.92} thickness={.07} transparent opacity={.44}
          side={THREE.DoubleSide} depthWrite={false}/>
      </mesh>
      <mesh position={[0,.03,0]}>
        <cylinderGeometry args={[.395,.395,.042,64]}/>
        <meshPhysicalMaterial color="#bed6d6" metalness={.02} roughness={.13}
          transparent opacity={.45} transmission={.62}/>
      </mesh>
      <mesh position={[0,.35,0]}>
        <cylinderGeometry args={[.397,.395,.47,64,1,true]}/>
        <meshPhysicalMaterial color="#8cbfbe" roughness={.12} metalness={0}
          transparent opacity={.31} transmission={.64} depthWrite={false}
          side={THREE.DoubleSide}/>
      </mesh>
      <mesh position={[0,.585,0]} rotation={[-Math.PI/2,0,0]}>
        <circleGeometry args={[.397,64]}/>
        <meshPhysicalMaterial color="#b9d9da" roughness={.14} metalness={0}
          transparent opacity={.65} transmission={.2} side={THREE.DoubleSide}/>
      </mesh>
      <mesh position={[0,.91,0]} rotation={[Math.PI/2,0,0]}>
        <torusGeometry args={[.42,.017,12,64]}/>
        <meshPhysicalMaterial color="#d2e2e3" roughness={.17} metalness={.02}
          transmission={.78} transparent opacity={.62}/>
      </mesh>
      <RevolvedSurface profile={beakerProfile} radialSegments={60} position={[0,.008,0]}>
        <meshPhysicalMaterial color="#a2c1c1" metalness={.01} roughness={.09}
          transparent opacity={.22} transmission={.78}
          depthWrite={false} side={THREE.DoubleSide}/>
      </RevolvedSurface>
      {samples.map((y,i)=><group key={i}>
        <mesh position={[.398,y+.05,.019]}>
          <boxGeometry args={[.012,.008,i%2===0?.18:.11]}/>
          <meshStandardMaterial color="#688b90" transparent opacity={.62} roughness={.75}/>
        </mesh>
      </group>)}
      <mesh position={[0,.055,0]} rotation={[0,0,Math.PI/2]} castShadow>
        <capsuleGeometry args={[.052,.35,8,20]}/>
        <meshPhysicalMaterial color="#f2efdc" roughness={.38} metalness={.04} clearcoat={.34}/>
      </mesh>
      {[-.43,.43].map(x=><mesh key={x} position={[x,.87,.04]}>
        <boxGeometry args={[.10,.05,.11]}/>
        <meshPhysicalMaterial color="#d4dedb" roughness={.25} metalness={0}
          transmission={.67} transparent opacity={.35}/>
      </mesh>)}
    </group>
    <ControlKnob x={-.40} label="heat"/>
    <ControlKnob x={.36} label="speed"/>
    <CurvedBox args={[.42,.17,.024]} radius={.012} smoothness={4}
      position={[.45,-.26,.758]}>
      <meshPhysicalMaterial color="#15262d" metalness={.12} roughness={.15} clearcoat={.63}/>
    </CurvedBox>
    {Array.from({length:3},(_,i)=><mesh key={i}
      position={[.31+i*.087,-.26,.772]}>
      <boxGeometry args={[.042,.008,.005]}/>
      <meshBasicMaterial color={i===2?'#e5ab6b':'#65b8a8'} toneMapped={false}/>
    </mesh>)}
    {[.70,-.70].flatMap(x=>[-.54,.54].map(z=><mesh key={x+':'+z} position={[x,-.79,z]}>
      <cylinderGeometry args={[.094,.095,.10,22]}/>
      <meshStandardMaterial color="#303539" roughness={.95}/>
    </mesh>))}
    <SplineTube points={[[.94,-.47,-.42],[1.17,-.47,-.61],[1.30,-.71,-.63]]}
      radius={.035} radialSegments={8} tubularSegments={26}>
      <meshStandardMaterial color="#292c2f" roughness={.86}/>
    </SplineTube>
    <mesh position={[-.75,-.29,.735]}>
      <circleGeometry args={[.035,20]}/>
      <meshBasicMaterial color="#69bc91" toneMapped={false}/>
    </mesh>
  </group>
}
