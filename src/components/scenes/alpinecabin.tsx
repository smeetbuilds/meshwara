import { MeshTransmissionMaterial } from '@react-three/drei'
function AlpineCabin(){return <group position={[0,-.78,0]} rotation={[.03,-.34,0]} scale={.9}>
  <mesh position={[0,-.55,0]}><boxGeometry args={[2.7,1.35,1.9]} /><meshPhysicalMaterial color="#755841" roughness={.62} /></mesh>
  <mesh position={[0,.35,0]} rotation={[0,0,Math.PI/4]} scale={[1.45,1.45,1]}><boxGeometry args={[1.45,.16,2.15]} /><meshPhysicalMaterial color="#3c3f3e" metalness={.42} roughness={.48} /></mesh>
  <mesh position={[.5,-.35,.98]}><boxGeometry args={[.9,.72,.06]} /><MeshTransmissionMaterial transmission={.88} thickness={.08} roughness={.12} ior={1.45} color="#a5c9cb" /></mesh>
  <mesh position={[-.62,-.42,1.0]}><boxGeometry args={[.55,.95,.08]} /><meshPhysicalMaterial color="#392b22" roughness={.54} /></mesh>
  <mesh position={[.86,.65,-.48]}><boxGeometry args={[.24,.82,.3]} /><meshPhysicalMaterial color="#5b5c59" roughness={.52} /></mesh>
  <mesh position={[0,-1.25,0]}><boxGeometry args={[3.7,.12,2.8]} /><meshPhysicalMaterial color="#b8b6ad" roughness={.8} /></mesh>
  {[[-1.55,-.72,-.75],[-1.7,-.72,.65],[1.55,-.72,-.82]].map((p,i)=><group key={i} position={p as [number,number,number]}><mesh position={[0,.55,0]}><cylinderGeometry args={[.055,.09,1.1,18]} /><meshPhysicalMaterial color="#5d4938" roughness={.7} /></mesh>{[.75,1.02,1.25].map((y,j)=><mesh key={j} position={[0,y,0]}><coneGeometry args={[.46-j*.07,.62,18]} /><meshPhysicalMaterial color="#516b56" roughness={.76} /></mesh>)}</group>)}
  <spotLight position={[1.4,2.8,2]} intensity={2} angle={.65} penumbra={.96} color="#fff0d2" />
</group>}
export default AlpineCabin
