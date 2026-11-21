import * as THREE from 'three'
import { CurvedBox } from '../geometry/CurvedBox'
import { ExtrudedProfile, SplineTube } from '../geometry/GeometryV2'

/**
 * Full-tang forged chef's knife with individually profiled blade, swedge,
 * tapered cutting bevel, pinned handle scales, bolster and visible heel.
 * Designed for source portability; no external branded geometry.
 */
const blade=[[ -1.00,-.24],[ -.98,.42],[-.88,.57],
 [ .25,.61],[1.10,.59],[1.45,.48],[1.69,.21],
 [1.81,-.13],[1.65,-.28],[1.35,-.37],[.80,-.45],[.12,-.50],[-.78,-.48]] as [number,number][]
const bevel=[[-.91,-.39],[.11,-.46],[.80,-.42],[1.34,-.35],[1.64,-.26],
  [1.76,-.16],[1.50,-.23],[1.10,-.30],[.72,-.35],[.04,-.35],[-.90,-.28]] as [number,number][]
const spine=[[-.85,.58,0],[.25,.60,0],[1.10,.58,0],[1.47,.46,0],[1.67,.19,0]] as [number,number,number][]
const rivets=[-1.94,-1.61,-1.28]
function TextureMark({x}:{x:number}) {
  return <mesh position={[x,.09,.147]} rotation={[Math.PI/2,0,0]}>
    <cylinderGeometry args={[.033,.033,.018,32]}/>
    <meshPhysicalMaterial color="#aaa9a4" metalness={.95} roughness={.21}/>
  </mesh>
}
export default function ChefKnife() {
  return <group rotation={[.17,-.35,-.16]} scale={.94}>
    <ExtrudedProfile points={blade} depth={.052} bevelSize={.008} bevelThickness={.009}
      bevelSegments={3} castShadow receiveShadow>
      <meshPhysicalMaterial color="#c7cdd0" metalness={1} roughness={.27} clearcoat={.19} clearcoatRoughness={.28}/>
    </ExtrudedProfile>
    <ExtrudedProfile points={bevel} position={[0,0,.039]} depth={.009} bevelSize={.002} bevelThickness={.002}
      bevelSegments={2}>
      <meshPhysicalMaterial color="#e6e8e8" metalness={.98} roughness={.13}/>
    </ExtrudedProfile>
    <ExtrudedProfile points={bevel} position={[0,0,-.039]} depth={.009} bevelSize={.002} bevelThickness={.002}
      bevelSegments={2}>
      <meshPhysicalMaterial color="#e6e8e8" metalness={.98} roughness={.13}/>
    </ExtrudedProfile>
    <SplineTube points={spine} radius={.012} tubularSegments={72} radialSegments={6}>
      <meshStandardMaterial color="#808a90" metalness={.95} roughness={.31}/>
    </SplineTube>
    <CurvedBox args={[1.32,.32,.17]} radius={.09} smoothness={8}
      position={[-1.74,.06,0]} rotation={[0,0,-.038]} castShadow>
      <meshPhysicalMaterial color="#26211f" metalness={.02} roughness={.59} clearcoat={.16}
        clearcoatRoughness={.63}/>
    </CurvedBox>
    {[-1,1].map(side=><CurvedBox key={side}
      args={[1.24,.288,.058]} radius={.068} smoothness={8}
      position={[-1.76,.06,side*.09]} rotation={[0,0,-.035]} castShadow>
      <meshPhysicalMaterial color={side>0?'#47372b':'#392d29'} metalness={.03} roughness={.63}
        clearcoat={.12}/>
    </CurvedBox>)}
    <CurvedBox args={[.12,.46,.21]} radius={.025} smoothness={5} position={[-1.06,.07,0]} castShadow>
      <meshPhysicalMaterial color="#a6aaac" metalness={.94} roughness={.25}/>
    </CurvedBox>
    {rivets.map(x=><group key={x}>
      <TextureMark x={x}/>
      <mesh position={[x,.09,-.147]} rotation={[Math.PI/2,0,0]}>
        <cylinderGeometry args={[.033,.033,.018,24]}/>
        <meshPhysicalMaterial color="#aaa9a4" metalness={.95} roughness={.21}/>
      </mesh>
    </group>)}
    <mesh position={[-2.23,.07,0]} rotation={[0,0,Math.PI/2]}>
      <torusGeometry args={[.045,.013,8,24]}/>
      <meshStandardMaterial color="#b4b2ad" metalness={.88} roughness={.3}/>
    </mesh>
    {Array.from({length:16},(_,i)=><mesh key={i}
      position={[-.83+i*.11,.41+(i%3)*.006,.044]} rotation={[0,0,.025]}>
      <boxGeometry args={[.044,.004,.003]}/>
      <meshStandardMaterial color="#9ca5a9" metalness={.85} roughness={.45}/>
    </mesh>)}
  </group>
}
