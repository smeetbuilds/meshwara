function ReferenceMonitor(){return <group rotation={[.04,-.36,0]} position={[0,-.4,0]}>
  <mesh><boxGeometry args={[1.9,2.75,1.25]} /><meshPhysicalMaterial color="#24282a" roughness={.32} clearcoat={.18}/></mesh>
  <mesh position={[0,-.5,.66]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.62,.62,.16,72]} /><meshPhysicalMaterial color="#101314" roughness={.5}/></mesh>
  <mesh position={[0,-.5,.77]}><torusGeometry args={[.43,.11,18,72]} /><meshPhysicalMaterial color="#4f5b5e" metalness={.32} roughness={.38}/></mesh>
  <mesh position={[0,-.5,.81]}><circleGeometry args={[.26,64]} /><meshPhysicalMaterial color="#b58b4d" metalness={.72} roughness={.27}/></mesh>
  <mesh position={[0,.62,.68]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.3,.3,.12,56]} /><meshPhysicalMaterial color="#101314" roughness={.46}/></mesh>
  <mesh position={[0,.62,.77]}><sphereGeometry args={[.16,36,28]} /><meshPhysicalMaterial color="#9da4a6" metalness={.86} roughness={.18}/></mesh>
  <mesh position={[0,1.08,.68]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.12,.12,.1,32]} /><meshBasicMaterial color="#090a0a" /></mesh>
  <mesh position={[0,-1.52,0]}><boxGeometry args={[2.3,.12,1.55]} /><meshPhysicalMaterial color="#a39d92" roughness={.7}/></mesh>
</group>}
export default ReferenceMonitor
