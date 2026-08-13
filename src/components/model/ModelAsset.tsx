import { useAnimations, useGLTF } from '@react-three/drei'
import type { ThreeElements } from '@react-three/fiber'
import { clone } from 'three/addons/utils/SkeletonUtils.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from '../../lib/useReducedMotion'

export interface ModelAssetUrls {
  desktop: string
  tablet: string
  mobile: string
}

export type ModelTier = keyof ModelAssetUrls

export interface ModelAssetProps extends Omit<ThreeElements['group'], 'children'> {
  urls: ModelAssetUrls
  tier: ModelTier
  clip?: string
  clipAliases?: Record<string, string[]>
  loopByClip?: Record<string, boolean>
  oneShotFallbackClip?: string
  animationFadeSeconds?: number
  castShadow?: boolean
  receiveShadow?: boolean
}

export function modelTierForWidth(width: number): ModelTier {
  if (width <= 720) return 'mobile'
  if (width <= 1100) return 'tablet'
  return 'desktop'
}

export function useResponsiveModelTier(): ModelTier {
  const [tier, setTier] = useState<ModelTier>(() => (
    typeof window === 'undefined' ? 'desktop' : modelTierForWidth(window.innerWidth)
  ))

  useEffect(() => {
    const sync = () => setTier(modelTierForWidth(window.innerWidth))
    sync()
    window.addEventListener('resize', sync, { passive: true })
    return () => window.removeEventListener('resize', sync)
  }, [])

  return tier
}

function normalizedClipName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '')
}

function resolveAction(
  actions: Record<string, THREE.AnimationAction | null>,
  requested: string,
  aliases: Record<string, string[]> | undefined,
) {
  const candidates = [requested, ...(aliases?.[requested] ?? [])].map(normalizedClipName)
  for (const [name, action] of Object.entries(actions)) {
    if (action && candidates.includes(normalizedClipName(name))) return { name, action }
  }
  return null
}

export function ModelAsset({
  urls,
  tier,
  clip,
  clipAliases,
  loopByClip,
  oneShotFallbackClip,
  animationFadeSeconds = 0.24,
  castShadow = true,
  receiveShadow = true,
  ...groupProps
}: ModelAssetProps) {
  const url = urls[tier]
  const gltf = useGLTF(url)
  const scene = useMemo(() => clone(gltf.scene), [gltf.scene])
  const root = useRef<THREE.Group>(null)
  const currentAction = useRef<THREE.AnimationAction | null>(null)
  const reducedMotion = useReducedMotion()
  const { actions, mixer } = useAnimations(gltf.animations, root)

  useEffect(() => {
    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return
      object.castShadow = castShadow
      object.receiveShadow = receiveShadow
      object.frustumCulled = true
    })
  }, [scene, castShadow, receiveShadow])

  useEffect(() => {
    if (!clip) {
      currentAction.current = null
      mixer.stopAllAction()
      return
    }

    const resolved = resolveAction(actions, clip, clipAliases)
    if (!resolved) {
      currentAction.current?.fadeOut(animationFadeSeconds)
      currentAction.current = null
      mixer.stopAllAction()
      return
    }

    const { action: next } = resolved
    const shouldLoop = loopByClip?.[clip] ?? true
    const previous = currentAction.current

    next.enabled = true
    next.clampWhenFinished = !shouldLoop
    next.setLoop(shouldLoop ? THREE.LoopRepeat : THREE.LoopOnce, shouldLoop ? Infinity : 1)
    next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).play()

    if (reducedMotion) {
      mixer.stopAllAction()
      next.reset().play()
      next.paused = true
      mixer.update(0)
      currentAction.current = next
      return
    }

    next.paused = false
    if (previous && previous !== next) next.crossFadeFrom(previous, animationFadeSeconds, true)
    else if (previous !== next) next.fadeIn(animationFadeSeconds)
    currentAction.current = next

    if (shouldLoop || !oneShotFallbackClip || normalizedClipName(oneShotFallbackClip) === normalizedClipName(clip)) return

    const onFinished = (event: { action: THREE.AnimationAction }) => {
      if (event.action !== next) return
      const fallback = resolveAction(actions, oneShotFallbackClip, clipAliases)
      if (!fallback || fallback.action === next) return
      const fallbackLoop = loopByClip?.[oneShotFallbackClip] ?? true
      fallback.action.enabled = true
      fallback.action.clampWhenFinished = !fallbackLoop
      fallback.action.setLoop(fallbackLoop ? THREE.LoopRepeat : THREE.LoopOnce, fallbackLoop ? Infinity : 1)
      fallback.action.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).play()
      fallback.action.crossFadeFrom(next, animationFadeSeconds, true)
      currentAction.current = fallback.action
    }
    mixer.addEventListener('finished', onFinished)
    return () => mixer.removeEventListener('finished', onFinished)
  }, [actions, animationFadeSeconds, clip, clipAliases, loopByClip, mixer, oneShotFallbackClip, reducedMotion])

  useEffect(() => () => mixer.stopAllAction(), [mixer])

  return (
    <group ref={root} {...groupProps}>
      <primitive object={scene} />
    </group>
  )
}
