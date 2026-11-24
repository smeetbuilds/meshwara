import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { CurvedBox } from '../geometry/CurvedBox'

/** Original baked sourdough artwork. Scores are recessed into the actual
 * upper surface, including a raised crust shoulder and uneven exposed crumb.
 * No tubes or floating decorative slashes. */
const fract=(v:number)=>v-Math.floor(v)
const hash=(x:number,y:number)=>fract(Math.sin(x*127.1+y*311.7)*43758.5453)
function noise(x:number,y:number){
 const i=Math.floor(x),j=Math.floor(y),a=x-i,b=y-j,u=a*a*(3-2*a),v=b*b*(3-2*b)
 return THREE.MathUtils.lerp(THREE.MathUtils.lerp(hash(i,j),hash(i+1,j),u),THREE.MathUtils.lerp(hash(i,j+1),hash(i+1,j+1),u),v)
}
function crustMaps(){
 const w=768,h=384,color=new Uint8Array(w*h*4),height=new Uint8Array(w*h*4),rough=new Uint8Array(w*h*4)
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){
  const u=x/w,v=y/h
  const m=noise(u*19,v*14),toast=noise(u*39+9,v*28),pore=noise(u*164,v*82),fine=hash(x,y)
  const scorch=THREE.MathUtils.clamp(.26+(m-.5)*.60+(toast-.5)*.42,0,1)
  const flour=THREE.MathUtils.clamp((noise(u*38+8,v*29)-.70)*1.15,0,.30)
  const blister=Math.max(0,(pore-.68)*3.3)
  const base=[205-scorch*86,126-scorch*69,61-scorch*36],i=(y*w+x)*4
  for(let k=0;k<3;k++)color[i+k]=Math.round(THREE.MathUtils.clamp(base[k]*(1-flour)+[231,216,184][k]*flour +blister*7+(fine-.5)*15,0,255))
  color[i+3]=255
  height[i]=height[i+1]=height[i+2]=Math.round(94+pore*78+blister*31+fine*9);height[i+3]=255
  rough[i]=rough[i+1]=rough[i+2]=Math.round(168+flour*80+fine*15);rough[i+3]=255
 }
 const tex=(bytes:Uint8Array)=>{const t=new THREE.DataTexture(bytes,w,h,THREE.RGBAFormat);t.wrapS=THREE.RepeatWrapping;t.minFilter=THREE.LinearMipmapLinearFilter;t.magFilter=THREE.LinearFilter;t.generateMipmaps=true;t.needsUpdate=true;return t}
 const map=tex(color);map.colorSpace=THREE.SRGBColorSpace;return {color:map,bump:tex(height),rough:tex(rough)}
}
const cuts=[
 {x:-.68,z:-.02,half:.62,slope:.39,width:.068,depth:.088},
 {x:.02,z:.015,half:.72,slope:.30,width:.084,depth:.112},
 {x:.65,z:.02,half:.53,slope:.38,width:.060,depth:.073}
]
function scoring(x:number,z:number){
 let depth=0,ear=0,crumb=0
 for(const cut of cuts){
  const t=(z-cut.z)/cut.half
  if(Math.abs(t)>=1)continue
  const end=Math.pow(Math.max(0,1-t*t),.65)
  const center=cut.x+cut.slope*(z-cut.z)+.035*Math.sin(t*3.5)
  const delta=x-center
  const w=cut.width*end+.004
  const d=Math.exp(-Math.pow(delta/w,2))
  depth+=cut.depth*end*d
  const lip=Math.exp(-Math.pow((delta+w*.98)/(w*.53+.004),2))
  ear+=cut.depth*.56*end*lip*(.75+.25*noise(x*36,z*23))
  crumb=Math.max(crumb,d*end)
 }
 return {depth,ear,crumb}
}
function loafGeometry(){
 const g=new THREE.SphereGeometry(1,176,112)
 const p=g.getAttribute('position'),colors:number[]=[]
 const white=new THREE.Color('#ffffff'),crumbColor=new THREE.Color('#c8af83'),brown=new THREE.Color('#a77750')
 for(let i=0;i<p.count;i++){
  const x=p.getX(i),y=p.getY(i),z=p.getZ(i)
  const variation=1+.035*Math.sin(x*5.4+z*3.1)+.013*Math.sin(x*21+z*17)*Math.sin(z*15-y*19)
  const px=x*1.35*variation,pz=z*.86*variation
  const base=y<-.45?-.45+(y+.45)*.15:y
  const dome=base*.66+.209+Math.sin(x*2.1)*.018
  const score=y>.18?scoring(px,pz):{depth:0,ear:0,crumb:0}
  const weight=THREE.MathUtils.smoothstep(y,.18,.42)
  const surface=dome+(score.ear-score.depth)*weight
  p.setXYZ(i,px,surface,pz)
  const shade=white.clone().lerp(brown,score.crumb*weight*.24).lerp(crumbColor,score.crumb*weight*.30)
  shade.multiplyScalar(1+.035*Math.sin(x*37+z*31))
  colors.push(shade.r,shade.g,shade.b)
 }
 g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.computeVertexNormals();return g
}
function boardMap(){
 const w=512,h=256,a=new Uint8Array(w*h*4)
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){
  const u=x/w,v=y/h
  const fibers=Math.sin(v*260+2.2*Math.sin(u*4)+noise(u*9,v*4)*3)
  const n=.83+.13*noise(u*8,v*34)+.06*fibers
  const i=(y*w+x)*4;a[i]=Math.round(122*n);a[i+1]=Math.round(83*n);a[i+2]=Math.round(51*n);a[i+3]=255
 }
 const t=new THREE.DataTexture(a,w,h,THREE.RGBAFormat);t.colorSpace=THREE.SRGBColorSpace;t.minFilter=THREE.LinearMipmapLinearFilter;t.magFilter=THREE.LinearFilter;t.generateMipmaps=true;t.needsUpdate=true;return t
}
function LoafBody(){
 const data=useMemo(()=>({geometry:loafGeometry(),maps:crustMaps()}),[])
 useEffect(()=>()=>{data.geometry.dispose();Object.values(data.maps).forEach(t=>t.dispose())},[data])
 return <mesh geometry={data.geometry} castShadow receiveShadow>
  <meshPhysicalMaterial vertexColors map={data.maps.color} bumpMap={data.maps.bump} bumpScale={.026} roughnessMap={data.maps.rough} roughness={1} metalness={0} clearcoat={.025} clearcoatRoughness={.87}/>
 </mesh>
}
export default function SourdoughLoaf(){
 const wood=useMemo(boardMap,[])
 useEffect(()=>()=>wood.dispose(),[wood])
 return <group position={[0,-.36,0]} rotation={[.30,-.36,-.025]}>
  <CurvedBox args={[3.22,.12,2.10]} radius={.065} smoothness={6} position={[0,-.21,0]} castShadow receiveShadow>
   <meshPhysicalMaterial map={wood} roughness={.88} metalness={0}/>
  </CurvedBox>
  <LoafBody/>
  {Array.from({length:31},(_,i)=>{
   const a=i*2.3999632,r=.98+.15*hash(i,5),x=Math.cos(a)*r*1.37,z=Math.sin(a)*r*.88
   const s=.012+.016*hash(i,19)
   return <mesh key={i} position={[x,-.142,z]} rotation={[a*.11,a,.23]} scale={[s*1.4,s*.55,s]}>
    <dodecahedronGeometry args={[1,0]}/><meshStandardMaterial color={i%3?'#b88d58':'#d6b98a'} roughness={.97}/>
   </mesh>
  })}
 </group>
}
