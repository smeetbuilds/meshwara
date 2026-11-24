import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

type Vec=[number,number,number]
const tau=Math.PI*2
const fract=(x:number)=>x-Math.floor(x)
const hash=(x:number,y:number)=>fract(Math.sin(x*127.1+y*311.7)*43758.5453)
function noise(x:number,y:number){
  const i=Math.floor(x),j=Math.floor(y),a=x-i,b=y-j,u=a*a*(3-2*a),v=b*b*(3-2*b)
  return THREE.MathUtils.lerp(THREE.MathUtils.lerp(hash(i,j),hash(i+1,j),u),THREE.MathUtils.lerp(hash(i,j+1),hash(i+1,j+1),u),v)
}
const palette=['#947a48','#9d7d48','#897044','#a18a52','#8d794b','#967547'].map(c=>new THREE.Color(c))
/** Scutes are adjoining regions on a continuous shell, not separate floating ovals.
 * Five vertebral plates, paired costal bands and a marginal ring.
 * The markings are original deterministic color and relief maps. */
function shellMaps(){
  const w=512,h=512,rgba=new Uint8Array(w*h*4),relief=new Uint8Array(w*h*4)
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const u=x/(w-1)*2-1,v=y/(h-1)*2-1
    const uu=u+.018*Math.sin(v*18+u*4),vv=v+.014*Math.sin(u*17-v*3)
    const angle=Math.atan2(vv,uu),r=Math.hypot(uu,vv)
    const sector=Math.floor((angle+Math.PI)/tau*24)
    let plate=0,edge=1,local=0
    if(r>.80){
      plate=sector+19;edge=Math.min(Math.abs(r-.80),Math.abs(fract((angle+Math.PI)/tau*24)-.5)*.20)
      local=Math.abs(r-.91)
    }else if(Math.abs(v)<.24+.025*Math.cos(u*7)){
      const q=(u+.80)/.32
      plate=Math.floor(q)+1;edge=Math.min(Math.abs(Math.abs(v)-(.24+.025*Math.cos(u*7))),Math.min(fract(q),1-fract(q))*.32)
      local=Math.hypot(fract(q)-.5,v)
    }else{
      const q=(u+.86)/.43+(v>0?.05:.14)
      plate=7+Math.floor(q)+(v>0?0:5)
      edge=Math.min(Math.abs(r-.8),Math.abs(Math.abs(v)-(.24+.025*Math.cos(u*7))),Math.min(fract(q),1-fract(q))*.43)
      local=Math.hypot(fract(q)-.5,(Math.abs(v)-.49))
    }
    const c=palette[((plate%palette.length)+palette.length)%palette.length].clone()
    const variation=.80+.22*noise(u*18,v*18)+.10*noise(u*75,v*75)+.07*Math.sin(local*65+noise(u*5,v*5)*3)
    const seam=THREE.MathUtils.smoothstep(edge,.002,.012)
    c.multiplyScalar(variation*(.66+.34*seam))
    const i=(y*w+x)*4
    rgba[i]=Math.round(THREE.MathUtils.clamp(c.r*255,0,255));rgba[i+1]=Math.round(THREE.MathUtils.clamp(c.g*255,0,255));rgba[i+2]=Math.round(THREE.MathUtils.clamp(c.b*255,0,255));rgba[i+3]=255
    const height=Math.round(52+seam*145+noise(u*90,v*90)*28)
    relief[i]=height;relief[i+1]=height;relief[i+2]=height;relief[i+3]=255
  }
  const make=(bytes:Uint8Array)=>{const t=new THREE.DataTexture(bytes,w,h,THREE.RGBAFormat);t.minFilter=THREE.LinearMipmapLinearFilter;t.magFilter=THREE.LinearFilter;t.generateMipmaps=true;t.needsUpdate=true;return t}
  // Color values above are already in Three's linear working space.
  return {color:make(rgba),bump:make(relief)}
}
function shellGeometry(){
  const g=new THREE.SphereGeometry(1,72,40,0,tau,0,Math.PI*.54)
  const p=g.getAttribute('position'),uv=g.getAttribute('uv')
  for(let i=0;i<p.count;i++){
    const x=p.getX(i),y=p.getY(i),z=p.getZ(i)
    const breadth=.90+.11*x
    const ridge=.017*Math.sin(x*14+z*11)*Math.max(0,y)
    p.setXYZ(i,x*1.12,y*.39+ridge-.015,z*.83*breadth)
    uv.setXY(i,(x+1)*.5,(z+1)*.5)
  }
  g.computeVertexNormals();return g
}
function skinMap(){
  const size=256,data=new Uint8Array(size*size*4)
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const u=x/size*22,v=y/size*16,ix=Math.floor(u),iy=Math.floor(v)
    let d=100,second=100,cell=0
    for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++){
      const a=ix+i,b=iy+j,px=a+.2+.65*hash(a,b),py=b+.2+.65*hash(a+17,b+31)
      const ds=(u-px)**2+(v-py)**2
      if(ds<d){second=d;d=ds;cell=hash(a+8,b+3)}else if(ds<second)second=ds
    }
    const margin=THREE.MathUtils.smoothstep(Math.sqrt(second)-Math.sqrt(d),.018,.095)
    const base=[94+cell*42,103+cell*35,65+cell*26]
    const idx=(y*size+x)*4
    for(let k=0;k<3;k++)data[idx+k]=Math.round(base[k]*(.48+.52*margin))
    data[idx+3]=255
  }
  const t=new THREE.DataTexture(data,size,size,THREE.RGBAFormat);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=THREE.RepeatWrapping;t.wrapT=THREE.RepeatWrapping;t.minFilter=THREE.LinearMipmapLinearFilter;t.magFilter=THREE.LinearFilter;t.generateMipmaps=true;t.needsUpdate=true;return t
}
/** Anatomical foreflipper: broad proximal paddle, swept trailing edge,
 * tapered flexible tip. Closed mesh with a thin lenticular cross section. */
function flipperGeometry(front:boolean){
  const rows=28,cols=20,xyz:number[]=[],uv:number[]=[],idx:number[]=[]
  for(let i=0;i<=rows;i++){
    const t=i/rows
    const length=front?1.29:.61
    const sweep=front?.66:.34
    const centerX=-sweep*t*t
    const width=(front?.24:.18)*Math.pow(Math.sin(Math.PI*(.14+.86*t)),.62)+.001
    const height=(front?.052:.038)*Math.pow(Math.sin(Math.PI*(.12+.88*t)),.7)+.001
    for(let j=0;j<=cols;j++){
      const a=j/cols*tau
      xyz.push(centerX+width*Math.cos(a),-.055*t-.08*t*t+height*Math.sin(a),t*length)
      uv.push(j/cols,t)
    }
  }
  const stride=cols+1
  for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){
    const a=i*stride+j,b=a+stride
    idx.push(a,b,a+1,a+1,b,b+1)
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(xyz,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g
}
export default function SeaTurtle(){
  const data=useMemo(()=>({shell:shellGeometry(),maps:shellMaps(),skin:skinMap(),front:flipperGeometry(true),rear:flipperGeometry(false)}),[])
  useEffect(()=>()=>{data.shell.dispose();data.maps.color.dispose();data.maps.bump.dispose();data.skin.dispose();data.front.dispose();data.rear.dispose()},[data])
  return <group rotation={[.56,-.48,-.12]} scale={.94}>
    <mesh geometry={data.shell} castShadow receiveShadow>
      <meshPhysicalMaterial map={data.maps.color} bumpMap={data.maps.bump} bumpScale={.016} roughness={.76} clearcoat={.09} clearcoatRoughness={.52} side={THREE.DoubleSide}/>
    </mesh>
    <mesh position={[0,-.105,0]} scale={[1.07,.15,.77]}>
      <sphereGeometry args={[1,56,28]}/><meshPhysicalMaterial color="#b4a073" roughness={.78} bumpMap={data.maps.bump} bumpScale={.013}/>
    </mesh>
    <mesh rotation={[-Math.PI/2,0,0]} scale={[1.10,.78,.90]} position={[0,-.043,0]}>
      <torusGeometry args={[1,.025,8,96]}/><meshPhysicalMaterial color="#6d5435" roughness={.76}/>
    </mesh>
    {[-1,1].map(s=><group key={s}>
      <mesh geometry={data.front} position={[.66,-.10,s*.57]} scale={[1,1,s]} rotation={[s*.12,0,s*.10]}>
        <meshPhysicalMaterial map={data.skin} roughness={.80} side={THREE.DoubleSide}/>
      </mesh>
      <mesh geometry={data.rear} position={[-.79,-.12,s*.49]} scale={[1,1,s]} rotation={[0,-s*.48,s*.06]}>
        <meshPhysicalMaterial map={data.skin} roughness={.82} side={THREE.DoubleSide}/>
      </mesh>
    </group>)}
    <mesh position={[1.03,-.065,0]} scale={[.27,.15,.18]}><sphereGeometry args={[1,32,22]}/><meshStandardMaterial map={data.skin} roughness={.79}/></mesh>
    <mesh position={[1.32,-.025,0]} scale={[.31,.20,.20]}><sphereGeometry args={[1,40,28]}/><meshPhysicalMaterial map={data.skin} roughness={.71}/></mesh>
    <mesh position={[1.51,-.08,0]} scale={[.185,.076,.15]}><sphereGeometry args={[1,28,20]}/><meshStandardMaterial color="#a79a72" roughness={.75}/></mesh>
    {[-1,1].map(s=><group key={s}>
      <mesh position={[1.39,.036,s*.167]} scale={[.074,.065,.028]}><sphereGeometry args={[1,24,16]}/><meshPhysicalMaterial color="#756d48" roughness={.7}/></mesh>
      <mesh position={[1.405,.043,s*.188]} scale={[.043,.043,.018]}><sphereGeometry args={[1,24,16]}/><meshPhysicalMaterial color="#171711" roughness={.20} clearcoat={.6}/></mesh>
      <mesh position={[1.416,.058,s*.203]} scale={.009}><sphereGeometry args={[1,10,8]}/><meshBasicMaterial color="#e6e4d7"/></mesh>
      <mesh position={[1.59,.014,s*.068]} scale={[.022,.013,.012]}><sphereGeometry args={[1,12,8]}/><meshStandardMaterial color="#413e2c" roughness={.9}/></mesh>
      <mesh position={[1.49,-.064,s*.145]} rotation={[0,s*.2,.08]} scale={[.11,.007,.006]}><sphereGeometry args={[1,20,8]}/><meshStandardMaterial color="#4e4934" roughness={.9}/></mesh>
    </group>)}
    <mesh position={[-1.13,-.12,0]} rotation={[0,0,Math.PI/2]} scale={[.07,.22,.06]}><coneGeometry args={[1,1,18]}/><meshStandardMaterial map={data.skin} roughness={.82}/></mesh>
  </group>
}
