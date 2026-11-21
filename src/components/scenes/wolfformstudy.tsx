import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { ExtrudedProfile, LoftSurface, SplineTube } from '../geometry/GeometryV2'

/**
 * Gray-wolf morphology study with a long muzzle, deep chest, tucked flanks,
 * digitigrade limbs, a low brush tail and rough, regionally colored coat.
 * Original procedural source, not an anatomy-certified wildlife scan.
 */
type P = [number, number, number]
type Station = { x: number; y: number; width: number; height: number; exponent: number }
const s = (x: number, y: number, width: number, height: number): Station =>
  ({ x, y, width, height, exponent: 2 })

function makeCoatMap(area: 'body'|'neck'|'face'|'leg'|'tail') {
  const w=384,h=192
  const pixels=new Uint8Array(w*h*4)
  for(let j=0;j<h;j++) for(let i=0;i<w;i++) {
    const u=i/w,v=j/h
    const crown=Math.sin(v*Math.PI*2)
    const saddle=THREE.MathUtils.smoothstep(crown,-.12,.7)
    const flank=THREE.MathUtils.smoothstep(-crown,-.15,.7)
    const wolfGray=[87,87,79], warm=[145,122,94], cream=[204,184,149]
    const ruff=area==='neck'||area==='face' ? .65 : .15
    const base=wolfGray.map((d,k)=>
      THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(warm[k],cream[k],flank*.72+ruff*.25),
        d,saddle*(area==='face'?.52:.87)
      )
    )
    const grain=(Math.sin(i*3.31+j*1.39)*5+Math.cos(i*1.7-j*5.1)*4)
    const mottling=Math.sin(u*52+Math.cos(v*49)*2)*Math.cos(v*35+u*23)*9
    const mark=area==='face' && u>.30&&u<.76 && crown>.25 ? -18:0
    const bright=area==='leg'?12:area==='tail'?-8:0
    const n=(j*w+i)*4
    for(let k=0;k<3;k++)pixels[n+k]=Math.max(0,Math.min(255,Math.round(base[k]+grain+mottling+mark+bright)))
    pixels[n+3]=255
  }
  const map=new THREE.DataTexture(pixels,w,h,THREE.RGBAFormat)
  map.colorSpace=THREE.SRGBColorSpace
  map.wrapS=THREE.RepeatWrapping
  map.wrapT=THREE.RepeatWrapping
  map.minFilter=THREE.LinearMipmapLinearFilter
  map.magFilter=THREE.LinearFilter
  map.generateMipmaps=true
  map.needsUpdate=true
  return map
}
const maps={
  body:makeCoatMap('body'),neck:makeCoatMap('neck'),face:makeCoatMap('face'),
  leg:makeCoatMap('leg'),tail:makeCoatMap('tail')
}
const pelt={metalness:0,roughness:.98} as const
const body:Station[]=[
  s(-1.28,.13,.03,.1),s(-1.16,.19,.25,.3),
  s(-.96,.23,.31,.38),s(-.59,.23,.30,.36),
  s(-.26,.20,.28,.31),s(.06,.24,.33,.38),
  s(.32,.29,.36,.46),s(.57,.35,.32,.44),
  s(.77,.43,.17,.29),s(.86,.46,.03,.07),
]
const neck:Station[]=[
  s(.36,.35,.27,.34),s(.56,.46,.3,.34),
  s(.77,.58,.28,.3),s(.96,.71,.23,.26),
  s(1.17,.79,.19,.21),s(1.31,.79,.13,.16),
]
const face:Station[]=[
  s(1.08,.79,.12,.16),s(1.28,.81,.19,.21),
  s(1.44,.76,.20,.18),s(1.58,.68,.13,.12),
  s(1.78,.65,.105,.095),s(1.97,.65,.08,.075),
]

function organicLimbGeometry(points:P[], radii:number[]) {
  const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)),false,'centripetal')
  const rows=44,sides=14
  const vertices:number[]=[],uvs:number[]=[],indices:number[]=[]
  const along=new THREE.Vector3(),across=new THREE.Vector3(),perp=new THREE.Vector3()
  const zAxis=new THREE.Vector3(0,0,1)
  for(let i=0;i<=rows;i++){
    const t=i/rows,pos=curve.getPoint(t)
    along.copy(curve.getTangent(t)).normalize()
    across.crossVectors(along,zAxis).normalize()
    perp.crossVectors(along,across).normalize()
    const at=t*(radii.length-1),lo=Math.min(radii.length-2,Math.floor(at))
    const radius=THREE.MathUtils.lerp(radii[lo],radii[lo+1],at-lo)
    for(let j=0;j<=sides;j++){
      const angle=j/sides*Math.PI*2
      const p=pos.clone().addScaledVector(across,radius*Math.cos(angle)).addScaledVector(perp,radius*Math.sin(angle))
      vertices.push(p.x,p.y,p.z)
      uvs.push(t,j/sides)
      if(i<rows&&j<sides) {
        const a=i*(sides+1)+j,b=a+sides+1
        indices.push(a,a+1,b,b,a+1,b+1)
      }
    }
  }
  const geo=new THREE.BufferGeometry()
  geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3))
  geo.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  return geo
}
function OrganicLimb({points,radii,tail=false}:{points:P[];radii:number[];tail?:boolean}) {
  const geo=useMemo(()=>organicLimbGeometry(points,radii),[points,radii])
  useEffect(()=>()=>geo.dispose(),[geo])
  return <mesh geometry={geo} castShadow receiveShadow>
    <meshStandardMaterial map={tail?maps.tail:maps.leg} {...pelt}/>
  </mesh>
}
const paws:Array<{points:P[],radii:number[],foot:P}>= [
  {points:[[.42,.04,-.23],[.46,-.29,-.23],[.43,-.54,-.23],[.29,-.85,-.23],[.32,-1.08,-.23]],radii:[.17,.13,.10,.062,.055],foot:[.47,-1.08,-.23]},
  {points:[[.42,.04,.23],[.46,-.29,.23],[.43,-.54,.23],[.29,-.85,.23],[.32,-1.08,.23]],radii:[.17,.13,.10,.062,.055],foot:[.47,-1.08,.23]},
  {points:[[-1.01,-.03,-.23],[-1.06,-.36,-.23],[-.87,-.55,-.23],[-1.15,-.83,-.23],[-1.12,-1.08,-.23]],radii:[.16,.14,.095,.055,.050],foot:[-1.00,-1.08,-.23]},
  {points:[[-1.01,-.03,.23],[-1.06,-.36,.23],[-.87,-.55,.23],[-1.15,-.83,.23],[-1.12,-1.08,.23]],radii:[.16,.14,.095,.055,.050],foot:[-1.00,-1.08,.23]},
]
const tail:P[]=[[-1.21,.28,0],[-1.46,.23,0],[-1.66,.07,0],[-1.78,-.15,0],[-1.81,-.26,0]]
const tailRadii=[.13,.17,.145,.10,.022]

function Ear({z}:{z:number}){
  return <group position={[1.25,.96,z]}>
    <ExtrudedProfile points={[[-.115,-.10],[.07,-.09],[.13,.25],[.035,.43],[-.10,.24]]}
      depth={.10} bevelSize={.011} bevelThickness={.011}>
      <meshStandardMaterial color="#70665b" {...pelt}/>
    </ExtrudedProfile>
    <ExtrudedProfile points={[[-.068,-.03],[.053,-.03],[.071,.19],[.011,.30],[-.064,.18]]}
      position={[0,0,z>0?.058:-.058]} depth={.006} bevelSize={.002} bevelThickness={.002}>
      <meshStandardMaterial color="#ac8a77" roughness={.99}/>
    </ExtrudedProfile>
  </group>
}
export default function WolfFormStudy() {
  return <group position={[-.08,.08,0]} rotation={[0,-.44,0]} scale={.96}>
    <LoftSurface stations={body} radialSegments={56} castShadow receiveShadow>
      <meshStandardMaterial map={maps.body} {...pelt}/>
    </LoftSurface>
    <LoftSurface stations={neck} radialSegments={48} castShadow receiveShadow>
      <meshStandardMaterial map={maps.neck} {...pelt}/>
    </LoftSurface>
    <LoftSurface stations={face} radialSegments={48} castShadow receiveShadow>
      <meshStandardMaterial map={maps.face} {...pelt}/>
    </LoftSurface>
    {paws.map((limb,i)=><group key={i}>
      <OrganicLimb points={limb.points} radii={limb.radii}/>
      <ExtrudedProfile points={[[-.14,-.05],[.15,-.05],[.20,.01],[.16,.07],[-.13,.075]]}
        depth={.19} bevelSize={.023} bevelThickness={.02} position={limb.foot}>
        <meshStandardMaterial color="#9f9280" {...pelt}/>
      </ExtrudedProfile>
      {[-.075,0,.075].map(z=><mesh key={z} position={[limb.foot[0]+.13,-1.079,limb.foot[2]+z]}
        scale={[.052,.022,.023]}>
        <sphereGeometry args={[1,16,10]}/><meshStandardMaterial color="#37332f" roughness={.86}/>
      </mesh>)}
    </group>)}
    <OrganicLimb points={tail} radii={tailRadii} tail/>
    <Ear z={-.125}/><Ear z={.125}/>
    <mesh position={[1.98,.65,0]} scale={[.085,.067,.145]}>
      <sphereGeometry args={[1,24,16]}/>
      <meshPhysicalMaterial color="#212121" roughness={.35} clearcoat={.18}/>
    </mesh>
    {[-1,1].map(side=><group key={side}>
      <mesh position={[1.37,.84,side*.187]} scale={[.056,.039,.017]}>
        <sphereGeometry args={[1,18,12]}/>
        <meshStandardMaterial color="#3f352b" roughness={.7}/>
      </mesh>
      <mesh position={[1.375,.841,side*.205]} scale={[.029,.028,.012]}>
        <sphereGeometry args={[1,18,12]}/>
        <meshPhysicalMaterial color="#b49459" roughness={.27} clearcoat={.38}/>
      </mesh>
      <mesh position={[1.38,.841,side*.215]} scale={[.013,.025,.01]}>
        <sphereGeometry args={[1,16,10]}/>
        <meshStandardMaterial color="#121214" roughness={.3}/>
      </mesh>
      <SplineTube points={[[1.60,.605,side*.095],[1.78,.575,side*.10],[1.90,.581,side*.08]]}
        radius={.010} tubularSegments={16} radialSegments={6}>
        <meshStandardMaterial color="#292626" roughness={.94}/>
      </SplineTube>
    </group>)}
    {Array.from({length:15},(_,i)=>{
      const t=i/14,x=.40+t*.68, y=.02+t*.44
      return <SplineTube key={i}
        points={[[x,y,.01],[x-.035,y-.12,.01],[x-.09,y-.20,.01]]}
        radius={.012+(1-t)*.014} tubularSegments={8} radialSegments={5}>
        <meshStandardMaterial color={i%3===0?'#b2a185':'#776e60'} roughness={.98}/>
      </SplineTube>
    })}
  </group>
}
