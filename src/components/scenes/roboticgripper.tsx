import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Link({a,b,r=0.09}:{a:[number,number,number];b:[number,number,number];r?:number}){const d=useMemo(()=>{const s=new THREE.Vector3(...a),e=new THREE.Vector3(...b),v=e.clone().sub(s);return{p:s.clone().add(e).multiplyScalar(.5),l:v.length(),q:new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize())}},[a,b]);return <mesh position={d.p} quaternion={d.q}><cylinderGeometry args={[r,r,d.l,28]} /><meshPhysicalMaterial color="#777f83" metalness={0.92} roughness={0.2} /></mesh>}
function RoboticGripper(){const wrist=useRef<THREE.Group>(null);useFrame((s)=>{if(wrist.current)wrist.current.rotation.z=Math.sin(s.clock.elapsedTime*.55)*.18});return <group position={[0,-.65,0]} rotation={[0,-.34,0]}>
  <mesh position={[-.8,-.75,0]}><cylinderGeometry args={[.46,.54,.28,48]} /><meshPhysicalMaterial color="#252a2c" metalness={.84} roughness={.22} /></mesh>
  <mesh position={[-.8,-.52,0]}><cylinderGeometry args={[.28,.28,.22,40]} /><meshPhysicalMaterial color="#dfb85f" metalness={.85} roughness={.2} /></mesh>
  <Link a={[-.8,-.42,0]} b={[-.35,.38,0]} r={.13}/><mesh position={[-.35,.38,0]}><sphereGeometry args={[.19,32,32]} /><meshPhysicalMaterial color="#303638" metalness={.88} roughness={.2} /></mesh>
  <Link a={[-.35,.38,0]} b={[.44,.72,0]} r={.11}/><mesh position={[.44,.72,0]}><sphereGeometry args={[.16,28,28]} /><meshPhysicalMaterial color="#d0a74f" metalness={.9} roughness={.18} /></mesh>
  <group ref={wrist} position={[.44,.72,0]}><Link a={[0,0,0]} b={[.55,.23,0]} r={.085}/><group position={[.57,.24,0]} rotation={[0,0,-.28]}>
    <mesh><cylinderGeometry args={[.15,.15,.2,32]} /><meshPhysicalMaterial color="#3d4446" metalness={.9} roughness={.18} /></mesh>
    {[-1,1].map(side=><group key={side} position={[0,.18,side*.13]} rotation={[side*.12,0,0]}><mesh position={[0,.24,0]}><boxGeometry args={[.12,.46,.12]} /><meshPhysicalMaterial color="#aeb3b4" metalness={.82} roughness={.24} /></mesh><mesh position={[0,.49,0]} rotation={[0,0,side*.26]}><boxGeometry args={[.1,.24,.1]} /><meshPhysicalMaterial color="#282d2f" roughness={.38} /></mesh></group>)}
  </group></group>
</group>}
export default RoboticGripper
