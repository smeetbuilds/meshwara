import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

const tau=Math.PI*2
const fract=(x:number)=>x-Math.floor(x)
const hash=(x:number,y:number)=>fract(Math.sin(x*127.1+y*311.7)*43758.5453)
function surface(rows:number,cols:number,point:(u:number,v:number)=>THREE.Vector3,shade:(u:number,v:number)=>THREE.Color){
  const xyz:number[]=[],rgb:number[]=[],uv:number[]=[],indices:number[]=[]
  for(let i=0;i<=rows;i++)for(let j=0;j<=cols;j++){
    const u=i/rows,v=j/cols,p=point(u,v),c=shade(u,v)
    xyz.push(p.x,p.y,p.z);rgb.push(c.r,c.g,c.b);uv.push(v,u)
  }
  const stride=cols+1
  for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){
    const a=i*stride+j,b=a+stride
    indices.push(a,b,a+1,a+1,b,b+1)
  }
  const g=new THREE.BufferGeometry()
  g.setAttribute('position',new THREE.Float32BufferAttribute(xyz,3))
  g.setAttribute('color',new THREE.Float32BufferAttribute(rgb,3))
  g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2))
  g.setIndex(indices);g.computeVertexNormals();return g
}
type PetalSpec={length:number;width:number;rise:number;cup:number;outer:boolean}
const petals:PetalSpec[]=[
  {length:.85,width:.205,rise:.24,cup:.105,outer:true},
  {length:.70,width:.16,rise:.39,cup:.105,outer:false},
  {length:.50,width:.105,rise:.49,cup:.065,outer:false},
]
const tip=new THREE.Color('#fff4e9'),base=new THREE.Color('#bd6e91'),pink=new THREE.Color('#e6b1c4')
function petalGeometry(s:PetalSpec){
  return surface(30,16,(u,v)=>{
    const w=v*2-1
    const envelope=Math.pow(Math.sin(Math.PI*u),.72)*(1-.24*u)+.002
    return new THREE.Vector3(w*s.width*envelope,
      s.rise*(.5*u+.5*u*u)+s.cup*w*w*Math.sin(Math.PI*u)+.011*Math.sin(u*18+w*6)*Math.pow(Math.abs(w),3),
      s.length*u)
  },(u,v)=>{
    const c=base.clone().lerp(pink,Math.min(1,u*2.9)).lerp(tip,Math.max(0,(u-.3)/.7)*.88)
    const vein=Math.pow(Math.max(0,Math.cos((v-.5)*40*(.45+.55*u))),18)
    return c.multiplyScalar(.98-.045*vein+.035*hash(u*211,v*121))
  })
}
function padGeometry(radius:number){
  const dark=new THREE.Color('#345b31'),green=new THREE.Color('#65854a'),vein=new THREE.Color('#96a76a')
  const notch=.35
  return surface(33,144,(u,v)=>{
    const a=notch+v*(tau-notch*2)
    const margin=1+.025*Math.sin(a*12)+.014*Math.sin(a*29)
    const r=radius*u*margin
    return new THREE.Vector3(Math.cos(a)*r,.013*Math.sin(a*9)*u*u+.047*Math.pow(u,6),Math.sin(a)*r*.88)
  },(u,v)=>{
    const a=notch+v*(tau-notch*2)
    const main=Math.pow(Math.max(0,Math.cos(a*12)),24)
    const branching=Math.pow(Math.max(0,Math.cos(a*32+u*8)),36)*Math.sin(u*Math.PI)
    const tone=.38+.2*Math.sin(a*4+u*14)+.11*Math.sin(a*17-u*8)
    return dark.clone().lerp(green,Math.max(0,Math.min(1,tone))).lerp(vein,main*.24+branching*.12)
      .multiplyScalar(.97+.055*hash(u*311,v*203))
  })
}
function LilyPad({radius,position,heading}:{radius:number;position:[number,number,number];heading:number}){
  const g=useMemo(()=>padGeometry(radius),[radius])
  useEffect(()=>()=>g.dispose(),[g])
  return <group position={position} rotation={[0,heading,0]}>
    <mesh geometry={g} castShadow receiveShadow><meshPhysicalMaterial vertexColors roughness={.46} clearcoat={.32} clearcoatRoughness={.36} side={THREE.DoubleSide}/></mesh>
    <mesh position={[0,-.025,0]}><sphereGeometry args={[.045,16,10]}/><meshStandardMaterial color="#73854c" roughness={.65}/></mesh>
  </group>
}
function Flower(){
  const gs=useMemo(()=>petals.map(p=>petalGeometry(p)),[])
  useEffect(()=>()=>gs.forEach(g=>g.dispose()),[gs])
  return <group position={[.23,.065,-.07]}>
    {Array.from({length:4},(_,i)=><mesh key={'sepal'+i} position={[0,-.04,0]} rotation={[.16,i*tau/4+.23,0]} geometry={gs[0]} scale={[.75,.65,.89]}>
      <meshPhysicalMaterial color="#537a43" roughness={.67} side={THREE.DoubleSide}/>
    </mesh>)}
    {[11,9,7].map((count,ring)=>Array.from({length:count},(_,i)=>{
      const a=i/count*tau+ring*.27
      const size=.93+.12*hash(i,ring+1)
      return <mesh key={ring+':'+i} geometry={gs[ring]} rotation={[0,a,.045*Math.sin(i*2.9)]} position={[Math.sin(a)*.07,ring*.055,Math.cos(a)*.07]} scale={[size,size,size]}>
        <meshPhysicalMaterial vertexColors roughness={.57} sheen={.26} sheenColor="#f9e8e6" side={THREE.DoubleSide}/>
      </mesh>
    }))}
    <mesh position={[0,.195,0]} scale={[.16,.055,.16]}><sphereGeometry args={[1,32,16]}/><meshStandardMaterial color="#d7a039" roughness={.76}/></mesh>
    {Array.from({length:48},(_,i)=>{
      const a=i*2.399963,r=.033+.165*Math.sqrt((i+.5)/48),h=.105+.10*(r/.20)
      return <group key={i} position={[Math.cos(a)*r,.17,Math.sin(a)*r]} rotation={[0,-a,.25]}>
        <mesh position={[0,h*.5,0]}><cylinderGeometry args={[.008,.013,h,6]}/><meshStandardMaterial color="#e9bb4b" roughness={.74}/></mesh>
        <mesh position={[0,h,0]} scale={[.013,.041,.012]}><sphereGeometry args={[1,10,8]}/><meshStandardMaterial color="#e7a331" roughness={.88}/></mesh>
      </group>
    })}
  </group>
}
export default function WaterLily(){
  return <group rotation={[.22,-.27,.035]}>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.071,0]}>
      <circleGeometry args={[1.65,100]}/>
      <meshPhysicalMaterial color="#5a8982" roughness={.24} metalness={.05} clearcoat={.85} clearcoatRoughness={.16}/>
    </mesh>
    <LilyPad radius={1.00} position={[-.54,0,.08]} heading={.86}/>
    <LilyPad radius={.62} position={[.82,.012,.58]} heading={-1.65}/>
    <Flower/>
    {[.68,1.11,1.44].map((r,i)=><mesh key={r} position={[0,-.062,0]} rotation={[-Math.PI/2,0,0]}>
      <torusGeometry args={[r,.0025,5,96]}/><meshStandardMaterial color="#96b7a9" transparent opacity={.25-i*.04} depthWrite={false} roughness={.35}/>
    </mesh>)}
  </group>
}
