import { MeshTransmissionMaterial } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
function MeditationCourtyard(){return <group position={[0,-.82,0]} rotation={[.04,-.28,0]} scale={.92}>
  <mesh position={[0,-.72,0]}><boxGeometry args={[4.1,.1,3.0]} /><meshPhysicalMaterial color="#c9c2b5" roughness={.72} /></mesh>
  <mesh position={[0,.42,-1.44]}><boxGeometry args={[4.05,2.2,.12]} /><meshPhysicalMaterial color="#ded9d0" roughness={.64} /></mesh>
  <mesh position={[-1.95,.2,0]}><boxGeometry args={[.12,1.75,2.9]} /><meshPhysicalMaterial color="#d8d2c9" roughness={.65} /></mesh>
  <CurvedBox args={[1.75,.08,.92]} radius={.06} smoothness={4} position={[.62,-.61,.35]}><MeshTransmissionMaterial transmission={.72} thickness={.1} roughness={.18} ior={1.34} color="#8fb8b4" /></CurvedBox>
  <CurvedBox args={[1.2,.16,.46]} radius={.06} smoothness={5} position={[-.38,-.48,.72]}><meshPhysicalMaterial color="#865f43" roughness={.5} /></CurvedBox>
  <group position={[1.18,-.28,-.45]}><mesh><cylinderGeometry args={[.34,.42,.34,44]} /><meshPhysicalMaterial color="#77736b" roughness={.62} /></mesh><mesh position={[0,.62,0]}><cylinderGeometry args={[.06,.1,.9,20]} /><meshPhysicalMaterial color="#5d4939" roughness={.66} /></mesh>{[[0,.98,0],[-.34,.82,.02],[.31,.83,.05],[0,.76,.3]].map((p,i)=><mesh key={i} position={p as [number,number,number]}><sphereGeometry args={[.31-i*.02,24,18]} /><meshPhysicalMaterial color="#607a62" roughness={.72} /></mesh>)}</group>
  <spotLight position={[.4,2.7,1.2]} intensity={2.2} angle={.62} penumbra={.95} color="#fff0d6" />
</group>}
export default MeditationCourtyard
