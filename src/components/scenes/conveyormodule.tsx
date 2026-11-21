import { CurvedBox } from '../geometry/CurvedBox'
import { SplineTube } from '../geometry/GeometryV2'

/**
 * Powered roller conveyor segment with a rigid welded frame, sixteen rollers,
 * visible shaft ends, legs, cross-bracing, drive box and optical presence sensor.
 * Engineering illustration rather than a certified machine design.
 */
const steel='#798388', roller='#b1b7b6', iron='#323a3f', belt='#1c262b'
const stations=Array.from({length:16},(_,i)=>-1.64+i*(3.28/15))
function Roller({x,i}:{x:number;i:number}){
  return <group position={[x,.21,0]}>
    <mesh rotation={[Math.PI/2,0,0]} castShadow receiveShadow>
      <cylinderGeometry args={[.105,.105,1.17,24]}/>
      <meshPhysicalMaterial color={i%3===0?'#b9bcba':roller} metalness={.84} roughness={.32}/>
    </mesh>
    {[-.64,.64].map(z=><group key={z} position={[0,0,z]}>
      <mesh rotation={[Math.PI/2,0,0]}>
        <cylinderGeometry args={[.047,.047,.12,20]}/>
        <meshPhysicalMaterial color="#d0d4d1" metalness={.91} roughness={.22}/>
      </mesh>
      <mesh position={[0,0,z>0?.065:-.065]} rotation={[Math.PI/2,0,0]}>
        <torusGeometry args={[.066,.015,8,24]}/>
        <meshPhysicalMaterial color="#404b50" metalness={.72} roughness={.32}/>
      </mesh>
    </group>)}
  </group>
}
export default function ConveyorModule(){
  return <group rotation={[.06,-.38,0]} position={[0,-.20,0]} scale={.96}>
    {[-.71,.71].map(z=><group key={z}>
      <CurvedBox args={[3.85,.34,.18]} radius={.035} smoothness={5} position={[0,.16,z]} castShadow>
        <meshPhysicalMaterial color={steel} metalness={.77} roughness={.39}/>
      </CurvedBox>
      <mesh position={[0,.30,z]}>
        <boxGeometry args={[3.82,.055,.10]}/>
        <meshPhysicalMaterial color="#c1c7c4" metalness={.84} roughness={.32}/>
      </mesh>
      {[-1.58,0,1.58].map(x=><group key={x}>
        <CurvedBox args={[.12,1.37,.12]} radius={.018} smoothness={4}
          position={[x,-.58,z]} castShadow>
          <meshPhysicalMaterial color={iron} metalness={.59} roughness={.55}/>
        </CurvedBox>
        <CurvedBox args={[.28,.07,.23]} radius={.014} smoothness={3}
          position={[x,-1.26,z]} castShadow>
          <meshPhysicalMaterial color="#606c70" metalness={.75} roughness={.37}/>
        </CurvedBox>
        {[ -.075,.075].map(y=><mesh key={y} position={[x,-1.24+y,z]}>
          <cylinderGeometry args={[.019,.019,.026,12]}/>
          <meshPhysicalMaterial color="#bec3c3" metalness={.87} roughness={.23}/>
        </mesh>)}
      </group>)}
    </group>)}
    {stations.map((x,i)=><Roller key={i} x={x} i={i}/>)}
    {[-1.55,1.55].map(x=><CurvedBox key={x}
      args={[.10,.14,1.38]} radius={.02} smoothness={4}
      position={[x,-.40,0]}>
      <meshStandardMaterial color={iron} metalness={.64} roughness={.45}/>
    </CurvedBox>)}
    {[-.78,.78].map(x=><mesh key={x} position={[x,-.84,0]}
      rotation={[0,0,x<0?.42:-.42]}>
      <boxGeometry args={[.075,1.04,.07]}/>
      <meshPhysicalMaterial color="#526267" metalness={.59} roughness={.54}/>
    </mesh>)}
    <CurvedBox args={[.60,.45,.42]} radius={.05} smoothness={6}
      position={[1.47,-.42,-1.04]} castShadow>
      <meshPhysicalMaterial color="#5a6469" metalness={.78} roughness={.39}/>
    </CurvedBox>
    <mesh position={[1.36,-.40,-1.38]} rotation={[0,0,Math.PI/2]}>
      <cylinderGeometry args={[.22,.22,.40,32]}/>
      <meshPhysicalMaterial color="#878e92" metalness={.77} roughness={.34}/>
    </mesh>
    {Array.from({length:11},(_,i)=><mesh key={i}
      position={[1.30,-.60+i*.040,-1.39]}>
      <boxGeometry args={[.33,.010,.010]}/>
      <meshStandardMaterial color="#2d373c" metalness={.4} roughness={.6}/>
    </mesh>)}
    <CurvedBox args={[.30,.42,.28]} radius={.045} smoothness={4}
      position={[1.30,.52,.86]}>
      <meshPhysicalMaterial color="#d3aa39" metalness={.12} roughness={.49}/>
    </CurvedBox>
    <mesh position={[1.30,.55,1.016]}>
      <circleGeometry args={[.060,28]}/>
      <meshPhysicalMaterial color="#19313d" metalness={.35} roughness={.20} clearcoat={.87}/>
    </mesh>
    <SplineTube points={[[1.26,.51,.90],[1.08,.25,1.04],[.80,-.18,1.02],[.65,-.57,.88]]}
      radius={.028} tubularSegments={34} radialSegments={7}>
      <meshStandardMaterial color={belt} roughness={.93}/>
    </SplineTube>
    {[-.70,.70].map(z=><CurvedBox key={z}
      args={[.42,.065,.22]} radius={.016} smoothness={4}
      position={[-1.53,.32,z]}>
      <meshPhysicalMaterial color="#e3b647" metalness={.1} roughness={.56}/>
    </CurvedBox>)}
  </group>
}
