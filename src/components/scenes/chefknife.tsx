import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

/** Kitchen chef knife: continuous steel section, physically thin cutting
 * edge, smooth belly and drop point, full tang and flush handle fasteners. */
type Station=[x:number,spine:number,edge:number,halfThickness:number]
const blade:Station[]=[
  [-.73,.28,-.36,.026],[-.69,.30,-.36,.026],[-.45,.30,-.36,.025],
  [-.02,.295,-.355,.023],[.40,.29,-.33,.020],[.82,.278,-.27,.017],
  [1.16,.25,-.14,.013],[1.43,.21,.015,.009],[1.62,.17,.12,.004],[1.67,.158,.157,.001]
]
const rivets=[-1.93,-1.55,-1.17]
// Monotone cubic interpolation preserves the heel, curved belly and tip
// without overshooting the adjacent section or creating a serrated outline.
function smoothBlade():Station[]{
  const result:Station[]=[]
  const slope=(i:number,c:number)=>{
    if(i===0)return (blade[1][c]-blade[0][c])/(blade[1][0]-blade[0][0])
    if(i===blade.length-1)return (blade[i][c]-blade[i-1][c])/(blade[i][0]-blade[i-1][0])
    const a=(blade[i][c]-blade[i-1][c])/(blade[i][0]-blade[i-1][0])
    const b=(blade[i+1][c]-blade[i][c])/(blade[i+1][0]-blade[i][0])
    return a*b<=0?0:2*a*b/(a+b)
  }
  for(let i=0;i<blade.length-1;i++){
    const a=blade[i],b=blade[i+1],dx=b[0]-a[0]
    for(let j=0;j<6;j++){
      const t=j/6,t2=t*t,t3=t2*t
      const values=[1,2,3].map(c=>(2*t3-3*t2+1)*a[c]+(t3-2*t2+t)*dx*slope(i,c)+(-2*t3+3*t2)*b[c]+(t3-t2)*dx*slope(i+1,c))
      result.push([a[0]+t*dx,values[0],Math.min(values[1],values[0]-.001),Math.max(.001,values[2])])
    }
  }
  result.push(blade[blade.length-1]);return result
}
function bladeGeometry(){
  const p:number[]=[],uv:number[]=[],indices:number[]=[]
  const g=new THREE.BufferGeometry()
  const sections=smoothBlade()
  // Three points around each side: spine, broad primary face, bevel shoulder,
  // cutting edge. Share vertices along length, but not across the grind lines.
  const section=(s:Station)=>{const [x,top,bottom,t]=s,h=top-bottom
    return [[x,top,t],[x,bottom+h*.25,t*.77],[x,bottom,.001],
      [x,bottom,-.001],[x,bottom+h*.25,-t*.77],[x,top,-t]]}
  for(let f=0;f<6;f++){
    const start=p.length/3,first=indices.length
    for(const s of sections){const q=section(s)
      for(const point of [q[f],q[(f+1)%6]]){p.push(...point);uv.push((point[0]+.73)/2.40,(point[1]+.36)/.66)}}
    for(let i=0;i<sections.length-1;i++){const a=start+i*2,b=a+2;indices.push(a,a+1,b,a+1,b+1,b)}
    g.addGroup(first,indices.length-first,f===1||f===3?1:0)
  }
  for(const [s,flip] of [[blade[0],true],[blade[blade.length-1],false]] as const){
    const start=p.length/3,first=indices.length
    const q=section(s)
    for(const v of q){p.push(...v);uv.push((v[0]+.73)/2.4,(v[1]+.36)/.66)}
    for(let i=1;i<5;i++)indices.push(start, start+(flip?i+1:i), start+(flip?i:i+1))
    g.addGroup(first,indices.length-first,0)
  }
  g.setAttribute('position',new THREE.Float32BufferAttribute(p,3))
  g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals()
  return g
}
const gripStations=[
  [-2.13,.11,.115,.077],[-2.09,.106,.146,.095],[-1.94,.104,.15,.104],
  [-1.69,.105,.142,.106],[-1.45,.116,.132,.099],[-1.21,.132,.124,.091],
  [-1.04,.145,.135,.084],[-.91,.156,.124,.072],[-.88,.156,.112,.067]
]
function gripGeometry(tang:boolean){
  const p:number[]=[],uv:number[]=[],idx:number[]=[],cols=32
  for(const [x,y,h,w] of gripStations){
    for(let j=0;j<=cols;j++){
      const a=j/cols*Math.PI*2,co=Math.cos(a),si=Math.sin(a)
      const sy=Math.sign(co)*Math.pow(Math.abs(co),.78)*h
      const sz=Math.sign(si)*Math.pow(Math.abs(si),.82)*w
      p.push(x,y+sy*(tang?1.025:1),tang?sz*.16:sz);uv.push((x+2.13)/1.25,j/cols)
    }
  }
  for(let i=0;i<gripStations.length-1;i++)for(let j=0;j<cols;j++){
    const a=i*(cols+1)+j,b=a+cols+1;idx.push(a,a+1,b,a+1,b+1,b)
  }
  for(const [i,reverse] of [[0,true],[gripStations.length-1,false]] as const){
    const [x,y]=gripStations[i],center=p.length/3;p.push(x,y,0);uv.push(i/(gripStations.length-1),.5)
    for(let j=0;j<cols;j++){const a=i*(cols+1)+j;idx.push(center,reverse?a+1:a,reverse?a:a+1)}
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g
}
const fract=(x:number)=>x-Math.floor(x)
const hash=(x:number,y:number)=>fract(Math.sin(x*127.1+y*311.7)*43758.5453)
function surfaceMaps(){
  const w=512,h=128,steel=new Uint8Array(w*h*4),wood=new Uint8Array(w*h*4)
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const i=(y*w+x)*4
    const grain=hash(Math.floor(x/45),y)*.3+hash(0,y)*.7
    steel[i]=steel[i+1]=steel[i+2]=Math.round(165+grain*70);steel[i+3]=255
    const n=.75+.15*Math.sin(y*.52+Math.sin(x*.013)*1.8)+.10*hash(Math.floor(x/18),y)
    wood[i]=Math.round(69*n);wood[i+1]=Math.round(51*n);wood[i+2]=Math.round(37*n);wood[i+3]=255
  }
  const tex=(a:Uint8Array)=>{const t=new THREE.DataTexture(a,w,h,THREE.RGBAFormat);t.minFilter=THREE.LinearMipmapLinearFilter;t.magFilter=THREE.LinearFilter;t.generateMipmaps=true;t.needsUpdate=true;return t}
  const handle=tex(wood);handle.colorSpace=THREE.SRGBColorSpace;return {brush:tex(steel),handle}
}
export default function ChefKnife(){
  const data=useMemo(()=>({blade:bladeGeometry(),grip:gripGeometry(false),tang:gripGeometry(true),...surfaceMaps()}),[])
  useEffect(()=>()=>Object.values(data).forEach(x=>x.dispose()),[data])
  return <group rotation={[.20,.78,-.20]} scale={.91}>
    <mesh geometry={data.blade} castShadow receiveShadow>
      <meshPhysicalMaterial attach="material-0" color="#d6dee3" metalness={.72} roughness={.42} roughnessMap={data.brush} anisotropy={.66} anisotropyRotation={0} side={THREE.DoubleSide}/>
      <meshPhysicalMaterial attach="material-1" color="#edf1f3" metalness={.76} roughness={.25} anisotropy={.44} side={THREE.DoubleSide}/>
    </mesh>
    <mesh geometry={data.tang}><meshStandardMaterial color="#aab0b2" metalness={.9} roughness={.3} side={THREE.DoubleSide}/></mesh>
    <mesh geometry={data.grip} castShadow><meshPhysicalMaterial map={data.handle} color="#b5a28b" roughness={.63} clearcoat={.12} side={THREE.DoubleSide}/></mesh>
    <mesh position={[-.815,.158,0]} scale={[.11,.116,.073]}><sphereGeometry args={[1,40,24]}/><meshPhysicalMaterial color="#b7bfc3" metalness={.9} roughness={.32}/></mesh>
    {rivets.map((x,i)=><group key={x}>
      {[-1,1].map(s=><mesh key={s} position={[x,.106+i*.017,s*(i===2?.091:.104)]} rotation={[Math.PI/2,0,0]}>
        <cylinderGeometry args={[.032,.032,.006,32]}/><meshPhysicalMaterial color="#c0c4c5" metalness={.84} roughness={.29}/>
      </mesh>)}
    </group>)}
  </group>
}
