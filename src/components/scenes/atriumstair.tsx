function AtriumStair(){const steps=Array.from({length:14},(_,i)=>i);return <group position={[0,-1.0,0]} rotation={[0,-.38,0]}>
  {steps.map(i=><mesh key={i} position={[-1.25+i*.18,-.1+i*.12,0]}><boxGeometry args={[.22,.09,1.25]}/><meshStandardMaterial color="#c4c0b8" roughness={.72}/></mesh>)}
  <mesh position={[1.35,1.56,0]}><boxGeometry args={[1.1,.12,1.25]}/><meshStandardMaterial color="#b7b4ad" roughness={.72}/></mesh>
  {[-.56,.56].map(z=><group key={z}>{Array.from({length:9},(_,i)=><mesh key={i} position={[-1.16+i*.32,.3+i*.18,z]}><cylinderGeometry args={[.018,.018,.85,10]}/><meshPhysicalMaterial color="#575d5f" metalness={.7} roughness={.28}/></mesh>)}<mesh position={[.05,1.18,z]} rotation={[0,0,-.51]}><boxGeometry args={[3.25,.035,.035]}/><meshPhysicalMaterial color="#575d5f" metalness={.7} roughness={.28}/></mesh></group>)}
</group>} export default AtriumStair
