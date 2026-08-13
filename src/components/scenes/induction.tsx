import { RoundedBox } from '@react-three/drei'
function InductionCooktop(){return <group position={[0,-.72,0]} rotation={[.04,-.36,0]}>
  <RoundedBox args={[3.0,.14,2.0]} radius={.12} smoothness={6} position={[0,-.62,0]}><meshPhysicalMaterial color="#111517" metalness={.62} roughness={.18} clearcoat={.8} /></RoundedBox>
  {[{p:[-.75,-.15,.54] as [number,number,number],r:.46},{p:[.65,-.15,.48] as [number,number,number],r:.42},{p:[-.68,-.15,-.55] as [number,number,number],r:.4},{p:[.72,-.15,-.48] as [number,number,number],r:.36}].map(({p,r},i)=><group key={i} position={p} rotation={[Math.PI/2,0,0]}><mesh><torusGeometry args={[r,.018,10,64]} /><meshBasicMaterial color={i===1?'#ff6a47':'#777f82'} toneMapped={false} /></mesh></group>)}
  <group position={[.62,.28,-.42]}><mesh><cylinderGeometry args={[.56,.5,.28,56]} /><meshPhysicalMaterial color="#41484b" metalness={.82} roughness={.22} /></mesh><mesh position={[0,.17,0]}><cylinderGeometry args={[.5,.5,.08,56]} /><meshPhysicalMaterial color="#a3a8aa" metalness={.88} roughness={.2} /></mesh><mesh position={[.78,.02,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.07,.07,1.2,24]} /><meshPhysicalMaterial color="#33393b" roughness={.36} /></mesh></group>
  <mesh position={[0,-.53,1.03]}><boxGeometry args={[.72,.025,.025]} /><meshBasicMaterial color="#80e3da" toneMapped={false} /></mesh>
</group>}
export default InductionCooktop
