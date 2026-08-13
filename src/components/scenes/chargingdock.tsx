import { RoundedBox, MeshTransmissionMaterial } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
function ChargingDock(){const curve=useMemo(()=>new THREE.CatmullRomCurve3([new THREE.Vector3(.55,-.1,.15),new THREE.Vector3(1.1,-.25,.1),new THREE.Vector3(1.45,-.55,-.25),new THREE.Vector3(1.8,-.72,-.55)]),[]);return <group position={[0,-.6,0]} rotation={[0,-.3,0]}>
  <mesh><cylinderGeometry args={[.88,1.02,.25,64]}/><meshPhysicalMaterial color="#77797a" metalness={.82} roughness={.2}/></mesh>
  <group position={[0,.5,0]} rotation={[.2,0,0]}><mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.62,.62,.12,64]}/><meshPhysicalMaterial color="#f0ece5" roughness={.28}/></mesh><mesh position={[0,0,.08]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.48,.48,.02,64]}/><MeshTransmissionMaterial transmission={.45} thickness={.12} roughness={.12}/></mesh></group>
  <mesh><tubeGeometry args={[curve,48,.035,10,false]}/><meshStandardMaterial color="#35383a" roughness={.52}/></mesh>
</group>} export default ChargingDock
