import { RoundedBox } from '@react-three/drei'
function NetworkRouter(){return <group rotation={[.12,-.32,0]} position={[0,-.35,0]}>
  <RoundedBox args={[2.85,.58,1.65]} radius={.18} smoothness={4}><meshPhysicalMaterial color="#212526" metalness={.25} roughness={.34}/></RoundedBox>
  {[-1.05,-.35,.35,1.05].map((x,i)=><group key={x} position={[x,.78,-.52]} rotation={[0,0,(i-1.5)*.04]}><mesh><cylinderGeometry args={[.055,.075,1.65,20]} /><meshPhysicalMaterial color="#3b4042" metalness={.5} roughness={.32}/></mesh><mesh position={[0,.83,0]}><sphereGeometry args={[.07,20,20]} /><meshBasicMaterial color="#87918e" /></mesh></group>)}
  {Array.from({length:7},(_,i)=><mesh key={i} position={[-1.02+i*.34,.18,.845]}><sphereGeometry args={[.035,14,14]} /><meshBasicMaterial color={i<5?'#8be39f':'#e9c869'} toneMapped={false}/></mesh>)}
  <mesh position={[0,-.32,.22]}><boxGeometry args={[2.1,.07,.72]} /><meshPhysicalMaterial color="#131617" roughness={.5}/></mesh>
</group>}
export default NetworkRouter
