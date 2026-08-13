import { MeshTransmissionMaterial } from '@react-three/drei'
function OliveOilBottle(){return <group rotation={[.03,-.35,0]} position={[0,-.25,0]}>
  <mesh position={[0,.15,0]}><cylinderGeometry args={[.58,.64,1.9,64]} /><MeshTransmissionMaterial transmission={.78} thickness={.22} roughness={.08} ior={1.5} color="#536f4b" /></mesh>
  <mesh position={[0,-.35,0]}><cylinderGeometry args={[.49,.55,1.0,64]} /><meshPhysicalMaterial color="#71823e" transmission={.12} transparent opacity={.86} roughness={.28}/></mesh>
  <mesh position={[0,1.35,0]}><cylinderGeometry args={[.25,.34,.52,48]} /><MeshTransmissionMaterial transmission={.8} thickness={.16} roughness={.08} ior={1.5} color="#587554" /></mesh>
  <mesh position={[0,1.7,0]}><cylinderGeometry args={[.28,.28,.2,40]} /><meshPhysicalMaterial color="#c2a45f" metalness={.78} roughness={.22}/></mesh>
  <mesh position={[0,.35,.61]}><planeGeometry args={[.72,.92]} /><meshPhysicalMaterial color="#d8cfb0" roughness={.56}/></mesh>
  <mesh position={[0,-1.02,0]}><cylinderGeometry args={[.8,.8,.06,72]} /><meshPhysicalMaterial color="#ada79d" roughness={.82}/></mesh>
</group>}
export default OliveOilBottle
