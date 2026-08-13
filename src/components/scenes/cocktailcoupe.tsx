import { useMemo } from 'react'
import * as THREE from 'three'
function CocktailCoupe(){const glass=useMemo(()=>[new THREE.Vector2(.04,-.85),new THREE.Vector2(.06,-.2),new THREE.Vector2(.38,.02),new THREE.Vector2(.75,.28),new THREE.Vector2(.9,.62)],[]);return <group rotation={[.04,-.32,0]}>
  <mesh><latheGeometry args={[glass,72]} /><meshPhysicalMaterial color="#dce8e7" transmission={.92} transparent opacity={.75} roughness={.06} thickness={.08} ior={1.47} side={THREE.DoubleSide}/></mesh>
  <mesh position={[0,.42,0]}><cylinderGeometry args={[.72,.72,.18,72]} /><meshPhysicalMaterial color="#d9a879" transmission={.25} transparent opacity={.82} roughness={.18}/></mesh>
  <mesh position={[0,-.9,0]}><cylinderGeometry args={[.48,.56,.055,64]} /><meshPhysicalMaterial color="#dce8e7" transmission={.9} transparent opacity={.7} roughness={.07}/></mesh>
  <mesh position={[.33,.62,.15]} rotation={[.4,.2,.2]} scale={[.3,.08,.3]}><sphereGeometry args={[1,28,18]} /><meshPhysicalMaterial color="#d4b04e" roughness={.45}/></mesh>
</group>}
export default CocktailCoupe
