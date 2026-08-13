function CantileverStool(){return <group rotation={[0,-.38,0]} position={[0,-.35,0]}>
  <mesh position={[0,.72,0]}><cylinderGeometry args={[.92,.92,.18,64]} /><meshPhysicalMaterial color="#8b5b43" roughness={.5}/></mesh>
  {[-.62,.62].map(x=><group key={x}><mesh position={[x,.25,0]}><cylinderGeometry args={[.055,.055,.9,20]} /><meshPhysicalMaterial color="#303435" metalness={.88} roughness={.24}/></mesh><mesh position={[x,-.25,.46]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.055,.055,.92,20]} /><meshPhysicalMaterial color="#303435" metalness={.88} roughness={.24}/></mesh><mesh position={[x,-.72,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.055,.055,.92,20]} /><meshPhysicalMaterial color="#303435" metalness={.88} roughness={.24}/></mesh></group>)}
  <mesh position={[0,-.15,.47]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.05,.05,1.25,20]} /><meshPhysicalMaterial color="#303435" metalness={.88} roughness={.24}/></mesh>
</group>}
export default CantileverStool
