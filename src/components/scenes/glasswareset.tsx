import { MeshTransmissionMaterial } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
function Vessel({x,h,r}:{x:number;h:number;r:number}){const points=useMemo(()=>[new THREE.Vector2(.18,0),new THREE.Vector2(r*.78,h*.18),new THREE.Vector2(r,h*.78),new THREE.Vector2(r*.82,h)], [h,r]);return <group position={[x,-1,0]}><mesh><latheGeometry args={[points,64]} /><MeshTransmissionMaterial transmission={.96} thickness={.12} roughness={.035} ior={1.46}/></mesh><mesh position={[0,h*.42,0]}><cylinderGeometry args={[r*.68,r*.68,h*.58,48]} /><meshPhysicalMaterial color="#83b7c0" transparent opacity={.62} roughness={.08}/></mesh></group>}
function GlasswareSet(){return <group rotation={[0,-.25,0]}><Vessel x={-1.0} h={1.8} r={.55}/><Vessel x={0} h={2.35} r={.48}/><Vessel x={1.0} h={1.55} r={.62}/><mesh position={[0,-1.05,0]}><boxGeometry args={[3.1,.08,1.35]} /><meshPhysicalMaterial color="#c9c4ba" roughness={.7}/></mesh></group>}
export default GlasswareSet
