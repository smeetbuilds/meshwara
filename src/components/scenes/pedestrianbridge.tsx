function PedestrianBridge(){return <group rotation={[.08,-.42,0]} position={[0,-.45,0]}>
  <mesh><boxGeometry args={[3.8,.18,.92]} /><meshPhysicalMaterial color="#b8b6af" roughness={.58}/></mesh>
  {[-1,1].map(side=><group key={side} position={[0,.62,side*.53]}>{Array.from({length:9},(_,i)=><mesh key={i} position={[-1.7+i*.425,0,0]}><cylinderGeometry args={[.025,.025,1.0,12]} /><meshPhysicalMaterial color="#505657" metalness={.75} roughness={.26}/></mesh>)}<mesh position={[0,.5,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.035,.035,3.65,16]} /><meshPhysicalMaterial color="#505657" metalness={.75} roughness={.26}/></mesh></group>)}
  {[-1.55,1.55].map(x=><mesh key={x} position={[x,-.55,0]}><boxGeometry args={[.28,1.0,.7]} /><meshPhysicalMaterial color="#777a77" roughness={.48}/></mesh>)}
  {Array.from({length:10},(_,i)=><mesh key={i} position={[-1.7+i*.38,.12,0]}><boxGeometry args={[.015,.02,.78]} /><meshBasicMaterial color="#8b8780" /></mesh>)}
</group>}
export default PedestrianBridge
