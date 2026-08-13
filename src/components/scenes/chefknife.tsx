import * as THREE from 'three'
function ChefKnife(){const shape=new THREE.Shape();shape.moveTo(-1.55,-.12);shape.lineTo(.55,-.12);shape.bezierCurveTo(.95,-.08,1.18,.2,1.35,.58);shape.lineTo(-1.2,.48);shape.lineTo(-1.55,.15);shape.closePath();return <group rotation={[.18,-.32,-.18]}>
  <mesh><extrudeGeometry args={[shape,{depth:.055,bevelEnabled:true,bevelSize:.018,bevelThickness:.018,bevelSegments:3}]} /><meshPhysicalMaterial color="#c7cccf" metalness={.96} roughness={.16} /></mesh>
  <mesh position={[-2.0,.04,.03]}><boxGeometry args={[.92,.32,.22]} /><meshPhysicalMaterial color="#221d1a" roughness={.35} clearcoat={.16} /></mesh>
  {[[-1.74,.04,.15],[-2.04,.04,.15],[-2.34,.04,.15]].map((p,i)=><mesh key={i} position={p as [number,number,number]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.035,.035,.025,20]} /><meshPhysicalMaterial color="#b3b6b7" metalness={1} roughness={.18} /></mesh>)}
  <mesh position={[-1.54,.04,.03]}><boxGeometry args={[.1,.37,.24]} /><meshPhysicalMaterial color="#93805f" metalness={.85} roughness={.2} /></mesh>
</group>}
export default ChefKnife
