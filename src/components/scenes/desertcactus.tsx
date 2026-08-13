function DesertCactus(){return <group position={[0,-.72,0]} rotation={[.02,-.36,0]}>
  <mesh position={[0,.62,0]}><capsuleGeometry args={[.32,1.9,12,32]} /><meshPhysicalMaterial color="#4f775f" roughness={.7}/></mesh>
  <mesh position={[-.55,.52,0]} rotation={[0,0,-.7]}><capsuleGeometry args={[.2,.82,10,24]} /><meshPhysicalMaterial color="#537b62" roughness={.7}/></mesh>
  <mesh position={[-.85,.86,0]}><capsuleGeometry args={[.19,.65,10,24]} /><meshPhysicalMaterial color="#537b62" roughness={.7}/></mesh>
  <mesh position={[.58,.18,.02]} rotation={[0,0,.72]}><capsuleGeometry args={[.18,.72,10,24]} /><meshPhysicalMaterial color="#4e735c" roughness={.7}/></mesh>
  <mesh position={[.85,.48,.02]}><capsuleGeometry args={[.18,.54,10,24]} /><meshPhysicalMaterial color="#4e735c" roughness={.7}/></mesh>
  {Array.from({length:18},(_,i)=>{const a=i/18*Math.PI*2;return <mesh key={i} position={[Math.cos(a)*.28,.1+(i%6)*.28,Math.sin(a)*.28]} rotation={[0,a,Math.PI/2]}><coneGeometry args={[.012,.12,8]} /><meshPhysicalMaterial color="#ded2aa" roughness={.72}/></mesh>})}
  <mesh position={[0,-.9,0]}><cylinderGeometry args={[.68,.58,.38,48]} /><meshPhysicalMaterial color="#8b735e" roughness={.74}/></mesh>
</group>}
export default DesertCactus
