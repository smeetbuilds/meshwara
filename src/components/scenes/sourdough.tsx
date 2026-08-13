function SourdoughLoaf(){return <group position={[0,-.48,0]} rotation={[.18,-.4,-.04]}>
  <mesh rotation={[0,0,-Math.PI/2]} scale={[1.2,.72,.86]}><capsuleGeometry args={[.72,1.2,16,40]} /><meshPhysicalMaterial color="#b97b48" roughness={.72} clearcoat={.04}/></mesh>
  {[-.65,-.2,.25,.7].map((x,i)=><mesh key={i} position={[x,.57,.12]} rotation={[0,.15,-.55]} scale={[.42,.035,.08]}><capsuleGeometry args={[.14,.65,8,18]} /><meshPhysicalMaterial color="#e2b77f" roughness={.68}/></mesh>)}
  <mesh position={[0,-.72,0]}><cylinderGeometry args={[1.35,1.45,.08,64]} /><meshPhysicalMaterial color="#a79d8d" roughness={.84}/></mesh>
</group>}
export default SourdoughLoaf
