function ScooterHubMotor(){return <group rotation={[.18,-.38,.04]}>
  <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[1.05,1.05,.42,72]}/><meshPhysicalMaterial color="#2b2f31" metalness={.82} roughness={.24}/></mesh>
  <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.78,.12,24,72]}/><meshPhysicalMaterial color="#545c60" metalness={.9} roughness={.18}/></mesh>
  <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.38,.38,.5,56]}/><meshPhysicalMaterial color="#8d9496" metalness={.95} roughness={.16}/></mesh>
  {Array.from({length:8}).map((_,i)=><mesh key={i} position={[Math.cos(i*Math.PI/4)*.66,0,Math.sin(i*Math.PI/4)*.66]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.045,.045,.47,22]}/><meshPhysicalMaterial color="#a5aaab" metalness={.88} roughness={.2}/></mesh>)}
  <mesh position={[0,.27,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.93,.035,16,72]}/><meshStandardMaterial color="#17191a" roughness={.42}/></mesh>
  <mesh position={[0,-.27,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.93,.035,16,72]}/><meshStandardMaterial color="#17191a" roughness={.42}/></mesh>
</group>} export default ScooterHubMotor
