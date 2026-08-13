import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function LabCentrifuge() {
  const rotor = useRef<THREE.Group>(null)
  useFrame((_,delta)=>{ if(rotor.current) rotor.current.rotation.y += delta * 1.1 })
  const slots=useMemo(()=>Array.from({length:12},(_,i)=>{const a=i/12*Math.PI*2; return {a,x:Math.cos(a)*0.58,z:Math.sin(a)*0.58}}),[])
  return <group position={[0,-0.62,0]} rotation={[0.04,-0.42,0]}>
    <RoundedBox args={[2.2,1.35,1.75]} radius={0.25} smoothness={8} position={[0,-0.38,0]}><meshPhysicalMaterial color="#d9dddc" roughness={0.34} clearcoat={0.35} /></RoundedBox>
    <RoundedBox args={[1.55,0.18,0.64]} radius={0.08} smoothness={5} position={[0,-0.22,0.91]}><meshPhysicalMaterial color="#252b2d" metalness={0.42} roughness={0.3} /></RoundedBox>
    <mesh position={[0.52,-0.21,1.03]}><planeGeometry args={[0.52,0.19]} /><meshBasicMaterial color="#7ce6d8" toneMapped={false} /></mesh>
    <group position={[0,0.3,0]} ref={rotor}>
      <mesh><cylinderGeometry args={[0.72,0.68,0.18,64]} /><meshPhysicalMaterial color="#363c3f" metalness={0.82} roughness={0.22} /></mesh>
      {slots.map(({a,x,z},i)=><group key={i} position={[x,0.15,z]} rotation={[0,-a,0.28]}><mesh><cylinderGeometry args={[0.07,0.055,0.48,20]} /><meshPhysicalMaterial color={i%2?'#8fb2c7':'#ca9b81'} roughness={0.26} clearcoat={0.35} /></mesh><mesh position={[0,0.26,0]}><cylinderGeometry args={[0.072,0.072,0.055,20]} /><meshPhysicalMaterial color="#e8eded" roughness={0.2} /></mesh></group>)}
    </group>
    <mesh position={[0,0.57,0]}><cylinderGeometry args={[0.88,0.88,0.08,72]} /><MeshTransmissionMaterial transmission={0.93} thickness={0.22} roughness={0.08} ior={1.47} chromaticAberration={0.008} /></mesh>
    <mesh position={[0,0.61,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[0.88,0.055,16,80]} /><meshPhysicalMaterial color="#7e8587" metalness={0.72} roughness={0.25} /></mesh>
  </group>
}
export default LabCentrifuge
