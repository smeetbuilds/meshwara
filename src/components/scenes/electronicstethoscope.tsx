import { RevolvedSurface, SplineTube, LoftSurface, type LoftStation } from '../geometry/GeometryV2'
const chest:Array<[number,number]>=[[.05,-.08],[.34,-.07],[.43,-.03],[.46,0],[.43,.05],[.34,.09],[.05,.1]]
const module:LoftStation[]=[{x:-.46,width:.18,height:.12,exponent:2.7},{x:0,width:.25,height:.18,exponent:3.1},{x:.46,width:.18,height:.12,exponent:2.7}]
const tubeL:Array<[number,number,number]>=[[0,.12,0],[-.18,.45,-.04],[-.38,.85,-.18],[-.58,1.2,-.38],[-.7,1.42,-.55]]
const earL:Array<[number,number,number]>=[[-.7,1.42,-.55],[-.82,1.62,-.62],[-.72,1.78,-.67]]
const diaphragm:Array<[number,number]>=[[.025,-.045],[.24,-.04],[.31,0],[.24,.04],[.025,.045]]
const control:Array<[number,number]>=[[.03,-.05],[.1,-.045],[.13,0],[.1,.045],[.03,.05]]
const moduleSeam:Array<[number,number,number]>=[[-.38,.2,.16],[0,.28,.22],[.38,.2,.16]]
export default function ElectronicStethoscope(){return <group rotation={[0,-.3,0]} position={[0,-.45,0]}>
 <RevolvedSurface profile={chest} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#81898b" metalness={.92} roughness={.18}/></RevolvedSurface>
 <LoftSurface stations={module} position={[0,.18,0]} rotation={[0,0,Math.PI/2]}><meshPhysicalMaterial color="#272c2e" metalness={.45} roughness={.25}/></LoftSurface>
 <SplineTube points={tubeL} radius={.035}><meshStandardMaterial color="#202526" roughness={.62}/></SplineTube><SplineTube points={tubeL.map(([x,y,z])=>[-x,y,-z] as [number,number,number])} radius={.035}><meshStandardMaterial color="#202526" roughness={.62}/></SplineTube>
 <SplineTube points={earL} radius={.025}><meshPhysicalMaterial color="#9aa0a2" metalness={.72} roughness={.2}/></SplineTube><SplineTube points={earL.map(([x,y,z])=>[-x,y,-z] as [number,number,number])} radius={.025}><meshPhysicalMaterial color="#9aa0a2" metalness={.72} roughness={.2}/></SplineTube>
 <RevolvedSurface profile={diaphragm} position={[0,.02,.11]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#c2c7c8" metalness={.95} roughness={.14}/></RevolvedSurface>
 <RevolvedSurface profile={control} position={[.28,.22,.18]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#7e8587" metalness={.72} roughness={.2}/></RevolvedSurface>
 <SplineTube points={moduleSeam} radius={.012}><meshPhysicalMaterial color="#646c6e" metalness={.65} roughness={.2}/></SplineTube>
</group>}
