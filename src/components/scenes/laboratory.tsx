import { MeshTransmissionMaterial } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
function LaboratoryScene(){return <group position={[0,-.8,0]} rotation={[.03,-.3,0]} scale={.92}>
  <mesh position={[0,-.72,0]}><boxGeometry args={[4.2,.1,3.0]} /><meshPhysicalMaterial color="#bec4c4" roughness={.68} /></mesh><mesh position={[0,.45,-1.42]}><boxGeometry args={[4.1,2.4,.12]} /><meshPhysicalMaterial color="#dfe3e2" roughness={.6} /></mesh>
  <CurvedBox args={[3.25,.18,.85]} radius={.06} smoothness={4} position={[0,-.22,-.5]}><meshPhysicalMaterial color="#70797c" metalness={.35} roughness={.38} /></CurvedBox>
  {[-1.15,1.15].map(x=><group key={x} position={[x,.08,-.42]}><mesh><cylinderGeometry args={[.18,.22,.54,32]} /><MeshTransmissionMaterial transmission={.86} thickness={.12} roughness={.12} ior={1.44} color={x<0?'#7fc8be':'#d3a273'} /></mesh><mesh position={[0,.31,0]}><cylinderGeometry args={[.1,.1,.08,24]} /><meshPhysicalMaterial color="#363d3f" metalness={.62} roughness={.3} /></mesh></group>)}
  <group position={[0,.15,-.48]}><mesh><boxGeometry args={[.58,.68,.35]} /><meshPhysicalMaterial color="#d6dad8" roughness={.3} /></mesh><mesh position={[0,.02,.19]}><planeGeometry args={[.38,.3]} /><meshBasicMaterial color="#78d8d0" toneMapped={false} /></mesh></group>
  <group position={[-.42,.16,-.3]}><mesh><cylinderGeometry args={[.13,.13,.62,30]} /><meshPhysicalMaterial color="#adb4b6" metalness={.7} roughness={.24} /></mesh><mesh position={[.2,.22,0]} rotation={[0,0,-.45]}><cylinderGeometry args={[.08,.08,.52,24]} /><meshPhysicalMaterial color="#ebede8" roughness={.26} /></mesh><mesh position={[.37,.03,0]}><cylinderGeometry args={[.05,.04,.3,20]} /><meshPhysicalMaterial color="#272d2f" roughness={.3} /></mesh></group>
  <CurvedBox args={[.88,.12,.5]} radius={.04} smoothness={4} position={[1.1,-.53,.42]}><meshPhysicalMaterial color="#4d5558" metalness={.55} roughness={.35} /></CurvedBox>
  <spotLight position={[0,2.4,.4]} intensity={2.4} angle={.7} penumbra={.95} color="#eefcff" />
</group>}
export default LaboratoryScene
