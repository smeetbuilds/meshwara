import { LoftSurface, SplineTube, RevolvedSurface, type LoftStation } from '../geometry/GeometryV2'
const saddle:LoftStation[]=[{x:-.42,width:.15,height:.045,exponent:2.6},{x:0,width:.23,height:.065,y:.02,exponent:3},{x:.42,width:.14,height:.04,exponent:2.6}]
const top:Array<[number,number,number]>=[[-.56,.58,0],[.18,.72,0],[.72,.34,0]]
const down:Array<[number,number,number]>=[[.72,.34,0],[.18,-.34,0],[-.56,.58,0]]
const stays:Array<[number,number,number]>=[[-.56,.58,0],[-.82,-.36,0],[.18,-.34,0]]
const fork:Array<[number,number,number]>=[[.72,.34,-.08],[.9,-.05,-.08],[1.02,-.52,-.08]]
const bar:Array<[number,number,number]>=[[.72,.5,0],[.95,.68,0],[1.18,.62,.16],[1.25,.5,.34]]
const hub:Array<[number,number]>=[[.03,-.06],[.12,-.05],[.15,0],[.12,.05],[.03,.06]]
export default function CarbonBicycleFrameset(){return <group rotation={[0,-.36,0]} position={[0,-.2,0]}>
 <SplineTube points={top} radius={.045}><meshPhysicalMaterial color="#202526" metalness={.18} roughness={.24} clearcoat={.55}/></SplineTube><SplineTube points={down} radius={.055}><meshPhysicalMaterial color="#202526" metalness={.18} roughness={.24} clearcoat={.55}/></SplineTube><SplineTube points={stays} radius={.035}><meshPhysicalMaterial color="#202526" roughness={.25}/></SplineTube>
 <SplineTube points={fork} radius={.04}><meshPhysicalMaterial color="#303637" roughness={.22} clearcoat={.5}/></SplineTube><SplineTube points={fork.map(([x,y,z])=>[x,y,-z] as [number,number,number])} radius={.04}><meshPhysicalMaterial color="#303637" roughness={.22} clearcoat={.5}/></SplineTube>
 <SplineTube points={bar} radius={.025}><meshStandardMaterial color="#181a1b" roughness={.5}/></SplineTube><SplineTube points={bar.map(([x,y,z])=>[x,y,-z] as [number,number,number])} radius={.025}><meshStandardMaterial color="#181a1b" roughness={.5}/></SplineTube>
 <LoftSurface stations={saddle} position={[-.55,.88,0]}><meshStandardMaterial color="#222425" roughness={.55}/></LoftSurface>
 {[-.82,1.02].map(x=><group key={x} position={[x,-.5,0]}><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.48,.035,12,72]}/><meshStandardMaterial color="#17191a" roughness={.5}/></mesh><RevolvedSurface profile={hub} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#8d9496" metalness={.9} roughness={.17}/></RevolvedSurface></group>)}
</group>}
