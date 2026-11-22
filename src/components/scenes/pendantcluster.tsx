import { CC0Mesh } from '../geometry/CC0Mesh'
import * as THREE from 'three'

const modelUrl = '/models/cc0/pendant-cluster.glb'

/** Three independently suspended photographic CC0 glass/metal lamp fixtures.
 * Original topology, PBR materials and 1K image maps are source-pinned.
 * The arrangement, ceiling rail, power cables and lighting are original.
 */
const fixtures = [
  { x: -1.02, y: .40, z: -.13, scale: .56, heading: -.32 },
  { x: -.02, y: -.10, z: .27, scale: .64, heading: .20 },
  { x: .97, y: .17, z: -.16, scale: .58, heading: -.09 },
] as const

export default function PendantCluster() {
  return <group rotation={[0, -.23, 0]} scale={.91} position={[0, -.13, 0]}>
    <mesh position={[0, 1.67, 0]} castShadow receiveShadow>
      <boxGeometry args={[3.65,.13,1.06]}/>
      <meshPhysicalMaterial color="#d8d7d0" roughness={.70} metalness={.06}/>
    </mesh>
    <mesh position={[0,1.57,0]}>
      <boxGeometry args={[3.49,.046,.97]}/>
      <meshPhysicalMaterial color="#62696b" metalness={.76} roughness={.34}/>
    </mesh>
    {fixtures.map((fixture,i)=>{
      const top=fixture.y+fixture.scale*(2.20-1.48)
      const cable=new THREE.CatmullRomCurve3([
        new THREE.Vector3(fixture.x,1.51,fixture.z),
        new THREE.Vector3(fixture.x+.015,1.30,fixture.z),
        new THREE.Vector3(fixture.x-.009,top,fixture.z),
      ])
      return <group key={i}>
        <mesh position={[fixture.x,1.54,fixture.z]} castShadow>
          <cylinderGeometry args={[.12,.12,.11,24]}/>
          <meshPhysicalMaterial color="#464b4f" metalness={.79} roughness={.32}/>
        </mesh>
        <mesh><tubeGeometry args={[cable,32,.010,8,false]}/>
          <meshStandardMaterial color="#2b2e31" roughness={.85}/></mesh>
        <group position={[fixture.x,fixture.y,fixture.z]} scale={fixture.scale}>
          <CC0Mesh url={modelUrl} maxSize={2.20}
            rotation={[0,fixture.heading,0]} position={[0,0,0]}/>
        </group>
        <pointLight position={[fixture.x,fixture.y-.77*fixture.scale,fixture.z]}
          color="#ffe9ca" intensity={.29} distance={2.1} decay={2}/>
      </group>
    })}
  </group>
}
