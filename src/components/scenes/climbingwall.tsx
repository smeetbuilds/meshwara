function ClimbingWall(){const holds=[[-1.05,.85,.1,'#d65b45'],[-.45,1.1,.15,'#d6b243'],[.15,.72,.12,'#619a7d'],[.88,1.05,.12,'#6b86b0'],[-.82,.18,.15,'#7f67a2'],[-.05,.15,.14,'#d65b45'],[.72,.32,.12,'#d6b243'],[-.5,-.48,.13,'#619a7d'],[.35,-.62,.14,'#6b86b0'],[1.0,-.42,.13,'#7f67a2']];return <group rotation={[.08,-.32,0]}>
  <mesh><boxGeometry args={[3.25,3.1,.2]} /><meshPhysicalMaterial color="#bdb7ad" roughness={.78}/></mesh>
  {Array.from({length:4},(_,i)=><mesh key={i} position={[-1.2+i*.8,0,.12]}><boxGeometry args={[.018,3.0,.02]} /><meshBasicMaterial color="#9e9990" /></mesh>)}
  {holds.map(([x,y,z,c],i)=><mesh key={i} position={[Number(x),Number(y),.18]} rotation={[.4,.2,i*.7]} scale={[1.2,.65,.5]}><dodecahedronGeometry args={[.22,0]} /><meshPhysicalMaterial color={String(c)} roughness={.62}/></mesh>)}
</group>}
export default ClimbingWall
