import { ExtrudedProfile, LoftSurface, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'
const handle=[{x:-.86,y:0,width:.16,height:.14,exponent:3.8},{x:-.56,y:.02,width:.19,height:.17,exponent:4},{x:-.2,y:.02,width:.2,height:.18,exponent:4},{x:.1,y:0,width:.15,height:.13,exponent:3.8}]
const neck=[{x:.02,y:0,width:.09,height:.08,exponent:3.2},{x:.34,y:0,width:.08,height:.07,exponent:3},{x:.62,y:.02,width:.1,height:.08,exponent:3.2}]
const rail:Array<[number,number,number]>=[[-.7,.12,.12],[-.42,.14,.14],[-.14,.12,.13],[.12,.08,.1],[.42,.06,.08]]
const indicator:Array<[number,number,number]>=[[-.58,-.1,.13],[-.36,-.12,.15],[-.12,-.11,.14],[.1,-.07,.11]]
const display:Array<[number,number]>=[[-.2,-.1],[.2,-.1],[.23,.08],[.14,.16],[-.14,.16],[-.23,.08]]
const ratchet:Array<[number,number]>=[[0,-.18],[.2,-.16],[.28,-.06],[.29,.08],[.2,.18],[0,.2]]
export default function DigitalTorqueWrench(){return <group rotation={[0,-.42,-.08]} scale={.96}>
<LoftSurface stations={handle} radialSegments={40}><meshPhysicalMaterial color="#24282c" roughness={.42} clearcoat={.25}/></LoftSurface>
<LoftSurface stations={neck} radialSegments={32}><meshPhysicalMaterial color="#a9afb2" metalness={.82} roughness={.22} clearcoat={.28}/></LoftSurface>
<SplineTube points={rail} radius={.015} tubularSegments={52} radialSegments={7}><meshPhysicalMaterial color="#e09348" metalness={.2} roughness={.3} clearcoat={.3}/></SplineTube>
<SplineTube points={indicator} radius={.008} tubularSegments={42} radialSegments={6}><meshPhysicalMaterial color="#77c9d8" metalness={.12} roughness={.2} clearcoat={.42}/></SplineTube>
<ExtrudedProfile points={display} depth={.035} bevelSize={.012} bevelThickness={.012} bevelSegments={3} position={[-.34,.14,.14]} rotation={[-.08,0,0]}><meshPhysicalMaterial color="#11191c" roughness={.16} clearcoat={.52}/></ExtrudedProfile>
<RevolvedSurface profile={ratchet} radialSegments={56} position={[.72,.03,0]} rotation={[0,0,Math.PI/2]}><meshPhysicalMaterial color="#c8cdcf" metalness={.9} roughness={.2} clearcoat={.3}/></RevolvedSurface>
</group>}
