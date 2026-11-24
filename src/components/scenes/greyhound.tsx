import { useMemo, useEffect } from 'react'
import * as THREE from 'three'

type V = [number,number,number]
type Part = {center:V;size:V;angle:number}
const tau = Math.PI*2
const fract=(x:number)=>x-Math.floor(x)
const hash=(x:number,y:number)=>fract(Math.sin(x*127.1+y*311.7)*43758.5453)
const part=(center:V,size:V,angle=0):Part=>({center,size,angle})
function segment(a:V,b:V,width:number,depth:number,extension=.025):Part{
  const dx=b[0]-a[0],dy=b[1]-a[1]
  return part([(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2],
    [Math.hypot(dx,dy)/2+extension,width,depth],Math.atan2(dy,dx))
}
/** Anatomical volume field. Smooth joins join the trunk, shoulder, hips,
 * neck, head and all four limb chains into one continuous skin surface.
 * Deliberately small blend radii preserve the breed's bony landmarks. */
function anatomy(){
  const p:Part[]=[
    part([.40,.46,0],[.57,.40,.205],.09), // deep ribcage
    part([-.12,.59,0],[.53,.235,.165],.05), // tucked loin
    part([-.68,.51,0],[.32,.29,.205],-.22), // pelvis
    part([.38,.75,0],[.52,.135,.175],-.06), // withers
    segment([.59,.70,0],[.98,1.27,0],.151,.137,.13),
    part([.97,1.31,0],[.25,.19,.155],.04),
    part([1.23,1.27,0],[.26,.092,.107],-.06),
    part([1.42,1.25,0],[.095,.065,.084],-.08),
  ]
  for(const s of [-1,1]){
    const z=s*.155,offset=s===1?.09:-.09
    const shoulder:V=[.47,.52,z],elbow:V=[.39+offset,-.03,z],wrist:V=[.48+offset,-.58,z],paw:V=[.53+offset,-.76,z]
    p.push(part([.49,.43,z],[.135,.29,.096],.35),segment(shoulder,elbow,.087,.080),part(elbow,[.079,.084,.075]),
      segment(elbow,wrist,.043,.046),part(wrist,[.053,.061,.052]),segment(wrist,paw,.038,.041),part([paw[0]+.038,-.775,z],[.116,.055,.071]))
    const hz=s*.165,shift=s===1?-.075:.045
    const hip:V=[-.69,.49,hz],stifle:V=[-.48+shift,-.02,hz],hock:V=[-.99+shift,-.43,hz],rear:V=[-.92+shift,-.76,hz]
    p.push(part([-.65,.32,hz],[.142,.29,.106],-.36),segment(hip,stifle,.126,.106),part(stifle,[.087,.088,.076]),
      segment(stifle,hock,.061,.057),part(hock,[.062,.073,.054]),segment(hock,rear,.039,.045),part([rear[0]+.038,-.775,hz],[.114,.054,.069]))
  }
  return p
}
function ellipsoid(x:number,y:number,z:number,p:Part){
  const a=x-p.center[0],b=y-p.center[1],c=z-p.center[2]
  const co=Math.cos(p.angle),si=Math.sin(p.angle)
  const u=(a*co+b*si)/p.size[0],v=(-a*si+b*co)/p.size[1],w=c/p.size[2]
  return (Math.sqrt(u*u+v*v+w*w)-1)*Math.min(...p.size)
}
function field(x:number,y:number,z:number,parts:Part[]){
  let d=10
  for(const p of parts){
    const q=ellipsoid(x,y,z,p),k=.036
    const h=Math.max(k-Math.abs(d-q),0)/k
    d=Math.min(d,q)-h*h*k*.25
  }
  return d
}
/** Marching tetrahedra, with edge-index reuse. No disconnected rod limbs.
 * Sampling is limited to the dog's volume; skin normals are gradient based. */
function skinGeometry(){
  const parts=anatomy(),nx=112,ny=91,nz=33
  const origin=[-1.18,-.89,-.43],size=[2.76,2.53,.86]
  const stride=nx+1,layer=stride*(ny+1)
  const positions:number[]=[],colors:number[]=[],uv:number[]=[],indices:number[]=[],normals:number[]=[]
  const samples=new Float32Array(layer*(nz+1))
  const loc=(i:number,j:number,k:number)=>i+j*stride+k*layer
  const at=(id:number)=>{
    const k=Math.floor(id/layer),j=Math.floor((id-k*layer)/stride),i=id-k*layer-j*stride
    return [origin[0]+i/nx*size[0],origin[1]+j/ny*size[1],origin[2]+k/nz*size[2]]
  }
  for(let k=0;k<=nz;k++)for(let j=0;j<=ny;j++)for(let i=0;i<=nx;i++){
    const x=origin[0]+i/nx*size[0],y=origin[1]+j/ny*size[1],z=origin[2]+k/nz*size[2]
    samples[loc(i,j,k)]=field(x,y,z,parts)
  }
  const edges=new Map<string,number>(),fawn=new THREE.Color('#a58260'),cream=new THREE.Color('#d2bea1'),dark=new THREE.Color('#5c4a3d')
  function vertex(a:number,b:number){
    const key=a<b?a+':'+b:b+':'+a
    const found=edges.get(key);if(found!==undefined)return found
    const aa=at(a),bb=at(b),t=samples[a]/(samples[a]-samples[b])
    const x=THREE.MathUtils.lerp(aa[0],bb[0],t),y=THREE.MathUtils.lerp(aa[1],bb[1],t),z=THREE.MathUtils.lerp(aa[2],bb[2],t)
    const eps=.002
    const normal=new THREE.Vector3(field(x+eps,y,z,parts)-field(x-eps,y,z,parts),field(x,y+eps,z,parts)-field(x,y-eps,z,parts),field(x,y,z+eps,parts)-field(x,y,z-eps,parts)).normalize()
    const col=fawn.clone().lerp(cream,Math.max(0,-normal.y)*.56)
    col.lerp(dark,THREE.MathUtils.smoothstep(x,1.10,1.43)*.82)
    col.lerp(dark, .075*THREE.MathUtils.smoothstep(y,.58,.85)*(1-THREE.MathUtils.smoothstep(x,.55,.95)))
    col.multiplyScalar(.89+.13*hash(x*250+y*12,z*220)+.045*Math.sin(x*16+z*11))
    const index=positions.length/3
    positions.push(x,y,z);normals.push(normal.x,normal.y,normal.z);colors.push(col.r,col.g,col.b);uv.push((x-origin[0])/size[0],(y-origin[1])/size[1]+z*.4)
    edges.set(key,index);return index
  }
  function tri(a:number,b:number,c:number){
    const ax=positions[b*3]-positions[a*3],ay=positions[b*3+1]-positions[a*3+1],az=positions[b*3+2]-positions[a*3+2]
    const bx=positions[c*3]-positions[a*3],by=positions[c*3+1]-positions[a*3+1],bz=positions[c*3+2]-positions[a*3+2]
    const outward=(ay*bz-az*by)*normals[a*3]+(az*bx-ax*bz)*normals[a*3+1]+(ax*by-ay*bx)*normals[a*3+2]
    if(outward>=0)indices.push(a,b,c);else indices.push(a,c,b)
  }
  const tets=[[0,5,1,6],[0,1,2,6],[0,2,3,6],[0,3,7,6],[0,7,4,6],[0,4,5,6]]
  for(let k=0;k<nz;k++)for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){
    const a=loc(i,j,k),cube=[a,a+1,a+1+stride,a+stride,a+layer,a+layer+1,a+layer+1+stride,a+layer+stride]
    const count=cube.filter(q=>samples[q]<0).length
    if(count===0||count===8)continue
    for(const tet of tets){
      const inside=tet.map(q=>cube[q]).filter(q=>samples[q]<0),outside=tet.map(q=>cube[q]).filter(q=>samples[q]>=0)
      if(!inside.length||!outside.length)continue
      if(inside.length===1)tri(vertex(inside[0],outside[0]),vertex(inside[0],outside[1]),vertex(inside[0],outside[2]))
      else if(outside.length===1)tri(vertex(outside[0],inside[0]),vertex(outside[0],inside[1]),vertex(outside[0],inside[2]))
      else{
        const a=vertex(inside[0],outside[0]),b=vertex(inside[0],outside[1]),c=vertex(inside[1],outside[0]),d=vertex(inside[1],outside[1])
        tri(a,b,c);tri(b,d,c)
      }
    }
  }
  const g=new THREE.BufferGeometry()
  g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3))
  g.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3))
  g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3))
  g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2))
  g.setIndex(indices);return g
}
function coatMap(){
  const n=256,data=new Uint8Array(n*n*4)
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){
    const v=128+Math.round(22*Math.sin(x*2.1+y*.6)+12*(hash(x,y)-.5))
    const i=(y*n+x)*4;data[i]=data[i+1]=data[i+2]=v;data[i+3]=255
  }
  const t=new THREE.DataTexture(data,n,n,THREE.RGBAFormat);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(3,3)
  t.minFilter=THREE.LinearMipmapLinearFilter;t.magFilter=THREE.LinearFilter;t.generateMipmaps=true;t.needsUpdate=true;return t
}
function tailGeometry(){
  const points=[new THREE.Vector3(-.89,.61,0),new THREE.Vector3(-1.22,.42,.04),new THREE.Vector3(-1.37,.01,.08),new THREE.Vector3(-1.24,-.45,.14),new THREE.Vector3(-1.06,-.61,.18)]
  const curve=new THREE.CatmullRomCurve3(points),rows=40,cols=12,f=curve.computeFrenetFrames(rows,false),p:number[]=[],idx:number[]=[]
  for(let i=0;i<=rows;i++){const t=i/rows,c=curve.getPointAt(t),r=.049*(1-t)**.72+.003
    for(let j=0;j<=cols;j++){const a=j/cols*tau,q=c.clone().addScaledVector(f.normals[i],r*Math.cos(a)).addScaledVector(f.binormals[i],r*Math.sin(a));p.push(q.x,q.y,q.z)}}
  for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const a=i*(cols+1)+j,b=a+cols+1;idx.push(a,a+1,b,a+1,b+1,b)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setIndex(idx);g.computeVertexNormals();return g
}
export default function Greyhound(){
  const data=useMemo(()=>({skin:skinGeometry(),coat:coatMap(),tail:tailGeometry()}),[])
  useEffect(()=>()=>{data.skin.dispose();data.coat.dispose();data.tail.dispose()},[data])
  return <group rotation={[.04,-.33,0]} position={[0,-.17,0]}>
    <mesh geometry={data.skin} castShadow receiveShadow><meshPhysicalMaterial vertexColors bumpMap={data.coat} bumpScale={.006} roughness={.81} sheen={.12} sheenColor="#b49b7f"/></mesh>
    <mesh geometry={data.tail}><meshPhysicalMaterial color="#9d7c5c" roughness={.79} side={THREE.DoubleSide}/></mesh>
    {[-1,1].map(s=><group key={s}>
      <mesh position={[.87,1.46,s*.112]} rotation={[s*.48,0,-.7]} scale={[.15,.065,.051]}><sphereGeometry args={[1,32,16]}/><meshStandardMaterial color="#92745d" roughness={.84}/></mesh>
      <mesh position={[.91,1.47,s*.143]} rotation={[s*.48,0,-.7]} scale={[.087,.034,.018]}><sphereGeometry args={[1,24,12]}/><meshStandardMaterial color="#665043" roughness={.92}/></mesh>
      <mesh position={[1.09,1.345,s*.125]} scale={[.043,.041,.024]}><sphereGeometry args={[1,24,16]}/><meshPhysicalMaterial color="#6d4b2d" roughness={.24}/></mesh>
      <mesh position={[1.101,1.347,s*.143]} scale={[.025,.028,.012]}><sphereGeometry args={[1,24,16]}/><meshPhysicalMaterial color="#181714" roughness={.14}/></mesh>
      <mesh position={[1.111,1.36,s*.153]} scale={.006}><sphereGeometry args={[1,10,8]}/><meshBasicMaterial color="#e8dec9"/></mesh>
      <mesh position={[1.31,1.216,s*.076]} rotation={[0,s*.15,-.07]} scale={[.115,.006,.005]}><sphereGeometry args={[1,24,8]}/><meshStandardMaterial color="#493a30" roughness={.9}/></mesh>
    </group>)}
    <mesh position={[1.487,1.25,0]} scale={[.047,.055,.083]}><sphereGeometry args={[1,28,18]}/><meshPhysicalMaterial color="#302b29" roughness={.35} clearcoat={.25}/></mesh>
  </group>
}
