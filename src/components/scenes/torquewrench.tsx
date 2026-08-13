function TorqueWrench(){return <group rotation={[.25,-.38,-.58]}>
  <mesh><cylinderGeometry args={[.12,.12,3.1,32]} /><meshPhysicalMaterial color="#9ba0a2" metalness={1} roughness={.18}/></mesh>
  <mesh position={[0,-1.5,0]}><cylinderGeometry args={[.25,.23,.75,32]} /><meshPhysicalMaterial color="#26292a" roughness={.46}/></mesh>
  {Array.from({length:9},(_,i)=><mesh key={i} position={[0,-1.22-i*.065,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.245,.012,8,28]} /><meshBasicMaterial color="#707476" /></mesh>)}
  <group position={[0,1.67,0]}><mesh><cylinderGeometry args={[.48,.48,.25,48]} /><meshPhysicalMaterial color="#8d9396" metalness={1} roughness={.2}/></mesh><mesh position={[0,.12,0]}><boxGeometry args={[.62,.36,.28]} /><meshPhysicalMaterial color="#8d9396" metalness={1} roughness={.2}/></mesh><mesh position={[0,.25,0]}><cylinderGeometry args={[.18,.18,.22,6]} /><meshPhysicalMaterial color="#33383a" metalness={.8} roughness={.23}/></mesh></group>
  <mesh position={[0,-.82,.16]}><boxGeometry args={[.16,.38,.02]} /><meshBasicMaterial color="#e7e2d8" /></mesh>
</group>}
export default TorqueWrench
