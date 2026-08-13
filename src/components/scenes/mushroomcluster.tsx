function MushroomCluster(){const items=[[-.55,-.4,.1,.55],[-.05,-.25,-.12,.82],[.55,-.38,.08,.62],[.2,-.5,.55,.44],[-.4,-.52,-.48,.38]];return <group position={[0,-.48,0]} rotation={[.02,-.34,0]}>
  {items.map(([x,y,z,s],i)=><group key={i} position={[x,y,z]} scale={s}><mesh position={[0,.7,0]}><cylinderGeometry args={[.16,.24,1.15,24]} /><meshPhysicalMaterial color="#d5c8b5" roughness={.7}/></mesh><mesh position={[0,1.28,0]} scale={[1,.38,1]}><sphereGeometry args={[.72,42,28]} /><meshPhysicalMaterial color={i%2?'#9f775e':'#b58f6e'} roughness={.62}/></mesh></group>)}
  <mesh position={[0,-.72,0]} scale={[1.45,.18,1.1]}><sphereGeometry args={[1,48,26]} /><meshPhysicalMaterial color="#6e675d" roughness={.84}/></mesh>
</group>}
export default MushroomCluster
