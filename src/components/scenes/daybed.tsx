import { RoundedBox } from '@react-three/drei'

function Daybed(){
  return <group position={[0,-.72,0]} rotation={[0,-.35,0]}>
    <RoundedBox args={[3.35,.42,1.45]} radius={.2} smoothness={7} position={[0,.68,0]}><meshPhysicalMaterial color="#c4b49f" roughness={.82}/></RoundedBox>
    <RoundedBox args={[3.08,.12,1.2]} radius={.07} smoothness={5} position={[0,.38,0]}><meshStandardMaterial color="#7b654e" roughness={.62}/></RoundedBox>
    {[-1.28,1.28].map(x=>[-.48,.48].map(z=><group key={`${x}-${z}`} position={[x,.13,z]}>
      <mesh><cylinderGeometry args={[.07,.07,.5,28]}/><meshPhysicalMaterial color="#343637" metalness={.72} roughness={.27}/></mesh>
      <mesh position={[0,-.25,0]}><cylinderGeometry args={[.11,.11,.04,28]}/><meshStandardMaterial color="#1d1f20" roughness={.5}/></mesh>
    </group>))}
    {[[-1.22,.95,.42],[1.18,.92,-.36],[.2,.92,.3]].map((p,i)=><RoundedBox key={i} args={[.72,.23,.72]} radius={.12} smoothness={6} position={p as [number,number,number]} rotation={[0,i*.32,0]}><meshPhysicalMaterial color={i===1?'#8c6f5b':'#d2c7b8'} roughness={.86}/></RoundedBox>)}
  </group>
}
export default Daybed
