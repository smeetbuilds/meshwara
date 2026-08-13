import { Bounds, ContactShadows, Environment, Float, Lightformer } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, type ReactNode } from 'react'
import * as THREE from 'three'
import type { AssetInteraction, AssetPresentation, AssetSceneKind } from '../lib/types'
import { useReducedMotion } from '../lib/useReducedMotion'
import { sceneRegistry } from './sceneRegistry'

export type AssetPreviewMotion = 'live' | 'paused'
export type AssetPreviewQuality = 'efficient' | 'balanced' | 'crisp'

export interface AssetSceneTuning {
  cameraFov: number
  cameraZoom: number
  exposure: number
  pointerStrength: number
  floatSpeed: number
  floatIntensity: number
  rotationY: number
}

export const defaultAssetSceneTuning: AssetSceneTuning = {
  cameraFov: 34,
  cameraZoom: 1,
  exposure: 1.08,
  pointerStrength: 1,
  floatSpeed: 0.78,
  floatIntensity: 0.11,
  rotationY: 0,
}

function Rig({ children, enabled, strength }: { children: ReactNode; enabled: boolean; strength: number }) {
  const ref = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  useFrame((_, delta) => {
    if (!ref.current || !enabled) return
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, pointer.x * 0.18 * strength, 4.2, delta)
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, pointer.y * -0.1 * strength, 4.2, delta)
  })

  return <group ref={ref}>{children}</group>
}

function Studio({ compact, quality }: { compact: boolean; quality: AssetPreviewQuality }) {
  if (compact) {
    return (
      <>
        <hemisphereLight color="#fffdf8" groundColor="#aaa69e" intensity={1.18} />
        <directionalLight position={[4.5, 5.5, 4]} intensity={2.15} />
        <directionalLight position={[-3.5, 2, -2.5]} intensity={0.8} />
      </>
    )
  }

  const environmentResolution = quality === 'efficient' ? 96 : quality === 'balanced' ? 128 : 160

  return (
    <>
      <hemisphereLight color="#fffdf8" groundColor="#a8a49b" intensity={1.15} />
      <directionalLight position={[5.5, 6.5, 4.5]} intensity={2.6} />
      <directionalLight position={[-4.5, 2.2, -3.5]} intensity={1.3} />
      <pointLight position={[0, -1.6, 3.6]} intensity={0.55} distance={8} />
      <Environment resolution={environmentResolution}>
        <Lightformer intensity={4.6} position={[0, 5, -2]} scale={[8, 1.6, 1]} />
        <Lightformer intensity={3.2} position={[-5, 0.5, 2]} rotation-y={Math.PI / 2} scale={[6, 1.5, 1]} />
        <Lightformer intensity={2.6} position={[5, -0.6, 1]} rotation-y={-Math.PI / 2} scale={[5, 1.1, 1]} />
        <Lightformer intensity={1.8} position={[0, -3, 2]} rotation-x={Math.PI / 2} scale={[4, 1, 1]} />
      </Environment>
    </>
  )
}

function FramedScene({ children, compact }: { children: ReactNode; compact: boolean }) {
  return <Bounds fit clip observe margin={compact ? 1.32 : 1.16}>{children}</Bounds>
}

function CameraTuner({ fov, zoom }: { fov: number; zoom: number }) {
  const { camera, invalidate } = useThree()

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return
    camera.fov = fov
    camera.zoom = zoom
    camera.updateProjectionMatrix()
    invalidate()
  }, [camera, fov, invalidate, zoom])

  return null
}

function RendererTuner({ exposure }: { exposure: number }) {
  const { gl, invalidate } = useThree()

  useEffect(() => {
    gl.toneMappingExposure = exposure
    invalidate()
  }, [exposure, gl, invalidate])

  return null
}

export function AssetScene({
  kind,
  compact = false,
  presentation = 'Floating',
  interaction = 'Pointer',
  motion = 'live',
  pointerEnabled = true,
  quality = 'crisp',
  tuning = defaultAssetSceneTuning,
}: {
  kind: AssetSceneKind
  compact?: boolean
  presentation?: AssetPresentation
  interaction?: AssetInteraction
  motion?: AssetPreviewMotion
  pointerEnabled?: boolean
  quality?: AssetPreviewQuality
  tuning?: AssetSceneTuning
}) {
  const Scene = sceneRegistry[kind]
  const reducedMotion = useReducedMotion()
  const paused = reducedMotion || motion === 'paused'
  const pointerActive = !paused && pointerEnabled && interaction === 'Pointer'
  const dpr: [number, number] = compact
    ? [1, 1.2]
    : quality === 'efficient'
      ? [1, 1]
      : quality === 'balanced'
        ? [1, 1.5]
        : [1, 2]

  const content = presentation === 'Floating' ? (
    <Rig enabled={pointerActive} strength={tuning.pointerStrength}>
      <Float
        speed={paused ? 0 : compact ? 0.5 : tuning.floatSpeed}
        rotationIntensity={paused ? 0 : 0.065}
        floatIntensity={paused ? 0 : compact ? 0.08 : tuning.floatIntensity}
      >
        <Scene />
      </Float>
    </Rig>
  ) : presentation === 'Grounded' ? (
    <Rig enabled={pointerActive} strength={tuning.pointerStrength}><Scene /></Rig>
  ) : <Scene />

  return (
    <Canvas
      className="asset-canvas"
      dpr={dpr}
      gl={{ antialias: !compact, alpha: true, powerPreference: 'high-performance', stencil: false }}
      camera={{ position: [0, 0, compact ? 5.8 : 4.8], fov: compact ? 38 : 34, near: 0.05, far: 120 }}
      frameloop={paused ? 'demand' : 'always'}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = compact ? 1.02 : tuning.exposure
        gl.outputColorSpace = THREE.SRGBColorSpace
      }}
    >
      <Suspense fallback={null}>
        {!compact && <CameraTuner fov={tuning.cameraFov} zoom={tuning.cameraZoom} />}
        {!compact && <RendererTuner exposure={tuning.exposure} />}
        <Studio compact={compact} quality={quality} />
        <FramedScene compact={compact}>
          <group rotation-y={THREE.MathUtils.degToRad(tuning.rotationY)}>{content}</group>
        </FramedScene>
        {!compact && presentation !== 'Floating' && (
          <ContactShadows position={[0, -1.48, 0]} opacity={0.22} scale={8} blur={2.8} far={3.2} resolution={512} />
        )}
      </Suspense>
    </Canvas>
  )
}
