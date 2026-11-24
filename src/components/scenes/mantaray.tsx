import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const tau=Math.PI*2
const fract=(x:number)=>x-Math.floor(x)
const noise=(x:number,y:number)=>fract(Math.sin(x*127.1+y*311.7)*43758.5453)
const dorsal=new THREE.Color('#35464b'),edge=new THREE.Color('#64787b'),ventral=new THREE.Color('#d4d9ca')
/** One connected, closed-section body: swept triangular pectoral wings,
 * thick central disc and thin outer margins. Spanwise sections specify
 * leading edge, trailing edge and local thickness. */
const stations=[
  [0,.83,-.82,.235],[.22,.81,-.78,.215],[.42,.72,-.65,.14],
  [.60,.57,-.44,.085],[.79,.29,-.18,.038],[.92,.02,-.13,.013],[1,-.19,-.19,.002]
]
function profile(x:number){
  const t=Math.min(1,Math.abs(x)/2.05)
  let i=0;while(i<stations.length-2&&t>stations[i+1][0])i++
  const a=stations[i],b=stations[i+1],u=(t-a[0])/(b[0]-a[0])
  return [1,2,3].map(k=>THREE.MathUtils.lerp(a[k],b[k],u))
}
function rayGeometry(){
  const rows=72,cols=40,positions:number[]=[],colors:number[]=[],uv:number[]=[],indices:number[]=[]
  for(let i=0;i<=rows;i++){
    const x=(i/rows*2-1)*2.05,[lead,trail,h]=profile(x),span=Math.abs(x)/2.05
    for(let j=0;j<=cols;j++){
      const a=j/cols*tau,chord=(1+Math.cos(a))*.5
      const z=THREE.MathUtils.lerp(trail,lead,chord)
      const y=Math.sin(a)*h*(.76+.24*Math.sin(chord*Math.PI))+.13*span**3
      positions.push(x,y,z)
      const upper=Math.sin(a)>=0
      const c=upper?dorsal.clone().lerp(edge,.13*span+.12*chord):ventral.clone().lerp(edge,.20*span+.12*(1-chord))
      if(!upper&&span>.78)c.lerp(dorsal,(span-.78)*3.0)
      if(upper&&span<.28&&chord>.62)c.lerp(edge,.16)
      c.multiplyScalar(.96+.07*noise(i,j))
      colors.push(c.r,c.g,c.b);uv.push(i/rows,j/cols)
    }
  }
  for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const a=i*(cols+1)+j,b=a+cols+1;indices.push(a,b,a+1,a+1,b,b+1)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();return g
}
function taperedTube(points:THREE.Vector3[],r0:number,r1:number){
  const curve=new THREE.CatmullRomCurve3(points),rows=36,cols=10,frames=curve.computeFrenetFrames(rows,false),p:number[]=[],indices:number[]=[]
  for(let i=0;i<=rows;i++){const t=i/rows,c=curve.getPointAt(t),r=THREE.MathUtils.lerp(r0,r1,t**.7)
    for(let j=0;j<=cols;j++){const a=j/cols*tau,q=c.clone().addScaledVector(frames.normals[i],r*Math.cos(a)).addScaledVector(frames.binormals[i],r*Math.sin(a));p.push(q.x,q.y,q.z)}}
  for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const a=i*(cols+1)+j,b=a+cols+1;indices.push(a,a+1,b,a+1,b+1,b)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setIndex(indices);g.computeVertexNormals();return g
}
export default function MantaRay(){
  const root=useRef<THREE.Group>(null)
  const data=useMemo(()=>{
    const body=rayGeometry()
    return {body,base:Float32Array.from(body.getAttribute('position').array),tail:taperedTube([new THREE.Vector3(0,-.015,-.71),new THREE.Vector3(.025,-.04,-1.15),new THREE.Vector3(.14,.01,-1.72),new THREE.Vector3(.27,.04,-2.22)],.047,.003),lobes:[-1,1].map(s=>taperedTube([new THREE.Vector3(s*.27,.02,.69),new THREE.Vector3(s*.34,-.035,.91),new THREE.Vector3(s*.29,-.015,1.12)],.085,.022))}
  },[])
  useEffect(()=>()=>{data.body.dispose();data.tail.dispose();data.lobes.forEach(g=>g.dispose())},[data])
  useFrame(({clock})=>{
    const t=clock.elapsedTime,attr=data.body.getAttribute('position')
    for(let i=0;i<attr.count;i++){const x=data.base[i*3],y=data.base[i*3+1],z=data.base[i*3+2];attr.setY(i,y+Math.pow(Math.abs(x)/2.05,2.4)*.19*Math.sin(t*1.45-Math.abs(x)*1.2+z*.35))}
    attr.needsUpdate=true;data.body.computeVertexNormals()
    if(root.current)root.current.rotation.z=.28+.035*Math.sin(t*.65)
  })
  return <group ref={root} rotation={[.82,-.32,.28]} scale={.84}>
    <mesh geometry={data.body}><meshPhysicalMaterial vertexColors roughness={.64} clearcoat={.14} side={THREE.DoubleSide}/></mesh>
    <mesh geometry={data.tail}><meshStandardMaterial color="#3d5055" roughness={.68} side={THREE.DoubleSide}/></mesh>
    {data.lobes.map((g,i)=><mesh key={i} geometry={g}><meshPhysicalMaterial color="#536a6b" roughness={.67} side={THREE.DoubleSide}/></mesh>)}
    <mesh position={[0,-.015,.783]} scale={[.23,.025,.09]}><sphereGeometry args={[1,30,16]}/><meshStandardMaterial color="#182528" roughness={.9}/></mesh>
    {[-1,1].map(s=><group key={s}>
      <mesh position={[s*.39,.085,.68]} scale={[.052,.044,.045]}><sphereGeometry args={[1,20,14]}/><meshPhysicalMaterial color="#131d1e" roughness={.19}/></mesh>
      <mesh position={[s*.39,.105,.695]} scale={.009}><sphereGeometry args={[1,10,8]}/><meshBasicMaterial color="#bfcac7"/></mesh>
      {Array.from({length:5},(_,i)=><mesh key={i} position={[s*(.17+i*.028),-.18+i*.013,.38-i*.087]} rotation={[0,s*.25,0]} scale={[.085,.007,.012]}><sphereGeometry args={[1,12,6]}/><meshStandardMaterial color="#66726d" roughness={.9}/></mesh>)}
    </group>)}
    <mesh position={[0,.09,-.66]} rotation={[.23,0,0]} scale={[.055,.15,.19]}><sphereGeometry args={[1,24,14]}/><meshStandardMaterial color="#35494e" roughness={.7}/></mesh>
  </group>
}
