import { useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { CurvedBox } from '../geometry/CurvedBox'

/** Original clinical instrument visualization. The viewing lens, illuminated
 * channel and hollow speculum share one optical axis. Not a medical device. */
const tau=Math.PI*2
const metal='#aeb9bf',polymer='#30383d'
const gripRings=Array.from({length:24},(_,i)=>-.88+i*.047)
const speculum: [number,number][]=[
 [.228,0],[.242,.035],[.231,.071],[.205,.13],[.17,.24],[.115,.39],
 [.073,.52],[.061,.58],[.052,.584],[.043,.575],[.053,.515],[.095,.385],
 [.15,.235],[.188,.12],[.201,.045],[.205,0],[.228,0]
]
function ring(profile:[number,number][]){
 const g=new THREE.LatheGeometry(profile.map(([r,y])=>new THREE.Vector2(r,y)),80)
 g.rotateX(-Math.PI/2);return g
}
function knurlMap(){
 const w=256,h=128,data=new Uint8Array(w*h*4)
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){
  const u=x/w,v=y/h
  const diamond=Math.pow(Math.abs(Math.sin(tau*(u*44+v*16))*Math.sin(tau*(u*44-v*16))),.6)
  const grain=Math.sin(x*12.9898+y*78.233)*43758.5453
  const value=Math.round(90+120*diamond+13*(grain-Math.floor(grain)))
  const i=(y*w+x)*4;data[i]=data[i+1]=data[i+2]=value;data[i+3]=255
 }
 const t=new THREE.DataTexture(data,w,h,THREE.RGBAFormat);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.minFilter=THREE.LinearMipmapLinearFilter;t.magFilter=THREE.LinearFilter;t.generateMipmaps=true;t.needsUpdate=true;return t
}
function Selector(){
 return <group position={[.192,.22,.025]} rotation={[0,0,-Math.PI/2]}>
  <mesh><cylinderGeometry args={[.086,.086,.044,36]}/><meshPhysicalMaterial color="#5d696f" roughness={.43} metalness={.6}/></mesh>
  {Array.from({length:16},(_,i)=>{
   const a=i*tau/16
   return <mesh key={i} position={[Math.cos(a)*.084,0,Math.sin(a)*.084]} rotation={[0,-a,0]}>
    <boxGeometry args={[.006,.035,.011]}/><meshStandardMaterial color="#343c40" roughness={.68}/>
   </mesh>
  })}
 </group>
}
export default function ClinicalOtoscope(){
 const data=useMemo(()=>({
  tip:ring(speculum),collar:ring([[.174,0],[.252,0],[.26,.025],[.26,.095],[.235,.12],[.174,.12],[.174,0]]),
  housing:ring([[.153,0],[.256,0],[.277,.025],[.284,.19],[.266,.31],[.245,.36],[.155,.36],[.153,0]]),
  eyepiece:ring([[.153,0],[.228,0],[.238,.026],[.238,.079],[.213,.102],[.153,.102],[.153,0]]),
  socket:ring([[.211,0],[.34,0],[.34,.115],[.235,.15],[.211,.15],[.211,0]]),
  knurl:knurlMap()
 }),[])
 useEffect(()=>()=>Object.values(data).forEach(x=>x.dispose()),[data])
 return <group rotation={[.05,-.72,-.07]} position={[0,-.18,0]} scale={1.02}>
  <mesh position={[0,-.37,0]} castShadow receiveShadow>
   <cylinderGeometry args={[.195,.216,1.27,64]}/><meshPhysicalMaterial color={polymer} bumpMap={data.knurl} bumpScale={.018} roughness={.73} metalness={.08}/>
  </mesh>
  {gripRings.map(y=><mesh key={y} position={[0,y,0]} rotation={[Math.PI/2,0,0]}>
   <torusGeometry args={[.207-(y+.88)*.014,.003,5,64]}/><meshStandardMaterial color="#252e33" roughness={.78}/>
  </mesh>)}
  {[-1.03,.287].map(y=><mesh key={y} position={[0,y,0]}>
   <cylinderGeometry args={[.216,.216,.055,64]}/><meshPhysicalMaterial color={metal} roughness={.33} metalness={.78}/>
  </mesh>)}
  <mesh position={[0,.405,0]}><cylinderGeometry args={[.15,.182,.22,48]}/><meshPhysicalMaterial color="#747f85" roughness={.36} metalness={.68}/></mesh>
  <Selector/>
  {/* Head axis local -Z: viewer lens behind, patient tip in front. */}
  <group position={[0,.742,0]} rotation={[.075,0,0]}>
   <mesh geometry={data.housing} position={[0,0,.18]} castShadow><meshPhysicalMaterial color="#56636a" metalness={.42} roughness={.37} side={THREE.DoubleSide}/></mesh>
   <mesh geometry={data.eyepiece} position={[0,0,.197]} rotation={[0,Math.PI,0]}><meshPhysicalMaterial color={polymer} roughness={.57} side={THREE.DoubleSide}/></mesh>
   <mesh position={[0,0,.295]} scale={[.152,.152,.024]}>
    <sphereGeometry args={[1,56,32]}/><meshPhysicalMaterial color="#81acb2" roughness={.095} metalness={.05} transmission={.77} thickness={.045} ior={1.49} clearcoat={.6}/>
   </mesh>
   <mesh position={[0,0,.19]}><circleGeometry args={[.15,56]}/><meshStandardMaterial color="#24383e" roughness={.54}/></mesh>
   <mesh geometry={data.collar} position={[0,0,-.13]}><meshPhysicalMaterial color={metal} roughness={.31} metalness={.78} side={THREE.DoubleSide}/></mesh>
   <mesh geometry={data.tip} position={[0,0,-.243]} castShadow>
    <meshPhysicalMaterial color="#20262a" roughness={.71} metalness={.06} side={THREE.DoubleSide}/>
   </mesh>
   {[0,1,2,3,4,5].map(i=>{
    const a=i*tau/6
    return <mesh key={i} position={[Math.cos(a)*.165,Math.sin(a)*.165,-.227]}>
     <sphereGeometry args={[.012,12,8]}/><meshPhysicalMaterial color="#d8e4de" emissive="#b5d0ca" emissiveIntensity={.15} roughness={.27}/>
    </mesh>
   })}
   <mesh position={[0,0,-.825]}><torusGeometry args={[.048,.005,8,48]}/><meshStandardMaterial color="#333a3e" roughness={.75}/></mesh>
  </group>
  {/* Dock cup sits immediately below the handle; no disconnected cable. */}
  <CurvedBox args={[.88,.16,.84]} radius={.075} smoothness={6} position={[0,-1.19,0]} castShadow>
   <meshPhysicalMaterial color="#c6cbca" roughness={.48} metalness={.13}/>
  </CurvedBox>
  <mesh geometry={data.socket} rotation={[Math.PI/2,0,0]} position={[0,-1.112,0]}>
   <meshPhysicalMaterial color="#424d53" roughness={.63} side={THREE.DoubleSide}/>
  </mesh>
  <mesh position={[.285,-1.10,.25]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.026,20]}/><meshStandardMaterial color="#92b7a6" emissive="#59a883" emissiveIntensity={.35}/></mesh>
 </group>
}
