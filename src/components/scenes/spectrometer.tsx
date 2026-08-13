import { RoundedBox } from '@react-three/drei'
function Spectrometer(){return <group rotation={[.08,-.38,0]} position={[0,-.28,0]}>
  <RoundedBox args={[2.75,1.3,1.65]} radius={.16} smoothness={4}><meshPhysicalMaterial color="#e2e0da" roughness={.34}/></RoundedBox>
  <group position={[-.72,.15,.86]}><mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.37,.37,.22,48]} /><meshPhysicalMaterial color="#353a3c" metalness={.72} roughness={.22}/></mesh><mesh position={[0,0,.13]}><circleGeometry args={[.22,48]} /><meshBasicMaterial color="#412f62" /></mesh></group>
  <mesh position={[.6,.18,.86]}><boxGeometry args={[.82,.48,.04]} /><meshBasicMaterial color="#152026" /></mesh>
  {[0,1,2,3].map(i=><mesh key={i} position={[.28+i*.22,-.32,.89]}><cylinderGeometry args={[.055,.055,.045,20]} /><meshPhysicalMaterial color={i===0?'#d86d4b':'#777c7d'} metalness={.45} roughness={.32}/></mesh>)}
  <mesh position={[0,-.75,0]}><boxGeometry args={[2.1,.18,1.3]} /><meshPhysicalMaterial color="#34393a" metalness={.5} roughness={.34}/></mesh>
</group>}
export default Spectrometer
