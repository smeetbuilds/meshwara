import { MeshTransmissionMaterial } from '@react-three/drei'
function GlazedWindowBay(){return <group position={[0,0,0]} rotation={[0,-.22,0]}>
  <mesh><boxGeometry args={[3.3,3.2,.38]}/><meshStandardMaterial color="#d0ccc3" roughness={.78}/></mesh>
  <mesh position={[0,0,.22]}><boxGeometry args={[2.72,2.58,.05]}/><MeshTransmissionMaterial transmission={.72} thickness={.14} roughness={.08} color="#9bb8be"/></mesh>
  {[-.9,0,.9].map(x=><mesh key={x} position={[x,0,.3]}><boxGeometry args={[.06,2.68,.09]}/><meshPhysicalMaterial color="#4a5052" metalness={.72} roughness={.28}/></mesh>)}
  {[-.84,.84].map(y=><mesh key={y} position={[0,y,.3]}><boxGeometry args={[2.8,.06,.09]}/><meshPhysicalMaterial color="#4a5052" metalness={.72} roughness={.28}/></mesh>)}
</group>} export default GlazedWindowBay
