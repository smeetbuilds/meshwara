import * as THREE from 'three'
import { CurvedBox } from '../geometry/CurvedBox'
import { SplineTube } from '../geometry/GeometryV2'

/**
 * Network gateway hardware study: articulated external antennas, recessed
 * RJ45 uplink/LAN sockets, status array, RF venting, cooling chassis,
 * underside support feet and a shielded DC supply barrel connector.
 */
const matte='#283134', seam='#12191c', anodized='#536067', steel='#afb8b7'
const antennaX=[-1.04,-.35,.35,1.04]
function Antenna({x,index}:{x:number;index:number}) {
  const offset=(index-1.5)*.11
  return <group position={[x,.36,-.60]}>
    <mesh rotation={[Math.PI/2,0,0]}>
      <cylinderGeometry args={[.125,.125,.10,28]}/>
      <meshPhysicalMaterial color="#687175" metalness={.53} roughness={.42}/>
    </mesh>
    <mesh position={[0,.16,0]}><sphereGeometry args={[.12,24,16]}/>
      <meshPhysicalMaterial color= {steel} metalness={.72} roughness={.34}/></mesh>
    <group rotation={[0,0,offset]}>
      <mesh position={[0,.68,0]} castShadow>
        <cylinderGeometry args={[.049,.075,1.10,28]}/>
        <meshPhysicalMaterial color={matte} metalness={.30} roughness={.45}/>
      </mesh>
      <mesh position={[0,1.22,0]}>
        <sphereGeometry args={[.051,20,14]}/>
        <meshPhysicalMaterial color="#626c71" metalness={.50} roughness={.48}/>
      </mesh>
      {Array.from({length:13},(_,i)=><mesh key={i} position={[0,.38+i*.060,0]} rotation={[Math.PI/2,0,0]}>
        <torusGeometry args={[.058,.0045,6,26]}/>
        <meshStandardMaterial color="#455158" metalness={.24} roughness={.68}/>
      </mesh>)}
    </group>
  </group>
}
function Port({x,index}:{x:number;index:number}) {
  return <group position={[x,-.045,-.875]}>
    <CurvedBox args={[.30,.24,.075]} radius={.013} smoothness={4}>
      <meshStandardMaterial color="#101719" roughness={.67} metalness={.12}/>
    </CurvedBox>
    <mesh position={[0,-.027,-.043]}>
      <boxGeometry args={[.22,.12,.008]}/>
      <meshPhysicalMaterial color="#182d35" metalness={.48} roughness={.37}/>
    </mesh>
    {Array.from({length:8},(_,i)=><mesh key={i}
      position={[-.094+i*.026,-.09,-.049]}>
      <boxGeometry args={[.011,.016,.009]}/>
      <meshPhysicalMaterial color="#d9b56a" metalness={.87} roughness={.23}/>
    </mesh>)}
    <mesh position={[.115,.082,-.048]}>
      <boxGeometry args={[.019,.017,.009]}/>
      <meshBasicMaterial color={index===0?'#e0ad61':'#67c998'} toneMapped={false}/>
    </mesh>
  </group>
}
export default function NetworkRouter() {
  return <group rotation={[.13,-.37,0]} position={[0,-.23,0]}>
    <CurvedBox args={[3.01,.61,1.82]} radius={.15} smoothness={8}
      castShadow receiveShadow>
      <meshPhysicalMaterial color={matte} metalness={.24} roughness={.49} clearcoat={.11}/>
    </CurvedBox>
    <CurvedBox args={[2.91,.075,1.73]} radius={.065} smoothness={4}
      position={[0,.318,0]}>
      <meshPhysicalMaterial color="#414d50" metalness={.33} roughness={.47}/>
    </CurvedBox>
    <SplineTube points={[[-1.33,.295,.80],[0,.30,.84],[1.32,.295,.80]]}
      radius={.011} radialSegments={7} tubularSegments={35}>
      <meshStandardMaterial color={seam} roughness={.78}/>
    </SplineTube>
    {antennaX.map((x,i)=><Antenna key={i} x={x} index={i}/>)}
    {Array.from({length:8},(_,i)=>{
      const x=-1.16+i*.32
      return <group key={i} position={[x,.14,.935]}>
        <mesh><sphereGeometry args={[.031,14,12]}/>
          <meshBasicMaterial color={i<5?'#8ee3a8':i===5?'#e3ba71':'#83c0d4'}
            toneMapped={false}/></mesh>
        <mesh position={[0,-.063,0]}>
          <boxGeometry args={[.10,.008,.011]}/>
          <meshStandardMaterial color="#909b9b" roughness={.6}/>
        </mesh>
      </group>
    })}
    {[-1,1].map(side=><group key={side}>
      {Array.from({length:8},(_,i)=><mesh key={i} position={[side*1.508,-.06,.53-i*.135]}>
        <boxGeometry args={[.012,.028,.092]}/>
        <meshStandardMaterial color={seam} roughness={.7}/>
      </mesh>)}
      <mesh position={[side*.96,-.38,.50]}>
        <cylinderGeometry args={[.105,.11,.14,24]}/>
        <meshStandardMaterial color="#161e20" roughness={.91}/>
      </mesh>
      <mesh position={[side*.96,-.38,-.52]}>
        <cylinderGeometry args={[.105,.11,.14,24]}/>
        <meshStandardMaterial color="#161e20" roughness={.91}/>
      </mesh>
    </group>)}
    {[-.94,-.60,-.26,.08,.42].map((x,i)=><Port key={x} x={x} index={i}/>)}
    <mesh position={[1.03,-.04,-.923]} rotation={[Math.PI/2,0,0]}>
      <torusGeometry args={[.074,.02,12,28]}/>
      <meshPhysicalMaterial color="#899498" roughness={.34} metalness={.74}/>
    </mesh>
    <mesh position={[1.03,-.04,-.935]}>
      <circleGeometry args={[.045,28]}/>
      <meshStandardMaterial color="#141b1e" roughness={.73}/>
    </mesh>
    {Array.from({length:22},(_,i)=><mesh key={i}
      position={[-1.14+i*.107,.357,-.06]}>
      <boxGeometry args={[.042,.008,.56]}/>
      <meshStandardMaterial color="#1b2428" roughness={.66}/>
    </mesh>)}
  </group>
}
