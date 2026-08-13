import { CurvedBox } from '../geometry/CurvedBox'
function LoungeOttoman(){return <group position={[0,-.7,0]} rotation={[.02,-.4,0]}>
  <CurvedBox args={[2.3,.78,1.48]} radius={.28} smoothness={8}><meshPhysicalMaterial color="#b9a68e" roughness={.62} sheen={.36} sheenColor="#ead8bf" /></CurvedBox>
  <CurvedBox args={[2.06,.2,1.25]} radius={.18} smoothness={6} position={[0,.45,0]}><meshPhysicalMaterial color="#c7b59e" roughness={.58} sheen={.3}/></CurvedBox>
  {[-.82,.82].flatMap(x=>[-.46,.46].map(z=><mesh key={`${x}-${z}`} position={[x,-.57,z]}><cylinderGeometry args={[.055,.065,.36,18]} /><meshPhysicalMaterial color="#5a4b3e" metalness={.28} roughness={.45}/></mesh>))}
  <mesh position={[0,-.86,0]}><boxGeometry args={[2.85,.06,1.9]} /><meshPhysicalMaterial color="#b5afa5" roughness={.82}/></mesh>
</group>}
export default LoungeOttoman
