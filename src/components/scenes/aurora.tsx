import { Instance, Instances, Line, MeshTransmissionMaterial } from '@react-three/drei'
import { CurvedBox } from '../geometry/CurvedBox'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

const auroraVertex = /* glsl */`
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;
  void main() {
    vUv = uv;
    vec3 p = position;
    float wave = sin(p.x * 2.5 + uTime * .7) * .13 + cos(p.y * 3.2 - uTime * .48) * .09;
    p.z += wave + sin((p.x + p.y) * 4.0 + uTime * .32) * .04;
    vWave = wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const auroraFragment = /* glsl */`
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;
  void main() {
    float band = .5 + .5 * sin((vUv.x * 1.4 + vUv.y) * 8.0 + uTime * .28 + vWave * 9.0);
    vec3 ink = vec3(.035, .045, .055);
    vec3 mint = vec3(.36, .95, .76);
    vec3 violet = vec3(.56, .42, .92);
    vec3 col = mix(ink, mix(mint, violet, vUv.x), smoothstep(.16, .92, band) * .78);
    float edge = smoothstep(0.0, .15, vUv.x) * smoothstep(0.0, .15, 1.0 - vUv.x) * smoothstep(0.0, .16, vUv.y) * smoothstep(0.0, .16, 1.0 - vUv.y);
    gl_FragColor = vec4(col, edge * .96);
  }
`

function AuroraVeil() {
  const mat = useRef<THREE.ShaderMaterial>(null)
  useFrame((state) => {
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime
  })
  return (
    <mesh rotation={[-0.42, 0.12, -0.16]} scale={[1.05, 1.05, 1]}>
      <planeGeometry args={[3.5, 2.8, 96, 72]} />
      <shaderMaterial ref={mat} vertexShader={auroraVertex} fragmentShader={auroraFragment} transparent side={THREE.DoubleSide} depthWrite={false} uniforms={{ uTime: { value: 0 } }} />
    </mesh>
  )
}

export default AuroraVeil
