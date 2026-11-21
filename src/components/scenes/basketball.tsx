import { useMemo } from 'react'
import * as THREE from 'three'
import { SplineTube } from '../geometry/GeometryV2'

/**
 * Regulation-size basketball study: pebbled rubber/leather composite,
 * nine coordinated panel channels, valve and faint molded seam relief.
 * Locally authored procedural surface, no external image dependency.
 */
function leatherMaps() {
  const width = 256, height = 256
  const color = new Uint8Array(width * height * 4)
  const relief = new Uint8Array(width * height * 4)
  for (let y=0;y<height;y++) for (let x=0;x<width;x++) {
    const u=x/width, v=y/height
    const hex=2*Math.PI
    const cells=Math.cos(u*hex*34) * Math.cos(v*hex*46)
    const grain=Math.sin(x*12.9898+y*78.233)*43758.5453
    const noise=(grain-Math.floor(grain))-.5
    const pebble=Math.pow(Math.max(0,cells),5)
    const index=(y*width+x)*4
    const variation=noise*13+pebble*14
    color[index]=Math.round(173+variation)
    color[index+1]=Math.round(76+variation*.68)
    color[index+2]=Math.round(30+variation*.45)
    color[index+3]=255
    const grey=Math.round(116+pebble*74+noise*24)
    relief[index]=grey
    relief[index+1]=grey
    relief[index+2]=grey
    relief[index+3]=255
  }
  const setup=(data:Uint8Array)=>{
    const tex=new THREE.DataTexture(data,width,height,THREE.RGBAFormat)
    tex.wrapS=THREE.RepeatWrapping
    tex.wrapT=THREE.RepeatWrapping
    tex.magFilter=THREE.LinearFilter
    tex.minFilter=THREE.LinearMipmapLinearFilter
    tex.generateMipmaps=true
    tex.needsUpdate=true
    return tex
  }
  const leather=setup(color)
  leather.colorSpace=THREE.SRGBColorSpace
  const bump=setup(relief)
  return {leather,bump}
}
const {leather,bump}=leatherMaps()
type P=[number,number,number]
const spherePoint=(latitude:number,azimuth:number,radius=1.004):P => [
  Math.cos(latitude)*Math.cos(azimuth)*radius,
  Math.sin(latitude)*radius,
  Math.cos(latitude)*Math.sin(azimuth)*radius,
]
const channels = Array.from({length:4},(_,index)=> {
  const azimuth=index*Math.PI/4
  return Array.from({length:97},(_,sample)=>{
    const latitude=(sample/96)*Math.PI*2
    return spherePoint(latitude,azimuth)
  })
})
const equator=Array.from({length:129},(_,i)=>{
  const azimuth=i/128*Math.PI*2
  return spherePoint(0,azimuth)
})
const ringOne=Array.from({length:101},(_,i)=>{
  const t=i/100*Math.PI*2
  const latitude=.38*Math.sin(t*2)
  return spherePoint(latitude,t)
})
const ringTwo=Array.from({length:101},(_,i)=>{
  const t=i/100*Math.PI*2
  const latitude=-.38*Math.sin(t*2)
  return spherePoint(latitude,t)
})

export default function MatchBasketball() {
  const valve=useMemo(()=>spherePoint(-.32,.84,1.007),[])
  return <group rotation={[.19,-.39,.16]}>
    <mesh castShadow receiveShadow>
      <sphereGeometry args={[1,128,96]}/>
      <meshPhysicalMaterial map={leather} bumpMap={bump} bumpScale={.014}
        roughness={.83} metalness={0} clearcoat={.035} clearcoatRoughness={.7}/>
    </mesh>
    {channels.map((points,i)=><SplineTube key={i} points={points} closed
      radius={.0085} radialSegments={6} tubularSegments={120}>
      <meshStandardMaterial color="#292323" roughness={.94} metalness={0}/>
    </SplineTube>)}
    {[equator,ringOne,ringTwo].map((points,i)=><SplineTube key={'p'+i}
      points={points} closed radius={.008} radialSegments={6} tubularSegments={144}>
      <meshStandardMaterial color="#242020" roughness={.94}/>
    </SplineTube>)}
    <mesh position={valve} rotation={[0,Math.PI/4,.30]}>
      <sphereGeometry args={[.031,20,12]}/>
      <meshStandardMaterial color="#201c1c" roughness={.8}/>
    </mesh>
  </group>
}
