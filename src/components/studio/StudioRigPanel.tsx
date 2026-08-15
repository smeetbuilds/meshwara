import { useMemo, useState } from 'react'
import {
  STUDIO_HUMANOID_ROLES,
  addStudioPose,
  createStudioPoseLibrary,
  duplicateStudioPose,
  mirrorStudioPoseDirection,
  parseStudioPoseLibrary,
  removeStudioPose,
  resolveStudioRig,
  type StudioHumanoidRole,
  type StudioPose,
  type StudioRigInspection,
  type StudioRigState,
} from '../../lib/studioRigState'
import type { StudioNode } from '../../lib/studioProject'

function humanizeRole(role: StudioHumanoidRole) {
  return role.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (value) => value.toUpperCase())
}

function downloadJson(filename: string, value: unknown) {
  const blob = new Blob([`${JSON.stringify(value, null, 2)}\n`], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

export function StudioRigPanel({
  node,
  inspection,
  onChange,
  onCapture,
  onStatus,
}: {
  node: StudioNode | null
  inspection?: StudioRigInspection
  onChange: (rig: StudioRigState) => void
  onCapture: (name: string) => void
  onStatus: (status: string) => void
}) {
  const [poseName, setPoseName] = useState('New Pose')
  const [selectedBoneId, setSelectedBoneId] = useState<string | null>(null)
  const rig = resolveStudioRig(node?.rig)
  const selectedBone = inspection?.bones.find((bone) => bone.id === selectedBoneId) ?? null
  const mappedRoles = Object.keys(rig.mapping).length
  const suggestedRoles = Object.keys(inspection?.suggestedMapping ?? {}).length
  const activePose = rig.poses.find((pose) => pose.id === rig.activePoseId)
  const roleByBone = useMemo(() => {
    const map = new Map<string, string>()
    for (const [role, boneId] of Object.entries(rig.mapping)) if (boneId) map.set(boneId, role)
    return map
  }, [rig.mapping])

  if (!node || node.kind !== 'imported') return null

  const updateMapping = (role: StudioHumanoidRole, boneId?: string) => {
    const mapping = { ...rig.mapping }
    if (boneId) mapping[role] = boneId
    else delete mapping[role]
    onChange({ ...rig, mapping })
  }

  const applyPose = (pose?: StudioPose) => {
    onChange({ ...rig, activePoseId: pose?.id })
    onStatus(pose ? `POSE APPLIED · ${pose.name.toUpperCase()}` : 'REST POSE APPLIED')
  }

  const importLibrary = async (file: File) => {
    try {
      const parsed = parseStudioPoseLibrary(JSON.parse(await file.text()))
      if (!parsed) throw new Error('Unsupported pose library')
      onChange({ ...rig, mapping: parsed.mapping, poses: parsed.poses, activePoseId: undefined })
      onStatus(`POSE LIBRARY IMPORTED · ${parsed.poses.length} POSES`)
    } catch (error) {
      onStatus(error instanceof Error ? `POSE LIBRARY REJECTED · ${error.message.toUpperCase()}` : 'POSE LIBRARY REJECTED')
    }
  }

  return (
    <section className="studio-rig-panel" aria-label="Skeletal animation and pose tools">
      <div className="studio-rig-head">
        <div className="studio-section-title"><span>SKELETAL RIG + POSES</span><small>{inspection ? `${inspection.bones.length} BONES · ${mappedRoles}/${STUDIO_HUMANOID_ROLES.length} MAPPED` : 'WAITING FOR GLB'}</small></div>
        <div className="studio-rig-actions">
          <button type="button" disabled={!inspection?.bones.length} onClick={() => inspection && onChange({ ...rig, mapping: inspection.suggestedMapping })}>AUTO MAP · {suggestedRoles}</button>
          <button type="button" disabled={!mappedRoles} onClick={() => onChange({ ...rig, mapping: {} })}>CLEAR MAP</button>
          <button type="button" onClick={() => downloadJson(`${node.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'rig'}.meshvara-poses.json`, createStudioPoseLibrary(rig))}>EXPORT POSES</button>
          <label className="studio-rig-import">IMPORT POSES<input type="file" accept="application/json,.json" onChange={(event) => { const file = event.currentTarget.files?.[0]; if (file) void importLibrary(file); event.currentTarget.value = '' }} /></label>
        </div>
      </div>

      {!inspection ? <p className="studio-rig-muted">Rig inventory appears after the local GLB finishes loading. Non-skinned models remain unaffected.</p> : inspection.bones.length ? <>
        {inspection.warnings.length ? <div className="studio-rig-warnings">{inspection.warnings.map((warning) => <p key={warning}>⚠ {warning}</p>)}</div> : null}

        <div className="studio-rig-grid">
          <div className="studio-rig-mapping">
            <div className="studio-section-title"><span>HUMANOID MAP</span><small>MANUAL OVERRIDES</small></div>
            <div className="studio-rig-role-list">
              {STUDIO_HUMANOID_ROLES.map((role) => <label key={role}><span>{humanizeRole(role)}</span><select value={rig.mapping[role] ?? ''} onChange={(event) => updateMapping(role, event.currentTarget.value || undefined)}><option value="">UNMAPPED</option>{inspection.bones.map((bone) => <option key={bone.id} value={bone.id}>{'· '.repeat(Math.min(bone.depth, 5))}{bone.name}</option>)}</select></label>)}
            </div>
          </div>

          <div className="studio-rig-bones">
            <div className="studio-section-title"><span>BONE INVENTORY</span><small>{inspection.rootBoneIds.length} ROOT{inspection.rootBoneIds.length === 1 ? '' : 'S'}</small></div>
            <div className="studio-bone-list" role="listbox" aria-label="Rig bones">
              {inspection.bones.map((bone) => <button key={bone.id} type="button" className={selectedBoneId === bone.id ? 'is-selected' : ''} onClick={() => setSelectedBoneId(bone.id)}><span>{'· '.repeat(Math.min(bone.depth, 6))}{bone.name}</span><small>{roleByBone.get(bone.id)?.toUpperCase() ?? 'BONE'}</small></button>)}
            </div>
            {selectedBone ? <div className="studio-bone-detail"><strong>{selectedBone.name}</strong><code>{selectedBone.id}</code><small>{selectedBone.parentId ? `Parent · ${selectedBone.parentId}` : 'Root bone'} · depth {selectedBone.depth}</small></div> : <p className="studio-rig-muted">Select a bone to inspect its stable project ID. FK gizmos are a later phase; this selection layer establishes the mapping contract first.</p>}
          </div>
        </div>

        <div className="studio-pose-library">
          <div className="studio-section-title"><span>POSE LIBRARY</span><small>{rig.poses.length} SAVED · {activePose ? `ACTIVE ${activePose.name.toUpperCase()}` : 'REST ACTIVE'}</small></div>
          <div className="studio-pose-capture"><input aria-label="Pose name" value={poseName} maxLength={80} onChange={(event) => setPoseName(event.currentTarget.value)} /><button type="button" onClick={() => onCapture(poseName.trim() || `Pose ${rig.poses.length + 1}`)}>CAPTURE CURRENT</button><button type="button" onClick={() => {
            const rest = duplicateStudioPose(inspection.restPose, 'Saved Rest Pose')
            onChange(addStudioPose(rig, rest))
            onStatus('REST POSE SAVED TO LIBRARY')
          }}>SAVE REST</button><button type="button" className={!rig.activePoseId ? 'is-active' : ''} onClick={() => applyPose(undefined)}>APPLY REST</button></div>

          <div className="studio-pose-list">
            {rig.poses.map((pose) => <article key={pose.id} className={rig.activePoseId === pose.id ? 'is-active' : ''}><div><strong>{pose.name}</strong><small>{Object.keys(pose.bones).length} BONES</small></div><div><button type="button" onClick={() => applyPose(pose)}>APPLY</button><button type="button" onClick={() => onChange(addStudioPose(rig, duplicateStudioPose(pose)))}>DUPLICATE</button><button type="button" disabled={!mappedRoles} onClick={() => onChange(addStudioPose(rig, mirrorStudioPoseDirection(pose, rig.mapping, 'left-to-right')))}>L→R</button><button type="button" disabled={!mappedRoles} onClick={() => onChange(addStudioPose(rig, mirrorStudioPoseDirection(pose, rig.mapping, 'right-to-left')))}>R→L</button><button type="button" onClick={() => onChange(removeStudioPose(rig, pose.id))}>DELETE</button></div></article>)}
            {!rig.poses.length ? <p className="studio-rig-muted">Capture the current local skeleton pose, save the authored rest pose, or import a Meshvara pose library. Pose data never leaves the browser.</p> : null}
          </div>
        </div>
      </> : <p className="studio-rig-muted">This imported GLB contains no bones. Skeletal authoring controls stay disabled instead of inventing a rig.</p>}
    </section>
  )
}
