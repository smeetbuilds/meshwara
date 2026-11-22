import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/artisan-bread-basket.glb'

/** Three original baked loaves recessed inside a true CC0 woven wicker scan.
 * The source basket includes measured wicker mesh and embedded PBR maps;
 * the bread geometry, irregular bake pattern and slashes are deterministic.
 */
function crustMaps(){
  const w=256,h=256,color=new Uint8Array(w*h*4),height=new Uint8Array(w*h*4)
  const fract=(v:number)=>v-Math.floor(v)
  const hash=(x:number,y:number)=>fract(Math.sin(x*127.1+y*311.7)*43758.5453)
  function noise(x:number,y:number){
    const xi=Math.floor(x),yi=Math.floor(y),u=(x-xi),v=(y-yi)
    const a=u*u*(3-2*u),b=v*v*(3-2*v)
    const l=hash(xi,yi)*(1-a)+hash(xi+1,yi)*a
    const r=hash(xi,yi+1)*(1-a)+hash(xi+1,yi+1)*a
    return l*(1-b)+r*b
  }
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const u=x/w,v=y/h,n=noise(u*18.5,v*13.3),p=noise(u*41+7,v*27),f=noise(u*21,v*22+9)
    const char=Math.max(0,Math.min(1,(n-.28)*1.18+(p-.6)*.33))
    const flour=Math.max(0,Math.min(.33,(f-.70)*1.7))
    const baked=[192-char*90,109-char*51,54-char*31]
    const i=(y*w+x)*4
    for(let k=0;k<3;k++)color[i+k]=Math.round(baked[k]*(1-flour)+[240,225,193][k]*flour)
    color[i+3]=255
    const grain=Math.round(92+noise(u*79,v*67)*86)
    height[i]=grain;height[i+1]=grain;height[i+2]=grain;height[i+3]=255
  }
  function tex(data:Uint8Array){
    const texture=new THREE.DataTexture(data,w,h,THREE.RGBAFormat)
    texture.wrapS=THREE.RepeatWrapping;texture.wrapT=THREE.RepeatWrapping
    texture.minFilter=THREE.LinearMipmapLinearFilter
    texture.magFilter=THREE.LinearFilter
    texture.generateMipmaps=true;texture.needsUpdate=true
    return texture
  }
  const albedo=tex(color);albedo.colorSpace=THREE.SRGBColorSpace
  return {albedo,bump:tex(height)}
}
const maps=crustMaps()
const breads=[
  {position:[-.48,-.89,-.08] as const,scale:[.58,.22,.28] as const,angle:-.22},
  {position:[.42,-.88,.13] as const,scale:[.55,.20,.27] as const,angle:.24},
  {position:[.03,-.72,-.20] as const,scale:[.48,.19,.24] as const,angle:.08},
]
function Loaf({index,position,scale,angle}:{index:number;position:readonly[number,number,number];scale:readonly[number,number,number];angle:number}){
  const geometry=useMemo(()=>{
    const g=new THREE.SphereGeometry(1,72,48)
    const p=g.getAttribute('position') as THREE.BufferAttribute
    for(let i=0;i<p.count;i++){
      const x=p.getX(i),y=p.getY(i),z=p.getZ(i)
      const d=.021*Math.sin(x*15+index*3)*Math.sin(z*17+y*5)
      p.setXYZ(i,x*(1+d),y*(1+d*.64),z*(1+d))
    }
    p.needsUpdate=true;g.computeVertexNormals();return g
  },[index])
  useEffect(()=>()=>geometry.dispose(),[geometry])
  return <group position={[...position]} rotation={[0,angle,0]}>
    <mesh geometry={geometry} scale={[...scale]} castShadow receiveShadow>
      <meshPhysicalMaterial map={maps.albedo} bumpMap={maps.bump} bumpScale={.018}
        roughness={.89} metalness={0} clearcoat={.016}/>
    </mesh>
    {[-.24,0,.24].map((x,j)=>{
      const curve=new THREE.CatmullRomCurve3([
        new THREE.Vector3(x-.06,scale[1]*.76,-scale[2]*.48),
        new THREE.Vector3(x,scale[1]*.99,0),
        new THREE.Vector3(x+.08,scale[1]*.77,scale[2]*.48),
      ])
      return <mesh key={j}><tubeGeometry args={[curve,15,.011,7,false]}/>
        <meshStandardMaterial color="#704225" roughness={.98}/></mesh>
    })}
  </group>
}
export default function ArtisanBreadBasket(){
  return <group rotation={[0,-.29,0]} position={[0,.03,0]}>
    <CC0Mesh url={modelUrl} maxSize={2.64} rotation={[0,0,0]} position={[0,0,0]}/>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.25,0]}>
      <planeGeometry args={[1.92,1.25]}/>
      <meshStandardMaterial color="#cbb69a" roughness={.99} side={THREE.DoubleSide}/>
    </mesh>
    {breads.map((bread,i)=><Loaf key={i} {...bread} index={i}/>)}
    {Array.from({length:17},(_,i)=>{
      const a=i*2.3999632,r=.18+(i%6)*.087
      return <mesh key={i} position={[Math.cos(a)*r,-1.20,Math.sin(a)*r*.62]}>
        <sphereGeometry args={[.010+(i%3)*.004,8,6]}/>
        <meshStandardMaterial color="#e6d7b7" roughness={1}/>
      </mesh>
    })}
  </group>
}
