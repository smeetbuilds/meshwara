import * as THREE from 'three'
import { RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

/**
 * Small woodland mushroom colony with variable convex pileus profiles,
 * visible radial gills, tapering stems and basal mycelial fibers. Procedural
 * albedo mottling and organic variation are artwork, not a mushroom scan.
 */
type P=[number,number,number]
const species=[
  {x:-.63,z:-.05,s:.70,tilt:-.10,color:0},
  {x:-.05,z:-.23,s:.95,tilt:.08,color:1},
  {x:.59,z:.08,s:.76,tilt:.12,color:0},
  {x:.18,z:.47,s:.57,tilt:-.04,color:2},
  {x:-.47,z:.48,s:.51,tilt:.11,color:1}
] as const
const capShape:[number,number][]=[
  [.60,.067],[.675,.079],[.70,.10],[.68,.145],
  [.58,.225],[.45,.29],[.31,.34],[.15,.375],[0,.39]
]
const stems:[number,number][]=[[.17,0],[.18,.05],[.15,.24],[.13,.49],[.14,.70],[.18,.89]]
function capMap(index:number){
  const w=256,h=256,p=new Uint8Array(w*h*4)
  const colors=[[142,102,71],[115,83,60],[160,130,91]]
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const u=x/w,v=y/h,i=(y*w+x)*4
    const rand=Math.sin(x*12.9898+y*78.233)*43758.5453
    const grain=(rand-Math.floor(rand))-.5
    const mottling=Math.sin(u*59+v*17)*Math.cos(v*57-u*9)
    const rings=Math.sin(Math.hypot(u-.5,v-.5)*72+3*mottling)
    for(let k=0;k<3;k++)p[i+k]=Math.round(Math.max(0,Math.min(255,
      colors[index][k]+mottling*11+rings*4+grain*16)))
    p[i+3]=255
  }
  const tex=new THREE.DataTexture(p,w,h,THREE.RGBAFormat)
  tex.colorSpace=THREE.SRGBColorSpace
  tex.minFilter=THREE.LinearMipmapLinearFilter
  tex.magFilter=THREE.LinearFilter
  tex.generateMipmaps=true
  tex.needsUpdate=true
  return tex
}
const caps=[capMap(0),capMap(1),capMap(2)]
const mycelium:P[][]=Array.from({length:24},(_,i)=>{
  const a=i/24*Math.PI*2,r=.33+((i*7)%11)*.035
  return [[Math.cos(a)*r,-.56,Math.sin(a)*r],
    [Math.cos(a+.10)*(r+.12),-.51,Math.sin(a+.10)*(r+.12)],
    [Math.cos(a+.08)*(r+.25),-.54,Math.sin(a+.08)*(r+.25)]]
})
function Mushroom({x,z,s,tilt,color}:{x:number;z:number;s:number;tilt:number;color:number}){
  const gills=Array.from({length:24},(_,i)=>{
    const a=i/24*Math.PI*2
    return [[Math.cos(a)*.13,.89,Math.sin(a)*.13],
      [Math.cos(a)*.43,.895,Math.sin(a)*.43],
      [Math.cos(a)*.64,.90,Math.sin(a)*.64]] as P[]
  })
  return <group position={[x,-.41,z]} rotation={[0,(color-.5)*.34,tilt]} scale={s}>
    <RevolvedSurface profile={stems} radialSegments={36} castShadow receiveShadow>
      <meshPhysicalMaterial color="#c9bda4" roughness={.92} metalness={0}/>
    </RevolvedSurface>
    <mesh position={[0,.16,0]} scale={[.23,.18,.21]}>
      <sphereGeometry args={[1,22,16]}/>
      <meshStandardMaterial color="#c4ad8f" roughness={.98}/>
    </mesh>
    <RevolvedSurface profile={capShape} radialSegments={64}
      position={[0,.82,0]} castShadow receiveShadow>
      <meshPhysicalMaterial map={caps[color]} roughness={.84} metalness={0}
        clearcoat={.035} clearcoatRoughness={.88}/>
    </RevolvedSurface>
    <mesh position={[0,.91,0]} rotation={[Math.PI/2,0,0]}>
      <circleGeometry args={[.65,64]}/>
      <meshStandardMaterial color={color===1?'#baa28e':'#d4c6a7'} roughness={.97}
        side={THREE.DoubleSide}/>
    </mesh>
    {gills.map((points,i)=><SplineTube key={i} points={points}
      radius={.008} radialSegments={5} tubularSegments={8}>
      <meshStandardMaterial color={color===1?'#9f8b79':'#b7aa92'} roughness={.97}/>
    </SplineTube>)}
    <mesh position={[0,.90,0]} rotation={[Math.PI/2,0,0]}>
      <torusGeometry args={[.63,.016,8,64]}/>
      <meshStandardMaterial color="#b4a38e" roughness={.92}/>
    </mesh>
    {Array.from({length:9},(_,i)=>{
      const a=i/9*Math.PI*2
      return <mesh key={i} position={[Math.cos(a)*.11,.46,Math.sin(a)*.11]}
        rotation={[a,0,0]}>
        <boxGeometry args={[.018,.055,.012]}/>
        <meshStandardMaterial color="#b2a78f" roughness={.99}/>
      </mesh>
    })}
  </group>
}
export default function MushroomCluster(){
  return <group position={[0,-.33,0]} rotation={[.05,-.31,0]} scale={1.12}>
    <mesh position={[0,-.53,0]} scale={[1.35,.19,1.05]} castShadow receiveShadow>
      <sphereGeometry args={[1,64,28]}/>
      <meshPhysicalMaterial color="#5c554a" roughness={.98}/>
    </mesh>
    {species.map((item,i)=><Mushroom key={i} {...item}/>)}
    {mycelium.map((path,i)=><SplineTube key={i} points={path} radius={.008}
      radialSegments={4} tubularSegments={7}>
      <meshStandardMaterial color={i%3===0?'#b9b096':'#918a78'} roughness={.99}/>
    </SplineTube>)}
    {Array.from({length:18},(_,i)=>{
      const a=i*2.39996,r=.90+((i*7)%13)*.029
      return <mesh key={i} position={[Math.cos(a)*r,-.48,Math.sin(a)*r*.76]}
        rotation={[0,a,.12]}>
        <boxGeometry args={[.047,.025,.13]}/>
        <meshStandardMaterial color={i%2?'#645d4c':'#84785c'} roughness={.97}/>
      </mesh>
    })}
  </group>
}
