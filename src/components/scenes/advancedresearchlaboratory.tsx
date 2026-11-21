import * as THREE from 'three'
import { CurvedBox } from '../geometry/CurvedBox'
import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/**
 * A legible molecular-analysis laboratory vignette: continuous lab bench,
 * fume extraction, microscope, centrifuge, pipette rack, sample vials,
 * monitor instrumentation, storage and task lighting. Original geometry.
 */
const finish = '#d9dfe0'
const porcelain = '#f2f1eb'
const steel = '#74828a'
const dark = '#323e46'
const navy = '#243844'
const teal = '#64b6ad'
const aqua = '#9ee3d7'
const flaskOutline = [
  new THREE.Vector2(0,0),new THREE.Vector2(.115,0),new THREE.Vector2(.164,.04),
  new THREE.Vector2(.145,.12),new THREE.Vector2(.064,.29),
  new THREE.Vector2(.057,.41),new THREE.Vector2(.071,.42)
]

function Drawer({ x, y, z, width = .72 }: { x:number;y:number;z:number;width?:number }) {
  return <group position={[x,y,z]}>
    <ExtrudedProfile points={[[ -width/2,-.135],[width/2,-.135],[width/2,.135],[-width/2,.135]]} depth={.035} bevelSize={.012} bevelThickness={.012}>
      <meshPhysicalMaterial color={finish} metalness={.17} roughness={.38} clearcoat={.2}/>
    </ExtrudedProfile>
    <ExtrudedProfile points={[[ -.125,-.0125],[.125,-.0125],[.125,.0125],[-.125,.0125]]} depth={.02} bevelSize={.006} bevelThickness={.006} position={[0,.04,.026]}>
      <meshStandardMaterial color={steel} metalness={.9} roughness={.23}/>
    </ExtrudedProfile>
  </group>
}
function Vial({ x, color, height = .25 }: { x:number;color:string;height?:number }) {
  return <group position={[x,0,0]}>
    <mesh position={[0,height*.47,0]}><cylinderGeometry args={[.057,.055,height,20]}/>
      <meshPhysicalMaterial color="#b8e2e5" metalness={.0} roughness={.08} transmission={.82} thickness={.16} transparent opacity={.68} clearcoat={.9}/>
    </mesh>
    <mesh position={[0,.072,0]}><cylinderGeometry args={[.052,.052,.105,20]}/>
      <meshPhysicalMaterial color={color} metalness={.03} roughness={.26} transparent opacity={.78}/>
    </mesh>
    <mesh position={[0,height+.02,0]}><cylinderGeometry args={[.061,.061,.052,20]}/><meshPhysicalMaterial color={dark} metalness={.34} roughness={.4}/></mesh>
  </group>
}
function Microscope() {
  const arm = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-.22,.17,-.06),
    new THREE.Vector3(-.22,.37,-.07),
    new THREE.Vector3(-.05,.60,-.08),
    new THREE.Vector3(.16,.63,-.08),
  ])
  return <group position={[-.83,-.25,.14]} scale={.81}>
    <ExtrudedProfile points={[[ -.34,-.05],[.34,-.05],[.34,.04],[.22,.06],[-.25,.06],[-.34,.035]]} depth={.45} bevelSize={.022} bevelThickness={.022} position={[0,-.05,0]}>
      <meshStandardMaterial color="#d2d7d8" metalness={.38} roughness={.38}/>
    </ExtrudedProfile>
    <mesh position={[-.19,.24,-.01]}><cylinderGeometry args={[.09,.14,.54,28]}/><meshPhysicalMaterial color={dark} metalness={.54} roughness={.32}/></mesh>
    <SplineTube points={arm.points.map(pt=>[pt.x,pt.y,pt.z] as [number,number,number])} radius={.098} tubularSegments={38} radialSegments={12}><meshPhysicalMaterial color={porcelain} metalness={.28} roughness={.29} clearcoat={.34}/></SplineTube>
    <group position={[.16,.66,-.07]} rotation={[0,0,-.25]}>
      <mesh><cylinderGeometry args={[.15,.16,.29,28]}/><meshPhysicalMaterial color={porcelain} metalness={.16} roughness={.22}/></mesh>
      <mesh position={[0,.22,0]}><cylinderGeometry args={[.092,.1,.27,24]}/><meshPhysicalMaterial color={dark} roughness={.54}/></mesh>
      <mesh position={[0,.36,0]}><cylinderGeometry args={[.085,.095,.06,24]}/><meshPhysicalMaterial color="#1e3037" roughness={.18} clearcoat={.7}/></mesh>
      <mesh position={[0,-.28,0]}><cylinderGeometry args={[.14,.1,.20,24]}/><meshPhysicalMaterial color={steel} metalness={.75} roughness={.26}/></mesh>
      {[-.11,0,.11].map(x=><mesh key={x} position={[x,-.40,0]}>
        <cylinderGeometry args={[.038,.048,.18,16]}/><meshPhysicalMaterial color="#303c43" metalness={.63} roughness={.26}/>
      </mesh>)}
    </group>
    <ExtrudedProfile points={[[ -.20,-.024],[.20,-.024],[.20,.024],[-.20,.024]]} depth={.37} bevelSize={.007} bevelThickness={.007} position={[.08,.18,0]}>
      <meshStandardMaterial color={dark} metalness={.5} roughness={.39}/>
    </ExtrudedProfile>
    <mesh position={[-.34,.28,.18]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.093,.093,.036,32]}/><meshPhysicalMaterial color={steel} metalness={.66} roughness={.24}/></mesh>
  </group>
}
function Centrifuge() {
  return <group position={[.23,-.22,-.13]}>
    <ExtrudedProfile points={[[ -.265,-.16],[.265,-.16],[.27,.11],[.20,.16],[-.20,.16],[-.27,.11]]} depth={.48} bevelSize={.025} bevelThickness={.025} position={[0,.05,0]}>
      <meshPhysicalMaterial color={finish} metalness={.28} roughness={.3} clearcoat={.4}/>
    </ExtrudedProfile>
    <mesh position={[0,.227,0]} rotation={[-Math.PI/2,0,0]}>
      <torusGeometry args={[.158,.025,12,48]}/>
      <meshPhysicalMaterial color={steel} metalness={.76} roughness={.26}/>
    </mesh>
    <mesh position={[0,.239,0]} rotation={[-Math.PI/2,0,0]}>
      <circleGeometry args={[.141,48]}/>
      <meshPhysicalMaterial color="#304f5a" roughness={.095} clearcoat={1}/>
    </mesh>
    <mesh position={[0,.01,.25]}><boxGeometry args={[.34,.13,.014]}/><meshPhysicalMaterial color={navy} roughness={.18} clearcoat={.7}/></mesh>
    {Array.from({length:4},(_,i)=><mesh key={i} position={[-.12+i*.079,-.005,.265]}>
      <boxGeometry args={[.044,.012,.008]}/><meshBasicMaterial color={i===0?aqua:'#8cb0c6'}/>
    </mesh>)}
  </group>
}
function FumeHood() {
  return <group position={[1.10,.10,-.70]}>
    <ExtrudedProfile points={[[ -.525,-.05],[.525,-.05],[.525,.05],[-.525,.05]]} depth={.80} bevelSize={.015} bevelThickness={.015} position={[0,-.14,0]}>
      <meshPhysicalMaterial color="#a8b0b3" metalness={.49} roughness={.34}/>
    </ExtrudedProfile>
    {[-.46,.46].map(x=><mesh key={x} position={[x,.43,-.29]}>
      <boxGeometry args={[.055,1.06,.06]}/><meshStandardMaterial color="#839196" metalness={.72} roughness={.32}/>
    </mesh>)}
    <mesh position={[0,.95,-.29]}><boxGeometry args={[1.00,.13,.62]}/><meshPhysicalMaterial color={finish} metalness={.2} roughness={.32}/></mesh>
    <mesh position={[0,.41,.10]}><boxGeometry args={[.86,.90,.018]}/><meshPhysicalMaterial color="#b7d7dc" roughness={.09} transmission={.83} thickness={.018} transparent opacity={.24}/></mesh>
    <mesh position={[0,.02,.11]}><boxGeometry args={[.87,.036,.06]}/><meshStandardMaterial color={steel} metalness={.72} roughness={.31}/></mesh>
    <mesh position={[0,1.10,-.36]}><cylinderGeometry args={[.18,.21,.26,30]}/><meshPhysicalMaterial color={steel} metalness={.7} roughness={.4}/></mesh>
    <mesh position={[0,.77,-.30]}><boxGeometry args={[.68,.018,.24]}/><meshBasicMaterial color="#d9f6ef" toneMapped={false}/></mesh>
    {[-.28,0,.28].map(x=><mesh key={x} position={[x,-.05,-.24]}>
      <cylinderGeometry args={[.055,.055,.17,20]}/><meshPhysicalMaterial color="#7cbeb9" transmission={.3} roughness={.22} transparent opacity={.75}/>
    </mesh>)}
  </group>
}
export default function AdvancedResearchLaboratory() {
  return <group rotation={[0,-.28,0]} position={[0,.17,0]} scale={.91}>
    {/* One believable lab bay: tiled floor, back wall, bench, drawers, equipment. */}
    <ExtrudedProfile points={[[ -1.825,-1.225],[1.825,-1.225],[1.825,1.225],[-1.825,1.225]]} depth={.12} bevelSize={.015} bevelThickness={.015} rotation={[Math.PI/2,0,0]} position={[0,-.99,0]}>
      <meshStandardMaterial color="#98aeb0" metalness={.08} roughness={.82}/>
    </ExtrudedProfile>
    <mesh position={[0,.005,-1.18]}><boxGeometry args={[3.6,2.00,.11]}/><meshStandardMaterial color="#c4d5d4" roughness={.74}/></mesh>
    {Array.from({length:10},(_,i)=><mesh key={i} position={[-1.64+i*.36,-.92,0]}>
      <boxGeometry args={[.008,.003,2.27]}/><meshStandardMaterial color="#7d979a" roughness={.9}/>
    </mesh>)}
    <ExtrudedProfile points={[[ -1.56,-.065],[1.56,-.065],[1.56,.065],[-1.56,.065]]} depth={.96} bevelSize={.024} bevelThickness={.024} position={[0,-.32,-.28]}>
      <meshPhysicalMaterial color="#eef2ee" metalness={.14} roughness={.21} clearcoat={.35}/>
    </ExtrudedProfile>
    {[-1.08,0,1.08].map(x=><group key={x}>
      <ExtrudedProfile points={[[ -.48,-.275],[.48,-.275],[.48,.275],[-.48,.275]]} depth={.77} bevelSize={.018} bevelThickness={.018} position={[x,-.67,-.27]}>
        <meshPhysicalMaterial color="#a2b2b2" metalness={.27} roughness={.42}/>
      </ExtrudedProfile>
      <Drawer x={x} y={-.56} z={.135} width={.84}/>
      <Drawer x={x} y={-.82} z={.135} width={.84}/>
    </group>)}
    {/* Bench backsplash, electrical rail and restrained equipment signage. */}
    <mesh position={[0,-.06,-.82]}><boxGeometry args={[3.3,.19,.054]}/><meshStandardMaterial color={steel} metalness={.65} roughness={.39}/></mesh>
    {[-1.05,-.15,.78].map(x=><group key={x} position={[x,.015,-.793]}>
      <mesh><boxGeometry args={[.25,.125,.015]}/><meshPhysicalMaterial color={porcelain} roughness={.6}/></mesh>
      {[-.062,.062].map(px=><mesh key={px} position={[px,.009,.012]}>
        <boxGeometry args={[.042,.054,.009]}/><meshStandardMaterial color="#2b3438" roughness={.54}/>
      </mesh>)}
    </group>)}
    <Microscope/>
    <Centrifuge/>
    <FumeHood/>
    {/* Rack and sample glassware with different colored liquids. */}
    <group position={[-.02,-.225,.33]}>
      <ExtrudedProfile points={[[ -.33,-.027],[.33,-.027],[.33,.027],[-.33,.027]]} depth={.17} bevelSize={.009} bevelThickness={.009} position={[0,.045,0]}>
        <meshPhysicalMaterial color={steel} metalness={.75} roughness={.38}/>
      </ExtrudedProfile>
      {['#67a9b1','#d6a25c','#80b5a1','#b98baf','#789bc1'].map((color,i)=>(
        <Vial key={color} x={-.23+i*.115} height={.22} color={color}/>
      ))}
    </group>
    {[-.12,.16].map((x,i)=><group key={i} position={[x,-.225,.64]}>
      <mesh><latheGeometry args={[flaskOutline,32]}/><meshPhysicalMaterial color="#d3eff3" metalness={.02} roughness={.075} transmission={.82} thickness={.04} transparent opacity={.53} side={2}/></mesh>
      <mesh position={[0,.07,0]}><cylinderGeometry args={[.10,.10,.10,28]}/><meshPhysicalMaterial color={i?'#a8b7d4':'#6bb9ae'} roughness={.27} transparent opacity={.64}/></mesh>
    </group>)}
    <group position={[-1.42,-.27,.26]}>
      <mesh><cylinderGeometry args={[.16,.13,.04,32]}/><meshPhysicalMaterial color={steel} metalness={.74} roughness={.3}/></mesh>
      {Array.from({length:6},(_,i)=>{
        const x=Math.cos(i*Math.PI/3)*.085, z=Math.sin(i*Math.PI/3)*.085
        return <mesh key={i} position={[x,.23,z]}>
          <cylinderGeometry args={[.018,.025,.42,12]}/><meshPhysicalMaterial color={i%2?'#ece9dc':'#9fcacf'} roughness={.27}/>
        </mesh>
      })}
    </group>
    {/* Instrument readout, cable and overhead clinical light */}
    <group position={[-.30,.50,-1.01]}>
      <CurvedBox args={[.87,.55,.07]} radius={.035} smoothness={4}>
        <meshStandardMaterial color={navy} metalness={.35} roughness={.24}/>
      </CurvedBox>
      <mesh position={[0,0,.044]}><planeGeometry args={[.75,.43]}/><meshBasicMaterial color="#1c4652"/></mesh>
      {Array.from({length:5},(_,i)=><mesh key={i} position={[-.28,.12-i*.058,.05]}>
        <boxGeometry args={[i%2?.28:.46,.013,.003]}/><meshBasicMaterial color={i%2?'#9ee3d7':'#7fb4c3'}/>
      </mesh>)}
      <mesh position={[0,-.36,-.06]}><boxGeometry args={[.07,.18,.06]}/><meshStandardMaterial color={steel}/></mesh>
    </group>
    <mesh position={[-.84,1.02,-.33]}><boxGeometry args={[1.20,.11,.37]}/><meshPhysicalMaterial color={porcelain} metalness={.14} roughness={.24}/></mesh>
    <mesh position={[-.84,.956,-.33]}><planeGeometry args={[1.05,.29]}/><meshBasicMaterial color="#e7fff7" toneMapped={false}/></mesh>
    {[-1.39,-.29].map(x=><mesh key={x} position={[x,.99,-.33]}>
      <boxGeometry args={[.022,.10,.37]}/><meshStandardMaterial color={steel} metalness={.7}/>
    </mesh>)}
    <mesh position={[-1.50,.12,-.88]}><boxGeometry args={[.26,.33,.06]}/><meshStandardMaterial color="#e8ece7" roughness={.48}/></mesh>
    <mesh position={[-1.50,.15,-.846]}><planeGeometry args={[.14,.20]}/><meshBasicMaterial color={teal}/></mesh>
  </group>
}
