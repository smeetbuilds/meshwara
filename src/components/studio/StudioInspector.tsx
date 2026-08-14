import type { StudioNode, StudioProject, StudioTransform, StudioVec3 } from '../../lib/studioProject'

function Vec3Editor({ label, value, step, onChange }: { label: string; value: StudioVec3; step: number; onChange: (value: StudioVec3) => void }) {
  const axes = ['X', 'Y', 'Z'] as const
  return (
    <div className="studio-vector">
      <span>{label}</span>
      <div>
        {axes.map((axis, index) => (
          <label key={axis}>
            <small>{axis}</small>
            <input
              type="number"
              step={step}
              value={Number(value[index].toFixed(4))}
              onChange={(event) => {
                const next = [...value] as StudioVec3
                next[index] = Number(event.currentTarget.value) || 0
                onChange(next)
              }}
            />
          </label>
        ))}
      </div>
    </div>
  )
}

export function StudioInspector({
  project,
  node,
  onRename,
  onTransform,
  onNodePatch,
  onScenePatch,
  onDuplicate,
  onDelete,
}: {
  project: StudioProject
  node: StudioNode | null
  onRename: (name: string) => void
  onTransform: (transform: Partial<StudioTransform>) => void
  onNodePatch: (patch: Partial<Pick<StudioNode, 'visible' | 'locked' | 'wireframe'>>) => void
  onScenePatch: (patch: Partial<StudioProject['scene']>) => void
  onDuplicate: () => void
  onDelete: () => void
}) {
  return (
    <aside className="studio-inspector">
      <section className="studio-panel-section">
        <div className="studio-section-title"><span>INSPECTOR</span><small>{node ? node.kind.toUpperCase() : 'SCENE'}</small></div>
        {node ? (
          <>
            <label className="studio-field"><span>Name</span><input value={node.name} onChange={(event) => onRename(event.currentTarget.value)} /></label>
            <div className="studio-source-card">
              <span>SOURCE</span>
              <strong>{node.kind === 'archive' ? 'MESHVARA ARCHIVE' : 'LOCAL GLB'}</strong>
              <code>{node.assetSlug ?? node.fileId}</code>
            </div>
            <Vec3Editor label="POSITION" value={node.transform.position} step={0.1} onChange={(position) => onTransform({ position })} />
            <Vec3Editor label="ROTATION" value={node.transform.rotation} step={0.05} onChange={(rotation) => onTransform({ rotation })} />
            <Vec3Editor label="SCALE" value={node.transform.scale} step={0.05} onChange={(scale) => onTransform({ scale })} />
            <div className="studio-toggle-grid">
              <label><input type="checkbox" checked={node.visible} onChange={(event) => onNodePatch({ visible: event.currentTarget.checked })} /> Visible</label>
              <label><input type="checkbox" checked={node.locked} onChange={(event) => onNodePatch({ locked: event.currentTarget.checked })} /> Locked</label>
              <label><input type="checkbox" checked={node.wireframe} onChange={(event) => onNodePatch({ wireframe: event.currentTarget.checked })} /> Wireframe</label>
            </div>
            <div className="studio-danger-actions">
              <button type="button" onClick={onDuplicate}>DUPLICATE</button>
              <button type="button" onClick={onDelete}>DELETE</button>
            </div>
          </>
        ) : (
          <>
            <label className="studio-field studio-color-field"><span>Background</span><input type="color" value={project.scene.background} onChange={(event) => onScenePatch({ background: event.currentTarget.value })} /></label>
            <label className="studio-range-field"><span>Exposure <output>{project.scene.exposure.toFixed(2)}</output></span><input type="range" min="0.1" max="3" step="0.05" value={project.scene.exposure} onChange={(event) => onScenePatch({ exposure: Number(event.currentTarget.value) })} /></label>
            <div className="studio-toggle-grid">
              <label><input type="checkbox" checked={project.scene.grid} onChange={(event) => onScenePatch({ grid: event.currentTarget.checked })} /> Grid</label>
              <label><input type="checkbox" checked={project.scene.snap} onChange={(event) => onScenePatch({ snap: event.currentTarget.checked })} /> Snap</label>
            </div>
            <label className="studio-field"><span>Move snap</span><input type="number" min="0.01" step="0.05" value={project.scene.translateSnap} onChange={(event) => onScenePatch({ translateSnap: Number(event.currentTarget.value) })} /></label>
            <label className="studio-field"><span>Rotate snap °</span><input type="number" min="1" step="1" value={project.scene.rotateSnap} onChange={(event) => onScenePatch({ rotateSnap: Number(event.currentTarget.value) })} /></label>
            <label className="studio-field"><span>Scale snap</span><input type="number" min="0.01" step="0.05" value={project.scene.scaleSnap} onChange={(event) => onScenePatch({ scaleSnap: Number(event.currentTarget.value) })} /></label>
          </>
        )}
      </section>
    </aside>
  )
}
