import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
function Wing({side,shape}:{side:number;shape:THREE.Shape}){return <mesh position={[side*.08,0,0]} rotation={[0,side*.18,side*.04]} scale={[side,1,1]}><shapeGeometry args={[shape,48]} /><meshPhysicalMaterial color="#cf6735" roughness={.5} clearcoat={.1} side={THREE.DoubleSide}/></mesh>}
function MonarchButterfly(){const ref=useRef<THREE.Group>(null);const wing=useMemo(()=>{const s=new THREE.Shape();s.moveTo(0,0);s.bezierCurveTo(.35,.5,.72,1.18,1.15,1.1);s.bezierCurveTo(1.48,1.02,1.5,.48,1.08,.12);s.bezierCurveTo(.8,-.12,.48,-.32,0,0);return s},[]);useFrame((s)=>{if(ref.current){const a=.24+Math.sin(s.clock.elapsedTime*2.2)*.12;ref.current.children[0].rotation.y=a;ref.current.children[1].rotation.y=-a}});return <group ref={ref} rotation={[.25,-.35,.08]}>
  <Wing side={1} shape={wing}/><Wing side={-1} shape={wing}/>
  <mesh rotation={[Math.PI/2,0,0]} scale={[.16,.16,.8]}><capsuleGeometry args={[.13,.72,10,20]} /><meshPhysicalMaterial color="#202326" roughness={.54}/></mesh>
  <mesh position={[0,.5,.02]}><sphereGeometry args={[.17,28,20]} /><meshPhysicalMaterial color="#202326" roughness={.5}/></mesh>
  {[-1,1].map(side=><mesh key={side} position={[side*.07,.66,.04]} rotation={[0,0,side*.45]}><cylinderGeometry args={[.012,.012,.62,10]} /><meshPhysicalMaterial color="#2a2b2c" roughness={.5}/></mesh>)}
  {[[-.72,.55,.02],[-.92,.18,.02],[-.58,-.03,.02],[.72,.55,.02],[.92,.18,.02],[.58,-.03,.02]].map((p,i)=><mesh key={i} position={p as [number,number,number]}><sphereGeometry args={[.055,14,10]} /><meshPhysicalMaterial color="#f0d9a8" roughness={.48}/></mesh>)}
</group>}
export default MonarchButterfly
