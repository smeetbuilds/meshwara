import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { CurvedBox } from '../geometry/CurvedBox'
import { SplineTube } from '../geometry/GeometryV2'

/**
 * Compact receipt printer with rounded thermal head housing, paper throat,
 * retractable cover, exit cutter, illuminated power key, vent rows, a real
 * curved receipt strip and an authored black/white thermal-pixel texture.
 */
const chassis='#deddd6', side='#bcbab3', iron='#2d3438', blue='#77b3a5'
function receiptTexture() {
  const w=256,h=512
  const bytes=new Uint8Array(w*h*4)
  for(let y=0;y<h;y++) for(let x=0;x<w;x++){
    const u=x/w,v=y/h
    const heading=y>h*.77 && y<h*.84
    const total=y>h*.22 && y<h*.28
    const line=y%34<3 && v>.28 && v<.73
    const glyph=((Math.floor(x/12)*19+Math.floor(y/17)*31)%17)<9
    const barcode=y>h*.08&&y<h*.19&&x>w*.17&&x<w*.83
      && ((Math.floor(x/2)*13)%7)<3
    const grey=(heading || total || line)&&glyph || barcode ? 34 : 246
    const i=(y*w+x)*4
    bytes[i]=grey;bytes[i+1]=grey;bytes[i+2]=grey-2;bytes[i+3]=255
  }
  const t=new THREE.DataTexture(bytes,w,h,THREE.RGBAFormat)
  t.colorSpace=THREE.SRGBColorSpace
  t.magFilter=THREE.LinearFilter
  t.minFilter=THREE.LinearMipmapLinearFilter
  t.generateMipmaps=true
  t.needsUpdate=true
  return t
}
const printed=receiptTexture()
function Receipt() {
  const geometry=useMemo(()=>{
    const g=new THREE.PlaneGeometry(1.21,1.13,24,32)
    const position=g.getAttribute('position') as THREE.BufferAttribute
    for(let i=0;i<position.count;i++){
      const y=position.getY(i)
      const v=(y+.565)/1.13
      position.setZ(i, .93+.34*Math.pow(1-v,2)+.035*Math.sin((1-v)*Math.PI))
    }
    position.needsUpdate=true
    g.computeVertexNormals()
    return g
  },[])
  useEffect(()=>()=>geometry.dispose(),[geometry])
  return <mesh geometry={geometry} position={[0,.05,0]} castShadow receiveShadow>
    <meshStandardMaterial map={printed} roughness={.94} metalness={0}
      side={THREE.DoubleSide}/>
  </mesh>
}
export default function ThermalPrinter() {
  return <group position={[0,-.23,0]} rotation={[.05,-.37,0]} scale={1.02}>
    <CurvedBox args={[2.32,1.38,1.95]} radius={.18} smoothness={9} castShadow receiveShadow>
      <meshPhysicalMaterial color={chassis} metalness={.11} roughness={.58}/>
    </CurvedBox>
    <CurvedBox args={[2.19,.14,1.85]} radius={.060} smoothness={6}
      position={[0,.50,-.04]}>
      <meshPhysicalMaterial color={side} metalness={.18} roughness={.58}/>
    </CurvedBox>
    <SplineTube points={[[-.95,.47,.87],[-.65,.51,.89],[.65,.51,.89],[.96,.47,.87]]}
      radius={.012} tubularSegments={48} radialSegments={7}>
      <meshStandardMaterial color="#737a7b" metalness={.58} roughness={.40}/>
    </SplineTube>
    <CurvedBox args={[1.50,.082,.085]} radius={.019} smoothness={4}
      position={[0,.55,.96]}>
      <meshStandardMaterial color={iron} metalness={.39} roughness={.58}/>
    </CurvedBox>
    <mesh position={[0,.50,.96]}>
      <boxGeometry args={[1.38,.014,.014]}/>
      <meshPhysicalMaterial color="#aeb3b4" metalness={.85} roughness={.31}/>
    </mesh>
    <Receipt/>
    <CurvedBox args={[1.66,.42,.085]} radius={.048} smoothness={5}
      position={[0,-.31,.976]}>
      <meshStandardMaterial color={iron} roughness={.53} metalness={.26}/>
    </CurvedBox>
    <CurvedBox args={[1.78,.085,.04]} radius={.025} smoothness={4}
      position={[0,-.57,.989]}>
      <meshStandardMaterial color="#a5adae" roughness={.34} metalness={.64}/>
    </CurvedBox>
    <mesh position={[.88,.22,.997]}>
      <circleGeometry args={[.062,32]}/>
      <meshBasicMaterial color="#63c796" toneMapped={false}/>
    </mesh>
    <mesh position={[.89,-.09,1.001]}>
      <circleGeometry args={[.095,40]}/>
      <meshPhysicalMaterial color="#202a2e" metalness={.48} roughness={.42}/>
    </mesh>
    <mesh position={[.89,-.09,1.011]}>
      <circleGeometry args={[.041,32]}/>
      <meshStandardMaterial color="#89bfc1" roughness={.36}/>
    </mesh>
    {[-1,1].map(sideValue=><group key={sideValue} position={[sideValue*1.168,-.12,0]}>
      {Array.from({length:6},(_,i)=><mesh key={i} position={[0,.34-i*.15,.12]}>
        <boxGeometry args={[.011,.022,.85]}/>
        <meshStandardMaterial color="#5e696c" metalness={.27} roughness={.7}/>
      </mesh>)}
      <mesh position={[0,-.49,.42]} rotation={[0,sideValue*Math.PI/2,0]}>
        <circleGeometry args={[.058,24]}/>
        <meshPhysicalMaterial color="#899398" roughness={.32} metalness={.8}/>
      </mesh>
    </group>)}
    <CurvedBox args={[1.60,.10,.18]} radius={.03} smoothness={5}
      position={[0,-.82,0]}>
      <meshStandardMaterial color="#929995" metalness={.42} roughness={.46}/>
    </CurvedBox>
    {[-.87,.87].flatMap(x=>[-.72,.72].map(z=><mesh key={x+'-'+z} position={[x,-.76,z]}>
      <cylinderGeometry args={[.13,.14,.15,24]}/>
      <meshStandardMaterial color="#373b3d" roughness={.94}/>
    </mesh>))}
  </group>
}
