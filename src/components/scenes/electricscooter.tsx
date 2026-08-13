function ElectricScooter(){return <group rotation={[0,-.48,0]} position={[0,-.45,0]}>
  {[-1.18,1.18].map(x=><group key={x} position={[x,-.65,0]}><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.42,.09,18,48]} /><meshPhysicalMaterial color="#202425" roughness={.5}/></mesh><mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.08,.08,.14,24]} /><meshPhysicalMaterial color="#7c8182" metalness={.8} roughness={.22}/></mesh></group>)}
  <mesh position={[0,-.55,0]}><boxGeometry args={[2.2,.18,.42]} /><meshPhysicalMaterial color="#3f4848" metalness={.52} roughness={.3}/></mesh>
  <mesh position={[.98,.25,0]} rotation={[0,0,-.12]}><cylinderGeometry args={[.06,.06,1.72,20]} /><meshPhysicalMaterial color="#575f60" metalness={.75} roughness={.25}/></mesh>
  <mesh position={[1.08,1.08,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.05,.05,.72,20]} /><meshPhysicalMaterial color="#34393a" metalness={.68} roughness={.28}/></mesh>
  {[-.34,.34].map(z=><mesh key={z} position={[1.08,1.08,z]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.075,.075,.23,18]} /><meshPhysicalMaterial color="#222627" roughness={.5}/></mesh>)}
  <mesh position={[-.78,-.39,0]}><boxGeometry args={[.6,.15,.38]} /><meshBasicMaterial color="#89c6a4" /></mesh>
</group>}
export default ElectricScooter
