import { Suspense, useEffect, useMemo, useRef, type ReactNode } from 'react'
import { Grid, OrbitControls, TransformControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { assets } from '../../data/assets'
import { sceneRegistry } from '../sceneRegistry'
import { AssetCustomizationLayer } from '../AssetCustomizationLayer'
import type { StudioModelInspection } from '../../lib/studioModelTools'
import { resolveStudioTimeline, type StudioNode, type StudioProject, type StudioTransform, type StudioTransformMode } from '../../lib/studioProject'
import { evaluateStudioTransform } from '../../lib/studioTimeline'
import { StudioImportedObject } from './StudioImportedObject'

export interface StudioViewportMetrics {
  calls: number
  triangles: number
  geometries: number
  textures: number
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
  displayTransform,
  children,
  selected,
  primary,
  playing,
  mode,
  scene,
  onSelect,
  onTransform,
  onInspection,
}: {
  node: StudioNode
  displayTransform: StudioTransform
  children: ReactNode
  selected: boolean
  primary: boolean
  playing: boolean
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
      position={displayTransform.position}
      rotation={displayTransform.rotation}
      scale={displayTransform.scale}
      visible={node.visible}
      onClick={(event) => {
        event.stopPropagation()
        onSelect(node.id)
      }}
    >
      {node.kind === 'archive' && node.assetSlug ? <ArchiveObject node={node} /> : null}
      {node.kind === 'imported' && node.fileId ? <StudioImportedObject node={node} onInspection={(report) => onInspection(node.id, report)} /> : null}
      {selected && !node.debug.bounds ? <axesHelper args={[0.42]} /> : null}
      {children}
    </group>
  )

  if (!primary || node.locked || playing) return content
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
  timelineTime,
  timelinePlaying,
  onSelect,
  onTransform,
  onInspection,
}: {
  project: StudioProject
  selectedIds: string[]
  primarySelectedId: string | null
  mode: StudioTransformMode
  timelineTime: number
  timelinePlaying: boolean
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
      displayTransform={evaluateStudioTransform(resolveStudioTimeline(node.timeline), node.transform, timelineTime)}
      selected={selected.has(node.id)}
      primary={node.id === primarySelectedId}
      playing={timelinePlaying}
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
  timelineTime,
  timelinePlaying,
  onSelect,
  onTransform,
  onMetrics,
  onInspection,
}: {
  project: StudioProject
  selectedIds: string[]
  primarySelectedId: string | null
  mode: StudioTransformMode
  timelineTime: number
  timelinePlaying: boolean
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
            timelineTime={timelineTime}
            timelinePlaying={timelinePlaying}
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
