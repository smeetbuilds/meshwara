import { useMemo } from 'react'
import * as THREE from 'three'
function PendantNecklace(){const chain=useMemo(()=>{const pts=[];for(let i=0;i<=100;i++){const t=i/100;const x=(t-.5)*2.65;const y=.75-Math.pow(Math.abs(t-.5)*2,1.7)*1.25;pts.push(new THREE.Vector3(x,y,0))}return new THREE.CatmullRomCurve3(pts)},[]);return <group rotation={[.08,-.28,.02]}>
  <mesh><tubeGeometry args={[chain,100,.028,10,false]} /><meshPhysicalMaterial color="#d3b56d" metalness={1} roughness={.16} /></mesh>
  <group position={[0,-.55,0]}><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.38,.08,20,64]} /><meshPhysicalMaterial color="#d7b96c" metalness={1} roughness={.13} /></mesh><mesh position={[0,0,.05]}><octahedronGeometry args={[.22,2]} /><meshPhysicalMaterial color="#789ea6" metalness={.3} roughness={.08} transmission={.32} clearcoat={.7} /></mesh><mesh position={[0,.46,0]}><torusGeometry args={[.11,.035,12,32]} /><meshPhysicalMaterial color="#d7b96c" metalness={1} roughness={.14} /></mesh></group>
</group>}
export default PendantNecklace
