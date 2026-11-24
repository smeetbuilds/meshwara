import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

const tau=Math.PI*2
const fract=(x:number)=>x-Math.floor(x)
const rnd=(x:number)=>fract(Math.sin(x*127.1+23.7)*43758.5453)
type V=THREE.Vector3
type Branch={points:V[];base:number;tip:number}
const vec=(x:number,y:number,z:number)=>new THREE.Vector3(x,y,z)
function barkMap(){
  const w=256,h=256,bytes=new Uint8Array(w*h*4),height=new Uint8Array(w*h*4)
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const u=x/w,v=y/h
    const crack=Math.pow(Math.max(0,Math.cos(u*tau*23+Math.sin(v*17+u*13)*.7+Math.sin(v*51)*.24)),14)
    const flakes=Math.sin(v*87+u*48)*Math.sin(u*131-v*21)
    const grain=rnd(x+y*w)*.09
    const c=(.83+.12*flakes+grain)*(1-.48*crack)
    const i=(y*w+x)*4
    bytes[i]=Math.round(123*c);bytes[i+1]=Math.round(83*c);bytes[i+2]=Math.round(54*c);bytes[i+3]=255
    height[i]=height[i+1]=height[i+2]=Math.round(150+flakes*26-crack*92+grain*120);height[i+3]=255
  }
  function tex(a:Uint8Array){const t=new THREE.DataTexture(a,w,h,THREE.RGBAFormat);t.wrapS=THREE.RepeatWrapping;t.wrapT=THREE.RepeatWrapping;t.minFilter=THREE.LinearMipmapLinearFilter;t.magFilter=THREE.LinearFilter;t.generateMipmaps=true;t.needsUpdate=true;return t}
  const color=tex(bytes);color.colorSpace=THREE.SRGBColorSpace
  return {color,bump:tex(height)}
}
/** Continuous tapered branch tubes with irregular cross sections and bark UVs.
 * The mesh is a single batched buffer; all branch tips support foliage. */
function branchGeometry(branches:Branch[]){
  const p:number[]=[],uv:number[]=[],indices:number[]=[]
  for(let k=0;k<branches.length;k++){
    const b=branches[k],curve=new THREE.CatmullRomCurve3(b.points)
    const rows=b.base>.08?32:12,cols=b.base>.08?16:8
    const frames=curve.computeFrenetFrames(rows,false)
    const start=p.length/3
    for(let i=0;i<=rows;i++){
      const t=i/rows,c=curve.getPointAt(t),n=frames.normals[i],v=frames.binormals[i]
      const radius=THREE.MathUtils.lerp(b.base,b.tip,Math.pow(t,.82))
      for(let j=0;j<=cols;j++){
        const a=j/cols*tau,r=radius*(1+.08*Math.sin(a*5+t*8+k))
        const q=c.clone().addScaledVector(n,Math.cos(a)*r).addScaledVector(v,Math.sin(a)*r)
        p.push(q.x,q.y,q.z);uv.push(j/cols,t*curve.getLength()*.65)
      }
    }
    for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){
      const a=start+i*(cols+1)+j,b=a+cols+1
      indices.push(a,a+1,b,a+1,b+1,b)
    }
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();return g
}
function architecture(){
  const branches:Branch[]=[{points:[vec(0,-1.35,0),vec(-.06,-.66,.025),vec(.035,.04,-.06),vec(.01,.69,-.02)],base:.145,tip:.047}]
  const clusters:{center:V;radius:number;seed:number}[]=[]
  // Pinus pinea: broad, rounded umbrella crown on a relatively clear trunk.
  // The radial scaffold forks into outward-rising secondary branches.
  for(let i=0;i<9;i++){
    const a=i*2.399963,reach=.87+.38*rnd(i+9),y=.12+.40*rnd(i+22)
    const origin=vec(.02,y,-.025)
    const elbow=vec(Math.cos(a)*reach*.52,y+.26,Math.sin(a)*reach*.52)
    const end=vec(Math.cos(a)*reach,.84+.18*rnd(i+31),Math.sin(a)*reach)
    branches.push({points:[origin,elbow,end],base:.062+.023*rnd(i+63),tip:.012})
    for(let j=0;j<4;j++){
      const angle=a+(j-1.5)*.42
      const r=reach*(.77+.23*rnd(i*13+j))
      const tip=vec(Math.cos(angle)*r,.90+.22*rnd(i*19+j+8),Math.sin(angle)*r)
      const root=elbow.clone().lerp(end,.32+.12*j)
      branches.push({points:[root,root.clone().lerp(tip,.6).add(vec(0,.09,0)),tip],base:.023,tip:.004})
      clusters.push({center:tip,radius:.34+.09*rnd(i*23+j+9),seed:i*41+j*7})
    }
  }
  for(let i=0;i<10;i++){
    const a=i*tau/10,r=.16+.37*rnd(i+112)
    const tip=vec(Math.cos(a)*r,1.17+.17*rnd(i+201),Math.sin(a)*r)
    branches.push({points:[vec(.02,.55,-.02),vec(Math.cos(a)*r*.4,.91,Math.sin(a)*r*.4),tip],base:.034,tip:.005})
    clusters.push({center:tip,radius:.39,seed:300+i*13})
  }
  return {branches,clusters}
}
/** Each needle fascicle is a small crossed triangular strip, batched into one
 * foliage buffer with deterministic distribution and per-vertex coloration. */
function foliageGeometry(clusters:ReturnType<typeof architecture>['clusters']){
  const xyz:number[]=[],rgb:number[]=[]
  const dark=new THREE.Color('#254831'),light=new THREE.Color('#718c42')
  for(const {center,radius,seed} of clusters){
    for(let i=0;i<250;i++){
      const k=seed+i*7.13,a=rnd(k)*tau,h=rnd(k+1)*2-1
      const r=radius*Math.pow(rnd(k+2),.48),ring=Math.sqrt(1-h*h)
      const root=center.clone().add(vec(Math.cos(a)*r*ring,h*r*.78,Math.sin(a)*r*ring))
      const yaw=rnd(k+3)*tau
      const length=.075+.074*rnd(k+4),slope=.22+.62*rnd(k+5)
      const d=vec(Math.cos(yaw),slope,Math.sin(yaw)).normalize()
      const n=vec(-Math.sin(yaw),.05,Math.cos(yaw)).multiplyScalar(.008)
      const tip=root.clone().addScaledVector(d,length)
      const c=dark.clone().lerp(light,.24+.55*rnd(k+6))
      for(const q of [root.clone().sub(n),root.clone().add(n),tip]){
        xyz.push(q.x,q.y,q.z);rgb.push(c.r,c.g,c.b)
      }
      const n2=new THREE.Vector3().crossVectors(d,n).normalize().multiplyScalar(.006)
      for(const q of [root.clone().sub(n2),root.clone().add(n2),tip]){
        xyz.push(q.x,q.y,q.z);rgb.push(c.r,c.g,c.b)
      }
    }
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(xyz,3));g.setAttribute('color',new THREE.Float32BufferAttribute(rgb,3));g.computeVertexNormals();return g
}
export default function StonePine(){
  const data=useMemo(()=>{const a=architecture();return {wood:branchGeometry(a.branches),foliage:foliageGeometry(a.clusters),bark:barkMap()}},[])
  useEffect(()=>()=>{data.wood.dispose();data.foliage.dispose();data.bark.color.dispose();data.bark.bump.dispose()},[data])
  return <group rotation={[.055,-.42,-.025]}>
    <mesh geometry={data.wood} castShadow receiveShadow>
      <meshPhysicalMaterial map={data.bark.color} bumpMap={data.bark.bump} bumpScale={.029} roughness={.94} side={THREE.DoubleSide}/>
    </mesh>
    <mesh geometry={data.foliage} castShadow>
      <meshStandardMaterial vertexColors roughness={.92} side={THREE.DoubleSide}/>
    </mesh>
    <mesh position={[0,-1.39,0]} scale={[1.03,.115,.85]}>
      <sphereGeometry args={[1,48,20]}/><meshStandardMaterial color="#95836a" roughness={1}/>
    </mesh>
    {Array.from({length:22},(_,i)=>{
      const a=i*2.399963,r=.18+rnd(i+89)*.69
      return <mesh key={i} position={[Math.cos(a)*r,-1.285,Math.sin(a)*r*.75]} rotation={[.18,a,.12]} scale={[.035+rnd(i+8)*.04,.025,.031+rnd(i+12)*.03]}>
        <dodecahedronGeometry args={[1,0]}/><meshStandardMaterial color={i%3?'#766b57':'#b5a58c'} roughness={1}/>
      </mesh>
    })}
  </group>
}
