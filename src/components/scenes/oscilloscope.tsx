import { RoundedBox } from '@react-three/drei'
function DigitalOscilloscope(){return <group position={[0,-.4,0]} rotation={[0,-.33,0]}>
  <RoundedBox args={[2.85,1.65,1.28]} radius={.12} smoothness={5}><meshPhysicalMaterial color="#5f6669" metalness={.45} roughness={.35}/></RoundedBox>
  <mesh position={[-.48,.1,.66]}><planeGeometry args={[1.45,.86]}/><meshBasicMaterial color="#15332f"/></mesh>
  {[-.72,-.48,-.24,0,.24,.48,.72].map(x=><mesh key={x} position={[-.48+x*.72,.1,.665]}><planeGeometry args={[.006,.8]}/><meshBasicMaterial color="#2d665c"/></mesh>)}
  {[.48,.72, .96].map((x,i)=><mesh key={x} position={[x,.2,.7]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.12,.12,.09,28]}/><meshPhysicalMaterial color={i===0?'#d7c45d':'#899295'} metalness={.65} roughness={.28}/></mesh>)}
  {[-.98,-.7,-.42].map(x=><mesh key={x} position={[x,-.58,.68]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.065,.065,.07,24]}/><meshStandardMaterial color="#202425"/></mesh>)}
</group>} export default DigitalOscilloscope
