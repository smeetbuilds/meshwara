import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const vertex = /* glsl */`
  uniform float uTime;
  varying float vHeight;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    float ridge = sin(p.x * 1.45 + sin(p.y * .72) * 1.8) * .28;
    float broad = cos(p.y * .83 - p.x * .32) * .2;
    float drift = sin((p.x + p.y) * 1.8 + uTime * .18) * .035;
    p.z += ridge + broad + drift;
    vHeight = p.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const fragment = /* glsl */`
  varying float vHeight;
  varying vec2 vUv;
  void main() {
    float h = smoothstep(-.45, .55, vHeight);
    vec3 low = vec3(.035, .045, .04);
    vec3 moss = vec3(.16, .24, .17);
    vec3 stone = vec3(.44, .45, .40);
    vec3 col = mix(low, moss, h);
    col = mix(col, stone, smoothstep(.62, .95, h));
    float vignette = smoothstep(.92, .28, distance(vUv, vec2(.5)));
    gl_FragColor = vec4(col * (.72 + vignette * .4), 1.0);
  }
`

function NightTerrain() {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  useFrame((state) => { if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime })
  return (
    <group rotation={[-0.92, 0.02, -0.18]} position={[0, -0.3, 0]}>
      <mesh scale={[1.2, 1.2, 1]}>
        <planeGeometry args={[3.8, 3.2, 128, 112]} />
        <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.72, -0.38, 0.48]} rotation={[0.2, 0.5, 0.1]}>
        <icosahedronGeometry args={[0.23, 2]} />
        <meshPhysicalMaterial color="#b7ad96" roughness={0.82} />
      </mesh>
      <mesh position={[-0.82, 0.48, 0.42]} rotation={[-0.1, 0.3, -0.2]}>
        <dodecahedronGeometry args={[0.17, 1]} />
        <meshPhysicalMaterial color="#757465" roughness={0.9} />
      </mesh>
    </group>
  )
}

export default NightTerrain
