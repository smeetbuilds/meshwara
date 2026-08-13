import { MeshTransmissionMaterial } from '@react-three/drei'
function MechanicalCompass(){return <group rotation={[.35,-.18,-.08]}>
  <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[1.25,1.25,.24,96]} /><meshPhysicalMaterial color="#b79658" metalness={.92} roughness={.2}/></mesh>
  <mesh position={[0,0,.13]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[1.05,1.05,.08,96]} /><meshPhysicalMaterial color="#e9e0c7" roughness={.48}/></mesh>
  {Array.from({length:32},(_,i)=>{const a=i/32*Math.PI*2;return <mesh key={i} position={[Math.sin(a)*.86,Math.cos(a)*.86,.19]} rotation={[0,0,-a]}><boxGeometry args={[i%4===0?.028:.014,i%4===0?.16:.09,.018]} /><meshBasicMaterial color="#3a3328" /></mesh>})}
  <mesh position={[0,.24,.23]} rotation={[0,0,.38]}><coneGeometry args={[.18,1.45,3]} /><meshBasicMaterial color="#a53f34" /></mesh>
  <mesh position={[0,-.24,.23]} rotation={[0,0,.38+Math.PI]}><coneGeometry args={[.18,1.45,3]} /><meshBasicMaterial color="#313b43" /></mesh>
  <mesh position={[0,0,.3]}><sphereGeometry args={[.09,32,32]} /><meshPhysicalMaterial color="#b79658" metalness={1} roughness={.18}/></mesh>
  <mesh position={[0,0,.28]}><cylinderGeometry args={[1.12,1.12,.03,96]} /><MeshTransmissionMaterial transmission={.94} thickness={.15} roughness={.05} ior={1.48}/></mesh>
</group>}
export default MechanicalCompass
