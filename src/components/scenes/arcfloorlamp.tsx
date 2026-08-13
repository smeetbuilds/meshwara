import { useMemo } from 'react'
import * as THREE from 'three'
function ArcFloorLamp(){const arc=useMemo(()=>new THREE.CatmullRomCurve3([new THREE.Vector3(-.72,-.8,0),new THREE.Vector3(-.65,.55,0),new THREE.Vector3(-.28,1.5,0),new THREE.Vector3(.72,1.85,0),new THREE.Vector3(1.1,1.42,0)]),[]);return <group position={[0,-.55,0]} rotation={[0,-.38,0]}>
  <mesh><tubeGeometry args={[arc,96,.045,16,false]} /><meshPhysicalMaterial color="#34393b" metalness={.92} roughness={.2}/></mesh>
  <mesh position={[-.72,-.92,0]}><cylinderGeometry args={[.6,.72,.18,56]} /><meshPhysicalMaterial color="#4b4f50" metalness={.55} roughness={.32}/></mesh>
  <mesh position={[1.12,1.25,0]} rotation={[0,0,.28]}><coneGeometry args={[.48,.72,56,1,true]} /><meshPhysicalMaterial color="#c7b28c" roughness={.42} side={THREE.DoubleSide}/></mesh>
  <pointLight position={[1.05,1.05,.04]} intensity={2.4} distance={4} color="#ffd9a1" />
  <mesh position={[1.08,1.05,0]}><sphereGeometry args={[.12,24,16]} /><meshBasicMaterial color="#ffd79c" toneMapped={false}/></mesh>
</group>}
export default ArcFloorLamp
