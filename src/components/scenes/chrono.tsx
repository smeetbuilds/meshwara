import { Instance, Instances, MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function makeHand(length: number, width: number, counter = 0.08) {
  const shape = new THREE.Shape()
  shape.moveTo(-width * 0.42, -counter)
  shape.quadraticCurveTo(-width * 0.55, length * 0.18, -width * 0.28, length * 0.82)
  shape.quadraticCurveTo(0, length, width * 0.28, length * 0.82)
  shape.quadraticCurveTo(width * 0.55, length * 0.18, width * 0.42, -counter)
  shape.closePath()
  return new THREE.ShapeGeometry(shape, 22)
}

function makeStrapGeometry(sign: -1 | 1) {
  const crossSection = new THREE.Shape()
  crossSection.moveTo(-0.27, -0.045)
  crossSection.quadraticCurveTo(-0.27, -0.07, -0.23, -0.07)
  crossSection.lineTo(0.23, -0.07)
  crossSection.quadraticCurveTo(0.27, -0.07, 0.27, -0.045)
  crossSection.lineTo(0.27, 0.045)
  crossSection.quadraticCurveTo(0.27, 0.07, 0.23, 0.07)
  crossSection.lineTo(-0.23, 0.07)
  crossSection.quadraticCurveTo(-0.27, 0.07, -0.27, 0.045)
  crossSection.closePath()

  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, sign * 1.22, -0.08),
    new THREE.Vector3(0, sign * 1.7, -0.22),
    new THREE.Vector3(0, sign * 2.15, -0.55),
    new THREE.Vector3(0, sign * 2.45, -0.95),
  ])
  return new THREE.ExtrudeGeometry(crossSection, {
    steps: 42,
    bevelEnabled: false,
    extrudePath: path,
    curveSegments: 10,
  })
}

function Chronograph() {
  const ref = useRef<THREE.Group>(null)
  const seconds = useRef<THREE.Group>(null)
  const hourHand = useMemo(() => makeHand(0.7, 0.075), [])
  const minuteHand = useMemo(() => makeHand(0.94, 0.055), [])
  const secondHand = useMemo(() => makeHand(1.02, 0.022, 0.2), [])
  const strapTop = useMemo(() => makeStrapGeometry(1), [])
  const strapBottom = useMemo(() => makeStrapGeometry(-1), [])
  const caseProfile = useMemo(() => [
    new THREE.Vector2(0.0, -0.15),
    new THREE.Vector2(1.05, -0.15),
    new THREE.Vector2(1.24, -0.11),
    new THREE.Vector2(1.34, -0.02),
    new THREE.Vector2(1.37, 0.08),
    new THREE.Vector2(1.3, 0.15),
    new THREE.Vector2(1.18, 0.19),
    new THREE.Vector2(0.0, 0.19),
  ], [])
  const crownProfile = useMemo(() => [
    new THREE.Vector2(0.0, -0.16),
    new THREE.Vector2(0.13, -0.16),
    new THREE.Vector2(0.18, -0.11),
    new THREE.Vector2(0.2, 0),
    new THREE.Vector2(0.18, 0.11),
    new THREE.Vector2(0.13, 0.16),
    new THREE.Vector2(0.0, 0.16),
  ], [])
  const ticks = useMemo(() => Array.from({ length: 60 }, (_, i) => {
    const a = (i / 60) * Math.PI * 2
    const major = i % 5 === 0
    return {
      position: [Math.sin(a) * 1.02, Math.cos(a) * 1.02, 0.11] as [number, number, number],
      rotation: [0, 0, -a] as [number, number, number],
      scale: [major ? 0.034 : 0.014, major ? 0.15 : 0.075, 0.018] as [number, number, number],
    }
  }), [])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.2
    if (seconds.current) seconds.current.rotation.z = -state.clock.elapsedTime * 0.14
  })

  return (
    <group ref={ref} rotation={[0.18, -0.18, -0.08]} scale={0.9}>
      <mesh geometry={strapTop} rotation={[0, 0, 0]}>
        <meshPhysicalMaterial color="#3a2d27" roughness={0.5} sheen={0.28} sheenRoughness={0.72} />
      </mesh>
      <mesh geometry={strapBottom}>
        <meshPhysicalMaterial color="#3a2d27" roughness={0.5} sheen={0.28} sheenRoughness={0.72} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <latheGeometry args={[caseProfile, 128]} />
        <meshPhysicalMaterial color="#a8aaac" metalness={1} roughness={0.14} clearcoat={0.85} clearcoatRoughness={0.08} />
      </mesh>
      <mesh position={[0, 0, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.18, 1.18, 0.07, 96]} />
        <meshPhysicalMaterial color="#0d1012" metalness={0.6} roughness={0.26} />
      </mesh>
      <mesh position={[0, 0, 0.225]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.045, 96]} />
        <MeshTransmissionMaterial transmission={0.96} thickness={0.3} roughness={0.04} ior={1.48} chromaticAberration={0.012} />
      </mesh>

      <Instances limit={60}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color="#e7e1d5" metalness={0.75} roughness={0.17} />
        {ticks.map((tick, i) => <Instance key={i} {...tick} />)}
      </Instances>

      {[[-0.43, 0.15], [0.43, 0.15], [0, -0.42]].map(([x, y], i) => (
        <group key={i} position={[x, y, 0.18]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.22, 0.012, 10, 48]} />
            <meshPhysicalMaterial color="#737b80" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.205, 48]} />
            <meshPhysicalMaterial color="#15191b" metalness={0.45} roughness={0.34} />
          </mesh>
          <mesh position={[0, 0, 0.025]} rotation={[0, 0, i * 0.8]}>
            <boxGeometry args={[0.018, 0.18, 0.012]} />
            <meshBasicMaterial color="#b9c0c5" />
          </mesh>
        </group>
      ))}

      <mesh geometry={hourHand} position={[0, 0, 0.225]} rotation={[0, 0, 0.62]}>
        <meshPhysicalMaterial color="#ece7df" metalness={0.72} roughness={0.17} />
      </mesh>
      <mesh geometry={minuteHand} position={[0, 0, 0.24]} rotation={[0, 0, -0.92]}>
        <meshPhysicalMaterial color="#ece7df" metalness={0.72} roughness={0.17} />
      </mesh>
      <group ref={seconds} position={[0, 0, 0.255]}>
        <mesh geometry={secondHand}>
          <meshBasicMaterial color="#ff5c45" toneMapped={false} />
        </mesh>
      </group>
      <mesh position={[0, 0, 0.28]}>
        <sphereGeometry args={[0.055, 24, 24]} />
        <meshPhysicalMaterial color="#ded8cd" metalness={1} roughness={0.13} />
      </mesh>

      {[[-0.84, 1.16], [0.84, 1.16], [-0.84, -1.16], [0.84, -1.16]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, -0.02]} rotation={[0, 0, x * 0.08]} scale={[0.24, 0.46, 0.12]}>
          <sphereGeometry args={[1, 32, 18]} />
          <meshPhysicalMaterial color="#9da0a2" metalness={0.95} roughness={0.16} />
        </mesh>
      ))}

      <group position={[1.5, 0.02, -0.01]} rotation={[0, 0, Math.PI / 2]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <latheGeometry args={[crownProfile, 48]} />
          <meshPhysicalMaterial color="#979a9c" metalness={1} roughness={0.18} />
        </mesh>
        {Array.from({ length: 11 }, (_, i) => (
          <mesh key={i} position={[0, 0, -0.15 + i * 0.03]}>
            <torusGeometry args={[0.185, 0.006, 8, 28]} />
            <meshBasicMaterial color="#404548" />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default Chronograph
