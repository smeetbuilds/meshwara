import { LeafSurface, RevolvedSurface, SplineTube } from '../geometry/GeometryV2'

const branchMaterial = <meshPhysicalMaterial color="#b35f6f" roughness={0.46} clearcoat={0.18}/>
const tipMaterial = <meshPhysicalMaterial color="#e2a48f" roughness={0.58} clearcoat={0.12}/>
const coreMaterial = <meshPhysicalMaterial color="#744a5e" roughness={0.4} clearcoat={0.24}/>
const baseProfile: Array<[number, number]> = [[0,-0.35],[0.22,-0.3],[0.28,-0.12],[0.25,0.08],[0.16,0.22],[0,0.26]]
const branches = [
  [[0,-0.45,0],[-0.22,-0.05,0],[-0.54,0.32,0],[-0.78,0.68,0]],
  [[0,-0.4,0],[-0.08,0.05,0],[0.02,0.48,0],[0.12,0.86,0]],
  [[0,-0.42,0],[0.18,-0.02,0],[0.5,0.34,0],[0.76,0.7,0]],
  [[-0.18,-0.08,0],[-0.46,0.18,0],[-0.62,0.52,0],[-0.66,0.84,0]],
  [[0.14,0.0,0],[0.34,0.22,0],[0.44,0.56,0],[0.36,0.9,0]],
] as Array<Array<[number,number,number]>>
const crossVeins: Array<Array<[number,number,number]>> = [
  [[-0.66,0.38,0.015],[-0.38,0.44,0.03],[-0.1,0.5,0.025],[0.18,0.52,0.02],[0.48,0.44,0.015]],
  [[-0.52,0.62,0.01],[-0.24,0.66,0.025],[0.04,0.68,0.03],[0.3,0.64,0.02],[0.58,0.56,0.01]],
]

export default function SeaFanCoralStudy(){
  return <group rotation={[0,-0.22,0]} position={[0,0.06,0]}>
    <RevolvedSurface profile={baseProfile} radialSegments={48} position={[0,-0.52,0]}>{coreMaterial}</RevolvedSurface>
    {branches.map((points,index)=><SplineTube key={index} points={points} radius={0.035-index*0.002} tubularSegments={70} radialSegments={9}>{branchMaterial}</SplineTube>)}
    {crossVeins.map((points,index)=><SplineTube key={`vein-${index}`} points={points} radius={0.012} tubularSegments={54} radialSegments={7}>{coreMaterial}</SplineTube>)}
    {branches.slice(0,4).map((points,index)=>{
      const end=points[points.length-1]
      return <group key={`blade-${index}`} position={end} rotation={[0,0,index%2?0.68:-0.58]}>
        <LeafSurface length={0.52-index*0.035} width={0.2} camber={0.05} curl={0.07} twist={(index-1.5)*0.18} serration={5}>{tipMaterial}</LeafSurface>
        <LeafSurface length={0.34} width={0.14} camber={0.035} curl={-0.04} twist={-0.2} position={[0.06,-0.14,0.01]} rotation={[0,0,-0.7]}>{tipMaterial}</LeafSurface>
      </group>
    })}
    <SplineTube points={[[-0.7,0.58,0.01],[-0.36,0.48,0.015],[0,0.42,0.02],[0.38,0.5,0.01],[0.7,0.62,0]]} radius={0.014} tubularSegments={70} radialSegments={7}>{tipMaterial}</SplineTube>
  </group>
}
