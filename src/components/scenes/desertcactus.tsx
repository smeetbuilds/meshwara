import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

type Vec = [number,number,number]
type Stem = {points: Vec[]; radius:number; ribs:number; length:number}
const stems:Stem[]=[
  {points:[[0,-1.34,0],[.016,-.62,.012],[-.023,.25,0],[.01,1.12,-.025],[.03,1.58,-.02]],radius:.255,ribs:18,length:2.94},
  {points:[[-.12,-.28,.03],[-.43,-.26,.05],[-.72,.04,.045],[-.76,.55,.045],[-.75,.91,.03]],radius:.175,ribs:15,length:1.60},
  {points:[[.12,-.68,-.04],[.43,-.62,-.07],[.68,-.36,-.09],[.78,.03,-.09],[.78,.58,-.085]],radius:.153,ribs:14,length:1.50},
  {points:[[.10,.32,.09],[.32,.35,.22],[.46,.60,.27],[.47,.93,.26]],radius:.119,ribs:12,length:.87},
]
const tau=Math.PI*2
const noise=(x:number)=>{const n=Math.sin(x*127.1+31.7)*43758.5453;return n-Math.floor(n)}
const makeCurve=(stem:Stem)=>new THREE.CatmullRomCurve3(stem.points.map(p=>new THREE.Vector3(...p)))
function makeStem(stem:Stem) {
  const curve=makeCurve(stem)
  const rows=54,cols=stem.ribs*4
  const frames=curve.computeFrenetFrames(rows,false)
  const positions:number[]=[],colors:number[]=[],uvs:number[]=[],indices:number[]=[]
  const ridgeColor=new THREE.Color('#778c51'),troughColor=new THREE.Color('#465d38')
  const pale=new THREE.Color('#a5aa78')
  for(let row=0;row<=rows;row++){
    const t=row/rows,c=curve.getPointAt(t)
    const n=frames.normals[row],b=frames.binormals[row]
    const taper=t>.89?Math.sqrt(Math.max(.0001,1-((t-.89)/.11)**2)):1
    const base=stem.radius*(.82+.18*Math.sin(Math.PI*Math.min(1,t*1.28)))*taper
    for(let col=0;col<=cols;col++){
      const a=col/cols*tau
      const rib=(1+Math.cos(a*stem.ribs))*.5
      const radius=base*(.83+.17*rib+.016*Math.sin(a*3+t*14))
      const p=c.clone().addScaledVector(n,Math.cos(a)*radius).addScaledVector(b,Math.sin(a)*radius)
      positions.push(p.x,p.y,p.z)
      const shade=troughColor.clone().lerp(ridgeColor,.25+.75*rib)
      const age=Math.pow(1-t,5)*.17+Math.max(0,Math.sin(t*43+a*5))*.035
      shade.lerp(pale,age)
      shade.multiplyScalar(.92+.10*noise(row*cols+col))
      colors.push(shade.r,shade.g,shade.b)
      uvs.push(col/cols,t)
    }
  }
  const stride=cols+1
  for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){
    const a=i*stride+j,b=a+stride
    indices.push(a,a+1,b,a+1,b+1,b)
  }
  const g=new THREE.BufferGeometry()
  g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3))
  g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3))
  g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2))
  g.setIndex(indices);g.computeVertexNormals()
  const normal=g.getAttribute('normal')
  for(let i=0;i<=rows;i++){
    const a=i*stride,b=a+cols
    const v=new THREE.Vector3(normal.getX(a)+normal.getX(b),normal.getY(a)+normal.getY(b),normal.getZ(a)+normal.getZ(b)).normalize()
    normal.setXYZ(a,v.x,v.y,v.z);normal.setXYZ(b,v.x,v.y,v.z)
  }
  const areoles:{point:THREE.Vector3;normal:THREE.Vector3;size:number}[]=[]
  const count=Math.floor(stem.length/.136)
  for(let row=1;row<count;row++){
    const t=row/count
    if(t>.94)continue
    const f=Math.round(t*rows),c=curve.getPointAt(t)
    const n=frames.normals[f],b=frames.binormals[f]
    const taper=t>.89?Math.sqrt(Math.max(.0001,1-((t-.89)/.11)**2)):1
    const base=stem.radius*(.82+.18*Math.sin(Math.PI*Math.min(1,t*1.28)))*taper
    for(let i=0;i<stem.ribs;i++){
      const a=i/stem.ribs*tau
      const d=n.clone().multiplyScalar(Math.cos(a)).addScaledVector(b,Math.sin(a)).normalize()
      const point=c.clone().addScaledVector(d,base*(1+.016*Math.sin(a*3+t*14)))
      areoles.push({point,normal:d,size:.76+noise(row*stem.ribs+i)*.45})
    }
  }
  return {geometry:g,areoles}
}
function RibbedStem({stem}:{stem:Stem}){
  const {geometry,areoles}=useMemo(()=>makeStem(stem),[stem])
  const dots=useRef<THREE.InstancedMesh>(null),spines=useRef<THREE.InstancedMesh>(null)
  useEffect(()=>()=>geometry.dispose(),[geometry])
  useEffect(()=>{
    const dot=dots.current,spine=spines.current
    if(!dot||!spine)return
    const obj=new THREE.Object3D(),axis=new THREE.Vector3(0,1,0)
    const color=new THREE.Color()
    let k=0
    areoles.forEach(({point,normal,size},i)=>{
      obj.position.copy(point).addScaledVector(normal,.004)
      obj.quaternion.setFromUnitVectors(axis,normal)
      obj.scale.set(.012*size,.005*size,.012*size);obj.updateMatrix()
      dot.setMatrixAt(i,obj.matrix)
      dot.setColorAt(i,color.set(i%6===0?'#8a7960':'#b9ab88'))
      const t=new THREE.Vector3().crossVectors(normal,Math.abs(normal.y)>.9?new THREE.Vector3(1,0,0):axis).normalize()
      const b=new THREE.Vector3().crossVectors(normal,t).normalize()
      for(let j=0;j<4;j++){
        const angle=j/4*tau+noise(i)*.4
        const dir=normal.clone().multiplyScalar(.47).addScaledVector(t,Math.cos(angle)*.88).addScaledVector(b,Math.sin(angle)*.88).normalize()
        const length=(.036+noise(i*7+j)*.033)*size
        obj.position.copy(point).addScaledVector(dir,length*.5)
        obj.quaternion.setFromUnitVectors(axis,dir)
        obj.scale.set(.0018*size,length,.0018*size);obj.updateMatrix()
        spine.setMatrixAt(k,obj.matrix)
        spine.setColorAt(k++,color.set(j===0?'#715b40':'#c8b98d'))
      }
    })
    dot.instanceMatrix.needsUpdate=true;spine.instanceMatrix.needsUpdate=true
    if(dot.instanceColor)dot.instanceColor.needsUpdate=true
    if(spine.instanceColor)spine.instanceColor.needsUpdate=true
    dot.computeBoundingSphere();spine.computeBoundingSphere()
  },[areoles])
  return <group>
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial vertexColors roughness={.76} clearcoat={.08} clearcoatRoughness={.8} side={THREE.DoubleSide}/>
    </mesh>
    <instancedMesh ref={dots} args={[undefined,undefined,areoles.length]}>
      <sphereGeometry args={[1,5,3]}/><meshStandardMaterial roughness={.98}/>
    </instancedMesh>
    <instancedMesh ref={spines} args={[undefined,undefined,areoles.length*4]}>
      <coneGeometry args={[1,1,3]}/><meshStandardMaterial roughness={.9}/>
    </instancedMesh>
  </group>
}
export default function DesertCactus(){
  return <group rotation={[.04,-.32,.018]}>
    {stems.map((stem,i)=><RibbedStem key={i} stem={stem}/>)}
    <mesh position={[0,-1.42,0]} scale={[1.13,.075,.82]} castShadow receiveShadow>
      <sphereGeometry args={[1,48,20]}/><meshStandardMaterial color="#a68c68" roughness={1}/>
    </mesh>
    {Array.from({length:26},(_,i)=>{
      const a=i*2.39996,r=.37+noise(i)*.64
      return <mesh key={i} position={[Math.cos(a)*r,-1.35,Math.sin(a)*r*.69]} rotation={[.3,a,.15]} scale={[.05+noise(i+7)*.06,.026+noise(i+9)*.025,.035+noise(i+2)*.035]}>
        <dodecahedronGeometry args={[1,0]}/><meshStandardMaterial color={i%3?'#87765f':'#bbab90'} roughness={1}/>
      </mesh>
    })}
  </group>
}
