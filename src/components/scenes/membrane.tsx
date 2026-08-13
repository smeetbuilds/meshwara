import { Instance, Instances, Line, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type GroupRef = THREE.Group

const membraneVertex = /* glsl */`
  uniform float uTime;
  varying vec3 vNormalW;
  varying vec3 vView;
  varying float vPulse;
  void main() {
    vec3 p = position;
    float pulse = sin(p.y * 4.5 + uTime * .62) * .05 + sin((p.x + p.z) * 5.0 - uTime * .44) * .035;
    p += normal * pulse;
    vec4 world = modelMatrix * vec4(p, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vView = normalize(cameraPosition - world.xyz);
    vPulse = pulse;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const membraneFragment = /* glsl */`
  varying vec3 vNormalW;
  varying vec3 vView;
  varying float vPulse;
  void main() {
    float fres = pow(1.0 - max(dot(normalize(vNormalW), normalize(vView)), 0.0), 2.1);
    float phase = fres * 7.0 + vPulse * 24.0;
    vec3 a = vec3(.20, .84, 1.0);
    vec3 b = vec3(1.0, .38, .72);
    vec3 c = vec3(.74, 1.0, .48);
    vec3 col = mix(a, b, .5 + .5 * sin(phase));
    col = mix(col, c, .5 + .5 * cos(phase * .71));
    float alpha = .18 + fres * .78;
    gl_FragColor = vec4(col, alpha);
  }
`

function SpectralMembrane() {
  const group = useRef<GroupRef>(null)
  const mat = useRef<THREE.ShaderMaterial>(null)
  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.07
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime
  })
  return (
    <group ref={group} rotation={[0.3, -0.25, 0.15]}>
      <mesh scale={[1.34, 1.02, 0.78]}>
        <icosahedronGeometry args={[1.18, 7]} />
        <shaderMaterial ref={mat} vertexShader={membraneVertex} fragmentShader={membraneFragment} transparent side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} uniforms={{ uTime: { value: 0 } }} />
      </mesh>
      <mesh scale={[0.52, 0.4, 0.3]}>
        <icosahedronGeometry args={[1.15, 3]} />
        <meshPhysicalMaterial color="#11151b" metalness={0.95} roughness={0.15} />
      </mesh>
    </group>
  )
}

export default SpectralMembrane
