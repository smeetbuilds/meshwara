function ClinicalExamStool(){return <group position={[0,-.75,0]} rotation={[0,-.28,0]}>
  <mesh position={[0,1.38,0]}><cylinderGeometry args={[.72,.72,.28,48]}/><meshPhysicalMaterial color="#7f98a2" roughness={.6} sheen={.25}/></mesh>
  <mesh position={[0,.67,0]}><cylinderGeometry args={[.08,.1,1.25,24]}/><meshPhysicalMaterial color="#8d9699" metalness={.85} roughness={.22}/></mesh>
  <mesh position={[0,.1,0]}><cylinderGeometry args={[.28,.28,.14,32]}/><meshPhysicalMaterial color="#626a6d" metalness={.68} roughness={.28}/></mesh>
  {Array.from({length:5},(_,i)=>{const a=i/5*Math.PI*2;return <group key={i} rotation={[0,-a,0]}><mesh position={[.55,.05,0]} rotation={[0,0,Math.PI/2]}><boxGeometry args={[.9,.055,.08]}/><meshPhysicalMaterial color="#5e6668" metalness={.7} roughness={.28}/></mesh><mesh position={[.98,-.02,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.09,.025,10,24]}/><meshStandardMaterial color="#232627"/></mesh></group>})}
</group>} export default ClinicalExamStool
