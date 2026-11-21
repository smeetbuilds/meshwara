import * as THREE from 'three'
import { CurvedBox } from '../geometry/CurvedBox'
import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/**
 * An industrial robot workcell with two articulated 6-axis manipulator
 * silhouettes, fixture grippers, conveyor, safety perimeter and PLC cabinet.
 * Original procedural engineering study; not a generic industrial shell.
 */
type V = [number, number, number]
const pale = '#d3d7d5'
const steel = '#626c74'
const iron = '#343b40'
const hazard = '#e4a72c'
const rubber = '#1d2429'

function Link({ start, end, radius, color = hazard, metalness = .3 }: { start: V; end: V; radius: number; color?: string; metalness?: number }) {
  const a = new THREE.Vector3(...start)
  const b = new THREE.Vector3(...end)
  const length = a.distanceTo(b)
  const mid = a.clone().add(b).multiplyScalar(.5)
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize())
  return (
    <group>
      <RevolvedSurface position={mid} quaternion={quaternion} profile={[[0,-length/2],[radius,-length/2],[radius*.94,length/2],[0,length/2]]} radialSegments={24}>
        <meshPhysicalMaterial color={color} metalness={metalness} roughness={.27} clearcoat={.3}/>
      </RevolvedSurface>
      <mesh position={start}>
        <sphereGeometry args={[radius * 1.15,24,16]}/>
        <meshPhysicalMaterial color={iron} metalness={.78} roughness={.28}/>
      </mesh>
      <mesh position={end}>
        <sphereGeometry args={[radius * .89,24,16]}/>
        <meshPhysicalMaterial color={iron} metalness={.72} roughness={.28}/>
      </mesh>
    </group>
  )
}
function Robot({ x, direction }: { x:number; direction:1|-1 }) {
  const shoulder: V = [x,-.39,-.66]
  const elbow: V = [x + direction * .32,.31,-.60]
  const wrist: V = [x + direction * .06,.55,-.15]
  const tip: V = [x - direction * .14,.14,.17]
  const wire = new THREE.CatmullRomCurve3([
    new THREE.Vector3(x,-.58,-.83),
    new THREE.Vector3(...shoulder).add(new THREE.Vector3(0,.05,-.22)),
    new THREE.Vector3(...elbow).add(new THREE.Vector3(0,.05,-.13)),
    new THREE.Vector3(...wrist).add(new THREE.Vector3(0,.07,-.09)),
    new THREE.Vector3(...tip),
  ])
  return (
    <group>
      <mesh position={[x,-.67,-.66]}>
        <cylinderGeometry args={[.26,.30,.20,36]}/>
        <meshPhysicalMaterial color={iron} metalness={.75} roughness={.34}/>
      </mesh>
      <mesh position={[x,-.50,-.66]}>
        <cylinderGeometry args={[.165,.20,.19,36]}/>
        <meshPhysicalMaterial color={hazard} metalness={.22} roughness={.3} clearcoat={.4}/>
      </mesh>
      <Link start={shoulder} end={elbow} radius={.18}/>
      <Link start={elbow} end={wrist} radius={.135}/>
      <Link start={wrist} end={tip} radius={.098} color={pale} metalness={.7}/>
      {/* Distinct rotational joint disks and visible fasteners */}
      {[shoulder,elbow,wrist].map((at,i)=>(
        <group key={i} position={at}>
          <RevolvedSurface rotation={[0,0,Math.PI/2]} profile={[[0,-.095],[.15-i*.024,-.095],[.15-i*.024,.095],[0,.095]]} radialSegments={36}><meshPhysicalMaterial color="#818b8e" metalness={.88} roughness={.23}/></RevolvedSurface>
          {[-.08,.08].map(z=><mesh key={z} position={[z,0,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.085,.085,.012,32]}/><meshPhysicalMaterial color={iron} metalness={.55} roughness={.32}/></mesh>)}
        </group>
      ))}
      <SplineTube points={wire.points.map(point=>[point.x,point.y,point.z] as V)} radius={.037} tubularSegments={66} radialSegments={10}><meshStandardMaterial color={rubber} roughness={.83}/></SplineTube>
      <group position={tip}>
        <ExtrudedProfile points={[[ -.16,-.08],[.16,-.08],[.17,.055],[.10,.08],[-.10,.08],[-.17,.055]]} depth={.20} bevelSize={.015} bevelThickness={.015}>
          <meshPhysicalMaterial color={steel} metalness={.85} roughness={.24}/>
        </ExtrudedProfile>
        {[-1,1].map(side=><group key={side} position={[side*.116,-.14,.03]}>
          <mesh><boxGeometry args={[.07,.26,.07]}/><meshPhysicalMaterial color="#c2c8cc" metalness={.76} roughness={.25}/></mesh>
          <mesh position={[0,-.135,.035]}><boxGeometry args={[.11,.045,.09]}/><meshStandardMaterial color="#20272b" roughness={.8}/></mesh>
        </group>)}
      </group>
    </group>
  )
}
function Conveyor() {
  return <group position={[0,-.54,.63]}>
    <ExtrudedProfile points={[[-1.29,-.25],[1.29,-.25],[1.32,-.17],[1.32,.08],[1.22,.12],[-1.22,.12],[-1.32,.08],[-1.32,-.17]]} depth={.68} bevelSize={.022} bevelThickness={.022} position={[0,-.095,0]}>
      <meshStandardMaterial color="#505960" metalness={.72} roughness={.34}/>
    </ExtrudedProfile>
    <mesh position={[0,.083,0]}><boxGeometry args={[2.43,.075,.51]}/><meshStandardMaterial color="#262c31" roughness={.91}/></mesh>
    {Array.from({length:19},(_,i)=>{
      const x=-1.14+i*.127
      return <RevolvedSurface key={i} position={[x,.135,0]} rotation={[Math.PI/2,0,0]} profile={[[0,-.24],[.03,-.24],[.03,.24],[0,.24]]} radialSegments={16}><meshPhysicalMaterial color={i%4===0?'#8f9b9b':'#59636b'} metalness={.72} roughness={.35}/>
      </RevolvedSurface>
    })}
    {[-.33,.33].map(z=><mesh key={z} position={[0,.13,z]}>
      <boxGeometry args={[2.6,.07,.055]}/><meshStandardMaterial color="#a9b2b6" metalness={.75} roughness={.3}/>
    </mesh>)}
    {[-1.0,1.0].map(x=><group key={x} position={[x,-.4,0]}>
      <mesh><boxGeometry args={[.11,.7,.11]}/><meshStandardMaterial color={iron} metalness={.72} roughness={.34}/></mesh>
      <mesh position={[0,-.31,0]}><boxGeometry args={[.33,.08,.36]}/><meshStandardMaterial color="#444b4e" roughness={.6}/></mesh>
    </group>)}
    {[-.52,.42].map(x=><group key={x} position={[x,.235,0]}>
      <CurvedBox args={[.30,.20,.27]} radius={.022} smoothness={3}>
        <meshPhysicalMaterial color={x<0?'#8d9da0':'#a2afb0'} metalness={.8} roughness={.27}/>
      </CurvedBox>
      <mesh position={[0,.115,0]}><boxGeometry args={[.15,.035,.12]}/><meshStandardMaterial color="#2e363c" roughness={.65}/></mesh>
    </group>)}
  </group>
}
function FencePanel({ x, z, horizontal = false }: { x:number; z:number; horizontal?:boolean }) {
  return <group position={[x,-.29,z]} rotation={[0,horizontal?Math.PI/2:0,0]}>
    {[-.92,.92].map(px=><ExtrudedProfile key={px} position={[px,0,0]} points={[[ -.032,-.62],[.032,-.62],[.032,.62],[-.032,.62]]} depth={.066} bevelSize={.006} bevelThickness={.006}><meshStandardMaterial color={hazard} metalness={.42} roughness={.38}/>
    </ExtrudedProfile>)}
    {[ -.54,.49 ].map(y=><mesh key={y} position={[0,y,0]}><boxGeometry args={[1.9,.064,.06]}/><meshPhysicalMaterial color={hazard} metalness={.36} roughness={.38}/></mesh>)}
    {Array.from({length:17},(_,i)=><mesh key={i} position={[-.83+i*.104,0,0]}>
      <boxGeometry args={[.009,.99,.008]}/><meshStandardMaterial color="#9da8a4" metalness={.65} roughness={.5} transparent opacity={.68}/>
    </mesh>)}
    {Array.from({length:8},(_,i)=><mesh key={i} position={[0,-.4+i*.13,0]}>
      <boxGeometry args={[1.76,.008,.008]}/><meshStandardMaterial color="#9da8a4" metalness={.65} roughness={.5} transparent opacity={.68}/>
    </mesh>)}
  </group>
}
export default function RoboticsAssemblyCell() {
  return <group rotation={[0,-.28,0]} position={[0,.12,0]} scale={.88}>
    {/* Precision machine base and anti-slip floor. */}
    <ExtrudedProfile points={[[-1.82,-1.33],[1.82,-1.33],[1.84,1.33],[-1.84,1.33]]} depth={.16} bevelSize={.03} bevelThickness={.03} rotation={[Math.PI/2,0,0]} position={[0,-.98,0]}>
      <meshStandardMaterial color="#4d585c" metalness={.5} roughness={.72}/>
    </ExtrudedProfile>
    {Array.from({length:12},(_,i)=><mesh key={i} position={[-1.64+i*.3,-.891,-.94]}>
      <boxGeometry args={[.012,.002,1.62]}/><meshStandardMaterial color="#69747a" metalness={.72} roughness={.55}/>
    </mesh>)}
    {[-1.47,1.47].map(x=><mesh key={x} position={[x,-.86,0]}>
      <boxGeometry args={[.13,.012,2.32]}/><meshStandardMaterial color={hazard} roughness={.52}/>
    </mesh>)}
    <Robot x={-.96} direction={1}/>
    <Robot x={.96} direction={-1}/>
    <Conveyor/>
    <FencePanel x={0} z={-1.23}/>
    <FencePanel x={-1.72} z={0} horizontal/>
    <FencePanel x={1.72} z={0} horizontal/>
    {/* PLC drive cabinet, door hardware and tri-state indicator */}
    <group position={[1.39,-.37,-.74]}>
      <ExtrudedProfile points={[[-.24,-.54],[.24,-.54],[.24,.54],[-.24,.54]]} depth={.38} bevelSize={.025} bevelThickness={.025}>
        <meshPhysicalMaterial color="#c6cbcc" metalness={.58} roughness={.39}/>
      </ExtrudedProfile>
      <mesh position={[0,.20,.2]}><boxGeometry args={[.31,.32,.015]}/><meshStandardMaterial color="#263340" metalness={.34} roughness={.18}/></mesh>
      {Array.from({length:4},(_,i)=><mesh key={i} position={[-.09,.33-i*.05,.21]}>
        <boxGeometry args={[.08,.01,.007]}/><meshBasicMaterial color={i===0?'#5fe0a2':'#6597af'}/>
      </mesh>)}
      <mesh position={[.17,-.24,.21]}><cylinderGeometry args={[.026,.026,.018,18]}/><meshStandardMaterial color="#21262a" metalness={.6} roughness={.31}/></mesh>
      <mesh position={[0,.68,0]}><cylinderGeometry args={[.014,.014,.4,12]}/><meshStandardMaterial color={steel}/></mesh>
      {['#44cc72','#eac84e','#cc5151'].map((color,i)=><RevolvedSurface key={color} position={[0,.89+i*.11,0]} profile={[[0,-.042],[.069,-.042],[.077,0],[.069,.042],[0,.042]]} radialSegments={24}><meshPhysicalMaterial color={color} emissive={color} emissiveIntensity={i===0?.33:.055} roughness={.2} transparent opacity={.93}/>
      </RevolvedSurface>)}
    </group>
  </group>
}
