import { MeshTransmissionMaterial } from '@react-three/drei'
function WaterLily(){return <group rotation={[.18,-.28,.04]}>
  <mesh rotation={[-Math.PI/2,0,0]} scale={[1.3,.86,1]}><circleGeometry args={[1.15,96]} /><meshPhysicalMaterial color="#446c58" roughness={.62} clearcoat={.2} side={2} /></mesh>
  {Array.from({length:14},(_,i)=>{const a=i/14*Math.PI*2;return <mesh key={i} position={[Math.cos(a)*.42,.16,Math.sin(a)*.42]} rotation={[-.72,0,-a]} scale={[.62,1,.3]}><sphereGeometry args={[.55,32,22]} /><meshPhysicalMaterial color={i%2?'#f0d8dc':'#f4e5e4'} roughness={.28} clearcoat={.18} /></mesh>})}
  {Array.from({length:8},(_,i)=>{const a=i/8*Math.PI*2+.2;return <mesh key={i} position={[Math.cos(a)*.2,.28,Math.sin(a)*.2]} rotation={[-.55,0,-a]} scale={[.42,.7,.2]}><sphereGeometry args={[.42,28,18]} /><meshPhysicalMaterial color="#f6ece7" roughness={.24} /></mesh>})}
  <mesh position={[0,.36,0]}><sphereGeometry args={[.13,24,18]} /><meshPhysicalMaterial color="#d6ad57" metalness={.28} roughness={.28} /></mesh>
  <mesh position={[0,-.08,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[1.5,96]} /><MeshTransmissionMaterial transmission={.76} thickness={.05} roughness={.16} ior={1.33} color="#79a9aa" transparent opacity={.46} /></mesh>
</group>}
export default WaterLily
