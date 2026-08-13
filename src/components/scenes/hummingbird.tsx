import { useMemo } from 'react'
import * as THREE from 'three'
function Wing({side}:{side:number}){const shape=useMemo(()=>{const s=new THREE.Shape();s.moveTo(0,0);s.bezierCurveTo(.55*side,.18,1.15*side,.62,1.48*side,1.18);s.bezierCurveTo(.72*side,.88,.22*side,.5,0,0);return s},[side]);return <mesh position={[side*.15,.3,0]} rotation={[0,side*.15,side*.18]}><shapeGeometry args={[shape]} /><meshPhysicalMaterial color="#748c7b" roughness={.42} side={2}/></mesh>}
function HummingbirdStudy(){return <group rotation={[.08,-.45,-.06]}>
  <mesh scale={[.62,1.15,.55]} rotation={[0,0,-Math.PI/2]}><capsuleGeometry args={[.38,.86,14,28]} /><meshPhysicalMaterial color="#2f6d62" roughness={.4} clearcoat={.35}/></mesh>
  <mesh position={[.72,.18,0]} scale={[.62,.55,.58]}><sphereGeometry args={[.48,42,28]} /><meshPhysicalMaterial color="#377e72" roughness={.38}/></mesh>
  <mesh position={[1.18,.16,0]} rotation={[0,0,-Math.PI/2]}><coneGeometry args={[.065,1.05,16]} /><meshPhysicalMaterial color="#272c2c" roughness={.48}/></mesh>
  <mesh position={[.92,.42,.38]}><sphereGeometry args={[.045,18,18]} /><meshBasicMaterial color="#080909" /></mesh>
  <mesh position={[.45,.0,.36]} scale={[.45,.28,.12]}><sphereGeometry args={[.5,32,20]} /><meshPhysicalMaterial color="#c64c45" roughness={.38}/></mesh>
  <Wing side={-1}/><Wing side={1}/>
  {[-.18,.18].map(z=><mesh key={z} position={[-.82,-.02,z]} rotation={[0,0,Math.PI/2]} scale={[.85,.18,.08]}><coneGeometry args={[.22,1.05,14]} /><meshPhysicalMaterial color="#36564d" roughness={.5}/></mesh>)}
</group>}
export default HummingbirdStudy
