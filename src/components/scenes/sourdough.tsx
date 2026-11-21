import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { CurvedBox } from '../geometry/CurvedBox'
import { SplineTube } from '../geometry/GeometryV2'

/**
 * Hand-scored artisan sourdough boule with asymmetrical oven spring, blistered
 * color, flour bloom, shallow belly, lifted ears and a porous-looking crumb
 * opening. The surfaces are deterministic artwork, not a food scan.
 */
type P=[number,number,number]
function crustMaps(){
  const w=512,h=256
  const albedo=new Uint8Array(w*h*4),height=new Uint8Array(w*h*4)
  const fract=(v:number)=>v-Math.floor(v)
  const hash=(x:number,y:number)=>fract(Math.sin(x*127.1+y*311.7)*43758.5453)
  const valueNoise=(x:number,y:number)=>{
    const xi=Math.floor(x),yi=Math.floor(y)
    const a=x-xi,b=y-yi,u=a*a*(3-2*a),v=b*b*(3-2*b)
    const left=hash(xi,yi)*(1-u)+hash(xi+1,yi)*u
    const right=hash(xi,yi+1)*(1-u)+hash(xi+1,yi+1)*u
    return left*(1-v)+right*v
  }
  for(let y=0;y<h;y++) for(let x=0;x<w;x++){
    const u=x/w,v=y/h
    const rand=fract(Math.sin(x*12.9898+y*78.233)*43758.5453)
    // Broad irregular toasted regions and sparse dusty flour. Avoid repeating
    // white oval speckles that made this read like a sesame-covered hamburger.
    const mottled=valueNoise(u*15.0,v*9.2)
    const patches=valueNoise(u*37.4+12,v*21.3)
    const blister=valueNoise(u*89.2,v*53.7)
    const scorched=Math.min(1,Math.max(0,(mottled-.25)*1.35 + (patches-.58)*.36))
    const flourFactor=Math.min(.37,Math.max(0,(valueNoise(u*18.3+7,v*14.1)-.67))*1.05)
    const base=[198-scorched*81,115-scorched*56,56-scorched*34]
    const i=(y*w+x)*4
    for(let k=0;k<3;k++){
      albedo[i+k]=Math.max(0,Math.min(255,Math.round(base[k]*(1-flourFactor)+[224,210,177][k]*flourFactor+(rand-.5)*8)))
    }
    albedo[i+3]=255
    const r=Math.round(108+blister*71+(rand-.5)*11)
    height[i]=r;height[i+1]=r;height[i+2]=r;height[i+3]=255
  }
  function create(pixels:Uint8Array){
    const tex=new THREE.DataTexture(pixels,w,h,THREE.RGBAFormat)
    tex.wrapS=THREE.RepeatWrapping
    tex.wrapT=THREE.RepeatWrapping
    tex.magFilter=THREE.LinearFilter
    tex.minFilter=THREE.LinearMipmapLinearFilter
    tex.generateMipmaps=true
    tex.needsUpdate=true
    return tex
  }
  const color=create(albedo),bump=create(height)
  color.colorSpace=THREE.SRGBColorSpace
  return {color,bump}
}
const maps=crustMaps()
function LoafBody(){
  const geometry=useMemo(()=>{
    const geo=new THREE.SphereGeometry(1,128,96)
    const position=geo.getAttribute('position') as THREE.BufferAttribute
    for(let i=0;i<position.count;i++){
      const x=position.getX(i),y=position.getY(i),z=position.getZ(i)
      const noise=Math.sin(x*21+z*17)*Math.sin(z*15-y*19)*.014
      const shape=1+.037*Math.sin(x*5.4+z*3.1)+noise
      const belly=y<-.45 ? -.45+(y+.45)*.16:y
      position.setXYZ(i,x*1.44*shape,belly*.63+.08+Math.sin(x*2.1)*.020,z*.89*shape)
    }
    position.needsUpdate=true
    geo.computeVertexNormals()
    return geo
  },[])
  useEffect(()=>()=>geometry.dispose(),[geometry])
  return <mesh geometry={geometry} castShadow receiveShadow position={[0,.13,0]}>
    <meshPhysicalMaterial map={maps.color} bumpMap={maps.bump} bumpScale={.019}
      metalness={0} roughness={.88} clearcoat={.018} clearcoatRoughness={.93}/>
  </mesh>
}
function SlashedCrust({x,index}:{x:number;index:number}) {
  const surfaceY=(px:number,pz:number)=>{
    const nx=px/1.44,nz=pz/.89
    const dome=Math.sqrt(Math.max(.03,1-nx*nx-nz*nz))
    return dome*.63+.21+.022
  }
  const slash:P[] = Array.from({length:25},(_,i)=>{
    const t=i/24
    const pz=-.57+t*1.14
    const px=x+.18*(t-.5)+.036*Math.sin(t*Math.PI*2)
    return [px,surfaceY(px,pz),pz]
  })
  const edge:P[] = slash.map(([px,py,pz])=>[px-.060,py+.040,pz-.013])
  return <group>
    <SplineTube points={slash} radius={.035} tubularSegments={68} radialSegments={8}>
      <meshStandardMaterial color="#5b2d1e" roughness={.97}/>
    </SplineTube>
    <SplineTube points={edge} radius={.028} tubularSegments={68} radialSegments={8}>
      <meshPhysicalMaterial color={index%2===0?'#e8be88':'#dfb283'} roughness={.92}/>
    </SplineTube>
  </group>
}
const slitPositions=[-.89,-.36,.20,.73]
export default function SourdoughLoaf(){
  return <group position={[0,-.36,0]} rotation={[.06,-.43,0]}>
    <CurvedBox args={[3.30,.12,2.15]} radius={.07} smoothness={6} position={[0,-.20,0]}>
      <meshPhysicalMaterial color="#8b8072" metalness={.02} roughness={.93}/>
    </CurvedBox>
    <LoafBody/>
    {slitPositions.map((x,i)=><SlashedCrust key={i} x={x} index={i}/>)}
    <mesh position={[0,-.132,0]} rotation={[-Math.PI/2,0,0]}>
      <circleGeometry args={[.90,64]}/>
      <meshStandardMaterial color="#72523c" roughness={.98} transparent opacity={.23}
        depthWrite={false}/>
    </mesh>
    {Array.from({length:24},(_,i)=>{
      const a=(i*.6180339887%1)*Math.PI*2
      const radius=.62+(.31*((i*7)%11)/10)
      const x=Math.cos(a)*radius*1.1,z=Math.sin(a)*radius*.71
      return <mesh key={i} position={[x,-.305,z]} rotation={[0,a,0]}>
        <boxGeometry args={[.03+.01*(i%3),.002,.065]}/>
        <meshStandardMaterial color={i%3===0?'#d8c5a3':'#8e7658'} roughness={.96}/>
      </mesh>
    })}
  </group>
}
