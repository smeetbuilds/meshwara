import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
function InfusionPump(){return <group position={[0,-.7,0]} rotation={[0,-.34,0]}>
  <mesh position={[0,-.15,0]}><cylinderGeometry args={[.055,.055,2.35,20]} /><meshPhysicalMaterial color="#9da5a8" metalness={.86} roughness={.22} /></mesh>
  <mesh position={[0,-1.27,0]}><cylinderGeometry args={[.42,.5,.12,40]} /><meshPhysicalMaterial color="#51595c" metalness={.65} roughness={.34} /></mesh>
  <RoundedBox args={[.82,1.0,.34]} radius={.12} smoothness={7} position={[.48,.25,0]}><meshPhysicalMaterial color="#e1e5e4" roughness={.28} clearcoat={.28} /></RoundedBox>
  <mesh position={[.48,.45,.18]}><planeGeometry args={[.55,.26]} /><meshBasicMaterial color="#79d9d0" toneMapped={false} /></mesh>
  {[-.14,.08,.3].map(y=><mesh key={y} position={[.48,y,.19]}><boxGeometry args={[.4,.035,.02]} /><meshPhysicalMaterial color="#879093" roughness={.4} /></mesh>)}
  <group position={[-.32,.75,0]}><mesh><boxGeometry args={[.55,.78,.18]} /><MeshTransmissionMaterial transmission={.88} thickness={.1} roughness={.1} ior={1.45} color="#cce7e4" /></mesh><mesh position={[0,-.34,.12]}><cylinderGeometry args={[.04,.04,.18,18]} /><meshPhysicalMaterial color="#90999b" metalness={.55} roughness={.3} /></mesh></group>
  <mesh position={[-.32,.03,.08]}><cylinderGeometry args={[.018,.018,1.15,12]} /><meshPhysicalMaterial color="#d8e3e1" roughness={.24} /></mesh>
</group>}
export default InfusionPump
