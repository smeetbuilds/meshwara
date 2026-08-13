function ValveManifold(){return <group position={[0,-.4,0]} rotation={[0,-.34,0]}>
  <mesh><boxGeometry args={[3.1,.5,.7]}/><meshPhysicalMaterial color="#7d8789" metalness={.88} roughness={.22}/></mesh>
  {[-.9,0,.9].map((x,i)=><group key={x} position={[x,.56,0]}><mesh><cylinderGeometry args={[.23,.23,.62,32]}/><meshPhysicalMaterial color="#818b8e" metalness={.88} roughness={.22}/></mesh><mesh position={[0,.42,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.3,.035,12,36]}/><meshPhysicalMaterial color={i===1?'#b06454':'#4e5960'} metalness={.66} roughness={.3}/></mesh></group>)}
  {[-1.72,1.72].map(x=><mesh key={x} position={[x,0,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.28,.28,.4,36]}/><meshPhysicalMaterial color="#899295" metalness={.9} roughness={.2}/></mesh>)}
</group>} export default ValveManifold
