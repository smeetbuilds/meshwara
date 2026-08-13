import { useMemo } from 'react'
import * as THREE from 'three'

function CocktailCoupe() {
  const glassOuter = useMemo(() => [
    new THREE.Vector2(0.055, -0.92),
    new THREE.Vector2(0.095, -0.9),
    new THREE.Vector2(0.115, -0.2),
    new THREE.Vector2(0.24, -0.02),
    new THREE.Vector2(0.52, 0.15),
    new THREE.Vector2(0.78, 0.4),
    new THREE.Vector2(0.9, 0.67),
  ], [])
  const liquid = useMemo(() => [
    new THREE.Vector2(0.0, 0.18),
    new THREE.Vector2(0.42, 0.19),
    new THREE.Vector2(0.69, 0.36),
    new THREE.Vector2(0.76, 0.49),
    new THREE.Vector2(0.0, 0.49),
  ], [])
  const base = useMemo(() => [
    new THREE.Vector2(0, -0.965),
    new THREE.Vector2(0.42, -0.965),
    new THREE.Vector2(0.5, -0.93),
    new THREE.Vector2(0.52, -0.89),
    new THREE.Vector2(0.1, -0.87),
    new THREE.Vector2(0, -0.87),
  ], [])
  const peel = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.24, 0.66, 0.18),
    new THREE.Vector3(0.4, 0.75, 0.12),
    new THREE.Vector3(0.52, 0.82, 0.0),
    new THREE.Vector3(0.46, 0.88, -0.14),
    new THREE.Vector3(0.3, 0.83, -0.2),
  ]), [])

  return (
    <group rotation={[0.04, -0.32, 0]}>
      <mesh>
        <latheGeometry args={[glassOuter, 96]} />
        <meshPhysicalMaterial
          color="#e4eeee"
          transmission={0.97}
          transparent
          opacity={0.8}
          roughness={0.035}
          thickness={0.055}
          ior={1.48}
          clearcoat={0.32}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <latheGeometry args={[liquid, 96]} />
        <meshPhysicalMaterial color="#d69c69" transmission={0.16} transparent opacity={0.9} roughness={0.12} thickness={0.12} />
      </mesh>
      <mesh>
        <latheGeometry args={[base, 72]} />
        <meshPhysicalMaterial color="#e6eeee" transmission={0.95} transparent opacity={0.75} roughness={0.04} thickness={0.06} ior={1.48} />
      </mesh>
      <mesh position={[0, 0.67, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.014, 10, 96]} />
        <meshPhysicalMaterial color="#eef4f3" transmission={0.94} transparent opacity={0.82} roughness={0.03} />
      </mesh>
      <mesh>
        <tubeGeometry args={[peel, 54, 0.027, 10, false]} />
        <meshPhysicalMaterial color="#d6ae43" roughness={0.42} clearcoat={0.08} />
      </mesh>
      <mesh position={[0.22, 0.51, -0.05]} rotation={[0.28, 0.2, -0.3]} scale={[0.2, 0.08, 0.24]}>
        <sphereGeometry args={[1, 28, 16]} />
        <meshPhysicalMaterial color="#8c6043" roughness={0.5} />
      </mesh>
    </group>
  )
}

export default CocktailCoupe
