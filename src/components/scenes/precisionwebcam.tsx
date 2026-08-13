import { RoundedBox } from '@react-three/drei'
function PrecisionWebcam(){return <group position={[0,-.1,0]} rotation={[0,-.36,0]}>
  <RoundedBox args={[2.25,.78,.64]} radius={.27} smoothness={7}><meshPhysicalMaterial color="#33383b" metalness={.7} roughness={.22}/></RoundedBox>
  <group position={[-.42,0,.37]}>{[.31,.24,.18].map((r,i)=><mesh key={r} position={[0,0,i*.065]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[r,r,.08,56]}/><meshPhysicalMaterial color={i===2?'#1a2b34':'#24282b'} metalness={.55} roughness={i===2?.06:.2} clearcoat={1}/></mesh>)}</group>
  <mesh position={[.58,.05,.35]}><circleGeometry args={[.06,24]}/><meshBasicMaterial color="#d8e7e5"/></mesh>
  <group position={[0,-.63,-.12]}><RoundedBox args={[1.25,.18,.72]} radius={.09} smoothness={4}><meshStandardMaterial color="#44494b" roughness={.34}/></RoundedBox><RoundedBox args={[1.1,.1,.55]} radius={.07} smoothness={4} position={[0,-.18,.15]}><meshStandardMaterial color="#2c3032"/></RoundedBox></group>
</group>} export default PrecisionWebcam
