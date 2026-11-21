import * as THREE from 'three'
import { CurvedBox } from '../geometry/CurvedBox'

/**
 * Standalone, object-specific headset study. Constructed from recognizable
 * mechanical subassemblies rather than the former stacked rounded prisms.
 * Original procedural geometry; no proprietary OEM parts or downloaded scans.
 */
const material = {
  ceramic: '#d9dde1',
  frame: '#aab0b5',
  seal: '#282a30',
  glass: '#111f2a',
  titanium: '#707983',
  fabric: '#51545a',
}
const overhead = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, .38, .23),
  new THREE.Vector3(0, .92, .02),
  new THREE.Vector3(0, 1.12, -.46),
  new THREE.Vector3(0, 1.01, -1.17),
  new THREE.Vector3(0, .63, -1.45),
])
const rearBand = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-1.35, .22, -.44),
  new THREE.Vector3(-1.39, .21, -1.13),
  new THREE.Vector3(-1.04, .24, -1.65),
  new THREE.Vector3(0, .18, -1.88),
  new THREE.Vector3(1.04, .24, -1.65),
  new THREE.Vector3(1.39, .21, -1.13),
  new THREE.Vector3(1.35, .22, -.44),
])

function TrackingCamera({ x, y, z = .41 }: { x: number; y: number; z?: number }) {
  return (
    <group position={[x, y, z]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.105, .105, .038, 48]} /><meshStandardMaterial color="#10161d" metalness={.62} roughness={.2}/></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, .024]}><circleGeometry args={[.069, 48]}/><meshPhysicalMaterial color="#133a52" metalness={.55} roughness={.085} clearcoat={1}/></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[.018, .022, .029]}><circleGeometry args={[.019, 24]}/><meshBasicMaterial color="#8cb3c6" transparent opacity={.72}/></mesh>
    </group>
  )
}

function SideAdjuster({ side }: { side: -1 | 1 }) {
  return (
    <group position={[side * 1.31, .10, -.20]}>
      <CurvedBox args={[.25, .33, .35]} radius={.09} smoothness={5}>
        <meshPhysicalMaterial color={material.titanium} metalness={.78} roughness={.28} clearcoat={.2}/>
      </CurvedBox>
      <mesh position={[side * .143, 0, -.12]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[.115, .115, .07, 40]}/>
        <meshPhysicalMaterial color="#31363d" metalness={.7} roughness={.34}/>
      </mesh>
      <mesh position={[side * .192, 0, -.12]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[.074, .074, .018, 36]}/>
        <meshPhysicalMaterial color="#abb2b7" metalness={.75} roughness={.2}/>
      </mesh>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[side * .203, -.055 + i * .028, -.12]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[.006, .014, .007]}/>
          <meshStandardMaterial color="#2b3037" roughness={.4}/>
        </mesh>
      ))}
    </group>
  )
}

export default function SpatialHeadset() {
  return (
    <group rotation={[.08, -.38, -.065]} position={[0, -.16, .20]} scale={.88}>
      {/* Lens housing, exterior shell and glass visor */}
      <CurvedBox args={[2.74, 1.09, .72]} radius={.28} smoothness={12} position={[0, .08, 0]}>
        <meshPhysicalMaterial color={material.ceramic} metalness={.28} roughness={.27} clearcoat={.65} clearcoatRoughness={.15}/>
      </CurvedBox>
      <CurvedBox args={[2.55, .94, .10]} radius={.27} smoothness={12} position={[0, .105, .366]}>
        <meshPhysicalMaterial color={material.glass} metalness={.48} roughness={.07} clearcoat={1} clearcoatRoughness={.04}/>
      </CurvedBox>
      <CurvedBox args={[2.40, .78, .018]} radius={.24} smoothness={10} position={[0, .15, .426]}>
        <meshPhysicalMaterial color="#173247" metalness={.68} roughness={.095} clearcoat={1} clearcoatRoughness={.03} transparent opacity={.44}/>
      </CurvedBox>
      {/* Camera pods, wide angle tracking and IR sensors */}
      <TrackingCamera x={-.99} y={.05} z={.456}/>
      <TrackingCamera x={.99} y={.05} z={.456}/>
      <TrackingCamera x={-.81} y={-.18} z={.461}/>
      <TrackingCamera x={.81} y={-.18} z={.461}/>
      {[-.4, .4].map(x => (
        <mesh key={x} position={[x, .49, .335]}>
          <sphereGeometry args={[.037, 20, 14]}/>
          <meshPhysicalMaterial color="#253e4c" roughness={.16} clearcoat={1}/>
        </mesh>
      ))}
      {/* Soft face interface. Realistic gasket seam and lens barrels on the rear */}
      <CurvedBox args={[2.59, .99, .22]} radius={.31} smoothness={10} position={[0, .09, -.39]}>
        <meshStandardMaterial color={material.seal} roughness={.87}/>
      </CurvedBox>
      <CurvedBox args={[2.25, .77, .08]} radius={.26} smoothness={9} position={[0, .07, -.514]}>
        <meshStandardMaterial color="#44464a" roughness={.99}/>
      </CurvedBox>
      {[-.58,.58].map(x => (
        <group key={x} position={[x,.085,-.61]}>
          <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.29,.075,18,60]}/><meshPhysicalMaterial color="#2c3139" metalness={.35} roughness={.22}/></mesh>
          <mesh rotation={[Math.PI/2,0,0]} position={[0,0,-.017]}><circleGeometry args={[.238,48]}/><meshPhysicalMaterial color="#162a39" metalness={.18} roughness={.08} clearcoat={1}/></mesh>
        </group>
      ))}
      {/* Bridge vent / underside seam / adjustable side joints */}
      {Array.from({length:12}, (_,i) => (
        <mesh key={i} position={[-.88+i*.16,-.439,.12]} rotation={[0,0,.04]}>
          <boxGeometry args={[.085,.013,.11]}/>
          <meshStandardMaterial color="#747b82" metalness={.4} roughness={.55}/>
        </mesh>
      ))}
      <SideAdjuster side={-1}/>
      <SideAdjuster side={1}/>
      {/* The three fabric supports are fully three-dimensional curved tubes. */}
      <mesh><tubeGeometry args={[rearBand,80,.102,12,false]}/><meshStandardMaterial color={material.fabric} roughness={.95}/></mesh>
      <mesh><tubeGeometry args={[overhead,60,.105,12,false]}/><meshStandardMaterial color="#6e7074" roughness={.93}/></mesh>
      <CurvedBox args={[.39,.16,.34]} radius={.06} smoothness={5} position={[0,1.08,-.63]}>
        <meshStandardMaterial color="#30333a" roughness={.86}/>
      </CurvedBox>
      {[-1,1].map(side => (
        <group key={side}>
          <CurvedBox args={[.79,.17,.14]} radius={.06} smoothness={5} position={[side*1.23,.21,-.68]} rotation={[0,side*.29,0]}>
            <meshStandardMaterial color="#51575e" roughness={.88}/>
          </CurvedBox>
          {Array.from({length:5},(_,i)=>(
            <mesh key={i} position={[side*1.25,.212,-.69+i*.13]} rotation={[0,side*.29,0]}>
              <boxGeometry args={[.11,.004,.012]}/><meshStandardMaterial color="#878d92" roughness={.8}/>
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}
