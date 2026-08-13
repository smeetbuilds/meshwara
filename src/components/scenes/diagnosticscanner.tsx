import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
function DiagnosticScanner(){return <group position={[0,-.72,0]} rotation={[0,-.32,0]}>
  <mesh position={[0,.15,-.2]}><torusGeometry args={[1.15,.38,32,120]} /><meshPhysicalMaterial color="#dce1e0" roughness={.27} clearcoat={.35} /></mesh>
  <mesh position={[0,.15,-.16]}><torusGeometry args={[.83,.075,18,96]} /><meshPhysicalMaterial color="#758083" metalness={.66} roughness={.26} /></mesh>
  <mesh position={[0,.15,-.05]}><torusGeometry args={[.69,.035,12,80]} /><meshBasicMaterial color="#7fe7da" toneMapped={false} /></mesh>
  <RoundedBox args={[.82,.18,2.4]} radius={.08} smoothness={5} position={[0,-.88,.72]}><meshPhysicalMaterial color="#eff2f1" roughness={.32} /></RoundedBox>
  <RoundedBox args={[.72,.13,1.75]} radius={.06} smoothness={4} position={[0,-.72,.65]}><meshPhysicalMaterial color="#b8c3c3" roughness={.42} /></RoundedBox>
  <mesh position={[0,-.62,.16]} rotation={[-.05,0,0]}><boxGeometry args={[.56,.04,.7]} /><MeshTransmissionMaterial transmission={.85} thickness={.1} roughness={.12} ior={1.42} /></mesh>
  <mesh position={[1.02,-.48,.6]}><boxGeometry args={[.36,.6,.22]} /><meshPhysicalMaterial color="#333a3c" metalness={.45} roughness={.34} /></mesh>
  <mesh position={[1.02,-.38,.72]}><planeGeometry args={[.22,.15]} /><meshBasicMaterial color="#65d2c6" toneMapped={false} /></mesh>
</group>}
export default DiagnosticScanner
