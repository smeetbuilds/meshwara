import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { ExtrudedProfile, LoftSurface, SplineTube } from '../geometry/GeometryV2'

/**
 * Anatomically directed plains-zebra study. Geometry and stripe maps are
 * generated locally and deterministically; no external textures or placeholders.
 * This is not artist-approved photogrammetry or a claim of photorealism.
 */
type P = [number, number, number]
type Station = { x: number; y: number; width: number; height: number; exponent: number }
const s = (x: number, y: number, width: number, height: number): Station =>
  ({ x, y, width, height, exponent: 2 })

function makeStripeMap(lanes: number, seed: number, leg = false) {
  const w = 512, h = 256
  const pixels = new Uint8Array(w * h * 4)
  for (let y = 0; y < h; y++) {
    const v = y / h
    for (let x = 0; x < w; x++) {
      const u = x / w
      const ripple = Math.sin(v * 17 + u * 9 + seed) * .12 +
        Math.sin(v * 29 - u * 13 + seed * 1.7) * .055
      const phase = (leg ? u * lanes : u * lanes + v * 1.45) +
        ripple + .2 * Math.sin(u * 17 + v * 5)
      const wave = Math.sin(phase * Math.PI * 2)
      const edge = .09 * Math.sin(u * 193 + v * 47 + seed)
      const ink = wave > (leg ? -.18 : -.08) + edge
      const grain = Math.sin(x * 2.1 + y * 6.4) * 3 + Math.sin(y * 1.5 - x * 3.7) * 2
      const tone = ink ? [27, 29, 29] : [233, 227, 211]
      const i = (y * w + x) * 4
      pixels[i] = Math.max(0, Math.min(255, tone[0] + grain))
      pixels[i + 1] = Math.max(0, Math.min(255, tone[1] + grain))
      pixels[i + 2] = Math.max(0, Math.min(255, tone[2] + grain))
      pixels[i + 3] = 255
    }
  }
  const map = new THREE.DataTexture(pixels, w, h, THREE.RGBAFormat)
  map.colorSpace = THREE.SRGBColorSpace
  map.wrapS = THREE.RepeatWrapping
  map.wrapT = THREE.RepeatWrapping
  map.magFilter = THREE.LinearFilter
  map.minFilter = THREE.LinearMipmapLinearFilter
  map.generateMipmaps = true
  map.needsUpdate = true
  return map
}
const flankMap = makeStripeMap(14, .8)
const neckMap = makeStripeMap(11, 1.8)
const faceMap = makeStripeMap(7, 2.3)
const legMap = makeStripeMap(15, 3.5, true)
const coat = { roughness: .91, metalness: 0 } as const

const body: Station[] = [
  s(-1.31,.13,.035,.08), s(-1.22,.16,.23,.31),
  s(-1.03,.20,.34,.43), s(-.76,.19,.37,.43),
  s(-.41,.17,.36,.38), s(.03,.18,.37,.39),
  s(.38,.23,.42,.48), s(.61,.30,.37,.45),
  s(.8,.33,.23,.31), s(.85,.34,.04,.10),
]
const neck: Station[] = [
  s(.34,.35,.29,.34), s(.56,.48,.32,.35),
  s(.79,.66,.28,.32), s(.98,.85,.24,.29),
  s(1.13,1.01,.19,.24), s(1.28,1.11,.16,.18),
  s(1.40,1.10,.09,.12),
]
const face: Station[] = [
  s(1.16,1.10,.14,.17), s(1.30,1.08,.20,.21),
  s(1.44,1.02,.16,.18), s(1.58,.94,.115,.15),
  s(1.77,.89,.12,.14), s(1.90,.88,.15,.13),
  s(1.99,.88,.08,.08),
]

function pathGeometry(points: P[], radii: number[]) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)), false, 'centripetal')
  const vertices: number[] = [], uvs: number[] = [], indices: number[] = []
  const rows = 48, sides = 16
  const along = new THREE.Vector3(), across = new THREE.Vector3(), perpendicular = new THREE.Vector3()
  for (let i = 0; i <= rows; i++) {
    const t = i / rows
    const p = curve.getPoint(t)
    along.copy(curve.getTangent(t)).normalize()
    across.crossVectors(along, new THREE.Vector3(0, 0, 1)).normalize()
    perpendicular.crossVectors(along, across).normalize()
    const station = t * (radii.length - 1)
    const index = Math.min(radii.length - 2, Math.floor(station))
    const radius = THREE.MathUtils.lerp(radii[index], radii[index + 1], station - index)
    for (let j = 0; j <= sides; j++) {
      const a = (j / sides) * Math.PI * 2
      const v = p.clone().addScaledVector(across, radius * Math.cos(a))
        .addScaledVector(perpendicular, radius * Math.sin(a))
      vertices.push(v.x, v.y, v.z)
      uvs.push(t, j / sides)
      if (i < rows && j < sides) {
        const n = i * (sides + 1) + j, next = n + sides + 1
        indices.push(n, n + 1, next, next, n + 1, next + 1)
      }
    }
  }
  const mesh = new THREE.BufferGeometry()
  mesh.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  mesh.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  mesh.setIndex(indices)
  mesh.computeVertexNormals()
  return mesh
}

function TaperedLimb({ points, radii, dark = false }: { points: P[]; radii: number[]; dark?: boolean }) {
  const geometry = useMemo(() => pathGeometry(points, radii), [points, radii])
  useEffect(() => () => geometry.dispose(), [geometry])
  return <mesh geometry={geometry} castShadow receiveShadow>
    <meshStandardMaterial map={dark ? undefined : legMap} color={dark ? '#272629' : '#ffffff'} {...coat}/>
  </mesh>
}

const legs: Array<{ points: P[]; radii: number[]; hoof: P }> = [
  { points: [[.48,-.02,-.24],[.52,-.35,-.24],[.60,-.58,-.24],[.47,-.87,-.24],[.47,-1.15,-.24]], radii: [.16,.115,.076,.053,.07], hoof: [.54,-1.19,-.24] },
  { points: [[.48,-.02,.24],[.52,-.35,.24],[.60,-.58,.24],[.47,-.87,.24],[.47,-1.15,.24]], radii: [.16,.115,.076,.053,.07], hoof: [.54,-1.19,.24] },
  { points: [[-1.02,-.06,-.25],[-1.07,-.34,-.25],[-.94,-.62,-.25],[-1.12,-.86,-.25],[-1.01,-1.15,-.25]], radii: [.19,.14,.09,.058,.07], hoof: [-.95,-1.19,-.25] },
  { points: [[-1.02,-.06,.25],[-1.07,-.34,.25],[-.94,-.62,.25],[-1.12,-.86,.25],[-1.01,-1.15,.25]], radii: [.19,.14,.09,.058,.07], hoof: [-.95,-1.19,.25] },
]

function Ear({ z }: { z: number }) {
  return <group position={[1.25,1.27,z]}>
    <ExtrudedProfile points={[[-.095,-.06],[.04,-.07],[.11,.26],[-.025,.35],[-.11,.20]]}
      depth={.075} bevelSize={.008} bevelThickness={.008}>
      <meshStandardMaterial color="#e2dcca" roughness={.98}/>
    </ExtrudedProfile>
    <ExtrudedProfile points={[[-.058,-.01],[.026,-.02],[.056,.18],[-.025,.26],[-.07,.15]]}
      position={[0,.005,z > 0 ? .045 : -.045]} depth={.006} bevelSize={.002} bevelThickness={.002}>
      <meshStandardMaterial color="#6f6563" roughness={.99}/>
    </ExtrudedProfile>
  </group>
}

export default function ZebraFormStudy() {
  return <group rotation={[0,-.42,0]} position={[-.12,.10,0]} scale={.90}>
    <LoftSurface stations={body} radialSegments={64} castShadow receiveShadow>
      <meshStandardMaterial map={flankMap} {...coat}/>
    </LoftSurface>
    <LoftSurface stations={neck} radialSegments={48} castShadow receiveShadow>
      <meshStandardMaterial map={neckMap} {...coat}/>
    </LoftSurface>
    <LoftSurface stations={face} radialSegments={48} castShadow receiveShadow>
      <meshStandardMaterial map={faceMap} {...coat}/>
    </LoftSurface>
    {legs.map((leg, i) => <group key={i}>
      <TaperedLimb points={leg.points} radii={leg.radii}/>
      <ExtrudedProfile points={[[-.15,-.05],[.13,-.05],[.18,.03],[.09,.11],[-.11,.1]]}
        position={leg.hoof} depth={.18} bevelSize={.012} bevelThickness={.012}>
        <meshStandardMaterial color="#282828" roughness={.83}/>
      </ExtrudedProfile>
    </group>)}
    <Ear z={-.13}/><Ear z={.13}/>
    {[-1,1].map(side => <group key={side}>
      <mesh position={[1.34,1.115,side*.185]} scale={[.061,.041,.025]}>
        <sphereGeometry args={[1,20,12]}/><meshPhysicalMaterial color="#372f29" roughness={.38}/>
      </mesh>
      <mesh position={[1.35,1.116,side*.208]} scale={[.020,.018,.012]}>
        <sphereGeometry args={[1,16,12]}/><meshPhysicalMaterial color="#111517" roughness={.09} clearcoat={.9}/>
      </mesh>
      <mesh position={[1.86,.925,side*.136]} scale={[.072,.035,.016]}>
        <sphereGeometry args={[1,18,12]}/><meshStandardMaterial color="#1c1d1d" roughness={.64}/>
      </mesh>
    </group>)}
    {Array.from({length:21},(_,i)=>{
      const t=i/20
      const x=.51+t*.78, y=.77+t*.52
      return <SplineTube key={i} points={[[x,y,0],[x-.02,y+.12,0],[x-.065,y+.16,0]]}
        radius={.011+(1-t)*.009} tubularSegments={8} radialSegments={5}>
        <meshStandardMaterial color="#242527" roughness={.98}/>
      </SplineTube>
    })}
    <SplineTube points={[[-1.24,.33,0],[-1.49,.15,0],[-1.68,-.17,0],[-1.78,-.32,0]]}
      radius={.036} tubularSegments={32} radialSegments={9}>
      <meshStandardMaterial color="#232526" roughness={.95}/>
    </SplineTube>
    <TaperedLimb dark points={[[-1.72,-.19,0],[-1.79,-.32,0],[-1.84,-.43,0]]} radii={[.045,.10,.012]}/>
  </group>
}
