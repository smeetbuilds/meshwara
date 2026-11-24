import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

const tau=2*Math.PI
const fract=(v:number)=>v-Math.floor(v)
const noise=(x:number,y:number)=>fract(Math.sin(x*127.1+y*311.7)*43758.5453)
const slate=new THREE.Color('#4c5660'),ivory=new THREE.Color('#d8d4c6'),bar=new THREE.Color('#45484a')
function plumage(head:boolean){
  const g=new THREE.SphereGeometry(1,96,64),p=g.getAttribute('position'),colors:number[]=[]
  for(let i=0;i<p.count;i++){
    const x=p.getX(i),y=p.getY(i),z=p.getZ(i)
    const phi=Math.atan2(x,z)
    const front=THREE.MathUtils.smoothstep(z,.04,.55)
    const stagger=.022*Math.sin(phi*26+y*3)
    let c=slate.clone()
    if(head){
      const cheek=THREE.MathUtils.smoothstep(z,.20,.52)*(1-THREE.MathUtils.smoothstep(y,-.28,.22))
      c.set('#343e48').lerp(ivory,cheek*.95)
      const stripe=Math.exp(-(((Math.abs(phi)-.71)*7)**2))*(1-THREE.MathUtils.smoothstep(y,.12,.40))
      c.lerp(bar,stripe)
    }else{
      const stripes=Math.pow(Math.max(0,Math.cos(y*44+stagger*20)),5)*(1-THREE.MathUtils.smoothstep(y,.22,.70))
      c.lerp(ivory.clone().lerp(bar,stripes*.82),front)
    }
    c.multiplyScalar(.94+.10*noise(i,Math.round(y*60))+.025*Math.cos(phi*79+y*35))
    colors.push(c.r,c.g,c.b)
  }
  g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3))
  return g
}
/** Curved, tapered vane with a raised rachis and fine directional barbs.
 * A folded wing uses overlapping primaries, secondaries and coverts. */
function featherGeometry(barred:boolean){
  const rows=22,cols=10,p:number[]=[],c:number[]=[],idx:number[]=[]
  const gray=new THREE.Color('#424a54'),highlight=new THREE.Color('#7b8183')
  for(let i=0;i<=rows;i++)for(let j=0;j<=cols;j++){
    const t=i/rows,v=j/cols*2-1,w=Math.pow(Math.sin(Math.PI*t),.60)*(.85-.28*t)+.002
    p.push(v*.13*w+.035*t*t,-t,.025*(1-v*v)*Math.sin(Math.PI*t)+.065*t*t)
    const stripe=barred?Math.pow(Math.max(0,Math.cos(t*34+Math.abs(v)*1.5)),5)*.55:0
    const shaft=Math.exp(-v*v*160)*.30
    const fine=.09*Math.cos(t*155-Math.abs(v)*17)
    const shade=gray.clone().lerp(highlight,.12+stripe+shaft+fine)
    c.push(shade.r,shade.g,shade.b)
  }
  for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const a=i*(cols+1)+j,b=a+cols+1;idx.push(a,b,a+1,a+1,b,b+1)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('color',new THREE.Float32BufferAttribute(c,3));g.setIndex(idx);g.computeVertexNormals();return g
}
function tapered(points:THREE.Vector3[],r0:number,r1:number){
  const curve=new THREE.CatmullRomCurve3(points),rows=20,cols=12,f=curve.computeFrenetFrames(rows,false),p:number[]=[],idx:number[]=[]
  for(let i=0;i<=rows;i++){const t=i/rows,root=curve.getPointAt(t),r=THREE.MathUtils.lerp(r0,r1,t)
    for(let j=0;j<=cols;j++){const a=j/cols*tau,v=root.clone().addScaledVector(f.normals[i],r*Math.cos(a)).addScaledVector(f.binormals[i],r*Math.sin(a));p.push(v.x,v.y,v.z)}}
  for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const a=i*(cols+1)+j,b=a+cols+1;idx.push(a,a+1,b,a+1,b+1,b)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setIndex(idx);g.computeVertexNormals();return g
}
export default function FalconStudy(){
  const data=useMemo(()=>({body:plumage(false),head:plumage(true),flight:featherGeometry(true),coverts:featherGeometry(false),
    hook:tapered([new THREE.Vector3(0,1.22,.25),new THREE.Vector3(0,1.21,.44),new THREE.Vector3(0,1.11,.48),new THREE.Vector3(0,1.065,.43)],.092,.008),
    toes:[-1,0,1].map(i=>tapered([new THREE.Vector3(0,0,0),new THREE.Vector3(i*.065,-.035,.12),new THREE.Vector3(i*.08,-.075,.22),new THREE.Vector3(i*.08,-.14,.22)],.026,.008)),
    claws:[-1,0,1].map(i=>tapered([new THREE.Vector3(i*.08,-.12,.22),new THREE.Vector3(i*.08,-.18,.22),new THREE.Vector3(i*.08,-.205,.175)],.016,.002))
  }),[])
  useEffect(()=>()=>{Object.values(data).forEach(g=>Array.isArray(g)?g.forEach(x=>x.dispose()):g.dispose())},[data])
  const vane=<meshStandardMaterial vertexColors side={THREE.DoubleSide} roughness={.86}/>
  return <group position={[0,-.36,0]} rotation={[0,-.48,.03]} scale={.96}>
    <mesh geometry={data.body} position={[0,.57,0]} scale={[.40,.68,.37]} rotation={[-.15,0,0]}>
      <meshPhysicalMaterial vertexColors roughness={.82} sheen={.10}/>
    </mesh>
    <mesh geometry={data.head} position={[0,1.22,.10]} scale={[.275,.29,.265]}><meshStandardMaterial vertexColors roughness={.81}/></mesh>
    <mesh position={[0,1.22,.342]} scale={[.088,.075,.09]}><sphereGeometry args={[1,26,18]}/><meshStandardMaterial color="#c4a445" roughness={.69}/></mesh>
    <mesh geometry={data.hook}><meshPhysicalMaterial color="#515355" roughness={.5} side={THREE.DoubleSide}/></mesh>
    {[-1,1].map(s=><group key={s}>
      <mesh position={[s*.202,1.29,.245]} scale={[.076,.072,.045]} rotation={[0,s*.55,0]}><sphereGeometry args={[1,24,16]}/><meshStandardMaterial color="#d9b64d" roughness={.68}/></mesh>
      <mesh position={[s*.226,1.29,.27]} scale={[.057,.057,.037]} rotation={[0,s*.55,0]}><sphereGeometry args={[1,24,16]}/><meshPhysicalMaterial color="#211f1c" roughness={.15} clearcoat={.45}/></mesh>
      <mesh position={[s*.244,1.31,.297]} scale={.009}><sphereGeometry args={[1,10,8]}/><meshBasicMaterial color="#e6dfc9"/></mesh>
      <mesh position={[s*.051,1.239,.41]} scale={[.017,.012,.012]}><sphereGeometry args={[1,12,8]}/><meshStandardMaterial color="#514f36" roughness={.8}/></mesh>
      {/* Folded wing surfaces hug the sides rather than sticking out as rods. */}
      {Array.from({length:10},(_,i)=><mesh key={'p'+i} geometry={data.flight}
        position={[s*(.32+.025*Math.sin(i*.46)),.66-i*.044,-.12-i*.018]}
        rotation={[.35, s*1.18,s*(.12-i*.015)]} scale={[.88,.76+i*.046,1]}>{vane}</mesh>)}
      {Array.from({length:4},(_,row)=>Array.from({length:6},(_,i)=><mesh key={row+':'+i} geometry={data.coverts}
        position={[s*(.285+.025*row+.012*Math.cos(i)),.96-row*.16-i*.025,-.035-i*.045]}
        rotation={[.30,s*1.09,s*.16]} scale={[.60,.32+.045*row,.65]}>{vane}</mesh>))}
      <mesh position={[s*.17,-.13,.04]} scale={[.11,.20,.11]}><sphereGeometry args={[1,24,18]}/><meshStandardMaterial color="#8c826d" roughness={.9}/></mesh>
      <mesh position={[s*.17,-.31,.055]}><cylinderGeometry args={[.045,.05,.27,14]}/><meshStandardMaterial color="#c5a34c" roughness={.75}/></mesh>
      <group position={[s*.17,-.45,.065]}>
        {data.toes.map((g,i)=><mesh key={i} geometry={g}><meshStandardMaterial color="#c9a34e" roughness={.8} side={THREE.DoubleSide}/></mesh>)}
        {data.claws.map((g,i)=><mesh key={i} geometry={g}><meshStandardMaterial color="#474440" roughness={.6} side={THREE.DoubleSide}/></mesh>)}
      </group>
    </group>)}
    {Array.from({length:8},(_,i)=><mesh key={i} geometry={data.flight} position={[(i-3.5)*.057,.20,-.27]}
      rotation={[.47,0,(i-3.5)*.055]} scale={[.85,.97-.045*Math.abs(i-3.5),.70]}>{vane}</mesh>)}
    <mesh position={[0,-.59,.15]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.12,.145,1.70,18]}/><meshStandardMaterial color="#756451" roughness={.95}/></mesh>
    <mesh position={[0,-.84,.15]} scale={[.99,.15,.62]}><dodecahedronGeometry args={[1,1]}/><meshStandardMaterial color="#8d877a" roughness={.98}/></mesh>
  </group>
}
