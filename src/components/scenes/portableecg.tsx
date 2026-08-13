import { CurvedBox } from '../geometry/CurvedBox'
import { useMemo } from 'react'
import * as THREE from 'three'
function PortableECG(){const leads=useMemo(()=>[-.55,0,.55].map((x,i)=>new THREE.CatmullRomCurve3([new THREE.Vector3(x,-.42,.35),new THREE.Vector3(x*.9,-.85,.45-i*.12),new THREE.Vector3(x*1.4,-1.15,.2-i*.2),new THREE.Vector3(x*1.65,-1.35,-.2)])),[]);return <group position={[0,-.15,0]} rotation={[0,-.34,0]}>
  <CurvedBox args={[2.05,1.25,.55]} radius={.16} smoothness={5}><meshStandardMaterial color="#e0e1de" roughness={.38}/></CurvedBox><mesh position={[-.25,.12,.29]}><planeGeometry args={[1.1,.48]}/><meshBasicMaterial color="#365d58"/></mesh><mesh position={[.67,-.12,.3]}><circleGeometry args={[.12,28]}/><meshBasicMaterial color="#6ba68f"/></mesh>
  {leads.map((c,i)=><mesh key={i}><tubeGeometry args={[c,44,.025,8,false]}/><meshStandardMaterial color={['#c95d52','#e0b35b','#6d9e74'][i]} roughness={.52}/></mesh>)}
</group>} export default PortableECG
