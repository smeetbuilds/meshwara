import { Environment, Lightformer } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useLayoutEffect } from 'react'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { ModelAsset, type ModelAssetUrls, type ModelTier, useResponsiveModelTier } from './ModelAsset'

export interface ModelDisplayPreset {
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  cameraPosition?: [number, number, number]
  cameraTarget?: [number, number, number]
}

export interface ModelStageProps extends ModelDisplayPreset {
  urls: ModelAssetUrls
  clip?: string
  clipAliases?: Record<string, string[]>
  loopByClip?: Record<string, boolean>
  oneShotFallbackClip?: string
  animationFadeSeconds?: number
  compact?: boolean
  displayByTier?: Partial<Record<ModelTier, ModelDisplayPreset>>
}

function CameraFraming({ position, target }: { position: [number, number, number]; target: [number, number, number] }) {
  const { camera } = useThree()

  useLayoutEffect(() => {
    camera.position.set(...position)
    camera.lookAt(...target)
    camera.updateProjectionMatrix()
  }, [camera, position, target])

  return null
}

function CharacterStudio({ compact }: { compact: boolean }) {
  return (
    <>
      <ambientLight intensity={0.42} />
      <directionalLight
        castShadow
        position={[3.5, 6.5, 4.5]}
        intensity={2.7}
        shadow-mapSize-width={compact ? 512 : 1024}
        shadow-mapSize-height={compact ? 512 : 1024}
        shadow-camera-near={0.1}
        shadow-camera-far={16}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={5}
        shadow-camera-bottom={-1}
      />
      <directionalLight position={[-4, 2.5, 1]} intensity={1.1} />
      <Environment resolution={compact ? 64 : 128}>
        <Lightformer intensity={3.4} position={[0, 5, -4]} scale={[6, 1.2, 1]} />
        <Lightformer intensity={2.2} position={[-4, 2, 2]} rotation-y={Math.PI / 2} scale={[4, 1.2, 1]} />
        <Lightformer intensity={1.5} position={[4, 1, 1]} rotation-y={-Math.PI / 2} scale={[3, 1, 1]} />
      </Environment>
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.001, 0]}>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial transparent opacity={compact ? 0.12 : 0.16} />
      </mesh>
    </>
  )
}

export function ModelStage({
  urls,
  clip,
  clipAliases,
  loopByClip,
  oneShotFallbackClip,
  animationFadeSeconds = 0.24,
  compact = false,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  cameraPosition,
  cameraTarget,
  displayByTier,
}: ModelStageProps) {
  const reducedMotion = useReducedMotion()
  const tier = useResponsiveModelTier()
  const responsiveDisplay = displayByTier?.[tier]
  const resolvedScale = responsiveDisplay?.scale ?? scale
  const resolvedPosition = responsiveDisplay?.position ?? position
  const resolvedRotation = responsiveDisplay?.rotation ?? rotation
  const resolvedCameraPosition: [number, number, number] = responsiveDisplay?.cameraPosition ?? cameraPosition ?? [0, compact ? 1.15 : 1.25, compact ? 4.8 : 4.2]
  const resolvedCameraTarget: [number, number, number] = responsiveDisplay?.cameraTarget ?? cameraTarget ?? [0, compact ? 0.9 : 1, 0]

  return (
    <Canvas
      className="asset-canvas"
      shadows
      dpr={[1, compact ? 1.35 : 1.7]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: resolvedCameraPosition, fov: compact ? 34 : 31 }}
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <Suspense fallback={null}>
        <CameraFraming position={resolvedCameraPosition} target={resolvedCameraTarget} />
        <CharacterStudio compact={compact} />
        <ModelAsset
          urls={urls}
          tier={tier}
          clip={clip}
          clipAliases={clipAliases}
          loopByClip={loopByClip}
          oneShotFallbackClip={oneShotFallbackClip}
          animationFadeSeconds={animationFadeSeconds}
          scale={resolvedScale}
          position={resolvedPosition}
          rotation={resolvedRotation}
        />
      </Suspense>
    </Canvas>
  )
}
