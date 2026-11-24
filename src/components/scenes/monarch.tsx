import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

type P=[number,number]
type WingDesign={shape:THREE.Shape; veins:P[][]; spots:P[]; bounds:[number,number,number,number]}
function forewing():WingDesign{
  const shape=new THREE.Shape()
  shape.moveTo(.03,.10);shape.bezierCurveTo(.24,.66,.81,1.25,1.57,1.08)
  shape.bezierCurveTo(1.87,.91,1.88,.54,1.72,.28)
  shape.bezierCurveTo(1.53,.08,1.10,-.11,.73,-.23)
  shape.bezierCurveTo(.38,-.21,.14,-.06,.03,.10)
  return {shape,bounds:[0,-.27,1.91,1.28],
    veins:[
      [[.04,.10],[.43,.37],[.86,.71],[1.52,1.07]],
      [[.04,.10],[.62,.28],[1.03,.49],[1.81,.62]],
      [[.04,.10],[.55,.08],[1.11,.14],[1.72,.29]],
      [[.43,.37],[.66,.62],[.75,.96]],
      [[.86,.71],[1.12,.88],[1.28,1.10]],
      [[.86,.71],[1.03,.49],[1.51,.75],[1.75,.83]],
      [[1.03,.49],[1.11,.14],[1.45,.03]],
      [[.62,.28],[.75,.04],[.86,-.19]],
      [[.30,.16],[.43,-.15]]
    ],spots:[[1.53,.98],[1.67,.91],[1.75,.77],[1.78,.63],[1.73,.47],[1.67,.32],[1.56,.21],[1.41,.12],[1.28,.055],[1.13,-.02],[.99,-.09],[.85,-.14],[.69,-.14],[.55,-.105],[1.36,1.06],[1.21,1.075],[1.06,1.07]]}
}
function hindwing():WingDesign{
  const shape=new THREE.Shape()
  shape.moveTo(.02,-.07);shape.bezierCurveTo(.52,.20,1.19,.18,1.38,-.23)
  shape.bezierCurveTo(1.60,-.60,1.28,-.99,.89,-1.12)
  shape.bezierCurveTo(.47,-1.26,.19,-1.00,.10,-.75)
  shape.bezierCurveTo(.03,-.53,-.02,-.20,.02,-.07)
  return {shape,bounds:[-.03,-1.27,1.62,.24],
    veins:[
      [[.04,-.09],[.43,-.21],[.90,-.32],[1.37,-.30]],
      [[.04,-.09],[.32,-.41],[.65,-.65],[1.13,-1.00]],
      [[.04,-.09],[.18,-.48],[.37,-.82],[.46,-1.12]],
      [[.43,-.21],[.64,-.04],[.86,.11]],
      [[.43,-.21],[.65,-.65],[.80,-1.14]],
      [[.65,-.65],[.90,-.56],[1.43,-.64]],
      [[.90,-.32],[1.04,-.55],[1.31,-.87]],
      [[.18,-.48],[.10,-.65]]
    ],spots:[[1.32,-.30],[1.39,-.44],[1.39,-.60],[1.31,-.75],[1.21,-.88],[1.08,-.98],[.93,-1.05],[.77,-1.10],[.60,-1.10],[.45,-1.04],[.32,-.95],[.23,-.82],[.16,-.67],[.94,.055],[1.08,.005],[1.20,-.09]]}
}
function distanceSq(x:number,y:number,a:P,b:P){
  const dx=b[0]-a[0],dy=b[1]-a[1]
  const t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy||1)))
  return (x-a[0]-t*dx)**2+(y-a[1]-t*dy)**2
}
/** Original rasterized pigmentation. Borders, branching veins and paired
 * white marginal spots are mapped onto four distinct curved wing membranes.
 * No photograph is used as a texture. */
function pigment(d:WingDesign){
  const size=512,data=new Uint8Array(size*size*4)
  const [minX,minY,maxX,maxY]=d.bounds
  const poly=d.shape.getPoints(24).map(p=>[p.x,p.y] as P)
  const lines=d.veins.flatMap(path=>path.slice(1).map((p,i)=>[path[i],p] as [P,P]))
  const edge=poly.slice(1).map((p,i)=>[poly[i],p] as [P,P])
  const smooth=(a:number,b:number,x:number)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)}
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const px=minX+x/(size-1)*(maxX-minX),py=minY+y/(size-1)*(maxY-minY)
    let ed=1e6,ve=1e6
    for(const [a,b] of edge)ed=Math.min(ed,distanceSq(px,py,a,b))
    for(const [a,b] of lines)ve=Math.min(ve,distanceSq(px,py,a,b))
    const border=.115+.018*Math.sin(px*8)
    let dark=1-smooth(border-.012,border+.012,Math.sqrt(ed))
    dark=Math.max(dark,1-smooth(.014,.026,Math.sqrt(ve)))
    const rand=Math.sin(x*12.9898+y*78.233)*43758.5453
    const grain=(rand-Math.floor(rand)-.5)*12
    const scaleTexture=Math.sin(x*2.9+y*.7)*Math.sin(y*3.4)*3
    const warm=[235,122+28*Math.sin(px*2.4+py*.8),24]
    const black=[31,27,24]
    let spot=0
    for(let j=0;j<d.spots.length;j++){
      const [sx,sy]=d.spots[j]
      const rx=.032+(j%3)*.005,ry=.023+(j%2)*.007
      const a=((px-sx)/rx)**2+((py-sy)/ry)**2
      spot=Math.max(spot,1-smooth(.70,1.1,a))
    }
    spot*=smooth(.5,.9,dark)
    const i=(y*size+x)*4
    for(let k=0;k<3;k++)data[i+k]=Math.max(0,Math.min(255,Math.round((warm[k]*(1-dark)+black[k]*dark)*(1-spot)+[247,239,215][k]*spot+grain+scaleTexture)))
    data[i+3]=255
  }
  const t=new THREE.DataTexture(data,size,size,THREE.RGBAFormat)
  t.colorSpace=THREE.SRGBColorSpace;t.minFilter=THREE.LinearMipmapLinearFilter;t.magFilter=THREE.LinearFilter;t.generateMipmaps=true;t.needsUpdate=true
  return t
}
function membrane(d:WingDesign){
  const g=new THREE.ShapeGeometry(d.shape,44)
  const a=g.getAttribute('position'),uv=g.getAttribute('uv')
  const [minX,minY,maxX,maxY]=d.bounds
  for(let i=0;i<a.count;i++){
    const x=a.getX(i),y=a.getY(i)
    a.setZ(i,.045*x*x+.017*Math.sin(y*4)*x)
    uv.setXY(i,(x-minX)/(maxX-minX),(y-minY)/(maxY-minY))
  }
  g.computeVertexNormals()
  return g
}
function WingPair({side,fore,hind}:{side:number;fore:{geometry:THREE.BufferGeometry;map:THREE.DataTexture};hind:{geometry:THREE.BufferGeometry;map:THREE.DataTexture}}){
  const ref=useRef<THREE.Group>(null)
  useFrame(({clock})=>{if(ref.current)ref.current.rotation.y=side*(.13+Math.sin(clock.elapsedTime*2.1)*.14)})
  return <group ref={ref} position={[side*.068,.03,0]} rotation={[0,side*.13,side*.025]} scale={[side,1,1]}>
    <mesh geometry={hind.geometry} position={[0,-.04,-.035]}>
      <meshPhysicalMaterial map={hind.map} color="#ffffff" roughness={.88} side={THREE.DoubleSide} sheen={.12} sheenColor="#d99b52"/>
    </mesh>
    <mesh geometry={fore.geometry} position={[0,.07,.015]}>
      <meshPhysicalMaterial map={fore.map} color="#ffffff" roughness={.84} side={THREE.DoubleSide} sheen={.12} sheenColor="#d99b52"/>
    </mesh>
  </group>
}
function Antenna({side}:{side:number}){
  const curve=useMemo(()=>new THREE.CatmullRomCurve3([
    new THREE.Vector3(side*.045,.41,.04),new THREE.Vector3(side*.10,.66,.06),
    new THREE.Vector3(side*.18,.89,.09),new THREE.Vector3(side*.24,1.03,.10)
  ]),[side])
  return <group>
    <mesh><tubeGeometry args={[curve,24,.009,6,false]}/><meshStandardMaterial color="#282526" roughness={.82}/></mesh>
    <mesh position={[side*.24,1.03,.10]} scale={[.018,.041,.018]} rotation={[0,0,-side*.4]}><sphereGeometry args={[1,12,8]}/><meshStandardMaterial color="#2d2927" roughness={.82}/></mesh>
  </group>
}
export default function MonarchButterfly(){
  const wings=useMemo(()=>{
    const f=forewing(),h=hindwing()
    return {fore:{geometry:membrane(f),map:pigment(f)},hind:{geometry:membrane(h),map:pigment(h)}}
  },[])
  useEffect(()=>()=>{wings.fore.geometry.dispose();wings.hind.geometry.dispose();wings.fore.map.dispose();wings.hind.map.dispose()},[wings])
  return <group rotation={[.14,-.18,.025]} scale={.92}>
    <WingPair side={1} {...wings}/><WingPair side={-1} {...wings}/>
    <mesh position={[0,-.24,.03]} scale={[.068,.42,.068]}><sphereGeometry args={[1,24,18]}/><meshPhysicalMaterial color="#282523" roughness={.86}/></mesh>
    {Array.from({length:6},(_,i)=><mesh key={i} position={[0,-.12-i*.082,.03]} rotation={[Math.PI/2,0,0]} scale={[1-i*.055,1-i*.055,1]}>
      <torusGeometry args={[.064,.005,6,20]}/><meshStandardMaterial color="#a39a84" roughness={.9}/>
    </mesh>)}
    <mesh position={[0,.15,.04]} scale={[.091,.18,.088]}><sphereGeometry args={[1,24,18]}/><meshStandardMaterial color="#252322" roughness={.92}/></mesh>
    <mesh position={[0,.34,.045]} scale={[.079,.086,.069]}><sphereGeometry args={[1,24,16]}/><meshStandardMaterial color="#292624" roughness={.82}/></mesh>
    {[-1,1].map(s=><group key={s}>
      <mesh position={[s*.061,.35,.073]} scale={[.035,.044,.032]}><sphereGeometry args={[1,20,14]}/><meshPhysicalMaterial color="#252323" roughness={.32}/></mesh>
      <Antenna side={s}/>
      {Array.from({length:3},(_,i)=><mesh key={i} position={[s*.054,.20-i*.07,.109]} scale={[.015,.020,.008]}><sphereGeometry args={[1,10,8]}/><meshStandardMaterial color="#eee5d1" roughness={.9}/></mesh>)}
      {Array.from({length:3},(_,i)=>{
        const y=.17-i*.105
        const path=new THREE.CatmullRomCurve3([new THREE.Vector3(s*.06,y,-.025),new THREE.Vector3(s*.16,y-.10,-.12),new THREE.Vector3(s*.13,y-.26,-.18)])
        return <mesh key={i}><tubeGeometry args={[path,12,.008,6,false]}/><meshStandardMaterial color="#38312b" roughness={.85}/></mesh>
      })}
    </group>)}
  </group>
}
