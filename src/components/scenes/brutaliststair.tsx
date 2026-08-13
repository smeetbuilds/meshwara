function BrutalistStair(){return <group position={[0,-.75,0]} rotation={[.02,-.4,0]}>
  {Array.from({length:10},(_,i)=><mesh key={i} position={[-1.25+i*.27,-.42+i*.18,0]}><boxGeometry args={[.32,.18,1.28]} /><meshPhysicalMaterial color="#9c9891" roughness={.78}/></mesh>)}
  <mesh position={[1.55,.5,-.7]}><boxGeometry args={[.18,2.7,.18]} /><meshPhysicalMaterial color="#797773" roughness={.8}/></mesh>
  <mesh position={[-1.5,.15,-.7]}><boxGeometry args={[.18,1.5,.18]} /><meshPhysicalMaterial color="#797773" roughness={.8}/></mesh>
  <mesh position={[0,1.42,-.72]} rotation={[0,0,-.58]}><boxGeometry args={[3.7,.06,.08]} /><meshPhysicalMaterial color="#53585a" metalness={.72} roughness={.28}/></mesh>
  <mesh position={[0,-.68,0]}><boxGeometry args={[3.6,.12,1.8]} /><meshPhysicalMaterial color="#b0aba2" roughness={.82}/></mesh>
  <mesh position={[-1.42,.72,.66]}><boxGeometry args={[.12,2.4,.12]} /><meshPhysicalMaterial color="#706e69" roughness={.8}/></mesh>
</group>}
export default BrutalistStair
