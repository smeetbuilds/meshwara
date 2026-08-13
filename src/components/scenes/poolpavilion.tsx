function PoolPavilion(){return <group rotation={[0,-.35,0]} position={[0,-.6,0]}>
  <mesh position={[0,-.84,0]}><boxGeometry args={[4.0,.12,2.7]} /><meshPhysicalMaterial color="#d9d4c9" roughness={.78}/></mesh>
  <mesh position={[-.85,-.72,.1]}><boxGeometry args={[1.75,.05,1.18]} /><meshPhysicalMaterial color="#739da3" roughness={.15} metalness={.1} clearcoat={.9}/></mesh>
  <mesh position={[.85,.72,0]}><boxGeometry args={[2.0,.12,2.45]} /><meshPhysicalMaterial color="#b9b1a4" roughness={.52}/></mesh>
  {[[.02,.15,-1.02],[1.68,.15,-1.02],[.02,.15,1.02],[1.68,.15,1.02]].map((p,i)=><mesh key={i} position={p as [number,number,number]}><boxGeometry args={[.09,1.38,.09]} /><meshPhysicalMaterial color="#3b4041" metalness={.75} roughness={.25}/></mesh>)}
  <mesh position={[.85,1.45,0]}><boxGeometry args={[2.1,.1,2.55]} /><meshPhysicalMaterial color="#3a3e3f" metalness={.48} roughness={.26}/></mesh>
  <mesh position={[.88,.12,0]}><boxGeometry args={[1.62,1.15,.06]} /><meshPhysicalMaterial color="#d8c6a3" roughness={.45}/></mesh>
</group>}
export default PoolPavilion
