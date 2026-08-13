function OlympicDumbbell(){return <group rotation={[.18,-.4,Math.PI/2]}>
  <mesh><cylinderGeometry args={[.12,.12,2.6,32]} /><meshPhysicalMaterial color="#adb2b4" metalness={1} roughness={.18}/></mesh>
  {[-1,1].map(side=><group key={side} position={[0,side*1.18,0]}>{[0,.14,.28].map((offset,i)=><mesh key={offset} position={[0,side*offset,0]}><cylinderGeometry args={[.58-i*.08,.58-i*.08,.13,48]} /><meshPhysicalMaterial color={i===0?'#242728':i===1?'#3b3e3f':'#161819'} metalness={.45} roughness={.36}/></mesh>)}</group>)}
  {Array.from({length:18},(_,i)=><mesh key={i} position={[0,-.52+i*.061,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.125,.006,6,20]} /><meshBasicMaterial color="#5e6365" /></mesh>)}
</group>}
export default OlympicDumbbell
