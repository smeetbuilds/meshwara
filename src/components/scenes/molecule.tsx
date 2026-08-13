import { useMemo } from 'react'
import * as THREE from 'three'
const atoms:[number,number,number][]=[[0,0,0],[.9,.45,.15],[-.82,.48,-.16],[.2,-.92,.2],[-.08,.18,.98],[.08,.15,-.95],[1.45,-.12,.34],[-1.33,-.2,-.42]]
const bonds:[number,number][]=[[0,1],[0,2],[0,3],[0,4],[0,5],[1,6],[2,7],[1,4],[2,5],[3,6]]
function Bond({a,b}:{a:[number,number,number];b:[number,number,number]}){const d=useMemo(()=>{const s=new THREE.Vector3(...a),e=new THREE.Vector3(...b),v=e.clone().sub(s);return{p:s.clone().add(e).multiplyScalar(.5),l:v.length(),q:new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize())}},[a,b]);return <mesh position={d.p} quaternion={d.q}><cylinderGeometry args={[.035,.035,d.l,16]} /><meshPhysicalMaterial color="#8e979b" metalness={.7} roughness={.25} /></mesh>}
function MolecularLattice(){return <group rotation={[.22,-.45,.1]} scale={1.05}>{bonds.map(([a,b],i)=><Bond key={i} a={atoms[a]} b={atoms[b]}/>) }{atoms.map((p,i)=><mesh key={i} position={p}><sphereGeometry args={[i===0?.28:.18,32,32]} /><meshPhysicalMaterial color={i===0?'#d9a85d':i%3===0?'#78d6c8':'#d6dadd'} metalness={i===0?.65:.38} roughness={.2} clearcoat={.35} /></mesh>)}</group>}
export default MolecularLattice
