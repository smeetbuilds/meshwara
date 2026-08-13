function DigitalCaliper(){return <group rotation={[.18,-.28,-.16]}>
  <mesh><boxGeometry args={[.16,3.7,.12]} /><meshPhysicalMaterial color="#9fa4a5" metalness={.92} roughness={.2}/></mesh>
  <group position={[0,1.55,0]}><mesh position={[-.32,0,0]}><boxGeometry args={[.62,.18,.18]} /><meshPhysicalMaterial color="#9fa4a5" metalness={.92} roughness={.2}/></mesh><mesh position={[-.56,-.28,0]}><boxGeometry args={[.14,.7,.2]} /><meshPhysicalMaterial color="#9fa4a5" metalness={.92} roughness={.2}/></mesh></group>
  <group position={[0,.45,.02]}><mesh><boxGeometry args={[1.15,.86,.28]} /><meshPhysicalMaterial color="#2b2e2f" roughness={.34}/></mesh><mesh position={[0,.08,.15]}><boxGeometry args={[.68,.32,.03]} /><meshBasicMaterial color="#a9c39e" /></mesh>{[-.38,0,.38].map(x=><mesh key={x} position={[x,-.28,.16]}><cylinderGeometry args={[.06,.06,.025,20]} /><meshPhysicalMaterial color="#c5c6c2" metalness={.6} roughness={.3}/></mesh>)}</group>
  <group position={[0,-.82,0]}><mesh position={[.32,0,0]}><boxGeometry args={[.62,.16,.18]} /><meshPhysicalMaterial color="#9fa4a5" metalness={.92} roughness={.2}/></mesh><mesh position={[.56,.28,0]}><boxGeometry args={[.14,.7,.2]} /><meshPhysicalMaterial color="#9fa4a5" metalness={.92} roughness={.2}/></mesh></group>
</group>}
export default DigitalCaliper
