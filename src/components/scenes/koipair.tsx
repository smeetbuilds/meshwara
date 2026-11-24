import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const tau=Math.PI*2
const fract=(x:number)=>x-Math.floor(x)
const hash=(x:number,y:number)=>fract(Math.sin(x*127.1+y*311.7)*43758.5453)
const stations=[[-1.0,.035,.045],[-.83,.055,.073],[-.59,.105,.15],[-.22,.185,.25],[.18,.235,.29],[.49,.20,.25],[.72,.14,.16],[.87,.085,.088],[.96,.022,.025]]
function bodyGeometry(){
  const rows=64,cols=40,p:number[]=[],uv:number[]=[],idx:number[]=[]
  for(let i=0;i<=rows;i++){
    const x=-1+1.96*i/rows
    let k=0;while(k<stations.length-2&&x>stations[k+1][0])k++
    const a=stations[k],b=stations[k+1],t=(x-a[0])/(b[0]-a[0]),w=THREE.MathUtils.lerp(a[1],b[1],t),h=THREE.MathUtils.lerp(a[2],b[2],t)
    for(let j=0;j<=cols;j++){const a=j/cols*tau;p.push(x,h*Math.sin(a)+.055*(1-x*x),w*Math.cos(a));uv.push(i/rows,j/cols)}
  }
  for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const a=i*(cols+1)+j,b=a+cols+1;idx.push(a,a+1,b,a+1,b+1,b)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g
}
function koiMaps(variant:number){
  const w=512,h=256,color=new Uint8Array(w*h*4),bump=new Uint8Array(w*h*4)
  const patches=variant===0?[[.27,.24,.19,.26],[.63,.28,.17,.22],[.89,.25,.095,.20]]:[[.22,.27,.16,.23],[.55,.20,.19,.23],[.83,.30,.13,.22]]
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const u=x/w,v=y/h
    const wobble=.09*Math.sin(u*43+v*19)+.06*Math.sin(u*79-v*28)
    let red=0
    for(const [cx,cy,rx,ry] of patches){const d=((u-cx)/rx)**2+((v-cy)/ry)**2+wobble;red=Math.max(red,1-THREE.MathUtils.smoothstep(d,.77,1.10))}
    let ink=0
    if(variant===1){for(const [cx,cy,rx,ry] of [[.39,.18,.09,.13],[.72,.37,.07,.12],[.92,.17,.047,.10]]){const d=((u-cx)/rx)**2+((v-cy)/ry)**2+wobble;ink=Math.max(ink,1-THREE.MathUtils.smoothstep(d,.65,1.15))}}
    const sx=u*39,sy=v*18,row=Math.floor(sy),a=fract(sx+(row%2)*.5)-.5,b=fract(sy)
    const arc=Math.abs(b-(.78-.85*a*a)),ridge=(1-THREE.MathUtils.smoothstep(arc,.018,.075))*(1-THREE.MathUtils.smoothstep(u,.78,.93))
    const white=[228,219,198],orange=variant===0?[205,68,25]:[197,75,32],black=[38,42,40],grain=(hash(x,y)-.5)*8
    const i=(y*w+x)*4
    for(let k=0;k<3;k++){color[i+k]=Math.round(THREE.MathUtils.clamp((white[k]*(1-red)+orange[k]*red)*(1-ink)+black[k]*ink-ridge*17+grain,0,255))}
    color[i+3]=255;bump[i]=bump[i+1]=bump[i+2]=Math.round(155-ridge*74+grain);bump[i+3]=255
  }
  function tex(a:Uint8Array){const t=new THREE.DataTexture(a,w,h,THREE.RGBAFormat);t.wrapT=THREE.RepeatWrapping;t.minFilter=THREE.LinearMipmapLinearFilter;t.magFilter=THREE.LinearFilter;t.generateMipmaps=true;t.needsUpdate=true;return t}
  const map=tex(color);map.colorSpace=THREE.SRGBColorSpace;return {map,bump:tex(bump)}
}
/** Thin fin membranes with radial fin rays represented by vertex pigmentation. */
function finGeometry(type:'tail'|'dorsal'|'pectoral'|'pelvic'){
  const rows=18,cols=30,p:number[]=[],c:number[]=[],idx:number[]=[]
  const pale=new THREE.Color('#e6d6bc'),ray=new THREE.Color('#b79b7f')
  for(let i=0;i<=rows;i++)for(let j=0;j<=cols;j++){
    const u=i/rows,v=j/cols,s=v*2-1
    if(type==='tail')p.push(-u*(.46+.24*Math.abs(s)**.8),s*.43*u,.035*Math.sin(s*Math.PI)*u*u)
    else if(type==='dorsal')p.push(-.46*u+.43*v,.19*Math.sin(Math.PI*v)*u,.025*Math.sin(v*Math.PI*2)*u)
    else {const length=type==='pectoral'?.43:.26;p.push(-u*(length+.10*Math.abs(s)),.06*Math.sin(Math.PI*u)*s,s*.14*u+u*.12)}
    const shade=pale.clone().lerp(ray,.18+.26*Math.pow(Math.max(0,Math.cos(v*12*tau)),16)+.16*(1-u));c.push(shade.r,shade.g,shade.b)
  }
  for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const a=i*(cols+1)+j,b=a+cols+1;idx.push(a,b,a+1,a+1,b,b+1)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('color',new THREE.Float32BufferAttribute(c,3));g.setIndex(idx);g.computeVertexNormals();return g
}
function Fish({variant}:{variant:number}){
  const root=useRef<THREE.Group>(null),tail=useRef<THREE.Group>(null)
  const data=useMemo(()=>{const body=bodyGeometry();return {body,base:Float32Array.from(body.getAttribute('position').array),maps:koiMaps(variant),tail:finGeometry('tail'),dorsal:finGeometry('dorsal'),pectoral:finGeometry('pectoral'),pelvic:finGeometry('pelvic')}},[variant])
  useEffect(()=>()=>{data.body.dispose();data.maps.map.dispose();data.maps.bump.dispose();data.tail.dispose();data.dorsal.dispose();data.pectoral.dispose();data.pelvic.dispose()},[data])
  useFrame(({clock})=>{
    const t=clock.elapsedTime,phase=t*.40+variant*Math.PI
    if(root.current){root.current.position.set(Math.cos(phase)*.87,.16+Math.sin(t*.65+variant)*.035,Math.sin(phase)*.87);root.current.rotation.y=-phase-Math.PI/2}
    const a=data.body.getAttribute('position')
    for(let i=0;i<a.count;i++){const x=data.base[i*3],w=Math.pow(Math.max(0,(.4-x)/1.4),2);a.setZ(i,data.base[i*3+2]+w*.13*Math.sin(t*3.6-x*3+variant))}
    a.needsUpdate=true;data.body.computeVertexNormals()
    if(tail.current){tail.current.rotation.y=.29*Math.sin(t*3.6+3+variant);tail.current.position.z=.13*Math.sin(t*3.6+3+variant)}
  })
  const fin=<meshPhysicalMaterial vertexColors roughness={.65} side={THREE.DoubleSide} transparent opacity={.93}/>
  return <group ref={root} scale={.70}>
    <mesh geometry={data.body}><meshPhysicalMaterial map={data.maps.map} bumpMap={data.maps.bump} bumpScale={.022} roughness={.46} clearcoat={.25} side={THREE.DoubleSide}/></mesh>
    <group ref={tail} position={[-.98,.03,0]}><mesh geometry={data.tail}>{fin}</mesh></group>
    <mesh geometry={data.dorsal} position={[.03,.27,0]}>{fin}</mesh>
    {[-1,1].map(s=><group key={s}>
      <mesh geometry={data.pectoral} position={[.37,-.08,s*.19]} scale={[1,1,s]} rotation={[s*.19,s*.35,0]}>{fin}</mesh>
      <mesh geometry={data.pelvic} position={[-.40,-.12,s*.11]} scale={[1,1,s]} rotation={[s*.23,s*.35,0]}>{fin}</mesh>
      <mesh position={[.73,.09,s*.145]} scale={[.052,.052,.029]}><sphereGeometry args={[1,24,16]}/><meshPhysicalMaterial color="#b89855" roughness={.4}/></mesh>
      <mesh position={[.74,.09,s*.165]} scale={[.033,.033,.017]}><sphereGeometry args={[1,24,16]}/><meshPhysicalMaterial color="#181b18" roughness={.16}/></mesh>
      <mesh position={[.75,.105,s*.181]} scale={.007}><sphereGeometry args={[1,10,8]}/><meshBasicMaterial color="#e8e9de"/></mesh>
      <mesh><tubeGeometry args={[new THREE.CatmullRomCurve3([new THREE.Vector3(.88,-.04,s*.06),new THREE.Vector3(.97,-.065,s*.09),new THREE.Vector3(1.02,-.09,s*.11)]),12,.007,6,false]}/><meshStandardMaterial color="#b68c70" roughness={.8}/></mesh>
      <mesh position={[.51,.015,s*.218]} rotation={[0,s*.25,-.18]} scale={[.009,.13,.009]}><sphereGeometry args={[1,20,10]}/><meshStandardMaterial color="#a98972" roughness={.7}/></mesh>
    </group>)}
    <mesh position={[.94,-.02,0]} scale={[.019,.025,.058]}><sphereGeometry args={[1,20,12]}/><meshStandardMaterial color="#9b735e" roughness={.76}/></mesh>
  </group>
}
export default function KoiPair(){
  return <group rotation={[.52,-.25,.02]}>
    <Fish variant={0}/><Fish variant={1}/>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.10,0]}><circleGeometry args={[1.78,96]}/><meshPhysicalMaterial color="#688f8c" roughness={.27} clearcoat={.72} transparent opacity={.27} depthWrite={false} side={THREE.DoubleSide}/></mesh>
    {[.80,1.22,1.62].map((r,i)=><mesh key={r} position={[0,-.085,0]} rotation={[-Math.PI/2,0,0]}><torusGeometry args={[r,.002,5,96]}/><meshStandardMaterial color="#b2c6b9" transparent opacity={.21-i*.045} depthWrite={false}/></mesh>)}
  </group>
}
