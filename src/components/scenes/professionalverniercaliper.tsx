import { ExtrudedProfile, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'
const beam:Array<[number,number]>=[[-1,-.055],[.92,-.055],[.98,0],[.92,.055],[-1,.055]]
const fixedJaw:Array<[number,number]>=[[-.16,-.08],[.2,-.08],[.2,.42],[.08,.58],[-.04,.58],[-.04,.2],[-.16,.2]]
const slider:Array<[number,number]>=[[-.28,-.14],[.28,-.14],[.3,.18],[.18,.34],[-.18,.34],[-.3,.18]]
const spine:Array<[number,number,number]>=[[-.92,.07,.04],[-.52,.075,.04],[-.12,.07,.04],[.28,.072,.04],[.68,.068,.04],[.9,.06,.04]]
const lowerScale:Array<[number,number,number]>=[[-.86,-.075,.045],[-.5,-.078,.046],[-.14,-.075,.045],[.22,-.076,.045],[.58,-.073,.045],[.86,-.068,.043]]
const wheel:Array<[number,number]>=[[0,-.09],[.11,-.08],[.14,0],[.11,.08],[0,.09]]
export default function ProfessionalVernierCaliper(){return <group rotation={[0,-.36,.03]} scale={.95}>
<ExtrudedProfile points={beam} depth={.075} bevelSize={.012} bevelThickness={.012} bevelSegments={3}><meshPhysicalMaterial color="#b8bec1" metalness={.88} roughness={.24} clearcoat={.25}/></ExtrudedProfile>
<ExtrudedProfile points={fixedJaw} depth={.09} bevelSize={.015} bevelThickness={.015} bevelSegments={3} position={[-.82,.08,0]}><meshPhysicalMaterial color="#c7ccce" metalness={.9} roughness={.22} clearcoat={.3}/></ExtrudedProfile>
<ExtrudedProfile points={slider} depth={.11} bevelSize={.018} bevelThickness={.018} bevelSegments={3} position={[.18,.02,0]}><meshPhysicalMaterial color="#33383c" metalness={.62} roughness={.32} clearcoat={.18}/></ExtrudedProfile>
<SplineTube points={spine} radius={.009} tubularSegments={56} radialSegments={6}><meshStandardMaterial color="#181b1d" roughness={.55}/></SplineTube>
<SplineTube points={lowerScale} radius={.0055} tubularSegments={52} radialSegments={5}><meshStandardMaterial color="#d5a45e" roughness={.38}/></SplineTube>
<RevolvedSurface profile={wheel} radialSegments={42} position={[.18,-.2,.08]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#d0a45d" metalness={.72} roughness={.25} clearcoat={.26}/></RevolvedSurface>
</group>}
