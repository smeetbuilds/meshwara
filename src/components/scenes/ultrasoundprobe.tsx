import { useMemo } from 'react'
import * as THREE from 'three'
function UltrasoundProbe(){const cable=useMemo(()=>new THREE.CatmullRomCurve3([new THREE.Vector3(0,-.9,0),new THREE.Vector3(.55,-1.25,.1),new THREE.Vector3(1.3,-1.1,-.2),new THREE.Vector3(1.7,-.65,-.45)]),[]);return <group rotation={[0,-.4,-.15]}>
  <mesh position={[0,.15,0]}><capsuleGeometry args={[.28,1.15,12,30]}/><meshPhysicalMaterial color="#d8d9d6" roughness={.38}/></mesh>
  <mesh position={[0,1.0,0]} scale={[1.15,.5,.72]}><sphereGeometry args={[.42,36,24]}/><meshStandardMaterial color="#bfc3c2" roughness={.42}/></mesh>
  <mesh position={[0,1.25,0]}><boxGeometry args={[.62,.12,.42]}/><meshStandardMaterial color="#454c50" roughness={.4}/></mesh>
  <mesh><tubeGeometry args={[cable,56,.045,10,false]}/><meshStandardMaterial color="#5d6264" roughness={.54}/></mesh>
  <mesh position={[1.78,-.62,-.48]} rotation={[0,0,-.4]}><boxGeometry args={[.45,.7,.35]}/><meshStandardMaterial color="#c6c8c6" roughness={.4}/></mesh>
</group>} export default UltrasoundProbe
