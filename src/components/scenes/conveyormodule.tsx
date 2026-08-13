function ConveyorModule(){return <group rotation={[.06,-.38,0]} position={[0,-.55,0]}>
  <mesh><boxGeometry args={[3.5,.34,1.35]} /><meshPhysicalMaterial color="#555c5e" metalness={.68} roughness={.3}/></mesh>
  {Array.from({length:10},(_,i)=><mesh key={i} position={[-1.52+i*.34,.24,0]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.16,.16,1.18,24]} /><meshPhysicalMaterial color="#9a9fa0" metalness={.85} roughness={.22}/></mesh>)}
  {[-1.4,1.4].flatMap(x=>[-.48,.48].map(z=><mesh key={`${x}-${z}`} position={[x,-.78,z]}><boxGeometry args={[.12,1.2,.12]} /><meshPhysicalMaterial color="#303536" metalness={.72} roughness={.28}/></mesh>))}
  <mesh position={[1.62,-.08,.78]}><boxGeometry args={[.22,.7,.22]} /><meshPhysicalMaterial color="#d5a62e" roughness={.34}/></mesh>
</group>}
export default ConveyorModule
