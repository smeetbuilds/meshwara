import { CurvedBox } from '../geometry/CurvedBox'
function SignetRing(){return <group rotation={[.35,-.4,.22]}>
  <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.83,.2,28,120]} /><meshPhysicalMaterial color="#d1ad61" metalness={1} roughness={.13} clearcoat={.65} /></mesh>
  <CurvedBox args={[1.02,.34,.72]} radius={.14} smoothness={8} position={[0,.84,0]} rotation={[0,0,.02]}><meshPhysicalMaterial color="#d5b86e" metalness={1} roughness={.12} clearcoat={.7} /></CurvedBox>
  <CurvedBox args={[.7,.035,.43]} radius={.08} smoothness={6} position={[0,1.03,.02]}><meshPhysicalMaterial color="#1c2528" metalness={.72} roughness={.16} /></CurvedBox>
  <mesh position={[0,1.06,.03]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.18,.018,12,48]} /><meshBasicMaterial color="#e4c879" /></mesh>
</group>}
export default SignetRing
