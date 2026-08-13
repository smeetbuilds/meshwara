import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
function ChainBracelet(){const ref=useRef<THREE.Group>(null);useFrame((s)=>{if(ref.current)ref.current.rotation.y=Math.sin(s.clock.elapsedTime*.22)*.18});return <group ref={ref} rotation={[.18,-.25,.1]}>{Array.from({length:16},(_,i)=>{const a=i/16*Math.PI*2;const r=1.0;return <mesh key={i} position={[Math.cos(a)*r,Math.sin(a)*r,Math.sin(a*2)*.08]} rotation={[Math.PI/2,a,i%2?Math.PI/2:0]}><torusGeometry args={[.19,.055,14,40]} /><meshPhysicalMaterial color={i%4===0?'#d7bc7b':'#b7bdc0'} metalness={1} roughness={.14} clearcoat={.45} /></mesh>})}<mesh><torusGeometry args={[1.0,.018,10,100]} /><meshPhysicalMaterial color="#303638" metalness={.75} roughness={.25} transparent opacity={.4} /></mesh></group>}
export default ChainBracelet
