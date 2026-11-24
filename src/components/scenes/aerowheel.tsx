import { useMemo, useEffect } from 'react'
import * as THREE from 'three'

/** Axial construction in XY, with Z as the common wheel and brake axis.
 * The tyre, rim barrel, drilled rotor, spokes and hub are independent parts.
 * Visualization only; not a dimensioned automotive engineering model. */
const alloy='#a7afb4', dark='#343b40'
const tau=Math.PI*2
const tyreProfile=[
  [.798,-.235],[.86,-.26],[.97,-.275],[1.075,-.25],[1.153,-.19],
  [1.181,-.11],[1.183,.11],[1.153,.19],[1.075,.25],[.97,.275],
  [.86,.26],[.798,.235],[.798,-.235]
]
const barrelProfile=[
  [.785,-.258],[.839,-.258],[.849,-.228],[.826,-.198],[.818,.188],
  [.85,.21],[.85,.258],[.782,.258],[.774,.225],[.781,-.22],[.785,-.258]
]
const ventCircle=Array.from({length:24},(_,i)=>{
  const a=i/24*tau;return [Math.cos(a)*.535,Math.sin(a)*.535] as const
})
const lugs=Array.from({length:5},(_,i)=>{
  const a=(i+.5)/5*tau;return [Math.cos(a)*.156,Math.sin(a)*.156] as const
})
function revolve(profile:number[][]){
  const g=new THREE.LatheGeometry(profile.map(([r,z])=>new THREE.Vector2(r,z)),128)
  g.rotateX(Math.PI/2);return g
}
function disk(radius:number,inner:number,depth:number,holes:readonly (readonly [number,number])[]=[],holeRadius=.025){
  const shape=new THREE.Shape();shape.absarc(0,0,radius,0,tau,false)
  if(inner>0){const hole=new THREE.Path();hole.absarc(0,0,inner,0,tau,true);shape.holes.push(hole)}
  for(const [x,y] of holes){const hole=new THREE.Path();hole.absarc(x,y,holeRadius,0,tau,true);shape.holes.push(hole)}
  const g=new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:false,curveSegments:48})
  g.translate(0,0,-depth/2);return g
}
function treadTexture(){
  const w=512,h=128,a=new Uint8Array(w*h*4)
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const u=x/w,v=y/h
    const center=Math.abs(v-.5)
    const circumferential=Math.min(Math.abs(v-.28),Math.abs(v-.5),Math.abs(v-.72))
    const grooves=1-THREE.MathUtils.smoothstep(circumferential,.011,.024)
    const pitch=(u*48+Math.abs(v-.5)*4.1)%1
    const lateral=1-THREE.MathUtils.smoothstep(Math.min(pitch,1-pitch),.09,.15)
    const shoulder=THREE.MathUtils.smoothstep(center,.12,.25)
    const grain=Math.sin(x*12.9898+y*78.233)*43758.5453
    const hgt=170-86*Math.max(grooves,lateral*shoulder)+15*(grain-Math.floor(grain))
    const i=(y*w+x)*4;a[i]=a[i+1]=a[i+2]=Math.round(hgt);a[i+3]=255
  }
  const t=new THREE.DataTexture(a,w,h,THREE.RGBAFormat);t.wrapS=THREE.RepeatWrapping;t.minFilter=THREE.LinearMipmapLinearFilter;t.magFilter=THREE.LinearFilter;t.generateMipmaps=true;t.needsUpdate=true;return t
}
/** Swept cast spoke with a generous root and tapered outer web.
 * Its face meets the hub and the inside of the front rim lip. */
function spokeGeometry(){
  const s=new THREE.Shape()
  s.moveTo(-.073,.21);s.quadraticCurveTo(-.094,.39,-.13,.57)
  s.quadraticCurveTo(-.14,.72,-.08,.793);s.lineTo(.035,.793)
  s.quadraticCurveTo(.10,.61,.094,.49);s.quadraticCurveTo(.068,.32,.073,.21);s.closePath()
  const g=new THREE.ExtrudeGeometry(s,{depth:.095,bevelEnabled:true,bevelSize:.012,bevelThickness:.012,bevelSegments:3,curveSegments:20})
  g.translate(0,0,.12);return g
}
function Spoke({geometry,index}:{geometry:THREE.BufferGeometry;index:number}){
  return <mesh geometry={geometry} rotation={[0,0,index*tau/10]} castShadow receiveShadow>
    <meshPhysicalMaterial color={alloy} metalness={.79} roughness={.30} clearcoat={.22} side={THREE.DoubleSide}/>
  </mesh>
}
export default function AeroWheel(){
  const data=useMemo(()=>({tyre:revolve(tyreProfile),barrel:revolve(barrelProfile),tyreMap:treadTexture(),
    rotor:disk(.60,.207,.048,ventCircle,.021),hub:disk(.252,.075,.105,lugs,.044),spoke:spokeGeometry()}),[])
  useEffect(()=>()=>Object.values(data).forEach(x=>x.dispose()),[data])
  const tyreMap=data.tyreMap
  return <group rotation={[.12,-.38,.035]} scale={1.09}>
    <mesh geometry={data.tyre} castShadow receiveShadow>
      <meshPhysicalMaterial color="#26292a" bumpMap={tyreMap} bumpScale={.023} roughness={.88} side={THREE.DoubleSide}/>
    </mesh>
    <mesh geometry={data.barrel} castShadow receiveShadow>
      <meshPhysicalMaterial color="#bec5c9" metalness={.81} roughness={.28} side={THREE.DoubleSide}/>
    </mesh>
    {[-1,1].map(side=><mesh key={side} position={[0,0,side*.252]}>
      <torusGeometry args={[.832,.017,12,128]}/><meshPhysicalMaterial color="#c4cbcc" metalness={.87} roughness={.28}/>
    </mesh>)}
    <mesh geometry={data.rotor} position={[0,0,-.035]} castShadow>
      <meshPhysicalMaterial color="#929a9c" metalness={.83} roughness={.43} side={THREE.DoubleSide}/>
    </mesh>
    {/* Raised rotor hat joins the axle hub; the drilled annulus stays open. */}
    <mesh position={[0,0,.015]} rotation={[Math.PI/2,0,0]}>
      <cylinderGeometry args={[.225,.225,.16,64]}/><meshPhysicalMaterial color="#535b5e" metalness={.71} roughness={.43}/>
    </mesh>
    {[.30,.41,.48,.58].map(r=><mesh key={r} position={[0,0,-.008]}>
      <torusGeometry args={[r,.0017,4,96]}/><meshStandardMaterial color="#666f72" metalness={.78} roughness={.47}/>
    </mesh>)}
    <group rotation={[0,0,.80]}>
      <mesh position={[0,.57,-.019]} rotation={[0,0,.08]} scale={[.145,.125,.103]}>
        <boxGeometry args={[2,2,2]}/><meshPhysicalMaterial color="#555b5b" roughness={.47} metalness={.65}/>
      </mesh>
      {[-1,1].map(s=><mesh key={s} position={[s*.095,.57,.093]}>
        <boxGeometry args={[.045,.16,.015]}/><meshStandardMaterial color="#929b9d" metalness={.73} roughness={.42}/>
      </mesh>)}
    </group>
    {Array.from({length:10},(_,i)=><Spoke key={i} geometry={data.spoke} index={i}/>)}
    <mesh geometry={data.hub} position={[0,0,.17]} castShadow>
      <meshPhysicalMaterial color={alloy} metalness={.8} roughness={.29} side={THREE.DoubleSide}/>
    </mesh>
    <mesh position={[0,0,.222]} rotation={[Math.PI/2,0,0]}>
      <cylinderGeometry args={[.072,.072,.027,48]}/><meshPhysicalMaterial color={dark} metalness={.55} roughness={.42}/>
    </mesh>
    {lugs.map(([x,y],i)=><mesh key={i} position={[x,y,.209]} rotation={[Math.PI/2,0,0]}>
      <cylinderGeometry args={[.032,.036,.048,6]}/><meshPhysicalMaterial color="#c1c8ca" metalness={.86} roughness={.32}/>
    </mesh>)}
    <group rotation={[0,0,.44]}>
      <mesh position={[0,.789,.20]} rotation={[.38,0,0]}>
        <cylinderGeometry args={[.011,.020,.112,14]}/><meshStandardMaterial color="#363a3c" roughness={.72}/>
      </mesh>
      <mesh position={[0,.836,.223]} rotation={[.38,0,0]}>
        <cylinderGeometry args={[.016,.016,.035,12]}/><meshStandardMaterial color="#a7aeb0" roughness={.40} metalness={.7}/>
      </mesh>
    </group>
  </group>
}
