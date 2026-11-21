import * as THREE from 'three'
import { CC0Surface } from '../geometry/CC0Surface'
import { SplineTube } from '../geometry/GeometryV2'

/**
 * Glazed architectural window bay with a genuinely open masonry aperture,
 * insulated glazing, aluminum mullions, pressure plates, weather seals,
 * anchors, timber sill and identifiable operable window handle.
 *
 * The plaster, concrete and oak maps come from Meshvara's SHA-verified local
 * CC0 Poly Haven material ledger and are bundled with the portable source.
 */
const metal='#394549', trim='#a4afb0', gasket='#212b2d', glass='#b2d9df'
const mullions=[-1.12,-.56,0,.56,1.12] as const
const glassWidths=[-0.84,-.28,0.28,0.84] as const
const fixings=[-1.41,1.41] as const
function Wall({position,size,material='plaster'}:{
  position:[number,number,number]
  size:[number,number,number]
  material?:'plaster'|'concrete'|'oak'
}) {
  return <mesh position={position} castShadow receiveShadow>
    <boxGeometry args={size}/>
    {material === 'plaster' ? <CC0Surface texture="plaster"/> : material === 'concrete' ? <CC0Surface texture="concrete"/> : <CC0Surface texture="oak"/>}
  </mesh>
}
function Mullion({x}:{x:number}) {
  return <group position={[x,0,.11]}>
    <mesh castShadow receiveShadow>
      <boxGeometry args={[.071,2.50,.115]}/>
      <meshPhysicalMaterial color={metal} metalness={.76} roughness={.34} clearcoat={.15}/>
    </mesh>
    <mesh position={[0,0,.069]}>
      <boxGeometry args={[.043,2.50,.012]}/>
      <meshStandardMaterial color={trim} metalness={.78} roughness={.32}/>
    </mesh>
    <mesh position={[.046,0,.043]}>
      <boxGeometry args={[.009,2.46,.020]}/>
      <meshStandardMaterial color={gasket} roughness={.93}/>
    </mesh>
  </group>
}
export default function GlazedWindowBay() {
  return <group rotation={[0,-.34,0]} scale={.85} position={[0,-.02,0]}>
    {/* Real opening: no opaque back panel behind the glazing. */}
    <Wall position={[-1.85,0,-.09]} size={[.75,3.43,.34]}/>
    <Wall position={[1.85,0,-.09]} size={[.75,3.43,.34]}/>
    <Wall position={[0,1.43,-.09]} size={[3.02,.57,.34]}/>
    <Wall position={[0,-1.50,-.09]} size={[3.02,.46,.34]} material="concrete"/>
    <Wall position={[0,-1.77,.35]} size={[4.4,.15,1.38]} material="concrete"/>
    {/* The full-depth profile reads as a recess instead of painted-on glass. */}
    {[-1.30,1.30].map(x=><mesh key={x} position={[x,0,-.03]} castShadow>
      <boxGeometry args={[.10,2.72,.39]}/>
      <meshPhysicalMaterial color={metal} metalness={.71} roughness={.36}/>
    </mesh>)}
    {[-1.31,1.31].map(y=><mesh key={y} position={[0,y,-.03]} castShadow>
      <boxGeometry args={[2.68,.09,.38]}/>
      <meshPhysicalMaterial color={metal} metalness={.70} roughness={.34}/>
    </mesh>)}
    <mesh position={[0,-1.30,.22]} castShadow>
      <boxGeometry args={[2.83,.085,.64]}/>
      <CC0Surface texture="oak"/>
    </mesh>
    <mesh position={[0,-1.33,.58]}>
      <boxGeometry args={[2.89,.034,.09]}/>
      <meshStandardMaterial color="#87745d" roughness={.60}/>
    </mesh>
    {/* Four panes separated by actual extruded pressure-plate mullions. */}
    {glassWidths.map(x=><group key={x}>
      <mesh position={[x,0,.102]} receiveShadow>
        <boxGeometry args={[.523,2.45,.018]}/>
        <meshPhysicalMaterial color={glass} metalness={0} roughness={.072}
          transmission={.77} ior={1.52} thickness={.018}
          transparent opacity={.24} depthWrite={false} side={THREE.DoubleSide}
          clearcoat={.91} clearcoatRoughness={.055}/>
      </mesh>
      <mesh position={[x,0,-.014]}>
        <boxGeometry args={[.520,2.43,.011]}/>
        <meshPhysicalMaterial color="#a3ccd3" roughness={.09} metalness={0}
          transparent opacity={.16} depthWrite={false} side={THREE.DoubleSide}/>
      </mesh>
      <mesh position={[x,1.18,.161]}>
        <boxGeometry args={[.48,.009,.008]}/>
        <meshStandardMaterial color="#878f90" metalness={.73} roughness={.34}/>
      </mesh>
    </group>)}
    {mullions.map(x=><Mullion key={x} x={x}/>)}
    {[-1.20,1.20].map(y=><group key={y}>
      <mesh position={[0,y,.11]} castShadow>
        <boxGeometry args={[2.56,.068,.115]}/>
        <meshPhysicalMaterial color={metal} metalness={.79} roughness={.32}/>
      </mesh>
      <mesh position={[0,y,.179]}>
        <boxGeometry args={[2.52,.039,.012]}/>
        <meshStandardMaterial color={trim} metalness={.76} roughness={.31}/>
      </mesh>
    </group>)}
    {/* Distinct operable light: a gasket, vertical stile and an actual grip. */}
    <mesh position={[.56,-.18,.215]}>
      <boxGeometry args={[.018,1.86,.016]}/>
      <meshStandardMaterial color={gasket} roughness={.89}/>
    </mesh>
    <mesh position={[.49,-.28,.25]}>
      <boxGeometry args={[.09,.32,.058]}/>
      <meshPhysicalMaterial color={trim} metalness={.83} roughness={.27}/>
    </mesh>
    <SplineTube points={[[.49,-.23,.29],[.39,-.23,.39],[.39,-.48,.39]]}
      radius={.022} radialSegments={8} tubularSegments={22}>
      <meshPhysicalMaterial color="#d0d5d1" metalness={.85} roughness={.29}/>
    </SplineTube>
    {fixings.map(x=>[-1,1].map(y=><group key={x+':'+y}>
      <mesh position={[x,y*.98,.17]}>
        <cylinderGeometry args={[.035,.035,.012,6]}/>
        <meshStandardMaterial color={trim} metalness={.81} roughness={.36}/>
      </mesh>
    </group>))}
    {/* Shadow-return details ground the assembly to the masonry. */}
    <Wall position={[-1.48,0,.13]} size={[.15,3.13,.23]} material="concrete"/>
    <Wall position={[1.48,0,.13]} size={[.15,3.13,.23]} material="concrete"/>
    <mesh position={[0,1.63,.22]}>
      <boxGeometry args={[3.40,.085,.48]}/>
      <CC0Surface texture="concrete"/>
    </mesh>
  </group>
}
