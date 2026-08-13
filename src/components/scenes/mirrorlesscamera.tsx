import { LoftSurface, RevolvedSurface, ExtrudedProfile, SplineTube, type LoftStation } from '../geometry/GeometryV2'

const body: LoftStation[] = [
  { x: -1.12, width: .47, height: .54, y: .02, exponent: 3.5 }, { x: -.72, width: .55, height: .64, exponent: 4.2 },
  { x: .05, width: .58, height: .66, exponent: 4.8 }, { x: .78, width: .5, height: .61, exponent: 4.2 }, { x: 1.08, width: .36, height: .48, y: -.02, exponent: 3.2 },
]
const grip: LoftStation[] = [
  { x: -.95, width: .48, height: .37, y: -.15, exponent: 3 }, { x: -.63, width: .61, height: .5, y: -.14, exponent: 3.5 }, { x: -.35, width: .54, height: .48, y: -.12, exponent: 3 },
]
const lensProfile: Array<[number, number]> = [[.22,-.58],[.34,-.54],[.43,-.42],[.47,-.24],[.49,.06],[.46,.29],[.39,.48],[.27,.56]]
const topPlate: Array<[number, number]> = [[-.48,-.08],[.34,-.08],[.43,.04],[.3,.16],[-.39,.16],[-.5,.05]]
const seam: Array<[number,number,number]> = [[-1.0,.48,.54],[-.45,.61,.58],[.18,.62,.6],[.85,.5,.49]]

export default function MirrorlessCamera(){return <group rotation={[.04,-.45,0]} position={[0,-.12,0]}>
  <LoftSurface stations={body} castShadow><meshPhysicalMaterial color="#25292b" metalness={.58} roughness={.2} clearcoat={.75} clearcoatRoughness={.12}/></LoftSurface>
  <LoftSurface stations={grip} position={[0,-.02,-.12]} castShadow><meshStandardMaterial color="#15191b" roughness={.48}/></LoftSurface>
  <RevolvedSurface profile={lensProfile} position={[.68,.03,.66]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#303639" metalness={.76} roughness={.18}/></RevolvedSurface>
  <RevolvedSurface profile={[[.12,-.07],[.25,-.06],[.27,0],[.25,.06],[.12,.07]]} position={[.68,.03,1.22]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#132330" roughness={.06} clearcoat={1}/></RevolvedSurface>
  <ExtrudedProfile points={topPlate} depth={.12} position={[-.05,.72,.02]} rotation={[Math.PI/2,0,0]}><meshPhysicalMaterial color="#353a3c" metalness={.75} roughness={.18}/></ExtrudedProfile>
  <SplineTube points={seam} radius={.015}><meshPhysicalMaterial color="#8b9294" metalness={.9} roughness={.16}/></SplineTube>
  <RevolvedSurface profile={[[.05,-.04],[.13,-.03],[.15,0],[.13,.035],[.05,.04]]} position={[-.12,.79,.22]}><meshPhysicalMaterial color="#9da2a4" metalness={1} roughness={.17}/></RevolvedSurface>
</group>}
