import { Instance, Instances, Line, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

const polarVertex = /* glsl */`
  uniform float uTime;
  attribute float aPhase;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    float drift = sin(uTime * .35 + aPhase * 6.2831) * .08;
    p.x += drift * cos(aPhase * 11.0);
    p.z += drift * sin(aPhase * 9.0);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (9.0 + 8.0 * sin(aPhase * 7.0 + uTime * .25)) * (1.0 / -mv.z);
    vAlpha = .35 + .65 * sin(aPhase * 8.0 + 1.4);
    gl_Position = projectionMatrix * mv;
  }
`

const polarFragment = /* glsl */`
  varying float vAlpha;
  void main() {
    vec2 p = gl_PointCoord - .5;
    float d = length(p);
    float alpha = smoothstep(.5, .05, d) * (.38 + vAlpha * .42);
    vec3 col = mix(vec3(.38, .78, 1.0), vec3(.82, 1.0, .72), vAlpha);
    gl_FragColor = vec4(col, alpha);
  }
`

function PolarField() {
  const ref = useRef<THREE.Points>(null)
  const mat = useRef<THREE.ShaderMaterial>(null)
  const geometry = useMemo(() => {
    const count = 520
    const positions = new Float32Array(count * 3)
    const phases = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const t = i / count
      const phi = i * 2.3999632297
      const y = 1 - 2 * t
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const shell = 1.05 + .55 * Math.sin(i * 1.618) ** 2
      positions[i * 3] = Math.cos(phi) * r * shell
      positions[i * 3 + 1] = y * shell
      positions[i * 3 + 2] = Math.sin(phi) * r * shell
      phases[i] = (i * .61803398875) % 1
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
    return g
  }, [])
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * .035
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime
  })
  return (
    <points ref={ref} geometry={geometry} rotation={[.18, 0, .1]}>
      <shaderMaterial ref={mat} vertexShader={polarVertex} fragmentShader={polarFragment} transparent depthWrite={false} blending={THREE.AdditiveBlending} uniforms={{ uTime: { value: 0 } }} />
    </points>
  )
}

export default PolarField
