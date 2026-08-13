function RabbitStudy(){return <group position={[0,.12,0]} rotation={[0,-.35,0]}>
  <mesh position={[-.18,-.12,0]} scale={[.78,1.12,.82]}><sphereGeometry args={[.62,44,30]}/><meshPhysicalMaterial color="#9f8f82" roughness={.76}/></mesh>
  <mesh position={[.35,.64,0]} scale={[.82,.92,.78]}><sphereGeometry args={[.4,40,28]}/><meshPhysicalMaterial color="#aa9a8d" roughness={.74}/></mesh>
  {[-.18,.18].map((z)=><mesh key={z} position={[.28,1.35,z]} rotation={[0,0,z<0?-.08:.08]} scale={[.5,2.15,.36]}><sphereGeometry args={[.18,30,22]}/><meshPhysicalMaterial color="#a39387" roughness={.78}/></mesh>)}
  {[-.16,.16].map((z)=><mesh key={z} position={[.61,.74,z+.23]}><sphereGeometry args={[.052,20,14]}/><meshPhysicalMaterial color="#16191a" roughness={.2}/></mesh>)}
  <mesh position={[.73,.56,.32]}><sphereGeometry args={[.07,22,16]}/><meshPhysicalMaterial color="#8a625e" roughness={.5}/></mesh>
  {[-.3,.3].map((z)=><mesh key={z} position={[-.48,-.67,z]} scale={[1.2,.42,.78]}><sphereGeometry args={[.38,32,22]}/><meshPhysicalMaterial color="#928478" roughness={.78}/></mesh>)}
  {[-.25,.25].map((z)=><mesh key={z} position={[.32,-.62,z]} scale={[.42,1.1,.34]}><sphereGeometry args={[.18,26,18]}/><meshPhysicalMaterial color="#9a8a7d" roughness={.78}/></mesh>)}
  <mesh position={[-.77,.02,-.05]}><sphereGeometry args={[.22,28,20]}/><meshPhysicalMaterial color="#ded4c7" roughness={.8}/></mesh>
</group>} export default RabbitStudy
