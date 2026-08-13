import { MeshTransmissionMaterial } from '@react-three/drei'

function PetriStack(){
  return <group position={[0,-.65,0]} rotation={[0,-.32,0]}>
    {[0,.27,.54,.81].map((y,i)=><group key={y} position={[i*.1,y,0]} rotation={[0,i*.12,0]}>
      <mesh><cylinderGeometry args={[.9,.9,.14,72]}/><MeshTransmissionMaterial transmission={.9} thickness={.1} roughness={.055} ior={1.47} chromaticAberration={.01} color="#d9e8e2"/></mesh>
      <mesh position={[0,.045,0]}><cylinderGeometry args={[.78,.78,.035,72]}/><meshPhysicalMaterial color={i%2?'#d7b48a':'#b8d0a4'} roughness={.7} transparent opacity={.8}/></mesh>
      <mesh position={[0,.082,0]}><torusGeometry args={[.71,.018,18,72]}/><meshPhysicalMaterial color="#c4d7d1" transmission={.45} roughness={.1}/></mesh>
      {Array.from({length:5}).map((_,j)=><mesh key={j} position={[Math.cos(j*1.256)*(.2+.05*i),.086,Math.sin(j*1.256)*(.2+.05*i)]}><sphereGeometry args={[.035+.008*(j%2),20,14]}/><meshStandardMaterial color={i%2?'#a86c58':'#718d64'} roughness={.72}/></mesh>)}
    </group>)}
    <mesh position={[.82,.12,-.62]} rotation={[0,0,-.35]}><cylinderGeometry args={[.055,.055,1.4,28]}/><meshPhysicalMaterial color="#c4c7c5" metalness={.75} roughness={.24}/></mesh>
    <mesh position={[.96,.71,-.73]} rotation={[0,0,-.35]}><sphereGeometry args={[.12,28,20]}/><meshPhysicalMaterial color="#d6dedb" transmission={.6} roughness={.08}/></mesh>
  </group>
}
export default PetriStack
