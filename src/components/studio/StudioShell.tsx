import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { assets } from '../../data/assets'
import {
  appendStudioNode,
  collectStudioFileIds,
  commitStudioHistory,
  createArchiveStudioNode,
  createImportedStudioNode,
  createStudioHistory,
  createStudioProject,
  duplicateStudioNodes,
  redoStudioHistory,
  removeStudioNodes,
  renameStudioProject,
  setStudioParentPreserveWorld,
  undoStudioHistory,
  updateStudioNode,
  updateStudioNodes,
  updateStudioScene,
  updateStudioTransform,
  updateStudioGroupTransform,
  type StudioMaterialOverride,
  type StudioProject,
  type StudioTransform,
  type StudioTransformMode,
  type StudioTextureChannel,
} from '../../lib/studioProject'
import {
  createPortableStudioProject,
  deleteStudioProject,
  deleteStudioFile,
  garbageCollectStudioFiles,
  listStudioProjects,
  loadStudioFile,
  loadStudioProject,
  restorePortableStudioProject,
  saveStudioProject,
  storeStudioFile,
  storeStudioTexture,
  type StudioProjectSummary,
} from '../../lib/studioStorage'
import { generateStudioConfigModule, generateStudioR3FScaffold } from '../../lib/studioExport'
import { exportStudioGlb, type StudioGlbExportProfile } from '../../lib/studioModelExport'
import { createStudioComponentPack } from '../../lib/studioComponentPack'
import type { StudioModelInspection } from '../../lib/studioModelTools'
import { StudioViewport, type StudioViewportMetrics } from './StudioViewport'
import { StudioOutliner } from './StudioOutliner'
import { StudioLibrary } from './StudioLibrary'
import { StudioInspector } from './StudioInspector'
import '../../styles/studio.css'
import '../../styles/studio-model-editor.css'

function downloadText(filename: string, content: string, type = 'text/plain') {
  downloadBlob(filename, new Blob([content], { type }))
}

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text)
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  const copied = document.execCommand('copy')
  textarea.remove()
  if (!copied) throw new Error('Clipboard unavailable')
}

function safeFilename(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'meshvara-scene'
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function isEditableTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.matches('input, textarea, select') || target.isContentEditable)
}

export function StudioShell({ initialAssetSlug }: { initialAssetSlug?: string }) {
  const [history, setHistory] = useState(() => createStudioHistory(createStudioProject()))
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [mode, setMode] = useState<StudioTransformMode>('translate')
  const [projects, setProjects] = useState<StudioProjectSummary[]>([])
  const [status, setStatus] = useState('LOCAL-FIRST · INITIALIZING')
  const [metrics, setMetrics] = useState<StudioViewportMetrics>({ calls: 0, triangles: 0, geometries: 0, textures: 0 })
  const [inspections, setInspections] = useState<Record<string, StudioModelInspection>>({})
  const booted = useRef(false)
  const project = history.present
  const projectRef = useRef(project)
  projectRef.current = project
  const selectedId = selectedIds.at(-1) ?? null
  const selectedNode = useMemo(() => project.nodes.find((node) => node.id === selectedId) ?? null, [project.nodes, selectedId])
  const selectedInspection = selectedId ? inspections[selectedId] : undefined

  const refreshProjects = useCallback(async () => setProjects(await listStudioProjects()), [])

  const commit = useCallback((next: StudioProject, nextSelectedIds?: string[]) => {
    setHistory((current) => commitStudioHistory(current, next))
    if (nextSelectedIds) setSelectedIds(nextSelectedIds)
  }, [])

  useEffect(() => {
    if (booted.current) return
    booted.current = true
    void (async () => {
      const recent = await listStudioProjects()
      const deepLinkedAsset = initialAssetSlug ? assets.find((item) => item.slug === initialAssetSlug) : undefined
      let active = deepLinkedAsset ? createStudioProject(`${deepLinkedAsset.name} Study`) : recent[0] ? await loadStudioProject(recent[0].id) : null
      active ??= createStudioProject()
      if (deepLinkedAsset) {
        const node = createArchiveStudioNode({ slug: deepLinkedAsset.slug, name: deepLinkedAsset.name })
        active = appendStudioNode(active, node)
        setSelectedIds([node.id])
      }
      setHistory(createStudioHistory(active))
      await saveStudioProject(active)
      await refreshProjects()
      setStatus('LOCAL PROJECT READY · AUTOSAVE ON')
    })()
  }, [initialAssetSlug, refreshProjects])

  useEffect(() => {
    if (!booted.current) return
    const timer = window.setTimeout(() => {
      void saveStudioProject(project).then(() => refreshProjects()).catch(() => setStatus('LOCAL AUTOSAVE DEGRADED · SESSION STILL ACTIVE'))
    }, 350)
    return () => window.clearTimeout(timer)
  }, [project, refreshProjects])

  useEffect(() => {
    setSelectedIds((current) => {
      const next = current.filter((id) => project.nodes.some((node) => node.id === id))
      return next.length === current.length && next.every((id, index) => id === current[index]) ? current : next
    })
  }, [project.nodes])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return
      const command = event.metaKey || event.ctrlKey
      if (command && event.key.toLowerCase() === 'z') {
        event.preventDefault()
        setHistory((current) => event.shiftKey ? redoStudioHistory(current) : undoStudioHistory(current))
        return
      }
      if (command && event.key.toLowerCase() === 'y') {
        event.preventDefault()
        setHistory((current) => redoStudioHistory(current))
        return
      }
      if (command && event.key.toLowerCase() === 'd' && selectedIds.length) {
        event.preventDefault()
        const result = duplicateStudioNodes(project, selectedIds)
        commit(result.project, result.nodeIds)
        setStatus(`${result.nodeIds.length} OBJECT${result.nodeIds.length === 1 ? '' : 'S'} DUPLICATED`)
        return
      }
      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedIds.length) {
        event.preventDefault()
        commit(removeStudioNodes(project, selectedIds), [])
        setStatus(`${selectedIds.length} OBJECT${selectedIds.length === 1 ? '' : 'S'} REMOVED · UNDO AVAILABLE`)
        return
      }
      if (event.key === 'Escape') setSelectedIds([])
      if (event.key === '1') setMode('translate')
      if (event.key === '2') setMode('rotate')
      if (event.key === '3') setMode('scale')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [commit, project, selectedIds])

  const selectNode = (id: string, additive: boolean) => {
    setSelectedIds((current) => {
      if (!additive) return [id]
      return current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    })
  }

  const addArchiveAsset = (slug: string) => {
    const asset = assets.find((item) => item.slug === slug)
    if (!asset) return
    const node = createArchiveStudioNode({ slug: asset.slug, name: asset.name })
    const next = appendStudioNode(project, node)
    if (next === project) {
      setStatus('SCENE LIMIT REACHED · 250 OBJECTS MAX')
      return
    }
    commit(next, [node.id])
    setStatus(`${asset.name.toUpperCase()} ADDED FROM ARCHIVE`)
  }

  const importGlb = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.glb')) {
      setStatus('IMPORT REJECTED · STUDIO ACCEPTS BINARY .GLB ONLY')
      return
    }
    try {
      const record = await storeStudioFile(file)
      const node = createImportedStudioNode(record)
      const liveProject = projectRef.current
      const next = appendStudioNode(liveProject, node)
      if (next === liveProject) {
        await deleteStudioFile(record.id)
        setStatus('SCENE LIMIT REACHED · IMPORT DISCARDED WITHOUT LEAVING ORPHAN STORAGE')
        return
      }
      commit(next, [node.id])
      setStatus(`${file.name.toUpperCase()} VALIDATED + STORED LOCALLY · NO UPLOAD`)
    } catch (error) {
      setStatus(error instanceof Error ? `GLB REJECTED · ${error.message.toUpperCase()}` : 'GLB IMPORT FAILED')
    }
  }

  const newProject = async () => {
    const next = createStudioProject()
    await saveStudioProject(next)
    setHistory(createStudioHistory(next))
    setSelectedIds([])
    setInspections({})
    await refreshProjects()
    setStatus('NEW LOCAL SCENE CREATED')
  }

  const openProject = async (id: string) => {
    const next = await loadStudioProject(id)
    if (!next) {
      setStatus('PROJECT COULD NOT BE RESTORED')
      return
    }
    setHistory(createStudioHistory(next))
    setSelectedIds([])
    setInspections({})
    setStatus(`${next.name.toUpperCase()} OPENED`)
  }

  const removeProject = async (id: string) => {
    const target = await loadStudioProject(id)
    if (!target) return
    const protectedFiles = id === project.id
      ? []
      : new Set([...history.past, history.present, ...history.future].flatMap(collectStudioFileIds))
    await deleteStudioProject(target, protectedFiles)
    if (id === project.id) await newProject()
    else await refreshProjects()
    setStatus('LOCAL PROJECT DELETED · SHARED MODEL REFERENCES PRESERVED')
  }

  const cleanStorage = async () => {
    const protectedFiles = new Set([...history.past, history.present, ...history.future].flatMap(collectStudioFileIds))
    const result = await garbageCollectStudioFiles(protectedFiles)
    setStatus(`LOCAL STORAGE CLEAN · ${result.deletedFiles} ORPHAN FILE${result.deletedFiles === 1 ? '' : 'S'} REMOVED · ${formatBytes(result.reclaimedBytes)} RECLAIMED`)
  }

  const exportProject = async () => {
    try {
      const portable = await createPortableStudioProject(project)
      downloadText(`${safeFilename(project.name)}.meshvara-project`, JSON.stringify(portable, null, 2), 'application/json')
      setStatus('PORTABLE PROJECT EXPORTED · IMPORTED GLBS EMBEDDED')
    } catch (error) {
      setStatus(error instanceof Error ? error.message.toUpperCase() : 'PROJECT EXPORT FAILED')
    }
  }

  const importProject = async (file: File) => {
    try {
      const raw = JSON.parse(await file.text()) as unknown
      const restored = await restorePortableStudioProject(raw)
      setHistory(createStudioHistory(restored))
      setSelectedIds([])
      setInspections({})
      await refreshProjects()
      setStatus('PORTABLE PROJECT + GLB HEADERS VALIDATED · RESTORED LOCALLY')
    } catch (error) {
      setStatus(error instanceof Error ? `PROJECT REJECTED · ${error.message.toUpperCase()}` : 'PROJECT IMPORT FAILED')
    }
  }

  const exportSource = async (kind: 'config' | 'r3f', copy: boolean) => {
    const source = kind === 'config' ? generateStudioConfigModule(project) : generateStudioR3FScaffold(project)
    const label = kind === 'config' ? 'TYPED CONFIG' : 'R3F SCAFFOLD'
    if (copy) {
      try {
        await copyText(source)
        setStatus(`${label} COPIED`)
      } catch {
        setStatus('CLIPBOARD BLOCKED · USE DOWNLOAD')
      }
      return
    }
    const extension = kind === 'config' ? 'meshvara-scene.ts' : 'meshvara-scene.tsx'
    downloadText(`${safeFilename(project.name)}.${extension}`, source, 'text/typescript')
    setStatus(`${label} EXPORTED`)
  }

  const exportSelectedGlb = async (profile: StudioGlbExportProfile, componentPack = false) => {
    if (!selectedNode || selectedNode.kind !== 'imported' || !selectedNode.fileId) {
      setStatus('LOCAL DELIVERY REQUIRES ONE IMPORTED MODEL AS PRIMARY SELECTION')
      return
    }
    try {
      setStatus(`${componentPack ? 'R3F COMPONENT PACK' : 'WEB GLB EXPORT'} · PROCESSING LOCALLY`)
      const record = await loadStudioFile(selectedNode.fileId)
      if (!record || record.kind !== 'glb') throw new Error('Source GLB is missing from local storage.')
      const result = await exportStudioGlb(record, selectedNode, profile)
      const profileSuffix = profile === 'source' ? 'preserve' : profile === 'desktop' ? 'web-2k' : 'mobile-1k'
      if (componentPack) {
        const pack = createStudioComponentPack(selectedNode, result.inspection, result, profile)
        downloadBlob(pack.filename, new Blob([pack.bytes.buffer.slice(pack.bytes.byteOffset, pack.bytes.byteOffset + pack.bytes.byteLength) as ArrayBuffer], { type: 'application/zip' }))
        setStatus(`R3F COMPONENT ZIP EXPORTED · ${formatBytes(result.outputBytes)} GLB · ${profileSuffix.toUpperCase()} · NO ACCOUNT`)
        return
      }
      downloadBlob(`${safeFilename(selectedNode.name)}-${profileSuffix}.glb`, new Blob([result.bytes], { type: 'model/gltf-binary' }))
      const delta = result.savingsPercent >= 0 ? `${result.savingsPercent.toFixed(1)}% SMALLER` : `${Math.abs(result.savingsPercent).toFixed(1)}% LARGER`
      setStatus(`WEB GLB EXPORTED · ${formatBytes(result.sourceBytes)} → ${formatBytes(result.outputBytes)} · ${delta} · LOCAL ONLY`)
    } catch (error) {
      setStatus(error instanceof Error ? `LOCAL DELIVERY FAILED · ${error.message.toUpperCase()}` : 'LOCAL DELIVERY FAILED')
    }
  }

  const patchNode = (id: string, patch: Parameters<typeof updateStudioNode>[2]) => commit(updateStudioNode(project, id, patch))

  const commitPrimaryTransform = (id: string, patch: Partial<StudioTransform>) => {
    const node = project.nodes.find((item) => item.id === id)
    if (!node) return
    const nextTransform: StudioTransform = { ...node.transform, ...patch }
    if (selectedIds.length > 1 && selectedIds.includes(id)) {
      const result = updateStudioGroupTransform(project, selectedIds, id, nextTransform)
      if (!result.preserved) {
        setStatus(`GROUP TRANSFORM REJECTED · ${(result.reason ?? 'UNREPRESENTABLE TRS').toUpperCase()}`)
        return
      }
      commit(result.project)
      setStatus(`${selectedIds.length} OBJECT GROUP TRANSFORM COMMITTED`)
      return
    }
    commit(updateStudioTransform(project, id, nextTransform))
  }

  const reparentSelected = (parentId?: string) => {
    if (!selectedId) return
    const result = setStudioParentPreserveWorld(project, selectedId, parentId)
    if (!result.preserved) {
      setStatus(`REPARENT REJECTED · ${(result.reason ?? 'WORLD TRANSFORM COULD NOT BE PRESERVED').toUpperCase()}`)
      return
    }
    commit(result.project)
    setStatus('PARENT UPDATED · WORLD TRANSFORM PRESERVED')
  }

  const patchTextureReference = (slotId: string, channel: StudioTextureChannel, reference: string | null | undefined) => {
    if (!selectedNode) return
    const current = selectedNode.materialOverrides[slotId] ?? {}
    const textures = { ...(current.textures ?? {}) }
    if (reference === undefined) delete textures[channel]
    else textures[channel] = reference
    const next: StudioMaterialOverride = { ...current }
    if (Object.keys(textures).length) next.textures = textures
    else delete next.textures
    patchMaterial(slotId, next)
  }

  const importTexture = async (slotId: string, channel: StudioTextureChannel, file: File) => {
    if (!selectedNode || selectedNode.kind !== 'imported') return
    const nodeId = selectedNode.id
    try {
      const record = await storeStudioTexture(file)
      const liveProject = projectRef.current
      const live = liveProject.nodes.find((node) => node.id === nodeId)
      if (!live) {
        await deleteStudioFile(record.id)
        return
      }
      const current = live.materialOverrides[slotId] ?? {}
      const materialOverrides = { ...live.materialOverrides, [slotId]: { ...current, textures: { ...(current.textures ?? {}), [channel]: record.id } } }
      commit(updateStudioNode(liveProject, nodeId, { materialOverrides }))
      setStatus(`${channel.toUpperCase()} REPLACED · ${file.name.toUpperCase()} STORED LOCALLY`)
    } catch (error) {
      setStatus(error instanceof Error ? `TEXTURE REJECTED · ${error.message.toUpperCase()}` : 'TEXTURE IMPORT FAILED')
    }
  }

  const deleteSelected = () => {
    if (!selectedIds.length) return
    commit(removeStudioNodes(project, selectedIds), [])
    setStatus(`${selectedIds.length} OBJECT${selectedIds.length === 1 ? '' : 'S'} REMOVED · UNDO AVAILABLE`)
  }

  const duplicateSelected = () => {
    if (!selectedIds.length) return
    const result = duplicateStudioNodes(project, selectedIds)
    commit(result.project, result.nodeIds)
    setStatus(`${result.nodeIds.length} OBJECT${result.nodeIds.length === 1 ? '' : 'S'} DUPLICATED`)
  }

  const patchMaterial = (slotId: string, patch: StudioMaterialOverride) => {
    if (!selectedNode) return
    const materialOverrides = { ...selectedNode.materialOverrides }
    if (Object.keys(patch).length) materialOverrides[slotId] = patch
    else delete materialOverrides[slotId]
    patchNode(selectedNode.id, { materialOverrides })
  }

  const reportInspection = useCallback((id: string, report: StudioModelInspection) => {
    setInspections((current) => current[id] === report ? current : { ...current, [id]: report })
  }, [])

  return (
    <div className="studio-page">
      <header className="studio-topbar">
        <div className="studio-brand-block">
          <Link to="/" className="studio-brand">MESHVARA <b>STUDIO</b></Link>
          <span>LOCAL-FIRST MODEL + SCENE WORKBENCH</span>
        </div>
        <label className="studio-project-name"><span>PROJECT</span><input value={project.name} onChange={(event) => commit(renameStudioProject(project, event.currentTarget.value))} /></label>
        <div className="studio-top-actions">
          <button type="button" onClick={newProject}>NEW</button>
          <label><input type="file" accept=".meshvara-project,application/json" onChange={(event) => { const file = event.currentTarget.files?.[0]; if (file) void importProject(file); event.currentTarget.value = '' }} />IMPORT PROJECT</label>
          <button type="button" onClick={exportProject}>EXPORT PROJECT</button>
          <button type="button" onClick={() => void cleanStorage()}>CLEAN STORAGE</button>
          <Link to="/assets">ARCHIVE ↗</Link>
        </div>
      </header>

      <div className="studio-workspace">
        <aside className="studio-left-panel">
          <StudioOutliner
            nodes={project.nodes}
            selectedIds={selectedIds}
            onSelect={selectNode}
            onVisibility={(id, visible) => patchNode(id, { visible })}
            onLock={(id, locked) => patchNode(id, { locked })}
          />
          <StudioLibrary
            projects={projects}
            activeProjectId={project.id}
            onAddAsset={addArchiveAsset}
            onImportGlb={(file) => void importGlb(file)}
            onOpenProject={(id) => void openProject(id)}
            onDeleteProject={(id) => void removeProject(id)}
          />
        </aside>

        <main className="studio-stage-column">
          <div className="studio-toolbar">
            <div className="studio-tool-group" aria-label="Transform mode">
              {(['translate', 'rotate', 'scale'] as StudioTransformMode[]).map((item, index) => <button key={item} type="button" className={mode === item ? 'is-active' : ''} onClick={() => setMode(item)}>{index + 1} · {item.toUpperCase()}</button>)}
            </div>
            <div className="studio-tool-group">
              <button type="button" disabled={!history.past.length} onClick={() => setHistory((current) => undoStudioHistory(current))}>UNDO</button>
              <button type="button" disabled={!history.future.length} onClick={() => setHistory((current) => redoStudioHistory(current))}>REDO</button>
              <button type="button" onClick={() => commit(updateStudioScene(project, { snap: !project.scene.snap }))}>SNAP {project.scene.snap ? 'ON' : 'OFF'}</button>
            </div>
            <div className="studio-tool-group studio-export-tools">
              <button type="button" onClick={() => void exportSource('config', true)}>COPY CONFIG</button>
              <button type="button" onClick={() => void exportSource('config', false)}>TS</button>
              <button type="button" onClick={() => void exportSource('r3f', true)}>COPY R3F</button>
              <button type="button" onClick={() => void exportSource('r3f', false)}>TSX</button>
            </div>
          </div>

          <StudioViewport
            project={project}
            selectedIds={selectedIds}
            primarySelectedId={selectedId}
            mode={mode}
            onSelect={(id) => setSelectedIds(id ? [id] : [])}
            onTransform={(id, transform: StudioTransform) => commitPrimaryTransform(id, transform)}
            onMetrics={setMetrics}
            onInspection={reportInspection}
          />

          <footer className="studio-statusbar">
            <span>{status}</span>
            <span>{project.nodes.length} OBJECTS</span>
            <span>{selectedIds.length} SELECTED</span>
            <span>{metrics.calls} CALLS</span>
            <span>{metrics.triangles.toLocaleString()} TRI</span>
            <span>{metrics.geometries} GEO</span>
            <span>{metrics.textures} TEX</span>
          </footer>
        </main>

        <StudioInspector
          project={project}
          node={selectedNode}
          selectedIds={selectedIds}
          inspection={selectedInspection}
          onRename={(name) => selectedId && patchNode(selectedId, { name })}
          onTransform={(transform) => selectedId && commitPrimaryTransform(selectedId, transform)}
          onNodePatch={(patch) => selectedId && patchNode(selectedId, patch)}
          onScenePatch={(patch) => commit(updateStudioScene(project, patch))}
          onParent={reparentSelected}
          onMaterialPatch={patchMaterial}
          onTextureImport={(slotId, channel, file) => void importTexture(slotId, channel, file)}
          onTextureReference={patchTextureReference}
          onAnimationPatch={(patch) => selectedNode && patchNode(selectedNode.id, { animation: { ...selectedNode.animation, ...patch } })}
          onDebugPatch={(patch) => selectedNode && patchNode(selectedNode.id, { debug: { ...selectedNode.debug, ...patch } })}
          onBulkPatch={(patch) => commit(updateStudioNodes(project, selectedIds, patch))}
          onDuplicate={duplicateSelected}
          onDelete={deleteSelected}
          onExportGlb={(profile) => void exportSelectedGlb(profile, false)}
          onExportComponent={(profile) => void exportSelectedGlb(profile, true)}
        />
      </div>
    </div>
  )
}
