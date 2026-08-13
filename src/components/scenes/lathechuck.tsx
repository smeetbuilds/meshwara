function LatheChuck(){return <group rotation={[0,-.4,0]}>
  <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[1.2,1.2,.5,72]}/><meshPhysicalMaterial color="#5c6265" metalness={.92} roughness={.2}/></mesh>
  <mesh position={[0,0,.28]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.46,.46,.12,56]}/><meshStandardMaterial color="#252829" roughness={.36}/></mesh>
  {[0,1,2].map(i=>{const a=i/3*Math.PI*2;return <group key={i} rotation={[0,0,a]} position={[Math.sin(a)*.53,Math.cos(a)*.53,.36]}><mesh position={[0,.34,0]}><boxGeometry args={[.34,.68,.22]}/><meshPhysicalMaterial color="#858b8e" metalness={.9} roughness={.18}/></mesh><mesh position={[0,.6,.04]}><boxGeometry args={[.22,.22,.32]}/><meshPhysicalMaterial color="#8f9597" metalness={.9} roughness={.18}/></mesh></group>})}
</group>} export default LatheChuck
