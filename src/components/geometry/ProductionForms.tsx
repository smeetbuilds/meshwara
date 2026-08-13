import { ExtrudedProfile, LoftSurface, RevolvedSurface, SplineTube, type LoftStation } from './GeometryV2'

type Material = { color: string; metalness?: number; roughness?: number; clearcoat?: number; transmission?: number; opacity?: number }
type Vec3 = [number, number, number]
type Vec2 = [number, number]

function SurfaceMaterial({ spec }: { spec: Material }) {
  return <meshPhysicalMaterial color={spec.color} metalness={spec.metalness ?? 0.08} roughness={spec.roughness ?? 0.38} clearcoat={spec.clearcoat ?? 0.18} transmission={spec.transmission ?? 0} transparent={(spec.opacity ?? 1) < 1 || (spec.transmission ?? 0) > 0} opacity={spec.opacity ?? 1} />
}

export type PerformanceFormProps = {
  primary: LoftStation[]
  secondary: LoftStation[]
  trim: Vec3[]
  profile: Vec2[]
  accent?: Vec3[]
  primaryMaterial: Material
  secondaryMaterial: Material
  accentMaterial: Material
  position?: Vec3
  rotation?: Vec3
  scale?: number | Vec3
}

export function PerformanceForm({ primary, secondary, trim, profile, accent, primaryMaterial, secondaryMaterial, accentMaterial, position = [0,0,0], rotation = [0,0,0], scale = 1 }: PerformanceFormProps) {
  return <group position={position} rotation={rotation} scale={scale}>
    <LoftSurface stations={primary} radialSegments={44}><SurfaceMaterial spec={primaryMaterial}/></LoftSurface>
    <LoftSurface stations={secondary} radialSegments={36}><SurfaceMaterial spec={secondaryMaterial}/></LoftSurface>
    <SplineTube points={trim} radius={0.035} tubularSegments={72} radialSegments={10}><SurfaceMaterial spec={accentMaterial}/></SplineTube>
    {accent && accent.length > 2 && <SplineTube points={accent} radius={0.018} tubularSegments={54} radialSegments={8}><SurfaceMaterial spec={accentMaterial}/></SplineTube>}
    <RevolvedSurface profile={profile} radialSegments={64} rotation={[0,0,Math.PI/2]}><SurfaceMaterial spec={secondaryMaterial}/></RevolvedSurface>
  </group>
}

export type SpatialFormProps = {
  anchor: LoftStation[]
  secondary: LoftStation[]
  rail: Vec3[]
  profile: Vec2[]
  platform: Vec2[]
  primaryMaterial: Material
  secondaryMaterial: Material
  accentMaterial: Material
  position?: Vec3
  rotation?: Vec3
  scale?: number | Vec3
}

export function SpatialForm({ anchor, secondary, rail, profile, platform, primaryMaterial, secondaryMaterial, accentMaterial, position = [0,0,0], rotation = [0,0,0], scale = 1 }: SpatialFormProps) {
  return <group position={position} rotation={rotation} scale={scale}>
    <ExtrudedProfile points={platform} depth={0.16} bevelSize={0.035} bevelThickness={0.035} bevelSegments={5} rotation={[Math.PI/2,0,0]} position={[0,-0.72,0]}><SurfaceMaterial spec={secondaryMaterial}/></ExtrudedProfile>
    <LoftSurface stations={anchor} radialSegments={40}><SurfaceMaterial spec={primaryMaterial}/></LoftSurface>
    <LoftSurface stations={secondary} radialSegments={36}><SurfaceMaterial spec={secondaryMaterial}/></LoftSurface>
    <SplineTube points={rail} radius={0.028} tubularSegments={80} radialSegments={9}><SurfaceMaterial spec={accentMaterial}/></SplineTube>
    <RevolvedSurface profile={profile} radialSegments={56} position={[0.72,-0.18,0.38]}><SurfaceMaterial spec={accentMaterial}/></RevolvedSurface>
  </group>
}

export type ArchitectureFormProps = {
  roof: LoftStation[]
  canopy: LoftStation[]
  promenade: Vec3[]
  columnProfile: Vec2[]
  footprint: Vec2[]
  wallMaterial: Material
  roofMaterial: Material
  frameMaterial: Material
  position?: Vec3
  rotation?: Vec3
  scale?: number | Vec3
}

export function ArchitectureForm({ roof, canopy, promenade, columnProfile, footprint, wallMaterial, roofMaterial, frameMaterial, position = [0,0,0], rotation = [0,0,0], scale = 1 }: ArchitectureFormProps) {
  const columns = [-0.88,-0.44,0,0.44,0.88]
  return <group position={position} rotation={rotation} scale={scale}>
    <ExtrudedProfile points={footprint} depth={0.2} bevelSize={0.025} bevelThickness={0.025} bevelSegments={4} rotation={[Math.PI/2,0,0]} position={[0,-0.78,0]}><SurfaceMaterial spec={wallMaterial}/></ExtrudedProfile>
    <LoftSurface stations={roof} radialSegments={42} position={[0,0.42,0]}><SurfaceMaterial spec={roofMaterial}/></LoftSurface>
    <LoftSurface stations={canopy} radialSegments={36} position={[0,0.02,0.26]}><SurfaceMaterial spec={wallMaterial}/></LoftSurface>
    <SplineTube points={promenade} radius={0.026} tubularSegments={80} radialSegments={8}><SurfaceMaterial spec={frameMaterial}/></SplineTube>
    {columns.map((x) => <RevolvedSurface key={x} profile={columnProfile} radialSegments={28} position={[x,-0.18,-0.28]} scale={[0.7,0.7,0.7]}><SurfaceMaterial spec={frameMaterial}/></RevolvedSurface>)}
  </group>
}

export type IndustrialFormProps = {
  housing: LoftStation[]
  actuator: LoftStation[]
  cable: Vec3[]
  driveProfile: Vec2[]
  baseProfile: Vec2[]
  bodyMaterial: Material
  machineMaterial: Material
  signalMaterial: Material
  position?: Vec3
  rotation?: Vec3
  scale?: number | Vec3
}

export function IndustrialForm({ housing, actuator, cable, driveProfile, baseProfile, bodyMaterial, machineMaterial, signalMaterial, position = [0,0,0], rotation = [0,0,0], scale = 1 }: IndustrialFormProps) {
  return <group position={position} rotation={rotation} scale={scale}>
    <ExtrudedProfile points={baseProfile} depth={0.18} bevelSize={0.03} bevelThickness={0.03} bevelSegments={4} rotation={[Math.PI/2,0,0]} position={[0,-0.78,0]}><SurfaceMaterial spec={machineMaterial}/></ExtrudedProfile>
    <LoftSurface stations={housing} radialSegments={40}><SurfaceMaterial spec={bodyMaterial}/></LoftSurface>
    <LoftSurface stations={actuator} radialSegments={34} position={[0.18,0.28,0]}><SurfaceMaterial spec={machineMaterial}/></LoftSurface>
    <SplineTube points={cable} radius={0.025} tubularSegments={72} radialSegments={8}><SurfaceMaterial spec={signalMaterial}/></SplineTube>
    <RevolvedSurface profile={driveProfile} radialSegments={56} rotation={[0,0,Math.PI/2]} position={[-0.55,0.05,0.12]}><SurfaceMaterial spec={signalMaterial}/></RevolvedSurface>
  </group>
}
