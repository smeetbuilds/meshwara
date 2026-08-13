import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
function MantaRay(){const ref=useRef<THREE.Group>(null);useFrame((s)=>{if(ref.current)ref.current.rotation.z=Math.sin(s.clock.elapsedTime*.55)*.045});return <group ref={ref} rotation={[.22,-.42,0]}>
  <mesh scale={[1.55,.18,1.05]}><sphereGeometry args={[1,72,42]} /><meshPhysicalMaterial color="#2f4247" roughness={.48} clearcoat={.16}/></mesh>
  {[-1,1].map(side=><mesh key={side} position={[side*1.28,-.02,.05]} rotation={[0,side*.12,side*.12]} scale={[1.0,.08,1.12]}><sphereGeometry args={[1,54,30]} /><meshPhysicalMaterial color="#364b50" roughness={.5}/></mesh>)}
  <mesh position={[0,0,-1.48]} rotation={[-Math.PI/2,0,0]} scale={[.2,.18,1]}><coneGeometry args={[.16,2.4,20]} /><meshPhysicalMaterial color="#34494e" roughness={.5}/></mesh>
  <mesh position={[.32,.18,.78]}><sphereGeometry args={[.035,18,12]} /><meshBasicMaterial color="#0a0d0e" /></mesh><mesh position={[-.32,.18,.78]}><sphereGeometry args={[.035,18,12]} /><meshBasicMaterial color="#0a0d0e" /></mesh>
</group>}
export default MantaRay
