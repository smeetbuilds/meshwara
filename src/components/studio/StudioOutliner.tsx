import type { StudioNode } from '../../lib/studioProject'

export function StudioOutliner({
  nodes,
  selectedId,
  onSelect,
  onVisibility,
  onLock,
}: {
  nodes: StudioNode[]
  selectedId: string | null
  onSelect: (id: string) => void
  onVisibility: (id: string, visible: boolean) => void
  onLock: (id: string, locked: boolean) => void
}) {
  return (
    <section className="studio-panel-section studio-outliner">
      <div className="studio-section-title"><span>SCENE</span><small>{nodes.length} OBJECT{nodes.length === 1 ? '' : 'S'}</small></div>
      <div className="studio-object-list">
        {nodes.length ? nodes.map((node) => (
          <div key={node.id} className={`studio-object-row${node.id === selectedId ? ' is-selected' : ''}`}>
            <button type="button" className="studio-object-main" onClick={() => onSelect(node.id)}>
              <span className="studio-object-kind">{node.kind === 'archive' ? 'M' : 'G'}</span>
              <span><strong>{node.name}</strong><small>{node.kind === 'archive' ? node.assetSlug : 'LOCAL GLB'}</small></span>
            </button>
            <button type="button" aria-label={`${node.visible ? 'Hide' : 'Show'} ${node.name}`} onClick={() => onVisibility(node.id, !node.visible)}>{node.visible ? '◉' : '○'}</button>
            <button type="button" aria-label={`${node.locked ? 'Unlock' : 'Lock'} ${node.name}`} onClick={() => onLock(node.id, !node.locked)}>{node.locked ? '▣' : '□'}</button>
          </div>
        )) : <p className="studio-muted">No objects in this scene yet.</p>}
      </div>
    </section>
  )
}
