import { CurvedBox } from '../geometry/CurvedBox'
import { SplineTube } from '../geometry/GeometryV2'

/**
 * Double-acting, tie-rod pneumatic cylinder study with four precision rods,
 * ISO-style end blocks, rod gland, clevis, air ports and machined fasteners.
 * No supplier-specific dimensions are claimed.
 */
const aluminum='#a1a9a8', steel='#d0d5d2', graphite='#525e62', seals='#222c2f'
const fastenerPositions=[[-.33,-.33],[-.33,.33],[.33,-.33],[.33,.33]] as const
const boltHeads=[-.97,.97] as const
function AxialCylinder({x,length,radius,color,roughness=.28,metalness=.89}:{
  x:number;length:number;radius:number;color:string;roughness?:number;metalness?:number
}){
  return <mesh position={[x,0,0]} rotation={[0,0,Math.PI/2]} castShadow receiveShadow>
    <cylinderGeometry args={[radius,radius,length,48]}/>
    <meshPhysicalMaterial color={color} roughness={roughness} metalness={metalness}/>
  </mesh>
}
export default function PneumaticCylinder() {
  return <group rotation={[.06,-.41,.02]} scale={1.05}>
    <AxialCylinder x={0} length={1.64} radius={.395} color={aluminum} roughness={.24}/>
    <AxialCylinder x={0} length={1.55} radius={.401} color="#c4c9c7" roughness={.28}/>
    {[-.79,.79].map(x=><AxialCylinder key={x} x={x} length={.08} radius={.405}
      color="#536067" roughness={.3} metalness={.73}/>)}
    {[-.97,.97].map(x=><CurvedBox key={x}
      args={[.28,.94,.94]} radius={.065} smoothness={7}
      position={[x,0,0]} castShadow receiveShadow>
      <meshPhysicalMaterial color={graphite} metalness={.73} roughness={.36}/>
    </CurvedBox>)}
    {fastenerPositions.map(([y,z],i)=><group key={i}>
      <mesh position={[0,y,z]} rotation={[0,0,Math.PI/2]} castShadow>
        <cylinderGeometry args={[.055,.055,2.05,16]}/>
        <meshPhysicalMaterial color={steel} metalness={.94} roughness={.23}/>
      </mesh>
      {boltHeads.map(x=><group key={x} position={[x*1.165,y,z]} rotation={[0,0,Math.PI/2]}>
        <mesh><cylinderGeometry args={[.095,.095,.052,6]}/>
          <meshPhysicalMaterial color="#aab4b2" metalness={.83} roughness={.25}/></mesh>
        <mesh position={[0,.030,0]}><cylinderGeometry args={[.040,.040,.009,6]}/>
          <meshStandardMaterial color="#303639" metalness={.7} roughness={.35}/></mesh>
      </group>)}
    </group>)}
    <AxialCylinder x={1.20} length={.26} radius={.28} color="#7b8989"/>
    <AxialCylinder x={1.40} length={.10} radius={.22} color={seals} roughness={.48} metalness={.22}/>
    <AxialCylinder x={1.91} length={1.08} radius={.115} color="#e6e8e3" roughness={.095}/>
    <AxialCylinder x={2.48} length={.16} radius={.14} color="#b9c3c0" roughness={.22}/>
    <CurvedBox args={[.64,.35,.27]} radius={.07} smoothness={7}
      position={[2.78,0,0]} castShadow>
      <meshPhysicalMaterial color="#737f81" metalness={.83} roughness={.32}/>
    </CurvedBox>
    {[-.13,.13].map(z=><group key={z}>
      <CurvedBox args={[.61,.32,.065]} radius={.09} smoothness={5}
        position={[2.83,0,z]} castShadow>
        <meshPhysicalMaterial color="#879496" metalness={.81} roughness={.29}/>
      </CurvedBox>
    </group>)}
    <mesh position={[2.92,0,0]} rotation={[Math.PI/2,0,0]}>
      <cylinderGeometry args={[.088,.088,.37,32]}/>
      <meshPhysicalMaterial color={seals} metalness={.34} roughness={.4}/>
    </mesh>
    {[-.98,.98].map(x=><group key={x} position={[x,.49,-.12]}>
      <mesh rotation={[0,0,Math.PI/2]}>
        <cylinderGeometry args={[.105,.105,.18,36]}/>
        <meshPhysicalMaterial color="#c0c8c8" metalness={.91} roughness={.22}/>
      </mesh>
      <mesh position={[0,.076,0]} rotation={[Math.PI/2,0,0]}>
        <torusGeometry args={[.065,.012,8,32]}/>
        <meshStandardMaterial color="#252d31" roughness={.65}/>
      </mesh>
      <mesh position={[0,.085,0]} rotation={[-Math.PI/2,0,0]}>
        <circleGeometry args={[.050,32]}/>
        <meshStandardMaterial color="#2d444b" roughness={.36}/>
      </mesh>
    </group>)}
    <SplineTube points={[[-1.18,.46,-.11],[-1.37,.60,-.20],[-1.49,.50,-.32]]}
      radius={.038} tubularSegments={28} radialSegments={8}>
      <meshStandardMaterial color={seals} roughness={.94}/>
    </SplineTube>
  </group>
}
