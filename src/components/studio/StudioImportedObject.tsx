import { useEffect, useMemo, useRef, useState } from 'react'
import { useAnimations } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import { clone as cloneSkeleton } from 'three/addons/utils/SkeletonUtils.js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { loadStudioFile } from '../../lib/studioStorage'
import {
  createBoundsHelper,
  createSkeletonHelper,
  disposeStudioModel,
  inspectStudioModel,
  prepareStudioModel,
  type StudioModelInspection,
} from '../../lib/studioModelTools'
import { resolveStudioRig, type StudioNode } from '../../lib/studioProject'
import { applyStudioRigPose, captureStudioRigPose, inspectStudioRig } from '../../lib/studioRigRuntime'
import type { StudioRigInspection } from '../../lib/studioRigState'
import { loadStudioTextureResources, type StudioLoadedTextureResources } from '../../lib/studioTextureResources'
import { configureStudioGltfLoader } from '../../lib/studioCodecRuntime'
import { dispatchStudioRigCaptureResult, onStudioRigCaptureRequest } from './studioRigEvents'

export function StudioImportedObject({ node, onInspection }: { node: StudioNode; onInspection: (report: StudioModelInspection) => void }) {
  const [url, setUrl] = useState<string | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    let objectUrl = ''
    if (!node.fileId) return
    loadStudioFile(node.fileId).then((record) => {
      if (!active || !record || record.kind !== 'glb') {
        if (active) setError(true)
        return
      }
      objectUrl = URL.createObjectURL(new Blob([record.bytes], { type: record.type }))
      setUrl(objectUrl)
    }).catch(() => active && setError(true))
    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [node.fileId])

  if (error) {
    return <mesh><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="#ff6b55" wireframe /></mesh>
  }
  return url ? <LoadedGlb url={url} node={node} onInspection={onInspection} /> : null
}

function LoadedGlb({ url, node, onInspection }: { url: string; node: StudioNode; onInspection: (report: StudioModelInspection) => void }) {
  const renderer = useThree((state) => state.gl)
  const gltf = useLoader(GLTFLoader, url, (loader) => configureStudioGltfLoader(loader, renderer))
  const root = useRef<THREE.Group>(null)
  const scene = useMemo(() => cloneSkeleton(gltf.scene), [gltf.scene])
  const [textureBundle, setTextureBundle] = useState<StudioLoadedTextureResources | null>(null)
  const textureSignature = useMemo(() => JSON.stringify(Object.values(node.materialOverrides).map((override) => override.textures ?? null)), [node.materialOverrides])

  useEffect(() => {
    let active = true
    let resolved: StudioLoadedTextureResources | null = null
    setTextureBundle(null)
    void loadStudioTextureResources(node.materialOverrides).then((bundle) => {
      resolved = bundle
      if (active) setTextureBundle(bundle)
      else bundle.dispose()
    })
    return () => {
      active = false
      resolved?.dispose()
    }
  }, [textureSignature])

  const inspection = useMemo(() => {
    prepareStudioModel(scene, node.materialOverrides, node.wireframe, textureBundle?.textures)
    const report = inspectStudioModel(scene, gltf.animations)
    if (textureBundle?.missing.length) report.warnings.push(`${textureBundle.missing.length} local texture replacement${textureBundle.missing.length === 1 ? '' : 's'} could not be restored.`)
    return report
  }, [gltf.animations, node.materialOverrides, node.wireframe, scene, textureBundle])
  const rigInspection = useMemo(() => inspectStudioRig(scene), [scene])
  const rig = useMemo(() => resolveStudioRig(node.rig), [node.rig])
  const activePose = useMemo(() => rig.activePoseId ? rig.poses.find((pose) => pose.id === rig.activePoseId) : undefined, [rig])
  const boundsHelper = useMemo(() => node.debug.bounds ? createBoundsHelper(scene) : null, [node.debug.bounds, scene])
  const skeletonHelper = useMemo(() => node.debug.skeleton ? createSkeletonHelper(scene) : null, [node.debug.skeleton, scene])
  const { actions, mixer } = useAnimations(gltf.animations, root)

  useEffect(() => onInspection({ ...inspection, rig: rigInspection } as StudioModelInspection & { rig: StudioRigInspection }), [inspection, onInspection, rigInspection])

  useEffect(() => {
    applyStudioRigPose(scene, activePose ?? rigInspection.restPose)
  }, [activePose, rigInspection, scene])

  useEffect(() => onStudioRigCaptureRequest((request) => {
    if (request.nodeId !== node.id) return
    dispatchStudioRigCaptureResult({ nodeId: node.id, requestId: request.requestId, pose: captureStudioRigPose(scene, request.name) })
  }), [node.id, scene])

  useEffect(() => {
    mixer.stopAllAction()
    if (!node.animation.clip || activePose) return
    const action = actions[node.animation.clip]
    if (!action) return
    action.enabled = true
    action.reset()
    action.clampWhenFinished = !node.animation.loop
    action.setLoop(node.animation.loop ? THREE.LoopRepeat : THREE.LoopOnce, node.animation.loop ? Infinity : 1)
    action.setEffectiveTimeScale(node.animation.speed)
    action.play()
    action.paused = !node.animation.playing
    return () => { action.stop() }
  }, [actions, activePose, mixer, node.animation.clip, node.animation.loop, node.animation.playing, node.animation.speed])

  useEffect(() => () => mixer.stopAllAction(), [mixer])

  useEffect(() => () => {
    disposeStudioModel(scene)
  }, [scene])

  useEffect(() => () => {
    if (boundsHelper) {
      boundsHelper.geometry.dispose()
      if (Array.isArray(boundsHelper.material)) boundsHelper.material.forEach((material) => material.dispose())
      else boundsHelper.material.dispose()
    }
    if (skeletonHelper) {
      skeletonHelper.geometry.dispose()
      if (Array.isArray(skeletonHelper.material)) skeletonHelper.material.forEach((material) => material.dispose())
      else skeletonHelper.material.dispose()
    }
  }, [boundsHelper, skeletonHelper])

  return (
    <group ref={root}>
      <primitive object={scene} />
      {node.debug.axes ? <axesHelper args={[Math.max(...inspection.bounds.size, 1) * 0.35]} /> : null}
      {boundsHelper ? <primitive object={boundsHelper} /> : null}
      {skeletonHelper ? <primitive object={skeletonHelper} /> : null}
    </group>
  )
}
