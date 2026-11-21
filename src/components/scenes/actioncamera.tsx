import { CurvedBox } from '../geometry/CurvedBox'
import { SplineTube } from '../geometry/GeometryV2'

/**
 * Rugged action-camera body with nested optical elements, front status display,
 * microphone ports, side weather seals, and a two-prong mounting hinge.
 * Object-specific authored parts; no OEM logos or imported scan.
 */
const shell='#2a3032', gasket='#15191a', alloy='#889398', glass='#102a38'
const facePath=[[-.65,-.33,.375],[.65,-.33,.375],[.69,-.27,.375],[.69,.29,.375],
  [.64,.35,.375],[-.64,.35,.375],[-.69,.28,.375],[-.69,-.27,.375],[-.65,-.33,.375]] as [number,number,number][]
function Lens() {
  return <group position={[.30,.045,.397]}>
    {[{radius:.344,thick:.055,z:0,color:'#606d71'},{radius:.295,thick:.055,z:.062,color:'#1f2628'},
      {radius:.257,thick:.026,z:.112,color:'#78868c'},{radius:.219,thick:.019,z:.137,color:'#0c141a'}].map((ring,i)=>
      <mesh key={i} position={[0,0,ring.z]}>
        <torusGeometry args={[ring.radius,ring.thick,14,60]}/>
        <meshPhysicalMaterial color={ring.color} metalness={i%2===0?.82:.48} roughness={i===3?.22:.32} clearcoat={.24}/>
      </mesh>
    )}
    <mesh position={[0,0,.147]}>
      <circleGeometry args={[.219,60]}/>
      <meshPhysicalMaterial color={glass} roughness={.04} metalness={.42}
        clearcoat={1} clearcoatRoughness={.025}/>
    </mesh>
    <mesh position={[-.055,.062,.156]}>
      <circleGeometry args={[.087,40]}/>
      <meshPhysicalMaterial color="#2e6a7f" transparent opacity={.27} metalness={.2} roughness={.05}
        clearcoat={1}/>
    </mesh>
    <mesh position={[.066,-.055,.158]}>
      <circleGeometry args={[.039,36]}/>
      <meshBasicMaterial color="#9eb8c0" transparent opacity={.19}/>
    </mesh>
    {Array.from({length:38},(_,i)=>{
      const a=i/38*Math.PI*2
      return <mesh key={i} position={[Math.cos(a)*.303,Math.sin(a)*.303,.093]}
        rotation={[0,0,a]}>
        <boxGeometry args={[.010,.025,.012]}/>
        <meshStandardMaterial color="#161c20" roughness={.55}/>
      </mesh>
    })}
  </group>
}
export default function ActionCamera() {
  return <group rotation={[-.10,-.37,-.025]} scale={1.25}>
    <CurvedBox args={[1.54,.99,.78]} radius={.13} smoothness={9} castShadow receiveShadow>
      <meshPhysicalMaterial color={shell} metalness={.16} roughness={.58} clearcoat={.14}/>
    </CurvedBox>
    <CurvedBox args={[1.46,.89,.045]} radius={.10} smoothness={6}
      position={[0,0,.403]}>
      <meshPhysicalMaterial color="#303a3c" metalness={.22} roughness={.42}/>
    </CurvedBox>
    <SplineTube points={facePath} radius={.013} tubularSegments={68} radialSegments={6} closed>
      <meshStandardMaterial color={gasket} roughness={.94}/>
    </SplineTube>
    <Lens/>
    <CurvedBox args={[.43,.31,.025]} radius={.04} smoothness={6}
      position={[-.42,.13,.442]}>
      <meshPhysicalMaterial color="#141f22" metalness={.06} roughness={.19} clearcoat={.65}/>
    </CurvedBox>
    {Array.from({length:3},(_,i)=><mesh key={i}
      position={[-.57,-.025+i*.032,.458]}>
      <boxGeometry args={[.26,.018,.004]}/>
      <meshBasicMaterial color={i===0?'#7ed2c1':'#4b8585'}/>
    </mesh>)}
    <mesh position={[-.61,-.31,.458]}>
      <circleGeometry args={[.038,28]}/>
      <meshBasicMaterial color="#d65f43" toneMapped={false}/>
    </mesh>
    {[-.47,-.40,-.33].map(x=><mesh key={x} position={[x,.48,.15]}>
      <cylinderGeometry args={[.014,.014,.009,18]}/>
      <meshStandardMaterial color="#0f1518" roughness={.98}/>
    </mesh>)}
    <mesh position={[.38,.522,.02]}>
      <cylinderGeometry args={[.115,.115,.055,36]}/>
      <meshPhysicalMaterial color="#a9b6b1" metalness={.74} roughness={.28}/>
    </mesh>
    <mesh position={[.38,.56,.02]}>
      <cylinderGeometry args={[.078,.078,.010,32]}/>
      <meshStandardMaterial color="#bd654d" roughness={.67}/>
    </mesh>
    <CurvedBox args={[.25,.57,.12]} radius={.045} smoothness={6}
      position={[.775,-.02,-.04]}>
      <meshStandardMaterial color={gasket} roughness={.92}/>
    </CurvedBox>
    <CurvedBox args={[1.18,.62,.025]} radius={.058} smoothness={5}
      position={[0,.01,-.407]}>
      <meshPhysicalMaterial color="#101f24" metalness={.05} roughness={.18} clearcoat={.75}/>
    </CurvedBox>
    {[-.23,.23].map(x=><group key={x} position={[x,-.64,-.06]}>
      <CurvedBox args={[.12,.39,.31]} radius={.045} smoothness={6}>
        <meshPhysicalMaterial color={shell} roughness={.62} metalness={.15}/>
      </CurvedBox>
      <mesh position={[0,-.15,0]} rotation={[0,0,Math.PI/2]}>
        <cylinderGeometry args={[.095,.095,.15,24]}/>
        <meshPhysicalMaterial color={alloy} roughness={.28} metalness={.79}/>
      </mesh>
    </group>)}
    <mesh position={[0,-.78,-.06]} rotation={[0,0,Math.PI/2]}>
      <cylinderGeometry args={[.07,.07,.68,24]}/>
      <meshPhysicalMaterial color="#727d80" metalness={.87} roughness={.33}/>
    </mesh>
  </group>
}
