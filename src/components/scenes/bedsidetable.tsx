import { RoundedBox } from '@react-three/drei'
function BedsideTable(){return <group rotation={[.04,-.38,0]} position={[0,-.45,0]}>
  <RoundedBox args={[1.8,1.35,1.35]} radius={.12} smoothness={4}><meshPhysicalMaterial color="#d8d0c2" roughness={.5}/></RoundedBox>
  <RoundedBox args={[1.52,.47,1.22]} radius={.06} smoothness={3} position={[0,.3,.08]}><meshPhysicalMaterial color="#b5a994" roughness={.52}/></RoundedBox>
  <mesh position={[0,.3,.71]}><boxGeometry args={[.34,.035,.025]} /><meshPhysicalMaterial color="#80705a" metalness={.42} roughness={.3}/></mesh>
  {[-.65,.65].flatMap(x=>[-.65,.65].map(z=><mesh key={`${x}-${z}`} position={[x,-.95,z]}><cylinderGeometry args={[.05,.065,.58,20]} /><meshPhysicalMaterial color="#333638" metalness={.78} roughness={.25}/></mesh>))}
</group>}
export default BedsideTable
