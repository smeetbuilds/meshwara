function ObservationDeck(){const rails=Array.from({length:16},(_,i)=>{const a=i/16*Math.PI*2;return [Math.cos(a)*1.58,.45,Math.sin(a)*1.58] as [number,number,number]});return <group position={[0,-.85,0]} rotation={[0,-.25,0]}>
  <mesh><cylinderGeometry args={[1.75,1.75,.18,64]}/><meshStandardMaterial color="#776955" roughness={.62}/></mesh>
  {rails.map((p,i)=><mesh key={i} position={p}><cylinderGeometry args={[.018,.018,.9,10]}/><meshPhysicalMaterial color="#555a5c" metalness={.65} roughness={.3}/></mesh>)}
  <mesh position={[0,.9,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[1.58,.025,10,96]}/><meshPhysicalMaterial color="#555a5c" metalness={.65} roughness={.3}/></mesh>
  {Array.from({length:8},(_,i)=><mesh key={i} position={[-2.15+i*.25,-.08-i*.14,0]}><boxGeometry args={[.28,.08,.8]}/><meshStandardMaterial color="#8b8172" roughness={.68}/></mesh>)}
</group>} export default ObservationDeck
