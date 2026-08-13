import { RoundedBox } from '@react-three/drei'
function MediaSideboard(){return <group rotation={[.06,-.32,0]} position={[0,-.42,0]}>
  <RoundedBox args={[3.45,1.25,1.05]} radius={.08} smoothness={3}><meshPhysicalMaterial color="#85694f" roughness={.48}/></RoundedBox>
  {[-1.1,0,1.1].map((x,i)=><mesh key={x} position={[x,.04,.535]}><boxGeometry args={[.015,1.02,.018]} /><meshBasicMaterial color="#5b4636" /></mesh>)}
  {[-1,1].map(x=><mesh key={x} position={[x*.92,.04,.55]}><boxGeometry args={[.32,.025,.02]} /><meshPhysicalMaterial color="#b8a484" metalness={.45} roughness={.3}/></mesh>)}
  {[-1.35,1.35].map(x=><mesh key={x} position={[x,-.82,0]}><boxGeometry args={[.1,.55,.78]} /><meshPhysicalMaterial color="#252829" metalness={.72} roughness={.27}/></mesh>)}
</group>}
export default MediaSideboard
