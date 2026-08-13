function ModularBookcase(){const cells=[-1.05,-.35,.35,1.05];return <group position={[0,-.45,0]} rotation={[.02,-.36,0]}>
  {[-1.4,1.4].map(x=><mesh key={x} position={[x,.5,0]}><boxGeometry args={[.12,3.25,.56]} /><meshPhysicalMaterial color="#6b523e" roughness={.52}/></mesh>)}
  {[-1.05,-.35,.35,1.05,1.75].map(y=><mesh key={y} position={[0,y,0]}><boxGeometry args={[2.92,.1,.58]} /><meshPhysicalMaterial color="#6b523e" roughness={.52}/></mesh>)}
  {cells.flatMap((y,row)=>Array.from({length:row%2?4:3},(_,i)=>{const x=-.95+i*.58+(row%2?.12:0);const h=.42+((i+row)%3)*.08;return <mesh key={`${row}-${i}`} position={[x,y+.28,0]}><boxGeometry args={[.16,h,.42]} /><meshPhysicalMaterial color={['#8b6551','#c19b66','#3d5554','#a95f4f'][(i+row)%4]} roughness={.58}/></mesh>}))}
  <mesh position={[.85,.58,.05]}><sphereGeometry args={[.25,36,24]} /><meshPhysicalMaterial color="#d4c3a3" roughness={.42}/></mesh>
</group>}
export default ModularBookcase
