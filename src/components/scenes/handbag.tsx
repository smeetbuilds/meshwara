import { RoundedBox } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
function SculpturalHandbag(){const handle=useMemo(()=>new THREE.CatmullRomCurve3([new THREE.Vector3(-.62,.62,0),new THREE.Vector3(-.42,1.28,0),new THREE.Vector3(.42,1.28,0),new THREE.Vector3(.62,.62,0)]),[]);return <group position={[0,-.55,0]} rotation={[0,-.32,0]}>
  <RoundedBox args={[1.72,1.25,.7]} radius={.22} smoothness={9} position={[0,-.06,0]}><meshPhysicalMaterial color="#553a30" roughness={.38} clearcoat={.18} sheen={.32} sheenRoughness={.55} /></RoundedBox>
  <mesh><tubeGeometry args={[handle,64,.055,18,false]} /><meshPhysicalMaterial color="#6d4a3d" roughness={.34} clearcoat={.2} /></mesh>
  <RoundedBox args={[.92,.1,.08]} radius={.035} smoothness={4} position={[0,.3,.37]}><meshPhysicalMaterial color="#c4a061" metalness={.92} roughness={.18} /></RoundedBox>
  <mesh position={[0,.3,.43]}><cylinderGeometry args={[.09,.09,.04,28]} /><meshPhysicalMaterial color="#d4b06a" metalness={1} roughness={.14} /></mesh>
  <mesh position={[0,-.52,.37]}><boxGeometry args={[1.22,.025,.025]} /><meshPhysicalMaterial color="#2e211d" roughness={.5} /></mesh>
</group>}
export default SculpturalHandbag
