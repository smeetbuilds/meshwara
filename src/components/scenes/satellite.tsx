import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
function OrbitalSatellite(){const ref=useRef<THREE.Group>(null);useFrame((s)=>{if(ref.current)ref.current.rotation.y=Math.sin(s.clock.elapsedTime*.18)*.24});return <group ref={ref} rotation={[.18,-.28,.08]}>
  <mesh><boxGeometry args={[.9,.72,.78]} /><meshPhysicalMaterial color="#aeb5b8" metalness={.9} roughness={.18} /></mesh>
  {[-1,1].map(side=><group key={side} position={[side*1.45,0,0]}><mesh><boxGeometry args={[1.8,.72,.055]} /><meshPhysicalMaterial color="#1d3e5c" metalness={.5} roughness={.22} clearcoat={.6} /></mesh>{Array.from({length:4},(_,i)=><mesh key={i} position={[-.67+i*.45,0,.032]}><boxGeometry args={[.012,.65,.012]} /><meshBasicMaterial color="#91b7d3" /></mesh>)}</group>)}
  <mesh position={[0,.64,0]}><cylinderGeometry args={[.22,.28,.44,36]} /><meshPhysicalMaterial color="#6e7679" metalness={.9} roughness={.2} /></mesh>
  <group position={[0,.96,0]} rotation={[0,0,.12]}><mesh rotation={[Math.PI/2,0,0]}><sphereGeometry args={[.55,48,24,0,Math.PI*2,0,Math.PI/2]} /><meshPhysicalMaterial color="#d1d6d8" metalness={.92} roughness={.2} side={2} /></mesh><mesh position={[0,.12,0]}><cylinderGeometry args={[.035,.035,.5,16]} /><meshPhysicalMaterial color="#a58b5e" metalness={.88} roughness={.22} /></mesh></group>
  <mesh position={[0,-.58,.2]}><sphereGeometry args={[.16,28,28]} /><meshBasicMaterial color="#7ce9dd" toneMapped={false} /></mesh>
</group>}
export default OrbitalSatellite
