import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function makeVaneShape() {
  const shape = new THREE.Shape()
  shape.moveTo(-0.55, -0.05)
  shape.bezierCurveTo(-0.32, -0.11, -0.06, -0.09, 0.18, -0.04)
  shape.bezierCurveTo(0.42, 0, 0.65, 0.12, 0.78, 0.28)
  shape.lineTo(0.36, 0.2)
  shape.bezierCurveTo(0.08, 0.15, -0.28, 0.12, -0.55, 0.05)
  shape.closePath()
  return shape
}

function WeatherStation() {
  const cups = useRef<THREE.Group>(null)
  const vane = useMemo(() => new THREE.ExtrudeGeometry(makeVaneShape(), {
    depth: 0.025,
    bevelEnabled: true,
    bevelSize: 0.008,
    bevelThickness: 0.008,
    bevelSegments: 3,
    curveSegments: 18,
  }), [])
  const cupProfile = useMemo(() => [
    new THREE.Vector2(0.0, -0.12),
    new THREE.Vector2(0.09, -0.12),
    new THREE.Vector2(0.14, -0.07),
    new THREE.Vector2(0.16, 0.02),
    new THREE.Vector2(0.13, 0.11),
    new THREE.Vector2(0.08, 0.14),
    new THREE.Vector2(0.0, 0.14),
  ], [])
  const shieldProfile = useMemo(() => [
    new THREE.Vector2(0, -0.018),
    new THREE.Vector2(0.13, -0.018),
    new THREE.Vector2(0.25, -0.01),
    new THREE.Vector2(0.29, 0.02),
    new THREE.Vector2(0.25, 0.05),
    new THREE.Vector2(0.13, 0.058),
    new THREE.Vector2(0, 0.058),
  ], [])
  const baseProfile = useMemo(() => [
    new THREE.Vector2(0, -0.11),
    new THREE.Vector2(0.76, -0.11),
    new THREE.Vector2(0.87, -0.02),
    new THREE.Vector2(0.82, 0.09),
    new THREE.Vector2(0.62, 0.14),
    new THREE.Vector2(0, 0.14),
  ], [])
  const armCurves = useMemo(() => [0, 1, 2].map((i) => {
    const a = (i / 3) * Math.PI * 2
    return {
      angle: a,
      curve: new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(a) * 0.22, 0.03, Math.sin(a) * 0.22),
        new THREE.Vector3(Math.cos(a) * 0.5, 0, Math.sin(a) * 0.5),
      ]),
    }
  }), [])

  useFrame((_, delta) => {
    if (cups.current) cups.current.rotation.y += delta * 0.5
  })

  return (
    <group position={[0, -0.7, 0]} rotation={[0.02, -0.34, 0]}>
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 2.9, 24]} />
        <meshPhysicalMaterial color="#747b7d" metalness={0.9} roughness={0.24} />
      </mesh>

      <group ref={cups} position={[0, 1.82, 0]}>
        {armCurves.map(({ angle, curve }, i) => {
          const position: [number, number, number] = [Math.cos(angle) * 0.5, 0, Math.sin(angle) * 0.5]
          return (
            <group key={i}>
              <mesh>
                <tubeGeometry args={[curve, 36, 0.018, 8, false]} />
                <meshPhysicalMaterial color="#8a9193" metalness={0.92} roughness={0.2} />
              </mesh>
              <mesh position={position} rotation={[0, -angle, Math.PI / 2]}>
                <latheGeometry args={[cupProfile, 40, 0, Math.PI * 1.15]} />
                <meshPhysicalMaterial color="#a4abad" metalness={0.75} roughness={0.25} side={THREE.DoubleSide} />
              </mesh>
            </group>
          )
        })}
      </group>

      <group position={[0, 1.2, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.028, 0.028, 1.38, 12]} />
          <meshPhysicalMaterial color="#777e80" metalness={0.86} roughness={0.22} />
        </mesh>
        <mesh geometry={vane} position={[-0.42, -0.02, -0.012]} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial color="#4f5a5d" roughness={0.38} metalness={0.38} />
        </mesh>
        <mesh position={[0.72, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.13, 0.38, 28]} />
          <meshPhysicalMaterial color="#d39d4c" roughness={0.34} />
        </mesh>
      </group>

      {Array.from({ length: 7 }, (_, i) => (
        <mesh key={i} position={[0, 0.28 - i * 0.095, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <latheGeometry args={[shieldProfile, 56]} />
          <meshPhysicalMaterial color="#d2d5d2" roughness={0.46} />
        </mesh>
      ))}

      <mesh position={[0, -0.82, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <latheGeometry args={[baseProfile, 72]} />
        <meshPhysicalMaterial color="#97938c" roughness={0.78} />
      </mesh>
    </group>
  )
}

export default WeatherStation
