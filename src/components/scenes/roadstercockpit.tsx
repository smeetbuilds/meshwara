import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
function RoadsterCockpit(){return <group position={[0,-.65,0]} rotation={[.05,-.4,0]} scale={.9}>
  <RoundedBox args={[3.3,.55,2.1]} radius={.22} smoothness={6} position={[0,-.2,0]}><meshPhysicalMaterial color="#512e25" metalness={.62} roughness={.24} clearcoat={.7}/></RoundedBox>
  {[-.68,.68].map(x=><group key={x} position={[x,.52,-.18]}><RoundedBox args={[.82,1.15,.78]} radius={.2} smoothness={6}><meshPhysicalMaterial color="#c1aa8d" roughness={.34}/></RoundedBox><RoundedBox args={[.72,.72,.68]} radius={.18} smoothness={6} position={[0,.78,-.12]}><meshPhysicalMaterial color="#bfa78a" roughness={.34}/></RoundedBox></group>)}
  <mesh position={[0,1.0,.78]}><boxGeometry args={[2.6,.55,.18]} /><meshPhysicalMaterial color="#282b2c" roughness={.3}/></mesh>
  <mesh position={[-.76,1.05,1.02]} rotation={[0,0,.05]}><torusGeometry args={[.42,.055,16,72]} /><meshPhysicalMaterial color="#2d2f30" roughness={.35}/></mesh>
  <mesh position={[-.76,1.05,1.03]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.11,.11,.16,28]} /><meshPhysicalMaterial color="#9d825a" metalness={.82} roughness={.22}/></mesh>
  <mesh position={[.4,1.02,1.0]}><planeGeometry args={[.72,.24]} /><meshBasicMaterial color="#4e8d91" toneMapped={false}/></mesh>
  <mesh position={[0,1.55,.35]} rotation={[-.24,0,0]}><planeGeometry args={[2.7,.82]} /><MeshTransmissionMaterial transmission={.9} thickness={.06} roughness={.1} ior={1.47} color="#b9d4d6" /></mesh>
  <mesh position={[0,-.55,0]}><boxGeometry args={[3.7,.08,2.5]} /><meshPhysicalMaterial color="#b8b2a8" roughness={.8}/></mesh>
</group>}
export default RoadsterCockpit
