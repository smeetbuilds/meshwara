import { useMemo, useState } from 'react'
import { assets } from '../../data/assets'
import type { StudioProjectSummary } from '../../lib/studioStorage'

export function StudioLibrary({
  projects,
  activeProjectId,
  onAddAsset,
  onImportGlb,
  onOpenProject,
  onDeleteProject,
}: {
  projects: StudioProjectSummary[]
  activeProjectId: string
  onAddAsset: (slug: string) => void
  onImportGlb: (file: File) => void
  onOpenProject: (id: string) => void
  onDeleteProject: (id: string) => void
}) {
  const [tab, setTab] = useState<'assets' | 'projects'>('assets')
  const [query, setQuery] = useState('')
  const shownAssets = useMemo(() => {
    const q = query.trim().toLowerCase()
    return assets.filter((asset) => !q || `${asset.name} ${asset.slug} ${asset.category} ${asset.tags.join(' ')}`.toLowerCase().includes(q)).slice(0, 40)
  }, [query])

  return (
    <section className="studio-panel-section studio-library">
      <div className="studio-tabs" role="tablist" aria-label="Studio library">
        <button type="button" role="tab" aria-selected={tab === 'assets'} onClick={() => setTab('assets')}>ASSETS</button>
        <button type="button" role="tab" aria-selected={tab === 'projects'} onClick={() => setTab('projects')}>PROJECTS</button>
      </div>
      {tab === 'assets' ? (
        <>
          <label className="studio-search">
            <span className="sr-only">Search Meshvara assets</span>
            <input value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder="Search 500 assets…" />
          </label>
          <label className="studio-import-button">
            <input
              type="file"
              accept=".glb,model/gltf-binary"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0]
                if (file) onImportGlb(file)
                event.currentTarget.value = ''
              }}
            />
            IMPORT LOCAL GLB
          </label>
          <p className="studio-outliner-hint">GLB 2.0 · Draco, Meshopt and KTX2/BasisU inputs decode through Meshvara’s same-origin offline codec runtime.</p>
          <div className="studio-asset-list">
            {shownAssets.map((asset) => (
              <button key={asset.slug} type="button" onClick={() => onAddAsset(asset.slug)}>
                <span>{asset.index}</span>
                <strong>{asset.name}</strong>
                <small>{asset.category} · {asset.sourceType}</small>
                <b>＋</b>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="studio-project-list">
          {projects.length ? projects.map((project) => (
            <div key={project.id} className={project.id === activeProjectId ? 'is-active' : ''}>
              <button type="button" onClick={() => onOpenProject(project.id)}>
                <strong>{project.name}</strong>
                <small>{project.objectCount} objects · {new Date(project.updatedAt).toLocaleString()}</small>
              </button>
              <button type="button" className="studio-delete-project" aria-label={`Delete ${project.name}`} onClick={() => onDeleteProject(project.id)}>×</button>
            </div>
          )) : <p className="studio-muted">No saved local projects yet.</p>}
        </div>
      )}
    </section>
  )
}
