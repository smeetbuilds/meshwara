import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function Monolith(){
  const ref=useRef<THREE.Group>(null)
  useFrame((state)=>{if(ref.current) ref.current.rotation.y=Math.sin(state.clock.elapsedTime*.18)*.22})
  return <group ref={ref} rotation={[.08,.32,-.04]}>
    <CurvedBox args={[1.35,2.65,.68]} radius={.16} smoothness={8}><meshPhysicalMaterial color="#08090a" metalness={.82} roughness={.2} clearcoat={1}/></CurvedBox>
    <CurvedBox args={[.045,2.22,.72]} radius={.02} smoothness={3} position={[.14,0,.03]}><meshBasicMaterial color="#a98fff" toneMapped={false}/></CurvedBox>
    <CurvedBox args={[.62,.12,.78]} radius={.04} smoothness={4} position={[-.27,.78,.02]}><meshPhysicalMaterial color="#24272b" metalness={1} roughness={.18}/></CurvedBox>
    {[-.72,-.36,0,.36,.72].map((y,i)=><mesh key={y} position={[-.68,y,.16]} rotation={[0,0,.03*i]}><boxGeometry args={[.025,.18,.22]}/><meshPhysicalMaterial color="#363a3e" metalness={.88} roughness={.18}/></mesh>)}
    {[-.42,.42].map(x=><mesh key={x} position={[x,-1.37,.1]}><cylinderGeometry args={[.08,.08,.06,28]}/><meshPhysicalMaterial color="#1f2225" metalness={.92} roughness={.16}/></mesh>)}
    <CurvedBox args={[1.62,.08,.92]} radius={.035} smoothness={4} position={[0,-1.4,-.02]}><meshPhysicalMaterial color="#151719" metalness={.74} roughness={.26}/></CurvedBox>
  </group>
}
export default Monolith
