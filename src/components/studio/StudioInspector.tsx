import { useState } from 'react'
import { collectStudioDescendantIds, type StudioMaterialOverride, type StudioNode, type StudioProject, type StudioTextureChannel, type StudioTransform, type StudioVec3 } from '../../lib/studioProject'
import { studioEditableTextureChannels, type StudioMaterialSlot, type StudioModelInspection } from '../../lib/studioModelTools'
import { studioGlbExportProfiles, type StudioGlbExportProfile } from '../../lib/studioModelExport'

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

function TextureRow({
  channel,
  authored,
  reference,
  onImport,
  onReference,
}: {
  channel: StudioTextureChannel
  authored: boolean
  reference: string | null | undefined
  onImport: (file: File) => void
  onReference: (reference: string | null | undefined) => void
}) {
  const state = typeof reference === 'string' ? 'LOCAL' : reference === null ? 'REMOVED' : authored ? 'AUTHORED' : 'EMPTY'
  return (
    <div className="studio-texture-row">
      <div><strong>{channel}</strong><small>{state}</small></div>
      <label className="studio-texture-upload">
        {typeof reference === 'string' || authored ? 'REPLACE' : 'ADD'}
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0]
            if (file) onImport(file)
            event.currentTarget.value = ''
          }}
        />
      </label>
      {reference !== undefined ? <button type="button" onClick={() => onReference(undefined)}>REVERT</button> : authored ? <button type="button" onClick={() => onReference(null)}>REMOVE</button> : <span />}
    </div>
  )
}

function MaterialEditor({
  slot,
  override,
  onPatch,
  onTextureImport,
  onTextureReference,
}: {
  slot: StudioMaterialSlot
  override?: StudioMaterialOverride
  onPatch: (patch: StudioMaterialOverride) => void
  onTextureImport: (channel: StudioTextureChannel, file: File) => void
  onTextureReference: (channel: StudioTextureChannel, reference: string | null | undefined) => void
}) {
  const color = override?.color ?? slot.color
  const emissive = override?.emissive ?? slot.emissive
  const roughness = override?.roughness ?? slot.roughness
  const metalness = override?.metalness ?? slot.metalness
  const opacity = override?.opacity ?? slot.opacity
  return (
    <details className="studio-material-card">
      <summary><span>{slot.name}</span><small>{slot.type} · {slot.textureChannels.length} TEX</small></summary>
      <div className="studio-material-controls">
        {color ? <label className="studio-mini-color"><span>Base color</span><input type="color" value={color} onChange={(event) => onPatch({ ...override, color: event.currentTarget.value })} /></label> : null}
        {emissive ? <label className="studio-mini-color"><span>Emissive</span><input type="color" value={emissive} onChange={(event) => onPatch({ ...override, emissive: event.currentTarget.value })} /></label> : null}
        {roughness !== undefined ? <label className="studio-range-field"><span>Roughness <output>{roughness.toFixed(2)}</output></span><input type="range" min="0" max="1" step="0.01" value={roughness} onChange={(event) => onPatch({ ...override, roughness: Number(event.currentTarget.value) })} /></label> : null}
        {metalness !== undefined ? <label className="studio-range-field"><span>Metalness <output>{metalness.toFixed(2)}</output></span><input type="range" min="0" max="1" step="0.01" value={metalness} onChange={(event) => onPatch({ ...override, metalness: Number(event.currentTarget.value) })} /></label> : null}
        {emissive !== undefined ? <label className="studio-range-field"><span>Emissive power <output>{(override?.emissiveIntensity ?? slot.emissiveIntensity ?? 1).toFixed(2)}</output></span><input type="range" min="0" max="10" step="0.05" value={override?.emissiveIntensity ?? slot.emissiveIntensity ?? 1} onChange={(event) => onPatch({ ...override, emissiveIntensity: Number(event.currentTarget.value) })} /></label> : null}
        <label className="studio-range-field"><span>Opacity <output>{opacity.toFixed(2)}</output></span><input type="range" min="0" max="1" step="0.01" value={opacity} onChange={(event) => onPatch({ ...override, opacity: Number(event.currentTarget.value) })} /></label>
        <div className="studio-texture-editor">
          <div className="studio-section-title"><span>TEXTURE CHANNELS</span><small>LOCAL · PNG/JPEG/WEBP</small></div>
          {studioEditableTextureChannels.map((channel) => (
            <TextureRow
              key={channel}
              channel={channel}
              authored={slot.textureChannels.includes(channel)}
              reference={override?.textures?.[channel]}
              onImport={(file) => onTextureImport(channel, file)}
              onReference={(reference) => onTextureReference(channel, reference)}
            />
          ))}
        </div>
        {override && Object.keys(override).length ? <button className="studio-material-reset" type="button" onClick={() => onPatch({})}>RESET TO AUTHORED</button> : null}
      </div>
    </details>
  )
}

function ModelReport({ inspection }: { inspection: StudioModelInspection }) {
  const size = inspection.bounds.size.map((value) => Number(value.toFixed(2))).join(' × ')
  return (
    <div className="studio-model-report">
      <div className="studio-section-title"><span>MODEL REPORT</span><small>LIVE GLB</small></div>
      <div className="studio-stat-grid">
        <span><b>{inspection.meshes}</b> meshes</span><span><b>{inspection.triangles.toLocaleString()}</b> tris</span><span><b>{inspection.vertices.toLocaleString()}</b> verts</span>
        <span><b>{inspection.materials}</b> materials</span><span><b>{inspection.textures}</b> textures</span><span><b>{inspection.skinnedMeshes}</b> skinned</span>
      </div>
      <p className="studio-bounds-readout">Bounds · {size}</p>
      {inspection.warnings.length ? <div className="studio-warning-list">{inspection.warnings.map((warning) => <p key={warning}>⚠ {warning}</p>)}</div> : <p className="studio-model-ok">No structural web-runtime warnings detected.</p>}
    </div>
  )
}

export function StudioInspector({
  project,
  node,
  selectedIds,
  inspection,
  onRename,
  onTransform,
  onNodePatch,
  onScenePatch,
  onParent,
  onMaterialPatch,
  onTextureImport,
  onTextureReference,
  onAnimationPatch,
  onDebugPatch,
  onBulkPatch,
  onDuplicate,
  onDelete,
  onExportGlb,
  onExportComponent,
}: {
  project: StudioProject
  node: StudioNode | null
  selectedIds: string[]
  inspection?: StudioModelInspection
  onRename: (name: string) => void
  onTransform: (transform: Partial<StudioTransform>) => void
  onNodePatch: (patch: Partial<Pick<StudioNode, 'visible' | 'locked' | 'wireframe'>>) => void
  onScenePatch: (patch: Partial<StudioProject['scene']>) => void
  onParent: (parentId?: string) => void
  onMaterialPatch: (slotId: string, patch: StudioMaterialOverride) => void
  onTextureImport: (slotId: string, channel: StudioTextureChannel, file: File) => void
  onTextureReference: (slotId: string, channel: StudioTextureChannel, reference: string | null | undefined) => void
  onAnimationPatch: (patch: Partial<StudioNode['animation']>) => void
  onDebugPatch: (patch: Partial<StudioNode['debug']>) => void
  onBulkPatch: (patch: Partial<Pick<StudioNode, 'visible' | 'locked'>>) => void
  onDuplicate: () => void
  onDelete: () => void
  onExportGlb: (profile: StudioGlbExportProfile) => void
  onExportComponent: (profile: StudioGlbExportProfile) => void
}) {
  const [exportProfile, setExportProfile] = useState<StudioGlbExportProfile>('desktop')
  const blockedParents = node ? new Set([node.id, ...collectStudioDescendantIds(project, node.id)]) : new Set<string>()
  const profile = studioGlbExportProfiles[exportProfile]
  return (
    <aside className="studio-inspector">
      <section className="studio-panel-section">
        <div className="studio-section-title"><span>INSPECTOR</span><small>{node ? node.kind.toUpperCase() : 'SCENE'}</small></div>
        {selectedIds.length > 1 ? (
          <div className="studio-multi-card">
            <strong>{selectedIds.length} OBJECTS SELECTED</strong>
            <div><button type="button" onClick={() => onBulkPatch({ visible: true })}>SHOW</button><button type="button" onClick={() => onBulkPatch({ visible: false })}>HIDE</button><button type="button" onClick={() => onBulkPatch({ locked: true })}>LOCK</button><button type="button" onClick={() => onBulkPatch({ locked: false })}>UNLOCK</button></div>
            <small>Primary gizmo deltas are committed across selected root objects while preserving hierarchy.</small>
          </div>
        ) : null}
        {node ? (
          <>
            <label className="studio-field"><span>Name</span><input value={node.name} onChange={(event) => onRename(event.currentTarget.value)} /></label>
            <div className="studio-source-card"><span>SOURCE</span><strong>{node.kind === 'archive' ? 'MESHVARA ARCHIVE' : 'LOCAL GLB'}</strong><code>{node.assetSlug ?? node.fileId}</code></div>
            <label className="studio-field"><span>Parent · preserves world transform</span><select value={node.parentId ?? ''} onChange={(event) => onParent(event.currentTarget.value || undefined)}><option value="">Scene root</option>{project.nodes.filter((item) => !blockedParents.has(item.id)).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
            <Vec3Editor label="POSITION" value={node.transform.position} step={0.1} onChange={(position) => onTransform({ position })} />
            <Vec3Editor label="ROTATION" value={node.transform.rotation} step={0.05} onChange={(rotation) => onTransform({ rotation })} />
            <Vec3Editor label="SCALE" value={node.transform.scale} step={0.05} onChange={(scale) => onTransform({ scale })} />
            <div className="studio-toggle-grid">
              <label><input type="checkbox" checked={node.visible} onChange={(event) => onNodePatch({ visible: event.currentTarget.checked })} /> Visible</label>
              <label><input type="checkbox" checked={node.locked} onChange={(event) => onNodePatch({ locked: event.currentTarget.checked })} /> Locked</label>
              <label><input type="checkbox" checked={node.wireframe} onChange={(event) => onNodePatch({ wireframe: event.currentTarget.checked })} /> Wireframe</label>
            </div>

            {node.kind === 'imported' ? (
              <>
                {inspection ? <ModelReport inspection={inspection} /> : <p className="studio-muted">Model diagnostics appear after the GLB finishes loading.</p>}
                <div className="studio-subsection">
                  <div className="studio-section-title"><span>DEBUG VIEW</span><small>EDITOR ONLY</small></div>
                  <div className="studio-toggle-grid">
                    <label><input type="checkbox" checked={node.debug.bounds} onChange={(event) => onDebugPatch({ bounds: event.currentTarget.checked })} /> Bounds</label>
                    <label><input type="checkbox" checked={node.debug.axes} onChange={(event) => onDebugPatch({ axes: event.currentTarget.checked })} /> Axes</label>
                    <label><input type="checkbox" checked={node.debug.skeleton} onChange={(event) => onDebugPatch({ skeleton: event.currentTarget.checked })} /> Skeleton</label>
                  </div>
                </div>
                {inspection?.animations.length ? (
                  <div className="studio-subsection">
                    <div className="studio-section-title"><span>ANIMATION</span><small>{inspection.animations.length} CLIPS</small></div>
                    <label className="studio-field"><span>Clip</span><select value={node.animation.clip ?? ''} onChange={(event) => onAnimationPatch({ clip: event.currentTarget.value || undefined, playing: Boolean(event.currentTarget.value) })}><option value="">No clip</option>{inspection.animations.map((clip) => <option key={clip.name} value={clip.name}>{clip.name} · {clip.duration.toFixed(2)}s</option>)}</select></label>
                    <div className="studio-toggle-grid"><label><input type="checkbox" checked={node.animation.playing} disabled={!node.animation.clip} onChange={(event) => onAnimationPatch({ playing: event.currentTarget.checked })} /> Play</label><label><input type="checkbox" checked={node.animation.loop} disabled={!node.animation.clip} onChange={(event) => onAnimationPatch({ loop: event.currentTarget.checked })} /> Loop</label></div>
                    <label className="studio-range-field"><span>Speed <output>{node.animation.speed.toFixed(2)}×</output></span><input type="range" min="0.05" max="4" step="0.05" value={node.animation.speed} onChange={(event) => onAnimationPatch({ speed: Number(event.currentTarget.value) })} /></label>
                  </div>
                ) : null}
                {inspection?.materialSlots.length ? (
                  <div className="studio-subsection">
                    <div className="studio-section-title"><span>PBR + TEXTURES</span><small>{inspection.materialSlots.length} SLOTS</small></div>
                    {inspection.materialSlots.map((slot) => (
                      <MaterialEditor
                        key={slot.id}
                        slot={slot}
                        override={node.materialOverrides[slot.id]}
                        onPatch={(patch) => onMaterialPatch(slot.id, patch)}
                        onTextureImport={(channel, file) => onTextureImport(slot.id, channel, file)}
                        onTextureReference={(channel, reference) => onTextureReference(slot.id, channel, reference)}
                      />
                    ))}
                  </div>
                ) : null}
                <div className="studio-subsection studio-export-profile">
                  <div className="studio-section-title"><span>LOCAL DELIVERY</span><small>NO CLOUD</small></div>
                  <label className="studio-field"><span>Export profile</span><select value={exportProfile} onChange={(event) => setExportProfile(event.currentTarget.value as StudioGlbExportProfile)}>{Object.entries(studioGlbExportProfiles).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}</select></label>
                  <p className="studio-action-note">{profile.note}</p>
                  <div className="studio-delivery-actions"><button className="studio-primary-action" type="button" onClick={() => onExportGlb(exportProfile)}>EXPORT WEB GLB</button><button className="studio-primary-action" type="button" onClick={() => onExportComponent(exportProfile)}>R3F COMPONENT ZIP</button></div>
                  <p className="studio-action-note">Component ZIP includes the exported GLB, typed R3F source, exact dependency pins, preset metadata, quality contract and MIT license. No Draco / Meshopt / KTX2 claim is made.</p>
                </div>
              </>
            ) : null}

            <div className="studio-danger-actions"><button type="button" onClick={onDuplicate}>DUPLICATE{selectedIds.length > 1 ? ' SELECTED' : ''}</button><button type="button" onClick={onDelete}>DELETE{selectedIds.length > 1 ? ' SELECTED' : ''}</button></div>
          </>
        ) : (
          <>
            <label className="studio-field studio-color-field"><span>Background</span><input type="color" value={project.scene.background} onChange={(event) => onScenePatch({ background: event.currentTarget.value })} /></label>
            <label className="studio-range-field"><span>Exposure <output>{project.scene.exposure.toFixed(2)}</output></span><input type="range" min="0.1" max="3" step="0.05" value={project.scene.exposure} onChange={(event) => onScenePatch({ exposure: Number(event.currentTarget.value) })} /></label>
            <div className="studio-toggle-grid"><label><input type="checkbox" checked={project.scene.grid} onChange={(event) => onScenePatch({ grid: event.currentTarget.checked })} /> Grid</label><label><input type="checkbox" checked={project.scene.snap} onChange={(event) => onScenePatch({ snap: event.currentTarget.checked })} /> Snap</label></div>
            <label className="studio-field"><span>Move snap</span><input type="number" min="0.01" step="0.05" value={project.scene.translateSnap} onChange={(event) => onScenePatch({ translateSnap: Number(event.currentTarget.value) })} /></label>
            <label className="studio-field"><span>Rotate snap °</span><input type="number" min="1" step="1" value={project.scene.rotateSnap} onChange={(event) => onScenePatch({ rotateSnap: Number(event.currentTarget.value) })} /></label>
            <label className="studio-field"><span>Scale snap</span><input type="number" min="0.01" step="0.05" value={project.scene.scaleSnap} onChange={(event) => onScenePatch({ scaleSnap: Number(event.currentTarget.value) })} /></label>
          </>
        )}
      </section>
    </aside>
  )
}
