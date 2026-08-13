import { RoundedBox } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
function SculpturalChaise(){const curve=useMemo(()=>new THREE.CatmullRomCurve3([new THREE.Vector3(-1.45,.1,0),new THREE.Vector3(-.75,.12,0),new THREE.Vector3(.05,.38,0),new THREE.Vector3(.55,.85,0),new THREE.Vector3(1.05,1.1,0)]),[]);return <group position={[0,-.85,0]} rotation={[0,-.32,0]}>
  <mesh scale={[1,1,.9]}><tubeGeometry args={[curve,72,.36,24,false]}/><meshPhysicalMaterial color="#a88375" roughness={.56} sheen={.45} sheenColor="#d9b4a7"/></mesh>
  <RoundedBox args={[2.45,.16,.92]} radius={.08} smoothness={4} position={[-.1,-.12,0]}><meshPhysicalMaterial color="#343536" metalness={.62} roughness={.28}/></RoundedBox>
  {[-.9,.8].map(x=><mesh key={x} position={[x,-.42,0]}><cylinderGeometry args={[.055,.065,.62,18]}/><meshPhysicalMaterial color="#37393a" metalness={.72} roughness={.25}/></mesh>)}
</group>} export default SculpturalChaise
