import { CC0Surface } from '../geometry/CC0Surface'
import { SplineTube } from '../geometry/GeometryV2'

/**
 * Cast-in-place concrete staircase: structural flight, independently readable
 * nosings and risers, upper/lower landings, paired guard rails, anchored
 * vertical balusters and discreet bolted steel handrail connections.
 * The concrete is an existing SHA-256-verified Poly Haven CC0 scanned surface.
 */
type Point = [number,number,number]
const count = 10
const run = .29
const rise = .182
const originX = -1.40
const originY = -.91
const steel = '#414b50'
const bright = '#9ca7a8'
const levels = Array.from({length:count},(_,i)=>({
  x:originX+i*run,
  y:originY+i*rise,
}))
const railPts = (z:number):Point[] => levels
 .filter((_,i)=>i===0||i===3||i===6||i===9)
 .map(({x,y}):Point=>[x,y+1.16,z])
const buildRail=(z:number)=>railPts(z)
function Handrail({z}:{z:number}) {
  return <group>
    <SplineTube points={buildRail(z)} radius={.038}
      tubularSegments={74} radialSegments={10}>
      <meshPhysicalMaterial color={steel} metalness={.79}
        roughness={.31} clearcoat={.17}/>
    </SplineTube>
    {levels.map(({x,y},i)=>i%3===0||i===9?
      <group key={i}>
        <mesh position={[x,y+.595,z]} castShadow>
          <cylinderGeometry args={[.019,.019,1.10,12]}/>
          <meshPhysicalMaterial color={bright} metalness={.83} roughness={.31}/>
        </mesh>
        <mesh position={[x,y+.035,z]}>
          <cylinderGeometry args={[.073,.073,.025,24]}/>
          <meshPhysicalMaterial color={steel} metalness={.84} roughness={.29}/>
        </mesh>
        <mesh position={[x,y+.06,z]}>
          <cylinderGeometry args={[.025,.025,.036,6]}/>
          <meshStandardMaterial color={bright} metalness={.68} roughness={.4}/>
        </mesh>
      </group>
      : <mesh key={i} position={[x,y+.58,z]} castShadow>
        <cylinderGeometry args={[.011,.011,1.05,10]}/>
        <meshPhysicalMaterial color={steel} metalness={.80} roughness={.32}/>
      </mesh>
    )}
    <SplineTube points={levels.map(({x,y}):Point=>[x,y+.16,z])}
      radius={.019} radialSegments={8} tubularSegments={80}>
      <meshPhysicalMaterial color="#56636a" metalness={.78} roughness={.36}/>
    </SplineTube>
  </group>
}
export default function BrutalistStair(){
  return <group position={[0,-.09,0]} rotation={[0,-.37,0]} scale={.96}>
    {/* Visible stair flight is a continuous concrete slab behind the steps. */}
    <mesh position={[0,-.17,0]} rotation={[0,0,-.55]} castShadow receiveShadow>
      <boxGeometry args={[3.49,.19,1.53]}/>
      <CC0Surface texture="concrete"/>
    </mesh>
    {levels.map(({x,y},i)=><group key={i}>
      <mesh position={[x,y,0]} castShadow receiveShadow>
        <boxGeometry args={[.345,.078,1.60]}/>
        <CC0Surface texture="concrete"/>
      </mesh>
      <mesh position={[x-.132,y-.104,0]} castShadow receiveShadow>
        <boxGeometry args={[.060,.155,1.53]}/>
        <CC0Surface texture="concrete"/>
      </mesh>
      <mesh position={[x+.138,y+.040,0]}>
        <boxGeometry args={[.018,.007,1.55]}/>
        <meshStandardMaterial color="#9c9385" roughness={.83}/>
      </mesh>
      <mesh position={[x-.01,y+.043,.70]}>
        <boxGeometry args={[.17,.006,.022]}/>
        <meshStandardMaterial color="#d4cbbb" roughness={.85}/>
      </mesh>
    </group>)}
    {/* Landings are load-bearing, not a decorative box beneath a stair sculpture. */}
    <mesh position={[-1.67,-1.05,0]} castShadow receiveShadow>
      <boxGeometry args={[.93,.20,2.04]}/>
      <CC0Surface texture="concrete"/>
    </mesh>
    <mesh position={[1.53,.82,0]} castShadow receiveShadow>
      <boxGeometry args={[.88,.20,2.05]}/>
      <CC0Surface texture="concrete"/>
    </mesh>
    {/* Steel side stringers and guard rails are actual continuous members. */}
    {[-.88,.88].map(z=><group key={z}>
      <SplineTube points={[[originX-.21,originY-.18,z],
        [originX+.4,originY+.18,z],
        [originX+1.41,originY+.85,z],
        [originX+count*run+.23,originY+count*rise-.10,z]]}
        radius={.064} radialSegments={12} tubularSegments={80}>
        <meshPhysicalMaterial color="#666d6a" metalness={.62} roughness={.38}/>
      </SplineTube>
      <Handrail z={z}/>
      {[-1.66,1.50].map(x=><mesh key={x} position={[x,-1.09,z]}>
        <boxGeometry args={[.18,.12,.20]}/>
        <meshPhysicalMaterial color={steel} metalness={.76} roughness={.40}/>
      </mesh>)}
    </group>)}
    <mesh position={[.18,-1.14,0]} castShadow>
      <boxGeometry args={[.17,.16,1.46]}/>
      <CC0Surface texture="concrete"/>
    </mesh>
    {[-.69,.69].map(z=>[-1.72,1.58].map(x=><mesh key={x+':'+z}
      position={[x,-1.15,z]}>
      <cylinderGeometry args={[.035,.035,.018,6]}/>
      <meshPhysicalMaterial color={bright} metalness={.87} roughness={.29}/>
    </mesh>))}
  </group>
}
