import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { CurvedBox } from '../geometry/CurvedBox'

/** Three-jaw scroll chuck. The bore and radial guideways are open topology.
 * Original product-visualization geometry, not manufacturing CAD. */
const tau=Math.PI*2
const steel='#a5afb3',dark='#424b50',bright='#c4cac9'
const plateRings=[.44,.69,.91,1.08]
const steps=[.38,.51,.64]
function ringGeometry(profile:number[][]){
  const g=new THREE.LatheGeometry(profile.map(([r,z])=>new THREE.Vector2(r,z)),128)
  g.rotateX(Math.PI/2);return g
}
/** Each face sector leaves a real open radial slot for its neighboring jaw.
 * The inner arc and back-body annulus share the same unobstructed bore. */
function faceSector(){
  const r0=.265,r1=1.145,gap=.17
  const start=Math.asin(gap/r1),innerStart=Math.asin(Math.min(.9,gap/r0)),end=tau/3-start,innerEnd=tau/3-innerStart
  const s=new THREE.Shape();s.moveTo(r0*Math.cos(innerStart),r0*Math.sin(innerStart))
  s.lineTo(r1*Math.cos(start),r1*Math.sin(start))
  for(let i=1;i<=42;i++){const a=start+(end-start)*i/42;s.lineTo(r1*Math.cos(a),r1*Math.sin(a))}
  s.lineTo(r0*Math.cos(innerEnd),r0*Math.sin(innerEnd))
  for(let i=1;i<=22;i++){const a=innerEnd+(innerStart-innerEnd)*i/22;s.lineTo(r0*Math.cos(a),r0*Math.sin(a))}
  s.closePath()
  const g=new THREE.ExtrudeGeometry(s,{depth:.125,bevelEnabled:true,bevelSize:.009,bevelThickness:.009,bevelSegments:2})
  g.translate(0,0,.207);return g
}
function FaceBolt({x,y,z}:{x:number;y:number;z:number}){
  return <group position={[x,y,z]}>
    <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.049,.049,.027,24]}/><meshPhysicalMaterial color={steel} metalness={.82} roughness={.32}/></mesh>
    <mesh position={[0,0,.014]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.023,.023,.003,6]}/><meshStandardMaterial color="#303638" metalness={.48} roughness={.63}/></mesh>
  </group>
}
export default function LatheChuck(){
  const data=useMemo(()=>({
    body:ringGeometry([[.265,-.26],[1.15,-.26],[1.205,-.21],[1.205,.17],[1.17,.207],[.265,.207],[.265,-.26]]),
    sector:faceSector(),
    // rear spindle register is an annulus, not a solid cap.
    rear:ringGeometry([[.265,-.45],[.77,-.45],[.79,-.40],[.79,-.26],[.265,-.26],[.265,-.45]])
  }),[])
  useEffect(()=>()=>Object.values(data).forEach(g=>g.dispose()),[data])
  return <group rotation={[.17,-.38,.09]} scale={1.06}>
    <mesh geometry={data.body} castShadow receiveShadow><meshPhysicalMaterial color="#737e83" metalness={.78} roughness={.38} side={THREE.DoubleSide}/></mesh>
    <mesh geometry={data.rear}><meshPhysicalMaterial color="#5c666c" metalness={.76} roughness={.42} side={THREE.DoubleSide}/></mesh>
    {Array.from({length:3},(_,i)=><mesh key={i} geometry={data.sector} rotation={[0,0,Math.PI/2+i*tau/3]} castShadow>
      <meshPhysicalMaterial color={steel} metalness={.82} roughness={.32} side={THREE.DoubleSide}/>
    </mesh>)}
    {plateRings.map((radius,i)=>Array.from({length:3},(_,j)=>{
      const gap=Math.asin(.18/radius)
      return <mesh key={radius+':'+j} position={[0,0,.342]} rotation={[0,0,Math.PI/2+j*tau/3+gap]}>
        <torusGeometry args={[radius,.0023,4,48,tau/3-2*gap]}/><meshStandardMaterial color={i===3?dark:bright} metalness={.76} roughness={.39}/>
      </mesh>
    }))}
    {/* Slots run radially; jaws cover their central portion but don't block
        the bore. The three assemblies use exactly one local coordinate frame. */}
    {[0,1,2].map(i=><group key={i} rotation={[0,0,i*tau/3]}>
      <CurvedBox args={[.275,.78,.12]} radius={.012} smoothness={4} position={[0,.69,.285]} castShadow>
        <meshPhysicalMaterial color={dark} metalness={.79} roughness={.40}/>
      </CurvedBox>
      <CurvedBox args={[.255,.71,.19]} radius={.012} smoothness={4} position={[0,.685,.418]} castShadow>
        <meshPhysicalMaterial color={steel} metalness={.84} roughness={.32}/>
      </CurvedBox>
      {steps.map((y,k)=><group key={k}>
        <CurvedBox args={[.255,.15,.125-k*.022]} radius={.006} smoothness={3} position={[0,y+.035,.575-k*.025]} castShadow>
          <meshPhysicalMaterial color={bright} metalness={.84} roughness={.30}/>
        </CurvedBox>
        {Array.from({length:4},(_,n)=><mesh key={n} position={[(n-1.5)*.050,y-.032,.615-k*.032]}>
          <boxGeometry args={[.002,.006,.042]}/><meshStandardMaterial color={dark} metalness={.6} roughness={.48}/>
        </mesh>)}
      </group>)}
      <FaceBolt x={0} y={.89} z={.527}/>
      {[-1,1].map(s=><FaceBolt key={s} x={s*.29} y={.95} z={.347}/>)}
    </group>)}
    {/* Radial chuck-key sockets face outward on the cylindrical barrel. */}
    {[0,1,2].map(i=><group key={i} rotation={[0,0,(i+.5)*tau/3]}>
      <mesh position={[0,1.205,-.04]}><cylinderGeometry args={[.092,.092,.022,28]}/><meshPhysicalMaterial color="#4b5356" metalness={.75} roughness={.42}/></mesh>
      <mesh position={[0,1.219,-.04]}><boxGeometry args={[.084,.008,.084]}/><meshStandardMaterial color="#202628" metalness={.32} roughness={.67}/></mesh>
    </group>)}
    <mesh position={[0,0,-.451]}><torusGeometry args={[.714,.008,6,96]}/><meshStandardMaterial color={bright} metalness={.8} roughness={.36}/></mesh>
  </group>
}
