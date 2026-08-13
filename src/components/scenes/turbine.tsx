import { Instance, Instances } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function TurbineStage(){const rotor=useRef<THREE.Group>(null);useFrame((_,d)=>{if(rotor.current)rotor.current.rotation.x+=d*.34});const blades=useMemo(()=>Array.from({length:36},(_,i)=>{const a=i/36*Math.PI*2;return{position:[0,Math.cos(a)*.82,Math.sin(a)*.82] as [number,number,number],rotation:[a,0,-.42] as [number,number,number]}}),[]);return <group rotation={[0,-.55,.08]} scale={1.02}>
  <mesh rotation={[0,0,Math.PI/2]}><torusGeometry args={[1.22,.12,28,120]} /><meshPhysicalMaterial color="#777e82" metalness={.95} roughness={.18} /></mesh>
  <group ref={rotor}>
    <mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.38,.38,.54,64]} /><meshPhysicalMaterial color="#b9bec0" metalness={1} roughness={.15} /></mesh>
    <Instances limit={36}><boxGeometry args={[.42,.09,.16]} /><meshPhysicalMaterial color="#8f979b" metalness={.96} roughness={.2} />{blades.map((b,i)=><Instance key={i} {...b}/>)}</Instances>
  </group>
  <mesh position={[-.42,0,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.16,.16,.9,40]} /><meshPhysicalMaterial color="#33393c" metalness={.92} roughness={.2} /></mesh>
  <mesh position={[.54,0,0]} rotation={[0,0,Math.PI/2]}><torusGeometry args={[.55,.04,16,72]} /><meshPhysicalMaterial color="#d0aa58" metalness={.9} roughness={.2} /></mesh>
</group>}
export default TurbineStage
