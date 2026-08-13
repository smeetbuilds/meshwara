function CraneBird(){return <group position={[0,.28,0]} rotation={[0,-.45,0]}>
  <mesh position={[-.15,.2,0]} scale={[1.3,.68,.58]}><sphereGeometry args={[.5,40,28]}/><meshPhysicalMaterial color="#b7b0a4" roughness={.75}/></mesh>
  <mesh position={[-.22,.26,-.36]} rotation={[0,0,-.12]} scale={[.95,.55,.28]}><sphereGeometry args={[.42,34,24]}/><meshPhysicalMaterial color="#8f8a82" roughness={.76}/></mesh>
  <mesh position={[.42,.9,0]} rotation={[0,0,-.26]}><cylinderGeometry args={[.105,.13,1.5,24]}/><meshPhysicalMaterial color="#a9a295" roughness={.76}/></mesh>
  <mesh position={[.62,1.58,0]} scale={[.82,.66,.56]}><sphereGeometry args={[.25,30,22]}/><meshPhysicalMaterial color="#b9b2a6" roughness={.74}/></mesh>
  <mesh position={[1.18,1.58,0]} rotation={[0,0,Math.PI/2]}><coneGeometry args={[.075,1.0,18]}/><meshPhysicalMaterial color="#b99558" roughness={.54}/></mesh>
  <mesh position={[.72,1.68,.18]}><sphereGeometry args={[.038,16,12]}/><meshPhysicalMaterial color="#16191a" roughness={.18}/></mesh>
  {[-.18,.18].map((z)=><group key={z}><mesh position={[-.28,-.88,z]}><cylinderGeometry args={[.045,.055,1.95,16]}/><meshPhysicalMaterial color="#72695e" roughness={.76}/></mesh>{[-.07,0,.07].map((dz)=><mesh key={dz} position={[-.12,-1.86,z+dz]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.018,.018,.34,10]}/><meshPhysicalMaterial color="#72695e" roughness={.76}/></mesh>)}</group>)}
</group>} export default CraneBird
