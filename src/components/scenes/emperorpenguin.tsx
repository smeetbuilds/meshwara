function EmperorPenguin(){return <group position={[0,.1,0]} rotation={[0,-.32,0]}>
  <mesh position={[0,0,0]} scale={[.7,1.48,.64]}><sphereGeometry args={[.72,46,30]}/><meshPhysicalMaterial color="#252b2e" roughness={.62}/></mesh>
  <mesh position={[0,.9,0]} scale={[.78,.92,.68]}><sphereGeometry args={[.42,40,28]}/><meshPhysicalMaterial color="#20272a" roughness={.6}/></mesh>
  <mesh position={[0,-.02,.46]} scale={[.72,1.28,.16]}><sphereGeometry args={[.48,38,26]}/><meshPhysicalMaterial color="#e0d8c8" roughness={.74}/></mesh>
  <mesh position={[0,.9,.56]} rotation={[Math.PI/2,0,0]}><coneGeometry args={[.1,.38,20]}/><meshPhysicalMaterial color="#d29a45" roughness={.5}/></mesh>
  {[-.16,.16].map((x)=><mesh key={x} position={[x,1.02,.37]}><sphereGeometry args={[.045,18,12]}/><meshPhysicalMaterial color="#111516" roughness={.18}/></mesh>)}
  {[-.58,.58].map((x)=><mesh key={x} position={[x,.08,0]} rotation={[0,0,x<0?.22:-.22]} scale={[.25,1.28,.46]}><sphereGeometry args={[.34,32,22]}/><meshPhysicalMaterial color="#252b2e" roughness={.66}/></mesh>)}
  {[-.28,.28].map((x)=><mesh key={x} position={[x,-1.02,.18]} scale={[1.0,.28,.6]}><sphereGeometry args={[.16,24,18]}/><meshPhysicalMaterial color="#d0963e" roughness={.56}/></mesh>)}
</group>} export default EmperorPenguin
