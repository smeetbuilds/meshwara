import { RoundedBox } from '@react-three/drei'
function BentoService(){return <group position={[0,-.35,0]} rotation={[.28,-.4,0]}>
  <RoundedBox args={[2.3,.26,1.7]} radius={.18} smoothness={6}><meshPhysicalMaterial color="#343130" roughness={.42}/></RoundedBox>
  {[[-.55,.18,.38,.82,.58], [.56,.18,.38,.82,.58],[-.55,.18,-.43,.82,.58],[.56,.18,-.43,.82,.58]].map((v,i)=><RoundedBox key={i} args={[v[3],.12,v[4]]} radius={.12} smoothness={4} position={[v[0],v[1],v[2]]}><meshPhysicalMaterial color="#dad3c6" roughness={.58}/></RoundedBox>)}
  {Array.from({length:5},(_,i)=><mesh key={i} position={[-.7+i*.13,.34,.38]} scale={[.1,.08,.18]}><sphereGeometry args={[1,24,16]} /><meshPhysicalMaterial color="#e8e1d2" roughness={.56}/></mesh>)}
  <mesh position={[.58,.36,.38]} scale={[.52,.1,.34]}><sphereGeometry args={[1,28,18]} /><meshPhysicalMaterial color="#d66f4e" roughness={.48}/></mesh>
  <mesh position={[-.55,.34,-.43]} scale={[.48,.1,.3]}><sphereGeometry args={[1,28,18]} /><meshPhysicalMaterial color="#66805c" roughness={.56}/></mesh>
  {Array.from({length:4},(_,i)=><mesh key={`g${i}`} position={[.42+i*.12,.34,-.43]}><cylinderGeometry args={[.08,.08,.09,18]} /><meshPhysicalMaterial color="#d7a34d" roughness={.5}/></mesh>)}
  <mesh position={[0,-.28,0]}><boxGeometry args={[2.7,.06,2.05]} /><meshPhysicalMaterial color="#b7b1a7" roughness={.82}/></mesh>
</group>}
export default BentoService
