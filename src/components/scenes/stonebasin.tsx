import { useMemo } from 'react'
import * as THREE from 'three'
function StoneBasin(){const profile=useMemo(()=>[new THREE.Vector2(.42,-.52),new THREE.Vector2(.68,-.38),new THREE.Vector2(.82,-.05),new THREE.Vector2(.86,.18),new THREE.Vector2(.78,.34),new THREE.Vector2(.52,.4)],[]);return <group position={[0,-.52,0]} rotation={[0,-.34,0]}>
  <mesh><latheGeometry args={[profile,72]} /><meshPhysicalMaterial color="#aaa49a" roughness={.7} clearcoat={.04}/></mesh>
  <mesh position={[0,.31,0]} rotation={[-Math.PI/2,0,0]}><torusGeometry args={[.53,.11,24,72]} /><meshPhysicalMaterial color="#b5afa5" roughness={.68}/></mesh>
  <mesh position={[0,.3,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.42,72]} /><meshPhysicalMaterial color="#678f94" transmission={.32} transparent opacity={.72} roughness={.2}/></mesh>
  <mesh position={[0,-.88,0]}><cylinderGeometry args={[.5,.58,.32,56]} /><meshPhysicalMaterial color="#75716b" roughness={.74}/></mesh>
  <group position={[.95,.12,0]}><mesh><cylinderGeometry args={[.07,.08,.86,24]} /><meshPhysicalMaterial color="#7a7f80" metalness={.9} roughness={.22}/></mesh><mesh position={[-.24,.42,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.06,.06,.52,24]} /><meshPhysicalMaterial color="#7a7f80" metalness={.9} roughness={.22}/></mesh></group>
</group>}
export default StoneBasin
