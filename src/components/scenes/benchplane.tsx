function BenchPlane(){return <group rotation={[.12,-.45,.02]} position={[0,-.28,0]}>
  <mesh><boxGeometry args={[3.35,.35,1.15]} /><meshPhysicalMaterial color="#555b5d" metalness={.88} roughness={.23}/></mesh>
  <mesh position={[0,.32,0]} rotation={[0,0,-.38]}><boxGeometry args={[1.25,.65,.72]} /><meshPhysicalMaterial color="#7c5740" roughness={.52}/></mesh>
  <mesh position={[-.9,.58,0]} rotation={[0,0,-.18]}><torusGeometry args={[.42,.12,20,48,Math.PI*1.55]} /><meshPhysicalMaterial color="#6e4935" roughness={.55}/></mesh>
  <mesh position={[1.0,.68,0]} rotation={[0,0,.25]}><cylinderGeometry args={[.22,.3,.52,32]} /><meshPhysicalMaterial color="#704b37" roughness={.5}/></mesh>
  <mesh position={[.1,.12,.61]} rotation={[0,0,-.37]}><boxGeometry args={[.9,.06,.28]} /><meshPhysicalMaterial color="#b9bdbe" metalness={1} roughness={.15}/></mesh>
</group>}
export default BenchPlane
