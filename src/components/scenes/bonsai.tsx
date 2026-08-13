import { useMemo } from 'react'
import * as THREE from 'three'
function Branch({points,r=.045}:{points:[number,number,number][];r?:number}){const c=useMemo(()=>new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),[points]);return <mesh><tubeGeometry args={[c,48,r,10,false]} /><meshPhysicalMaterial color="#66503d" roughness={.72} /></mesh>}
function BonsaiStudy(){return <group position={[0,-.68,0]} rotation={[0,-.32,0]}>
  <mesh position={[0,-.72,0]}><cylinderGeometry args={[.72,.58,.42,48]} /><meshPhysicalMaterial color="#343536" roughness={.5} /></mesh>
  <Branch points={[[0,-.5,0],[-.08,.15,.03],[.12,.68,-.05],[-.04,1.18,.02]]} r={.075}/><Branch points={[[.04,.48,0],[.52,.72,.08],[.83,.7,.03]]}/><Branch points={[[.02,.78,0],[-.42,1.02,-.05],[-.7,1.05,.04]]}/><Branch points={[[.02,1.02,0],[.3,1.26,.03],[.48,1.42,-.02]]} r={.035}/>
  {[[-.72,1.08,.04,.38],[-.32,1.22,-.05,.42],[.2,1.42,.02,.4],[.68,.82,.04,.38],[.86,.68,.02,.3],[.42,1.22,.05,.34]].map((p,i)=><mesh key={i} position={[p[0],p[1],p[2]] as [number,number,number]} scale={[1.4,.72,1]}><sphereGeometry args={[p[3],28,20]} /><meshPhysicalMaterial color={i%2?'#5d795d':'#6b8765'} roughness={.78} /></mesh>)}
</group>}
export default BonsaiStudy
