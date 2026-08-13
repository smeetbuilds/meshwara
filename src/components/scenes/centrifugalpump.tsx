function CentrifugalPump(){return <group position={[0,-.6,0]} rotation={[0,-.38,0]}>
  <mesh position={[-.45,.45,0]} rotation={[0,0,Math.PI/2]}><torusGeometry args={[.62,.24,28,64]}/><meshPhysicalMaterial color="#688896" metalness={.38} roughness={.34}/></mesh>
  <mesh position={[-.45,.45,0]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.34,.34,.48,48]}/><meshPhysicalMaterial color="#688896" metalness={.38} roughness={.34}/></mesh>
  <mesh position={[.75,.42,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.48,.48,1.3,48]}/><meshPhysicalMaterial color="#58676c" metalness={.68} roughness={.3}/></mesh>
  <mesh position={[0,-.2,0]}><boxGeometry args={[2.65,.16,1.15]}/><meshPhysicalMaterial color="#3f4547" metalness={.65} roughness={.32}/></mesh>
  <mesh position={[-1.15,.45,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.28,.28,.38,36]}/><meshPhysicalMaterial color="#747d80" metalness={.75} roughness={.27}/></mesh>
  <mesh position={[-.45,1.16,0]}><cylinderGeometry args={[.24,.24,.36,36]}/><meshPhysicalMaterial color="#747d80" metalness={.75} roughness={.27}/></mesh>
</group>} export default CentrifugalPump
