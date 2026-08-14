import type { StudioNode } from '../../lib/studioProject'

export function StudioOutliner({
  nodes,
  selectedIds,
  onSelect,
  onVisibility,
  onLock,
}: {
  nodes: StudioNode[]
  selectedIds: string[]
  onSelect: (id: string, additive: boolean) => void
  onVisibility: (id: string, visible: boolean) => void
  onLock: (id: string, locked: boolean) => void
}) {
  const selected = new Set(selectedIds)
  const ids = new Set(nodes.map((node) => node.id))
  const children = new Map<string | undefined, StudioNode[]>()
  for (const node of nodes) {
    const parent = node.parentId && ids.has(node.parentId) ? node.parentId : undefined
    const bucket = children.get(parent) ?? []
    bucket.push(node)
    children.set(parent, bucket)
  }

  const renderNode = (node: StudioNode, depth: number) => (
    <div key={node.id}>
      <div className={`studio-object-row${selected.has(node.id) ? ' is-selected' : ''}`}>
        <button
          type="button"
          className="studio-object-main"
          style={{ paddingLeft: `${7 + Math.min(depth, 8) * 14}px` }}
          onClick={(event) => onSelect(node.id, event.shiftKey || event.metaKey || event.ctrlKey)}
        >
          <span className="studio-object-kind">{node.kind === 'archive' ? 'M' : 'G'}</span>
          <span><strong>{node.name}</strong><small>{node.parentId ? '↳ ' : ''}{node.kind === 'archive' ? node.assetSlug : 'LOCAL GLB'}</small></span>
        </button>
        <button type="button" aria-label={`${node.visible ? 'Hide' : 'Show'} ${node.name}`} onClick={() => onVisibility(node.id, !node.visible)}>{node.visible ? '◉' : '○'}</button>
        <button type="button" aria-label={`${node.locked ? 'Unlock' : 'Lock'} ${node.name}`} onClick={() => onLock(node.id, !node.locked)}>{node.locked ? '▣' : '□'}</button>
      </div>
      {(children.get(node.id) ?? []).map((child) => renderNode(child, depth + 1))}
    </div>
  )

  return (
    <section className="studio-panel-section studio-outliner">
      <div className="studio-section-title">
        <span>SCENE</span>
        <small>{selectedIds.length ? `${selectedIds.length} SELECTED · ` : ''}{nodes.length} OBJECT{nodes.length === 1 ? '' : 'S'}</small>
      </div>
      <div className="studio-object-list">
        {nodes.length ? (children.get(undefined) ?? []).map((node) => renderNode(node, 0)) : <p className="studio-muted">No objects in this scene yet.</p>}
      </div>
      {nodes.length > 1 ? <p className="studio-outliner-hint">Shift / Ctrl / ⌘ click for multi-select.</p> : null}
    </section>
  )
}
