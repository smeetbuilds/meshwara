function StudioMicrophone(){return <group position={[0,-.55,0]} rotation={[.03,-.34,0]}>
  <mesh position={[0,.95,0]} scale={[.64,.86,.64]}><capsuleGeometry args={[.44,.72,14,32]} /><meshPhysicalMaterial color="#a7abad" metalness={.92} roughness={.24}/></mesh>
  <mesh position={[0,.92,0]} scale={[.54,.74,.54]}><capsuleGeometry args={[.44,.72,14,32]} /><meshPhysicalMaterial color="#26292b" metalness={.58} roughness={.35} wireframe/></mesh>
  <mesh position={[0,.02,0]}><cylinderGeometry args={[.34,.34,.78,48]} /><meshPhysicalMaterial color="#373b3d" metalness={.85} roughness={.25}/></mesh>
  <mesh position={[0,-.55,0]}><cylinderGeometry args={[.1,.1,.72,24]} /><meshPhysicalMaterial color="#606669" metalness={.92} roughness={.2}/></mesh>
  <mesh position={[0,-1.08,0]}><cylinderGeometry args={[.72,.9,.16,56]} /><meshPhysicalMaterial color="#26292b" roughness={.38}/></mesh>
  <mesh position={[0,.17,.34]}><circleGeometry args={[.075,24]} /><meshBasicMaterial color="#d26d49" /></mesh>
  {[-1,1].map(side=><mesh key={side} position={[side*.5,.68,0]} rotation={[0,0,side*.28]}><torusGeometry args={[.45,.045,12,42,Math.PI]} /><meshPhysicalMaterial color="#676d70" metalness={.9} roughness={.23}/></mesh>)}
</group>}
export default StudioMicrophone
