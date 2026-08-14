import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { assets } from '../../data/assets'
import {
  appendStudioNode,
  commitStudioHistory,
  createArchiveStudioNode,
  createImportedStudioNode,
  createStudioHistory,
  createStudioProject,
  duplicateStudioNode,
  redoStudioHistory,
  removeStudioNode,
  renameStudioProject,
  undoStudioHistory,
  updateStudioNode,
  updateStudioScene,
  updateStudioTransform,
  type StudioProject,
  type StudioTransform,
  type StudioTransformMode,
} from '../../lib/studioProject'
import {
  createPortableStudioProject,
  deleteStudioProject,
  listStudioProjects,
  loadStudioProject,
  restorePortableStudioProject,
  saveStudioProject,
  storeStudioFile,
  type StudioProjectSummary,
} from '../../lib/studioStorage'
import { generateStudioConfigModule } from '../../lib/studioExport'
import { StudioViewport, type StudioViewportMetrics } from './StudioViewport'
import { StudioOutliner } from './StudioOutliner'
import { StudioLibrary } from './StudioLibrary'
import { StudioInspector } from './StudioInspector'
import '../../styles/studio.css'

function downloadText(filename: string, content: string, type = 'text/plain') {
  const blob = new Blob([content], { type })
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

export function StudioShell({ initialAssetSlug }: { initialAssetSlug?: string }) {
  const [history, setHistory] = useState(() => createStudioHistory(createStudioProject()))
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [mode, setMode] = useState<StudioTransformMode>('translate')
  const [projects, setProjects] = useState<StudioProjectSummary[]>([])
  const [status, setStatus] = useState('LOCAL-FIRST · INITIALIZING')
  const [metrics, setMetrics] = useState<StudioViewportMetrics>({ calls: 0, triangles: 0, geometries: 0, textures: 0 })
  const booted = useRef(false)
  const project = history.present
  const selectedNode = useMemo(() => project.nodes.find((node) => node.id === selectedId) ?? null, [project.nodes, selectedId])

  const refreshProjects = useCallback(async () => setProjects(await listStudioProjects()), [])

  const commit = useCallback((next: StudioProject, nextSelectedId?: string | null) => {
    setHistory((current) => commitStudioHistory(current, next))
    if (nextSelectedId !== undefined) setSelectedId(nextSelectedId)
  }, [])

  useEffect(() => {
    if (booted.current) return
    booted.current = true
    void (async () => {
      const recent = await listStudioProjects()
      const deepLinkedAsset = initialAssetSlug ? assets.find((item) => item.slug === initialAssetSlug) : undefined
      let active = deepLinkedAsset
        ? createStudioProject(`${deepLinkedAsset.name} Study`)
        : recent[0] ? await loadStudioProject(recent[0].id) : null
      active ??= createStudioProject()
      if (deepLinkedAsset) {
        const node = createArchiveStudioNode({ slug: deepLinkedAsset.slug, name: deepLinkedAsset.name })
        active = appendStudioNode(active, node)
        setSelectedId(node.id)
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
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault()
        setHistory((current) => event.shiftKey ? redoStudioHistory(current) : undoStudioHistory(current))
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'y') {
        event.preventDefault()
        setHistory((current) => redoStudioHistory(current))
      }
      if (event.key === '1') setMode('translate')
      if (event.key === '2') setMode('rotate')
      if (event.key === '3') setMode('scale')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const addArchiveAsset = (slug: string) => {
    const asset = assets.find((item) => item.slug === slug)
    if (!asset) return
    const node = createArchiveStudioNode({ slug: asset.slug, name: asset.name })
    commit(appendStudioNode(project, node), node.id)
    setStatus(`${asset.name.toUpperCase()} ADDED FROM ARCHIVE`)
  }

  const importGlb = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.glb')) {
      setStatus('IMPORT REJECTED · STUDIO FOUNDATION ACCEPTS .GLB ONLY')
      return
    }
    if (file.size > 100 * 1024 * 1024) {
      setStatus('IMPORT REJECTED · 100 MB LOCAL SAFETY LIMIT')
      return
    }
    try {
      const record = await storeStudioFile(file)
      const node = createImportedStudioNode(record)
      commit(appendStudioNode(project, node), node.id)
      setStatus(`${file.name.toUpperCase()} STORED LOCALLY · NO UPLOAD`)
    } catch {
      setStatus('GLB IMPORT FAILED · LOCAL STORAGE COULD NOT ACCEPT THE FILE')
    }
  }

  const newProject = async () => {
    const next = createStudioProject()
    await saveStudioProject(next)
    setHistory(createStudioHistory(next))
    setSelectedId(null)
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
    setSelectedId(null)
    setStatus(`${next.name.toUpperCase()} OPENED`)
  }

  const removeProject = async (id: string) => {
    const target = await loadStudioProject(id)
    if (!target) return
    await deleteStudioProject(target)
    if (id === project.id) await newProject()
    else await refreshProjects()
    setStatus('LOCAL PROJECT DELETED')
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
      setSelectedId(null)
      await refreshProjects()
      setStatus('PORTABLE PROJECT VALIDATED + RESTORED LOCALLY')
    } catch (error) {
      setStatus(error instanceof Error ? `PROJECT REJECTED · ${error.message.toUpperCase()}` : 'PROJECT IMPORT FAILED')
    }
  }

  const exportTypedConfig = async (copy = false) => {
    const source = generateStudioConfigModule(project)
    if (copy) {
      try {
        await copyText(source)
        setStatus('TYPED SCENE CONFIG COPIED')
      } catch {
        setStatus('CLIPBOARD BLOCKED · USE DOWNLOAD TS')
      }
      return
    }
    downloadText(`${safeFilename(project.name)}.meshvara-scene.ts`, source, 'text/typescript')
    setStatus('TYPED SCENE CONFIG EXPORTED')
  }

  const patchNode = (id: string, patch: Parameters<typeof updateStudioNode>[2]) => commit(updateStudioNode(project, id, patch))

  const deleteSelected = () => {
    if (!selectedId) return
    commit(removeStudioNode(project, selectedId), null)
    setStatus('OBJECT REMOVED · UNDO AVAILABLE')
  }

  const duplicateSelected = () => {
    if (!selectedId) return
    const result = duplicateStudioNode(project, selectedId)
    commit(result.project, result.nodeId ?? selectedId)
    setStatus('OBJECT DUPLICATED')
  }

  return (
    <div className="studio-page">
      <header className="studio-topbar">
        <div className="studio-brand-block">
          <Link to="/" className="studio-brand">MESHVARA <b>STUDIO</b></Link>
          <span>LOCAL-FIRST SCENE WORKBENCH</span>
        </div>
        <label className="studio-project-name">
          <span>PROJECT</span>
          <input value={project.name} onChange={(event) => commit(renameStudioProject(project, event.currentTarget.value))} />
        </label>
        <div className="studio-top-actions">
          <button type="button" onClick={newProject}>NEW</button>
          <label><input type="file" accept=".meshvara-project,application/json" onChange={(event) => { const file = event.currentTarget.files?.[0]; if (file) void importProject(file); event.currentTarget.value = '' }} />IMPORT PROJECT</label>
          <button type="button" onClick={exportProject}>EXPORT PROJECT</button>
          <Link to="/assets">ARCHIVE ↗</Link>
        </div>
      </header>

      <div className="studio-workspace">
        <aside className="studio-left-panel">
          <StudioOutliner
            nodes={project.nodes}
            selectedId={selectedId}
            onSelect={setSelectedId}
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
              {(['translate', 'rotate', 'scale'] as StudioTransformMode[]).map((item, index) => (
                <button key={item} type="button" className={mode === item ? 'is-active' : ''} onClick={() => setMode(item)}>{index + 1} · {item.toUpperCase()}</button>
              ))}
            </div>
            <div className="studio-tool-group">
              <button type="button" disabled={!history.past.length} onClick={() => setHistory((current) => undoStudioHistory(current))}>UNDO</button>
              <button type="button" disabled={!history.future.length} onClick={() => setHistory((current) => redoStudioHistory(current))}>REDO</button>
              <button type="button" onClick={() => commit(updateStudioScene(project, { snap: !project.scene.snap }))}>SNAP {project.scene.snap ? 'ON' : 'OFF'}</button>
            </div>
            <div className="studio-tool-group studio-export-tools">
              <button type="button" onClick={() => void exportTypedConfig(true)}>COPY TS CONFIG</button>
              <button type="button" onClick={() => void exportTypedConfig(false)}>DOWNLOAD TS</button>
            </div>
          </div>

          <StudioViewport
            project={project}
            selectedId={selectedId}
            mode={mode}
            onSelect={setSelectedId}
            onTransform={(id, transform: StudioTransform) => commit(updateStudioTransform(project, id, transform))}
            onMetrics={setMetrics}
          />

          <footer className="studio-statusbar">
            <span>{status}</span>
            <span>{project.nodes.length} OBJECTS</span>
            <span>{metrics.calls} CALLS</span>
            <span>{metrics.triangles.toLocaleString()} TRI</span>
            <span>{metrics.geometries} GEO</span>
            <span>{metrics.textures} TEX</span>
          </footer>
        </main>

        <StudioInspector
          project={project}
          node={selectedNode}
          onRename={(name) => selectedId && patchNode(selectedId, { name })}
          onTransform={(transform) => selectedId && commit(updateStudioTransform(project, selectedId, transform))}
          onNodePatch={(patch) => selectedId && patchNode(selectedId, patch)}
          onScenePatch={(patch) => commit(updateStudioScene(project, patch))}
          onDuplicate={duplicateSelected}
          onDelete={deleteSelected}
        />
      </div>
    </div>
  )
}
