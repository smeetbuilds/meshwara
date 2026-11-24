import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

const tau=Math.PI*2
const fract=(v:number)=>v-Math.floor(v)
const hash=(x:number,y:number)=>fract(Math.sin(x*127.1+y*311.7)*43758.5453)
const emerald=new THREE.Color('#277856'),olive=new THREE.Color('#657e46'),white=new THREE.Color('#d4d6ca')
function plumage(head:boolean){
  const g=new THREE.SphereGeometry(1,72,48),p=g.getAttribute('position'),colors:number[]=[]
  for(let i=0;i<p.count;i++){
    const x=p.getX(i),y=p.getY(i),z=p.getZ(i)
    const c=emerald.clone().lerp(olive,.16+.20*Math.sin(x*7+z*4))
    const belly=1-THREE.MathUtils.smoothstep(y,-.23,.24)
    c.lerp(white,belly*(head?.65:.96))
    const stripe=.05*Math.sin(Math.atan2(z,y)*76+x*49)
    c.multiplyScalar(.92+.12*hash(i,13)+stripe)
    colors.push(c.r,c.g,c.b)
  }
  g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));return g
}
/** Feather vane with a continuous curved cross-section, asymmetric outline
 * and fine rachis/barb pigmentation. Long primaries layer behind coverts. */
function featherGeometry(){
  const rows=26,cols=12,p:number[]=[],colors:number[]=[],idx:number[]=[]
  const gray=new THREE.Color('#494b45'),light=new THREE.Color('#888679')
  for(let i=0;i<=rows;i++)for(let j=0;j<=cols;j++){
    const u=i/rows,v=j/cols*2-1,w=Math.pow(Math.sin(Math.PI*u),.63)*(.94-.24*u)+.002
    p.push(v*.11*w-.075*u*u,.035*Math.sin(Math.PI*u)*(1-v*v)+.075*u*u,u)
    const shaft=Math.exp(-v*v*190)*.24,barbs=.065*Math.cos(u*165-Math.abs(v)*19)
    const c=gray.clone().lerp(light,.20+shaft+barbs+.10*Math.abs(v));colors.push(c.r,c.g,c.b)
  }
  for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const a=i*(cols+1)+j,b=a+cols+1;idx.push(a,b,a+1,a+1,b,b+1)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.setIndex(idx);g.computeVertexNormals();return g
}
function wingGeometry(){
  const rows=25,cols=22,p:number[]=[],c:number[]=[],idx:number[]=[]
  const green=new THREE.Color('#497d56'),gray=new THREE.Color('#4b5147')
  for(let i=0;i<=rows;i++)for(let j=0;j<=cols;j++){
    const u=i/rows,v=j/cols
    const x=-.15*u-.52*Math.sin(Math.PI*u)*v
    p.push(x,.075*Math.sin(Math.PI*u)+.045*v*u,.86*u)
    const shade=green.clone().lerp(gray,u*.77+v*.17).multiplyScalar(.95+.07*hash(i,j))
    c.push(shade.r,shade.g,shade.b)
  }
  for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const a=i*(cols+1)+j,b=a+cols+1;idx.push(a,b,a+1,a+1,b,b+1)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('color',new THREE.Float32BufferAttribute(c,3));g.setIndex(idx);g.computeVertexNormals();return g
}
function billGeometry(){
  const rows=24,cols=16,p:number[]=[],idx:number[]=[]
  for(let i=0;i<=rows;i++){const t=i/rows,r=.055*Math.pow(1-t,.85)+.001
    for(let j=0;j<=cols;j++){const a=j/cols*tau;p.push(.70+t*.76,.22-.075*t*t+r*.78*Math.sin(a),r*Math.cos(a))}}
  for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const a=i*(cols+1)+j,b=a+cols+1;idx.push(a,a+1,b,a+1,b+1,b)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setIndex(idx);g.computeVertexNormals();return g
}
function throatGeometry(){
  // Small overlapping gorget scales conform to the throat rather than a red ball.
  const xyz:number[]=[],idx:number[]=[],colors:number[]=[]
  const red=new THREE.Color('#9a2637'),pink=new THREE.Color('#d34d54')
  for(let row=0;row<10;row++)for(let col=0;col<13;col++){
    const a=-1.03+2.06*(col+.5*(row%2))/13,t=row/9
    const y=.16-.25*t,x=.56-.18*t+.04*Math.cos(a),z=.19*Math.sin(a)*(1-.32*t)
    const width=.025*(1-.20*t),length=.034
    const start=xyz.length/3
    const points=[[-width,0],[0,length*.26],[width,0],[0,-length]]
    for(const [dz,dy] of points){xyz.push(x+.027*Math.cos(a),y+dy,z+dz);const c=red.clone().lerp(pink,.23+.37*hash(row,col));colors.push(c.r,c.g,c.b)}
    idx.push(start,start+1,start+2,start,start+2,start+3)
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(xyz,3));g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.setIndex(idx);g.computeVertexNormals();return g
}
export default function HummingbirdStudy(){
  const data=useMemo(()=>({body:plumage(false),head:plumage(true),feather:featherGeometry(),wing:wingGeometry(),bill:billGeometry(),throat:throatGeometry()}),[])
  useEffect(()=>()=>Object.values(data).forEach(g=>g.dispose()),[data])
  const flight=<meshPhysicalMaterial vertexColors roughness={.76} side={THREE.DoubleSide}/>
  return <group rotation={[.25,-.42,-.12]} scale={.92}>
    <mesh geometry={data.body} position={[-.15,.02,0]} scale={[.55,.29,.25]} rotation={[0,0,.18]}>
      <meshPhysicalMaterial vertexColors roughness={.56} sheen={.27} sheenColor="#769d60" iridescence={.18} iridescenceIOR={1.34}/>
    </mesh>
    <mesh geometry={data.head} position={[.43,.18,0]} scale={[.29,.24,.22]}>
      <meshPhysicalMaterial vertexColors roughness={.49} sheen={.3} sheenColor="#b0c78a" iridescence={.24} iridescenceIOR={1.36}/>
    </mesh>
    <mesh geometry={data.throat}><meshPhysicalMaterial vertexColors side={THREE.DoubleSide} roughness={.42} iridescence={.76} iridescenceIOR={1.55} iridescenceThicknessRange={[180,320]}/></mesh>
    <mesh geometry={data.bill}><meshPhysicalMaterial color="#242c29" roughness={.53} side={THREE.DoubleSide}/></mesh>
    {[-1,1].map(s=><group key={s}>
      <mesh position={[.50,.24,s*.186]} scale={[.056,.052,.029]}><sphereGeometry args={[1,24,16]}/><meshStandardMaterial color="#5c6455" roughness={.75}/></mesh>
      <mesh position={[.515,.24,s*.206]} scale={[.041,.041,.025]}><sphereGeometry args={[1,24,16]}/><meshPhysicalMaterial color="#131714" roughness={.15} clearcoat={.65}/></mesh>
      <mesh position={[.524,.255,s*.228]} scale={.009}><sphereGeometry args={[1,10,8]}/><meshBasicMaterial color="#e3e8d9"/></mesh>
      <group position={[.03,.17,s*.16]} rotation={[s*-.39,.0,s*.13]} scale={[1,1,s]}>
        <mesh geometry={data.wing}><meshStandardMaterial vertexColors side={THREE.DoubleSide} roughness={.81}/></mesh>
        {Array.from({length:10},(_,i)=><mesh key={'primary'+i} geometry={data.feather}
          position={[-.055-.025*i,.035,.36+i*.039]}
          rotation={[.10,-.37-i*.045,-.035]} scale={[.91,.85,.67+.017*i]}>{flight}</mesh>)}
        {Array.from({length:8},(_,i)=><mesh key={'secondary'+i} geometry={data.feather}
          position={[-.16-.02*i,.023,.065+i*.043]}
          rotation={[.13,-.79-i*.035,0]} scale={[.85,.8,.48-.011*i]}>{flight}</mesh>)}
        {Array.from({length:9},(_,i)=><mesh key={'covert'+i} geometry={data.feather} position={[-.10-.012*i,.085,.055+i*.052]} rotation={[.02,-.61,0]} scale={[.65,.8,.28]}><meshPhysicalMaterial color="#527e5a" roughness={.66} side={THREE.DoubleSide} sheen={.16}/></mesh>)}
      </group>
      <mesh position={[-.15,-.24,s*.11]} rotation={[.22,0,-.36]} scale={[.038,.088,.035]}><sphereGeometry args={[1,16,10]}/><meshStandardMaterial color="#75695b" roughness={.86}/></mesh>
      {Array.from({length:3},(_,i)=><mesh key={i} position={[-.12+i*.023,-.30,s*.12]} rotation={[0,0,-.67]} scale={[.013,.04,.013]}><sphereGeometry args={[1,12,8]}/><meshStandardMaterial color="#4d493f" roughness={.81}/></mesh>)}
    </group>)}
    {Array.from({length:10},(_,i)=><mesh key={i} geometry={data.feather} position={[-.58,-.08,(i-4.5)*.027]} rotation={[.12,-Math.PI/2+(i-4.5)*.075,-.12]} scale={[.78,.9,.58+.023*Math.abs(i-4.5)]}>{flight}</mesh>)}
  </group>
}
