import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Grid, OrbitControls, TransformControls } from '@react-three/drei'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { assets } from '../../data/assets'
import { sceneRegistry } from '../sceneRegistry'
import { loadStudioFile } from '../../lib/studioStorage'
import type { StudioNode, StudioProject, StudioTransform, StudioTransformMode } from '../../lib/studioProject'

export interface StudioViewportMetrics {
  calls: number
  triangles: number
  geometries: number
  textures: number
}

function cloneMaterial(material: THREE.Material, wireframe: boolean) {
  const cloned = material.clone()
  if ('wireframe' in cloned) (cloned as THREE.MeshStandardMaterial).wireframe = wireframe
  return cloned
}

function ImportedObject({ fileId, wireframe }: { fileId: string; wireframe: boolean }) {
  const [url, setUrl] = useState<string | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    let objectUrl = ''
    loadStudioFile(fileId).then((record) => {
      if (!active || !record) {
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
  }, [fileId])

  if (error) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff6b55" wireframe />
      </mesh>
    )
  }
  return url ? <LoadedGlb url={url} wireframe={wireframe} /> : null
}

function LoadedGlb({ url, wireframe }: { url: string; wireframe: boolean }) {
  const gltf = useLoader(GLTFLoader, url)
  const scene = useMemo(() => {
    const cloned = gltf.scene.clone(true)
    cloned.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return
      object.castShadow = true
      object.receiveShadow = true
      if (Array.isArray(object.material)) object.material = object.material.map((material) => cloneMaterial(material, wireframe))
      else if (object.material) object.material = cloneMaterial(object.material, wireframe)
    })
    return cloned
  }, [gltf.scene, wireframe])
  return <primitive object={scene} />
}

function ArchiveObject({ assetSlug }: { assetSlug: string }) {
  const asset = assets.find((item) => item.slug === assetSlug)
  if (!asset) return null
  const Scene = sceneRegistry[asset.scene]
  return <Scene />
}

function StudioObject({
  node,
  selected,
  mode,
  snap,
  translateSnap,
  rotateSnap,
  scaleSnap,
  onSelect,
  onTransform,
}: {
  node: StudioNode
  selected: boolean
  mode: StudioTransformMode
  snap: boolean
  translateSnap: number
  rotateSnap: number
  scaleSnap: number
  onSelect: (id: string) => void
  onTransform: (id: string, transform: StudioTransform) => void
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
      {node.kind === 'archive' && node.assetSlug ? <ArchiveObject assetSlug={node.assetSlug} /> : null}
      {node.kind === 'imported' && node.fileId ? <ImportedObject fileId={node.fileId} wireframe={node.wireframe} /> : null}
    </group>
  )

  if (!selected || node.locked) return content

  return (
    <TransformControls
      mode={mode}
      translationSnap={snap ? translateSnap : undefined}
      rotationSnap={snap ? THREE.MathUtils.degToRad(rotateSnap) : undefined}
      scaleSnap={snap ? scaleSnap : undefined}
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

export function StudioViewport({
  project,
  selectedId,
  mode,
  onSelect,
  onTransform,
  onMetrics,
}: {
  project: StudioProject
  selectedId: string | null
  mode: StudioTransformMode
  onSelect: (id: string | null) => void
  onTransform: (id: string, transform: StudioTransform) => void
  onMetrics: (metrics: StudioViewportMetrics) => void
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
          <Grid
            infiniteGrid
            fadeDistance={40}
            fadeStrength={5}
            cellSize={0.5}
            sectionSize={5}
            cellThickness={0.45}
            sectionThickness={0.8}
          />
        ) : null}
        <Suspense fallback={null}>
          {project.nodes.map((node) => (
            <StudioObject
              key={node.id}
              node={node}
              selected={node.id === selectedId}
              mode={mode}
              snap={project.scene.snap}
              translateSnap={project.scene.translateSnap}
              rotateSnap={project.scene.rotateSnap}
              scaleSnap={project.scene.scaleSnap}
              onSelect={onSelect}
              onTransform={onTransform}
            />
          ))}
        </Suspense>
        <OrbitControls makeDefault enableDamping dampingFactor={0.08} />
        <RendererMetrics onChange={onMetrics} />
      </Canvas>
      {!project.nodes.length ? (
        <div className="studio-empty-viewport">
          <strong>EMPTY SCENE</strong>
          <span>Add a Meshvara asset or import a local GLB to begin.</span>
        </div>
      ) : null}
    </div>
  )
}
