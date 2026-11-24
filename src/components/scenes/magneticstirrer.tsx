import { useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { CurvedBox } from '../geometry/CurvedBox'

/** Original laboratory equipment visualization, with one continuous glass
 * vessel and independent liquid volume. Not an operational instrument. */
const tau=Math.PI*2
const ink='#303a40'
const beakerProfile:[number,number][]=[
 [0,0],[.345,0],[.390,.009],[.416,.028],[.426,.065],[.431,.20],
 [.438,.70],[.441,.865],[.448,.899],[.446,.913],[.429,.913],
 [.423,.888],[.422,.70],[.414,.20],[.409,.068],[.389,.047],[0,.047]
]
function beakerGeometry(){
 const g=new THREE.LatheGeometry(beakerProfile.map(([r,y])=>new THREE.Vector2(r,y)),96)
 const p=g.getAttribute('position')
 for(let i=0;i<p.count;i++){
  const x=p.getX(i),y=p.getY(i),z=p.getZ(i)
  const a=Math.atan2(x,z),d=Math.atan2(Math.sin(a-1.08),Math.cos(a-1.08))
  // Same local deformation on both glass walls; the pouring lip stays thick.
  const spout=Math.exp(-d*d/.042)*THREE.MathUtils.smoothstep(y,.72,.91)*.085
  p.setXYZ(i,x+Math.sin(a)*spout,y+spout*.16,z+Math.cos(a)*spout)
 }
 g.computeVertexNormals();return g
}
function liquidGeometry(){
 const profile=[[0,.051],[.381,.051],[.403,.061],[.413,.48],[.414,.536],[.409,.545],[.392,.535],[.29,.527],[0,.527]]
 return new THREE.LatheGeometry(profile.map(([r,y])=>new THREE.Vector2(r,y)),96)
}
const digits:Record<string,string[]>={
 '0':['111','101','101','101','111'],'1':['010','110','010','010','111'],
 '2':['111','001','111','100','111'],'3':['111','001','111','001','111'],
 '4':['101','101','111','001','001'],'5':['111','100','111','001','111'],
 '6':['111','100','111','101','111'],'7':['111','001','010','010','010'],
 '8':['111','101','111','101','111'],'9':['111','101','111','001','111'],
}
function NumberMark({value,size=.012}:{value:string;size?:number}){
 return <group>{[...value].flatMap((ch,j)=>(digits[ch]??[]).flatMap((row,y)=>[...row].map((pixel,x)=>pixel==='1'?
  <mesh key={j+':'+x+':'+y} position={[(x+j*4)*size,-y*size,0]}>
   <planeGeometry args={[size*.93,size*.93]}/><meshBasicMaterial color="#e8ece8" toneMapped={false}/>
  </mesh>:null)))}</group>
}
function ControlKnob({x}:{x:number}){
 return <group position={[x,-.32,.775]}>
  <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.145,.145,.052,48]}/><meshPhysicalMaterial color="#b1b6b8" roughness={.36} metalness={.72}/></mesh>
  <mesh position={[0,0,.065]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.118,.125,.09,48]}/><meshPhysicalMaterial color="#3b454b" roughness={.57}/></mesh>
  {Array.from({length:24},(_,i)=>{
   const a=i*tau/24
   return <mesh key={i} position={[Math.cos(a)*.122,Math.sin(a)*.122,.067]} rotation={[0,0,a]}>
    <boxGeometry args={[.008,.008,.063]}/><meshStandardMaterial color="#566166" roughness={.65}/>
   </mesh>
  })}
  <mesh position={[0,.071,.112]}><boxGeometry args={[.013,.052,.005]}/><meshBasicMaterial color="#e0e4df"/></mesh>
 </group>
}
export default function MagneticStirrer(){
 const data=useMemo(()=>({glass:beakerGeometry(),liquid:liquidGeometry()}),[])
 useEffect(()=>()=>Object.values(data).forEach(x=>x.dispose()),[data])
 return <group rotation={[.11,-.39,.015]} position={[0,-.20,0]} scale={1.07}>
  <CurvedBox args={[1.94,.46,1.54]} radius={.067} smoothness={6} position={[0,-.40,0]} castShadow receiveShadow>
   <meshPhysicalMaterial color="#c4cac9" roughness={.53} metalness={.12}/>
  </CurvedBox>
  <CurvedBox args={[1.83,.39,.045]} radius={.018} smoothness={5} position={[0,-.40,.76]}>
   <meshPhysicalMaterial color="#3d535e" roughness={.48} metalness={.13}/>
  </CurvedBox>
  <CurvedBox args={[1.68,.075,1.27]} radius={.035} smoothness={5} position={[0,-.13,-.045]} castShadow receiveShadow>
   <meshPhysicalMaterial color="#ecebe4" roughness={.31} clearcoat={.30}/>
  </CurvedBox>
  <mesh position={[0,-.089,-.045]}><boxGeometry args={[1.60,.007,1.19]}/><meshPhysicalMaterial color="#e6e4da" roughness={.37}/></mesh>
  <group position={[0,-.083,-.045]}>
   <mesh geometry={data.glass}>
    <meshPhysicalMaterial color="#edf6f4" metalness={0} roughness={.085} transmission={.92} thickness={.028} ior={1.47} transparent opacity={.87} side={THREE.DoubleSide} depthWrite={false}/>
   </mesh>
   <mesh geometry={data.liquid}>
    <meshPhysicalMaterial color="#82b8b5" metalness={0} roughness={.13} transmission={.54} thickness={.16} ior={1.333} transparent opacity={.73} depthWrite={false} side={THREE.DoubleSide}/>
   </mesh>
   {/* Volume markings follow the outside surface; no internal floating ticks. */}
   {Array.from({length:11},(_,i)=>{
    const y=.125+i*.062
    const len=i%2===0?.36:.20
    return <mesh key={i} position={[0,y,0]} rotation={[-Math.PI/2,0,-Math.PI/2-.29]}>
     <torusGeometry args={[.431+y*.014,.0035,5,24,len]}/><meshStandardMaterial color="#647a7b" roughness={.84}/>
    </mesh>
   })}
   <mesh position={[0,.101,0]} rotation={[0,0,Math.PI/2]}>
    <capsuleGeometry args={[.044,.25,8,20]}/><meshPhysicalMaterial color="#f4f0df" roughness={.48}/>
   </mesh>
  </group>
  <ControlKnob x={-.57}/><ControlKnob x={.57}/>
  <CurvedBox args={[.48,.20,.028]} radius={.016} smoothness={4} position={[0,-.35,.793]}>
   <meshPhysicalMaterial color="#17242a" roughness={.22} clearcoat={.51}/>
  </CurvedBox>
  <group position={[-.13,-.307,.811]}><NumberMark value="025" size={.024}/></group>
  {[-.57,.57].map((x,i)=><mesh key={x} position={[x,-.51,.792]}>
   <circleGeometry args={[.018,20]}/><meshStandardMaterial color={i?'#90b9ac':'#c99a69'} emissive={i?'#6a9e8d':'#ab7539'} emissiveIntensity={.3}/>
  </mesh>)}
  {[.74,-.74].flatMap(x=>[-.54,.54].map(z=><mesh key={x+':'+z} position={[x,-.664,z]}>
   <cylinderGeometry args={[.089,.092,.08,24]}/><meshStandardMaterial color={ink} roughness={.95}/>
  </mesh>))}
  {Array.from({length:10},(_,i)=><mesh key={i} position={[-.46+i*.102,-.46,-.772]}>
   <boxGeometry args={[.058,.092,.009]}/><meshStandardMaterial color="#333e44" roughness={.75}/>
  </mesh>)}
 </group>
}
