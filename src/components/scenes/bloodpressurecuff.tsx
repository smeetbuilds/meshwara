import { RoundedBox } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
function BloodPressureCuff(){const hose=useMemo(()=>new THREE.CatmullRomCurve3([new THREE.Vector3(.6,.0,.25),new THREE.Vector3(1.2,-.2,.1),new THREE.Vector3(1.45,.15,-.25),new THREE.Vector3(1.15,.55,-.45)]),[]);return <group position={[0,-.45,0]} rotation={[0,-.34,0]}>
  <RoundedBox args={[1.65,.88,1.15]} radius={.16} smoothness={5}><meshStandardMaterial color="#e2e3df" roughness={.4}/></RoundedBox><mesh position={[-.18,.08,.59]}><planeGeometry args={[.82,.34]}/><meshBasicMaterial color="#466a6c"/></mesh><mesh position={[.48,-.18,.62]}><circleGeometry args={[.13,28]}/><meshBasicMaterial color="#6aa68d"/></mesh>
  <mesh><tubeGeometry args={[hose,48,.035,10,false]}/><meshStandardMaterial color="#52595c" roughness={.52}/></mesh>
  <mesh position={[1.18,.88,-.45]} rotation={[0,.25,.18]}><torusGeometry args={[.58,.22,20,52,Math.PI*1.55]}/><meshStandardMaterial color="#4f5960" roughness={.62}/></mesh>
</group>} export default BloodPressureCuff
