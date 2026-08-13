function MatchBasketball(){return <group rotation={[.18,-.28,.08]}>
  <mesh><sphereGeometry args={[1.38,96,64]} /><meshPhysicalMaterial color="#b96733" roughness={.72}/></mesh>
  <mesh rotation={[0,0,0]}><torusGeometry args={[1.385,.022,12,96]} /><meshBasicMaterial color="#2b231f" /></mesh>
  <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[1.385,.022,12,96]} /><meshBasicMaterial color="#2b231f" /></mesh>
  <mesh rotation={[0,Math.PI/2,Math.PI/4]}><torusGeometry args={[1.385,.022,12,96]} /><meshBasicMaterial color="#2b231f" /></mesh>
  <mesh rotation={[0,Math.PI/2,-Math.PI/4]}><torusGeometry args={[1.385,.022,12,96]} /><meshBasicMaterial color="#2b231f" /></mesh>
</group>}
export default MatchBasketball
