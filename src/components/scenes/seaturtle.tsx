function SeaTurtle(){return <group rotation={[.3,-.45,-.06]}>
  <mesh scale={[1.25,.38,1]}><sphereGeometry args={[1,72,48]} /><meshPhysicalMaterial color="#526a5a" roughness={.62} clearcoat={.08}/></mesh>
  <mesh position={[1.18,.02,0]} rotation={[0,0,-Math.PI/2]} scale={[.48,.38,.38]}><capsuleGeometry args={[.3,.44,10,24]} /><meshPhysicalMaterial color="#62796a" roughness={.6}/></mesh>
  {[[.62,-.12,.92,.4],[.62,-.12,-.92,-.4],[-.7,-.12,.82,.65],[-.7,-.12,-.82,-.65]].map((v,i)=><mesh key={i} position={[v[0],v[1],v[2]]} rotation={[0,v[3],0]} scale={[.72,.1,.38]}><capsuleGeometry args={[.3,.72,10,22]} /><meshPhysicalMaterial color="#617568" roughness={.62}/></mesh>)}
  {Array.from({length:10},(_,i)=>{const a=i/10*Math.PI*2;return <mesh key={i} position={[Math.cos(a)*.72,.34,Math.sin(a)*.56]} scale={[.24,.045,.18]}><sphereGeometry args={[1,24,16]} /><meshPhysicalMaterial color={i%2?'#6f8069':'#405b4d'} roughness={.68}/></mesh>})}
  <mesh position={[1.48,.08,.12]}><sphereGeometry args={[.035,16,12]} /><meshBasicMaterial color="#111413" /></mesh><mesh position={[1.48,.08,-.12]}><sphereGeometry args={[.035,16,12]} /><meshBasicMaterial color="#111413" /></mesh>
</group>}
export default SeaTurtle
