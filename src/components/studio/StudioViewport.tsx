import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Grid, OrbitControls, TransformControls, useAnimations } from '@react-three/drei'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { clone as cloneSkeleton } from 'three/addons/utils/SkeletonUtils.js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { assets } from '../../data/assets'
import { sceneRegistry } from '../sceneRegistry'
import { AssetCustomizationLayer } from '../AssetCustomizationLayer'
import { loadStudioFile } from '../../lib/studioStorage'
import {
  createBoundsHelper,
  createSkeletonHelper,
  disposeStudioModel,
  inspectStudioModel,
  prepareStudioModel,
  type StudioModelInspection,
} from '../../lib/studioModelTools'
import type { StudioNode, StudioProject, StudioTransform, StudioTransformMode } from '../../lib/studioProject'
import { loadStudioTextureResources, type StudioLoadedTextureResources } from '../../lib/studioTextureResources'
import { configureStudioGltfLoader } from '../../lib/studioCodecRuntime'

export interface StudioViewportMetrics {
  calls: number
  triangles: number
  geometries: number
  textures: number
}

function ImportedObject({ node, onInspection }: { node: StudioNode; onInspection: (report: StudioModelInspection) => void }) {
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
  const boundsHelper = useMemo(() => node.debug.bounds ? createBoundsHelper(scene) : null, [node.debug.bounds, scene])
  const skeletonHelper = useMemo(() => node.debug.skeleton ? createSkeletonHelper(scene) : null, [node.debug.skeleton, scene])
  const { actions, mixer } = useAnimations(gltf.animations, root)

  useEffect(() => onInspection(inspection), [inspection, onInspection])

  useEffect(() => {
    mixer.stopAllAction()
    if (!node.animation.clip) return
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
  }, [actions, mixer, node.animation.clip, node.animation.loop, node.animation.playing, node.animation.speed])

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

function ArchiveObject({ node }: { node: StudioNode }) {
  const asset = assets.find((item) => item.slug === node.assetSlug)
  if (!asset) return null
  const Scene = sceneRegistry[asset.scene]
  return (
    <AssetCustomizationLayer scene={asset.scene} customization={node.customization}>
      <Scene />
    </AssetCustomizationLayer>
  )
}

function StudioObject({
  node,
  children,
  selected,
  primary,
  mode,
  scene,
  onSelect,
  onTransform,
  onInspection,
}: {
  node: StudioNode
  children: ReactNode
  selected: boolean
  primary: boolean
  mode: StudioTransformMode
  scene: StudioProject['scene']
  onSelect: (id: string) => void
  onTransform: (id: string, transform: StudioTransform) => void
  onInspection: (id: string, report: StudioModelInspection) => void
}) {
  const group = useRef<THREE.Group>(null)
  const content = (
    <group
      ref={group}
      position={node.transform.position}
      rotation={node.transform.rotation}
      scale={node.transform.scale}
      visible={node.visible}
      onClick={(event) => {
        event.stopPropagation()
        onSelect(node.id)
      }}
    >
      {node.kind === 'archive' && node.assetSlug ? <ArchiveObject node={node} /> : null}
      {node.kind === 'imported' && node.fileId ? <ImportedObject node={node} onInspection={(report) => onInspection(node.id, report)} /> : null}
      {selected && !node.debug.bounds ? <axesHelper args={[0.42]} /> : null}
      {children}
    </group>
  )

  if (!primary || node.locked) return content
  return (
    <TransformControls
      mode={mode}
      translationSnap={scene.snap ? scene.translateSnap : undefined}
      rotationSnap={scene.snap ? THREE.MathUtils.degToRad(scene.rotateSnap) : undefined}
      scaleSnap={scene.snap ? scene.scaleSnap : undefined}
      onMouseUp={() => {
        const object = group.current
        if (!object) return
        onTransform(node.id, {
          position: object.position.toArray() as [number, number, number],
          rotation: [object.rotation.x, object.rotation.y, object.rotation.z],
          scale: object.scale.toArray() as [number, number, number],
        })
      }}
    >
      {content}
    </TransformControls>
  )
}

function RendererSettings({ exposure }: { exposure: number }) {
  const gl = useThree((state) => state.gl)
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = exposure
    gl.outputColorSpace = THREE.SRGBColorSpace
  }, [exposure, gl])
  return null
}

function RendererMetrics({ onChange }: { onChange: (metrics: StudioViewportMetrics) => void }) {
  const elapsed = useRef(0)
  useFrame((state, delta) => {
    elapsed.current += delta
    if (elapsed.current < 0.5) return
    elapsed.current = 0
    onChange({
      calls: state.gl.info.render.calls,
      triangles: state.gl.info.render.triangles,
      geometries: state.gl.info.memory.geometries,
      textures: state.gl.info.memory.textures,
    })
  })
  return null
}

function SceneNodes({
  project,
  selectedIds,
  primarySelectedId,
  mode,
  onSelect,
  onTransform,
  onInspection,
}: {
  project: StudioProject
  selectedIds: string[]
  primarySelectedId: string | null
  mode: StudioTransformMode
  onSelect: (id: string) => void
  onTransform: (id: string, transform: StudioTransform) => void
  onInspection: (id: string, report: StudioModelInspection) => void
}) {
  const selected = useMemo(() => new Set(selectedIds), [selectedIds])
  const children = useMemo(() => {
    const map = new Map<string | undefined, StudioNode[]>()
    const ids = new Set(project.nodes.map((node) => node.id))
    for (const node of project.nodes) {
      const parent = node.parentId && ids.has(node.parentId) ? node.parentId : undefined
      const bucket = map.get(parent) ?? []
      bucket.push(node)
      map.set(parent, bucket)
    }
    return map
  }, [project.nodes])

  const renderNode = (node: StudioNode): ReactNode => (
    <StudioObject
      key={node.id}
      node={node}
      selected={selected.has(node.id)}
      primary={node.id === primarySelectedId}
      mode={mode}
      scene={project.scene}
      onSelect={onSelect}
      onTransform={onTransform}
      onInspection={onInspection}
    >
      {(children.get(node.id) ?? []).map(renderNode)}
    </StudioObject>
  )

  return <>{(children.get(undefined) ?? []).map(renderNode)}</>
}

export function StudioViewport({
  project,
  selectedIds,
  primarySelectedId,
  mode,
  onSelect,
  onTransform,
  onMetrics,
  onInspection,
}: {
  project: StudioProject
  selectedIds: string[]
  primarySelectedId: string | null
  mode: StudioTransformMode
  onSelect: (id: string | null) => void
  onTransform: (id: string, transform: StudioTransform) => void
  onMetrics: (metrics: StudioViewportMetrics) => void
  onInspection: (id: string, report: StudioModelInspection) => void
}) {
  return (
    <div className="studio-viewport" style={{ background: project.scene.background }}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [5, 4, 7], fov: 42, near: 0.05, far: 2000 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onPointerMissed={() => onSelect(null)}
      >
        <RendererSettings exposure={project.scene.exposure} />
        <color attach="background" args={[project.scene.background]} />
        <ambientLight intensity={0.9} />
        <directionalLight castShadow position={[5, 8, 5]} intensity={2.8} shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-5, 3, -4]} intensity={1.1} />
        <pointLight position={[0, 5, -2]} intensity={0.8} />
        {project.scene.grid ? (
          <Grid infiniteGrid fadeDistance={40} fadeStrength={5} cellSize={0.5} sectionSize={5} cellThickness={0.45} sectionThickness={0.8} />
        ) : null}
        <Suspense fallback={null}>
          <SceneNodes
            project={project}
            selectedIds={selectedIds}
            primarySelectedId={primarySelectedId}
            mode={mode}
            onSelect={(id) => onSelect(id)}
            onTransform={onTransform}
            onInspection={onInspection}
          />
        </Suspense>
        <OrbitControls makeDefault enableDamping dampingFactor={0.08} />
        <RendererMetrics onChange={onMetrics} />
      </Canvas>
      {!project.nodes.length ? (
        <div className="studio-empty-viewport"><strong>EMPTY SCENE</strong><span>Add a Meshvara asset or import a local GLB to begin.</span></div>
      ) : null}
    </div>
  )
}
