import { RoundedBox, MeshTransmissionMaterial } from '@react-three/drei'
function SpiritLevel(){return <group rotation={[.22,-.28,-.15]}>
  <RoundedBox args={[3.6,.62,.38]} radius={.11} smoothness={4}><meshPhysicalMaterial color="#d8a817" metalness={.45} roughness={.3}/></RoundedBox>
  {[-1.15,0,1.15].map((x,i)=><group key={x} position={[x,0,.22]} rotation={[0,0,i===1?Math.PI/2:0]}><mesh><boxGeometry args={[.72,.3,.12]} /><meshPhysicalMaterial color="#242829" roughness={.38}/></mesh><mesh position={[0,0,.075]}><capsuleGeometry args={[.12,.34,10,24]} /><MeshTransmissionMaterial transmission={.9} thickness={.18} roughness={.04} color="#d9ee86" /></mesh><mesh position={[0,0,.09]}><boxGeometry args={[.025,.2,.01]} /><meshBasicMaterial color="#394c2f" /></mesh></group>)}
</group>}
export default SpiritLevel
