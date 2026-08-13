import { RoundedBox } from '@react-three/drei'
function ModularPhone(){return <group rotation={[.12,-.42,-.05]}>
  <RoundedBox args={[1.45,2.8,.18]} radius={.14} smoothness={5}><meshPhysicalMaterial color="#b9bdc1" metalness={.92} roughness={.16} clearcoat={.8}/></RoundedBox>
  <RoundedBox args={[1.34,2.67,.025]} radius={.11} smoothness={4} position={[0,0,.105]}><meshPhysicalMaterial color="#111316" metalness={.18} roughness={.18} clearcoat={.9}/></RoundedBox>
  <mesh position={[0,.22,.126]}><planeGeometry args={[1.22,2.08]} /><meshBasicMaterial color="#20282f" /></mesh>
  <mesh position={[0,-1.02,.132]}><boxGeometry args={[.42,.012,.01]} /><meshBasicMaterial color="#d8d7d1" /></mesh>
  <group position={[-.43,.98,.16]}>{[[0,0],[.42,0],[0,-.42]].map(([x,y],i)=><group key={i} position={[x,y,0]}><mesh><cylinderGeometry args={[.18,.18,.065,48]} /><meshPhysicalMaterial color="#34383c" metalness={.72} roughness={.18}/></mesh><mesh position={[0,0,.038]}><cylinderGeometry args={[.115,.115,.012,48]} /><meshPhysicalMaterial color={i===1?'#24394a':'#161d24'} metalness={.4} roughness={.12} clearcoat={1}/></mesh></group>)}</group>
</group>}
export default ModularPhone
