function PerformanceSurfboard(){return <group rotation={[.12,-.38,-.1]}>
  <mesh scale={[.58,1.7,.1]}><capsuleGeometry args={[.72,1.9,18,48]} /><meshPhysicalMaterial color="#e9e5dc" roughness={.32} clearcoat={.75}/></mesh>
  <mesh position={[0,.1,.11]} scale={[.31,1.34,1]}><capsuleGeometry args={[.72,1.9,14,36]} /><meshBasicMaterial color="#315d70" /></mesh>
  <mesh position={[0,-1.72,-.18]} rotation={[.15,0,0]}><boxGeometry args={[.08,.5,.46]} /><meshPhysicalMaterial color="#252a2c" roughness={.45}/></mesh>
  {[-.24,.24].map(x=><mesh key={x} position={[x,-1.62,-.16]} rotation={[.1,0,x*.5]}><boxGeometry args={[.07,.45,.35]} /><meshPhysicalMaterial color="#252a2c" roughness={.45}/></mesh>)}
</group>}
export default PerformanceSurfboard
