import * as THREE from 'three'
import { CurvedBox } from '../geometry/CurvedBox'
import { ExtrudedProfile, SplineTube } from '../geometry/GeometryV2'

/**
 * Automotive aero-alloy wheel: sculpted tire sidewall and tread, hollow alloy
 * rim, ten-spoke forged wheel face, brake rotor, vent holes, caliper, five
 * mounting bolts and valve. Product visualization, not approved CAD.
 */
const alloy='#92999e', dark='#2a3033', rubber='#202326', brake='#747e82'
type Point=[number,number,number]
const circle=(r:number,z:number):Point[]=>Array.from({length:97},(_,i)=>{
  const a=i/96*Math.PI*2
  return [Math.cos(a)*r,Math.sin(a)*r,z]
})
const tyreMap=(()=>{
  const width=256,height=128,bytes=new Uint8Array(width*height*4)
  const fract=(x:number)=>x-Math.floor(x)
  for(let y=0;y<height;y++)for(let x=0;x<width;x++){
    const n=fract(Math.sin(x*12.9898+y*78.233)*43758.5453)
    const rib=Math.abs(Math.sin(x/width*2*Math.PI*52))*.35
    const micro=Math.round(96+n*59+rib*41)
    const k=(y*width+x)*4
    bytes[k]=micro;bytes[k+1]=micro;bytes[k+2]=micro;bytes[k+3]=255
  }
  const texture=new THREE.DataTexture(bytes,width,height,THREE.RGBAFormat)
  texture.wrapS=THREE.RepeatWrapping
  texture.wrapT=THREE.RepeatWrapping
  texture.magFilter=THREE.LinearFilter
  texture.minFilter=THREE.LinearMipmapLinearFilter
  texture.generateMipmaps=true
  texture.needsUpdate=true
  return texture
})()
const spokeOutline:[number,number][]=[
  [-.092,.24],[.092,.24],[.155,.69],[.080,.84],[-.080,.84],[-.155,.69]
]
const ventCircle=Array.from({length:25},(_,i)=>{
  const a=i/24*Math.PI*2
  return {x:Math.cos(a)*.62,y:Math.sin(a)*.62,a}
})
const lugs=Array.from({length:5},(_,i)=>{
  const a=i/5*Math.PI*2
  return {x:Math.cos(a)*.19,y:Math.sin(a)*.19,a}
})
function Spoke({index}:{index:number}) {
  const a=index*Math.PI/5
  return <group rotation={[0,0,a]}>
    <ExtrudedProfile points={spokeOutline} depth={.12} bevelSize={.015}
      bevelThickness={.015} bevelSegments={4}
      position={[0,.04,.35]} castShadow receiveShadow>
      <meshPhysicalMaterial color={alloy} metalness={.96}
        roughness={.24} clearcoat={.37} clearcoatRoughness={.20}/>
    </ExtrudedProfile>
    <mesh position={[0,.59,.433]}>
      <boxGeometry args={[.025,.32,.012]}/>
      <meshStandardMaterial color={dark} metalness={.65} roughness={.31}/>
    </mesh>
  </group>
}
export default function AeroWheel() {
  return <group rotation={[.07,-.29,0]} scale={1.0}>
    {/* Sidewall and tread retain real volumetric thickness. */}
    <mesh castShadow receiveShadow>
      <torusGeometry args={[.97,.245,36,128]}/>
      <meshPhysicalMaterial color={rubber} bumpMap={tyreMap} bumpScale={.014}
        metalness={0} roughness={.86}/>
    </mesh>
    <mesh position={[0,0,.19]}>
      <torusGeometry args={[.92,.065,20,128]}/>
      <meshStandardMaterial color="#34393b" roughness={.90}/>
    </mesh>
    {Array.from({length:64},(_,i)=>{
      const a=i/64*Math.PI*2
      return <group key={i} rotation={[0,0,a]}>
        <mesh position={[0,1.187,0]} rotation={[0,0,.055]}>
          <boxGeometry args={[.070,.045,.238]}/>
          <meshStandardMaterial color={i%2===0?'#242628':'#272b2d'}
            metalness={0} roughness={.96}/>
        </mesh>
      </group>
    })}
    {/* Rim lip, barrel and inner hub. */}
    <mesh position={[0,0,.15]}>
      <torusGeometry args={[.805,.091,22,128]}/>
      <meshPhysicalMaterial color="#c3c9c9" metalness={.96}
        roughness={.21} clearcoat={.32}/>
    </mesh>
    <mesh position={[0,0,.18]} rotation={[Math.PI/2,0,0]}>
      <cylinderGeometry args={[.70,.70,.10,96]}/>
      <meshPhysicalMaterial color="#333b40" metalness={.72} roughness={.37}/>
    </mesh>
    <mesh position={[0,0,.22]} rotation={[Math.PI/2,0,0]}>
      <cylinderGeometry args={[.64,.64,.065,96]}/>
      <meshPhysicalMaterial color={brake} metalness={.90} roughness={.32}/>
    </mesh>
    <SplineTube points={circle(.735,.30)} closed
      radius={.018} radialSegments={8} tubularSegments={128}>
      <meshPhysicalMaterial color="#d1d5d4" metalness={.94} roughness={.27}/>
    </SplineTube>
    {ventCircle.slice(0,-1).map((p,i)=><group key={i} position={[p.x,p.y,.285]}>
      <mesh>
        <cylinderGeometry args={[.028,.028,.012,14]}/>
        <meshStandardMaterial color="#222a2e" metalness={.48} roughness={.51}/>
      </mesh>
    </group>)}
    {Array.from({length:10},(_,i)=><Spoke key={i} index={i}/>)}
    <mesh position={[0,0,.485]}>
      <cylinderGeometry args={[.252,.252,.12,64]}/>
      <meshPhysicalMaterial color={alloy} metalness={.94} roughness={.26}/>
    </mesh>
    <mesh position={[0,0,.555]} rotation={[Math.PI/2,0,0]}>
      <cylinderGeometry args={[.112,.112,.025,48]}/>
      <meshPhysicalMaterial color="#333e42" metalness={.66} roughness={.37}/>
    </mesh>
    {lugs.map((p,i)=><group key={i} position={[p.x,p.y,.566]}>
      <mesh rotation={[Math.PI/2,0,0]}>
        <cylinderGeometry args={[.047,.047,.040,6]}/>
        <meshPhysicalMaterial color="#c2c9c8" metalness={.96} roughness={.25}/>
      </mesh>
    </group>)}
    <CurvedBox args={[.29,.39,.20]} radius={.058} smoothness={5}
      position={[-.43,-.41,.10]} rotation={[0,0,.65]} castShadow>
      <meshPhysicalMaterial color="#4a575b" metalness={.64} roughness={.38}/>
    </CurvedBox>
    {[-.34,-.16].map(y=><mesh key={y} position={[-.50,y,.22]}>
      <boxGeometry args={[.19,.027,.04]}/>
      <meshStandardMaterial color="#c1c5bb" metalness={.85} roughness={.27}/>
    </mesh>)}
    <mesh position={[.65,.39,.20]} rotation={[0,0,.8]}>
      <cylinderGeometry args={[.018,.025,.20,18]}/>
      <meshPhysicalMaterial color="#b1b8b8" metalness={.90} roughness={.28}/>
    </mesh>
    <mesh position={[.65,.39,.31]}>
      <sphereGeometry args={[.029,16,12]}/>
      <meshStandardMaterial color={dark} roughness={.84}/>
    </mesh>
  </group>
}
