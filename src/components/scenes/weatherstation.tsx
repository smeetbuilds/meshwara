import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
function Arm({a,b}:{a:[number,number,number];b:[number,number,number]}){const d=useMemo(()=>{const s=new THREE.Vector3(...a),e=new THREE.Vector3(...b),v=e.clone().sub(s);return {p:s.clone().add(e).multiplyScalar(.5),q:new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize()),l:v.length()}},[a,b]);return <mesh position={d.p} quaternion={d.q}><cylinderGeometry args={[.02,.02,d.l,10]} /><meshPhysicalMaterial color="#8a9193" metalness={.9} roughness={.22}/></mesh>}
function WeatherStation(){const cups=useRef<THREE.Group>(null);useFrame((_,d)=>{if(cups.current)cups.current.rotation.y+=d*.5});return <group position={[0,-.7,0]} rotation={[.02,-.34,0]}>
  <mesh position={[0,.65,0]}><cylinderGeometry args={[.055,.075,2.9,20]} /><meshPhysicalMaterial color="#747b7d" metalness={.88} roughness={.26}/></mesh>
  <group ref={cups} position={[0,1.82,0]}>{[0,1,2].map(i=>{const a=i/3*Math.PI*2;const p:[number,number,number]=[Math.cos(a)*.48,0,Math.sin(a)*.48];return <group key={i}><Arm a={[0,0,0]} b={p}/><mesh position={p} rotation={[0,-a,Math.PI/2]}><sphereGeometry args={[.13,24,16,0,Math.PI]} /><meshPhysicalMaterial color="#a4abad" metalness={.72} roughness={.28} side={THREE.DoubleSide}/></mesh></group>})}</group>
  <group position={[0,1.2,0]}><mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.035,.035,1.3,12]} /><meshPhysicalMaterial color="#777e80" metalness={.85} roughness={.25}/></mesh><mesh position={[.72,0,0]} rotation={[0,0,-Math.PI/2]}><coneGeometry args={[.16,.42,20]} /><meshPhysicalMaterial color="#d39d4c" roughness={.38}/></mesh><mesh position={[-.56,0,0]}><boxGeometry args={[.36,.28,.035]} /><meshPhysicalMaterial color="#4f5a5d" roughness={.42}/></mesh></group>
  {Array.from({length:6},(_,i)=><mesh key={i} position={[0,.22-i*.1,0]}><cylinderGeometry args={[.26,.26,.035,40]} /><meshPhysicalMaterial color="#d2d5d2" roughness={.48}/></mesh>)}
  <mesh position={[0,-.82,0]}><cylinderGeometry args={[.75,.88,.18,56]} /><meshPhysicalMaterial color="#97938c" roughness={.8}/></mesh>
</group>}
export default WeatherStation
