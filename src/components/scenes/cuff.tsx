import { RoundedBox } from '@react-three/drei'
function SculpturalCuff(){return <group rotation={[.34,-.4,.18]}>
  <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.92,.18,28,120,Math.PI*1.62]} /><meshPhysicalMaterial color="#c9a75e" metalness={1} roughness={.12} clearcoat={.7} /></mesh>
  {[-.72,.72].map((x,i)=><RoundedBox key={x} args={[.28,.42,.34]} radius={.12} smoothness={7} position={[x,-.57,0]} rotation={[0,0,i?-.38:.38]}><meshPhysicalMaterial color="#d1b16a" metalness={1} roughness={.12} /></RoundedBox>)}
  <mesh position={[0,.82,.15]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.42,.022,12,56]} /><meshBasicMaterial color="#f0d693" /></mesh>
</group>}
export default SculpturalCuff
