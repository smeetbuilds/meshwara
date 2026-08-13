function LaserBench(){return <group position={[0,-.55,0]} rotation={[0,-.28,0]}>
  <mesh><boxGeometry args={[3.6,.18,2.1]}/><meshPhysicalMaterial color="#7f8789" metalness={.8} roughness={.25}/></mesh>
  {Array.from({length:7},(_,x)=>Array.from({length:4},(_,z)=><mesh key={`${x}-${z}`} position={[-1.5+x*.5,.11,-.75+z*.5]}><cylinderGeometry args={[.018,.018,.03,12]}/><meshStandardMaterial color="#222526"/></mesh>))}
  <mesh position={[-1.15,.42,0]}><boxGeometry args={[.72,.45,.55]}/><meshStandardMaterial color="#4b5559" roughness={.34}/></mesh>
  {[-.35,.35,.92].map((x,i)=><group key={x} position={[x,.45,0]}><mesh><cylinderGeometry args={[.08,.08,.65,18]}/><meshPhysicalMaterial color="#70787b" metalness={.82} roughness={.24}/></mesh><mesh position={[0,.34,0]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.22,.22,.08,32]}/><meshPhysicalMaterial color="#28383f" metalness={.4} roughness={.12}/></mesh></group>)}
  <mesh position={[-.7,.78,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.018,.018,2.75,12]}/><meshBasicMaterial color="#e34d42" toneMapped={false}/></mesh>
</group>} export default LaserBench
