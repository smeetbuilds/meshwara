import { RoundedBox } from '@react-three/drei'
function OwlStudy(){return <group position={[0,.14,0]} rotation={[0,-.34,0]}>
  <mesh position={[0,-.05,0]} scale={[.82,1.28,.7]}><sphereGeometry args={[.7,48,32]}/><meshPhysicalMaterial color="#736a5e" roughness={.74}/></mesh>
  <mesh position={[0,.78,0]} scale={[1.05,.92,.76]}><sphereGeometry args={[.48,44,30]}/><meshPhysicalMaterial color="#817566" roughness={.7}/></mesh>
  {[-.2,.2].map((x)=><group key={x}><mesh position={[x,.82,.37]} scale={[1.25,1,.35]}><sphereGeometry args={[.2,30,20]}/><meshPhysicalMaterial color="#c4b6a0" roughness={.78}/></mesh><mesh position={[x,.84,.46]}><sphereGeometry args={[.085,24,18]}/><meshPhysicalMaterial color="#121617" roughness={.18}/></mesh></group>)}
  <mesh position={[0,.68,.57]} rotation={[Math.PI/2,0,0]}><coneGeometry args={[.11,.28,20]}/><meshPhysicalMaterial color="#b58f54" roughness={.52}/></mesh>
  {[-.58,.58].map((x)=><mesh key={x} position={[x,.02,0]} scale={[.52,1.18,.78]}><sphereGeometry args={[.38,36,24]}/><meshPhysicalMaterial color="#625b52" roughness={.76}/></mesh>)}
  {[-.2,.2].map((x)=><group key={x}><mesh position={[x,-.86,.12]} scale={[.48,.22,.6]}><sphereGeometry args={[.15,22,16]}/><meshPhysicalMaterial color="#a28453" roughness={.55}/></mesh>{[-.07,0,.07].map((z)=><mesh key={z} position={[x+.16,-.9,.12+z]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.018,.018,.28,12]}/><meshPhysicalMaterial color="#8e713f" roughness={.55}/></mesh>)}</group>)}
  <RoundedBox args={[1.25,.16,.45]} radius={.06} smoothness={4} position={[0,-1.02,0]}><meshPhysicalMaterial color="#665342" roughness={.72}/></RoundedBox>
</group>} export default OwlStudy
