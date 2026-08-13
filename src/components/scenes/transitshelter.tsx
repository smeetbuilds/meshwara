import { MeshTransmissionMaterial } from '@react-three/drei'
function TransitShelter(){return <group position={[0,-.85,0]} rotation={[0,-.3,0]}>
  <mesh position={[0,2.05,0]}><boxGeometry args={[3.5,.16,1.65]}/><meshStandardMaterial color="#787f82" roughness={.34}/></mesh>
  {[-1.45,1.45].map(x=><mesh key={x} position={[x,.95,0]}><boxGeometry args={[.12,2.25,.12]}/><meshPhysicalMaterial color="#555d60" metalness={.65} roughness={.3}/></mesh>)}
  <mesh position={[0,.95,-.7]}><boxGeometry args={[3.0,1.95,.035]}/><MeshTransmissionMaterial transmission={.62} thickness={.08} roughness={.1} color="#9eb7bc"/></mesh>
  <mesh position={[0,.35,-.18]}><boxGeometry args={[2.15,.14,.52]}/><meshStandardMaterial color="#8d6e4f" roughness={.5}/></mesh>
  {[-.85,.85].map(x=><mesh key={x} position={[x,-.05,-.18]}><boxGeometry args={[.08,.72,.42]}/><meshStandardMaterial color="#474d4f"/></mesh>)}
</group>} export default TransitShelter
