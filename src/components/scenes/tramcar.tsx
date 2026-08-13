import { RoundedBox } from '@react-three/drei'
function TramCar(){return <group position={[0,-.82,0]} rotation={[0,-.36,0]} scale={.86}>
  <RoundedBox args={[3.6,1.75,1.45]} radius={.22} smoothness={5} position={[0,.45,0]}><meshPhysicalMaterial color="#b88a4d" metalness={.42} roughness={.31} clearcoat={.3}/></RoundedBox>
  <RoundedBox args={[3.24,.72,1.49]} radius={.12} smoothness={4} position={[0,.78,0]}><meshPhysicalMaterial color="#263238" roughness={.24}/></RoundedBox>
  {[-1.12,-.38,.38,1.12].map(x=><mesh key={x} position={[x,.86,.76]}><planeGeometry args={[.56,.52]} /><meshPhysicalMaterial color="#8fb4b8" metalness={.18} roughness={.12} transmission={.25}/></mesh>)}
  {[-1.1,1.1].map(x=><group key={x} position={[x,-.48,0]}>{[-.67,.67].map(z=><mesh key={z} position={[0,0,z]}><torusGeometry args={[.35,.085,18,54]} /><meshPhysicalMaterial color="#181b1c" roughness={.58}/></mesh>)}<mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.1,.1,1.36,28]} /><meshPhysicalMaterial color="#5d6466" metalness={.9} roughness={.22}/></mesh></group>)}
  <mesh position={[0,1.56,0]}><boxGeometry args={[1.0,.08,.7]} /><meshPhysicalMaterial color="#555c5e" metalness={.8} roughness={.28}/></mesh>
  <mesh position={[0,1.98,0]} rotation={[0,0,.18]}><torusGeometry args={[.48,.035,10,48,Math.PI]} /><meshPhysicalMaterial color="#777e80" metalness={.85} roughness={.25}/></mesh>
  <mesh position={[0,-.84,0]}><boxGeometry args={[4.2,.08,1.9]} /><meshPhysicalMaterial color="#a7a29a" roughness={.82}/></mesh>
</group>}
export default TramCar
