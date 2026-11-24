import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { CC0Surface } from '../geometry/CC0Surface'

/** Single closed, stepped reinforced-concrete flight, seated landings,
 * guardrails anchored into each tread. All elevations share one datum. */
type Point=[number,number,number]
const count=10
const run=.29
const rise = .182
const originX=-1.45
const originY=-.91
const width=1.60
const slab=.21
const levels=Array.from({length:count},(_,i)=>({x:originX+(i+.5)*run,y:originY+(i+1)*rise}))
const start=originX,end=originX+count*run,top=originY+count*rise
const steel='#4b5153'
const rail='#6d7476'
function flightGeometry(){
  const shape=new THREE.Shape()
  shape.moveTo(start,originY)
  for(let i=0;i<count;i++){
    const x=start+i*run,y=originY+(i+1)*rise
    shape.lineTo(x,y);shape.lineTo(x+run,y)
  }
  shape.lineTo(end,top-slab-rise);shape.lineTo(start,originY-slab);shape.closePath()
  const g=new THREE.ExtrudeGeometry(shape,{depth:width,bevelEnabled:false,steps:1})
  g.translate(0,0,-width/2)
  // Planar texture projection with a consistent physical texel scale.
  const p=g.getAttribute('position'),n=g.getAttribute('normal'),uv=g.getAttribute('uv')
  for(let i=0;i<p.count;i++){
    const ax=Math.abs(n.getX(i)),ay=Math.abs(n.getY(i)),az=Math.abs(n.getZ(i))
    if(ay>=ax&&ay>=az)uv.setXY(i,p.getX(i)*.72,p.getZ(i)*.72)
    else if(ax>=az)uv.setXY(i,p.getZ(i)*.72,p.getY(i)*.72)
    else uv.setXY(i,p.getX(i)*.72,p.getY(i)*.72)
  }
  return g
}
function Bar({a,b,radius,color=steel}:{a:Point;b:Point;radius:number;color?:string}){
  const from=new THREE.Vector3(...a),to=new THREE.Vector3(...b),delta=to.clone().sub(from)
  return <mesh position={from.clone().lerp(to,.5)} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),delta.clone().normalize())} castShadow>
    <cylinderGeometry args={[radius,radius,delta.length(),18]}/>
    <meshPhysicalMaterial color={color} metalness={.78} roughness={.38}/>
  </mesh>
}
function Handrail({z}:{z:number}){
  const h=1.00
  const first=levels[0],last=levels[count-1]
  const lower:Point=[start-.43,originY+h,z],a:Point=[first.x,first.y+h,z],b:Point=[last.x,last.y+h,z],upper:Point=[end+.43,last.y+h,z]
  return <group>
    <Bar a={lower} b={a} radius={.033} color={rail}/>
    <Bar a={a} b={b} radius={.033} color={rail}/>
    <Bar a={b} b={upper} radius={.033} color={rail}/>
    {levels.map(({x,y},i)=><group key={i}>
      <Bar a={[x,y,z]} b={[x,y+h,z]} radius={i%3===0||i===count-1?.018:.012}/>
      <mesh position={[x,y+.012,z]} castShadow><cylinderGeometry args={[.063,.063,.024,24]}/><meshStandardMaterial color={steel} metalness={.76} roughness={.43}/></mesh>
      {[-1,1].map(s=><mesh key={s} position={[x+s*.038,y+.03,z]}><cylinderGeometry args={[.008,.008,.012,6]}/><meshStandardMaterial color="#929a9b" metalness={.75} roughness={.42}/></mesh>)}
    </group>)}
    <Bar a={[start-.43,originY,z]} b={lower} radius={.019}/>
    <mesh position={[start-.43,originY+.012,z]}><cylinderGeometry args={[.063,.063,.024,24]}/><meshStandardMaterial color={steel} metalness={.76} roughness={.43}/></mesh>
    <Bar a={[end+.43,top,z]} b={upper} radius={.019}/>
    <mesh position={[end+.43,top+.012,z]}><cylinderGeometry args={[.063,.063,.024,24]}/><meshStandardMaterial color={steel} metalness={.76} roughness={.43}/></mesh>
    <Bar a={[first.x,first.y+.15,z]} b={[last.x,last.y+.15,z]} radius={.013}/>
  </group>
}
export default function BrutalistStair(){
  const flight=useMemo(flightGeometry,[])
  useEffect(()=>()=>flight.dispose(),[flight])
  return <group position={[0,-.10,0]} rotation={[0,-.36,0]} scale={.94}>
    <mesh geometry={flight} castShadow receiveShadow><CC0Surface texture="concrete" bumpStrength={.23}/></mesh>
    <mesh position={[start-.32,originY-slab/2,0]} castShadow receiveShadow>
      <boxGeometry args={[.64,slab,1.78]}/><CC0Surface texture="concrete"/>
    </mesh>
    <mesh position={[end+.32,top-slab/2,0]} castShadow receiveShadow>
      <boxGeometry args={[.64,slab,1.78]}/><CC0Surface texture="concrete"/>
    </mesh>
    {levels.map(({x,y},i)=><group key={i}>
      {/* Integral non-slip grooves near the leading edge of each tread. */}
      {[0,1].map(j=><mesh key={j} position={[x-run*.37+j*.031,y+.001,0]} receiveShadow>
        <boxGeometry args={[.009,.004,width-.15]}/><meshStandardMaterial color="#86837b" roughness={.93}/>
      </mesh>)}
    </group>)}
    {[-.67,.67].map(z=><Handrail key={z} z={z}/>)}
  </group>
}
