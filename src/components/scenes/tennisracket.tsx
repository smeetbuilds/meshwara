function TennisRacket(){return <group rotation={[.1,-.28,-.38]}>
  <mesh position={[0,.85,0]}><torusGeometry args={[.88,.075,24,72]} /><meshPhysicalMaterial color="#262b2d" metalness={.45} roughness={.3}/></mesh>
  {Array.from({length:13},(_,i)=><mesh key={`v${i}`} position={[-.66+i*.11,.85,0]}><boxGeometry args={[.008,1.45,.012]} /><meshBasicMaterial color="#d7d7ce" /></mesh>)}
  {Array.from({length:15},(_,i)=><mesh key={`h${i}`} position={[0,.21+i*.09,0]}><boxGeometry args={[1.45,.008,.012]} /><meshBasicMaterial color="#d7d7ce" /></mesh>)}
  <mesh position={[0,-.15,0]}><boxGeometry args={[.18,.7,.14]} /><meshPhysicalMaterial color="#303638" metalness={.42} roughness={.32}/></mesh>
  <mesh position={[0,-1.18,0]}><cylinderGeometry args={[.16,.18,1.45,28]} /><meshPhysicalMaterial color="#8d765d" roughness={.55}/></mesh>
  {Array.from({length:10},(_,i)=><mesh key={i} position={[0,-.62-i*.12,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.175,.012,8,24]} /><meshBasicMaterial color="#3b3027" /></mesh>)}
</group>}
export default TennisRacket
