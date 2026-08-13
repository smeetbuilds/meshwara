function CeilingLight(){return <group position={[0,.25,0]} rotation={[0,-.28,0]}>
  <mesh position={[0,1.15,0]}><cylinderGeometry args={[.32,.32,.18,48]}/><meshPhysicalMaterial color="#303334" metalness={.82} roughness={.22}/></mesh>
  <mesh position={[0,.45,0]}><cylinderGeometry args={[.025,.025,1.35,24]}/><meshPhysicalMaterial color="#53585a" metalness={.9} roughness={.18}/></mesh>
  <mesh position={[0,-.22,0]}><cylinderGeometry args={[1.05,.82,.3,64]}/><meshPhysicalMaterial color="#d8d2c6" roughness={.5}/></mesh>
  <mesh position={[0,-.38,0]}><cylinderGeometry args={[.82,.82,.045,64]}/><meshPhysicalMaterial color="#f5e2b8" roughness={.24} emissive="#d5a85a" emissiveIntensity={1.15}/></mesh>
  <mesh position={[0,-.2,0]}><torusGeometry args={[.88,.035,18,72]}/><meshPhysicalMaterial color="#8e7656" metalness={.68} roughness={.25}/></mesh>
  {Array.from({length:6}).map((_,i)=><mesh key={i} position={[Math.cos(i*Math.PI/3)*.72,-.05,Math.sin(i*Math.PI/3)*.72]} rotation={[0,-i*Math.PI/3,0]}><boxGeometry args={[.04,.18,.24]}/><meshStandardMaterial color="#9b907f" roughness={.5}/></mesh>)}
</group>} export default CeilingLight
