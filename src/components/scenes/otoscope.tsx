function ClinicalOtoscope(){return <group position={[0,-.45,0]} rotation={[0,-.4,-.08]}>
  <mesh position={[0,.25,0]}><capsuleGeometry args={[.22,1.25,12,28]}/><meshPhysicalMaterial color="#485157" roughness={.38}/></mesh>
  <mesh position={[0,1.22,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.38,.32,.58,36]}/><meshPhysicalMaterial color="#3d464b" metalness={.38} roughness={.32}/></mesh>
  <mesh position={[.52,1.22,0]} rotation={[0,0,-Math.PI/2]}><coneGeometry args={[.16,.75,28]}/><meshStandardMaterial color="#202426" roughness={.42}/></mesh>
  <mesh position={[-.18,1.22,.31]}><circleGeometry args={[.13,28]}/><meshPhysicalMaterial color="#1c3039" roughness={.08} clearcoat={1}/></mesh>
  <mesh position={[0,-.7,0]}><cylinderGeometry args={[.48,.55,.2,40]}/><meshPhysicalMaterial color="#c5c7c4" roughness={.34}/></mesh>
</group>} export default ClinicalOtoscope
