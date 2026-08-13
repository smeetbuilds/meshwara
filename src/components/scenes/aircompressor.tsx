function AirCompressor(){return <group position={[0,-.55,0]} rotation={[0,-.35,0]}>
  <mesh rotation={[0,0,Math.PI/2]}><capsuleGeometry args={[.62,1.65,12,28]}/><meshPhysicalMaterial color="#607b87" metalness={.45} roughness={.34}/></mesh>
  <mesh position={[-.35,.82,0]}><boxGeometry args={[.9,.65,.78]}/><meshPhysicalMaterial color="#4d5558" metalness={.58} roughness={.32}/></mesh>
  <mesh position={[.62,.82,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.3,.3,.78,32]}/><meshPhysicalMaterial color="#626a6d" metalness={.7} roughness={.28}/></mesh>
  {[-1.0,1.0].map(x=><mesh key={x} position={[x,-.62,.42]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.25,.06,14,36]}/><meshStandardMaterial color="#222526" roughness={.52}/></mesh>)}
  <group position={[1.15,.65,0]}>{[0,.28].map((x,i)=><mesh key={x} position={[x,0,0]}><cylinderGeometry args={[.14,.14,.12,24]}/><meshPhysicalMaterial color="#8c9496" metalness={.82} roughness={.23}/></mesh>)}</group>
</group>} export default AirCompressor
